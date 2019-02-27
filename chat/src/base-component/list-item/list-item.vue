<template>
  <div class="friend-item border-bottom-1px" @click="handleClick">
    <div class="name">{{item.name}}</div>
    <div
      class="status"
      :class="item.status | showStyle"
      v-if="type === 'friend'"
    >
      {{item.status | showMessage}}</div>
    <div
      class="status off"
      v-if="type === 'group'"
    >
      成员{{item.count}}人</div>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    type: {
      type: String,
      default: 'friend'
    }
  },
  methods: {
    handleClick () {
      this.$emit('select', this.item.id)
    }
  },
  filters: {
    showMessage (code) {
      if (code === 0) {
        return '离线'
      }
      return '在线'
    },
    showStyle (code) {
      if (code === 0) {
        return 'off'
      }
      return 'on'
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "list-item";
</style>
