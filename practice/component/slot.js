import Vue from 'vue'

const component = {
//   template: `
//     <div :style="style">
//     <div class="header">
//     <slot name="header"></slot>
// </div>
// <div class="body">
// <slot name="body"></slot>
// </div>
// </div>
// `,
    template: `
    <div :style="style">
        <slot value="234" aaa="2e32r4"></slot>
    </div>
    `,
    data() {
        return {
            style: {
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        }
    }
}

new Vue({
    el: '#root',
    components: {
        ComOne: component
    },
    data() {
        return {
            value: 123
        }
    },
    // template: '<com-one :value="value" @input="value=arguments[0]"></com-one>'
    template:
        `<div>
        <com-one>
            <template slot-scope="props">
                <slot>{{props.value}} {{props.aaa}}</slot>
            </template>
        </com-one>
     </div>`
})
