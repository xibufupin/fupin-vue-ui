import { App } from 'vue'

import Screen from './src/screen'

export default (app: App): void => {
  app.component(Screen.name, Screen)
}

export { Screen }
