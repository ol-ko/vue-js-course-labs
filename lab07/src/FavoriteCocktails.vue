<template>
  <div>
    <CocktailList
        title="Favorite recipes"
        :items="items"
        :display-add-to-favorites-button="false"
        @ingredientClick="onIngredientClick"
        @cocktailClick="onCocktailClick"
    ></CocktailList>
    <p v-if="items.length === 0">No favorites yet!</p>
  </div>
</template>

<script>
  import CocktailList from './CocktailList';

  export default {
    components: {
      CocktailList
    },
    props: {
      items: Array
    },
    methods: {
      onCocktailClick(cocktail) {
        this.$emit('cocktailClick', cocktail);
      },
      onIngredientClick(ingredent) {
        this.$emit('ingredientClick', ingredent);
      }
    }
  }
</script>
