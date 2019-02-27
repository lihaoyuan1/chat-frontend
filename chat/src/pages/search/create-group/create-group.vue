<template>
  <div class="create-group">
    <split></split>
    <div class="text">
      <input v-model="text" type="text" placeholder="请输入群名称"/>
      <span @click="_create">创建</span>
    </div>
    <split></split>
    <error-tip ref="error"></error-tip>
  </div>
</template>

<script>
import Split from '../../../base-component/split/split'
import ErrorTip from '../../../base-component/error-tip/error-tip'
import {ERR_OK, POST} from '../../../common/js/api'
import {mapGetters} from 'vuex'
export default {
  name: 'create-group',
  data () {
    return {
      text: ''
    }
  },
  methods: {
    _create () {
      if (!this.text) {
        this.$refs.error.show('error', '亲输入群名称')
        return
      }
      let data = {
        id: this.id,
        name: this.text
      }
      POST('/chat/user/create_group', data).then(res => {
        if (res.code === ERR_OK) {
          this.$refs.error.show('success', res.message)
          this.text = ''
        } else {
          this.$refs.error.show('error', res.message)
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'id'
    ])
  },
  components: {ErrorTip, Split}
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "create-group";
</style>
