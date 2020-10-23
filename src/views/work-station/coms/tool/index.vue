<template lang="pug">
.tool-container
  //- .base__title 工具集
  .tool-container__main()
    tool-card(v-for="card in toolData" :key="card.title" :data="card")
</template>

<script>
import toolCard from './tool-card.vue'
import map_icon from '@/assets/workplace/map.svg'

export default {
  components: {
    toolCard,
  },
  data() {
    const vm = this
    return {
      toolData: [
        {
          image: map_icon,
          title: '地图打点',
          type: 'map',
          desc: '确认坐标系，输入经纬度进行地图打点',
          func() {
            // 跳转路由
            const { href } = vm.$router.resolve({
              path: '/toolSet/mapPoint',
            })
            window.open(href)
          },
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
@case-height: 43px;

.tool-container {
  height: calc(100% - @case-height);
  .base__title {
    width: 100%;
    height: @case-height;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__main {
    padding: 12px;
    background-color: #f8f8f8;
    height: 100%;
    // height: calc(100% - @case-height);
  }
}
</style>
