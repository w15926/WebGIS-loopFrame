<template>
  <div class="Page2Map">
    <div id="Page2Map" />
  </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import { XYZ } from 'ol/source'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'

export default {
  components: {

  },
  data () {
    return {
      page2Map: null
    }
  },
  created () {
    // 初始化地图
    this.$bus.$on('initPage2Map', data => this.initPage2Map(data))
  },
  mounted () {
  },
  methods: {
    // 初始化地图
    initPage2Map (receiveData) {
      // 核心代码
      if (this.page2Map) {
        this.page2Map.setTarget(null)
        this.page2Map = null
      }
      // 这里做模拟，实际跟项目走
      this.page2Map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
            })
          }),
        ],
        target: 'Page2Map',
        view: new View({
          center: [13193864, 3768250],
          // zoom: (Math.random() * 10).toFixed(0),
          zoom: 6,
        }),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Page2Map {
  position: absolute;
  top: -120px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  transition: all 0.5s;
  overflow: hidden;
  #Page2Map {
    width: inherit;
    height: inherit;
  }
}
</style>