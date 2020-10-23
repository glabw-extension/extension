class Storage {
  constructor(options) {
    const { prefix, mode } = options || {}
    this.prefix = prefix || '__ga__'
    this.storage = window[mode || 'localStorage']
  }

  /**
   * @description 设置值
   *
   * @param {*} key
   * @param {*} value
   * @memberof Storage
   */
  set(key, value) {
    this.storage.setItem(`${this.prefix}-${key}`, JSON.stringify(value || {}))
  }

  /**
   * @description 取值
   *
   * @param {*} key
   * @returns
   * @memberof Storage
   */
  get(key) {
    const value = this.storage.getItem(`${this.prefix}-${key}`)
    return JSON.parse(value)
  }

  /**
   * 存储是否含有对应键值
   *
   * @param {*} key
   * @returns
   * @memberof Storage
   */
  has(key) {
    if (this.get(key) === null) {
      return false
    }
    return true
  }

  /**
   * @description 移除值
   *
   * @param {*} key
   * @memberof Storage
   */
  remove(key) {
    this.storage.removeItem(`${this.prefix}-${key}`)
  }
}

export default {
  local: new Storage(),
  session: new Storage({ mode: 'sessionStorage' }),
}
