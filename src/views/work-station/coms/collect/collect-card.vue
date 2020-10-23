<template lang="pug">
.collect-card
  .collect-card__title(:style="{backgroundImage: `url(${cardImage})`}")
    .main(:title="cardTitle") 
      span(v-if="false") {{cardTitle}}
      a.link(:src="'www.baidu.com'" :title="cardTitle") {{cardTitle}}
  .collect-card__container
    .collect-card__container-remark(v-if="data.detail.pkg") APP 包名：{{cardAppName}}
    .collect-card__container-remark(v-if="cardLng") 经纬度：{{cardLocation}}
    .collect-card__container-remark(v-if="data.detail.wifimac") Wi-Fi MAC：{{cardMac}}
    .collect-card__container-remark() 备注：{{cardRemark}}
    el-row.collect-card__container-row(type="flex" justify="space-between")
      .time {{cardTime}}
      el-dropdown()
        .dropdown-link(:style="{maskImage:`url(${dotted_more})`}")
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(@click.native="showDetailHandle") {{showDetail?'收起':'展开编辑'}}
          el-dropdown-item(v-if="data.type === 1" @click.native="goReport") 查看全息画像
          el-dropdown-item(v-if="data.type === 1" @click.native="addedEarlyWarning") 创建预警任务
          el-dropdown-item(v-if="data.type === 3" @click.native="goIpExtract") 查看 IP 提数
          el-dropdown-item(v-if="data.type === 2" @click.native="goWIFI") 查看 Wi-Fi 提数
          el-dropdown-item(v-if="data.type === 5" @click.native="goLocation") 查看位置信息
          //- el-dropdown-item(@click.native="handleView") 查看详情
          el-dropdown-item(@click.native="updateRemark") 修改备注
          el-dropdown-item(@click.native="deleteCollection") 删除
  collect-model(:visible.sync="collectModelVisible"
    :mode="collectMode"
    :modalData="this.data" 
    :type="collectModelType"
    :detail="collectModelDetail"
    :title="collectModelTitle")
  collectEdit(:curCollect="this.data" :show="showDetail")
</template>

<script>
import dayjs from 'dayjs'
import api from '@/data/api'
import store from '@/services/store'
import collectModel from '../collectModel.vue'
import collectEdit from './collect-edit.vue'

import workplace_id from '@/assets/workplace/workplace_id.svg'
import workplace_wifi from '@/assets/workplace/workplace_wifi.svg'
import workplace_ip from '@/assets/workplace/workplace_ip.svg'
import workplace_app from '@/assets/workplace/workplace_app.svg'
import workplace_location from '@/assets/workplace/workplace_location.svg'
import workplace_text from '@/assets/workplace/workplace_text.svg'
import workplace_link from '@/assets/workplace/workplace_link.svg'
import workplace_img from '@/assets/workplace/workplace_img.svg'
import workplace_other from '@/assets/workplace/workplace_other.svg'
import dotted_more from '@/assets/workplace/dotted-more.svg'

const ICON_MAP = {
  // 0 其他
  0: workplace_other,
  1: workplace_id,
  2: workplace_wifi,
  3: workplace_ip,
  4: workplace_app,
  5: workplace_location,
  6: workplace_text,
  7: workplace_link,
  8: workplace_img,
}

// const COLLECT_TYPE = {
//   0: 'other',
//   1: 'id',
//   2: 'wifi',
//   3: 'ip',
//   4: 'app',
//   5: 'location',
// }

