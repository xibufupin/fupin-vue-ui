import { h } from 'vue'

const componentName = 'f-debugger-view'

export default {
    name: componentName,
    render() {
        return h("div", {
            id: componentName,
            style: {
                position: 'absolute',
                top: '10px',
                right: '50px',
                bottom: '10px',
                width: '40%',
                // height: '100%',
                background: 'rgba(0, 0, 0, .08)',
                padding: '15px',
                boxSizing: 'border-box',
                borderRadius: '10px',
                // boxShadow: '2px 2px 3px rgba(0,0,0,.5)',
                color: 'green',
                overflow: 'auto'
            }
        }, h("pre", {}, h("code", {}, this.$slots.default?.())))
    }
}