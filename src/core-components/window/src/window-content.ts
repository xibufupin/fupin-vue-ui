import { h } from 'vue'

const componentName = 'f-window-content'

export default {
    name: componentName,
    props: {
        instance: {
            type: Object,
            required: true
        }
    },
    setup() {

    },
    render() {
        return h("div", {
            id: `${componentName}-${this.instance.pid}`,
            style: {
                flex: 1,
                userSelect: this.instance.isActive ? 'text' : 'none',
                overflow: 'auto',
                position: 'relative'
            }
        }, h(this.instance.component, { instance: this.instance }))
    }
}