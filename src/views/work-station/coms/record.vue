<template lang="pug">
.base__record 
  //- global-record(v-acl="'event.event.get'", :editable="recordEditable")
</template>

<script>
// import globalRecord from '@/components/global-record'

export default {
  components: {
    // globalRecord,
  },
  data() {
    const allow_edit_event = window.sessionStorage['record:allow_edit_event']
    const recordEditable = allow_edit_event
      ? JSON.parse(allow_edit_event)
      : undefined
    return {
      recordEditable,
    }
  },

  methods: {},
}
</script>

<style lang="less" scoped>
.base__record {
  /deep/.global_record__btn {
    color: #606266;
  }
}
</style>
