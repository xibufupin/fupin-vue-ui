import { h } from 'vue'

import useInstance from '../../../compositions/useInstance'

const componentName = 'f-window-content'

export default {
    name: componentName,
    setup() {
        let { instance } = useInstance();
        return {
            instance
        }
    },
    render() {
        return h("div", {
            id: `${componentName}-${this.instance.pid}`,
            class: componentName,
            style: {
                flex: 1,
                userSelect: this.instance.isActive ? 'text' : 'none',
                // overflow: 'auto',
                position: 'relative'
            }
        }, h(this.instance.component, { instance: this.instance }))
    }
}