<template>
  <div :id="receiveId" class="Test3" :style="[{width:width+'px'},{height:height+'px'}]">
    Test3
  </div>
</template>

<script>
export default {
  name: 'Test3',
  components: {

  },
  props: {
    receiveId: {
      type: String,
      default: "",
    },
    triggerIds: {
      type: String,
      default: ''
    },
    width: {
      type: String | Number,
      default: "490"
    },
    height: {
      type: String | Number,
      default: "250"
    },
    fileCodes: {
      type: String,
      default: ''
    },
    paramObject: {
      type: Object,
      default: () => { }
    }
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

<style lang="scss" scoped>
.Test3 {
  width: 490px;
  height: 250px;
  font-size: 30px;
  background-color: wheat;
}
</style>