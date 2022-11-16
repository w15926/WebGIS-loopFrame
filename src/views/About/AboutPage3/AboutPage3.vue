<template>
  <div class="AboutPage3">
    <Map />
    <h1 style="position:absolute;marginTop:150px;color:black;">AboutPage3</h1>
  </div>
</template>

<script>
// page
import Map from './AboutPage3Map'

export default {
  components: {
    Map
  },
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
    async init () {
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.AboutPage3 {
}
</style>