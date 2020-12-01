import { h } from 'vue'

import trayItem from './tray-item'

const componentName = 'f-taskbar-tray'

export default {
    name: componentName,
    setup() {
    },
    render() {
        return h("div", {
            id: componentName,
            style: {
                height: '30px',
                lineHeight: '30px',
                display: 'flex',
            }
        }, this.$process.getPids().map((value, key) => {
            return h(trayItem, { instance: this.$process.get(value), key: value })
        }))
    }
}