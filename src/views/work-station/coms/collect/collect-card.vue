<template lang="pug">
.collect-card
  .collect-card__title(:style="{backgroundImage: `url(${cardImage})`}")
    .main {{cardTitle}}
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
          el-dropdown-item(v-if="data.type === 1" @click.native="goReport") 查看全息画像
          el-dropdown-item(v-if="data.type === 1" @click.native="addedEarlyWarning") 创建预警任务
          el-dropdown-item(v-if="data.type === 3" @click.native="goIpExtract") 查看 IP 提数
          el-dropdown-item(v-if="data.type === 2" @click.native="goWIFI") 查看 Wi-Fi 提数
          el-dropdown-item(v-if="data.type === 5" @click.native="goLocation") 查看位置信息
          el-dropdown-item(@click.native="updateRemark") 修改备注
          el-dropdown-item(@click.native="deleteCollection") 删除
</template>

<script>
import dayjs from 'dayjs'
import api from '@self/data/api'
import store from '@/services/store'

import workplace_id from '@self/assets/workplace/workplace_id.svg'
import workplace_wifi from '@self/assets/workplace/workplace_wifi.svg'
import workplace_ip from '@self/assets/workplace/workplace_ip.svg'
import workplace_app from '@self/assets/workplace/workplace_app.svg'
import workplace_location from '@self/assets/workplace/workplace_location.svg'
import dotted_more from '@self/assets/workplace/dotted-more.svg'

const ICON_MAP = {
  // 0 其他
  0: workplace_id,
  1: workplace_id,
  2: workplace_wifi,
  3: workplace_ip,
  4: workplace_app,
  5: workplace_location,
}

const COLLECT_TYPE = {
  0: 'other',
  1: 'id',
  2: 'wifi',
  3: 'ip',
  4: 'app',
  5: 'location',
}

export default {
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
      key: '',
      dotted_more,
    }
  },
  computed: {
    cardTitle() {
      return _.get(this.data, `title`) || '/'
    },
    cardImage() {
      return ICON_MAP[_.get(this.data, 'type')] || ''
    },
    cardRemark() {
      return this.data.remark || '/'
    },
    cardTime() {
      return dayjs(this.data.updateTime).format('YYYY-MM-DD HH:mm:ss') || '/'
    },
    cardAppName() {
      return _.get(this.data, `detail.pkg`) || '/'
    },
    cardLng() {
      const lng = _.get(this.data, `detail.location.lng`)
      const lat = _.get(this.data, `detail.location.lat`)
      return lng && lat
    },
    cardLocation() {
      // 取经纬度后六位
      const lng = _.get(this.data, `detail.location.lng`).toString()
      const lngIndex = lng.indexOf('.')
      const resLng = lng.slice(0, lngIndex + 7)
      const lat = _.get(this.data, `detail.location.lat`).toString()
      const latIndex = lng.indexOf('.')
      const resLat = lng.slice(0, latIndex + 7)
      return lng && lat ? `${resLng}, ${resLat}` : '/'
    },
    cardMac() {
      return _.get(this.data, `detail.wifimac`) || '/'
    },
  },

  methods: {
    async action(params) {
      const { type = 'update', value = '' } = params
      const event_id = _.get(
        JSON.parse(window.sessionStorage.getItem('record:record') || '{}'),
        'id',
      )
      const deleteQuery = {
        id: _.get(this.data, 'id'),
        event_id,
      }
      const updateQuery = {
        id: _.get(this.data, 'id'),
        event_id,
        remark: value,
      }
      // if 类型切换
      try {
        const resArr =
          type === 'update'
            ? await api.updateCollection(updateQuery)
            : await api.deleteCollection(deleteQuery)

        !_.isEmpty(resArr) && store.set('upDateCollectionList', true)
        !_.isEmpty(resArr) &&
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

    updateRemark() {
      this.$prompt('请输入备注', '修改备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputValue: `${_.get(this.data, 'remark')}`,
        inputValidator: value => value.length < 50,
        inputErrorMessage: '备注限制在 50 字以内',
      })
        .then(({ value }) => {
          this.action({ type: 'update', value })
        })
        .catch(() => {})
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
            id: _.get(this.data, 'title'),
            type: _.get(this.data, 'detail.type'),
            name: _.get(recordInfo, 'name'),
            reason: _.get(recordInfo, 'reason'),
          },
        })
    },

    goReport() {
      const id = _.get(this.data, 'detail.id')
      const type = _.get(this.data, 'detail.type')
      this.$isPermitted('profile') && id && type && this.$goReport({ id, type })
    },

    goIpExtract(mac) {
      const { href } = this.$router.resolve({
        name: 'ipExtract',
        query: {
          id: _.get(this.data, 'title'),
        },
      })
      this.$isPermitted('space_extract.ip_extract.get') && window.open(href)
    },

    goWIFI() {
      const { href } = this.$router.resolve({
        name: 'wifi-crowd.list',
        query: {
          id: _.get(this.data, 'detail.wifimac'),
        },
      })
      this.$isPermitted('space_extract.wifi_extract.get') && window.open(href)
    },

    goLocation() {
      const address =
        _.get(this.data, 'title') || _.get(this.data, 'detail.address')
      const lat = _.get(this.data, 'detail.location.lat')
      const lng = _.get(this.data, 'detail.location.lng')

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
      color: @color-text-regular;
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
  background-color: @color-text-secondary;
  &:hover {
    background-color: @primary-color;
  }
}
</style>
