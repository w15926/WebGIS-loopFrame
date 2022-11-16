<template>
  <div class="TopMenu" :id="receiveId">
    <div v-for="(item, index) in list" :key="index" :class="[{'TopMenu-item':true},{'itemActive':item.isActive}]">
      <div v-if="item.isUse" @click.stop="clickTopMenu(item,index)">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
// import { selectServiceBody, selectServiceTitle } from "@/api/SysTitleAndMenuConfigController";

export default {
  name: "TopMenu",
  props: {
    receiveId: {
      type: String,
      default: "",
    }
  },
  data () {
    return {
      list: [
        {
          isUse: true,
          isActive: false,
          name: 'B页面',
          viewName: 'BPage'
        },
        {
          isUse: true,
          isActive: false,
          name: 'C页面',
          viewName: 'CPage'
        },
      ],
    }
  },
  methods: {
    async clickTopMenu (item, activeIndex) {
      this.list.forEach(v => v.isActive = false)
      const payload = {
        activeMenu: item
        // ...
      }
      this.$bus.$emit('changeTopMenu', payload)
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
  color: #ccc;
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
