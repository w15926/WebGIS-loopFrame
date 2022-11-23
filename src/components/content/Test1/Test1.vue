<template>
  <div :id="receiveId" class="Test1" ref="Test1" :style="[{'width':width ? width + 'px' : '100px'},{'height': height ? height + 'px' : '100px'}]">Test1</div>
</template>

<script>
export default {
  name: 'Test1',
  props: {
    receiveId: {
      type: String,
      default: ""
    },
    triggerIds: {
      type: String,
      default: ''
    },
    width: {
      type: String | Number,
    },
    height: {
      type: String | Number,
    },
    fileCodes: {
      type: String,
      default: ''
    },
    paramObject: {
      type: String,
      default: ''
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
.Test1 {
  font-size: 30px;
  background-color: skyblue;
}
</style>