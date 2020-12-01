import { h, ref, watchEffect } from 'vue'

import useMouseEvent from '../../../../compositions/useMouseEvent'

const componentName = 'f-taskbar-notify'

export default {
    name: componentName,
    setup() {
        let { mouseEvent } = useMouseEvent();

        let isHover = ref(false);
        let isOpen = ref(false);

        let onMouseEnter = (e) => {
            isHover.value = true;
        }

        let onMouseLeave = (e) => {
            isHover.value = false;
        }
        let onClickIcon = (e) => {
            isOpen.value = !isOpen.value
        }

        let stopPropagation = (e) => {
            e.stopPropagation()
        }

        watchEffect(() => {
            if (mouseEvent.type == 'mousedown') {
                isOpen.value = false;
            }
        })

        return {
            isHover,
            isOpen,

            onMouseEnter,
            onMouseLeave,
            onClickIcon,
            stopPropagation
        }
    },
    render() {
        return h("div", {
            id: componentName,
            onMouseDown: this.stopPropagation,
            onMouseUp: this.stopPropagation,
            style: {
                'position': 'relative'
            }
        }, [
            h("div", {
                id: `${componentName}-icon`,
                title: "没有新通知",
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave,
                onClick: this.onClickIcon,
                isHover: this.isHover,
                isOpen: this.isOpen,
                style: {
                    width: '40px',
                    height: '30px',
                    lineHeight: '30px',
                    backgroundColor: this.isOpen ? "rgba(255, 255, 255, .16)" : this.isHover ? 'rgba(255, 255, 255, .10)' : 'unset',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${this.$resource.windows.base.notify})`,
                },
            }), this.isOpen ? h("div", {
                id: `${componentName}-opened-wrapper`,
                style: {
                    position: 'fixed',
                    background: 'rgba(0, 0, 0, .9)',
                    bottom: '30px',
                    right: 0,
                    width: '400px',
                    height: 'calc(100vh - 30px)',
                    display: 'flex',
                    flexDirection: 'row'
                }
            }, [

            ]) : ''
        ])
    }
}