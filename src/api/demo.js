/**
 * @auth 王乐翔
 * @param {String} title demo界面相关接口
 * @returns interface data
 */

import { myRequest } from '@/utils/request'

// 演示封装调用接口，做统一管理
export const selectSCGP = params =>  myRequest({ url: 'SCGP/selectSCGP', params, g1 })
 