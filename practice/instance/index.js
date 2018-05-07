import Vue from 'vue'

/*ew Vue({
  el: '#root',
  template: '<div>this is contentaaaa</div>'
})*/

const app = new Vue({
  el: '#root',
  template: '<div>thi sis </div>',
  render (h) {
    throw new TypeError('render error')
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  }
})

app.$mount('#root')
