/**
 * @description 所有开发生产环境配置
 * @author 王乐翔
 * @createDate 2022/11/04
 * @lastEditDate
 * @lastEditAuthor
 * @returns
 */

let BASE_URL = '' // xxx类
let BASE_URL_g1 = '' // xxx类
let BASE_URL_g2 = '' // xxx类
let BASE_URL_NXDCloud = '' // 公司买的云服务器
let BASE_URL_root = '' // 根路径
let STATIC_URL = '' // 静态目录
let BASE_SOCKETPATH = '' // websocket
let BASE_WECHAT = '' // 微信扫码相关
let isIntranet = null // 是否内网

// xx的（开发环境）
// BASE_URL = 'apis/HistoryCommonWeatherNew'
// BASE_URL_g1 = 'apis/CommonConfigNew-api'
BASE_URL = 'api/HistoryCommonWeather'
BASE_URL_g1 = 'api/CommonConfig-api'

// xx的（生产环境）
// BASE_URL = 'http://192.168.3.222:9000/HistoryCommonWeather'
// BASE_URL_g1 = 'http://192.168.3.222:9000/CommonConfig-api'

window.isIntranet = isIntranet

window.g = {
  AXIOS_TIMEOUT: 10000,
  BASE_API: `${BASE_URL}`,
  STATIC_URL,
  BASE_SOCKETPATH: `${BASE_SOCKETPATH}`,
  BASE_WECHAT: `${BASE_WECHAT}`
}

window.g1 = {
  AXIOS_TIMEOUT: 10000,
  BASE_API: `${BASE_URL_g1}`,
}