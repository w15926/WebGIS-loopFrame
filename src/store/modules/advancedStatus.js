/**
 * @description 高级状态管理
 * @param payload
 * @author 王乐翔
 * @createDate 2022/07/ 21
 * @lastEditDate 
 * @lastEditAuthor
 * @returns vuex cache
 */

const state = {
  webSocketData: null,

}

const mutations = {
  // 修改webSocket数据
  changeWebSocketData (state, payload) {
    state.webSocketData = JSON.parse(JSON.stringify(payload))
  },
}

const actions = {

}

export default {
  namespaced: true, // 解决命名冲突
  state,
  mutations,
  actions
}