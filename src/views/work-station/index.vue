<template lang="pug">
#workStation.workStation(ref="workStation" :class="{'close':!expand}")
  |
  .workStation-header
    .header-expand()
      .header-expand_icon(@click.stop="handleExpand" :style="{maskImage: `url(${expand_icon})`}")
    accountInfo.header-container
  |
  .workStation__container()
    |
    .workStation__container-operation()
      .func-box(v-for="box in workStationMap" :key="box.key")
        .func-box__item(@click="currentTab = box.key")
          .icon(
            :style="{maskImage: `url(${box.icon})`}"
            :class="[currentTab === box.key ? 'active':'']"
          )
          .title(:class="[currentTab === box.key ? 'active':'']") {{box.title}}
    |
    .workStation__container-main()
      keep-alive
        component(:is="currentTabComponent")
  |
  el-button(@click="handleClickShow") show
  |
  collect-model(:visible.sync="collectModelVisible"
    mode="create" 
    :type="collectModelType"
    :detail="collectModelDetail"
    :title="collectModelTitle")
</template>

<script>
import Vue from "vue";
import tabJudge from "./coms/judge";
import tabCollect from "./coms/collect";
import tabTool from "./coms/tool";
import tabFeed from "./coms/feed-back";
import collectModel from "./coms/collectModel.vue";
// import globalRecord from '@/components/global-record'
import store from "@/services/store";
import accountInfo from "@/components/account-info";
import { throttle } from "lodash-es";

import expand_icon from "@/assets/workplace/expand.svg";
import judge_icon from "@/assets/workplace/judge.svg";
import collect_icon from "@/assets/workplace/collect.svg";
import tool_icon from "@/assets/workplace/tool.svg";
import feedback_icon from "@/assets/workplace/feedback.svg";

const WORK_STATION_MAP = [
  {
    title: "研判",
    key: "judge",
    icon: judge_icon
  },
  {
    title: "收藏",
    key: "collect",
    icon: collect_icon
  },
  {
    title: "工具",
    key: "tool",
    icon: tool_icon
  },
  {
    title: "反馈",
    key: "feed",
    icon: feedback_icon
  }
];

export default {
  name: "WorkStation",
  components: {
    tabJudge,
    tabCollect,
    tabTool,
    tabFeed,
    collectModel,
    accountInfo

    // globalRecord,
  },

  data() {
    return {
      expand: true,
      expand_icon,
      workStationMap: WORK_STATION_MAP,
      currentTab: "judge",
      collectModelVisible: false,
      collectModelType: 1,
      collectModelDetail: {},
      collectModelTitle: ""
    };
  },

  computed: {
    currentTabComponent() {
      return `tab-${this.currentTab.toLowerCase()}`;
    },
    operationWidth() {
      return { width: "48px" };
    }
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
      // console.log('has_event_id >>>', hasEventID())
      // const no_event_id = !hasEventID()
      // if (no_event_id) {
      //   // 强制用户选择案件
      //   this.$refs.globalRecord.showModal = true
      //   return
      // }

      // 收藏
      const { type = 1, detail = {}, title = "" } = params;

      this.collectModelType = type;
      this.collectModelDetail = detail;
      this.collectModelTitle = title;
      this.$nextTick(() => {
        this.collectModelVisible = true;
      });
    };
  },

  methods: {
    workStationMoveHandle(e) {
      if (this.expand) return;
      // const workStation = this.$refs.workStation
      // let isDrag = false
      let currentTarget = e.currentTarget;
      // 计算鼠标相对元素位置
      let disX = e.clientX - currentTarget.offsetLeft;
      let disY = e.clientY - currentTarget.offsetTop;
      // 计算上下左右可移动的距离，以免跑出去
      const minLeft = 0;
      const maxRight =
        parseInt(window.getComputedStyle(document.body, false)["width"]) - 36;
      const minTop = 0;
      const maxBottom =
        parseInt(window.getComputedStyle(document.body, false)["height"]) - 660;
      currentTarget.style.cursor = "move";

      document.onmousemove = throttle(e => {
        // 鼠标位置减去相对元素位置，得到元素当前位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        if (left < minLeft) {
          currentTarget.style.left = 0;
        } else if (left > maxRight) {
          currentTarget.style.left = `${maxRight}px`;
        } else {
          currentTarget.style.left = `${left}px`;
        }
        if (top < minTop) {
          currentTarget.style.top = 0;
        } else if (top > maxBottom) {
          currentTarget.style.top = `${maxBottom}px`;
        } else {
          currentTarget.style.top = `${top}px`;
        }
      }, 20);
      document.onmouseup = () => {
        currentTarget.style.cursor = "initial";
        // maxRight + 36 等于屏幕宽度
        if (maxRight + 36 - currentTarget.offsetLeft <= 340) {
          // 右侧留白不够展开
          currentTarget.style.right = `${0}px`;
          currentTarget.style.left = "auto";
        } else if (currentTarget.offsetLeft <= 300) {
          // 左侧吸顶
          currentTarget.style.left = `${0}px`;
          currentTarget.style.right = "auto";
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    handleExpand() {
      // 仅隐藏 workstation 这个 dom
      this.$closePlugin();
    },
    handleExpandAndSelect(key) {
      this.expand = !this.expand;
      this.currentTab = key;
    },
    hide() {
      this.expand = false;
    },
    handleClickShow() {
      // 测试跳转路由
      store.set("fullPage", true);
      this.$nextTick(() => {
        this.$router.replace({ name: "workstation.mindMap" });
      });
    }
  }
};
</script>
<style>
/** 这些图标跟着工作台走 */
@import "../../styles/mind_map.css";
</style>
<style lang="less" scoped>
@workplace-height: 360px;
@workplace-conatiner-width: 280px;

#workStation,
.workStation {
  // position: fixed;
  // top: 0;
  // left: 0;
  z-index: 999;
  font-size: 14px;
  width: auto;
  height: 100%;
  box-shadow: -2px 2px 12px 0 rgba(0, 0, 0, 0.16);
  border-radius: 3px 0 0 3px;
  transition: all 0.5s;

  &.close {
    width: 36px;
    overflow: hidden;
    transform: translateX(0px);
  }

  &-header {
    display: flex;
    width: 100%;
    height: 56px;
    background-color: #fff;
    .header-expand {
      width: 52px;
      padding: 18px 16px;
      &::after {
        position: absolute;
        content: "";
        left: 16px;
        top: 55px;
        width: 20px;
        height: 1px;
        background-color: #d8d8d8;
      }
      &_icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        background-color: #808695;
      }
    }
  }

  &__container {
    display: flex;
    height: 100%;

    &-operation {
      width: 52px;
      background-color: #fff;
      .func-box {
        padding-top: 14px;
        padding-bottom: 8px;
        position: relative;

        &::after {
          position: absolute;
          content: "";
          left: 16px;
          top: 66px;
          width: 20px;
          height: 1px;
          background-color: #d8d8d8;
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
              background-color: #409eff;
            }
          }
          .title {
            margin-top: 4px;
            line-height: 20px;
            color: #999fac;
            &.active {
              color: #409eff;
            }
          }
        }
      }
    }

    &-main {
      flex: 1;
      background-color: #f8f8f8;
      margin-bottom: 20px;
    }
  }
}
</style>
