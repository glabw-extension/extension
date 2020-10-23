<template lang="pug">
.collect-container
  noEvent.no-event(v-if="isNoEvent")
  .collect-container__main(v-else)
    .type-filter()
      el-select(v-model="typeValue" placeholder="请选择" size="mini" @change="handleSelectChange")
         el-option(v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value")
    .card-container(v-loading="loading")
      noData.no-data(v-if="isNoData")
      .card-container__box(v-else)
        collect-card(v-for="card in collectionList" :key="card.id" :data="card")
        el-pagination(small
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pager.page"
          :page-size="pager.count"
          :total="pager.total")
      .add-collect
        el-button(type="primary" @click="handleCollectOther") 新增收藏
  //- el-dialog(title="收藏其他" :visible.sync="collectOtherDialogVisible" append-to-body
  //-  :close-on-click-modal="false" width="500px" @close="close")
  //-   el-form(:model="temp" :rules="rules" ref="collectForm" label-width="120px" label-position="right")
  //-     el-form-item(label="自定义输入：" prop="title")
  //-       el-input(v-model="temp.title" :maxlength="100")
  //-     el-form-item(label="添加备注：")
  //-       el-input(v-model="temp.remark" type="textarea" :maxlength="100" show-word-limit)
  //-   template(#footer)
  //-     el-button(@click="collectOtherDialogVisible = false") 取消
  //-     el-button(type="primary" @click="submitForm('collectForm')" :loading="newLoading") 保存
</template>

<script>
import collectCard from './collect-card.vue'
import noData from '@/pages/work-station/coms/no-data'
import noEvent from '@/pages/work-station/coms/no-event'
import baseRecord from '@/pages/work-station/coms/record.vue'
import api from '@/data/api'
import store from '@/services/store'
import { hasEventID } from '@/pages/work-station/coms/utils.js'

export default {
  components: {
    collectCard,
    noData,
    baseRecord,
    noEvent,
  },
  data() {
    return {
      loading: false,
      recordData: JSON.parse(
        window.sessionStorage.getItem('record:record') || '{}',
      ),
      collectionList: [],
      pager: {
        page: 1,
        count: 5,
        total: 0,
      },
      typeValue: '',
      typeOptions: [
        {
          value: '',
          label: '全部类型',
        },
        {
          value: 1,
          label: '设备ID 类',
        },
        {
          value: 2,
          label: 'Wi-Fi 类',
        },
        {
          value: 3,
          label: 'IP 类',
        },
        {
          value: 4,
          label: 'APP 类',
        },
        {
          value: 5,
          label: '位置类',
        },
        {
          value: 0,
          label: '其他类型',
        },
      ],
      isNoData: false,
      isNoEvent: false,
      collectOtherDialogVisible: false,
      newLoading: false,
      temp: {
        title: '',
        remark: '',
      },
      rules: {
        title: [{ required: true, message: '请填写名称', trigger: 'blur' }],
      },
    }
  },
  // 分页需要带上类型
  mounted() {
    this.isNoEvent = !hasEventID()
    hasEventID() && this.getCollectionList({ page: 1, type: '' })
    store.$on('recordChangeChange', res => {
      const { id = '' } = res
      if (id) {
        // 监听全局备案的切换事件
        this.recordData = res
        this.isNoEvent = false
        this.typeValue = ''
        this.getCollectionList({ page: 1, type: '' })
      }
    })
    store.$on('upDateCollectionListChange', res => {
      this.typeValue = ''
      this.pager.page = 1
      this.getCollectionList({ page: 1, type: '' })
    })
  },
  methods: {
    async getCollectionList({ page = 1, count = this.pager.count, type = '' }) {
      const query = {
        page,
        count,
        event_id: _.get(this.recordData, 'id'),
        type,
      }
      try {
        this.loading = true
        const { list = [], total = 0 } = await api.getCollectionList(query)
        this.collectionList = list
        this.pager.total = total
        this.isNoData = _.isEmpty(list)
      } catch (error) {
        this.loading = false
      } finally {
        this.loading = false
      }
    },
    handleCurrentChange(val) {
      this.pager.page = val
      this.getCollectionList({
        page: val,
        count: this.pager.count,
        type: this.typeValue === '' ? '' : [this.typeValue],
      })
    },
    handleSelectChange(val) {
      this.getCollectionList({
        page: 1,
        type: val === '' ? '' : [val],
      }).then(() => {
        this.pager.page = 1
      })
    },
    handleCollectOther() {
      this.$onCollect({
        type: 0,
        detail: {
          other: 'other',
        },
      })
    },
    // submitForm(form) {
    //   this.$refs[form].validate(async valid => {
    //     if (valid) {
    //       const query = {
    //         event_id: _.get(this.recordData, 'id'),
    //         detail: {
    //           other: 'other',
    //         },
    //         remark: this.temp.remark,
    //         type: 0,
    //         collectionKey: 'other',
    //         title: this.temp.title,
    //       }
    //       try {
    //         this.newLoading = true
    //         console.log(this.temp)
    //         const { id = 0 } = await api.createCollection(query)

    //         if (id) {
    //           this.$message.success('添加成功')
    //           store.set('upDateCollectionList', true)
    //           this.collectOtherDialogVisible = false
    //         }
    //       } catch (error) {
    //       } finally {
    //         this.newLoading = false
    //       }
    //     } else {
    //       return false
    //     }
    //   })
    // },
    close() {
      this.temp.title = ''
      this.temp.remark = ''
    },
  },
}
</script>

<style lang="less" scoped>
@case-height: 43px;

.collect-container {
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

    .type-filter {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      .el-select {
        width: 100%;
        // width: 100px;
      }
      .add-button {
        border: 1px solid #cdcdcd;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        line-height: 28px;
        padding: 0px 4px;
        height: 28px;

        &:hover {
          cursor: pointer;
          border: 1px solid #409eff;
        }
      }
    }
    .card-container {
      height: calc(100% - @case-height);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__box {
      }
      .add-collect {
        text-align: center;
        .el-button {
          width: 100%;
        }
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
