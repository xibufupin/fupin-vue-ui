import { h, ref, provide, watchEffect } from 'vue'

import useMouseEvent from '../../../../compositions/useMouseEvent'

import startContent from './start-content'
import startSidebar from './start-sidebar'

const componentName = 'f-taskbar-start'

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

        provide("onClickIcon", onClickIcon),

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
                title: "开始",
                onMouseEnter: this.onMouseEnter,
                onMouseLeave: this.onMouseLeave,
                onClick: this.onClickIcon,
                isHover: this.isHover,
                isOpen: this.isOpen,
                style: {
                    height: '30px',
                    lineHeight: '30px',
                    minWidth: '36px',
                    backgroundColor: this.isOpen ? "rgba(255, 255, 255, .16)" : this.isHover ? 'rgba(255, 255, 255, .10)' : 'unset',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${!this.isHover ? this.$resource.windows.base.logo : this.$resource.windows.base.logoHover})`,
                },
            }), this.isOpen ? h("div", {
                id: `${componentName}-opened-wrapper`,
                style: {
                    fontSize: '15px',
                    position: 'absolute',
                    background: 'rgba(35, 35, 35, .98)',
                    bottom: '30px',
                    left: 0,
                    width: '975px',
                    height: '640px',
                    zIndex: 0,
                    boxShadow: '0 0 10px rgba(0, 0, 0, .5)',
                }
            }, [
                h(startSidebar),
                h(startContent),
            ]) : ''
        ])
    }
}