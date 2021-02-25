import { h, ref } from 'vue'

import startSidebarItem from './start-sidebar-item'

const componentName = 'f-taskbar-start-sidebar'

export default {
    name: componentName,
    setup() {
        let isHover = ref(false);

        let timeout = ref(undefined);

        let onMouseEnter = (e) => {
            if (timeout.value) {
                clearTimeout(timeout.value);
                isHover.value = false;
            }
            timeout.value = setTimeout(() => {
                isHover.value = true;
                clearTimeout(timeout.value);
            }, 500);
        }

        let onMouseLeave = (e) => {
            clearTimeout(timeout.value);

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
        return h("div", {
            id: componentName,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            isHover: this.isHover,
            style: {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 1,
                boxShadow: this.isHover ? '0 0 10px rgba(0, 0, 0, .5)' : 'unset',
                width: this.isHover ? '256px' : '48px',
                transition: 'width .1s'

            }
        }, h("div", {
            style: {
                width: '100%',
                height: "100%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "flex-end",
                alignItems: 'flex-start',
                overflow: 'hidden',
                background: this.isHover ? 'rgba(48, 48, 48, .95)' : 'unset',
                transition: 'background .1s'
            }
        }, [
            h(startSidebarItem, { icon: this.$variable.get("profile.avatar"), title: this.$variable.get("profile.username") }),
            h(startSidebarItem, { icon: this.$resource.windows.base.power, title: '退出登录', click: () => this.$core.clear() }),
        ])
        )
    }
}