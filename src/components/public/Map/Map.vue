<template>
  <div :id="receiveId" class="Map" :style="[{'position': 'absolute',},{'width':width},{'height':height}]">
    <OLMap :mapID="receiveId" />
  </div>
</template>

<script>
import OLMap from './OlMap'

export default {
  name: 'Map',
  components: {
    OLMap
  },
  props: {
    receiveId: {
      type: String,
      default: ""
    },
    paramObject: {
      type: Object,
      default: () => { }
    },
    width: {
      type: String,
      default: "1920px"
    },
    height: {
      type: String,
      default: "1080px"
    }
  },
  data () {
    return {

    }
  },
  watch: {
  },
  created () {

  },
  mounted () {
    const obj = {
      "name": "蓝莓标准",
      "lng": 119.939420725213,
      "lat": 35.95362092765159,
      "openZoom": 11,
      "latlngArr": [
        {
          "mapUrl": "http://58.59.29.51:11013/geoserver/gwc/service/wmts",
          "type": "huangdao1:huangdaolanmei",
          "opacity": 1
        },
        {
          "mapUrl": "http://58.59.29.51:11013/geoserver/gwc/service/wmts",
          "type": "huangdao1:newbiaozhun",
          "opacity": 1
        },
        {
          "mapUrl": "http://58.59.29.51:11013/geoserver/gwc/service/wmts",
          "type": "huangdao1:shandongshen",
          "opacity": 1
        },
        {
          "mapUrl": "http://58.59.29.51:11013/geoserver/gwc/service/wmts",
          "type": "huangdao1:huangdaohangxian",
          "opacity": 1
        },
        {
          "mapUrl": "http://58.59.29.51:11013/geoserver/gwc/service/wmts",
          "type": "huangdao1:daqiao",
          "opacity": 1
        },
        {
          "mapUrl": "http://58.59.29.51:11013/geoserver/gwc/service/wmts",
          "type": "huangdao1:huangdaozhoubian",
          "opacity": 1
        }
      ]
    }
    this.$bus.$emit('initMap_' + this.receiveId, obj)
  },
  methods: {
  },
  beforeDestroy () {

  }
}
</script>

<style>
.Map {
  transform: translateY(-120px);
}
</style>