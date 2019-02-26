<template>
  <div class="error-tip" v-show="showFlag">
    <transition name="error">
      <div class="container" v-show="showFlag">
        <span :class="type === 'error' ? 'error' : 'success'">{{message}}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'error-tip',
  data () {
    return {
      showFlag: false,
      type: 'error',
      message: ''
    }
  },
  methods: {
    show (type, message) {
      this.type = type
      this.message = message
      this.showFlag = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.showFlag = false
      }, 800)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "error-tip";
</style>
