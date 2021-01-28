import { h, provide } from 'vue'

import windowHeader from './window-header'
import windowMenu from './window-menu'
import windowContent from './window-content'
import windowFooter from './window-footer'
import windowDragger from './window-dragger'

const componentName = 'f-window'

export default {
    name: componentName,
    props: {
        instance: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        provide("instance", props.instance);

        return {
            handleFixed: () => {
                // console.log('im fixed');
                return true;
            }
        }
    },
    render() {
        let inner = [
            h(windowHeader),
            h(windowMenu),
            h(windowContent),
            h(windowFooter),
            h(windowDragger),
        ];

        // if (!this.instance.isWindow) {
        //     inner = [
        //         h(windowContent),
        //     ]
        // }

        return this.instance.showWindow ? h("div", {
            id: `${componentName}-${this.instance.pid}`,
            class: [componentName, this.instance.isActive ? 'active' : 'inActive'],
            onClick: this.instance.active,
            style: {
                position: 'fixed',
                fontSize: '12px',
                display: this.instance.isMinimize ? 'none' : 'flex',
                flexDirection: 'column',
                background: '#fff',
                border: this.instance.isMaximize ? 'unset' : this.instance.isActive ? '1px solid rgba(255, 255, 255, 0)' : '1px solid rgb(166, 160, 153)',
                boxShadow: this.instance.isMaximize ? 'unset' : this.instance.isActive ? '0 0 20px rgba(0, 0, 0, .5)' : '0 0 20px rgba(0, 0, 0, .3)',

                top: `${this.instance.top}px`,
                left: `${this.instance.left}px`,

                // right: `${this.instance.right}px`,
                // bottom: `${this.instance.bottom}px`,
                //** 这里考虑使用width和height组合而不使用right/bottom结合top/left定位主要是考虑到浏览器缩放时使用四坐标定位会使窗口失去原来的大小 */
                width: `${this.instance.actualWidth}px`,
                height: `${this.instance.actualHeight}px`,

                zIndex: this.instance.layer,
                pointerEvents: this.instance.isLockPointerEvents ? 'none' : 'unset',
            }
        }, [
            this.instance.showHeader ? h(windowHeader) : "",
            h(windowMenu),
            h(windowContent),
            this.instance.showFooter ? h(windowFooter) : "",
            h(windowDragger),
        ]) : h(this.instance.component);
    },
    created() {
        // console.log(this.instance);
    }
}