import Vue from 'vue'
// var global = '111' // eslint-disable-line
new Vue({
  el: '#root',
  template: `
    <div>{{isActive}}</div>
  `,
  data: {
    isActive: false
  }
})
