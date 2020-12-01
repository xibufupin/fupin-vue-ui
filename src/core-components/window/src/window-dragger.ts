import { h, watchEffect, reactive } from 'vue'

import useMouseEvent from '../../../compositions/useMouseEvent'

const componentName = 'f-dragger'

export default {
    name: componentName,
    props: {
        instance: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {
        let { mouseEvent } = useMouseEvent();

        let dragger: any = reactive({})

        let initDragger = (data: any = {}) => {
            let _dragger = {
                direction: data.direction || null,
                offsetX: data.offsetX || 0,
                offsetY: data.offsetY || 0,
                top: data.top || 0,
                bottom: data.bottom || 0,
                left: data.left || 0,
                right: data.right || 0
            }
            for (let i in _dragger) { dragger[i] = _dragger[i] };
        }

        let onWindowResizeStart = (direction, e) => {
            initDragger({
                direction,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                top: props.instance.top,
                bottom: props.instance.bottom,
                left: props.instance.left,
                right: props.instance.right
            });
        }

        let onWindowResizeEnd = (direction, e) => {
            initDragger();
        }

        watchEffect(() => {
            if (
                mouseEvent.type == 'mouseup' ||
                mouseEvent.clientX <= 0 ||
                mouseEvent.clientX >= window.innerWidth - 0 ||
                mouseEvent.clientY <= 0 ||
                mouseEvent.clientY >= window.innerHeight
            ) {
                initDragger();
            }
        })

        watchEffect(() => {
            // 下面的参数里有个4和1，讲道理我也不知道为啥是4和1，感觉应该是5和0啊？
            if (!dragger.direction) return;

            // TOP
            if (dragger.direction.indexOf("top") != -1) {
                let y = mouseEvent.clientY - dragger.offsetY + 4;
                if (
                    window.innerHeight - dragger.bottom - props.instance.minHeight > y &&
                    window.innerHeight - dragger.bottom - props.instance.maxHeight < y
                ) {
                    props.instance.y = y;
                }
                props.instance.height = window.innerHeight - props.instance.y - dragger.bottom;
            }

            // BOTTOM
            if (dragger.direction.indexOf("bottom") != -1) {
                console.log("bottom");
                let offset = 1;
                if (dragger.direction.indexOf("left") != -1) offset += 5;
                if (dragger.direction.indexOf("right") != -1) offset += 5;
                props.instance.height = mouseEvent.clientY - props.instance.y - dragger.offsetY + offset;
            }

            //LEFT
            if (dragger.direction.indexOf("left") != -1) {
                console.log('left');
                let x = mouseEvent.clientX - dragger.offsetX + 4;
                if (
                    window.innerWidth - dragger.right - props.instance.minWidth > x &&
                    window.innerWidth - dragger.right - props.instance.maxWidth < x
                ) {
                    props.instance.x = x;
                }
                props.instance.width = window.innerWidth - props.instance.x - dragger.right;
            }

            //RIGHT
            if (dragger.direction.indexOf("right") != -1) {
                console.log('right');
                let offset = 1;
                if (dragger.direction.indexOf("top") != -1) offset += 5;
                if (dragger.direction.indexOf("bottom") != -1) offset += 5;
                props.instance.width = mouseEvent.clientX - props.instance.x - dragger.offsetX + offset;
            }
        })
        return {
            mouseEvent,
            dragger,

            onWindowResizeStart,
            onWindowResizeEnd
        }
    },
    render() {
        if (!this.instance.allowResize) return;
        return [
            h("div", {
                id: `window-dragger-top-left-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('top-left', e),
                onMouseUp: (e) => this.onWindowResizeEnd('top-left', e),
                // onMouseMove: this.test,
                style: {
                    position: this.dragger.direction == 'top-left' ? 'fixed' : 'absolute',
                    width: '10px',
                    height: '10px',
                    top: this.dragger.direction == 'top-left' ? `${this.mouseEvent.clientY - this.dragger.offsetY}px` : '-5px',
                    left: this.dragger.direction == 'top-left' ? `${this.mouseEvent.clientX - this.dragger.offsetX}px` : '-5px',
                    cursor: 'nw-resize',
                    background: '#00f',
                    opacity: 0
                }
            }),
            h("div", {
                id: `window-dragger-top-right-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('top-right', e),
                onMouseUp: (e) => this.onWindowResizeEnd('top-right', e),
                style: {
                    position: this.dragger.direction == 'top-right' ? 'fixed' : 'absolute',
                    width: '10px',
                    height: '10px',
                    top: this.dragger.direction == 'top-right' ? `${this.mouseEvent.clientY - this.dragger.offsetY}px` : '-5px',
                    right: this.dragger.direction == 'top-right' ? `${window.innerWidth - this.mouseEvent.clientX + this.dragger.offsetX - 10}px` : '-5px',
                    cursor: 'ne-resize',
                    background: '#0f0',
                    opacity: 0
                }
            }),
            h("div", {
                id: `window-dragger-bottom-left-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('bottom-left', e),
                onMouseUp: (e) => this.onWindowResizeEnd('bottom-left', e),
                style: {
                    position: this.dragger.direction == 'bottom-left' ? 'fixed' : 'absolute',
                    width: '10px',
                    height: '10px',
                    left: this.dragger.direction == 'bottom-left' ? `${this.mouseEvent.clientX - this.dragger.offsetX}px` : '-5px',
                    bottom: this.dragger.direction == 'bottom-left' ? `${window.innerHeight - this.mouseEvent.clientY + this.dragger.offsetY - 10}px` : `-5px`,
                    cursor: 'sw-resize',
                    background: '#f00',
                    opacity: 0
                }
            }),
            h("div", {
                id: `window-dragger-bottom-right-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('bottom-right', e),
                onMouseUp: (e) => this.onWindowResizeEnd('bottom-right', e),
                style: {
                    position: this.dragger.direction == 'bottom-right' ? 'fixed' : 'absolute',
                    width: '10px',
                    height: '10px',
                    right: this.dragger.direction == 'bottom-right' ? `${window.innerWidth - this.mouseEvent.clientX + this.dragger.offsetX - 10}px` : `-5px`,
                    bottom: this.dragger.direction == 'bottom-right' ? `${window.innerHeight - this.mouseEvent.clientY + this.dragger.offsetY - 10}px` : `-5px`,
                    cursor: 'se-resize',
                    background: '#ff0',
                    opacity: 0
                }
            }),
            //-----------------------------------------------------------------------------
            h("div", {
                id: `window-dragger-top-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('top', e),
                onMouseUp: (e) => this.onWindowResizeEnd('top', e),
                style: {
                    position: this.dragger.direction == 'top' ? 'fixed' : 'absolute',
                    height: '5px',
                    left: '5px',
                    right: '5px',
                    top: this.dragger.direction == 'top' ? `${this.mouseEvent.clientY - this.dragger.offsetY}px` : `-5px`,
                    cursor: 'n-resize',
                    background: '#ff0',
                    opacity: 0
                }
            }),
            h("div", {
                id: `window-dragger-bottom-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('bottom', e),
                onMouseUp: (e) => this.onWindowResizeEnd('bottom', e),
                style: {
                    position: this.dragger.direction == 'bottom' ? 'fixed' : 'absolute',
                    height: '5px',
                    left: '5px',
                    right: '5px',
                    bottom: this.dragger.direction == 'bottom' ? `${window.innerHeight - this.mouseEvent.clientY + this.dragger.offsetY - 5}px` : `-5px`,
                    cursor: 's-resize',
                    background: '#00f',
                    opacity: 0
                }
            }),
            h("div", {
                id: `window-dragger-left-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('left', e),
                onMouseUp: (e) => this.onWindowResizeEnd('left', e),
                style: {
                    position: this.dragger.direction == 'left' ? 'fixed' : 'absolute',
                    width: '5px',
                    top: '5px',
                    bottom: '5px',
                    left: this.dragger.direction == 'left' ? `${this.mouseEvent.clientX - this.dragger.offsetX}px` : `-5px`,
                    cursor: 'w-resize',
                    background: '#0f0',
                    opacity: 0
                }
            }),
            h("div", {
                id: `window-dragger-right-${this.instance.pid}`,
                onMouseDown: (e) => this.onWindowResizeStart('right', e),
                onMouseUp: (e) => this.onWindowResizeEnd('right', e),
                style: {
                    position: this.dragger.direction == 'right' ? 'fixed' : 'absolute',
                    width: '5px',
                    top: '5px',
                    bottom: '5px',
                    right: this.dragger.direction == 'right' ? `${window.innerWidth - this.mouseEvent.clientX + this.dragger.offsetX - 5}px` : `-5px`,
                    cursor: 'e-resize',
                    background: '#f00',
                    opacity: 0
                }
            }),
            // h("div", {
            //     style: {
            //         position: 'absolute',
            //         width: '300px',
            //         height: '150px',
            //         background: '#fcc',
            //         opacity: 0,
            //         top: 'calc(50% - 75px)',
            //         left: 'calc(50% - 150px)'
            //     }
            // }, [`X: ${this.mouseEvent.clientX}, Y: ${this.mouseEvent.clientY}, offsetX: ${this.mouseEvent.offsetX}, offssetY: ${this.mouseEvent.offsetY}`,
            // ])
        ];
    },
    created() {
        // console.log(this.instance);
    }
}