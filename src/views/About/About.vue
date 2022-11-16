<template>
  <div class="Home">
    <Page0 :class="[{'page0':p1Animation},{'page0Left':p2Animation},{'page0Left2X':p3Animation}]" />
    <Page1 :class="[{'page1':p1Animation},{'page1Left':p2Animation},{'page1Left2X':p3Animation}]" />
    <Page2 :class="[{'page2':p1Animation},{'page2Left':p2Animation},{'page2Left2X':p3Animation}]" />

    <!-- 切换页面 箭头 -->
    <div v-show="showLeftArrow && isLeftOpacity" class="pageSwitch-leftArrow" @click="clickLeftArrow">
      <img src="@/assets/img/system/left_arrow.png" alt="">
    </div>
    <div v-show="showRightArrow && isRightOpacity" class="pageSwitch-rightArrow" @click="clickRightArrow">
      <img src="@/assets/img/system/right_arrow.png" alt="">
    </div>
    <div v-show="showLeftArrow && isLeftOpacity" class="pageLeftShadow" />
    <div v-show="showRightArrow && isRightOpacity" class="pageRightShadow" />

    <!-- 切换页面 按钮 -->
    <div class="pageSwitch">
      <div :class="[{'pageSwitch-item':true},{'pageSwitch-item-active':item.isActive}]" v-for="(item,index) in switchPage" :key="index" @click="clickBtn(index)" />
    </div>

  </div>
</template>

<script>
import Page0 from './AboutPage1/AboutPage1'
import Page1 from './AboutPage2/AboutPage2'
import Page2 from './AboutPage3/AboutPage3'

export default {
  components: {
    Page0,
    Page1,
    Page2
  },
  data () {
    return {
      p1Animation: true,
      p2Animation: false,
      p3Animation: false,

      showLeftArrow: false,
      showRightArrow: false,
      isLeftOpacity: false,
      isRightOpacity: false,

      switchPage: [
        { name: 'P1', isActive: true },
        { name: 'P2', isActive: false },
        { name: 'P3', isActive: false },
      ],
    }
  },
  watch: {
    switchPage: {
      handler (newVal) {
        if (newVal[0].isActive) {
          this.showLeftArrow = false
          this.showRightArrow = true
        }
        if (newVal[1].isActive) {
          this.showLeftArrow = true
          this.showRightArrow = true
        }
        if (newVal[2].isActive) {
          this.showLeftArrow = true
          this.showRightArrow = false
        }
      },
      immediate: true,
      deep: true
    }
  },
  created () {

  },
  mounted () {
    document.addEventListener('mousemove', e => {
      if (e.clientX <= 150) this.isLeftOpacity = true
      else this.isLeftOpacity = false
      if (window.innerWidth - e.clientX <= 150) this.isRightOpacity = true
      else this.isRightOpacity = false
    })
    // 默认哪一页
    // let str = this.$store.state.settingsPanel.resetPageNum
    let str = '2'
    if (str) {
      this.switchPage.forEach(item => item.isActive = false)
      this.clickBtn(Number(str) - 1)
    }
  },
  methods: {
    clickBtn (pageNum) {
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach(item => item.isActive = false)
      temp[pageNum].isActive = true
      this.switchPage = temp
      if (pageNum === 0) {
        this.p1Animation = true
        this.p2Animation = false
        this.p3Animation = false
      }
      if (pageNum === 1) {
        this.p1Animation = false
        this.p2Animation = true
        this.p3Animation = false
      }
      if (pageNum === 2) {
        this.p1Animation = false
        this.p2Animation = false
        this.p3Animation = true
      }
    },
    clickLeftArrow () {
      let currentIndex = null
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach((item, index) => {
        if (item.isActive) currentIndex = index
      })
      this.clickBtn(currentIndex - 1)
    },
    clickRightArrow () {
      let currentIndex = null
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach((item, index) => {
        if (item.isActive) currentIndex = index
      })
      this.clickBtn(currentIndex + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.Home {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  .toptext {
    position: absolute;
    top: 144px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
}
</style>