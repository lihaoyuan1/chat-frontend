<template>
  <transition name="load">
    <div class="loading" v-show="showFlag">
      <div class="container">
        <img width="50" height="50" src="./loading.gif"/>
        <span>{{message}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  props: {
    message: {
      type: String,
      default: '正在加载中'
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hidden () {
      this.showFlag = false
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "loading";
</style>
