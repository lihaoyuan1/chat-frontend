<template>
  <div class="message-item">
    <span class="name" :class="name !== friendName ? 'name-left':'name-right'">{{friendName}}</span>
    <span class="text" :class="name !== friendName ? 'text-left':'text-right'">{{text}}</span>
    <div style="clear: both"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'message-item',
  props: {
    friendName: String,
    text: String
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "message-item";
</style>
