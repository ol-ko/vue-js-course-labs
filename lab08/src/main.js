import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  data: {
    shoppingCartItems: {},
    favoriteCocktails: []
  },
  router,
  render: h => h(App)
}).$mount('#app')
