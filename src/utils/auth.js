/**
 * @description 所有cookie设置
 * @param 
 * @author 王乐翔
 * @createDate 
 * @lastEditDate
 * @lastEditAuthor
 * @returns
 */

 import Cookies from 'js-cookie'

 // 用户登录 token
 const userTokenKey = 'location_user_token'
 export const getUserToken = () => Cookies.get(userTokenKey)
 export const setUserToken = token => Cookies.set(userTokenKey, token)
 export const removeUserToken = () => Cookies.remove(userTokenKey)
 
 // 接口认证 token 过期时间
 const interfaceTokenExpire = 'location_interface_token_expire'
 export const getTokenExpire = () => Cookies.get(interfaceTokenExpire)
 export const setTokenExpire = token => Cookies.set(interfaceTokenExpire, token)
 export const removeTokenExpire = () => Cookies.remove(interfaceTokenExpire)
 
 // 接口认证 token 值
 const interfaceTokenVal = 'location_interface_token_val'
 export const getTokenVal = () => Cookies.get(interfaceTokenVal)
 export const setTokenVal = token => Cookies.set(interfaceTokenVal, token)
 export const removeTokenVal = () => Cookies.remove(interfaceTokenVal)