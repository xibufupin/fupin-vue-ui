import { h } from 'vue'

const componentName = 'f-taskbar-start-content'

export default {
    name: componentName,
    setup() {

    },
    render() {
        return h("div", {
            id: componentName,
            style: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '48px',
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: "#fff"
            }
        }, h("div", {}, "暂无内容")
        )
    }
}