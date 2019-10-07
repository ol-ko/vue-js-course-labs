<template>
  <div id='app'>
    <CocktailList @ingredientClick="addToShoppingList" @cocktailClick="addToFavorites"></CocktailList>
    <FavoriteCocktails :items="favoriteCocktails"></FavoriteCocktails>
    <ShoppingCart :items="shoppingCartItems"></ShoppingCart>
  </div>
</template>

<script>
  import Vue from 'vue';
  import CocktailList from './CocktailList';
  import FavoriteCocktails from './FavoriteCocktails';
  import ShoppingCart from './ShoppingCart';

  export default {
    components: {
      CocktailList,
      FavoriteCocktails,
      ShoppingCart
    },
    methods: {
      addToFavorites(cocktail) {
        if (this.favoriteCocktails.some(item => item.id === cocktail.id)) {
          return;
        }

        this.favoriteCocktails.push(cocktail);
      },
      addToShoppingList(ingredient) {
        let quantity = 1;

        if (this.shoppingCartItems[ingredient.title]) {
          quantity = this.shoppingCartItems[ingredient.title].quantity + 1;
        }

        Vue.set(
          this.shoppingCartItems,
          ingredient.title,
          {
            price: ingredient.price,
            quantity: quantity
          });
      }
    },
    data() {
      return {
        shoppingCartItems: {},
        favoriteCocktails: []
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
  }

  #app > * {
    flex: 1 0 33%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
