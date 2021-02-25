import { h } from 'vue'

import shortcutGroup from '../../shortcut/src/shortcut-group'

const componentName = 'f-desktop'

export default ({
    name: componentName,

    render() {
        let modules = this.$module.gets();
        let list = [];

        Object.keys(modules).map((value, key) => {
            if (modules[value].option.shortcut) {
                list.push({
                    command: value,
                    title: modules[value].option.title,
                    icon: modules[value].option.icon
                })
            }
        });

        // return h(shortcutGroup, { list: list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list)))))))))))))))))))))))))))))))))))) })

        return h(shortcutGroup, { list })
    }

})