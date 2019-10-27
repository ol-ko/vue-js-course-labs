import Vue from 'vue'
import Router from 'vue-router'
import AllRecipes from './views/AllRecipes.vue'
import FavoriteRecipes from './views/FavoriteRecipes.vue'
import ShoppingCart from './views/ShoppingCart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'all-recipes',
      component: AllRecipes
    },
    {
      path: '/favorite-recipes',
      name: 'favorite-recipes',
      component: FavoriteRecipes
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: ShoppingCart
    }
  ]
})
