<template>
  <div class="login">
    <div class="content">
      <h1 class="title">登录</h1>
      <div class="input">
        <input-box label="用户名" type="text" @inputChange="_setUserName" ref="name"></input-box>
      </div>
      <div class="input">
        <input-box label="密码" type="password" @inputChange="_setPassword" ref="password"></input-box>
      </div>
      <button class="btn" @click="_login">登录</button>
      <div class="skip">
        <router-link :to="{name: 'register'}" tag="span">新用户注册</router-link>
      </div>
    </div>
    <error-tip ref="error"></error-tip>
    <loading ref="load" message="正在努力登陆中"></loading>
    <transition name="fade">
      <router-view @success="handleSuccess"></router-view>
    </transition>
  </div>
</template>

<script>
import Loading from '../../../base-component/loading/loading'
import ErrorTip from '../../../base-component/error-tip/error-tip'
import InputBox from '../../../base-component/input-box/input-box'
import {MD5} from '../../../common/js/md5'
import {ERR_OK, POST} from '../../../common/js/api'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'login',
  components: {InputBox, ErrorTip, Loading},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name'
    ])
  },
  methods: {
    _login () {
      if (this._checkInput()) {
        this.$refs.load.show()
        let data = {
          userName: this.username,
          userPassword: MD5(this.password)
        }
        POST('/chat/user/login', data).then(res => {
          this.$refs.load.hidden()
          if (res.code === ERR_OK) {
            this.$refs.error.show('success', res.message)
            this.saveUserInfo(res.data)
            this.timer = setTimeout(() => {
              this.$router.push({name: 'main'})
            }, 1000)
          } else {
            this.$refs.error.show('error', res.message)
          }
        })
      }
    },
    _checkInput () {
      if (!this.username) {
        this.$refs.error.show('error', '请输入用户名')
        return false
      } else if (!this.password) {
        this.$refs.error.show('error', '请输入密码')
        return false
      } else {
        return true
      }
    },
    handleSuccess (object) {
      this.$refs.name.setText(object.userName)
      this.$refs.password.setText(object.userPassword)
    },
    _setUserName (username) {
      this.username = username
    },
    _setPassword (password) {
      this.password = password
    },
    ...mapActions([
      'saveUserInfo'
    ])
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "login";
</style>
