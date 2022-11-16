<template>
  <div class="HomePage1">
    <Map />
    <h1 style="position:absolute;marginTop:150px;;color:pink;">这是首页</h1>
    <component v-for="(item, index) in centerList" :receiveId="item.pagecode + item.id" :key="index" :fileCodes="item.datacode" :ref="item.pagecode + item.id"
      :is="item.pagecode" :style="{ position: 'absolute', top: item.y + 'px', left: item.x + 'px' }" />
  </div>
</template>

<script>
// api or methods
import {
  selectSCGP
} from '@/api/demo'

// 
import Map from './HomePage1Map'
import Test1 from '@/components/content/Test1/Test1'
import Test2 from '@/components/content/Test2/Test2'

export default {
  components: {
    Map,
    Test1,
    Test2
  },
  data () {
    return {
      centerList: [
        {
          pagecode: 'Test1',
          id: 1,
          datacode: 'xxx',
          x: 300,
          y: 200
        },
        {
          pagecode: 'Test2',
          id: 2,
          datacode: 'xxx',
          x: 600,
          y: 200
        },
      ]
    }
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const data = {
        Province: '山东省',
        City: '青岛市',
        Cnty: '黄岛区',
      }
      let res = await selectSCGP(data)
      console.log('接口数据', res)
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.HomePage1 {
}
</style>