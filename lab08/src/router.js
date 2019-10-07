import Vue from 'vue'
import Router from 'vue-router'
import AllRecipes from './views/AllRecipes.vue'

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
      component: () => import(/* webpackChunkName: "favorite-recipes" */ './views/FavoriteRecipes.vue')
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import(/* webpackChunkName: "shopping-cart" */ './views/ShoppingCart.vue')
    }
  ]
})
