<template>
  <div class="Page1" ref="Page1">

    <!---------------------------------------------- 组件循环（开发中添加其它属性时需沟通）start ---------------------------------------------->
    <!-- 左容器 -->
    <template v-if="page1Config && page1Config.leftComponents">
      <div class="leftContainer" :style="[
      {'top': page1Config.leftContainerY ? page1Config.leftContainerY + 'px' : ''},
      {'left':  page1Config.leftContainerX ? page1Config.leftContainerX + 'px' : ''},
      {'width':  page1Config.leftContainerWidth ? page1Config.leftContainerWidth + 'px' : ''},
      {'height':  page1Config.leftContainerHeight ? page1Config.leftContainerHeight + 'px' : ''},
      {'overflow':  page1Config.leftContainerWidth || page1Config.leftContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page1Config.leftComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>

    <!-- 绝对定位 -->
    <template v-if="page1Config && page1Config.absoluteComponents">
      <component v-for="(item, index) in page1Config.absoluteComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
        :fileCodes="item.fileCodes" :paramObject="item.paramObject" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht"
        :style="{ 'position': 'absolute', 'left': item.x + 'px', top: item.y + 'px', 'zIndex': item.fileName === 'OLMap' ? '' : '1' }" />
    </template>

    <!-- 中间容器 -->
    <template v-if="page1Config && page1Config.centerComponets">
      <div class="centerContainer" :style="[
      {'top': page1Config.centerContainerY ? page1Config.centerContainerY + 'px' : '0'},
      {'left':  page1Config.centerContainerX ? page1Config.centerContainerX + 'px' : '0'},
      {'width':  page1Config.centerContainerWidth ? page1Config.centerContainerWidth + 'px' : ''},
      {'height':  page1Config.centerContainerHeight ? page1Config.centerContainerHeight + 'px' : ''},
      {'overflow':  page1Config.centerContainerWidth || page1Config.centerContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page1Config.centerComponets" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht" :paramObject="item.paramObject"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>

    <!-- 右容器 -->
    <template v-if="page1Config && page1Config.rightComponents">
      <div class="rightContainer" :style="[
      {'top': page1Config.rightContainerY ? page1Config.rightContainerY + 'px' : ''},
      {'left':  page1Config.rightContainerX ? page1Config.rightContainerX + 'px' : ''},
      {'width':  page1Config.rightContainerWidth ? page1Config.rightContainerWidth + 'px' : ''},
      {'height':  page1Config.rightContainerHeight ? page1Config.rightContainerHeight + 'px' : ''},
      {'overflow':  page1Config.rightContainerWidth || page1Config.rightContainerHeight ? 'hidden' : '' }
      ]">
        <component v-for="(item, index) in page1Config.rightComponents" :receiveId="item.fileName + '_' + item.id" :key="index" :is="item.fileName"
          :fileCodes="item.fileCodes" :triggerIds="item.triggerIds" :width="item.width" :height="item.heitht" :paramObject="item.paramObject"
          :style="{'margin': item.margin || '0'}" />
      </div>
    </template>
    <!---------------------------------------------- 组件循环 end ---------------------------------------------->

  </div>
</template>

<script>
export default {
  name: 'Page1',
  data () {
    return {
      page1Config: null, // 页面基础配置
    }
  },
  created () {
    // this.$config // 任意位置使用所有配置档
    // this.$methods // 任意位置调用所有公共方法

    // 渲染页面
    this.$bus.$on('pageIn', obj => {
      if (obj.to === this.$options.name && this.$options.methods[obj.methods]) {
        try {
          this.$refs.Page1.__vue__[obj.methods](obj.data)
        } catch (error) {
          Promise.reject(new Error(`该${this.$options.name}组件没有声明此方法`))
        }
      }
    })

    this.$bus.$on('mapOut', obj => {
      // 当前页地图加载完成
      if (obj.methods === 'loadedMap' && obj.data.page === this.$options.name) {
        try {
          this.$refs.Page1.__vue__[obj.methods]()
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
    async renderPage1 (data) {
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

      this.page1Config = data
      console.warn('page1Config', this.page1Config)

      // 转异步渲染地图
      setTimeout(() => {
        for (const item of this.page1Config.absoluteComponents) {
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
      console.log('Page1地图加载完成')
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
.Page1 {
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