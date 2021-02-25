import { h, provide, ref, watchEffect } from 'vue'

import useMouseEvent from '../../../compositions/useMouseEvent'

const componentName = 'f-shortcut'

export default {
    name: componentName,

    props: {
        index: {
            type: Number,
            default: null
        },

        focusIndex: {
            type: Number,
            default: null
        },

        command: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
    },
    setup(props, context) {
        let { mouseEvent } = useMouseEvent();

        let isHover = ref(false);
        let isFocus = ref(false);
        let isShadow = ref(false);

        let onMouseEnter = (e) => {
            isHover.value = true;
        }

        let onMouseLeave = (e) => {
            isHover.value = false;
        }
        let onClickIcon = (e) => {
            isFocus.value = true;
            isShadow.value = false;
            context.emit('focus', props.index);
        }

        let stopPropagation = (e) => {
            e.stopPropagation()
        }

        let clearFocus = () => {
            isFocus.value = false;
            isShadow.value = false;
        }

        watchEffect(() => {
            if (mouseEvent.type == 'mousedown') {
                if (isFocus.value == true) {
                    isFocus.value = false;
                    isShadow.value = true;
                }
            }
        })

        watchEffect(() => {
            if (props.focusIndex != props.index) {
                clearFocus();
            }
        })

        return {
            isHover,
            isFocus,
            isShadow,

            onMouseEnter,
            onMouseLeave,
            onClickIcon,
            stopPropagation
        }
    },
    render() {
        return h("div", {
            focusIndex: this.focusIndex,
            id: `${componentName}-${this.command}`,
            title: this.title,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onMouseDown: this.stopPropagation,
            onMouseUp: this.stopPropagation,
            onClick: this.onClickIcon,
            onDblclick: () => this.$process.create(this.command),
            isHover: this.isHover,
            isFocus: this.isFocus,
            isShadow: this.isShadow,
            style: {
                width: '72px',
                height: '68px',
                marginBottom: '30px',
                marginRight: '8px',
                display: 'inline-block',
                userSelect: 'none',
                zIndex: this.isFocus ? 1 : 0,
            }
        }, h('div', {
            id: `${componentName}-outer-${this.command}`,
            style: {
                background: this.isHover ? 'rgba(161, 216, 255, 0.15)' : this.isFocus ? 'rgba(112, 193, 255, 0.35)' : 'unset',
            }
        }, h('div', {
            id: `${componentName}-inner-${this.command}`,
            style: {
                margin: '1px',
                border: this.isFocus || this.isShadow ? '1px dotted rgb(162, 141, 125)' : this.isHover ? '1px solid rgba(222, 240, 255, 0.39)' : '1px solid rgba(0, 0, 0, 0)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
        }, [
            h("img", {
                src: this.icon || this.$resource.windows.icon.imageres._15,
                style: {
                    height: '48px',
                    width: '48px',
                    lineHeight: '48px',
                    margin: '1px auto 1px',
                    overflow: 'hidden',
                }
            }),
            h("div", {
                style: {
                    textAlign: 'center',
                    width: '60px',
                    paddingBottom: '4px',
                    fontSize: '12px',
                    color: '#fff',
                    lineHeight: '18px',
                    textShadow: '0px 0px 2px #000, 1px 1px 3px #000, 1px 2px 3px #000',
                    maxHeight: this.isFocus ? 'unset' : '38px',
                    overflow: this.isFocus ? 'unset' : 'hidden'
                }
            }, this.title)
        ])))
    },
    created() {
    }
}
