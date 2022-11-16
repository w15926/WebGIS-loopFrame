<template>
  <div class="index">
    <!-- 页面 -->
    <Nav />
    <TopMenu class="topMenu" />
    <div v-if="showPage">
      <Page :class="[{'leftAnimation':showLeftAnimation},{'rightAnimation':showRightAnimation}]" />
    </div>

    <!-- <component :class="[{'leftAnimation':showLeftAnimation},{'rightAnimation':showRightAnimation}]" v-for="(item, index) in pageList" :receiveId="item" :key="index"
      :is="item" /> -->

    <!-- 切换页面 箭头 -->
    <div v-show="showLeftArrow && isLeftOpacity" class="pageSwitch-leftArrow" @click="clickToggleArrows('left')">
      <img src="@/assets/img/system/left_arrow.png" alt="">
    </div>
    <div v-show="showRightArrow && isRightOpacity" class="pageSwitch-rightArrow" @click="clickToggleArrows('right')">
      <img src="@/assets/img/system/right_arrow.png" alt="">
    </div>
    <div v-show="showLeftArrow && isLeftOpacity" class="pageLeftShadow" />
    <div v-show="showRightArrow && isRightOpacity" class="pageRightShadow" />

    <!-- 切换页面 按钮 -->
    <div v-show="showPageSwitch" class="pageSwitch">
      <div :class="[{'pageSwitch-item':true},{'pageSwitch-item-active':item.isActive}]" v-for="(item,index) in switchPage" :key="index" @click="clickBtn(index)" />
    </div>

  </div>
</template>

<script>
import Page from './Page'

