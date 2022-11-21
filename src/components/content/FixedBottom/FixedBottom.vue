<template>
  <div class="FixedBottom" :id="receiveId" ref="FixedBottom">
    <div>Copyright  © 2018   xxxxxxxxxxxxxxxxxxxxxxx    备案号：xxxxxxxxxxxxxxx </div>
  </div>
</template>

<script>
export default {
  name: 'FixedBottom',
  props: {
    receiveId: {
      type: String,
      default: "",
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.FixedBottom {
  // 二选一
  position: fixed;
  // position: absolute;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 60px;
  line-height: 60px;
  color: #ccc;
  text-align: center;
  font-size: 18px;
  background-color: rgba($color: #333, $alpha: 0.6);
  z-index: 10;
}
</style>