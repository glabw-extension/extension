import Vue from 'vue'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import deleteEmptyProps from '@/utils/deleteEmptyProps.js'
import isStandardObject from '@/utils/isStandardObject.js'
import { setCache, useCahce, forCacheCancel, CACHE_FLAG_KEY } from './cache'

axios.defaults.baseURL = "http://192.168.206.57:3000"; // 默认请求地址
const CancelToken = axios.CancelToken

// 本地融合请求
axios.postLocal = (url, data = {}) => {
  const { host_binding } = Vue.prototype.$loginInfo
  if (!host_binding || !host_binding.host || !host_binding.token) {
    console.error('No localhost binding exist !')
    return Promise.resolve()
  }
  if (host_binding.host.indexOf('://') < 0) {
    host_binding.host += '://'
  }
  return axios({
    url,
    method: 'post',
    baseURL: host_binding.host,
    headers: {
      token: host_binding.token,
    },
    data,
  })
}

void ['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = function(options) {
    if (typeof options === 'string') {
      options = {
        message: options,
      }
    }
    options.type = type
    return Message({
      showClose: true,
      ...options,
    })
  }
})

const authTokenStr = window.location.search
  .split(/[?&]/gi)
  .find(item => item.startsWith('authToken='))

function handleError(error, response) {
  // 未定义错误
  if (!error) {
    return Message.error('未定义错误')
  }
  if (typeof error === 'string') {
    return Message.error(error)
  }

  let message = error.message || '未定义错误'
  if (error.useResponseMessage) {
    message = response.data.errmsg
  }
  // 错误提示方式confirm、message，以后可拓展
  if (error.type === 'confirm') {
    MessageBox.alert(message, {
      title: '提示',
      type: 'warning',
      confirmButtonText: '确定',
    })
  } else {
    Message.error(message)
  }
  // 需要登出的错误
  // error.logout && auth.logout()
}

axios.interceptors.request.use(
  config => {
    // __cache__ logic 配置缓存时直接使用缓存
    const { key, use } = useCahce(config)
    if (use) {
      return {
        ...config,
        cancelToken: new CancelToken(cancel =>
          cancel(`${CACHE_FLAG_KEY}${key}`),
        ),
      }
    }

    if (authTokenStr) {
      config.headers.Authorization = authTokenStr.split('=')[1]
    }
    if (
      config.data &&
      config.method === 'post' &&
      isStandardObject(config.data)
    ) {
      // keepEmptyProps:true 保留空参数
      // 默认不传入该参数
      const keepEmptyProps = config.keepEmptyProps
      !keepEmptyProps && (config.data = deleteEmptyProps(config.data))
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  response => {
    // 文件下载处理
    if (response.headers['content-type'] === 'application/octet-stream') {
      return Promise.resolve(response.data)
    } else if (response.data instanceof Blob) {
      if (response.data.size) {
        return Promise.resolve(response.data)
      } else {
        Message.error({ message: '文件下载失败' })
        return Promise.reject(response.data)
      }
    }
    // 业务层面错误处理
    const errCode = (response.data.errcode || '').toLowerCase()
    const errNo = response.data.errno
    let error
    if (errNo) {
      // 优先处理10000的错误
      if (errNo === 10000) {
        error = axios.__errCode[10000]
      } else {
        const lowerCode = errCode.replace('err_.', '')
        error = axios.__errCode[lowerCode] || axios.__errCode[errNo]
      }
      // 透传错误处理
      const {
        config: { __pass_err__ },
      } = response
      !__pass_err__ && handleError(error, response)
      return Promise.reject(response.data)
    } else {
      setCache(response) // 设置缓存
      return Promise.resolve(response.data.data)
    }
  },
  // http 状态处理
  error => {
    // 承接因缓存被 cancel 的请求
    const { cacheCancel, value } = forCacheCancel(error)
    if (cacheCancel) {
      return Promise.resolve(value)
    }

    if (!error.response) {
      console.log('Error', error.message)
      return Promise.reject(error)
    }

    let status = error.response.status
    const STATUS_MAP = {
      '400': '参数错误',
      '401': {
        message: '未登录或授权信息过期，请重新登录',
        logout: true,
      },
      '404': '请求地址无效',
      '429': '操作过于频繁，请稍后重试',
      '500': '服务错误',
      '502': '服务错误',
      '504': '请求超时，请稍后再试',
    }
    handleError(STATUS_MAP[status], error.response)
    return Promise.reject(error)
  },
)

Vue.use({
  install() {
    const services = {
      http: axios,
    }
    Object.keys(services).forEach(service => {
      Vue.prototype[`$${service}`] = services[service]
      Vue[service] = services[service]
    })
  },
})
