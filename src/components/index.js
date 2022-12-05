import Vue from 'vue'

/**
 * @description 全局注册指定目录下的所有同名组件
 * @param { allComponents: context }
 * @author 王乐翔
 * @createDate 2022/11/06
 * @lastDate 2022/12/05
 */
// -------------------------- 第一版代码，生产环境中无效，待优化 --------------------------
// const registerComponents = (allComponents, path) => {
//   let componentArr = []
//   allComponents.keys().forEach(fileName => {
//     const component = allComponents(fileName).default
//     if (component.name) componentArr.push(component)
//   })
//   componentArr = Array.from(new Set(componentArr))
//   componentArr.forEach(component => {
//     console.warn(component)
//     const suffixIndex = String(component.__file).indexOf('.vue')
//     const nameLength = component.name.length
//     let str = String(component.__file).substring(suffixIndex - nameLength, suffixIndex)
//     // if (str === component.name) Vue.component(component.name, component)
//     if (str === component.name) {
//       Vue.component(component.name, res => require([`${path}/${component.name}/${component.name}.vue`], res))
//     }
//   })
// }

// registerComponents(require.context('./public', true), './public')
// registerComponents(require.context('./content', true), './content')

// -------------------------- 第二版代码 --------------------------
{
  const allComponents = require.context('./public', true)
  let temp = []
  allComponents.keys().forEach(fileName => {
    const component = allComponents(fileName).default
    if (component && component.name) temp.push(component.name)
  })
  temp = Array.from(new Set(temp))
  temp.forEach(app => {
    Vue.component(app, res => require([`./public/${app}/${app}.vue`], res))
  })
}

{
  const allComponents = require.context('./content', true)
  let temp = []
  allComponents.keys().forEach(fileName => {
    const component = allComponents(fileName).default
    if (component && component.name) temp.push(component.name)
  })
  temp = Array.from(new Set(temp))
  temp.forEach(app => {
    Vue.component(app, res => require([`./content/${app}/${app}.vue`], res))
  })
}
