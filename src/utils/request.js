/**
 * @description 指定拦截器封装
 * @param { Object } 请求参数
 * @author 王乐翔
 * @createDate 2022/01/6
 * @lastEditDate 2022/11/13
 * @lastEditAuthor 王乐翔
 * @returns 接口数据
 */

import axios from 'axios'
import { stringify } from 'qs'
import {
  getTokenExpire,
  setTokenExpire,
  getTokenVal,
  setTokenVal
} from '@/utils/auth'

// 请求文件
export const reqFile = async url => {
  if (!url) {
    return new Promise.reject(new Error('笑死，你URL没传来啊😂'))
  }
  const req = await axios.get(`${url}?t=${Math.random()}`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  return req.data
}

export const myRequest = opt => {
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

  let isExpire = true

  if (getTokenExpire()) {
    let expireTimeStamp = getTokenExpire()
    expireTimeStamp - new Date().getTime() <= 0 ? isExpire = true : isExpire = false
  }

  return new Promise((resolve, reject) => {
    if (isExpire) {
      // 请求token
      axios.post(`${window.g1.BASE_API}/api/login`, {
        mobile: 'shg60',
        password: '123456'
      })
        .then(res => {
          if (res.status != 200 || !res.data || res.data.code != 0) return
          let extimes = new Date().getTime() + res.data.expire // 保持时间（毫秒数）
          setTokenExpire(extimes)
          isExpire = false
          setTokenVal(res.data.token)
          // 请求接口数据
          resolve(
            requestData(res.data.token)
              .then(res => res.data)
              .catch(err => err)
          )
        })
        .catch(err => Promise.reject(new Error('获取接口认证token失败', err)))
    }
    // 请求接口数据
    else {
      resolve(requestData(getTokenVal())
        .then(res => res.data)
        .catch(err => err))
    }
  })

  // 拿到token请求接口
  function requestData (token) {
    // ---------------------------------------- get ----------------------------------------
    if (opt.method === 'get' || opt.method === 'GET' || !opt.method) {
      if (opt.g1) {
        return axios.get(`${window.g1.BASE_API}/${opt.url}`,
          {
            params: opt.params,
            paramsSerializer: {
              serialize: stringify // or (params) => Qs.stringify(params, {arrayFormat: 'brackets'})
            },
            headers: { token }
          }
        )
      }
      else if (opt.g2) {
        return axios.get(`${window.g2.BASE_API}/${opt.url}`,
          {
            params: opt.params,
            paramsSerializer: {
              serialize: stringify
            },
            headers: { token }
          }
        )
      }
      else if (opt.wx) {
        return axios.get(`${window.g.BASE_WECHAT}/${opt.url}`,
          {
            params: opt.params,
            paramsSerializer: {
              serialize: stringify
            },
            headers: { token }
          }
        )
      }
      else if (opt.rootPath && !opt.resetPath) {
        return axios.get(`${window.rootPath.BASE_API}/${opt.url}?t=${new Date().getTime()}`, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
      }
      else if (opt.NXDCloud) {
        return axios.get(`${window.NXDCloud.BASE_API}/${opt.url}`,
          {
            params: opt.params,
            paramsSerializer: {
              serialize: stringify
            }
          }
        )
      }
      else {
        return axios.get(`${window.g.BASE_API}/${opt.url}`,
          {
            params: opt.params,
            paramsSerializer: {
              serialize: stringify
            },
            headers: { token }
          }
        )
      }
    }
    // ---------------------------------------- post ----------------------------------------
    if (opt.method === 'post' || opt.method === 'POST') {
      let data = null
      if (opt.isFormData) {
        data = new FormData()
        Object.keys(opt.params).forEach(key => data.append(key, opt.params[key]))
      }
      else data = opt.params
      if (opt.g1) {
        return axios.post(`${window.g1.BASE_API}/${opt.url}`,
          data,
          {
            headers: { token }
          }
        )
      }
      else if (opt.g2) {
        return axios.post(`${window.g2.BASE_API}/${opt.url}`,
          data,
          {
            headers: { token }
          }
        )
      }
      else if (opt.wx) {
        return axios.post(`${window.g.BASE_WECHAT}/${opt.url}`,
          data,
          {
            headers: { token }
          }
        )
      }
      else {
        return axios.post(`${window.g.BASE_API}/${opt.url}`,
          data,
          {
            headers: { token }
          }
        )
      }
    }
  }

}
