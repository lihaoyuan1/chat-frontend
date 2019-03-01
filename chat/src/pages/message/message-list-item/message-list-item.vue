<template>
  <div class="message-list-item border-bottom-1px" @click="handleClick" v-if="object.content">
    <div class="top">
      <span class="name">{{object.name}}</span><span class="type">{{object.type | text}}</span>
    </div>
    <div class="bottom">{{object.content}}</div>
    <div class="tip" v-if="isShowTip"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'message-list-item',
  props: {
    object: Object
  },
  computed: {
    isShowTip () {
      return this.object.isNew && this.object.name !== this.name
    },
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleClick () {
      let data = Object.assign({type: this.object.type}, {data: this.object})
      this.$emit('select', data)
    }
  },
  filters: {
    text (text) {
      if (text === 'friend') {
        return '（好友）'
      }
      return '（群）'
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "message-list-item";
</style>