export default {
  components: {
    Page
  },
  data () {
    return {
      /* 分页 start */
      p1Animation: true,
      p2Animation: false,
      p3Animation: false,

      showLeftArrow: false,
      showRightArrow: false,
      isLeftOpacity: false,
      isRightOpacity: false,

      showPageSwitch: true,

      showPage: true,
      showLeftAnimation: false,
      showRightAnimation: false,
      isFirst: true,

      switchPage: [],
      /* 分页 end */

      res_initPage: {}, // 页面初始化res
      pageList: ['Page']
    }
  },
  watch: {
    switchPage (newVal) {
      this.showPageSwitch = true
      // only one page
      if (newVal.length === 1) {
        this.showLeftArrow = false
        this.showRightArrow = false
        this.showPageSwitch = false
      }
      // only two pages
      if (newVal.length === 2) {
        if (newVal[0] && newVal[0].isActive) {
          this.showLeftArrow = false
          this.showRightArrow = true
        }
        if (newVal[1] && newVal[1].isActive) {
          this.showLeftArrow = true
          this.showRightArrow = false
        }
      }
      // only three pages
      if (newVal.length === 3) {
        if (newVal[0] && newVal[0].isActive) {
          this.showLeftArrow = false
          this.showRightArrow = true
        }
        if (newVal[1] && newVal[1].isActive) {
          this.showLeftArrow = true
          this.showRightArrow = true
        }
        if (newVal[2] && newVal[2].isActive) {
          this.showLeftArrow = true
          this.showRightArrow = false
        }
      }
    },
  },
  created () {
    this.$bus.$on('changeTopMenu', data => this.changeTopMenu(data))
  },
  mounted () {
    document.addEventListener('mousemove', e => {
      if (e.clientX <= 150) this.isLeftOpacity = true
      else this.isLeftOpacity = false
      if (window.innerWidth - e.clientX <= 150) this.isRightOpacity = true
      else this.isRightOpacity = false
    })

    // 系统背景
    if (this.$config.commonConfig.systemBg) {
      if (this.$config.commonConfig.systemBg.color) {
        document.querySelector('.index').style.backgroundColor = this.$config.commonConfig.systemBg.color
      }
      if (this.$config.commonConfig.systemBg.url) {
        const div = document.querySelector('.index')
        div.style.backgroundImage = `url(../${this.$config.commonConfig.systemBg.url})`
        div.style.backgroundSize = '100% 100%'
      }
    }

    this.initPage()
  },
  methods: {
    // 初始化页面
    async initPage (receiveData) {
      // 调取接口字段说明
      this.res_initPage = {
        // 左容器
        leftComponents: [
          {
            id: 666,
            chName: 'Test3组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test3',
            order: 3,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09',
            x: 100,
            y: 100
          },
          {
            id: 666,
            chName: 'Test3组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test3',
            order: 1,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09',
            x: 100,
            y: 100
          },
          {
            id: 666,
            chName: 'Test3组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test3',
            order: 2,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09',
            x: 100,
            y: 100
          },
          {
            id: 666,
            chName: 'Test3组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test3',
            order: 4,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09',
            x: 100,
            y: 100
          },
        ],
        // 页面定位
        centerComponents: [
          {
            id: 666,
            chName: 'Test1组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test1', // 原pagecode
            order: 1,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09', // 不需要传三个：inputtime、updatetime、observationtime对前端来说的无效代码
            x: 500,
            y: 100
          },
          {
            id: 666,
            chName: 'Test2组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test2',
            order: 1,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09', // 不需要传三个：inputtime、updatetime、observationtime对前端来说的无效代码
            x: 600,
            y: 300
          },
        ],
        // 右容器
        rightComponents: [
          {
            id: 666,
            chName: 'Test3组件',
            province: '江苏省',
            city: '南京市',
            countyOrDistrict: '栖霞区',
            fileCodes: '',
            fileName: 'Test3',
            order: 1,
            paramObject: {},
            categoryCode: 'xxx类的code编码',
            categoryName: 'xxx类',
            time: '2022/11/06 15:35:09',
            x: 100,
            y: 100
          },
        ],
        showMap: true,
        moduleTitle: '首页',
        defaultPage: 1,
        pageCount: 3,
      }

      // 这里仅做框架效果的模拟
      if (receiveData && receiveData.loadPage) {
        if (receiveData.loadPage === 'APage') {
          this.res_initPage.leftComponents = [
            {
              id: 666,
              chName: 'Test3组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test3',
              order: 3,
              paramObject: {},
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09',
              x: 100,
              y: 100
            },
            {
              id: 666,
              chName: 'Test3组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test3',
              order: 1,
              paramObject: {},
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09',
              x: 100,
              y: 100
            },
            {
              id: 666,
              chName: 'Test3组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test3',
              order: 2,
              paramObject: {},
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09',
              x: 100,
              y: 100
            },
            {
              id: 666,
              chName: 'Test3组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test3',
              order: 4,
              paramObject: {},
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09',
              x: 100,
              y: 100
            },
          ]
          this.res_initPage.centerComponents = [
            {
              id: 666,
              chName: 'Test1组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test1', // 原pagecode
              order: 1,
              paramObject: {},
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09', // 不需要传三个：inputtime、updatetime、observationtime对前端来说的无效代码
              x: 500,
              y: 100
            },
            {
              id: 666,
              chName: 'Test2组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test2',
              order: 1,
              paramObject: {},
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09', // 不需要传三个：inputtime、updatetime、observationtime对前端来说的无效代码
              x: 600,
              y: 300
            },
          ]
        }
        if (receiveData.loadPage === 'BPage') {
          this.res_initPage.leftComponents = []
          this.res_initPage.centerComponents = []
          this.res_initPage.pageCount = 1
        }
      }

      // 处理分页功能
      if (!this.res_initPage.pageCount || this.res_initPage.pageCount === 1) {
        this.switchPage = [{ name: 'P1', isActive: true }]
      }
      if (this.res_initPage.pageCount === 2) {
        this.switchPage = [
          { name: 'P1', isActive: true },
          { name: 'P2', isActive: false },
        ]
      }
      if (this.res_initPage.pageCount === 3) {
        this.switchPage = [
          { name: 'P1', isActive: true },
          { name: 'P2', isActive: false },
          { name: 'P3', isActive: false }
        ]
      }

      // 默认哪一页
      if (this.res_initPage.defaultPage) {
        this.switchPage.forEach(item => item.isActive = false)
        this.clickBtn(Number(this.res_initPage.defaultPage) - 1)
      }
      else this.clickBtn(1)
    },
    // 点击分页按钮
    clickBtn (pageNum) {
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach(item => item.isActive = false)
      temp[pageNum].isActive = true
      this.switchPage = temp

      const sendData = () => {
        this.pageList = []
        this.pageList.push('Page')
        this.$bus.$emit('renderPage', this.res_initPage)
      }

      sendData()
      // if (this.isFirst) {
      //   this.isFirst = false
      //   sendData()
      // }
      // else {
      //   this.showPage = false
      //   setTimeout(() => {
      //     this.showPage = true
      //     sendData()
      //   }, 100)
      // }
    },
    // 点击切换箭头
    clickToggleArrows (direction) {
      let currentIndex = null
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      for (const i in temp) {
        if (temp[i].isActive) {
          currentIndex = Number(i)
          break
        }
      }
      if (direction === 'left') {
        this.clickBtn(currentIndex - 1)
        this.showLeftAnimation = true
        this.showRightAnimation = false
        setTimeout(() => {
          this.showLeftAnimation = false
        }, 600)
      }
      if (direction === 'right') {
        this.clickBtn(currentIndex + 1)
        this.showLeftAnimation = false
        this.showRightAnimation = true
        setTimeout(() => {
          this.showRightAnimation = false
        }, 600)
      }
    },
    changeTopMenu (receiveData) {
      // 拿到接收到的数据去调用接口再执行initPage

      // 这里仅做框架效果的模拟
      if (receiveData.activeMenu.viewName === 'APage') this.initPage({ loadPage: 'APage' })
      if (receiveData.activeMenu.viewName === 'BPage') this.initPage({ loadPage: 'BPage' })
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
  overflow: hidden;
  .pageSwitch-leftArrow,
  .pageSwitch-rightArrow {
    position: absolute;
    top: 550px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0.8;
    z-index: 9998;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .topMenu {
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
  }
  @keyframes leftAnimation {
    from {
      position: fixed;
      top: 120px;
      left: 0;
    }

    to {
      position: fixed;
      top: 120px;
      left: 100%;
    }
  }
  @keyframes rightAnimation {
    from {
      position: fixed;
      top: 120px;
      left: 0;
    }

    to {
      position: fixed;
      top: 120px;
      left: -100%;
    }
  }
  @keyframes opacityAnimation {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
  .leftAnimation {
    animation: leftAnimation 0.6s;
    // animation: opacityAnimation .5s;
  }
  .rightAnimation {
    animation: rightAnimation 0.6s;
    // animation: opacityAnimation .5s;
  }
  .pageLeftShadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 1080px;
    background: linear-gradient(
      to right,
      rgba(101, 101, 101, 0.5),
      transparent
    );
    z-index: 9997;
  }
  .pageRightShadow {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 1080px;
    background: linear-gradient(to left, rgba(101, 101, 101, 0.5), transparent);
    z-index: 9997;
  }
  .pageSwitch-leftArrow {
    left: 0;
  }
  .pageSwitch-rightArrow {
    right: 0;
  }
  .pageSwitch {
    position: absolute;
    top: 140px;
    right: 12px;
    display: flex;
    width: 150px;
    height: 50px;
    z-index: 9999;
    .pageSwitch-item {
      margin-right: 10px;
      width: 40px;
      height: 10px;
      line-height: 50px;
      text-align: center;
      color: #0be7d1;
      background: #126e61;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
    .pageSwitch-item-active {
      color: #fff;
      background-color: #1bc7ad;
    }
  }
}
</style>