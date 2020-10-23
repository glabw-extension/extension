<template lang="pug">
.feed-container
  //- .base__title 意见反馈
    // 最后要抽离组件的
  .feed-container__main()
    el-form.form__wrap(
      v-loading="submitLoading"
      :model="model",
      ref="form",
      label-width="100px",
      label-position="top",
      label-suffix="：",
      inline-message)
      el-form-item(
        label="问题描述",
        prop="desc",
        :rules="[{ required: true, message: '请输入问题描述', trigger: 'blur' }]",)
        el-input(
          type="textarea"
          :maxlength="2048"
          v-model.trim="model.desc",
          placeholder="请输入问题描述")
      el-form-item(label="所属模块" prop="module")
        el-cascader(
          ref="cascader"
          style="width: 100%"
          filterable,
          change-on-select,
          v-model="model.module",
          :options="menus",
          clearable
          placeholder="请选择所属模块")
      el-form-item(label="截图上传" prop="files")
        el-tooltip(effect="dark" content="该功能不支持 IE 以及 Edge 浏览器" placement="top" :disabled="!isIE")
          el-button(style="width:115px; margin-bottom:12px;" type="primary" @click="handleScreenshot" :disabled="isIE || isScreenshoting") 点击截屏
        el-upload(
          ref="upload"
          v-bind="static.DEFAULT_UPLOAD_CONFIG"
          :before-upload="beforeUpload"
          :file-list="model.fileList"
          :on-error="handleUploadError"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          :limit="3"
          list-type="picture-card")
          el-button() 手动上传
          //- i.el-icon-plus
          //- div(slot="tip" style="font-size:12px; color: #909399; line-height:20px; margin-top:8px;") {{ static.TIPS }}
      el-form-item(label="联系邮箱" prop="email" :rules="[{ required: true, message: '请输入联系邮箱', trigger: 'blur' }]" )
        el-input(v-model.trim="model.email", :maxlength="50", placeholder="留下您的联系邮箱，便于我们及时回复您")
      el-form-item(label="联系电话" prop="phone" :rules="[{ required: true, message: '请输入联系电话', trigger: 'blur' }]" )
        el-input(v-model.trim="model.phone", :maxlength="50", placeholder="请输入联系电话")
      el-form-item
        el-row(type="flex" justify="space-between" style="margin-top:10px;")
          el-button(style="width:50%;" @click="$router.back()") 取消
          el-button(style="width:50%;"
            type="primary"
            @click="submit"
          ) 提交
</template>

<script>
import { DEFAULT_UPLOAD_CONFIG, TIPS } from './config.js'
import api from '@/data/api/api.js'
import API from '@/data/api.js'
import Kscreenshot from 'kscreenshot'
import { getExploreName } from '@/utils/index.js'

