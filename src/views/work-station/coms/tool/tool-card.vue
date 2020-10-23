<template lang="pug">
.tool-card
  .tool-card__container
    el-image.tool-card__img(:src="cardImage" fit="cover")
      div(slot="error")
        i.image-slot(class="el-icon-picture-outline")
    .tool-card__main
      .tool-card__main-title
        span.name 地图打点
        el-tag(size="mini") {{cardType}}
      .tool-card__main-desc {{cardDesc}}
  .tool-card__handler(@click="handleClick")
    i.arrow(class="el-icon-arrow-right")
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        image: '',
        title: '',
        type: '',
        desc: '',
        func: () => ({}),
      }),
    },
  },
  data() {
    return {
      key: '',
    }
  },
  computed: {
    cardImage() {
      return this.data.image
    },
    cardType() {
      const TYPE = {
        map: '地图类',
      }
      return TYPE[this.data.type] || '其他'
    },
    cardDesc() {
      return this.data.desc
    },
  },
  methods: {
    handleClick() {
      this.data.func && this.data.func()
    },
  },
}
</script>

<style lang="less" scoped>
.tool-card {
  background-color: #fff;
  box-shadow: 1px 0 15px 0 rgba(0, 0, 0, 0.01);
  border-radius: 0 4px 4px 4px;

  &__container {
    padding: 12px;
    display: flex;

    .tool-card__img {
      margin-right: 10px;
      width: 64px;
      min-width: 64px;
      height: 56px;
      .image-slot {
        width: 100%;
        height: 100%;
        font-size: 32px;
        text-align: center;
        vertical-align: middle;
      }
    }

    .tool-card__main {
      flex: 1;
      &-title {
        line-height: 21px;
        vertical-align: middle;
        margin-bottom: 3px;
        .name {
          font-size: 14px;
          font-weight: 500;
          margin-right: 8px;
        }
      }
      &-desc {
        font-size: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }
  &__handler {
    height: 24px;
    background: linear-gradient(90deg, #fff 0%, #edf1ff 100%);
    border-radius: 0 0 4px 4px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    .arrow {
      color: "#409eff";
    }
  }
}
</style>
