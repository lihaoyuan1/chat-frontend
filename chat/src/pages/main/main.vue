<template>
  <div class="main">
    <div class="header">
      <div class="name">{{name}}</div>
      <div class="tip">{{tip}}</div>
      <router-link :to="{name: 'search'}" tag="div" class="icon">
        <i class="icon-font icon-icon_add_person" v-show="location === 'friend'"></i>
        <i class="icon-font icon-icon_add" v-show="location === 'group'"></i>
      </router-link>
    </div>
    <div class="nav border-top-1px">
      <router-link :to="{name: 'message'}" tag="div" class="link">
        <i class="icon-font icon-icon_message"></i><br/>
        <span>消息</span>
      </router-link>
      <router-link :to="{name: 'friend'}" tag="div" class="link">
        <i class="icon-font icon-friend"></i><br/>
        <span>好友</span>
      </router-link>
      <router-link :to="{name: 'group'}" tag="div" class="link">
        <i class="icon-font icon-icon_group"></i><br/>
        <span>群组</span>
      </router-link>
    </div>
    <transition name="main">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'main-page',
  computed: {
    tip () {
      if (this.location === 'message') {
        return '消息'
      } else if (this.location === 'friend') {
        return '好友'
      } else {
        return '群组'
      }
    },
    location () {
      return this.$route.path.split('/')[2]
    },
    ...mapGetters([
      'id',
      'name'
    ])
  },
  created () {
    if (!this.id) {
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "main";
</style>
