import { h } from 'vue'

import start from './start/start'
import cortana from './cortana/cortana'
import taskView from './task-view/task-view'
import task from "./task/task";
import tray from "./tray/tray";
import datetime from "./datetime/datetime";
import notify from "./notify/notify";
import displayDesktop from "./display-desktop/display-desktop";

const componentName = 'f-taskbar'

export default ({
    name: componentName,
    setup() {
    },
    render() {
        return h("div", {
            id: componentName,
            style: {
                fontSize: '12px',
                color: '#fff',
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                height: '30px',
                background: 'rgba(16, 16, 16, .75)',
                display: 'flex',
                zIndex: 20000
            },
        }, [
            h(start),
            h(cortana),
            h(taskView),
            h(task),
            h(tray),
            h(datetime),
            h(notify),
            h(displayDesktop),
        ]
        )
    },
    created() {
    }
})