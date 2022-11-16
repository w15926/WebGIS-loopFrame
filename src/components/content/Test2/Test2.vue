<template>
  <div :id="receiveId" class="Test2">
    Test2
    <div @click="test_switchMap">🐷点我切换“A页面第一页”地图视野🐷</div>
  </div>
</template>

<script>
export default {
  name: 'Test2',
  props: {
    receiveId: {
      type: String,
      default: "",
    },
    fileCodes: {
      type: String,
      default: ''
    }
  },
  components: {

  },
  data () {
    return {

    }
  },
  watch: {
    // websocket实时刷新
    '$store.state.advancedStatus.webSocketData' (newV) {
      if (newV && Array.isArray(newV) && newV.length > 0) {
        let temp = this.fileCodes.split(',')
        for (const item of newV) {
          for (const j of temp) {
            if (item.datacode === j) {
              this.init()
              return
            }
          }
        }
      }
    }
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {

    },
    test_switchMap () {
      this.$bus.$emit('setPage1MapView', { zoom: 3 })
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.Test2 {
  width: 600px;
  height: 100px;
  font-size: 30px;
  background-color: skyblue;
  div {
    color: tomato;
    cursor: pointer;
  }
}
</style>