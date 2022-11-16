<template>
  <div class="Page1Map">
    <div id="Page1Map" />
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
      page1Map: null
    }
  },
  created () {
    // 初始化地图
    this.$bus.$on('initPage1Map', data => this.initPage1Map(data))
    // 设置地图视野
    this.$bus.$on('setPage1MapView', data => this.setPage1MapView(data))
  },
  mounted () {
  },
  methods: {
    // 初始化地图
    initPage1Map (receiveData) {
      // 核心代码
      if (this.page1Map) {
        this.page1Map.setTarget(null)
        this.page1Map = null
      }
      // 这里做模拟，实际跟项目走
      this.page1Map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
            })
          }),
        ],
        target: 'Page1Map',
        view: new View({
          center: [13193864, 3768250],
          // zoom: (Math.random() * 10).toFixed(0),
          zoom: 6,
        }),
      })
    },
    // 测试使用
    setPage1MapView (receiveData) {
      console.warn(this.page1Map)
      this.page1Map.setView(new View({
        center: [13193864, 3768250],
        zoom: receiveData.zoom,
      }))
    }
  },
}
</script>

<style lang="scss" scoped>
.Page1Map {
  position: absolute;
  top: -120px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  transition: all 0.5s;
  overflow: hidden;
  #Page1Map {
    width: inherit;
    height: inherit;
  }
}
</style>