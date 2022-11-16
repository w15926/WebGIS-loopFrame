/* 
 * openPop：所有组件打开弹出层
 * closePop：所有组件关闭弹出层（写在父页面里）
 */
<template>
  <div :id="receiveId" :style="{ '--theme-border': borderStyle }">
    <component v-for="(item, index) in list" :key="index" :receiveId="pageId ? pageId + item.pagecode : item.pagecode + item.id" :is="item.pagecode"
      :fileCodes="item.datacode" :ref="'refRightContent_'+item.pagecode" :showExport="showExport"
      :style="(index === list.length - 1 ) || list.length === 1 ? '' : 'marginBottom: 10px;'" :width="item.pluginwidth" :paramObject="item.paramobject"
      @changeMap="changeMap" @clickSpecificEntryListItem="clickSpecificEntryListItem" @closeShadowVideos="closeShadowVideos"
      @openPreviewPicturePop="openPreviewPicturePop" @openPop="openPop" @setParamObject="setParamObject" :lngLat="lngLat" :showBg="showBg"
      moduleTitle="网格预报-网格时空分辨率 3H 5KM" @changeIcon="changeIcon" @getRadarData="getRadarData" @getDistributionMapData="getDistributionMapData"
      @changeDistribution="changeDistribution" @watchThematicMapsStations="watchThematicMapsStations" :showThematicMapBorder="false" @isExistTyphoon="isExistTyphoon"
      @renderTyphoon="renderTyphoon" @clearTyphoon="clearTyphoon" @changeTfMapLngLat="changeTfMapLngLat" :timeAxisIndex="timeAxisIndex"
      :showOtherStationsPoint="showOtherStationsPoint" :current_id="current_id" />

  </div>
</template>

<script>
import Precipitations from '@/components/content/Precipitations/Precipitations'
import Precipitation24h from '@/components/content/Precipitation24h/Precipitation24h'
import GridLive from '@/components/content/GridLive/GridLive'
import SpecialServiceLegend from '@/components/content/SpecialServiceLegend/SpecialServiceLegend'
import SpecialServiceList from '@/components/content/SpecialServiceList/SpecialServiceList'
import Case from '@/components/content/Case/Case'
import ShellInventory from '@/components/content/ShellInventory/ShellInventory'
import LiveData from '@/components/content/LiveData/LiveData'
import ShadowBriefing from '@/components/content/ShadowBriefing/ShadowBriefing'
import BlueberryReport from '@/components/content/BlueberryReport/BlueberryReport'
import SpecificEntryList from '@/components/content/SpecificEntryList/SpecificEntryList'
import RelevantInfo from '@/components/content/RelevantInfo/RelevantInfo'
import EagleImg from '@/components/content/EagleImg/EagleImg'
import Camera from '@/components/content/Camera/Camera'
import JobRecord from '@/components/content/JobRecord/JobRecord'
import EarlywarningChartStatistics from '@/components/content/EarlywarningChartStatistics/EarlywarningChartStatistics'
import Cumulative from '@/components/content/Cumulative/Cumulative'
import SpecificService from '@/components/content/SpecificService/SpecificService'
import EquipmentType from '@/components/content/EquipmentType/EquipmentType'
import SummaryModule from '@/components/content/SummaryModule/SummaryModule'
import Cloudburst from '@/components/content/Ziliao/Cloudburst'
import Lightning from '@/components/content/Ziliao/Lightning'
import ColdWave from '@/components/content/Ziliao/ColdWave'
import WindRisk from '@/components/content/Ziliao/WindRisk'
import ThematicMap from '@/components/content/ThematicMap/ThematicMap'
import ThematicMaps from '@/components/content/ThematicMaps/ThematicMaps'
import Alert from '@/components/content/Alert/Alert'
import LegendBox from '@/components/content/LegendBox/LegendBox'
import Riskzoningtu from '@/components/content/Riskzoningtus/Riskzoningtus'
import RiskPicture from '@/components/content/G60/RiskPicture/RiskPicture'
import ElementSelection from '@/components/content/ElementSelection/ElementSelection'
import HoursTrendNew from '@/components/content/G60/HoursTrendNew/HoursTrendNew.vue' //小时预报
import TodayStationNew from '@/components/content/G60/TodayStationNew/TodayStationNew.vue' //今日自动站到站情况
import LiveMap from '@/components/content/G60/LiveMap/LiveMap'
import FutureTrends from '@/components/content/G60/FutureTrends/FutureTrends'
import TyphoonTrack from '@/components/content/G60/TyphoonTrack/TyphoonTrack'

import SwiperCorpsScenic from '@/components/content/G60/SwiperCorpsScenic/SwiperCorpsScenic'
import WindProduct from '@/components/content/WindProduct/WindProduct.vue'
import IndexOfTourismTwoNew from '@/components/content/G60/IndexOfTourismTwo/IndexOfTourismTwoNew.vue' //旅游指数新版
import OrnamentalForecast from '@/components/content/G60/OrnamentalForecast/OrnamentalForecast'   //郁金香观赏预报
import TrafficWeather from '@/components/content/G60/TrafficWeather/TrafficWeather'
export default {
  components: {
    Precipitations,
    Precipitation24h,
    GridLive,
    SpecialServiceLegend,
    SpecialServiceList,
    Case,
    ShellInventory,
    LiveData,
    ShadowBriefing,
    BlueberryReport,
    SpecificEntryList,
    RelevantInfo,
    EagleImg,
    Camera,
    JobRecord,
    EarlywarningChartStatistics,
    Cumulative,
    SpecificService,
    EquipmentType,
    SummaryModule,
    ColdWave,
    Lightning,
    WindRisk,
    Cloudburst,
    ThematicMap,
    ThematicMaps,
    Alert,
    LegendBox,
    ElementSelection,

    Riskzoningtu,
    HoursTrendNew,
    TodayStationNew,
    LiveMap,
    FutureTrends,
    TyphoonTrack,

    SwiperCorpsScenic,
    WindProduct,
    RiskPicture,

    IndexOfTourismTwoNew,
    OrnamentalForecast,

    // 交通各个站点实况
    TrafficWeather
  },
  props: {
    receiveId: {
      type: String,
      default: 'rightContent',
    },
    componentList: {
      type: Array,
      default: [],
    },
    // 初始
    lngLat: {
      type: [Object, Array],
      default: () => { },
    },
    showExport: {
      type: Boolean,
      default: true
    },
    showOtherStationsPoint: {
      type: Boolean,
      default: true
    },
    showBg: {
      type: Boolean,
      default: false,
    },
    timeAxisIndex: {
      type: String,
      default: '0'
    },
    current_id: {
      type: String | Number,
      default: '1' | 1
    }
  },
  watch: {
    componentList: {
      handler (newV) {
        if (newV) {
          console.warn(newV)
          let temp = JSON.parse(JSON.stringify(newV))
          temp = temp.sort(function (a, b) { return a.ordert < b.ordert ? -1 : 1 })
          this.list = temp
        }
      },
      // immediate: true,
      deep: true
    },
    receiveId: {
      handler (newV) {
        // if (newV)
      },
      immediate: true
    },
  },
  data () {
    return {
      list: [],
    }
  },
  mounted () {
  },
  methods: {
  },
}
</script>