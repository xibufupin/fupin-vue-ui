import { h, ref } from 'vue'

const componentName = 'f-taskbar-start-sidebar-item'

export default {
    name: componentName,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        menu: {
            type: Object,
            default() {
                return []
            }
        },
        click: {
            type: Function,
            default: () => {}
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
            id: componentName,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onClick: this.click,
            style: {
                width: '256px',
                height: '50px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                background: this.isHover ? 'rgba(96, 96, 96, 1)' : 'unset',
            }
        }, [
            h("div", {
                style: {
                    width: '48px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            },
                h("img", {
                    src: this.icon || this.$resource.avatar.sun,
                    style: {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                    }
                }),
            ),

            h("span", {
                style: {
                    paddingLeft: '2px'
                }
            }, this.title)
        ])
    }
}