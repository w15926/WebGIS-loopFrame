const state = {
  commonConfig: {},
  menuList: [],
  activeState: {
    activeMenu: '',
    // ...
  },
}

const mutations = {
  // 初始化菜单列表
  initMenuList (state, params) {
    state.menuList = JSON.parse(JSON.stringify(params))
  },
  // 改变公共配置
  changeCommonConfig (state, params) {
    state.commonConfig = JSON.parse(JSON.stringify(params))
  },
  // 改变当前激活状态
  changeActiveState (state, params) {
    let tempState = JSON.parse(JSON.stringify(state.activeState))
    if (params.activeMenu) tempState.activeMenu = params.activeMenu
    // ...
    state.activeState = tempState
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