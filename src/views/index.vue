<template>
  <div class="index" :style="{'width': $config.commonConfig.systemWidth, height: $config.commonConfig.systemHeight}">

    <!-- 所有页面固定顶部 -->
    <FixedTop />
    <!-- 所有页面固定底部 -->
    <!-- <FixedBottom /> -->
    <TopMenu />

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

      isRenderPage1: false, // 懒加载
      isRenderPage2: false,
      isRenderPage3: false,
      /* 分页 end */

      /* 每页数据 */
      res_initPage: {
        ds: [
          // 第一页
          {
            // 左容器组件
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
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: '0 0 20px 0',
                triggerIds: '',
                width: '',
                height: '',
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
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: '0 0 20px 0',
                triggerIds: '',
                width: '',
                height: '',
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
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: '0 0 20px 0',
                triggerIds: '',
                width: '',
                height: '',
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
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: null,
                triggerIds: '',
                width: '',
                height: '',
                x: 100,
                y: 100
              },
            ],
            // 页面定位组件
            absoluteComponents: [
              {
                id: 6001,
                chName: '地图',
                province: '江苏省',
                city: '南京市',
                countyOrDistrict: '栖霞区',
                fileCodes: '',
                fileName: 'OLMap',
                order: 1,
                paramObject: 'ewogICAgIm1hcE5hbWUiOiJob21lTWFwIgp9',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: null,
                triggerIds: 'OLMap_6001',
                width: '',
                height: '200',
                x: 0,
                y: 0
              },
              {
                id: 666,
                chName: 'Test1组件',
                province: '江苏省',
                city: '南京市',
                countyOrDistrict: '栖霞区',
                fileCodes: '',
                fileName: 'Test1', // 原pagecode
                order: 1,
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09', // 不需要传三个：inputtime、updatetime、observationtime对前端来说的无效代码
                margin: null,
                triggerIds: '',
                width: '',
                height: '',
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
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: null,
                triggerIds: 'OLMap_6001',
                width: '',
                height: '',
                x: 600,
                y: 300
              },
              {
                id: 666,
                chName: '页面标题组件',
                province: '江苏省',
                city: '南京市',
                countyOrDistrict: '栖霞区',
                fileCodes: '',
                fileName: 'PageTitle',
                order: 1,
                paramObject: 'eyAibGluZTEiOiAiYumhtemdoi3nrKzkuIDpobUiIH0',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: null,
                triggerIds: '',
                width: '',
                height: '',
                x: 40,
                y: 130
              },
            ],
            // 中间容器组件
            centerComponets: [],
            // 右容器组件
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
                paramObject: '',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: null,
                triggerIds: '',
                width: '',
                height: '',
                x: 100,
                y: 100
              },
            ],
            // 左容器宽高位置
            leftContainerWidth: '', // 如果不传则自适应
            leftContainerHeight: '800', // 如果不传则自适应，如果存在则自动开启溢出隐藏与鼠标悬浮出滚动条
            leftContainerX: '40',
            leftContainerY: '160',

            // 中间容器宽高位置
            centerContainerWidth: '',
            centerContainerHeight: '',
            centerContainerX: '',
            centerContainerY: '',

            // 右容器宽高位置
            rightContainerWidth: '',
            rightContainerHeight: '',
            rightContainerX: '1380',
            rightContainerY: '160',
          },
          // 第二页
          {
            leftComponents: [],
            absoluteComponents: [],
            rightComponents: [{
              id: 666,
              chName: 'Test3组件',
              province: '江苏省',
              city: '南京市',
              countyOrDistrict: '栖霞区',
              fileCodes: '',
              fileName: 'Test3',
              order: 1,
              paramObject: '',
              categoryCode: 'xxx类的code编码',
              categoryName: 'xxx类',
              time: '2022/11/06 15:35:09',
              margin: null,
              triggerIds: '',
              width: '',
              height: '',
              x: 100,
              y: 100
            },],
            rightContainerX: '1380',
            rightContainerY: '160',
          },
          // 第三页
          {
            leftComponents: [],
            absoluteComponents: [
              {
                id: 6002,
                chName: '地图',
                province: '江苏省',
                city: '南京市',
                countyOrDistrict: '栖霞区',
                fileCodes: '',
                fileName: 'OLMap',
                order: 1,
                paramObject: 'ewogICAgIm1hcE5hbWUiOiJob21lTWFwIiwKICAgICJsaW5lMSI6Inh46aG16Z2iLeesrOS4iemhtSIKfQ==',
                categoryCode: 'xxx类的code编码',
                categoryName: 'xxx类',
                time: '2022/11/06 15:35:09',
                margin: null,
                triggerIds: 'OLMap_6002',
                width: '',
                height: '',
                x: 0,
                y: 0
              },
            ],
            rightComponents: [],
          }
        ],
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

    // 实际开发中根据组件from而使用下面代码
    // this.$bus.$on('pageOut', obj => {
    //   // 改变顶部菜单
    //   if (obj.from === '' && obj.methods === 'changeTopMenu') {
    //     try {
    //       this.$refs.ref_index.__vue__[obj.methods](obj.data)
    //     } catch (error) {
    //       Promise.reject(new Error(`该${this.$options.name}组件没有声明此方法`))
    //     }
    //   }
    // })
  },
  mounted () {
    this.initSystemFn()
    this.initPage()
  },
  methods: {
    // 初始化系统功能
    initSystemFn () {
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
          // document.querySelector('.index').style.backgroundColor = this.$config.commonConfig.systemBg.color
          document.body.style.backgroundColor = this.$config.commonConfig.systemBg.color
        }
        if (this.$config.commonConfig.systemBg.url) {
          const div = document.querySelector('.index')
          div.style.backgroundImage = `url(../${this.$config.commonConfig.systemBg.url})`
          // div.style.backgroundSize = '100% 100%'
          div.style.backgroundSize = 'cover'
        }
      }

    },
    // 初始化页面
    initPage (receiveData) {
      // 调取接口

      // 这里仅做框架效果的模拟
      if (receiveData && receiveData.loadPage) {
        if (receiveData.loadPage === 'BPage') {
          this.res_initPage = {
            ds: [
              // 第一页
              {
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
                    paramObject: '',
                    categoryCode: 'xxx类的code编码',
                    categoryName: 'xxx类',
                    time: '2022/11/06 15:35:09',
                    margin: null,
                    triggerIds: '',
                    x: 100,
                    y: 100
                  }
                ],
                // 页面定位
                absoluteComponents: [
                  {
                    id: 666,
                    chName: '地图',
                    province: '江苏省',
                    city: '南京市',
                    countyOrDistrict: '栖霞区',
                    fileCodes: '',
                    fileName: 'OLMap',
                    order: 1,
                    paramObject: { line1: 'b页面-第一页' },
                    categoryCode: 'xxx类的code编码',
                    categoryName: 'xxx类',
                    time: '2022/11/06 15:35:09',
                    margin: null,
                    triggerIds: 'OLMap_666',
                    x: 0,
                    y: 0
                  },
                ],
                // 右容器
                rightComponents: [],
                moduleTitle: 'BPage-1',
              },
              // 第二页
              {
                leftComponents: [],
                absoluteComponents: [],
                rightComponents: [{
                  id: 666,
                  chName: 'Test3组件',
                  province: '江苏省',
                  city: '南京市',
                  countyOrDistrict: '栖霞区',
                  fileCodes: '',
                  fileName: 'Test3',
                  order: 1,
                  paramObject: '',
                  categoryCode: 'xxx类的code编码',
                  categoryName: 'xxx类',
                  time: '2022/11/06 15:35:09',
                  margin: null,
                  triggerIds: '',
                  x: 100,
                  y: 100
                },],
                moduleTitle: 'BPage-2',
              },
            ],
            defaultPage: 1, // 默认哪一页
            pageCount: 2, // 总页数
          }
        }
        if (receiveData.loadPage === 'CPage') {
          this.res_initPage = {
            ds: [
              // 第一页
              {
                // 左容器
                leftComponents: [],
                // 页面定位
                absoluteComponents: [],
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
                    order: 3,
                    paramObject: '',
                    categoryCode: 'xxx类的code编码',
                    categoryName: 'xxx类',
                    time: '2022/11/06 15:35:09',
                    margin: null,
                    triggerIds: '',
                    x: 100,
                    y: 100
                  }
                ],
                moduleTitle: 'CPage-1',
              },
            ],
            defaultPage: 1, // 默认哪一页
            pageCount: 1, // 总页数
          }
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

      this.isRenderPage1 = false
      this.isRenderPage2 = false
      this.isRenderPage3 = false

      // 这里仅做框架效果的模拟
      if (receiveData.activeMenu.viewName === 'BPage') this.initPage({ loadPage: 'BPage' })
      if (receiveData.activeMenu.viewName === 'CPage') this.initPage({ loadPage: 'CPage' })
    },
    // 点击分页按钮
    clickBtn (pageNum) {
      let temp = JSON.parse(JSON.stringify(this.switchPage))
      temp.forEach(item => item.isActive = false)
      temp[pageNum].isActive = true
      this.switchPage = temp

      // 分页动画/懒加载
      {
        this.pageList = []
        this.pageList.push('Page')
        if (pageNum === 0) {
          this.p1Animation = true
          this.p2Animation = false
          this.p3Animation = false
          if (!this.isRenderPage1) {
            this.isRenderPage1 = true
            this.$bus.$emit('pageIn', {
              from: 'index',
              to: 'Page1',
              methods: 'renderPage1',
              data: this.$loadsh.cloneDeep(this.res_initPage.ds[0])
            })
          }
        }
        if (pageNum === 1) {
          this.p1Animation = false
          this.p2Animation = true
          this.p3Animation = false
          if (!this.isRenderPage2) {
            this.isRenderPage2 = true
            this.$bus.$emit('pageIn', {
              from: 'index',
              to: 'Page2',
              methods: 'renderPage2',
              data: this.$loadsh.cloneDeep(this.res_initPage.ds[1])
            })
          }
        }
        if (pageNum === 2) {
          this.p1Animation = false
          this.p2Animation = false
          this.p3Animation = true
          if (!this.isRenderPage3) {
            this.isRenderPage3 = true
            this.$bus.$emit('pageIn', {
              from: 'index',
              to: 'Page3',
              methods: 'renderPage3',
              data: this.$loadsh.cloneDeep(this.res_initPage.ds[2])
            })
          }
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
  // width: 1920px;
  // height: 1080px;
  // overflow: hidden;
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