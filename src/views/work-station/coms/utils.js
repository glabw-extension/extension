export const hasEventID = () => {
  const { id = '' } = JSON.parse(
    window.sessionStorage.getItem('record:record') || '{}',
  )

  return !id
}

export default {
  bind(el, binding) {
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
  unbind(el) {
    document.removeEventListener('contextmenu', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
}
