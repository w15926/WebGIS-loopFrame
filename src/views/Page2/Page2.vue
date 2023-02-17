<template>
  <div class="Page2" ref="Page2">

    <!---------------------------------------------- 组件循环（开发中添加其它属性时需沟通）start ---------------------------------------------->
    <!-- 左容器 -->
    <template v-if="page2Config && page2Config.leftComponents">
      <div class="leftContainer" :style="[
      {'top': page2Config.leftContainerY ? page2Config.leftContainerY + 'px' : ''},
      {'left':  page2Config.leftContainerX ? page2Config.leftContainerX + 'px' : ''},
      {'width':  page2Config.leftContainerWidth ? page2Config.leftContainerWidth + 'px' : ''},
      {'height':  page2Config.leftContainerHeight ? page2Config.leftContainerHeight + 'px' : ''},
      {'overflow':  page2Config.leftContainerWidth || page2Config.leftContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page2Config.leftComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>

    <!-- 绝对定位 -->
    <template v-if="page2Config && page2Config.absoluteComponents">
      <component v-for="(item, index) in page2Config.absoluteComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
        :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
        :style="{ 'position': 'absolute', 'left': item.x + 'px', top: item.y + 'px', 'zIndex': item.fileName === 'OLMap' ? '' : '1' }" />
    </template>

    <!-- 中间容器 -->
    <template v-if="page2Config && page2Config.centerComponets">
      <div class="centerContainer" :style="[
      {'top': page2Config.centerContainerY ? page2Config.centerContainerY + 'px' : '0'},
      {'left':  page2Config.centerContainerX ? page2Config.centerContainerX + 'px' : '0'},
      {'width':  page2Config.centerContainerWidth ? page2Config.centerContainerWidth + 'px' : ''},
      {'height':  page2Config.centerContainerHeight ? page2Config.centerContainerHeight + 'px' : ''},
      {'overflow':  page2Config.centerContainerWidth || page2Config.centerContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page2Config.centerComponets" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>

    <!-- 右容器（x为right） -->
    <template v-if="page2Config && page2Config.rightComponents">
      <div class="rightContainer" :style="[
      {'top': page2Config.rightContainerY ? page2Config.rightContainerY + 'px' : ''},
      {'left':  page2Config.rightContainerX ? page2Config.rightContainerX + 'px' : ''},
      {'width':  page2Config.rightContainerWidth ? page2Config.rightContainerWidth + 'px' : ''},
      {'height':  page2Config.rightContainerHeight ? page2Config.rightContainerHeight + 'px' : ''},
      {'overflow':  page2Config.rightContainerWidth || page2Config.rightContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page2Config.rightComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht" :paramObject="item.paramObject"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>
    <!---------------------------------------------- 组件循环 end ---------------------------------------------->

  </div>
</template>

<script>
export default {
  name: 'Page2',
  data () {
    return {
      page2Config: null, // 页面基础配置
    }
  },
  created () {
    // 渲染页面
    this.$bus.$on('pageIn', obj => {
      if (obj.to === this.$options.name && this.$options.methods[obj.methods]) {
        try {
          this.$refs.Page2.__vue__[obj.methods](obj.data)
        } catch (error) {
          Promise.reject(new Error(`该${this.$options.name}组件没有声明此方法`))
        }
      }
    })

    this.$bus.$on('mapOut', obj => {
      // 当前页地图加载完成
      if (obj.methods === 'loadedMap' && obj.data.page === this.$options.name) {
        try {
          this.$refs.Page2.__vue__[obj.methods]()
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
    async renderPage2 (data) {
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

      this.page2Config = data
      console.warn('page2Config', this.page2Config)

      // 转异步渲染地图
      setTimeout(() => {
        for (const item of this.page2Config.absoluteComponents) {
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
      console.log('Page2地图加载完成')
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
.Page2 {
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