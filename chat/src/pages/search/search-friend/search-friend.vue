<template>
  <div class="search-friend">
    <split></split>
    <div class="search-box">
      <i class="icon-font icon-icon_search"></i>
      <input placeholder="请输入好友用户名" type="text" v-model="text"/>
    </div>
    <split></split>
    <template v-for="(item, index) in list">
      <list-item
        :item="item"
        :key="index"
        type="friend"
        v-show="item.id !== id"
        @select="handleSelect"
      ></list-item>
    </template>
    <error-tip ref="error"></error-tip>
  </div>
</template>

<script>
import Split from '../../../base-component/split/split'
import {ERR_OK, GET, POST} from '../../../common/js/api'
import ListItem from '../../../base-component/list-item/list-item'
import {mapGetters} from 'vuex'
import ErrorTip from '../../../base-component/error-tip/error-tip'
export default {
  name: 'search-friend',
  data () {
    return {
      text: '',
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  methods: {
    handleSelect (object) {
      let data = {
        meId: this.id,
        friendId: object.id
      }
      POST('/chat/user/add_friend', data).then(res => {
        if (res.code === ERR_OK) {
          this.$refs.error.show('success', res.message)
        } else {
          this.$refs.error.show('error', res.message)
        }
      })
    },
    _search () {
      GET('/chat/user/search_friend', {text: this.text}).then(res => {
        if (res.code === ERR_OK) {
          this.list = res.data
          this._sort(this.list)
        }
      })
    },
    _sort (list) {
      list.sort((item1, item2) => {
        return item2.status - item1.status
      })
    }
  },
  watch: {
    text (newVal) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (newVal) {
          this._search()
        } else {
          this.list = []
        }
      }, 500)
    }
  },
  components: {ErrorTip, ListItem, Split}
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "search-friend";
</style>
