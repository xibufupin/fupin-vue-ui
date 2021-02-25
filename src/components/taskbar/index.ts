import { App } from 'vue'
import Taskbar from './src/taskbar'

export default (app: App): void => {
  app.component(Taskbar.name, Taskbar)
}

export { Taskbar }
