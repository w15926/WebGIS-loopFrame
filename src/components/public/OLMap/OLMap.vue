/**
 * @description open layers map
 * @author 
 * @createDate 
 * @lastEditDate 2022/11/14
 * @lastEditAuthor 王乐翔
 * @lastDescription 起步修改了地图监听方式
 * @returns
 */
<template>
  <div ref="OLMap">
    <div :id="mapdivName" :style="[{'position': 'absolute',},{'width':width ? width + 'px' : '1920px'},{'height': height ? height + 'px' : '1080px'}]"></div>
    <div :id="popupdivName"></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import { Map, View, proj, Feature } from 'ol'
import { transform, fromLonLat, Projection } from 'ol/proj'
import { defaults as defaultControls } from 'ol/control'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { XYZ, WMTS, Vector } from 'ol/source'
import {
  defaults as mapDefaults,
  DragPan,
  MouseWheelZoom,
  DoubleClickZoom
} from 'ol/interaction'
//点
import { Vector as SourceVec, Cluster } from 'ol/source'
import { Point, Polygon } from 'ol/geom'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { Style, Icon, Stroke, Fill, Text, Circle } from 'ol/style'
import ImageStatic from 'ol/source/ImageStatic'
import WebGLPointsLayer from 'ol/layer/WebGLPoints'

