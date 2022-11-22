<template>
  <div :id="receiveId" class="Test2" ref="Test2" :style="[{width:width+'px'},{height:height+'px'}]">
    Test2
    <div @click="test_addIconMarker">点我在“首页第一页地图”上添加图标🐷</div>
  </div>
</template>

<script>
export default {
  name: 'Test2',
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
      default: "600"
    },
    height: {
      type: String | Number,
      default: "100"
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
    },
    test_addIconMarker () {
      let Arrone = []
      let html = '<div style="font-size:38px;">🐷🐷🐷🐷</div>'
      let obj = {
        lng: 119.939420725213,
        lat: 35.93362092765159,
        htmlString: html,
        otherData: {
          markId: ''
        }
      }
      Arrone.push(obj)
      let marker_points = {
        clickOpen: true,
        spotObject: [
          {
            offsetX: 0,
            offsetY: 0,
            spotArrone: Arrone,
          },
        ],
      }
      this.$bus.$emit('mapIn', {
        from: this.$options.name,
        to: 'OLMap',
        methods: 'addIconMarker',
        triggerIds: this.triggerIds,
        data: this.$loadsh.cloneDeep(marker_points) // 深拷贝
      })
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.Test2 {
  font-size: 30px;
  border: 2px dashed skyblue;
  div {
    color: tomato;
    cursor: pointer;
  }
}
</style>