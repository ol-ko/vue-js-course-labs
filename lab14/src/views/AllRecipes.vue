<template>
  <div>
    <div v-if="error">
      Oops, something went wrong.
    </div>
    <CocktailList
        v-if="cocktails"
        title="All recipes"
        :items="cocktails">
      <template v-slot="context">
        <button @click="addToFavorites(context.cocktail)">
          Add to favorites
        </button>
      </template>
    </CocktailList>
  </div>
</template>

<script>
  import CocktailList from '@/components/CocktailList';

  export default {
    components: {
      CocktailList
    },
    computed: {
      cocktails() {
        return this.$store.state.allRecipes;
      },
      error() {
        return this.$store.state.error;
      }
    },
    beforeMount() {
      this.$store.dispatch('fetchAllRecipes');
    },
    methods: {
      addToFavorites(cocktail) {
        this.$store.commit('addToFavorites', cocktail);
      }
    }
  }
</script>
