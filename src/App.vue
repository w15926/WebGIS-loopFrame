<template>
  <div id="app">

    <template v-if="showIFramePage">
      <IFramePage />
    </template>

    <template v-else-if="showLogin">
      <Login />
    </template>

    <template v-else>
      <router-view />
    </template>

  </div>
</template>

<script>
export default {
  data () {
    return {
      showIFramePage: true,
      showLogin: true,
      path: window.g.BASE_SOCKETPATH,
      socket: null,
    }
  },
  created () {
    this.showIFramePage = this.$config.commonConfig.IFramePage.showPage
    this.showLogin = this.$config.commonConfig.systemLogin
    this.$bus.$on('closeIFramePage', () => this.showIFramePage = false)
    this.$bus.$on('loginSucceeded', () => this.showLogin = false)
    // this.initWebSocket()
  },
  methods: {
    // 初始化请求
    initWebSocket () {
      /* 
        step 1 webSocket 获取数据存入 vuex 的 webSocketData
        step 2 界面初始化时给每个组件 props的 fileCodes属性 传递自己的编码
        step 3 组件监听 webSocket 数据，更新时检测是否包含 fileCodes 的任意一个，包含则重新初始化改组件
      */
      if (this.socket != null) {
        this.socket.close()
        this.socket = null
        this.$store.commit('advancedStatus/changeWebSocketData', null)
      }
      this.socket = new WebSocket(this.path)
      this.socket.onopen = this.open
      this.socket.onerror = this.error
      this.socket.onmessage = this.message
      this.socket.onclose = this.close
    },
    // 连接成功
    open () {
      console.warn('WebSocket连接成功咯～')
      // 发送数据样例
      // let data = {
      //   type: 'init',
      //   nick: '2222991',
      //   room: 'abc',
      //   pwd: ''
      // }
      // this.socket.send(JSON.stringify(data))
    },
    // 连接错误
    error (e) {
      console.warn('WebSocket连接发生错误了呀！！！', e)
      this.$store.commit('advancedStatus/changeWebSocketData', null)
      this.close()
      console.warn('WebSocket将于一分钟后重连')
      setTimeout(() => this.initWebSocket(), 60000)
    },
    // 数据接收
    message (message) {
      const res = JSON.parse(message.data)
      if (Array.isArray(res.msg) && res.type === 'msg') {
        let beforeData = this.$store.state.advancedStatus.webSocketData
        if (beforeData) {
          if (beforeData.toString() === res.msg.toString()) {
            this.$store.commit('advancedStatus/changeWebSocketData', [])
            setTimeout(() => {
              this.$store.commit('advancedStatus/changeWebSocketData', res.msg)
            }, 0)
          }
          else {
            this.$store.commit('advancedStatus/changeWebSocketData', res.msg)
          }
        }
        else {
          this.$store.commit('advancedStatus/changeWebSocketData', res.msg)
        }
      }
      console.warn('WebSocket接收到了数据哈', message)
      console.warn('WebSocket解析data数据为', res)
    },
    // 关闭
    close () {
      this.closeWindow()
      this.$store.commit('advancedStatus/changeWebSocketData', null)
      console.warn('WebSocket已关闭')
    },
    // 关闭游览器
    closeWindow () {
      if (this.socket) {
        this.socket.close()
        this.socket = null
      }
    }
  },
  beforeDestroy () {
    this.closeWindow()
  }
}
</script>

<style lang="scss">
@import './assets/css/base.css';
@import './assets/css/scss.scss';

.page0 {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
}
.page0Left {
  position: absolute;
  top: 0;
  // left: -1920px;
  left: -100%;
  transition: all 0.5s;
}
.page0Left2X {
  position: absolute;
  top: 0;
  // left: -3840px;
  left: -200%;
  transition: all 0.5s;
}
.page1 {
  position: absolute;
  top: 0;
  // left: 1920px;
  left: 100%;
  transition: all 0.5s;
}
.page1Left {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
}
.page1Left2X {
  position: absolute;
  top: 0;
  // left: -1920px;
  left: -100%;
  transition: all 0.5s;
}
.page2 {
  position: absolute;
  top: 0;
  // left: 3840px;
  left: 200%;
  transition: all 0.5s;
}
.page2Left {
  position: absolute;
  top: 0;
  // left: 1920px;
  left: 100%;
  transition: all 0.5s;
}
.page2Left2X {
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.5s;
}
.pageSwitch-leftArrow,
.pageSwitch-rightArrow {
  position: absolute;
  top: 550px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: 0.8;
  z-index: 9998;
  img {
    width: 100%;
    height: 100%;
  }
}
.pageLeftShadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 1080px;
  background: linear-gradient(to right, rgba(101, 101, 101, 0.5), transparent);
  z-index: 9997;
}
.pageRightShadow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 1080px;
  background: linear-gradient(to left, rgba(101, 101, 101, 0.5), transparent);
  z-index: 9997;
}
.pageSwitch-leftArrow {
  left: 0;
}
.pageSwitch-rightArrow {
  right: 0;
}
.pageSwitch {
  position: absolute;
  top: 114px;
  right: 190px;
  display: flex;
  width: 150px;
  height: 50px;
  z-index: 9999;
  .pageSwitch-item {
    margin-right: 10px;
    width: 40px;
    height: 10px;
    line-height: 50px;
    text-align: center;
    color: #0be7d1;
    background: #126e61;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }
  .pageSwitch-item-active {
    color: #fff;
    background-color: #1bc7ad;
  }
}
</style>
