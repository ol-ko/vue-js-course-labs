import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: undefined,
    allRecipes: [],
    shoppingCartItems: {},
    favoriteCocktails: [],
    currency: 'CHF',
    locale: 'en-us'
  },
  getters: {
    favoriteCocktailsTotal(state) {
      return state.favoriteCocktails.length;
    },
    shoppingCartItemsTotal(state) {
      return Object.entries(state.shoppingCartItems).reduce((sum, [key, value]) => (sum + value.quantity), 0);
    },
  },
  mutations: {
    addToFavorites(state, cocktail) {
      if (!state.favoriteCocktails.some(item => item.title === cocktail.title)) {
        state.favoriteCocktails.push(cocktail);
      }
    },
    removeFromFavorites(state, cocktail) {
      Vue.delete(
        state.favoriteCocktails,
        state.favoriteCocktails.findIndex(item => item.title === cocktail.title)
      );
    },
    addIngredientToShoppingCart(state, ingredient) {
      let quantity = 1;

      if (state.shoppingCartItems[ingredient.title]) {
        quantity = state.shoppingCartItems[ingredient.title].quantity + 1;
      }

      Vue.set(
        state.shoppingCartItems,
        ingredient.title,
        {
          price: ingredient.price,
          quantity: quantity
        });
    },
    removeIngredientFromShoppingCart(state, ingredientTitle) {
      Vue.delete(state.shoppingCartItems, ingredientTitle);
    },
    setAllRecipes(state, recipes) {
      state.allRecipes = recipes;
    },
    setError(state, recipes) {
      state.error = recipes;
    }
  },
  actions: {
    async fetchAllRecipes(context) {
      let response;
      try {
        response = await axios.get('https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/cocktails');
        context.commit('setAllRecipes', response.data)
      }
      catch(error) {
        context.commit('setError', error)
      }
    }
  }
})
