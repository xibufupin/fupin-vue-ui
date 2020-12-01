import { App } from 'vue'

import Desktop from './src/desktop'

export default (app: App): void => {
  app.component(Desktop.name, Desktop)
}

export { Desktop }
