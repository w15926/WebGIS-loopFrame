import Vue from 'vue'

// 米转公里
Vue.filter('filterDistance', val => {
  if (!val || val === '') return
  const num = Number(val)
  let res = (num / 1000)
  if (res.toString().substring(0, 1) === '0') return res.toFixed(2) + 'km'
  return res + 'km'
})