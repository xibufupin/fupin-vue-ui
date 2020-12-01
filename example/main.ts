import {
    createApp
} from 'vue'

import Core from 'fupin-vue-core/src/index'
import Ui from '../src/index';

import app from './app/app.vue'

createApp(app)
    .use(new Core)
    .use(new Ui)
    .mount('body');