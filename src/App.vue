<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: window.g.BASE_SOCKETPATH,
      socket: null,
    }
  },
  created () {
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
</style>
