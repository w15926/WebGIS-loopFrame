<template>
  <div class="Home">
    <Page0 />
  </div>
</template>

<script>
import Page0 from './HomePage1/HomePage1'

export default {
  components: {
    Page0
  }
}
</script>

<style lang="scss" scoped>
.Home {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  overflow: hidden;
}
</style>