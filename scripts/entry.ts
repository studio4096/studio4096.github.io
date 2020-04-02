import '../styles/imports.css'
import 'ress'
import '../styles/main.css'
import axios from 'axios'

import Vue from 'vue'
import './events.ts'
import { Cloudinary } from 'cloudinary-core'
import store from './store.ts'
import router from './router.ts'
import config from '~/config'
import App from './App.vue'

var userAgent = window.navigator.userAgent.toLowerCase();
if(userAgent.indexOf('msie') != -1 ||
        userAgent.indexOf('trident') != -1) {
    // MSIE または Trident
    alert('Internet Explorerには対応しておりません。\n別のブラウザをお使いください');
} else {
    Vue.prototype.$config = config;
    Vue.prototype.$cloudinary = Cloudinary.new(config.cloudinary.options);
    Vue.prototype.$api = axios.create({
        // baseURL: App.baseURL,
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
            'Accept': 'application/json',
        },
    });

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}
