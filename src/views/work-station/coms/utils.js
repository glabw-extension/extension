export const hasEventID = () => {
  const { id = '' } = JSON.parse(
    window.sessionStorage.getItem('record:record') || '{}',
  )

  return !_.isEmpty(id)
}

export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('contextmenu', documentHandler)
  },
  update() {},
  unbind(el, binding) {
    document.removeEventListener('contextmenu', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
}
