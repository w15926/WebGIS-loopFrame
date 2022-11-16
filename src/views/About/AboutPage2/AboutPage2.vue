<template>
  <div class="AboutPage2">
    <Map />
    <h1 style="position:absolute;marginTop:150px;color:black;">AboutPage2</h1>
  </div>
</template>

<script>
// page
import Map from './AboutPage2Map'

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
.AboutPage2 {
}
</style>