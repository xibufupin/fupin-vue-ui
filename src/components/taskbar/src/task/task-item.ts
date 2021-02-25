import { h, ref } from 'vue'

const componentName = 'f-taskbar-task-item'

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
        return h("div", {
            id: `${componentName} - ${this.instance.pid}`,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onMouseDown: this.stopPropagation,
            onMouseUp: this.stopPropagation,
            isHover: this.isHover,
            style: {
                color: '#fff',
                flexBasis: '160px',
                height: 'inherit',
                display: 'flex',
                position: 'relative',
                marginRight: '1px',
                backgroundColor: this.instance.isActive ? 'rgba(255, 255, 255, .16)' : this.isHover ? 'rgba(255, 255, 255, 0.10)' : 'unset'
            },
            onClick: () => {
                if (this.instance.isActive && this.instance.isMinimize) {
                    this.instance.unMinimize();
                } else if (!this.instance.isActive && !this.instance.isMinimize) {
                    this.instance.active();
                } else if (this.instance.isActive && !this.instance.isMinimize) {
                    this.instance.minimize();
                } else if (!this.instance.isActive && this.instance.isMinimize) {
                    this.instance.unMinimize();
                    this.instance.active();
                }
            }
        }, [
            h('div', {
                style: {
                    padding: '0 5px 0 8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }, h("img", {
                src: this.instance.icon || this.$resource.windows.icon.imageres._15,
                style: {
                    width: '16px',
                    height: '16px',
                }
            })),
            h("div", {
                style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }, this.instance.title),
            h("div", {
                style: {
                    position: 'absolute',
                    bottom: 0,
                    height: '2px',
                    left: this.isHover || this.instance.isActive ? 0 : '4px',
                    right: this.isHover || this.instance.isActive ? 0 : '4px',
                    backgroundColor: '#83c0ef',
                }
            })
        ])
    },
}