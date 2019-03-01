<template>
  <div class="chat">
    <div class="header" @click="back">
      <div class="header-left">
        <i class="icon-font icon-icon_left"></i>
      </div>
      <div class="header-center">{{headerName}}</div>
      <div class="header-right"></div>
    </div>
    <div class="message-input">
      <input v-model="text" type="text"/>
      <button :class="text ? 'on' :  'off'" @click="_send">发送</button>
    </div>
    <div class="content" ref="content">
      <div class="wrapper">
        <template v-for="(item, index) in messageList">
          <message-item
            :key="index"
            :friend-name="item.name"
            :text="item.content"
          ></message-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {GET} from '../../common/js/api'
import MessageItem from '../../base-component/message-item/message-item'
import BScroll from 'better-scroll'

export default {
  name: 'chat',
  components: {MessageItem},
  data () {
    return {
      text: '',
      type: '',
      messageList: [],
      friendObject: {},
      groupObject: {}
    }
  },
  methods: {
    _send () {
      if (this.text) {
        if (this.type === 'friend') {
          let data = {
            userId: this.id,
            sessionId: this.friendObject.session,
            friendId: this.friendObject.id,
            content: this.text,
            type: 'friend'
          }
          this.$emit('send', JSON.stringify(data))
        } else {
          let data = {
            type: 'group',
            groupId: this.groupObject.id,
            userId: this.id,
            content: this.text
          }
          this.$emit('send', JSON.stringify(data))
        }
        let item = {
          name: this.name,
          content: this.text
        }
        this.messageList.push(item)
        this.text = ''
        if (this.timer1) {
          clearTimeout(this.timer1)
        }
        this.timer1 = setTimeout(() => {
          this.scroll.scrollToElement(this.scroll.scrollTo(0, this.scroll.maxScrollY))
        }, 100)
      }
    },
    saveMessage (message) {
      message = JSON.parse(message)
      if (this.header === message.name) {
        this.messageList.push(message)
        if (this.timer2) {
          clearTimeout(this.timer2)
        }
        this.timer2 = setTimeout(() => {
          this.scroll.scrollToElement(this.scroll.scrollTo(0, this.scroll.maxScrollY))
        }, 100)
      }
    },
    _getPathParam () {
      let object = this.$route.params
      this.type = object.type
      if (this.type === 'friend') {
        this.friendObject = object.data
      } else {
        this.groupObject = object.data
      }
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    this._getPathParam()
    let id = ''
    if (this.type === 'friend') {
      id = this.friendObject.session
    } else {
      id = this.groupObject.id
    }
    GET('/chat/user/friend_message', {id: id, user_id: this.id}).then(res => {
      this.messageList = res.data
      this.timer = setTimeout(() => {
        this.scroll = new BScroll(this.$refs.content, {
          click: true
        })
        this.scroll.scrollToElement(this.scroll.scrollTo(0, this.scroll.maxScrollY))
      }, 500)
    })
  },
  computed: {
    headerName () {
      if (this.type === 'friend') {
        return this.friendObject.name
      } else {
        return this.groupObject.name
      }
    },
    ...mapGetters([
      'id',
      'name'
    ])
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "chat";
</style>
