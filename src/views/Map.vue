<template>
  <div class="Map">
    <div id="Map" />
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
      map: null
    }
  },
  created () {
    // 初始化地图
    this.$bus.$on('initMap', data => this.initMap(data))
    // 设置地图视野
    this.$bus.$on('setMapView', data => this.setMapView(data))
  },
  mounted () {
  },
  methods: {
    // 初始化地图
    initMap (receiveData) {
      // 从顶部菜单或分页每次进来重置地图和加载其它代码
      if (this.map) {
        this.map.setTarget(null)
        this.map = null
      }
      // 这里做模拟，实际跟项目走
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
            })
          }),
        ],
        target: 'Map',
        view: new View({
          center: [13193864, 3768250],
          // zoom: (Math.random() * 10).toFixed(0),
          zoom: 6,
        }),
      })
    },
    // 测试使用
    setMapView (receiveData) {
      this.map.setView(new View({
        center: [13193864, 3768250],
        zoom: receiveData.zoom,
      }))
    }
  },
}
</script>

<style lang="scss" scoped>
.Map {
  position: absolute;
  top: -120px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  transition: all 0.5s;
  overflow: hidden;
  #Map {
    width: inherit;
    height: inherit;
  }
}
</style>