<template>
  <div class="Nav">
    <div @click="refreshPage">{{$config.commonConfig.systemName}}</div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  methods: {
    refreshPage () {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.Nav {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
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