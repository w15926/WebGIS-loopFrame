<template>
  <div class="FixedTop" :id="receiveId">
    <div @click="refreshPage">{{$config.commonConfig.systemName}}</div>
  </div>
</template>

<script>
export default {
  name: 'FixedTop',
  props: {
    receiveId: {
      type: String,
      default: "",
    }
  },
  methods: {
    refreshPage () {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.FixedTop {
  // 二选一
  // position: fixed;
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 120px;
  line-height: 100px;
  color: #fff;
  text-align: center;
  font-size: 33px;
  background-color: rgba($color: #333, $alpha: 0.6);
  cursor: pointer;
  z-index: 10;
}
</style>