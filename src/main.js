import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  history: true,
  hashbang: false,
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'home',
      component: App
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
