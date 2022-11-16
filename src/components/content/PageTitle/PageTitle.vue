<template>
  <div v-if="pageTitle" class="PageTitle" :id="receiveId">
    <div>{{pageTitle && pageTitle.line1}}</div>
    <div>{{pageTitle && pageTitle.line2}}</div>
  </div>
</template>


<script>
export default {
  name: 'PageTitle',
  props: {
    receiveId: {
      type: String,
      default: "",
    },
    paramObject: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      pageTitle: null
    }
  },
  watch: {
    paramObject: {
      handler (newV) {
       this.pageTitle = newV
      },
      immediate:true
    }
  },
  created () {
    this.$bus.$on('changePageTitle', data => this.pageTitle = data)
  }
}
</script>

<style lang="scss" scoped>
.PageTitle {
  height: 20px;
  font-size: 18px;
  color: #f2f2f2;
}
</style>