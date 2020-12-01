import { h, ref, inject } from 'vue'

import shortcut from './shortcut'

const componentName = 'f-shortcut-group'

export default {
    name: componentName,

    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    setup(props, context) {


        let focusIndex = ref(-1);
        let handleShortcutFocus = (e) => {
            focusIndex.value = e;
        }
        return {
            focusIndex,
            handleShortcutFocus
        }

    },
    render() {
        return h("div", {
            id: componentName,
            style: {
                position: 'fixed',
                top: '5px',
                bottom: '35px',
                left: '1px',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
            },
        },
            this.list.map((value, key) => {
                return h(shortcut, {
                    key: key,
                    index: key,
                    focusIndex: this.focusIndex,
                    command: value.command,
                    title: value.title,
                    icon: value.icon,
                    onFocus: this.handleShortcutFocus
                })
            })
        )
    },
    created() {
    }
}
