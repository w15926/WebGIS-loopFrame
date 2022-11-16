[toc]

# 修订记录

|    日期    | 修订版本 | 修改描述 |  作者  |
| :--------: | :------: | :------: | :----: |
| 2022/11/10 |   2.2    |   初稿   | 王乐翔 |



> 本框架最终理想结果为在丰富的组件库下开始类似的项目则不需要前端开发人员，只需改些配置即可。



# 系统配置

> public
>
> > config（配置相关）
> >
> > > commonConfig.json（公共配置）
> > >
> > > index.js（入口文件）
> > >
> > > interfaces.js（接口环境配置）
> >
> > static（静态文件）
> >
> > > bg.png
> >
> > favicon.ico
> >
> > index.html

commonConfig.json

```json
{
  "systemName": "WebGIS单页面分页循环组件框架", // 系统名称
  "systemBg": { // 系统背景（图片覆盖在颜色之上）
    "color": "", // 背景色
    "url": "/static/bg.png" // 背景图片
  },
  "systemCode": "", // 系统编码
  "province": "", // 当前省
  "city": "", // 当前市
  "county": "" // 当前县/区
  // ...
}
```



interfaces.js

```js
/**
 * @description 所有开发生产环境配置
 * @author 王乐翔
 * @createDate 2022/11/04
 * @lastEditDate
 * @lastEditAuthor
 * @returns
 */

let BASE_URL = '' // xxx类
let BASE_URL_g1 = '' // xxx类
let BASE_URL_g2 = '' // xxx类
let BASE_URL_NXDCloud = '' // 公司买的云服务器
let BASE_URL_root = '' // 根路径
let STATIC_URL = '' // 静态目录
let BASE_SOCKETPATH = '' // websocket
let BASE_WECHAT = '' // 微信扫码相关
let isIntranet = null // 是否内网

// xx的（开发环境）
// BASE_URL = 'apis/HistoryCommonWeatherNew'
// BASE_URL_g1 = 'apis/CommonConfigNew-api'
BASE_URL = 'api/HistoryCommonWeather'
BASE_URL_g1 = 'api/CommonConfig-api'

// xx的（生产环境）
// BASE_URL = 'http://192.168.3.222:9000/HistoryCommonWeather'
// BASE_URL_g1 = 'http://192.168.3.222:9000/CommonConfig-api'

window.isIntranet = isIntranet

window.g = {
  AXIOS_TIMEOUT: 10000,
  BASE_API: `${BASE_URL}`,
  STATIC_URL,
  BASE_SOCKETPATH: `${BASE_SOCKETPATH}`,
  BASE_WECHAT: `${BASE_WECHAT}`
}

window.g1 = {
  AXIOS_TIMEOUT: 10000,
  BASE_API: `${BASE_URL_g1}`,
}
```



# 全局methods与配置

在src > utils > methods文件夹下的所有方法通过挂载原型可在任意地方使用（配置档同理）。

方法：src > utils > methods > fn.js

```js
/**
 * @description 生成指定位数 字母数字 验证码 （去除了O、0、i等不好识别的数字和字母）
 * @param { num: Number }
 * @author 王乐翔
 * @createDate 2022/01/13
 * @lastEditDate 2022/03/08
 * @lastEditAuthor 王乐翔
 * @returns 
 */
export const randomCoding = (num = 4) => {
  const arr = ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'J', 'j', 'K', 'k', 'L', 'M', 'm', 'N', 'n', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', '2', '3', '4', '5', '6', '7', '8', '9']
  let verificationCode = ''
  let count = num
  for (let i = 0; i < count; i++) { verificationCode += arr[Math.floor(Math.random() * arr.length)] }
  return verificationCode
}
```



使用

```js
this.$methods // 任意位置调用所有公共方法
this.$config // 任意位置查看所有配置档
```



# 组件同名目录

自动导入并全局注册components文件夹中的content与public目录下的所有同名目录组件

同名目录组件则为文件夹名与组件名一样，为了进一步严谨，需要在入口文件（同名）加入name属性，name值同为同名。

> public
>
> > MyCom
> >
> > > MyCom.vue（name属性同为MyCom）
> > >
> > > xxx.vue（不需要name）



组件

> 虽然css可以设置scoped，但每个组件需要一个根class，此class名为文件名（同名）

```vue
<template>
	<div class="MyCom">
    <!-- ... -->
  </div>
</template>
<script>
export default {
  name: 'MyCom'
}
</script>
<style lang="scss" scoped>
.MyCom {
}
</style>
```



任意界面使用

```vue
<template>
	<!-- 可在任意界面中直接使用 -->
	<MyCom /> 
</template>
```



# 通过事件总线渲染及交互

因本框架的特殊性，本框架的组件与组件、组件与页面之间的交互统一采用事件总线进行触发，而不是通过父子传参与ref。

开发中每个事件总线必须跟上注释且具有语意化，复杂结构需要采用分类。

如：

```js
this.$bus.$emit('chart_renderTopChart')
this.$bus.$emit('chart_renderRightChart')
this.$bus.$emit('chart_renderBottomChart')
this.$bus.$emit('chart_renderLeftChart')
```



本框架中通过以下三个渲染三个页面

```js
this.$bus.$emit('renderPage1', this.res_initPage.page1)
this.$bus.$emit('renderPage2', this.res_initPage.page2)
this.$bus.$emit('renderPage3', this.res_initPage.page3)
```



# 页面介绍

## 目录结构

> views
>
> > page1
> >
> > > page1.vue
> > >
> > > page1Map.vue
> >
> > page2
> >
> > > page2.vue
> > >
> > > page2Map.vue
> >
> > page3
> >
> > > page3.vue
> > >
> > > page3Map.vue
>
> index.vue

因采用特定的动画效果所以分成了多个文件，每个菜单最大支持三页，每一页都有独立的文件和地图。

通过获取接口返回数据判断当前页与总页数，并且切换分页的时候采用懒加载模式，极大程度优化了性能。



## 数据说明

每次点击菜单拿到当前菜单数据并调用事件总线进行渲染

```js
{
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
            }
            // ...
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
              time: '2022/11/06 15:35:09',
              x: 500,
              y: 100
            }
            // ...
          ],
          // 右容器
          rightComponents: [
            // ...
          ],
          showMap: true,
          moduleTitle: 'APage-1',
        },
        page2: {
          // ...
        },
        page3: {
          // ...
        },
        defaultPage: 1, // 默认哪一页
        pageCount: 3, // 总页数
      }
```