// 多边形
import Overlay from 'ol/Overlay'
import { boundingExtent } from 'ol/extent'
import { getCenter } from 'ol/extent'
//
// 图上图标相关
import OlGeomPoint from 'ol/geom/Point'
import OlGeomLine from 'ol/geom/LineString'
import OlGeomLinearRing from 'ol/geom/LinearRing'
import OlLayerVector from 'ol/layer/Vector'
import OlSourceVector from 'ol/source/Vector'
import { Image as ImageLayer } from 'ol/layer'
import Draw from 'ol/interaction/Draw'
import Select from 'ol/interaction/Select'
import { WindLayer } from 'ol-wind'
import { fromExtent } from 'ol/geom/Polygon'
var map
let delete1
export default {
  name: 'OLMap',
  props: {
    // 地图ID
    receiveId: {
      type: String,
      default: ""
    },
    // 接收对象
    paramObject: {
      type: String
    },
    // 地图宽度
    width: {
      type: String | Number,
      default: "1920"
    },
    // 地图高度
    height: {
      type: String | Number,
      default: "1080"
    },
    mapMarkerSelect: {
      type: Object,
      default: () => { },
    },
    mapPoint: {
      type: Object,
      default: () => { },
    },
    // 线
    mapLine: {
      type: Object,
      default: () => { },
    },
    // 面
    mapPolygon: {
      type: Object,
      default: () => { },
    },
    // 图片
    mapImg: {
      type: Object,
      default: () => { },
    }, // 图片动画数组
    mapImgAniArr: {
      type: Object | Array,
      default: () => { },
    },
    mapImgAniArr2: {
      type: Object,
      default: () => { },
    },
    // 弹窗
    htmlWin: {
      type: Object,
      default: () => { },
    },
    // 多个面板
    htmlmony: {
      type: Object,
      default: () => { },
    },
    // 缩放级别
    mapZoom: {
      type: String | Number,
      default: '',
    },
  },
  data () {
    return {
      mapdivName: '',
      popupdivName: '',
      latlngObj: {},
      map: null,
      mapMarkerObj: {},
      mapMarkerObjSelect: {},
      markerJsonSelect: [],
      markerJson: [],
      mapLineObj: {},
      lineArray: [],
      lineSelectPreStyle: undefined,
      lineSelect: undefined,
      mapPolygonObj: {},
      polygonArray: [],
      polygonSelectPreStyle: undefined,
      polygonSelect: undefined,
      pointNewArray: [],
      mapImgObj: {},
      ImgArray: [],
      ImgAniArr: [],
      ImgBackgroundImgArray: [],
      // 多雷达
      ImgAniArr0: [],
      ImgAniArr1: [],
      ImgAniArr2: [],
      ImgAniArr3: [],
      // 多雷达结束
      htmlWinObj: {},
      htmlmonyObj: {},
      htmlmonyArr: [],
      getzoom: 0,
      curExtend: [],
      ol: null,
      PopupO: null,
      sourceMap: null,
      layerArr: [],
      aniLayerArr: [],
      projection: null,
      resolutions: null,
      view: null,
      target: null,
      drawMap: null,
      drawLayer: null,
      drawArr: [],
      drawMark: [],
      widthStr: '100%',
      fillExtend: null, //是否限制地图拖拽范围
      YingYanMarker: undefined, //鹰眼图位置
      windLayer: undefined,//风场图层
      mengBanLayer: undefined,//遮罩图层
      mapZooms: 0,
      polygonList: [], // 存放 new的多边形

      BusFrom: '', // 事件总结的from
    }
  },
  watch: {
    receiveId: {
      handler (newV) {
        if (newV && newV !== '') {
          this.receiveId = newV
          this.mapdivName = 'map_' + newV
          this.popupdivName = 'popup_' + newV
        }
      },
      immediate: true,
      deep: true,
    },
    mapMarkerSelect: {
      handler (newV) {
        if (newV && newV.spotObject && newV.spotObject[0].spotArrone.length > 0) {
          this.mapMarkerObjSelect = newV
          this.addIconMarkerSelect(this.mapMarkerObjSelect)
        }
      },
      immediate: true,
      deep: true,
    },
    // 面
    mapPolygon: {
      handler (newV) {
        if (newV.polygonArr.length > 0) {
          this.mapPolygonObj = newV
          this.addPolygon(this.mapPolygonObj)
        }
      },
      deep: false,
    },
    // 线
    mapLine: {
      handler (newV) {
        if (newV.lineArr.length > 0) {
          this.mapLineObj = newV
          this.addLine(this.mapLineObj)
        }
      },
      deep: true,
    },
    // 弹窗
    htmlWin: {
      handler (newV) {
        if (newV.lng !== undefined) {
          this.htmlWinObj = newV
          this.addOverlay(this.htmlWinObj)
        }
      },
      deep: true,
    },
    mapImg: {
      handler (newV) {
        if (newV.imgArr && newV.imgArr.length > 0) {
          this.mapImgObj = newV
          this.addImage(this.mapImgObj)
        }
      },
      deep: false,
    },
    mapImgAniArr: {
      handler (newV) {
        if (newV.imgArr && newV.imgArr.length > 0) {
          this.mapImgAniArr = newV
          this.addImageAniArr(this.mapImgAniArr)
        }
      },
      deep: false,
    },
    mapImgAniArr2: {
      handler (newV) {
        if (newV.imgArr && newV.imgArr.length > 0) {
          this.mapImgAniArr2 = newV
          this.addImageAniArr2(this.mapImgAniArr2)
        } else {
        }
      },
      deep: false,
    },
    htmlmony: {
      handler (newV) {
        if (newV.spotArrone.length > 0) {
          this.htmlmonyObj = newV
          this.addmianban(this.htmlmonyObj)
        }
      },
      deep: false,
    },
    // 设置地图缩放级别
    mapZoom (newV) {
      // 避免设置0级这里为false的情况
      if (newV || newV === 0) this.map.getView().setZoom(newV)
    },
  },
  created () {
    // 事件监听
    this.$bus.$on('mapIn', obj => {
      if (obj.to === this.$options.name && this.$options.methods[obj.methods]) {
        if (obj.triggerIds) {
          let containArr = obj.triggerIds.split(',')
          for (const item of containArr) {
            if (item.indexOf(this.receiveId) > -1) {
              this.BusFrom = obj.from
              this.$refs.OLMap.__vue__[obj.methods](obj.data)
            }
          }
        }
      }
    })
    // this.$bus.$on('addIconMarker', data => this.addIconMarker(data))
  },
  methods: {
    // 初始化地图
    initMap (params) {
      if (this.map) {
        this.map.setTarget(null)
        this.map = null
        this.target = ''
        this.latlngObj = {}
      }

      this.latlngObj = params

      if (this.latlngObj == null || this.latlngObj == undefined || this.latlngObj.latlngArr == undefined) {
        return
      }


      this.fillExtend = null //清除视野控制
      this.target = this.mapdivName //跟页面元素的 id 绑定来进行渲染
      let tileLayer = []
      this.layerArr = []
      this.latlngObj.latlngArr.map((res, i) => {
        let kt = ''
        kt = this.constructSource(res)
        tileLayer.push(
          new Tile({
            visible: true,
            opacity: res.opacity,
            name: 'aaa' + i,
            source: kt,
          })
        )
      })
      this.projection = new Projection({
        code: 'EPSG:4326',
        units: 'degrees',
        axisOrientation: 'neu',
      })

      this.resolutions = [
        0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
        0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
        0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4,
        1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5,
        2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6,
        2.682209014892578e-6, 1.341104507446289e-6, 6.705522537231445e-7,
        3.3527612686157227e-7,
      ]
      if (this.latlngObj.xMin && this.latlngObj.xMax && this.latlngObj.yMin && this.latlngObj.yMax) {
        this.fillExtend = [
          this.latlngObj.xMin,
          this.latlngObj.yMin,
          this.latlngObj.xMax,
          this.latlngObj.yMax,
        ]
      }
      this.view = new View({
        center: [Number(this.latlngObj.lng), Number(this.latlngObj.lat)], //地图中心坐标
        zoom: this.latlngObj.openZoom, //缩放级别
        maxZoom: this.latlngObj.maxZoom ? Number(this.latlngObj.maxZoom) : 21, // 地图最大缩放级别
        minZoom: this.latlngObj.minZoom ? Number(this.latlngObj.minZoom) : 5, // 地图最小缩放级别
        // projection: 'EPSG:4326'
        resolutions: this.resolutions,
        projection: this.projection,
        // extent: [-180.0, -90.0, 180.0, 90.0],
        extent:
          this.fillExtend != null
            ? this.fillExtend
            : [-180.0, -90.0, 180.0, 90.0],
      })
      this.map = new Map({
        target: this.target, //绑定dom元素进行渲染
        layers: tileLayer, //配置地图数据源
        view: this.view, //配置地图显示的options配置（坐标系，中心点，缩放级别等）
        // renderer:'canvas',//'canvas' or 'webgl'.
      })
      this.layerArr = tileLayer
      this.getzoom = Math.floor(this.latlngObj.openZoom)
      //当图片视野，禁止地图拖放
      if (this.latlngObj.bPic) {
        this.disableMapDefaultEvents(this.map)
      }
      // 点线面的图层
      // 添加一个绘制的线使用的layer
      this.drawLayer = new OlLayerVector({
        //layer所对应的source
        source: new Vector({ wrapX: false }),
      })
      //把layer加入到地图中
      this.map.addLayer(this.drawLayer)
      this.map.getView().on('change:resolution', () => {
        this.zoomChangeEvent()
      })
      this.map.on('moveend', () => {
        console.log(
          '当前页：' + this.target,
          '缩放级别：' + this.map.getView().getZoom(),
          '最大：' + this.map.getView().getMaxZoom(),
          '最小：' + this.map.getView().getMinZoom(),
          '计算范围：' + this.map.getView().calculateExtent()
        )
        this.$emit('getMapNowZoom', this.map.getView().getZoom())
      })
      //   坐标点
      this.map.on('click', evt => {
        console.log('当前鼠标点击的经纬度为：' + evt.coordinate)
        console.log(
          '缩放级别：' + this.map.getView().getZoom(),
          '计算范围：' + this.map.getView().calculateExtent()
        )
        this.$emit('clickMap', evt.coordinate)
        this.drawMark.push(evt.coordinate)
      })

      // 地图加载成功
      setTimeout(() => {
        this.$bus.$emit('mapOut', {
          from: this.$options.name,
          to: null,
          methods: 'loadedMap',
          triggerIds: this.receiveId + '',
          data: { page: JSON.parse(JSON.stringify(this.BusFrom)) }
        })
      }, 0)
    },
    // 清除地图
    clearMap (res) {
      if (this.layerArr) {
        this.layerArr.map((items, s) => {
          this.map.removeLayer(items)
        })
      }
      this.layerArr = []
      res.map((itm, i) => {
        let kt = ''
        kt = this.constructSource(itm)
        let tileLayer = new Tile({
          source: kt,
          opacity: itm.opacity,
          name: 'aaa' + i,
        })
        this.map.addLayer(tileLayer)
        this.layerArr.push(tileLayer)
      })
    },

    constructSource (res) {
      var projection = new Projection({
        code: 'EPSG:4326',
        units: 'degrees',
        axisOrientation: 'neu',
      })
      let baseParams = [
        'VERSION',
        'LAYER',
        'STYLE',
        'TILEMATRIX',
        'TILEMATRIXSET',
        'SERVICE',
        'FORMAT',
      ]
      var resolutions = [
        0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
        0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
        0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4,
        1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5,
        2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6,
        2.682209014892578e-6, 1.341104507446289e-6, 6.705522537231445e-7,
        3.3527612686157227e-7,
      ]

      var layerName = res.type
      var style = ''
      var gridNames = [
        'EPSG:4326:0',
        'EPSG:4326:1',
        'EPSG:4326:2',
        'EPSG:4326:3',
        'EPSG:4326:4',
        'EPSG:4326:5',
        'EPSG:4326:6',
        'EPSG:4326:7',
        'EPSG:4326:8',
        'EPSG:4326:9',
        'EPSG:4326:10',
        'EPSG:4326:11',
        'EPSG:4326:12',
        'EPSG:4326:13',
        'EPSG:4326:14',
        'EPSG:4326:15',
        'EPSG:4326:16',
        'EPSG:4326:17',
        'EPSG:4326:18',
        'EPSG:4326:19',
        'EPSG:4326:20',
        'EPSG:4326:21',
      ]

      var gridsetName = 'EPSG:4326'
      var format = 'image/png'
      var baseUrl = res.mapUrl
      let params = {
        VERSION: '1.0.0',
        LAYER: layerName,
        STYLE: style,
        TILEMATRIX: gridNames,
        TILEMATRIXSET: gridsetName,
        SERVICE: 'WMTS',
        FORMAT: format,
      }
      var url = baseUrl + '?'
      for (var param in params) {
        if (baseParams.indexOf(param.toUpperCase()) < 0) {
          url = url + param + '=' + params[param] + '&'
        }
      }
      url = url.slice(0, -1)
      var source = new WMTS({
        url: url,
        layer: params['LAYER'],
        matrixSet: params['TILEMATRIXSET'],
        format: params['FORMAT'],
        projection: projection,
        tileGrid: new WMTSTileGrid({
          tileSize: [256, 256],
          extent: [-180.0, -90.0, 180.0, 90.0],
          origin: [-180.0, 90.0],
          resolutions: resolutions,
          matrixIds: params['TILEMATRIX'],
        }),
        style: params['STYLE'],
        wrapX: true,
      })
      this.sourceMap = source
      return source
    },
    // 新加方法（王乐翔） - 通过距离（m）画圆
    drawCircularByDistance (lng, lat, distance, polygonName, styleObj = {}) {
      if (!this.map) return Promise.reject(new Error('来早了宝贝，地图还没加载完成呢！'))
      if (!polygonName) return Promise.reject(new Error('请传入当前polygonName'))

      const metersPerUnit = this.map.getView().getProjection().getMetersPerUnit();
      const circleRadius = distance / metersPerUnit;
      const circle = new geomCircle([Number(lng), Number(lat)], circleRadius);
      const polygon = new fromCircle(circle) // 我直接给你转多边形，懒得麻烦。

      const obj = {
        name: polygonName,
        polygon
      }
      this.polygonList.push(obj)

      const circleFeature = new Feature({ geometry: polygon })
      const source = new OlSourceVector()

      const style = new Style({
        stroke: new Stroke({
          width: styleObj.width ? Number(styleObj.width) : 2,
          color: styleObj.color ? String(styleObj.color) : 'pink',
        }),
        fill: new Fill({
          color: styleObj.backgroundColor ? String(styleObj.backgroundColor) : 'transparent', // 默认🫥透明🫥
        }),
      })

      source.addFeature(circleFeature)

      let vectorLayer = new OlLayerVector({
        source,
        style
      })

      this.map.addLayer(vectorLayer)
    },
    // 新加方法（王乐翔） - 判断当前点是否存在于某个多边形内
    isPointInPolygon (lat, lng, polygonName) {
      if (!this.map) return Promise.reject(new Error('来早了宝贝，地图还没加载完成呢！'))
      if (!polygonName) return Promise.reject(new Error('请传入要判断的polygonName'))

      let currentPolygon = null
      for (const item of this.polygonList) {
        if (item.name === polygonName) {
          currentPolygon = item.polygon
          break
        }
      }
      if (!currentPolygon) return Promise.reject(new Error('传入的polygonName不存在'))

      let arr = []
      let tempArr = []
      currentPolygon.flatCoordinates.forEach((item, index) => {
        tempArr.push(item)
        if (tempArr.length === 2) {
          arr.push(tempArr)
          tempArr = []
        }
      })

      if (arr.length < 3) return false

      let iSum = 0, iCount = arr.length
      let dLon1, dLon2, dLat1, dLat2, dLon // 点1，点2的经度纬度；需要判断的点与多边形边的交点经度
      let bool = false

      // 判断是否是顶点，如果是顶点则直接返回
      for (let i = 0; i < iCount; i++) {
        dLon1 = arr[i][0]
        dLat1 = arr[i][1]
        if (lng == dLon1 && lat == dLat1) {
          bool = true
        }
      }

      // 判断顶点结束
      if (bool) {
        return bool
      } else {
        for (let i = 0; i < iCount; i++) {
          if (i == iCount - 1) {
            dLon1 = arr[i][0]
            dLat1 = arr[i][1]
            dLon2 = arr[0][0]
            dLat2 = arr[0][1]
          } else {
            dLon1 = arr[i][0]
            dLat1 = arr[i][1]
            dLon2 = arr[i + 1][0]
            dLat2 = arr[i + 1][1]
          }
          //以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
          if (((lat >= dLat1) && (lat < dLat2)) || ((lat >= dLat2) && (lat < dLat1))) {
            if (Math.abs(dLat1 - dLat2) > 0) {
              //得到 A点向左射线与边的交点的x坐标：
              dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - lat)) / (dLat1 - dLat2)
              if (dLon < lng) iSum++
            }
          }
        }

        if (iSum % 2 != 0) bool = true

        return bool
      }
    },
    // 添加蒙版
    addMengBan (MengBanJson) {
      if (!MengBanJson) {
        return
      }
      var extent = [-180, -90, 180, 90]
      var polygonRing = fromExtent(extent);
      MengBanJson.features[0].geometry.rings.map((item) => {
        let linearRing = new OlGeomLinearRing(item);
        polygonRing.appendLinearRing(linearRing);
      })
      let curFeature = new Feature({
        // type: 'route',
        geometry: polygonRing,
      });
      const features = [
        curFeature
      ]
      // 创建矢量数据源
      const source = new OlSourceVector({
        features,
      })
      // 创建样式
      const style = new Style({
        stroke: new Stroke({
          width: 1,
          color: "#FFFFFF00",
          lineDash: [],
        }),
        fill: new Fill({
          color: MengBanJson.backgroundColor || '',
        }),
      })

      // 创建矢量图层
      const areaLayer = new OlLayerVector({
        source,
        style,
        zIndex: 0,
      })
      this.mengBanLayer = areaLayer;
      // 添加到地图实例
      this.map.addLayer(areaLayer)
    },
    // 清除蒙版
    clearMengBan () {
      if (this.mengBanLayer) {
        this.map.removeLayer(this.mengBanLayer)
        this.mengBanLayer = undefined
      }
    },
    initSelect () {
      var select = new Select();
      select.setHitTolerance(5);
      select.on("select", (e) => {
        let features = e.target.getFeatures().getArray();
        let type = e.target.getFeatures().getArray()[0].getGeometry().getType();
        let text = e.target.getFeatures().getArray()[0].get("text");
        if (text && text.clickOpen) {
          this.clearShowdefaultSelect();
          this.$emit("openHtml", {
            text: text,
            type: type
          });
        }
        this.$emit("deleDraw", features, type);
      });
      this.map.addInteraction(select);
    },
    zoomChangeEvent () {
      var zoom = this.map.getView().getZoom() //获取当前地图的缩放级别
      var ext = this.map.getView().calculateExtent()
      //this.map.getView().setResolution(resolution);
      //做视野控制
      // if (this.fillExtend != null) {
      //   this.map.getView().fit(this.fillExtend)
      // }

      this.getzoom = Math.floor(zoom)
      this.curExtend = ext
      if (
        this.mapMarkerObj && this.mapMarkerObj.spotObject &&
        this.mapMarkerObj.spotObject[0].spotArrone.length > 0
      ) {
        this.setIconMarkerShowByZoom(zoom)
      }
      if (
        this.lineArray && this.lineArray.length > 0
      ) {
        this.setLineShowByZoom(zoom)
      }
      if (
        this.polygonArray && this.polygonArray.length > 0
      ) {
        this.setPolygonShowByZoom(zoom)
      }
      if (
        this.ImgBackgroundImgArray && this.ImgBackgroundImgArray.length > 0
      ) {
        this.setMapBackgroundImageShowByZoom(zoom)
      }
    },
    setZoomAndCenter () {
      this.fillExtend = null
      if (
        this.latlngObj.xMin &&
        this.latlngObj.xMax &&
        this.latlngObj.yMin &&
        this.latlngObj.yMax
      ) {
        this.fillExtend = [
          this.latlngObj.xMin,
          this.latlngObj.yMin,
          this.latlngObj.xMax,
          this.latlngObj.yMax,
        ]
      }
      this.view = new View({
        center: [Number(this.latlngObj.lng), Number(this.latlngObj.lat)], //地图中心坐标
        zoom: this.latlngObj.openZoom, //缩放级别
        maxZoom: this.latlngObj.maxZoom ? Number(this.latlngObj.maxZoom) : 21, // 地图最大缩放级别
        minZoom: this.latlngObj.minZoom ? Number(this.latlngObj.minZoom) : 5, // 地图最小缩放级别
        //projection: 'EPSG:4326'
        resolutions: this.resolutions,
        projection: this.projection,
        // extent: [-180.0, -90.0, 180.0, 90.0],
        extent:
          this.fillExtend != null
            ? this.fillExtend
            : [-180.0, -90.0, 180.0, 90.0],
      })
      this.map.setView(this.view)
      this.map.getView().on('change:resolution', () => {
        this.zoomChangeEvent()
      })
    },
    refreshMap () {
      if (this.map) {
        this.map.updateSize()
      }
    },
    // 设置缩放和视野
    setZoomAndCenterByView (lon, lat, zoom, bFillExtent) {
      this.view = new View({
        center: lon && lat ? [Number(lon), Number(lat)] : [Number(this.latlngObj.lng), Number(this.latlngObj.lat)], //地图中心坐标
        zoom: zoom ? zoom : this.latlngObj.openZoom, //缩放级别
        maxZoom: this.latlngObj.maxZoom ? Number(this.latlngObj.maxZoom) : 21, // 地图最大缩放级别
        minZoom: this.latlngObj.minZoom ? Number(this.latlngObj.minZoom) : 5, // 地图最小缩放级别
        //projection: 'EPSG:4326'
        resolutions: this.resolutions,
        projection: this.projection,
        // extent: [-180.0, -90.0, 180.0, 90.0],
        extent: bFillExtent && this.fillExtend != null ? this.fillExtend : [-180.0, -90.0, 180.0, 90.0],
      })
      this.map.setView(this.view)
      this.zoomChangeEvent()
      this.map.getView().on('change:resolution', () => {
        this.zoomChangeEvent()
      })
    },
    // 修改新增方法（王乐翔） - 禁用地图默认事件
    disableMapDefaultEvents (mapobj) {
      mapobj.getInteractions().forEach(function (element, index, array) {
        if (element instanceof DragPan || element instanceof MouseWheelZoom || element instanceof DoubleClickZoom) {
          element.setActive(false)
        }
      })
    },
    clearYingYanMarker () {
      if (this.YingYanMarker) this.map.removeOverlay(this.YingYanMarker)
    },
    addYingYanMarker (lon, lat, html, offsetX, offsetY) {
      this.clearYingYanMarker()
      var div = ''
      div = document.createElement('div')
      div.id = this.popupdivName + 'mianYingYan'
      div.innerHTML = html
      var popupId = document.getElementById(this.popupdivName) //"popup"
      popupId.appendChild(div)
      var marker = new Overlay({
        //overly的位置[11,22]格式
        position: [Number(lon), Number(lat)],
        //overly放置的div
        offset: [Number(offsetX), Number(offsetY)],
        element: div,
        insertFirst: true,
      })
      this.YingYanMarker = marker
      //逐个把overly添加到地图上
      this.map.addOverlay(this.YingYanMarker)
    },
    // 根据视野范围改变图标显示的方法
    setIconMarkerShowByZoom (curZoom) {
      if (this.markerJson) {
        this.markerJson.map((res, i) => {
          if (res.minZoom || res.maxZoom) {
            if ((res.minZoom && res.minZoom < curZoom) || (res.maxZoom && res.maxZoom > curZoom)) {
              if (res.overlay != undefined) {
                if (res.visible == false) {
                  this.map.addOverlay(res.overlay);
                  res.visible = true
                  this.setMarkClickEvent(res.divId, res.clickOpen, res.resB, res.otherId)
                }
              }
            } else {
              if (res.overlay != undefined) {
                if (res.visible) {
                  this.map.removeOverlay(res.overlay);
                  res.visible = false
                }
              }
            }
          }

        })
      }
    },
    // 根据视野范围改变线显示的方法
    setLineShowByZoom (curZoom) {
      if (this.lineArray) {
        this.lineArray.map((res, i) => {
          if (res.minZoom || res.maxZoom) {
            if ((res.minZoom && res.minZoom < curZoom) || (res.maxZoom && res.maxZoom > curZoom)) {
              if (res.source != undefined) {
                if (res.visible == false) {
                  res.source.setVisible(true)
                  res.visible = true
                }
              }
            } else {
              if (res.source != undefined) {
                if (res.visible) {
                  res.source.setVisible(false)
                  res.visible = false
                }
              }
            }
          }

        })
      }
    },
    // 根据视野范围改变线显示的方法
    setPolygonShowByZoom (curZoom) {
      if (this.polygonArray) {
        this.polygonArray.map((res, i) => {
          if (res.minZoom || res.maxZoom) {
            if ((res.minZoom && res.minZoom < curZoom) || (res.maxZoom && res.maxZoom > curZoom)) {
              if (res.source != undefined) {
                if (res.visible == false) {
                  res.source.setVisible(true)
                  res.visible = true
                }
              }
            } else {
              if (res.source != undefined) {
                if (res.visible) {
                  res.source.setVisible(false)
                  res.visible = false
                }
              }
            }
          }

        })
      }
    },
    // 添加图标的方法
    addIconMarker (params) {
      let index = 0
      params.spotObject.map((paramsL, i) => {
        // 清空上一次保留的
        if (params.spotObject.length > 0) {

          // // 使用变量存储弹窗所需的 DOM 对象
          var popupId = document.getElementById(this.popupdivName)
          paramsL.spotArrone.map((paramsB, k) => {
            //新增放置overly的div
            let html = []
            html.push(paramsB.htmlString)
            var div = ''
            div = document.createElement('div')
            div.id =
              (paramsB.otherData ? paramsB.otherData.markId : '') + this.popupdivName + 'mian' + index++
            div.className = k
            div.innerHTML = html.join('')
            popupId.appendChild(div)
            //新增overly\
            var marker = new Overlay({
              //overly的位置[11,22]格式
              position: [Number(paramsB.lng), Number(paramsB.lat)],
              //overly放置的div
              offset: [Number(paramsL.offsetX), Number(paramsL.offsetY)],
              element: div,
              insertFirst: params.code ? false : true,
            })
            let obj = {
              otherId: paramsB.otherData == undefined ? '' : paramsB.otherData.markId,
              overlay: marker,
              divId: div.id,
              clickOpen: params.clickOpen,
              paramsB: paramsB,
              maxZoom: paramsL.maxZoom,
              minZoom: paramsL.minZoom,
              visible: false
            }
            this.markerJson.push(obj)
            //逐个根据视野范围设置把overly添加到地图上
            if (paramsL.minZoom || paramsL.maxZoom) {
              if ((paramsL.minZoom && paramsL.minZoom < this.getzoom) || (paramsL.maxZoom && paramsL.maxZoom > this.getzoom)) {
                obj.visible = true
                this.map.addOverlay(marker);
              }
            }
            else {
              if (paramsL.bAni) {
              } else {
                this.map.addOverlay(marker);
                obj.visible = true
              }
            }
            if (obj.visible) {
              this.setMarkClickEvent(obj.divId, obj.clickOpen, obj.paramsB, obj.markId)
            }
            if (params.hoverOpen) {
              this.setMarkerHover(obj.divId, params.hoverOpen, obj.paramsB, obj.markId)
            }
          })
        }
      })
    },
    // 设置mark鼠标悬浮事件
    setMarkerHover (divid, clickOpen, resB, markId) {
      if (clickOpen) {
        document.querySelector(`#${divid}`).addEventListener('mouseover', () => {
          let marInd = document.querySelector(`#${divid}`).getAttribute('class')
          this.clearAllSelect()
          this.$emit('MarkerOver', {
            lng: resB.lng,
            lat: resB.lat,
            text: resB,
            index: marInd,
            type: "MarkerOver"
          })
        })
        document.querySelector(`#${divid}`).addEventListener('mouseout', () => {
          let marInd = document.querySelector(`#${divid}`).getAttribute('class')
          this.clearAllSelect()
          this.$emit('MarkerOut', {
            lng: resB.lng,
            lat: resB.lat,
            text: resB,
            index: marInd,
            type: "MarkerOut"
          })
        })
      }
    },
    // 设置mark点击事件
    setMarkClickEvent (divid, clickOpen, resB, markId) {
      if (clickOpen) {
        const div = document.querySelector('#' + divid)
        if (div) {
          div.addEventListener('click', () => {
            let marInd = document.querySelector('#' + divid).getAttribute('class')
            this.clearAllSelect()
            this.$emit('openHtml', {
              lng: resB.lng,
              lat: resB.lat,
              text: resB,
              index: marInd,
              type: "Point"
            })
          })
        }

      }
      // 点击弹窗内部组件X组件
      if (resB.type && resB.type == 'child_delete') {
        document.querySelector(`#${markId}`).addEventListener('click', e => {
          let items = markId == undefined ? '' : markId
          this.$emit('closePop', {
            type: 'clearMarker',
            item: items,
          })
        })
      }
    },
    //动画控制显示哪些点
    setIconMarkerVisibleByIndexRange (idName, isSHow = true) {
      if (this.markerJson && this.markerJson.length > 0) {
        for (let i = 0; i < this.markerJson.length; i++) {
          if (!idName) {
          }
          else if (idName.indexOf(this.markerJson[i].otherId) > -1 && isSHow) {
            if (this.markerJson[i].visible == false) {
              this.map.addOverlay(this.markerJson[i].overlay)
              this.markerJson[i].visible = true
              this.setMarkClickEvent(this.markerJson[i].divId, this.markerJson[i].clickOpen, this.markerJson[i].resB, this.markerJson[i].otherId)
            }
          }
          else if (idName === this.markerJson[i].otherId && isSHow === false) {
            this.map.removeOverlay(this.markerJson[i].overlay)
            this.markerJson[i].visible = false
          }
        }
      }
    },
    // 添加图标集合 （修改于（王乐翔2022/11/11）：支持点击事件）
    addIconMarkerSelect (res, setMarkEvent) {
      res.spotObject.map((resL, i) => {
        // 清空上一次保留的

        // // 使用变量存储弹窗所需的 DOM 对象
        var popupId = document.getElementById(this.popupdivName)
        resL.spotArrone.map((resB, k) => {
          //新增放置overly的div
          let html = []
          html.push(resB.htmlString)
          var div = ''
          div = document.createElement('div')
          div.id = this.popupdivName + 'mianselect' + k
          div.className = k
          div.innerHTML = html.join('')
          popupId.appendChild(div)
          //新增overly\
          var marker = new Overlay({
            //overly的位置[11,22]格式
            position: [Number(resB.lng), Number(resB.lat)],
            //overly放置的div
            offset: [Number(resL.offsetX), Number(resL.offsetY)],
            element: div,
            insertFirst: false,
          })
          this.markerJsonSelect.push({
            otherId: resB.otherData == undefined ? '' : resB.otherData.markId,
            overlay: marker,
            divId: div.id
          })
          //逐个把overly添加到地图上
          this.map.addOverlay(marker)
          // 添加点击事件
          if (setMarkEvent) {
            this.setMarkClickEvent(div.id, setMarkEvent, resB, resB.otherData == undefined ? '' : resB.otherData.markId)
          }
        })
      })
    },
    // 面
    addPolygon (resArea) {
      resArea.polygonArr.map((res, i) => {
        let polyarr = []
        res.polygonJson.map((resK, k) => {
          if (resK.lat && resK.lng) {
            polyarr.push([resK.lng, resK.lat])
          } else {
            polyarr.push(resK)
          }
        })
        let curFeature = new Feature({
          // type: 'route',
          geometry: new Polygon([polyarr]),
          geometryName:
            res.otherData == undefined ? "" : res.otherData.polyId,
        });
        curFeature.set("text", res)
        const features = [
          curFeature
        ]
        // 创建矢量数据源
        const source = new OlSourceVector({
          features,
        })
        // 创建样式
        const style = new Style({
          stroke: new Stroke({
            width: res.weight,
            color: res.color,
            width: res.weight,
            lineDash: res.lineStyle == 'solid' ? [] : [6],
          }),
          fill: new Fill({
            color: this.hexToRgba(res.fillColor, res.fillOpacity),
          }),
        })

        // 创建矢量图层
        const areaLayer = new OlLayerVector({
          source,
          style,
          zIndex: 1,
        })
        let obj = {
          source: areaLayer,
          maxZoom: res.maxZoom,
          minZoom: res.minZoom,
          visible: false,
          otherId: res.otherData == undefined ? '' : res.otherData.polyId,
          bAni: res.bAni
        }
        this.polygonArray.push(obj)
        //逐个根据视野范围设置把overly添加到地图上
        if (res.minZoom || res.maxZoom) {
          if ((res.minZoom && res.minZoom < this.getzoom) || (res.maxZoom && res.maxZoom > this.getzoom)) {
            obj.visible = true
          } else {
            areaLayer.setVisible(false)
            obj.visible = false
          }
        } else {
          if (res.bAni) {
            areaLayer.setVisible(false)
            obj.visible = false
          } else {
            obj.visible = true
          }
        }
        // 添加到地图实例
        this.map.addLayer(areaLayer)
      })
    },
    setSelectPolygon (polygonId, styleObj) {
      this.clearSelectArea();
      this.polygonArray.map((res, i) => {
        if (polygonId == res.otherId) {
          if (res.source != undefined) {
            this.polygonSelectPreStyle = res.source.getStyle()
            // 创建样式
            const style = new Style({
              stroke: new Stroke({
                width: styleObj.weight,
                color: styleObj.color,
                width: styleObj.weight,
                lineDash: !styleObj.lineStyle || styleObj.lineStyle == "solid" ? [1] : [6],
              }),
              fill: new Fill({
                color: this.hexToRgba(styleObj.fillColor, styleObj.fillOpacity),
              }),
            });
            res.source.setStyle(style)
            this.polygonSelect = res.source
          }
          return;
        }
      });
    },
    // 线
    addLine (resArea) {
      resArea.lineArr.map((res, i) => {
        // 创建要素
        let linearr = []
        res.lineJson.map((resK, k) => {
          linearr.push([resK.lng || resK.longitude, resK.lat || resK.latitude])
        })
        // let polyarr = [res.polygonJson.lng, res.polygonJson.lat]
        let curFeature = new Feature({
          // type: 'route',
          geometry: new OlGeomLine(linearr),
          geometryName:
            res.otherData == undefined ? "" : res.otherData.lineId,
        });
        curFeature.set("text", res)
        const features = [
          curFeature
        ]
        // 创建矢量数据源
        const source = new OlSourceVector({
          features,
        })
        // 创建样式
        const style = new Style({
          stroke: new Stroke({
            color: res.color || '#000',
            width: res.weight || 4,
          }),
        })

        // 创建矢量图层
        const lineLayer = new OlLayerVector({
          source,
          style,
          zIndex: 1,
        })
        let obj = {
          source: lineLayer,
          otherId: res.otherData == undefined ? '' : res.otherData.lineId,
          maxZoom: res.maxZoom,
          minZoom: res.minZoom,
          visible: false,
          bAni: res.bAni
        }
        this.lineArray.push(obj)
        //逐个根据视野范围设置把overly添加到地图上
        if (res.minZoom || res.maxZoom) {
          if ((res.minZoom && res.minZoom < this.getzoom) || (res.maxZoom && res.maxZoom > this.getzoom)) {
            obj.visible = true
          } else {
            lineLayer.setVisible(false)
            obj.visible = false
          }
        } else {
          if (res.bAni) {
            lineLayer.setVisible(false)
            obj.visible = false
          } else {
            obj.visible = true
          }
        }
        // 添加到地图实例
        this.map.addLayer(lineLayer)
      })
    },
    setSelectLine (lineId, styleObj) {
      if (this.lineSelect) {
        this.map.removeLayer(this.lineSelect)
        this.map.removeLayer(this.lineSelectPreStyle)
        this.lineSelect = undefined
        this.lineSelectPreStyle = undefined
      }
      this.lineArray.map((res, i) => {
        if (lineId == res.otherId) {
          if (res.source != undefined) {
            // 创建样式
            // const style = new Style({
            //  stroke: new Stroke({
            //     color: styleObj.color,
            //     width: styleObj.weight,
            //     lineDash: !styleObj.lineStyle || styleObj.lineStyle == "solid" ? [1] : [6],
            //   })
            // });
            var width = 3
            var style = new Style({
              stroke: new Stroke({
                color: '#ffffff',
                width: width + 3
              })
            })


            let curFeature = new Feature({
              geometry: res.geometry,

            });
            const features = [
              curFeature
            ];
            // 创建矢量数据源
            const source = new OlSourceVector({
              features,
            });
            const lineLayer = new OlLayerVector({
              source,
              style,
              zIndex: 1,
            });
            this.map.addLayer(lineLayer)
            this.lineSelect = lineLayer
            style = new Style({
              stroke: new Stroke({
                color: 'rgba(0,156,255)',
                width: width
              })
            })
            const lineLayer2 = new OlLayerVector({
              source,
              style,
              zIndex: 1,
            });
            this.map.addLayer(lineLayer2)
            this.lineSelectPreStyle = lineLayer2
          }
          return;
        }
      });
    },
    //动画控制显示哪些线
    setLineVisibleByIndexRange (idName) {
      if (this.lineArray && this.lineArray.length > 0) {
        for (let i = 0; i < this.lineArray.length; i++) {
          if (idName == undefined) {
            if (this.lineArray[i].visible == false) {
              // this.map.addLayer(this.lineArray[i].source)
              this.lineArray[i].source.setVisible(true)
              this.lineArray[i].visible = true
            }
          } else if (this.lineArray[i].otherId.indexOf(idName) > -1) {
            if (this.lineArray[i].visible == false) {
              this.lineArray[i].source.setVisible(true)
              // this.map.addLayer(this.lineArray[i].source)
              this.lineArray[i].visible = true
            }
          }
        }
      }

    },
    // 16进制转rgba
    hexToRgba (hex, opacity) {
      var RGBA =
        'rgba(' +
        parseInt('0x' + hex.slice(1, 3)) +
        ',' +
        parseInt('0x' + hex.slice(3, 5)) +
        ',' +
        parseInt('0x' + hex.slice(5, 7)) +
        ',' +
        opacity +
        ')'
      return RGBA
    },
    // 弹窗
    addOverlay (resWin) {
      this.clearPopup()
      let html = []
      // 使用变量存储弹窗所需的 DOM 对象
      var container = document.getElementById(this.popupdivName)
      html.push(resWin.htmlString)
      container.innerHTML = html.join('')
      this.PopupO = new Overlay({
        element: container, //绑定 Overlay 对象和 DOM 对象的
        autoPan: resWin.autoPan, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
        autoPanAnimation: {
          duration: 250, //自动平移效果的动画时间 9毫秒）
        },
        offset: [
          Number(resWin.htmloffset.offsetX),
          Number(resWin.htmloffset.offsetY),
        ],
        positioning: 'bottom-center',
        zIndex: 99,
        insertFirst: false,
      })
      this.PopupO.setPosition([resWin.lng, resWin.lat]) //把 overlay 显示到指定的 x,y坐标
      // 创建一个弹窗 Overlay 对象
      // 将弹窗添加到 map 地图中
      this.map.addOverlay(this.PopupO)
    },
    // 图片
    addImage (resImg) {
      resImg.imgArr.map((res, i) => {
        let imageSource = new ImageStatic({
          url: res.imgUrl,
          projection: 'EPSG:4326',
          // imageExtent: res.lnglatimage
          //111，13，116，24
          imageExtent: [
            Number(res.lngStart),
            Number(res.latStart),
            Number(res.lngEnd),
            Number(res.latEnd),
          ],
        })
        let imageLayer = new ImageLayer({
          source: imageSource,
          opacity: Number(res.opacity),
          zIndex: 10
        })
        this.ImgArray.push({
          otherId: res.otherData == undefined ? '' : res.otherData.imgId,
          source: imageLayer,
        })
        this.map.addLayer(imageLayer)
      })
    },
    // 根据视野范围改变线显示的方法
    setMapBackgroundImageShowByZoom (curZoom) {
      if (this.ImgBackgroundImgArray) {
        this.ImgBackgroundImgArray.map((res, i) => {
          if (res.minZoom || res.maxZoom) {
            if ((res.minZoom && res.minZoom < curZoom) || (res.maxZoom && res.maxZoom > curZoom)) {
              if (res.source != undefined) {
                if (res.visible == false) {
                  res.source.setVisible(true)
                  res.visible = true
                }
              }
            } else {
              if (res.source != undefined) {
                if (res.visible) {
                  res.source.setVisible(false)
                  res.visible = false
                }
              }
            }
          }

        })
      }
    },
    // 图片
    addMapBackgroundImage (resImg) {
      resImg.imgArr.map((res, i) => {
        let imageSource = new ImageStatic({
          url: res.imgUrl,
          projection: 'EPSG:4326',
          // imageExtent: res.lnglat
          //111，13，116，24
          imageExtent: [
            Number(res.lngStart),
            Number(res.latStart),
            Number(res.lngEnd),
            Number(res.latEnd),
          ],
        })
        let imageLayer = new ImageLayer({
          source: imageSource,
          opacity: Number(res.opacity),
          zIndex: 0
        })
        var obj = {
          otherId: res.otherData == undefined ? '' : res.otherData.imgId,
          source: imageLayer,
          maxZoom: res.maxZoom,
          minZoom: res.minZoom,
          visible: false,
        }
        //逐个根据视野范围设置把overly添加到地图上
        if (res.minZoom || res.maxZoom) {
          if ((res.minZoom && res.minZoom < this.getzoom) || (res.maxZoom && res.maxZoom > this.getzoom)) {
            obj.visible = true
          } else {
            imageLayer.setVisible(false)
            obj.visible = false
          }
        } else {
          obj.visible = true
        }
        this.ImgBackgroundImgArray.push(obj)
        this.map.addLayer(imageLayer)
      })
    },
    // 面板
    addmianban (resWin) {
      // // 使用变量存储弹窗所需的 DOM 对象
      var popupId = document.getElementById(this.popupdivName)
      resWin.spotArrone.map((resB, k) => {
        let html = []
        html.push(resB.htmlString)
        var div = ''
        div = document.createElement('div')
        div.id = 'mian' + k
        div.innerHTML = html.join('')
        popupId.appendChild(div)
        var marker = new Overlay({
          //overly的位置[11,22]格式
          position: [Number(resB.lng), Number(resB.lat)],
          //overly放置的div
          offset: [Number(resWin.offsetX), Number(resWin.offsetY)],
          element: div,
        })
        this.markerJson.push({
          overlay: marker,
        })
        //逐个把overly添加到地图上
        this.map.addOverlay(marker)
      })
    },
    // 绘制区域的（行政区域）
    // =========
    getmapPoint (itemUrl) {
      var jsonArray = mapJson
      var mapPolygon = {
        clickOpen: false,
        polygonArr: [],
      }
      jsonArray.features.map((arr, o) => {
        let arrK = []
        arr.geometry.coordinates.map((res, i) => {
          arrK = res
          for (let k of arrK) {
            let resArry = []
            for (let t of k) {
              resArry.push({
                lng: t[0],
                lat: t[1],
              })
            }
            mapPolygon.polygonArr.push({
              color: '#0091ea',
              weight: 2,
              fillColor: '#80d8ff', //填充颜色
              fillOpacity: 0.3,
              lineStyle: 'solid', //多边形边得样式
              otherData: undefined,
              polygonJson: resArry,
            })
          }
        })
      })
      this.addPolygon(mapPolygon)
    },

    // 删除点
    clearShowdefault (item) {
      this.markerJson.map((res, i) => {
        if (item == undefined) {
          if (document.getElementById(res.divId)) {
            document.getElementById(res.divId).remove()
          }
          this.map.removeOverlay(res.overlay)
        } else if (res.otherId.indexOf(item) > -1) {
          if (document.getElementById(res.divId)) {
            document.getElementById(res.divId).remove()
          }
          this.map.removeOverlay(res.overlay)
          res.overlay = undefined

        }
      })
      if (item == undefined) {
        this.markerJson = []
      } else {
        for (let i = this.markerJson.length - 1; i >= 0; i--) {
          if (this.markerJson[i].overlay == undefined) {
            this.markerJson.splice(i, 1)
          }
        }
      }
    },
    // 删除选中点
    clearShowdefaultSelect (item) {
      this.markerJsonSelect.map((res, i) => {
        if (item == undefined) {
          if (document.getElementById(res.divId)) {
            document.getElementById(res.divId).remove()
          }
          this.map.removeOverlay(res.overlay)
        } else if (res.otherId.indexOf(item) > -1) {
          if (document.getElementById(res.divId)) {
            document.getElementById(res.divId).remove()
          }
          this.map.removeLayer(res.overlay)
          this.markerJsonSelect.splice(i, 1)
        }
      })
      if (item == undefined) {
        this.markerJsonSelect = []
      }
    },
    // 删除面
    clearShowarea (item) {
      this.polygonArray.map((res, i) => {
        if (item == undefined) {
          if (res.source != undefined) {
            this.map.removeLayer(res.source);
          }
        } else if (res.otherId.indexOf(item) > -1) {
          if (res.source != undefined) {
            this.map.removeLayer(res.source);
            res.source = undefined
          }
        }
      });
      if (item == undefined) {
        this.polygonArray = [];
      } else {
        for (let i = this.polygonArray.length - 1; i >= 0; i--) {
          if (this.polygonArray[i].source == undefined) {
            this.polygonArray.splice(i, 1)
          }
        }
      }
    },
    //删除选中线
    clearSelectLine () {
      if (this.lineSelect) {
        this.map.removeLayer(this.lineSelect)
        this.map.removeLayer(this.lineSelectPreStyle)
        this.lineSelect = undefined
        this.lineSelectPreStyle = undefined
      }
    },
    // 删除线
    clearShowLine (item) {
      this.lineArray.map((res, i) => {
        if (item == undefined) {
          if (res.source != undefined) {
            this.map.removeLayer(res.source)
          }
        } else if (res.otherId.indexOf(item) > -1) {
          if (res.source != undefined) {
            this.map.removeLayer(res.source)
            res.source = undefined
          }
        }
      })
      if (item == undefined) {
        this.lineArray = []
      } else {
        for (let i = this.lineArray.length - 1; i >= 0; i--) {
          if (this.lineArray[i].source == undefined) {
            this.lineArray.splice(i, 1)
          }
        }
      }
    },
    //删除所有地图选中要素状态
    clearAllSelect () {
      if (this.map) {
        let that = this;
        this.map.getInteractions().forEach(function (interaction) {
          if (interaction instanceof Select) {
            that.map.removeInteraction(interaction);
            return;
          }
        });
        // this.initSelect();
      }
    },
    // 图片
    clearImg (item) {
      if (this.ImgArray && this.ImgArray.length > 0) {
        this.ImgArray.map((res, i) => {
          if (item == undefined) {
            if (res.source != undefined) this.map.removeLayer(res.source)
            this.ImgArray = []
          } else if (item == res.otherId) {
            if (res.source != undefined) this.map.removeLayer(res.source)
            this.ImgArray.splice(i, 1)
          }
        })
      }
    },
    // 作为地图地图图片
    clearMapBackgroundImg (item) {
      if (this.ImgBackgroundImgArray && this.ImgBackgroundImgArray.length > 0) {
        this.ImgBackgroundImgArray.map((res, i) => {
          if (item == undefined) {
            if (res.source != undefined) this.map.removeLayer(res.source)
            this.ImgBackgroundImgArray = []
          } else if (item == res.otherId) {
            if (res.source != undefined) this.map.removeLayer(res.source)
            this.ImgBackgroundImgArray.splice(i, 1)
          }
        })
      }
    },
    // 图片动画
    addImageAniArr (resImg) {
      resImg.imgArr.map((res, i) => {
        var imageSource = new ImageStatic({
          url: res.imgUrl,
          projection: 'EPSG:4326',
          // imageExtent: res.lnglat
          //111，13，116，24
          imageExtent: [
            Number(res.lngStart),
            Number(res.latStart),
            Number(res.lngEnd),
            Number(res.latEnd),
          ],
        })
        var imageLayer = new ImageLayer({
          source: imageSource,
          opacity: Number(res.opacity),
          visible: false,
        })
        this.ImgAniArr.push({
          otherId: res.otherData == undefined ? '' : res.otherData.imgId,
          source: imageLayer,
        })
        this.map.addLayer(imageLayer)
      })
    },
    // 图片动画数组
    setImgAniShowByIndex (index) {
      if (this.ImgAniArr && this.ImgAniArr[index]) {
        this.ImgAniArr.map((res, i) => {
          if (res.source != undefined) {
            res.source.setVisible(false)
          }
        })
        if (this.ImgAniArr[index].source != undefined) {
          this.ImgAniArr[index].source.setZIndex(99)
          this.ImgAniArr[index].source.setVisible(true)
        }
      }
    },
    clearImgAniArr (item) {
      this.ImgAniArr.map((res, i) => {
        if (item == undefined) {
          if (res.source != undefined) this.map.removeLayer(res.source)
          this.ImgAniArr = []
        } else if (item == res.otherId) {
          if (res.source != undefined) this.map.removeLayer(res.source)
          this.ImgAniArr.splice(i, 1)
        }
      })
    },
    // 多雷达内容
    // 图片动画
    addImageAniArr2 (resImg) {
      let ImgAniArr = resImg.value.ImgAniArr
      resImg.imgArr.map((res, i) => {
        var imageSource = new ImageStatic({
          url: res.imgUrl,
          projection: 'EPSG:4326',
          imageExtent: [
            Number(res.lngStart),
            Number(res.latStart),
            Number(res.lngEnd),
            Number(res.latEnd),
          ],
        })
        var imageLayer = new ImageLayer({
          source: imageSource,
          opacity: Number(res.opacity),
          visible: false,
        })
        this[ImgAniArr].push({
          otherId: res.otherData == undefined ? '' : res.otherData.imgId,
          source: imageLayer,
        })
        this.map.addLayer(imageLayer)
      })
    },
    // 图片动画数组
    setImgAniShowByIndex2 (index, ImgAniArr) {
      if (this[ImgAniArr] && this[ImgAniArr][index]) {
        this[ImgAniArr].map((res, i) => {
          if (res.source != undefined) {
            res.source.setVisible(false)
          }
        })
        if (this[ImgAniArr][index].source != undefined) {
          this[ImgAniArr][index].source.setZIndex(99)
          this[ImgAniArr][index].source.setVisible(true)
        }
      }
    },
    clearImgAniArr2 (item) {

      this[item.ImgAniArr].map((res, i) => {
        if (item.otherId == undefined) {
          if (res.source != undefined) this.map.removeLayer(res.source)
          this[item.ImgAniArr] = []
        } else if (item.otherId == res.otherId) {
          if (res.source != undefined) this.map.removeLayer(res.source)
          this[item.ImgAniArr].splice(i, 1)
        }
      })
    },
    // 关闭弹窗
    clearPopup () {
      document.getElementById(this.popupdivName).innerHTML = ''
      if (this.PopupO != null) {
        this.PopupO.setPosition(undefined)
      }
    },
    // 追加一个指定图层
    addOneAniLayer (oneLayer, bShow) {
      let kt = this.constructSource(oneLayer)
      let tileLayer = new Tile({
        source: kt,
        opacity: oneLayer.opacity,
        name: 'addOneAniLayer' + this.aniLayerArr.length,
        visible: bShow != undefined ? bShow : false,
      })
      this.map.addLayer(tileLayer)
      this.aniLayerArr.push(tileLayer)
    },
    addAniLayerArr (arrLayer, bShow) {
      arrLayer.map((itm, i) => {
        let kt = this.constructSource(itm)
        let tileLayer = new Tile({
          source: kt,
          opacity: itm.opacity,
          name: 'addAniLayerArr' + i,
          visible: bShow != undefined ? bShow : false,
        })
        this.map.addLayer(tileLayer)
        this.aniLayerArr.push(tileLayer)
      })
    },
    setOneAniLayerShow (index) {
      if (this.aniLayerArr && this.aniLayerArr[index]) {
        this.aniLayerArr.map((res, i) => {
          if (res != undefined) {
            res.setVisible(false)
          }
        })
        if (this.aniLayerArr[index] != undefined) {
          this.aniLayerArr[index].setVisible(true)
        }
      }
    },
    // 清空所有图层
    clearAllAniLayer () {
      if (this.aniLayerArr == undefined || this.aniLayerArr.length == 0) return
      this.aniLayerArr.map((items, s) => {
        this.map.removeLayer(items)
      })
      this.aniLayerArr = []
    },
    // 移除一个指定图层
    removeOneAniLayer (index) {
      if (this.aniLayerArr == undefined || this.aniLayerArr.length == 0) return
      this.map.removeLayer(this.aniLayerArr[index])
      this.aniLayerArr.splice(index, 1)
    },
    // 清除
    getTypeSelected () {
      this.drawLayer.getSource().clear()
      this.drawMark = []
    },
    addInteraction (itm) {
      this.drawMark = []
      let value = itm
      if (value !== 'None') {
        this.draw = new Draw({
          source: this.drawLayer.getSource(),
          type: itm,
          geometryName: 'aaa' + 1,
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 3,
            }),
          }),
        })
        this.drawArr.push(this.draw)
        // 双击结束
        this.draw.on('drawend', (e) => {
          this.$emit('endDraw', this.drawMark)
          this.drawMark = []
        }),
          this.map.addInteraction(this.draw)
      }
    },
    syb () {
      this.draw.removeLastPoint()
    },
    endD () {
      this.map.removeInteraction(this.draw)
    },
    deleD () {
      this.drawLayer.getSource().removeFeature(delete1)
    },
    // 重新加载地图
    seeAgain () {
      let that = this
      setTimeout(function () {
        that.map.updateSize()
      }, 10)
    },
    /**
 * 添加风场图层
 */
    addWindLayer (jsonData, speed) {
      // 数据源
      this.windLayer = new WindLayer(jsonData, {
        forceRender: false,
        windOptions: {
          // particleMultiplier: 1 / 120, // 粒子路径数量的系数，不推荐使用（视野宽度 * 高度 * 系数），没看出差别
          velocityScale: speed ? 1 / speed : 1 / 500, // 对于粒子路径步长的乘积基数,越大越快
          paths: 5000, // 生成的粒子路径数量,越大线条越多
          maxAge: 20, // 粒子路径能够生成的最大帧数
          colorScale: [
            'rgb(255,255, 255)',

          ],
          frameRate: 50,
          width: 12,
          generateParticleOption: false
        },
        // map: map,
        // projection: 'EPSG:4326'
      });
      // 不设置成1之外会遮盖其他图层
      this.windLayer.setOpacity(0.9);
      this.map.addLayer(this.windLayer);
    },
    //清除风场图层
    clearWindLayer () {
      if (this.windLayer)
        this.map.removeLayer(this.windLayer)
    }

  },
}
</script>

<style lang="scss">
/* #map {
  position: absolute;
  height: 100%;
} */
/*隐藏ol的一些自带元素*/
.ol-attribution,
.ol-zoom {
  display: none;
}
div {
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
// 台风旋转动画
.icon_typhoonRotate {
  transform: rotate(360deg);
  animation: rotation 1.5s linear infinite;
}
@keyframes rotation {
  from {
    -webkit-transform: rotate(360deg);
  }

  to {
    -webkit-transform: rotate(0deg);
  }
}
// 水滴型
.icon-water {
  width: 28px;
  height: 28px;
  border: 2px solid rgba(43, 181, 255, 1);
  border-radius: 0px 18px 20px 18px;
  transform: rotate(-135deg);
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 5px;
}
.icon-water1 {
  width: 28px;
  height: 28px;
  border-radius: 0px 18px 20px 18px;
  transform: rotate(0deg);
  background-repeat: no-repeat;
  background-size: cover;
}
.sceneryname {
  color: rgba(255, 252, 0, 1);
  font-size: 19px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
}
</style>
