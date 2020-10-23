import storage from '@/utils/storage'

export const CACHE_FLAG_KEY = '[[CACHE_FLAG_KEY]]'
const CACHE_FLAG_KEY_REGEXP = /\[\[CACHE_FLAG_KEY\]\]/

/**
 * @description 是否需要缓存
 *
 * @param {object} __cache__ 缓存配置
 * @returns {boolean} 是否缓存
 */
export function cache(__cache__) {
  if (typeof __cache__ === 'boolean') {
    return __cache__ === true
  }
  if (typeof __cache__ === 'object') {
    return true
  }
  return false
}

/**
 * @description 过期时间判断
 *
 * @param {object} __cache__ 缓存配置
 * @returns {boolean} 是否过期
 */
function expiration(__cache__) {
  if (typeof __cache__ === 'boolean') {
    return false
  }
  if (__cache__ && __cache__.expire) {
    const now = Date.now()
    const expire = new Date(__cache__.expire)
    if (expire - now > 0) return false
    else return true
  }
  return false
}

/**
 * @description 是否需要使用缓存数据
 *
 * @param {object} config
 * @returns {boolean}
 */
export function useCahce(config) {
  const { __cache__, url, baseURL } = config || {}
  const key = `${baseURL}${url}`
  const use = cache(__cache__) && !expiration(__cache__) && hasCahceKey(key)
  return {
    key,
    use,
  }
}

/**
 * @description 设置缓存
 *
 * @export
 * @param {*} { data, config }
 * @returns {void}
 */
export function setCache(response) {
  const { config } = response || {}
  if (config && cache(config.__cache__)) {
    storage.session.set(config.url, response)
  }
}

/**
 * @description 获取缓存
 *
 * @export
 * @param {string} key
 * @returns {any} 缓存值
 */
export function getCache(key) {
  return storage.session.get(key)
}

/**
 * @description 是否含有对应缓存 key
 *
 * @param {string} key
 * @returns {boolean}
 */
function hasCahceKey(key) {
  return storage.session.has(key)
}

/**
 * @description 请求是否是因为缓存而被取消
 *
 * @export
 * @param {object} error
 * @returns {Object}
 */
export function forCacheCancel(error) {
  if (error && error.message) {
    const key = error.message.replace(CACHE_FLAG_KEY_REGEXP, '')
    const { data = {} } = getCache(key) || {}
    return {
      cacheCancel: CACHE_FLAG_KEY_REGEXP.test(error.message),
      value: data.data,
    }
  }
  return {}
}
