<template>
  <div>
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
        cocktails: undefined
      };
    },
    async beforeRouteEnter(to, from, next) {
      let response;
      try {
        response = await axios.get('https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/cocktails');
        next(vm => vm.cocktails = response.data);
      }
      catch(error) {
        next(vm => vm.error = error);
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
