<template>
  <div class="search-group">
    <split></split>
    <div class="search-box">
      <i class="icon-font icon-icon_search"></i>
      <input placeholder="请输如群名称" type="text" v-model="text"/>
    </div>
    <split></split>
    <template v-for="(item, index) in list">
      <list-item
        :key="index"
        type="group"
        :item="item"
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
  name: 'search-group',
  components: {ErrorTip, ListItem, Split},
  data () {
    return {
      text: '',
      list: []
    }
  },
  methods: {
    handleSelect (groupId) {
      let data = {
        userId: this.id,
        groupId: groupId
      }
      POST('/chat/user/add_group', data).then(res => {
        if (res.code === ERR_OK) {
          this.$refs.error.show('success', res.message)
        } else {
          this.$refs.error.show('error', res.message)
        }
      })
    },
    _search () {
      GET('/chat/user/search_group', {text: this.text}).then(res => {
        if (res.code === ERR_OK) {
          this.list = res.data
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
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
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "search-group";
</style>
