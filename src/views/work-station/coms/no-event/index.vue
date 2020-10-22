<template lang="pug">
.workstattion-no-event()
  DefaultDark.workstattion-no-event__img(:style="baseImageStyle")
  .workstattion-no-event__text() 请选择案件
</template>

<script>
import DefaultDark from './dark.vue'
export default {
  components: { DefaultDark },
  data() {
    return {}
  },
  computed: {
    baseImageStyle() {
      return {
        width: '100px',
        height: '100px',
      }
    },
  },
}
</script>

<style lang="less" scoped>
.workstattion-no-event {
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__img {
    margin-bottom: 12px;
  }
  &__text {
    text-align: center;
  }
}
</style>
