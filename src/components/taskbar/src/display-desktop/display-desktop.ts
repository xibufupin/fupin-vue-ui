import { h, ref } from 'vue'

const componentName = 'f-taskbar-display-desktop'

export default {
    name: componentName,
    setup() {
        let isHover = ref(false);

        let onMouseEnter = (e) => {
            isHover.value = true;
        }

        let onMouseLeave = (e) => {
            isHover.value = false;
        }
        let onClickIcon = (e) => {
            // TODO
        }

        let stopPropagation = (e) => {
            e.stopPropagation()
        }

        return {
            isHover,

            onMouseEnter,
            onMouseLeave,
            onClickIcon,
            stopPropagation
        }
    },
    render() {
        return h("div", {
            id: componentName,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onMouseDown: this.stopPropagation,
            onMouseUp: this.stopPropagation,
            onClick: this.onClickIcon,
            isHover: this.isHover,
            style: {
                height: '30px',
                lineHeight: '30px',
                width: '5px',
                marginLeft: '8px',
                borderLeft: '1px solid #6a6d71',
                backgroundColor: this.isHover ? 'rgba(255, 255, 255, .10)' : 'unset',
            }
        })
    }
}