<template>
  <div id="app">
    <div class="navigation">
      <a href="#" @click="switchToAllRecipes">
        All recipes ({{ cocktails.length }})
      </a>
      <a href="#" @click="switchToFavoriteRecipes">
        Favorite recipes ({{ favoriteCocktails.length }})
      </a>
    </div>
    <div class="content">
      <CocktailList
        title="All recipes"
        :items="cocktails"
        v-if="showAllCocktails"
        @ingredientClick="addToShoppingList"
        @cocktailClick="addToFavorites"
        class="recipeList"
      ></CocktailList>
      <FavoriteCocktails
        :items="favoriteCocktails"
        v-if="showFavoriteCocktails"
        @ingredientClick="addToShoppingList"
        @cocktailClick="removeFromFavorites"
        class="recipeList">
      </FavoriteCocktails>
      <ShoppingCart
        :items="shoppingCartItems"
        @removeItem="removeFromShoppingList"
        class="shoppingCart"
      ></ShoppingCart>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import CocktailList from "./CocktailList";
import FavoriteCocktails from "./FavoriteCocktails";
import ShoppingCart from "./ShoppingCart";
import cocktails from "./all-cocktails.json";

export default {
  components: {
    CocktailList,
    FavoriteCocktails,
    ShoppingCart
  },

  methods: {
    addToFavorites(cocktail) {
      if (!this.favoriteCocktails.some(item => item.title === cocktail.title)) {
        this.favoriteCocktails.push(cocktail);
      }
    },
    removeFromFavorites(cocktail) {
      this.$delete(
        this.favoriteCocktails,
        this.favoriteCocktails.findIndex(item => item.title === cocktail.title)
      );
    },
    addToShoppingList(ingredient) {
      let quantity = 1;

      if (this.shoppingCartItems[ingredient.title]) {
        quantity = this.shoppingCartItems[ingredient.title].quantity + 1;
      }

      this.$set(
        this.shoppingCartItems,
        ingredient.title,
        {
          price: ingredient.price,
          quantity: quantity
        });
    },
    removeFromShoppingList(ingredientTitle) {
      this.$delete(this.shoppingCartItems, ingredientTitle);
    },
    switchToAllRecipes() {
      this.showAllCocktails = true;
      this.showFavoriteCocktails = false;
    },
    switchToFavoriteRecipes() {
      this.showAllCocktails = false;
      this.showFavoriteCocktails = true;
    }
  },
  data() {
    return {
      cocktails,
      shoppingCartItems: {},
      favoriteCocktails: [],
      showAllCocktails: true,
      showFavoriteCocktails: false
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto+Slab:400,700&display=swap");

body,
input,
button,
textarea {
  font-family: "Roboto Slab", serif;
  font-size: 18px;
}

body {
  padding: 20px 40px;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Roboto Condensed", serif;
}

.navigation a {
  display: inline-block;
  border: 2px solid black;
  padding: 1em;
  margin: 0 1em 0 0;
  color: black;
  text-decoration: none;
}

.content {
  display: flex;
  align-items: flex-start;
}

.recipeList {
  flex: 0 1 100%;
}

.shoppingCart {
  margin-left: 40px;
  flex: 0 0 400px;
}
</style>
