import Vue from 'vue'

new Vue({
    el: '#root',
    data() {
        return {
            value: 123,
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #000'
            }
        }
    },
    render(h) {
        return h('div', {
            style: this.style
        }, this.$slots.default)
    }
})
