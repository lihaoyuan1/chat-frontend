<template>
  <div class="register">
    <div class="content">
      <h1 class="title">注册</h1>
      <div class="input">
        <input-box label="用户名" type="text" @inputChange="_setUserName"></input-box>
      </div>
      <div class="input">
        <input-box label="密码" type="password" @inputChange="_setPassword"></input-box>
      </div>
      <div class="input">
        <input-box label="确认" type="password" @inputChange="_setConfirm"></input-box>
      </div>
      <button class="btn" @click="_register">注册</button>
      <div class="skip">
        <router-link :to="{name: 'login'}" tag="span">登录</router-link>
      </div>
    </div>
    <error-tip ref="error"></error-tip>
    <loading ref="load" message="注册信息上传中"></loading>
  </div>
</template>

<script>
import Loading from '../../../base-component/loading/loading'
import ErrorTip from '../../../base-component/error-tip/error-tip'
import InputBox from '../../../base-component/input-box/input-box'
import {MD5} from '../../../common/js/md5'
import {ERR_OK, POST} from '../../../common/js/api'
import {mapActions} from 'vuex'
export default {
  name: 'register',
  components: {InputBox, ErrorTip, Loading},
  data () {
    return {
      username: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    _register () {
      if (this._checkInput()) {
        this.$refs.load.show()
        let data = {
          userName: this.username,
          userPassword: MD5(this.password)
        }
        POST('/chat/user/register', data).then(res => {
          this.$refs.load.hidden()
          if (res.code === ERR_OK) {
            this.$refs.error.show('success', res.message)
            this.saveUserInfo(res.data)
            this.$emit('success', {userName: this.username, userPassword: this.password})
            this.timer = setTimeout(() => {
              this.$router.push({name: 'login'})
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
      } else if (!this.password && !this.confirm) {
        this.$refs.error.show('error', '请输入密码')
        return false
      } else if (this.password !== this.confirm) {
        this.$refs.error.show('error', '两次输入不一致')
        return false
      }
      return true
    },
    _setUserName (username) {
      this.username = username
    },
    _setPassword (password) {
      this.password = password
    },
    _setConfirm (confirm) {
      this.confirm = confirm
    },
    ...mapActions([
      'saveUserInfo'
    ])
  },
  destroyed () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "register";
</style>
