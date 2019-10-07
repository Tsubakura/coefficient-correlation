import Vue from 'vue'
import Vs from 'd3-vs'
import Router from 'vue-router'

import App from './App.vue'

import CC from './CC.vue'
import Kmeans from './Kmeans.vue'
Vue.component('cc', CC)
Vue.component('kmeans', Kmeans)

Vue.use(Vs)
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
