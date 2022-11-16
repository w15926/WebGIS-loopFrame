<template>
  <div class="index">
    <Nav />
    <TopMenu class="topMenu" />

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
    <div v-show="showPageBtns" class="pageSwitch">
      <div :class="[{'pageSwitch-item':true},{'pageSwitch-item-active':item.isActive}]" v-for="(item,index) in switchPage" :key="index" @click="clickBtn(index)" />
    </div>

  </div>
</template>

<script>
import Page0 from './Page1/Page1'
import Page1 from './Page2/Page2'
import Page2 from './Page3/Page3'

export default {
  components: {
    Page0,
    Page1,
    Page2
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

      switchPage: [],
      showPageBtns: true,
      /* 分页 end */

      /* 每页数据 */
      res_initPage: {
        page1: {
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
          moduleTitle: 'APage-1',
        },
        page2: {
          leftComponents: [],
          centerComponents: [],
          rightComponents: [{
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
          },],
          showMap: false,
          moduleTitle: 'APage-2',
        },
        page3: {
          leftComponents: [],
          centerComponents: [],
          rightComponents: [],
          showMap: true,
          moduleTitle: 'APage-3',
        },
        defaultPage: 1, // 默认哪一页
        pageCount: 3, // 总页数
      },
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
    // 改变顶部菜单
    this.$bus.$on('changeTopMenu', data => this.changeTopMenu(data))
  },
  mounted () {
    // 分页阴影
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
    initPage (receiveData) {
      // 调取接口

      // 这里仅做框架效果的模拟
      if (receiveData && receiveData.loadPage) {
        if (receiveData.loadPage === 'APage') {
          this.res_initPage.page1.leftComponents = [
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
          this.res_initPage.page1.centerComponents = [
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
          this.res_initPage.page1.leftComponents = []
          this.res_initPage.page1.centerComponents = []
          this.res_initPage.pageCount = 1
        }
      }

      // 处理分页功能
      {
        if (!this.res_initPage.pageCount || this.res_initPage.pageCount === 1) {
          this.switchPage = [{ name: 'P1', isActive: true }]
          this.showPageBtns = false
        }
        if (this.res_initPage.pageCount === 2) {
          this.switchPage = [
            { name: 'P1', isActive: true },
            { name: 'P2', isActive: false },
          ]
          this.showPageBtns = true
        }
        if (this.res_initPage.pageCount === 3) {
          this.switchPage = [
            { name: 'P1', isActive: true },
            { name: 'P2', isActive: false },
            { name: 'P3', isActive: false }
          ]
          this.showPageBtns = true
        }
      }

      // 默认哪一页
      {
        if (String(this.res_initPage.defaultPage)) {
          if (String(this.res_initPage.defaultPage) === '1') {
            this.switchPage.forEach(item => item.isActive = false)
            this.clickBtn(Number(this.res_initPage.defaultPage) - 1)
          }
        }
        else this.clickBtn(0)
      }
    },
    // 改变顶部菜单
    changeTopMenu (receiveData) {
      // 拿到接收到的数据去调用接口再执行initPage

      // 这里仅做框架效果的模拟
      if (receiveData.activeMenu.viewName === 'APage') this.initPage({ loadPage: 'APage' })
      if (receiveData.activeMenu.viewName === 'BPage') this.initPage({ loadPage: 'BPage' })
    },
    // 点击分页按钮
    clickBtn (pageNum) {
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach(item => item.isActive = false)
      temp[pageNum].isActive = true
      this.switchPage = temp

      // 分页动画
      {
        this.pageList = []
        this.pageList.push('Page')
        if (pageNum === 0) {
          this.p1Animation = true
          this.p2Animation = false
          this.p3Animation = false
          this.$bus.$emit('renderPage1', this.res_initPage.page1)
        }
        if (pageNum === 1) {
          this.p1Animation = false
          this.p2Animation = true
          this.p3Animation = false
          this.$bus.$emit('renderPage2', this.res_initPage.page2)
        }
        if (pageNum === 2) {
          this.p1Animation = false
          this.p2Animation = false
          this.p3Animation = true
          this.$bus.$emit('renderPage3', this.res_initPage.page3)
        }
      }
    },
    // 点击左箭头
    clickLeftArrow () {
      let currentIndex = null
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach((item, index) => {
        if (item.isActive) currentIndex = index
      })
      this.clickBtn(currentIndex - 1)
    },
    // 点击右箭头
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
.index {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
  .topMenu {
    position: absolute;
    top: 130px;
    left: 50%;
    transform: translateX(-50%);
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