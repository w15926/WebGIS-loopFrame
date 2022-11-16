<template>
  <div class="AboutPage2Map">
    <div id="AboutPage2Map" />
  </div>
</template>

<script>
import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
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

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: 'AboutPage2Map',
        view: new View({
          center: [13193864, 3768250],
          zoom: 5,
        }),
      })
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.AboutPage2Map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  transition: all 0.5s;
  overflow: hidden;
  #AboutPage2Map{
    width: inherit;
    height: inherit;
  }
}
</style>