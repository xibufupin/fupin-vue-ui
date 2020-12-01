import { h } from 'vue'

const componentName = 'f-window-footer'

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
                height: '24px',
                lineHeight: '24px',
                padding: '0 9px',
            }
        }, this.instance.status)
    }
}