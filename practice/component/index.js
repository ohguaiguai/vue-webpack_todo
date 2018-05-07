
import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value', 'value1'],
  template: '<div><input type="text1" :value="value" @input="handleInput"></div>',
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}
// 全局注册组件
Vue.component('ComOne', component)

new Vue({
  el: '#root',
  data () {
    return {
      value: 123
    }
  },
  // template: '<com-one :value="value" @input="value=arguments[0]"></com-one>'
  template: '<com-one v-model="value"></com-one>'
})
