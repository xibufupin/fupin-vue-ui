import { reactive, h, watchEffect } from 'vue'

import useMouseEvent from '../../../compositions/useMouseEvent'
import useInstance from '/@/fupin-vue-ui/compositions/useInstance';

const componentName = 'f-window-header'

export default {
    name: componentName,
    setup(props) {
        let { mouseEvent } = useMouseEvent();
        let { instance } = useInstance();

        let isHover = reactive({
            minimize: false,
            maximize: false,
            close: false
        });

        let windowMove = reactive({
            moving: false,
            startX: null,
            startY: null
        })

        let onMouseEnterActionIcon = (key, e) => {
            isHover[key] = true;
        }
        let onMouseLeaveActionIcon = (key, e) => {
            isHover[key] = false;
        }

        let initWindowMove = (data: any = {}) => {
            let _windowMove = {
                moving: data.moving || false,
                startX: data.startX || 0,
                startY: data.startY || 0
            }
            for (let i in _windowMove) { windowMove[i] = _windowMove[i] };
        }

        let onWindowMoveStart = (e) => {
            if (!instance.allowMove) return;
            instance.active();
            instance.isLockPinterEvents = true;
            initWindowMove({
                moving: true,
                startX: e.clientX,
                startY: e.clientY
            })
            e.stopPropagation()

        }

        let onWindowMoveEnd = (e) => {
            instance.isLockPinterEvents = false;
            initWindowMove();
        }

        watchEffect(() => {
            if (
                mouseEvent.type == 'mouseup' ||
                mouseEvent.clientX <= 0 ||
                mouseEvent.clientX >= window.innerWidth - 0 ||
                mouseEvent.clientY <= 0 ||
                mouseEvent.clientY >= window.innerHeight
            ) {
                instance.isLockPinterEvents = false;
                initWindowMove();
            }
        })

        watchEffect(() => {
            if (windowMove.moving == true && Math.abs(windowMove.startX - mouseEvent.clientX) > 0 && instance.isMaximize) {
                let minX = 0;
                let maxX = window.innerWidth - instance.width;

                if (mouseEvent.clientX < instance.width - 135) {
                    instance.x = minX;
                } else if (mouseEvent.clientX > maxX) {
                    instance.x = maxX
                } else {
                    instance.x = mouseEvent.clientX - instance.width / 2
                }

                instance.y = mouseEvent.clientY - mouseEvent.offsetY;
                instance.unMaximize();
            }
        })

        let destory = (e) => {
            e.stopPropagation();
            instance.destory();
        }

        watchEffect(() => {
            if (!windowMove.moving || instance.isMaximize) {
                return;
            }
            instance.x = instance.x + mouseEvent.clientX - windowMove.startX;
            instance.y = instance.y + mouseEvent.clientY - windowMove.startY;
            windowMove.startX = mouseEvent.clientX;
            windowMove.startY = mouseEvent.clientY;
        })

        return {
            instance,
            isHover,
            onMouseEnterActionIcon,
            onMouseLeaveActionIcon,
            onWindowMoveStart,
            onWindowMoveEnd,
            destory
        }
    },
    render() {
        return h("div", {
            id: `${componentName}-${this.instance.pid}`,
            onDblclick: () => this.instance.isMaximize ? this.instance.unMaximize() : this.instance.maximize(),
            style: {
                height: '30px',
                lineHeight: '30px',
                display: 'flex'
            }
        }, [
            h("div", {
                style: {
                    padding: '0 0 0 8px',
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center"
                }
            }, h("img", {
                src: this.instance.icon || this.$resource.windows.icon.imageres._15,
                style: {
                    width: '16px',
                    height: '16px'
                },
                onDblclick: () => this.instance.destory()
            })),
            h("div", {
                onMouseDown: this.onWindowMoveStart,
                onMouseUp: this.onWindowMoveEnd,
                style: {
                    padding: '0 0 0 6px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    flex: 1
                }
            }, this.instance.title),
            h("div", {
                class: ['window-header-actionIcon'],
                style: {
                    height: 'inherit',
                    lineHeight: 'inherit',
                    alignSelf: 'flex-end',
                    display: 'flex',
                }
            }, [
                h("div", {
                    class: ['minimize'],
                    onMouseEnter: (e) => { this.onMouseEnterActionIcon('minimize', e) },
                    onMouseLeave: (e) => { this.onMouseLeaveActionIcon('minimize', e) },
                    onClick: () => this.instance.minimize(),
                    style: {
                        width: '45px',
                        height: 'inherit',
                        lineHeight: 'inherit',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '16px',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${this.$resource.windows.base.minimize})`,
                        backgroundColor: this.isHover.minimize ? '#e5e5e5' : 'unset',
                        display: this.instance.allowMinimize ? 'unset' : 'none'
                    }
                }),
                h("div", {
                    class: ['maximize'],
                    onMouseEnter: (e) => { this.onMouseEnterActionIcon('maximize', e) },
                    onMouseLeave: (e) => { this.onMouseLeaveActionIcon('maximize', e) },
                    onClick: () => this.instance.isMaximize ? this.instance.unMaximize() : this.instance.maximize(),
                    style: {
                        width: '45px',
                        height: 'inherit',
                        lineHeight: 'inherit',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '16px',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${this.$resource.windows.base.maximize})`,
                        backgroundColor: this.isHover.maximize ? '#e5e5e5' : 'unset',
                        display: this.instance.allowMaximize ? 'unset' : 'none'
                    }
                }),
                h("div", {
                    class: ['close'],
                    onMouseEnter: (e) => { this.onMouseEnterActionIcon('close', e) },
                    onMouseLeave: (e) => { this.onMouseLeaveActionIcon('close', e) },
                    onClick: this.destory,
                    style: {
                        width: '45px',
                        height: 'inherit',
                        lineHeight: 'inherit',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '16px',
                        backgroundPosition: 'center',
                        backgroundImage: this.isHover.close ? `url(${this.$resource.windows.base.closeHover})` : `url(${this.$resource.windows.base.close})`,
                        backgroundColor: this.isHover.close ? '#e81123' : 'unset',
                        display: this.instance.allowClose ? 'unset' : 'none'
                    }
                }),
            ])
        ])
    }
}