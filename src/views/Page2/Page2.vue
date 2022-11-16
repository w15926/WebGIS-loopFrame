<template>
  <div class="Page2">
    <Map />

    <!-- 组件循环（开发中添加其它属性时需沟通）start -->
    <template v-if="pageConfig && pageConfig.leftComponents">
      <div class="leftContainer">
        <component v-for="(item, index) in pageConfig.leftComponents" :receiveId="item.fileName + item.id" :key="index" :is="item.fileName" :fileCodes="item.fileCodes"
          style="marginBottom:20px;}" />
      </div>
    </template>

    <template v-if="pageConfig && pageConfig.centerComponents">
      <component v-for="(item, index) in pageConfig.centerComponents" :receiveId="item.fileName + item.id" :key="index" :is="item.fileName" :fileCodes="item.fileCodes"
        :style="{ left: item.x + 'px', top: item.y + 'px', position: 'absolute' }" />
    </template>

    <template v-if="pageConfig && pageConfig.rightComponents">
      <div class="rightContainer">
        <component v-for="(item, index) in pageConfig.rightComponents" :receiveId="item.fileName + item.id" :key="index" :is="item.fileName" :fileCodes="item.fileCodes"
          style="marginBotton:20px;" />
      </div>
    </template>
    <!-- 组件循环 end -->

  </div>
</template>

<script>
import Map from './Page2Map'

export default {
  components: {
    Map,
  },
  data () {
    return {
      pageConfig: null, // 页面基础配置
    }
  },
  created () {
    this.$bus.$on('renderPage2', data => this.renderPage2(data)) // 渲染页面
  },
  mounted () {
  },
  methods: {
    // 渲染页面
    async renderPage2 (data) {
      if (!data) {
        return
      }
      let temp = data

      // 容器order排序
      if (temp.leftComponents) {
        temp.leftComponents.sort(function (a, b) { return a.order - b.order })
      }
      if (temp.rightContainer) {
        temp.rightContainer.sort(function (a, b) { return a.order - b.order })
      }

      this.pageConfig = temp
      console.warn(this.pageConfig)

      if (this.pageConfig.showMap) {
        this.$bus.$emit('initPage2Map') // 开发中带参去渲染地图
      }
    }
  },
  updated () {
    // 清除左右容器最后一个组件的marginBottom
    const leftContainer = document.querySelector('.leftContainer')
    if (leftContainer && leftContainer.lastChild) {
      leftContainer.lastChild.style.marginBottom = '0px'
    }
    const rightContainer = document.querySelector('.rightContainer')
    if (rightContainer && rightContainer.lastChild) {
      rightContainer.lastChild.style.marginBottom = '0px'
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.Page2 {
  position: relative;
  .leftContainer,
  .rightContainer {
    position: absolute;
    top: 80px;
    max-width: 490px;
    height: 840px;
    overflow: hidden;
    &:hover {
      overflow-x: hidden;
      overflow-y: overlay;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
      }
    }
  }
  .leftContainer {
    left: 40px;
  }
  .rightContainer {
    right: 40px;
  }
}
</style>