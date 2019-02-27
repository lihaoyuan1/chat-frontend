<template>
  <div class="search">
    <div class="header">
      <div class="header-left" @click="_back">
        <i class="icon-font icon-icon_left"></i>
      </div>
      <div class="header-center">添加</div>
      <div class="header-right"></div>
    </div>
    <div class="nav">
      <div class="nav-item" @click="setShowIndex(0)" :class="{'on': showIndex === 0}">找人</div>
      <div class="nav-item" @click="setShowIndex(1)" :class="{'on': showIndex === 1}">找群</div>
      <div class="nav-item" @click="setShowIndex(2)" :class="{'on': showIndex === 2}">创建群</div>
    </div>
    <transition-group name="search">
      <search-friend v-show="showIndex === 0" :key="0"></search-friend>
      <search-group v-show="showIndex === 1" :key="1"></search-group>
      <create-group v-show="showIndex === 2" :key="2"></create-group>
    </transition-group>
  </div>
</template>

<script>
import Split from '../../base-component/split/split'
import SearchFriend from './search-friend/search-friend'
import SearchGroup from './search-group/search-group'
import CreateGroup from './create-group/create-group'
export default {
  name: 'search',
  components: {CreateGroup, SearchGroup, SearchFriend, Split},
  data () {
    return {
      showIndex: 0
    }
  },
  methods: {
    setShowIndex (index) {
      this.showIndex = index
    },
    _back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "search";
</style>
