import { h } from 'vue'

const componentName = 'f-window-menu'

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
                backgroundColor: '#0f0'
            }
        }, `<${componentName}>`)
    }
}