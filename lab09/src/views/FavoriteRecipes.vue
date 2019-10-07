<template>
  <div>
    <CocktailList
        title="Favorite recipes"
        :items="items"
        :display-add-to-favorites-button="false"
        @cocktailClick="removeFromFavorites"
    ></CocktailList>
    <p v-if="items.length === 0">No favorites yet!</p>
  </div>
</template>

<script>
  import Vue from 'vue';
  import CocktailList from '@/components/CocktailList';

  export default {
    components: {
      CocktailList
    },
    computed: {
      items() {
        return this.$root.favoriteCocktails;
      }
    },
    methods: {
      removeFromFavorites(cocktail) {
        Vue.delete(
          this.$root.favoriteCocktails,
          this.$root.favoriteCocktails.findIndex(item => item.title === cocktail.title)
        );
      }
    }
  }
</script>
