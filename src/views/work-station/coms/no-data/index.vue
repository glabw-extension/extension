<template lang="pug">
.workstattion-no-data()
  DefaultDark.workstattion-no-data__img(:style="baseImageStyle")
  .workstattion-no-data__text() 暂无数据
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
.workstattion-no-data {
  margin-top: 100px;
  // margin-top: 150px;
  // transform: translateY(-50%);
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