export default {
  data() {
    const browser = getExploreName()
    const isIE = browser === 'IE' || browser === 'Edge'
    return {
      static: {
        DEFAULT_UPLOAD_CONFIG,
        TIPS,
      },
      model: {
        desc: '',
        module: [],
        fileList: [],
        email: '',
        phone: '',
      },
      menus: [],
      submitLoading: false,
      screenshot: null,
      isScreenshoting: false,
      isIE,
    }
  },
  mounted() {
    // menus值格式化
    this.menus = (window.__auth__.products || []).map(menu => {
      if (!menu.submenus) {
        return {
          value: menu.auth,
          label: menu.name,
        }
      } else {
        const submenus = menu.submenus.map(menu => ({
          value: menu.auth,
          label: menu.name,
        }))
        return {
          value: menu.auth,
          label: menu.name,
          children: submenus,
        }
      }
    })
  },

  methods: {
    beforeUpload(file) {
      const isLt500K = file.size / 1024 < 500
      if (!isLt500K) {
        this.$message.error('单文件大小不可超过500kb')
      }
      return isLt500K
    },

    handleClose() {
      this.$emit('update:feedbackShow', this.feedbackVisible)
    },

    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid && this.uploadEndStatus()) {
          this.submitLoading = true
          let module = this.$refs.cascader.getCheckedNodes().map(item => {
            return {
              key: item.value,
              value: item.label,
            }
          })
          const { desc, phone, email } = this.model
          const params = {
            image_url: this.getFormatFiles(),
            module,
            desc,
            phone,
            email,
          }
          this.submitLoading = true
          api
            .createFeedback(params)
            .then(() => {
              this.$message.success('反馈提交成功')
              this.feedbackVisible = false
              this.resetForm()
            })
            .finally(() => {
              this.submitLoading = false
            })
        }
      })
    },

    handleUploadError() {
      this.$refs.upload.clearFiles()
    },

    /**
     * @desc 文件上传 - 响应文件改变
     */
    handleChange(file, fileList) {
      this.model.fileList = fileList
    },

    /**
     * @desc 文件上传 - 文件超出个数限制时的钩子
     */
    handleExceed(files, fileList) {
      // if (fileList.length > this.static.DEFAULT_UPLOAD_CONFIG.limit) {
      this.$message({
        showClose: true,
        message: `最多上传${this.static.DEFAULT_UPLOAD_CONFIG.limit}张图片`,
        type: 'error',
      })
      //   return false
      // }
    },

    handleRemove(file, fileList) {
      this.model.fileList = fileList
    },

    /**
     * @desc 文件上传状态
     * @param {Boolean} isUpload 是否正在上传
     * @returns {Boolean} 当前文件上传是否结束
     *
     * 注：这里暴露给外界调用在处理表单提交时。
     */
    uploadEndStatus() {
      const isUpload = this.model.fileList.every(
        item => item.status === 'success',
      )
      if (!isUpload) {
        this.$message({
          showClose: true,
          message: '文件正在上传中，待文件上传完成后再次尝试',
          type: 'warning',
        })
        return false
      }
      return true
    },

    /**
     * @desc 格式化文件
     */
    /**
     * 格式化文件列表
     */
    getFormatFiles() {
      return this.model.fileList.map(item => ({
        name: item.name,
        filename: item.name,
        fileId: item.response ? item.response.data.data.file_path : item.url,
      }))
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.model.desc = ''
      this.model.module = []
      this.model.fileList = []
      this.model.email = ''
      this.model.phone = ''
      this.$refs.upload.clearFiles()
      this.$refs.form.clearValidate()
    },
    handleScreenshot() {
      console.log('test')
      this.screenshot = new Kscreenshot({
        key: 65,
        // needDownload: true,
        endCB: data => {
          this.isScreenshoting = true
          const blob = this.dataURLtoFile(
            data,
            `screenshot-${new Date().getTime()}`,
          )
          const params = new FormData()
          params.append('file', blob)
          // 生成blob url
          const windowURL = window.URL || window.webkitURL
          const dataUrl = windowURL.createObjectURL(blob)
          API.upLoadImg(params)
            .then(res => {
              const tempFile = {
                name: blob.name,
                percentage: 100,
                raw: blob,
                response: {
                  data: {
                    data: res,
                    result: 0,
                  },
                },
                size: blob.size,
                status: blob.status,
                uid: blob.uid,
                url: dataUrl,
              }
              if (
                this.model.fileList.length >=
                this.static.DEFAULT_UPLOAD_CONFIG.limit
              ) {
                this.$message({
                  showClose: true,
                  message: `最多上传${this.static.DEFAULT_UPLOAD_CONFIG.limit}张图片`,
                  type: 'error',
                })
                this.isScreenshoting = false
                return false
              }
              this.model.fileList.push(tempFile)
              this.isScreenshoting = false
            })
            .catch(e => {
              this.isScreenshoting = false
            })
        },
      })
      this.screenshot.startScreenShot()
    },
    /**
     * @desc 将base64转换为文件对象
     */
    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.png`, { type: mime })
      // const params = new FormData()
      // params.append('file', blob)
      // return params
    },
  },
}
</script>

<style lang="less" scoped>
@case-height: 43px;

.feed-container {
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
    .form__wrap {
      background-color: #fff;
      padding: 12px;
      /deep/.el-form-item {
        margin-bottom: 6px;
      }
      /deep/.el-form-item__label {
        padding: 0;
      }
    }
  }
}
/deep/ .el-upload,
el-upload--picture-card {
  border: none;
  width: auto;
  height: auto;
  line-height: 0;
  position: absolute;
  padding: 1px;
  top: 0px;
  right: 0px;
  .el-button {
    width: 115px;
  }
}
// /deep/ .el-upload,
// .el-upload--picture-card {
//   width: 70px;
//   height: 70px;
//   line-height: 70px;
//   .el-icon-plus {
//     line-height: 70px;
//   }
// }

/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 70px;
  height: 70px;
  margin-bottom: 0;
}
</style>