export default {
  components: {
    collectModel,
    collectEdit
  },
  /* data:
    type:类型: 0-其他; 1-id; 2-wifi; 3-ip; 4-app; 5-location;
    remark: 备注;
    title: 名称
    detail: Object 详情
   */
  props: {
    data: {
      type: Object,
      default: () => ({
        id: '',
        type: 5,
        remark: '',
        title: '',
        detail: {},
        updateTime: '',
      }),
    },
  },
  data() {
    return {
      showDetail: false,
      key: '',
      dotted_more,
      collectModelVisible: false,
      collectModelType: this.data.type,
      collectMode: 'view',
      collectModelDetail: this.data.detail,
      collectModelTitle: this.data.title,
    }
  },
  computed: {
    cardTitle() {
      return this._.get(this.data, `title`) || '/'
    },
    cardImage() {
      return ICON_MAP[this._.get(this.data, 'type')] || ''
    },
    cardRemark() {
      return this.data.remark || '/'
    },
    cardTime() {
      return dayjs(this.data.updateTime).format('YYYY-MM-DD HH:mm:ss') || '/'
    },
    cardAppName() {
      return this._.get(this.data, `detail.pkg`) || '/'
    },
    cardLng() {
      const lng = this._.get(this.data, `detail.location.lng`)
      const lat = this._.get(this.data, `detail.location.lat`)
      return lng && lat
    },
    cardLocation() {
      // 取经纬度后六位
      const lng = this._.get(this.data, `detail.location.lng`).toString()
      const lngIndex = lng.indexOf('.')
      const resLng = lng.slice(0, lngIndex + 7)
      const lat = this._.get(this.data, `detail.location.lat`).toString()
      const latIndex = lng.indexOf('.')
      const resLat = lng.slice(0, latIndex + 7)
      return lng && lat ? `${resLng}, ${resLat}` : '/'
    },
    cardMac() {
      return this._.get(this.data, `detail.wifimac`) || '/'
    },
  },

  methods: {
    showDetailHandle() {
      this.showDetail = !this.showDetail
      parent.postMessage(
          { type: "workstation", to: "content", fullpage: this.showDetail },
          "*"
        );
      if(this.showDetail) {
        window.addEventListener('touchstart', e => {
          console.log('touchstart');
          e.preventDefault()
        }, false)
      }
    },
    async action(params) {
      const { type = 'update', value = '' } = params
      const event_id = this._.get(
        JSON.parse(window.sessionStorage.getItem('record:record') || '{}'),
        'id',
      )
      const deleteQuery = {
        id: this._.get(this.data, 'id'),
        event_id,
      }
      const updateQuery = {
        id: this._.get(this.data, 'id'),
        event_id,
        remark: value,
      }
      // if 类型切换
      try {
        const resArr =
          type === 'update'
            ? await api.updateCollection(updateQuery)
            : await api.deleteCollection(deleteQuery)

        !this._.isEmpty(resArr) && store.set('upDateCollectionList', true)
        !this._.isEmpty(resArr) &&
          this.$message({
            type: 'success',
            message: `${type === 'update' ? '更新' : '删除'}操作成功`,
          })
      } catch (error) {
        console.log('deleteCollection >', error)
      }
    },

    deleteCollection() {
      this.$confirm('确定要删除该收藏项？', '提示', {
        comfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.action({ type: 'delete' })
        })
        .catch(() => {})
    },
    handleView() {
      this.collectMode = 'view'
      this.modalData = this.data
      this.collectModelType = this.data.type
      this.collectModelDetail = this.data.detail
      this.collectModelTitle = this.data.title
      this.collectModelVisible = true
    },
    updateRemark() {
      console.log(this.data);
      this.collectMode = 'update'
      this.modalData = this.data
      this.collectModelType = this.data.type
      this.collectModelDetail = this.data.detail
      this.collectModelTitle = this.data.title
      this.collectModelVisible = true
      // this.$prompt('请输入备注', '修改备注', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputType: 'textarea',
      //   inputValue: `${this._.get(this.data, 'remark')}`,
      //   inputValidator: value => value.length <= 100,
      //   inputErrorMessage: '备注限制在 100 字以内',
      // })
      //   .then(({ value }) => {
      //     this.action({ type: 'update', value })
      //   })
      //   .catch(() => {})
    },

    addedEarlyWarning() {
      const auth = 'monitor.task.person_alarm'
      const recordInfo = JSON.parse(
        window.sessionStorage.getItem('record:record') || '{}',
      )

      this.$isPermitted(auth) &&
        this.$router.push({
          name: 'monitorPerson.add',
          params: {
            id: this._.get(this.data, 'title'),
            type: this._.get(this.data, 'detail.type'),
            name: this._.get(recordInfo, 'name'),
            reason: this._.get(recordInfo, 'reason'),
          },
        })
    },

    goReport() {
      const id = this._.get(this.data, 'detail.id')
      const type = this._.get(this.data, 'detail.type')
      this.$isPermitted('profile') && id && type && this.$goReport({ id, type })
    },

    goIpExtract() {
      const { href } = this.$router.resolve({
        name: 'ipExtract',
        query: {
          id: this._.get(this.data, 'title'),
        },
      })
      this.$isPermitted('space_extract.ip_extract.get') && window.open(href)
    },

    goWIFI() {
      const { href } = this.$router.resolve({
        name: 'wifi-crowd.list',
        query: {
          id: this._.get(this.data, 'detail.wifimac'),
        },
      })
      this.$isPermitted('space_extract.wifi_extract.get') && window.open(href)
    },

    goLocation() {
      const address =
        this._.get(this.data, 'title') || this._.get(this.data, 'detail.address')
      const lat = this._.get(this.data, 'detail.location.lat')
      const lng = this._.get(this.data, 'detail.location.lng')

      lat &&
        address &&
        window.open(
          `/profile/map?title=Wi-Fi位置&address=${address}&lat=${lat}&lng=${lng}`,
        )
    },
  },
}
</script>

<style lang="less" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.collect-card {
  background-color: #fff;
  box-shadow: 1px 0 15px 0 rgba(0, 0, 0, 0.01);
  border-radius: 0 4px 0 4px;
  margin-bottom: 10px;

  &__title {
    width: 100%;
    height: 24px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right;
    border-radius: 0 4px 0 0;
    padding: 2px 10px;
    .main {
      width: 200px;
      height: 20px;
      background: transparent;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      .ellipsis();
    }
  }
  &__container {
    padding: 6px 10px;
    &-remark {
      width: 240px;
      font-size: 12px;
      color: #606266;
      margin-bottom: 4px;
      line-height: 16px;
      .ellipsis();
    }
    &-row {
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
  background-color: #909399;
  &:hover {
    background-color: #409eff;
  }
}
</style>
