<template>
  <div class="index">
    <Nav />
    <TopMenu />
    <!-- 所有页面组件 -->
    <component v-for="(item, index) in componentList" :key="index" :is="item" />
  </div>
</template>

<script>
// 固定组件
import Nav from '@/components/content/Nav/Nav'
import TopMenu from '@/components/content/TopMenu/TopMenu'

// 页面
import Home from '@/views/Home/Home'
import About from '@/views/About/About'

export default {
  components: {
    Nav,
    TopMenu,
    Home,
    About
  },
  data () {
    return {
      componentList: ['Home']
    }
  },
  watch: {
    '$store.state.baseInfo.activeState.activeMenu' (newVal, oldVal) {
      this.componentList = []
      this.componentList.push(newVal)
    }
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {

    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.index {
  position: relative;
  width: 1920px;
  height: 1080px;
  background-color: #000;
  overflow: hidden;
}
</style>