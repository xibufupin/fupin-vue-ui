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
        // TODO 需要完成menu逻辑
        return ""
        return h("div", {
            id: `${componentName}-${this.instance.pid}`,
            style: {
                backgroundColor: '#0f0'
            }
        }, `<${componentName}>`)
    }
}