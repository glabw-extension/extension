<template lang="pug">
#workStation.workplace(v-click-outside-right="hide" :class="{'close':!expand}" ref="workStation")
  .workplace__operation(:style="operationWidth")
    .expand-box
      .expand-box__icon(
        :style="{maskImage: `url(${expand_icon})`}"
        @click="handleExpand"
        )
    .func-box(v-for="box in workplaceMap" :key="box.key")
      el-tooltip(v-if="!expand" :content="box.title" placement="left")
        .func-box__icon(:style="{maskImage: `url(${box.icon})`}" @click.stop="handleExpandAndSelect(box.key)")
      .func-box__item(
        v-else
        @click="currentTab = box.key"
      )
        .icon(
          :style="{maskImage: `url(${box.icon})`}"
          :class="[currentTab === box.key ? 'active':'']"
        )
        .title(:class="[currentTab === box.key ? 'active':'']") {{box.title}}
  .workplace__container(:class="{'close':!expand}")
    .base__case
      global-record(ref="globalRecord" v-acl="'event.event.get'" :editable="true")
    keep-alive
      component(:is="currentTabComponent")
  collect-model(:visible.sync="collectModelVisible" 
    :type="collectModelType"
    :detail="collectModelDetail"
    :title="collectModelTitle")
</template>

<script>
import Vue from 'vue'
import tabJudge from './coms/judge'
import tabCollect from './coms/collect'
import tabTool from './coms/tool'
import tabFeed from './coms/feed-back'
import collectModel from './coms/collectModel.vue'
import globalRecord from '@/components/global-record'
import store from '@/services/store'
import ClickOutsideRight, {
  hasEventID,
} from '@/pages/work-station/coms/utils.js'

import expand_icon from '@/assets/workplace/expand.svg'
import judge_icon from '@/assets/workplace/judge.svg'
import collect_icon from '@/assets/workplace/collect.svg'
import tool_icon from '@/assets/workplace/tool.svg'
import feedback_icon from '@/assets/workplace/feedback.svg'

const WORK_PLACE_MAP = [
  {
    title: '研判',
    key: 'judge',
    icon: judge_icon,
  },
  {
    title: '收藏',
    key: 'collect',
    icon: collect_icon,
  },
  {
    title: '工具',
    key: 'tool',
    icon: tool_icon,
  },
  {
    title: '反馈',
    key: 'feed',
    icon: feedback_icon,
  },
]

