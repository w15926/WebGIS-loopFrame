<template>
  <div class="TopMenu">
    <div v-for="(item, index) in list" :key="index" :class="[{'TopMenu-item':true},{'itemActive':item.isActive}]">
      <div v-if="item.isUse" @click.stop="changeActive(item,index)">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
// import { selectServiceBody, selectServiceTitle } from "@/api/SysTitleAndMenuConfigController";

export default {
  name: "toptext",
  data () {
    return {
      list: [
        {
          isUse: true,
          isActive: true,
          name: '首页',
          viewName: 'Home'
        },
        {
          isUse: true,
          isActive: false,
          name: '关于页面',
          viewName: 'About'
        },
      ],
    }
  },
  async mounted () {
    // 这里调取接口且赋值（如需刷新页面后需恢复之前状态则重新赋之前状态的值即可）
    const payload = {
      activeMenu: 'Home'
      // ...
    }
    this.$store.commit('baseInfo/changeActiveState', payload)
  },
  methods: {
    async changeActive (item, activeIndex) {
      this.list.forEach(v => v.isActive = false)
      const payload = {
        activeMenu: item.viewName // or item
        // ...
      }
      this.$store.commit('baseInfo/changeActiveState', payload)
      item.isActive = true
    }
  },
}
</script>

<style lang="scss" scoped>
.TopMenu {
  position: relative;
  top: 20px;
  left: 0;
  display: flex;
  justify-content: center;
  font-size: 24px;
  // color: #f2f2f2;
  color: #999;
  z-index: 10;
  .TopMenu-item {
    min-width: 150px;
    text-align: center;
    padding: 0 25px;
    border-right: 4px solid #8e8d8d7a;
    cursor: pointer;
    &:hover {
      color: #23fffcff;
    }
    &:last-child {
      border-right: none;
    }
  }
  .itemActive {
    color: #23fffcff;
  }
}
</style>
