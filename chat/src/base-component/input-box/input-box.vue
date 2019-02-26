<template>
  <div class="input-box border-1px-div" ref="input">
    <div class="content">
      <label>{{label}}</label>
      <input
        @focus="_focus"
        @blur="_blur"
        v-model="text"
        type="text"
        v-if="type === 'text'"
      />
      <input
        @focus="_focus"
        @blur="_blur"
        v-model="text"
        type="password"
        v-else
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-box',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String
    }
  },
  data () {
    return {
      text: ''
    }
  },
  watch: {
    text (newVal) {
      this.$emit('inputChange', newVal)
    }
  },
  methods: {
    setText (text) {
      this.text = text
    },
    _focus () {
      let e = this.$refs.input
      e.classList.add('focus')
    },
    _blur () {
      let e = this.$refs.input
      e.classList.remove('focus')
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "input-box";
</style>
