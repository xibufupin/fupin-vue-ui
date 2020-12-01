import {
    createApp
} from 'vue'

import Ui from '../src/index';

import app from './app/app.vue'

createApp(app)
    .use(new Ui)
    .mount('body');