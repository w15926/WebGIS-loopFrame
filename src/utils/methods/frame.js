import Vue from 'vue'

/**
 * @description 全局注册指定目录下的所有同名组件
 * @param { allComponents: context }
 * @author 王乐翔
 * @createDate 2022/11/06
 */
export const registerComponents = allComponents => {
  let componentArr = []
  allComponents.keys().forEach(fileName => {
    const component = allComponents(fileName).default
    if (component.name) componentArr.push(component)
  })
  componentArr = Array.from(new Set(componentArr))
  componentArr.forEach(component => {
    const suffixIndex = String(component.__file).indexOf('.vue')
    const nameLength = component.name.length
    let str = String(component.__file).substring(suffixIndex - nameLength, suffixIndex)
    if (str === component.name) Vue.component(component.name, component)
  })
}
