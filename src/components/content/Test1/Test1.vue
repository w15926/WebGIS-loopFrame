<template>
  <div :id="receiveId" class="Test1">Test1</div>
</template>

<script>
export default {
  name:'Test1',
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

    }
  },
  beforeDestroy () {

  }
}
</script>

<style>
.Test1 {
  width: 100px;
  height: 100px;
  font-size: 30px;
  background-color: skyblue;
}
</style>