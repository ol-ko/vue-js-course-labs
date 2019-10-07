<template>
  <div>
    <div v-if="error">
      Oops, something went wrong.
    </div>
    <CocktailList
        v-if="cocktails"
        title="All recipes"
        :items="cocktails"
        @cocktailClick="addToFavorites"
    ></CocktailList>
  </div>
</template>

<script>
  import axios from 'axios';
  import CocktailList from '@/components/CocktailList';

  export default {
    components: {
      CocktailList
    },
    data() {
      return {
        cocktails: undefined,
        error: undefined
      };
    },
    async beforeMount() {
      let response;
      this.error = undefined;
      this.cocktails = undefined;

      try {
        response = await axios.get('https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/cocktails');
        this.cocktails = response.data
      }
      catch(error) {
        this.error = error;
      }
    },
    methods: {
      addToFavorites(cocktail) {
        if (!this.$root.favoriteCocktails.some(item => item.title === cocktail.title)) {
          this.$root.favoriteCocktails.push(cocktail);
        }
      }
    }
  }
</script>
