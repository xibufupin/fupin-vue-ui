import { h } from 'vue'

import taskItem from './task-item'

const componentName = 'f-taskbar-task'

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
                flex: 1,
            }
        }, this.$process.getPids().map((value, key) => {
            return h(taskItem, { instance: this.$process.get(value), key: value })
        }))
    }
}