<template>
  <div>
    <CocktailList
        title="Favorite recipes"
        :items="items">
      <template v-slot="context">
        <button @click="removeFromFavorites(context.cocktail)">
          Remove from favorites
        </button>
      </template>
    </CocktailList>
    <p v-if="items.length === 0">No favorites yet!</p>
  </div>
</template>

<script>
  import CocktailList from '@/components/CocktailList';

  export default {
    components: {
      CocktailList
    },
    computed: {
      items() {
        return this.$store.state.favoriteCocktails;
      }
    },
    methods: {
      removeFromFavorites(cocktail) {
        this.$store.commit('removeFromFavorites', cocktail);
      }
    }
  }
</script>
