import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import ajax from './config/ajax'
import './style/common'
import './config/rem'
import App from './app.vue'
Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
	router,
  store,
  render: (h) => h(App)
}).$mount(root)
