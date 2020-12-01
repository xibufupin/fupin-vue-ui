import { h } from 'vue'

import shortcutGroup from '../../shortcut/src/shortcut-group'

const componentName = 'f-desktop'

export default ({
    name: componentName,

    render() {
        let commands = this.$module.getCommands();
        let list = [];

        Object.keys(commands).map((value, key) => {
            if (commands[value].option.shortcut) {
                list.push({
                    command: value,
                    title: commands[value].option.title,
                    icon: commands[value].option.icon
                })
            }
        });

        // return h(shortcutGroup, { list: list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list.concat(list)))))))))))))))))))))))))))))))))))) })

        return h(shortcutGroup, { list })
    }

})