import Vue from 'vue'

/**
 * 简易的store
 * 命名规则
 * app:key
 * 例如:
 * setItem('record:record', record)
 */
window.__store__ =
  window.__store__ ||
  new Vue({
    data() {
      return {
        store: {},
        plugins: [],
      }
    },
    methods: {
      get(key, params) {
        return typeof this.store[key] === 'function'
          ? this.store[key](params)
          : this.store[key]
      },
      set(key, value) {
        // 触发`${key}Change`事件
        this.$emit(`${key}Change`, value, this.store[key])
        this.$set(this.store, key, value)
      },
      addPlugin(component) {
        this.plugins.push(component)
      },
      cleanPlugin() {
        this.plugins = []
      },
    },
  })

export default window.__store__
