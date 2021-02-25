import { App } from 'vue'

import Resource from './resource'

import screen from './components/screen/src/screen'
import debuggerView from './components/debugger-view/src/debugger-view'

export default class Fui {

    public static fuiInstance: Fui

    public appInstance: App

    constructor() {
        if (Fui.fuiInstance) {
            return Fui.fuiInstance;
        } else {
            Fui.fuiInstance = this;
        }
    }

    public install(app) {
        this.appInstance = app;

        app.config.globalProperties.$resource = Resource;
        app.component(screen.name, screen);
        app.component(debuggerView.name, debuggerView);
    }
}