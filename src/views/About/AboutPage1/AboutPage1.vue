<template>
  <div class="AboutPage1">
    <Map />
    <h1 style="position:absolute;marginTop:150px;color:black;">AboutPage1</h1>
  </div>
</template>

<script>
// page
import Map from './AboutPage1Map'

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
.AboutPage1 {
}
</style>