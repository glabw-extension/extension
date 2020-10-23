<template lang="pug">
el-dialog(
  width="480px"
  custom-class="collect-model__wrapper"
  :title="modelTitle"
  :visible.sync="mVisible"
  :destroy-on-close="true"
  :append-to-body="true"
  @close="closeDialog"
)
  el-form(:model="query" :rules="rules" ref="collectForm" label-width="110px" label-position="right")
    el-form-item(label="自定义名称：" v-if="type === 0" maxlength="100" prop="title")
      el-input(v-model="query.title" :disabled="mode==='update' || mode === 'view'")
    div(v-else-if="type === 1")
      el-form-item(label="ID 信息：")
        el-input(v-model="query.detail.id" :disabled="true" )
      el-form-item(label="类别：")
        el-input(v-model="query.detail.type" :disabled="true")
    div(v-else-if="type === 2")
      el-form-item(label="Wi-Fi 名称：")
        el-input(v-model="query.detail.ssid" :disabled="true")
      el-form-item(label="Wi-Fi MAC：")
        el-input(v-model="query.detail.wifimac" :disabled="true")
    div(v-else-if="type === 3")
      el-form-item(label="IP 地址：")
        el-input(v-model="query.detail.ip" :disabled="true")
    div(v-else-if="type === 4")
      el-form-item(label="APP 名称：")
        el-input(v-model="query.detail.name" :disabled="true")
      el-form-item(label="APP 包名：" :disabled="true")
        el-input(v-model="query.detail.pkg" :disabled="true")
    div(v-else-if="type === 5")
      el-form-item(label="位置信息：" :disabled="true")
        el-input(v-model="query.detail.address" :disabled="true")
      el-form-item(label="经纬度 ：" :disabled="true")
        el-input(:value="`${Number(query.detail.location.lng)}, ${Number(query.detail.location.lat)}`" :disabled="true")
    el-form-item(v-if="mode === 'create'" label="添加备注：")
      el-input(v-model="query.remark" type="textarea" :maxlength="100" show-word-limit)
    el-form-item(v-else-if="mode === 'update'" label="修改备注：")
      el-input(v-model="updateQuery.remark" type="textarea" :maxlength="100" show-word-limit)
    el-form-item(v-else-if="mode === 'view'" label="备注：")
      el-input(v-model="updateQuery.remark" type="textarea" :maxlength="100" show-word-limit disabled)
  .dialog-footer(slot="footer" v-if="mode === 'create' || mode === 'update'")
    el-button(@click="closeDialog") 取消
    el-button(type="primary" @click="submitForm('collectForm')" :loading="loading") 保存
</template>

<script>
import api from '@/data/api.js'
import store from '@/services/store'

export default {
  props: {
    mode: {
      type: String,
      default: 'create',
    },
    // 仅在update和view模式使用
    modalData: {
      type: Object,
      default: () => ({ id: 0 }),
    },
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    detail: {
      type: Object,
      default: () => {
        return {
          id: '',
        }
      },
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    const currentEvent_ID = this._.get(
      JSON.parse(window.sessionStorage.getItem('record:record') || '{}'),
      'id',
    )

    return {
      loading: false,
      query: {
        event_id: currentEvent_ID,
        detail: this.detail,
        remark: '',
        type: 1,
        collectionKey: '',
        title: '',
      },
      updateQuery: {
        id: this.modalData.id,
        event_id: currentEvent_ID,
        remark: this.modalData.remark,
      },
      rules: {
        title: [{ required: true, message: '请填写名称', trigger: 'blur' }],
      },
    }
  },
  computed: {
    mVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
    modelTitle() {
      if (this.mode === 'view') {
        return '查看详情'
      } else if (this.mode === 'update') {
        return '修改备注'
      } else {
        const typeTitleMap = [
          '收藏其他',
          '收藏 ID',
          '收藏 Wi-Fi',
          '收藏 IP',
          '收藏 APP',
          '收藏位置',
        ]
        return typeTitleMap[this.type]
      }
    },
  },
  watch: {
    type(val) {
      this.query.type = val
    },
    detail: {
      handler(val) {
        this.query.detail = val

        // '类型: 0-其他; 1-id; 2-wifi; 3-ip; 4-app; 5-location'
        const keyMap = ['', 'id', 'wifimac', 'ip', 'pkg', 'location']
        const baseType = this.type
        this.query.collectionKey =
          baseType === 5
            ? `${this._.get(val, 'location.lng')},${this._.get(val, 'location.lat')}`
            : val[keyMap[baseType]]
      },
    },
    title: {
      handler(val) {
        this.query.title = val
      },
      immediate: true,
    },
  },
  updated() {
    const event_id = this._.get(
      JSON.parse(window.sessionStorage.getItem('record:record') || '{}'),
      'id',
    )
    this.query.event_id = event_id
  },
  methods: {
    closeDialog() {
      this.mVisible = false
      this.query.remark = ''
      this.query.title = ''
    },
    submitForm(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          if (this.mode === 'create') {
            try {
              this.loading = true
              const { id = 0 } = await api.createCollection(this.query)

              if (id) {
                this.$message.success('收藏成功')
                store.set('upDateCollectionList', true)
                this.mVisible = false
              }
            } catch (error) {
              console.log(error);
            } finally {
              this.loading = false
            }
          } else if (this.mode === 'update') {
            try {
              this.loading = true
              const resArr = await api.updateCollection(this.updateQuery)
              if (!this._.isEmpty(resArr)) {
                store.set('upDateCollectionList', true)
                this.$message({
                  type: 'success',
                  message: '修改成功',
                })
                this.mVisible = false
              }
              this.loading = false
            } catch (e) {
              this.loading = false
            }
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
// /deep/.collect-model__wrapper {
//   .el-dialog__body {
//     padding: 12px;
//   }
// }
</style>
