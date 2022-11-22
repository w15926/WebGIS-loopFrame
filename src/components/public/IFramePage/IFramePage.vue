<template>
  <div class="IFramePage">

    <template v-if="$config.commonConfig.IFramePage.IFrameUrl">
      <iframe :src="$config.commonConfig.IFramePage.IFrameUrl" height="100%" width="100%" frameborder="0" scrolling="0" />
    </template>

    <template v-if="$config.commonConfig.IFramePage.imgUrl">
      <img :src="$config.commonConfig.IFramePage.imgUrl">
    </template>

    <div class="skip" @click="closeIFramePage">跳过</div>
  </div>
</template>

<script>
export default {
  name: 'IFramePage',
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      setTimeout(() => this.$bus.$emit('closeIFramePage'), 35000)
    },
    closeIFramePage () {
      this.$bus.$emit('closeIFramePage')
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.IFramePage {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000;

  img {
    width: 100%;
    height: 100%;
  }

  .skip {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 100px;
    height: 44px;
    line-height: 44px;
    color: #ccc;
    font-size: 18px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>