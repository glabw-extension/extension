<template lang="pug">
.judge-card
  .judge-card__img(@click="goMindMapPage")
    download-img(:filePath="data.imageUrl" :key="data.imageUrl")
  .judge-card__container
    .judge-card__container-title {{cardTitle}}
    .judge-card__container-remark {{cardRemark}}
    el-row.judge-card__container-row(type="flex" justify="space-between")
      .time {{cardTime}}
      el-dropdown()
        .dropdown-link(:style="{maskImage:`url(${dotted_more})`}")
        el-dropdown-menu(slot="dropdown")
          //- el-dropdown-item() 上传至战法库
          el-dropdown-item(@click.native="handleUpdate") 修改名称及备注
          el-dropdown-item(@click.native="handleDelete") 删除
  el-dialog(title="修改名称及备注" :visible.sync="updateDialogVisible" append-to-body :close-on-click-modal="false" width="500px")
    el-form(:model="temp" :rules="rules" ref="judgeForm" label-width="100px" label-position="right")
      el-form-item(label="名称：" prop="title")
        el-input(v-model="temp.title" :maxlength="100")
      el-form-item(label="备注：")
        el-input(v-model="temp.remark" type="textarea" :maxlength="100" show-word-limit)
    template(#footer)
      el-button(@click="updateDialogVisible = false") 取消
      el-button(type="primary" @click="updateTitleComment" :loading="loading") 保存
</template>

<script>
import dotted_more from '@/assets/workplace/dotted-more.svg'
import dayjs from 'dayjs'
import DownloadImg from './download-img'
import api from '@/data/api'
import store from '@/services/store'

export default {
  components: {
    DownloadImg,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    eventId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      key: '',
      dotted_more,
      updateDialogVisible: false,
      loading: false,
      temp: {
        title: '',
        remark: '',
      },
      rules: {
        title: [{ required: true, message: '请填写名称', trigger: 'blur' }],
      },
    }
  },
  computed: {
    cardTitle() {
      return this.data.title || '/'
    },
    cardImage() {
      return this.data.imageUrl || ''
    },
    cardRemark() {
      return this.data.remark || '/'
    },
    cardTime() {
      return dayjs(this.data.updateTime).format('YYYY-MM-DD HH:mm:ss') || '/'
    },
  },
  methods: {
    handleUpdate() {
      this.temp.title = this.data.title
      this.temp.remark = this.data.remark
      this.updateDialogVisible = true
    },
    updateTitleComment() {
      this.$refs['judgeForm'].validate(valid => {
        if (valid) {
          this.loading = true
          const { id, type, event_id } = this.data

          api
            .updateMindById({
              id,
              type,
              event_id,
              ...this.temp,
            })
            .then(res => {
              store.set('upDateMindMapList', true)
              this.updateDialogVisible = false
              this.loading = false
            })
            .catch(e => {
              this.loading = false
            })
        }
      })
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该研判脑图，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const { id, type, event_id } = this.data
        api
          .deleteMindById({
            id,
            type,
            event_id,
          })
          .then(res => {
            store.set('upDateMindMapList', true)
            this.$message({
              type: 'success',
              message: '删除成功',
            })
          })
      })
    },
    goMindMapPage() {
      const params = {
        name: 'workstation.mindMap',
        params: { id: this.data.id },
        query: { event_id: this.eventId },
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
.judge-card {
  display: flex;
  // width: 264px;

  background-color: #fff;
  border-radius: 0 4px 4px 4px;
  padding: 10px;
  margin-bottom: 8px;

  &__img {
    width: 64px;
    min-width: 64px;
    height: 56px;
    border: 1px solid #dcdcdc;
    margin-right: 12px;
    cursor: pointer;
    & .download-img {
      width: 100%;
      height: 100%;
    }
  }
  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-title {
      width: 180px;
      font-weight: 500;
      font-size: 14px;
      color: #606266;
      line-height: 20px;
      margin-bottom: 3px;
      .ellipsis();
    }
    &-remark {
      width: 170px;
      font-size: 12px;
      color: #606266;
      line-height: 16px;

      .ellipsis();
    }
    &-row {
      width: 168px;
      line-height: 16px;
      .time {
        font-size: 12px;
        color: #969fad;
      }
    }
  }
}

.dropdown-link {
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-color: @color-text-secondary;
  &:hover {
    background-color: #409eff;
  }
}
</style>
