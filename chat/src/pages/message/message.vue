<template>
  <div class="message" ref="message">
    <div class="wrapper">
      <refresh ref="refresh"></refresh>
      <template v-for="item in friend">
        <message-list-item
          :key="item.id"
          :object="item"
          @select="handleSelect"
        ></message-list-item>
      </template>
      <template v-for="item in group">
        <message-list-item
          :key="item.id"
          :object="item"
          @select="handleSelect"
        ></message-list-item>
      </template>
    </div>
  </div>
</template>

<script>
import {ERR_OK, GET} from '../../common/js/api'
import {mapGetters} from 'vuex'
import BScroll from 'better-scroll'
import MessageListItem from './message-list-item/message-list-item'
import Refresh from '../../base-component/refresh/refresh'

export default {
  name: 'message',
  components: {Refresh, MessageListItem},
  data () {
    return {
      friend: [],
      group: []
    }
  },
  methods: {
    handleSelect (object) {
      this.$router.push({name: 'chat', params: object})
    },
    _refresh () {
      this.$refs.refresh.show('正在加载中')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        GET('/chat/user/message_list', {id: this.id}).then(res => {
          if (res.code === ERR_OK) {
            this.friend = res.data.friend
            this.group = res.data.group
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
    GET('/chat/user/message_list', {id: this.id}).then(res => {
      if (res.code === ERR_OK) {
        this.friend = res.data.friend
        this.group = res.data.group
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.scroll = new BScroll(this.$refs.message, {
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
    this.$emit('closeTip')
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "message";
</style>
