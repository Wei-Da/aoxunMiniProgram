import Vue from 'vue'
import App from './App'
import store from './store'

import uView from "uview-ui";
Vue.use(uView);

import {request, websiteUrl} from './utils/request/index.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$websiteUrl = websiteUrl

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
