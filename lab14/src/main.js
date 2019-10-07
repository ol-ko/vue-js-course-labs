import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('price', (value, locale, currency) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
