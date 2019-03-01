<template>
  <div class="group" ref="group">
    <div class="wrapper">
      <refresh ref="refresh"></refresh>
      <template v-for="(item, index) in list">
        <list-item
          :key="index"
          :item="item"
          type="group"
          @select="handleSelect"
        >
        </list-item>
      </template>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Refresh from '../../base-component/refresh/refresh'
import {ERR_OK, GET} from '../../common/js/api'
import BScroll from 'better-scroll'
import ListItem from '../../base-component/list-item/list-item'

export default {
  name: 'group',
  components: {ListItem, Refresh},
  data () {
    return {
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
      let data = Object.assign({type: 'group'}, {data: object})
      this.$router.push({name: 'chat', params: data})
    },
    _refresh () {
      this.$refs.refresh.show('正在加载中')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        GET('/chat/user/group_list', {id: this.id}).then(res => {
          if (res.code === ERR_OK) {
            this.list = res.data
            this.$refs.refresh.show('加载完成')
            if (this.timer1) {
              clearTimeout(this.timer1)
            }
            this.timer1 = setTimeout(() => {
              this.$refs.refresh.hidden()
              this.scroll.finishPullDown()
            }, 300)
          }
        })
      }, 300)
    }
  },
  created () {
    GET('/chat/user/group_list', {id: this.id}).then(res => {
      if (res.code === ERR_OK) {
        this.list = res.data
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.scroll = new BScroll(this.$refs.group, {
            click: true,
            pullDownRefresh: {
              threshold: 50,
              stop: 0
            }
          })
          this.scroll.on('pullingDown', () => {
            this._refresh()
          })
        }, 500)
      }
    })
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "group";
</style>
