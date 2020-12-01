import { h, ref } from 'vue'

const componentName = 'f-taskbar-tray-item'

export default {
    name: componentName,
    props: {
        instance: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    setup() {
        let isHover = ref(false);

        let onMouseEnter = (e) => {
            isHover.value = true;
        }

        let onMouseLeave = (e) => {
            isHover.value = false;
        }

        let stopPropagation = (e) => {
            e.stopPropagation()
        }

        return {
            isHover,

            onMouseEnter,
            onMouseLeave,
            stopPropagation
        }
    },
    render() {
        if (!this.instance.isTray) return;

        return h("div", {
            id: `${componentName} - ${this.instance.pid}`,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onMouseDown: this.stopPropagation,
            onMouseUp: this.stopPropagation,
            isHover: this.isHover,
            style: {
                height: 'inherit',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: this.isHover ? 'rgba(255, 255, 255, .10)' : 'unset',
            }
        }, h("img", {
            src: this.instance.icon || this.$resource.windows.icon.imageres._15,
            style: {
                width: '16px',
                height: '16px',
                margin: '0 4px',
            }
        }))
    }
}