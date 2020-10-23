<template lang="pug">
.judge-container()
  noEvent.no-event(v-if="isNoEvent")
  .judge-container__main(v-loading="loading" v-else)
    noData.no-data(v-if="isNoData")
    .card-container(v-else)
      judge-card(v-for="card in mindList" :key="card.id" :data="card" :event-id="recordData.id")
      el-pagination(small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pager.page"
          :page-size="pager.count"
          :total="pager.total")
    .add-judge
      el-button(type="primary"  @click="newMindMap") 新建研判思维导图
  el-dialog(title="战法库" custom-class="mind-method-list" :visible.sync="methodDialog" append-to-body)
    .method-list
      .method-item
        .method-item-img.empty(@dblclick="handleCreateMindMap()" :class="{'choosed': choosedMethod && !choosedMethod.id }" @click="choosedMethod = {}") +新建研判脑图
        .method-item-desc 新建脑图
      .method-item(v-for="(method,idx) in methodList" :key="idx" @dblclick="handleCreateMindMap()" @click="choosedMethod = method")
        .method-item-img(:class="{'choosed':(choosedMethod && choosedMethod.id && (choosedMethod.id === method.id)) }")
          download-img(:filePath="method.imageUrl")
        .method-item-desc {{method.remark}}
      // Flex 布局修复-张鑫旭
      i
      i
      i
      i
    template(#footer)
      el-button(@click="methodDialog = false") 取消
      el-button(type="primary" @click="handleCreateMindMap()" :disabled="!choosedMethod") 创建

</template>

<script>
import DownloadImg from './download-img'
import judgeCard from './judge-card.vue'
import noData from '@/pages/work-station/coms/no-data'
import noEvent from '@/pages/work-station/coms/no-event'
import api from '@/data/api'
import store from '@/services/store'
import BaseRecord from '@/pages/work-station/coms/record.vue'
import { hasEventID } from '@/pages/work-station/coms/utils.js'

export default {
  components: {
    BaseRecord,
    DownloadImg,
    judgeCard,
    noData,
    noEvent,
  },
  data() {
    return {
      recordData: JSON.parse(
        window.sessionStorage.getItem('record:record') || '{}',
      ),
      loading: false,
      mindList: [],
      pager: {
        page: 1,
        count: 5,
        total: 0,
      },
      isNoData: false,
      isNoEvent: false,
      methodDialog: false,
      methodList: [],
      choosedMethod: null,
    }
  },

  mounted() {
    this.isNoEvent = !hasEventID()
    hasEventID() && this.getMindMapList({ page: 1 })

    store.$on('recordChangeChange', res => {
      const { id = '' } = res
      if (id) {
        // 监听全局备案的切换事件
        this.recordData = res
        this.isNoEvent = false
        this.getMindMapList({ page: 1 })
        this.getMindMapList({ page: 1, type: [2] })
      }
    })

    store.$on('upDateMindMapListChange', res => {
      this.pager.page = 1
      this.getMindMapList({ page: 1 })
    })
  },
  methods: {
    newMindMap() {
      this.methodDialog = true
      this.choosedMethod = null
    },
    async getMindMapList({ page = 1, count = this.pager.count, type = [1] }) {
      /* 获取用户研判列表: query
        page: number,
        count: number,
        event_id: string,
        type: number[], // 1-脑图；2-模板
      */
      const query = {
        page,
        count,
        event_id: _.get(this.recordData, 'id'),
        // event_id: '1',
        type,
      }

      try {
        this.loading = true
        const { list = [], total = 0 } = await api.getMindMapList(query)
        if (type[0] === 1) {
          this.mindList = list
          this.isNoData = _.isEmpty(list)
        } else {
          this.methodList = list
        }
        this.pager.total = total
      } catch (error) {
        this.loading = false
      } finally {
        this.loading = false
      }
    },
    handleCurrentChange(val) {
      this.pager.page = val
      this.getMindMapList({ page: val, count: this.pager.count })
    },
    handleCreateMindMap() {
      this.methodDialog = false
      const params = {
        name: 'workstation.mindMap',
        query: { event_id: this.recordData.id },
      }
      if (this.choosedMethod && this.choosedMethod.id) {
        params.params = { id: this.choosedMethod.id }
      }
      if (this.$route.name === 'workstation.mindMap') {
        this.$router.replace(params)
      } else {
        const { href } = this.$router.resolve(params)
        window.open(href)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@case-height: 43px;

.judge-container {
  height: calc(100% - @case-height);
  .base__case {
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .add-judge {
      text-align: center;
      .el-button {
        width: 100%;
      }
    }
  }
}
/deep/.el-pagination,
.el-pagination--small {
  button {
    background: transparent;
  }
  button:disabled {
    background: transparent;
  }
  /deep/ .number {
    background: transparent;
  }
}
</style>
<style lang="less">
.mind-method-list {
  .method-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .method-item {
      width: 220px;
      &-img {
        height: 140px;
        box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        cursor: pointer;
        & img {
          border-radius: 4px;
          // height: 138px;
        }
        &.empty {
          text-align: center;
          line-height: 140px;
        }
        &:hover,
        &.choosed {
          color: #409eff;
          border: 1px solid #409eff;
        }
      }
      &-desc {
        text-align: center;
        padding-top: 8px;
        padding-bottom: 16px;
      }
    }
    & i {
      width: 220px;
    }
  }
  .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
  }
  .el-dialog__footer {
    border-top: 1px solid #dcdfe6;
  }
}
</style>
