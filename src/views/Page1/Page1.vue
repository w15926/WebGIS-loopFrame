<template>
  <div class="Page1">

    <!-- 组件循环（开发中添加其它属性时需沟通）start -->
    <template v-if="page1Config && page1Config.leftComponents">
      <div class="leftContainer">
        <component v-for="(item, index) in page1Config.leftComponents" :receiveId="item.fileName + item.id" :key="index" :is="item.fileName" :fileCodes="item.fileCodes"
          :paramObject="item.paramObject" :width="item.width" :height="item.heitht" style="marginBottom:20px;}" />
      </div>
    </template>

    <template v-if="page1Config && page1Config.centerComponents">
      <component v-for="(item, index) in page1Config.centerComponents" :receiveId="item.fileName + item.id" :key="index" :is="item.fileName" :fileCodes="item.fileCodes"
        :paramObject="item.paramObject" :width="item.width" :height="item.heitht"
        :style="{ position: 'absolute', left: item.x + 'px', top: item.y + 'px', zIndex: item.fileName === 'Map' ? '' : '1' }" />
    </template>

    <template v-if="page1Config && page1Config.rightComponents">
      <div class="rightContainer">
        <component v-for="(item, index) in page1Config.rightComponents" :receiveId="item.fileName + item.id" :key="index" :is="item.fileName" :fileCodes="item.fileCodes"
          :width="item.width" :height="item.heitht" :paramObject="item.paramObject" style="marginBotton:20px;" />
      </div>
    </template>
    <!-- 组件循环 end -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      page1Config: null, // 页面基础配置
    }
  },
  created () {
    // this.$config // 任意位置使用所有配置档
    // this.$methods // 任意位置调用所有公共方法
    // 渲染页面
    this.$bus.$on('renderPage1', data => this.renderPage1(data))
  },
  mounted () {
  },
  methods: {
    // 渲染页面
    async renderPage1 (data) {
      let temp = JSON.parse(JSON.stringify(data))

      // 容器order排序
      if (temp.leftComponents) {
        temp.leftComponents.sort(function (a, b) { return a.order - b.order })
      }
      if (temp.rightContainer) {
        temp.rightContainer.sort(function (a, b) { return a.order - b.order })
      }

      // 设置监听Page3地图加载成功事件的名称
      for (const item of temp.centerComponents) {
        if (item.fileName === 'Map') {
          // 在任意组件中监听此session的value判断当前页地图是否加载完成
          sessionStorage.setItem('page1MapName', `map_Map${item.id}Success`)
          break
        }
      }

      this.page1Config = temp
      console.warn('page1Config', this.page1Config)
    },
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
.Page1 {
  position: relative;
  .leftContainer,
  .rightContainer {
    position: absolute;
    top: 80px;
    // max-width: 490px;
    height: 840px;
    overflow: hidden;
    z-index: 1;
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