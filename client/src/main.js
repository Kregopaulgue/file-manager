import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueRouter from 'vue-router';

Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSearch, faFolder, faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faUserCircle,
    faFileCode
} from '@fortawesome/free-regular-svg-icons';


library.add(faSearch, faFolder, faUserCircle, faFileCode, faCloudUploadAlt);
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
}).$mount('#app')
