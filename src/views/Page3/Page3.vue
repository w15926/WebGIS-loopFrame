<template>
  <div class="Page3" ref="Page3">

    <!---------------------------------------------- 组件循环（开发中添加其它属性时需沟通）start ---------------------------------------------->
    <!-- 左容器 -->
    <template v-if="page3Config && page3Config.leftComponents">
      <div class="leftContainer" :style="[
      {'top': page3Config.leftContainerY ? page3Config.leftContainerY + 'px' : ''},
      {'left':  page3Config.leftContainerX ? page3Config.leftContainerX + 'px' : ''},
      {'width':  page3Config.leftContainerWidth ? page3Config.leftContainerWidth + 'px' : ''},
      {'height':  page3Config.leftContainerHeight ? page3Config.leftContainerHeight + 'px' : ''},
      {'overflow':  page3Config.leftContainerWidth || page3Config.leftContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page3Config.leftComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>

    <!-- 绝对定位 -->
    <template v-if="page3Config && page3Config.absoluteComponents">
      <component v-for="(item, index) in page3Config.absoluteComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
        :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
        :style="{ 'position': 'absolute', 'left': item.x + 'px', top: item.y + 'px', 'zIndex': item.fileName === 'OLMap' ? '' : '1' }" />
    </template>

    <!-- 中间容器 -->
    <template v-if="page3Config && page3Config.centerComponets">
      <div class="centerContainer" :style="[
      {'top': page3Config.centerContainerY ? page3Config.centerContainerY + 'px' : '0'},
      {'left':  page3Config.centerContainerX ? page3Config.centerContainerX + 'px' : '0'},
      {'width':  page3Config.centerContainerWidth ? page3Config.centerContainerWidth + 'px' : ''},
      {'height':  page3Config.centerContainerHeight ? page3Config.centerContainerHeight + 'px' : ''},
      {'overflow':  page3Config.centerContainerWidth || page3Config.centerContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page3Config.centerComponets" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht" :paramObject="item.paramObject"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>

    <!-- 右容器（x为right） -->
    <template v-if="page3Config && page3Config.rightComponents">
      <div class="rightContainer" :style="[
      {'top': page3Config.rightContainerY ? page3Config.rightContainerY + 'px' : ''},
      {'left':  page3Config.rightContainerX ? page3Config.rightContainerX + 'px' : ''},
      {'width':  page3Config.rightContainerWidth ? page3Config.rightContainerWidth + 'px' : ''},
      {'height':  page3Config.rightContainerHeight ? page3Config.rightContainerHeight + 'px' : ''},
      {'overflow':  page3Config.rightContainerWidth || page3Config.rightContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page3Config.rightComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht" :paramObject="item.paramObject"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>
    <!---------------------------------------------- 组件循环 end ---------------------------------------------->

  </div>
</template>

<script>
export default {
  name: 'Page3',
  data () {
    return {
      page3Config: null, // 页面基础配置
    }
  },
  created () {
    // 渲染页面
    this.$bus.$on('pageIn', obj => {
      if (obj.to === this.$options.name && this.$options.methods[obj.methods]) {
        try {
          this.$refs.Page3.__vue__[obj.methods](obj.data)
        } catch (error) {
          Promise.reject(new Error(`该${this.$options.name}组件没有声明此方法`))
        }
      }
    })

    this.$bus.$on('mapOut', obj => {
      // 当前页地图加载完成
      if (obj.methods === 'loadedMap' && obj.data.page === this.$options.name) {
        try {
          this.$refs.Page3.__vue__[obj.methods]()
        } catch (error) {
          Promise.reject(new Error(`该${this.$options.name}组件没有声明此方法`))
        }
      }
    })
  },
  mounted () {
  },
  methods: {
    // 渲染页面
    async renderPage3 (data) {
      // 容器order排序
      if (data.leftComponents) {
        data.leftComponents.sort(function (a, b) { return a.order - b.order })
      }
      if (data.centerContainer) {
        data.rightContainer.sort(function (a, b) { return a.order - b.order })
      }
      if (data.rightContainer) {
        data.rightContainer.sort(function (a, b) { return a.order - b.order })
      }

      this.page3Config = data
      console.warn('page3Config', this.page3Config)

      // 转异步渲染地图
      setTimeout(() => {
        for (const item of this.page3Config.absoluteComponents) {
          if (item.fileName === 'OLMap') {
            const mapName = JSON.parse(this.$Base64.decode(item.paramObject)).mapName
            const obj = this.$config.mapAll[mapName]
            this.$bus.$emit('mapIn', {
              from: this.$options.name,
              to: 'OLMap',
              methods: 'initMap',
              triggerIds: item.triggerIds,
              data: obj
            })
            break
          }
        }
      }, 1000)

    },
    // 地图加载完成
    loadedMap () {
      console.log('Page3地图加载完成')
    }
  },
  updated () {
    // 如果左中右容器存在overflow则设置滚动条样式
    const leftContainer = document.querySelector('.leftContainer')
    if (leftContainer && leftContainer.style.overflow.length > 0) {
      leftContainer.style.overflowX = 'hidden'
      leftContainer.style.overflowY = 'overlay'
    }
    const centerContainer = document.querySelector('.centerContainer')
    if (centerContainer && centerContainer.style.overflow.length > 0) {
      centerContainer.style.overflowX = 'hidden'
      centerContainer.style.overflowY = 'overlay'
    }
    const rightContainer = document.querySelector('.rightContainer')
    if (rightContainer && rightContainer.style.overflow.length > 0) {
      rightContainer.style.overflowX = 'hidden'
      rightContainer.style.overflowY = 'overlay'
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.Page3 {
  position: relative;
  .leftContainer,
  .centerContainer,
  .rightContainer {
    position: absolute;
    overflow: hidden;
    z-index: 1;
    &::-webkit-scrollbar {
      width: 0px;
    }
    &:hover {
      overflow-x: hidden;
      overflow-y: overlay;
      &::-webkit-scrollbar {
        width: 6px;
      }
    }
  }
}
</style>