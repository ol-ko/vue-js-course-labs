<template>
  <CocktailList
      v-if="similarCocktails"
      title="Cocktails with similar ingredients"
      :items="similarCocktails"
      @cocktailClick="addToFavorites"
  ></CocktailList>
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
        similarCocktails: undefined
      }
    },
    props: {
      cocktailId: String
    },
    created() {
      this.loadSimilarCocktails()
    },
    methods: {
      async loadSimilarCocktails() {
        let response;
        try {
          response = await axios.get(`https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/cocktails/${this.cocktailId}/similar`);
          this.similarCocktails = response.data.slice(0, 3);
        } catch (error) {
          this.similarCocktails = undefined;
        }
      },
      addToFavorites(cocktail) {
        if (!this.$root.favoriteCocktails.some(item => item.title === cocktail.title)) {
          this.$root.favoriteCocktails.push(cocktail);
        }
      }
    },
    watch: {
      cocktailId() {
        this.loadSimilarCocktails();
      }
    }
  }
</script>
