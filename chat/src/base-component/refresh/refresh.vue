<template>
  <div class="refresh" v-show="showFlag">
    <img width="30" height="30" src="./loading.gif"/><span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'refresh',
  data () {
    return {
      showFlag: false,
      message: '正在加载中'
    }
  },
  methods: {
    show (message) {
      this.message = message
      this.showFlag = true
    },
    hidden (message) {
      this.message = message
      this.showFlag = false
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "refresh";
</style>