export default {
  name: 'WorkStation',
  components: {
    tabJudge,
    tabCollect,
    tabTool,
    tabFeed,
    collectModel,
    globalRecord,
  },
  directives: {
    ClickOutsideRight,
  },
  data() {
    return {
      expand: false,
      expand_icon,
      workplaceMap: WORK_PLACE_MAP,
      currentTab: 'judge',
      collectModelVisible: false,
      collectModelType: 1,
      collectModelDetail: {},
      collectModelTitle: '',
    }
  },

  computed: {
    currentTabComponent() {
      return `tab-${this.currentTab.toLowerCase()}`
    },
    operationWidth() {
      return !this.expand ? { width: '36px' } : { width: '48px' }
    },
  },

  created() {
    // 组册工作台相关全局方法
    Vue.prototype.$onCollect = params => {
      // 收藏

      /* params:
        type:number
        detail: obj
        title:string
      */
      // 判断是否存在全局事由备案
      console.log('has_event_id >>>', hasEventID())
      const no_event_id = !hasEventID()
      if (no_event_id) {
        // 强制用户选择案件
        this.$refs.globalRecord.showModal = true
        return
      }

      // 收藏
      const { type = 1, detail = {}, title = '' } = params

      this.collectModelType = type
      this.collectModelDetail = detail
      this.collectModelTitle = title
      this.$nextTick(() => {
        this.collectModelVisible = true
      })
    }
  },

  methods: {
    workStationMoveHandle(e) {
      if (this.expand) return
      const workStation = this.$refs.workStation
      let isDrag = false
      let currentTarget = e.currentTarget
      // 计算鼠标相对元素位置
      let disX = e.clientX - currentTarget.offsetLeft
      let disY = e.clientY - currentTarget.offsetTop
      // 计算上下左右可移动的距离，以免跑出去
      const minLeft = 0
      const maxRight =
        parseInt(window.getComputedStyle(document.body, false)['width']) - 36
      const minTop = 0
      const maxBottom =
        parseInt(window.getComputedStyle(document.body, false)['height']) - 660
      currentTarget.style.cursor = 'move'

      document.onmousemove = _.throttle(e => {
        // 鼠标位置减去相对元素位置，得到元素当前位置
        let left = e.clientX - disX
        let top = e.clientY - disY

        if (left < minLeft) {
          currentTarget.style.left = 0
        } else if (left > maxRight) {
          currentTarget.style.left = `${maxRight}px`
        } else {
          currentTarget.style.left = `${left}px`
        }
        if (top < minTop) {
          currentTarget.style.top = 0
        } else if (top > maxBottom) {
          currentTarget.style.top = `${maxBottom}px`
        } else {
          currentTarget.style.top = `${top}px`
        }
      }, 20)
      document.onmouseup = e => {
        currentTarget.style.cursor = 'initial'
        // maxRight + 36 等于屏幕宽度
        if (maxRight + 36 - currentTarget.offsetLeft <= 340) {
          // 右侧留白不够展开
          currentTarget.style.right = `${0}px`
          currentTarget.style.left = 'auto'
        } else if (currentTarget.offsetLeft <= 300) {
          // 左侧吸顶
          currentTarget.style.left = `${0}px`
          currentTarget.style.right = 'auto'
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    handleExpand() {
      this.expand = !this.expand
    },
    handleExpandAndSelect(key) {
      this.expand = !this.expand
      this.currentTab = key
    },
    hide() {
      this.expand = false
    },
  },
}
</script>
<style>
/** 这些图标跟着工作台走 */
@import '../../styles/mind_map.css';
</style>
<style lang="less" scoped>
@workplace-height: 360px;
@workplace-conatiner-width: 280px;

#workplace,
.workplace {
  position: absolute;
  top: 10vh;
  right: 0;
  z-index: 2002;
  font-size: 14px;
  width: 336px;
  // height: @workplace-height;
  min-height: 600px;
  // outline: none;
  display: flex;
  background-color: #fff;
  box-shadow: -2px 2px 12px 0 rgba(0, 0, 0, 0.16);
  border-radius: 3px 0 0 3px;
  transition: all 0.5s;
  &.close {
    width: 36px;
    overflow: hidden;
    transform: translateX(0px);
  }
  &__operation {
    width: 36px;
    padding: 8px;

    .expand-box {
      padding-bottom: 10px;
      border-bottom: 1px solid #cdcdcd;
      margin-bottom: 10px;

      &__icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin: 0 auto;
        background-position: center;
        background-color: #808695;
        &.active {
          background-color: "#409eff";
        }
      }
    }
    .func-box {
      padding-bottom: 10px;
      border-bottom: 1px solid #cdcdcd;
      margin-bottom: 10px;

      &__icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin: 0 auto;
        background-position: center;
        background-color: #808695;
        &.active {
          background-color: "#409eff";
        }
      }

      &__item {
        text-align: center;
        cursor: pointer;
        .icon {
          width: 20px;
          height: 20px;
          margin: 0 auto;
          background-position: center;
          background-color: #808695;
          &.active {
            background-color: "#409eff";
          }
        }
        .title {
          margin-top: 4px;
          line-height: 20px;
          color: @color-text-label;
          &.active {
            color: "#409eff";
          }
        }
      }
    }
  }

  &__container {
    flex: 1;
    width: @workplace-conatiner-width;
    transition: all 0.5s;
    &.close {
      opacity: 0;
    }
  }
}

@case-height: 43px;
.base__case {
  width: 100%;
  height: @case-height;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/.global_record__btn {
  color: "#606266";
}
</style>
