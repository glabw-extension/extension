<template>
  <div id="app">
    <router-view />
    <mind-map></mind-map>
  </div>
</template>
<script>
import mindMap from '@/views/mind-map/'
export default {
  components: {
    mindMap,
  },
}
</script>
<style lang="scss">
#app {
}
</style>
