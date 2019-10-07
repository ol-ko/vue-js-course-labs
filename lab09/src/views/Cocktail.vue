<template>
  <div>
    <div v-if="error">
      <h1>
        Oops, something went wrong.
      </h1>
      {{error}}
    </div>
    <div v-if="cocktail">
      <img :src="cocktail.imageUrl" :class="$style.image"/>
      <h1>
        {{ cocktail.title }}
      </h1>
      <p>{{ cocktail.description }}</p>
      <p :class="$style.source">— {{cocktail.source}}</p>

      <h3>Recipe</h3>
      <ul>
        <li v-for="ingredient in cocktail.ingredients" :class="$style.ingredient">
          {{ ingredient.quantity }} {{ ingredient.title }}
          <button
              v-if="ingredient.price"
              @click="orderIngredient(ingredient)"
              :class="$style.button">
            Buy for CHF {{ ingredient.price }}
          </button>
        </li>
      </ul>
      <p v-html="cocktail.method"></p>
      <SimilarCocktails :cocktail-id="cocktail.id"></SimilarCocktails>
    </div>
  </div>
</template>

<script>
  import SimilarCocktails from '@/components/SimilarCocktails';
  import axios from 'axios';
  import Vue from 'vue';

  function getCocktailData(id) {
    return axios.get(`https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/cocktails/${id}`)
  }

  export default {
    components: {
      SimilarCocktails
    },
    data() {
      return {
        cocktail: undefined,
        error: undefined
      }
    },
    async beforeRouteEnter (to, from, next) {
      let response;
      try {
        response = await getCocktailData(to.params.id);
        next(vm => vm.cocktail = response.data);
      }
      catch(error) {
        next(vm => vm.error = error);
      }
    },
    async beforeRouteUpdate (to, from, next) {
      let response;
      try {
        response = await getCocktailData(to.params.id);
        this.cocktail = response.data;
        next();
      }
      catch(error) {
        this.error = error;
        next();
      }
    },
    methods: {
      orderIngredient(ingredient) {
        let quantity = 1;

        if (this.$root.shoppingCartItems[ingredient.title]) {
          quantity = this.$root.shoppingCartItems[ingredient.title].quantity + 1;
        }

        Vue.set(
          this.$root.shoppingCartItems,
          ingredient.title,
          {
            price: ingredient.price,
            quantity: quantity
          });
      }
    }
  };
</script>

<style module>
  .ingredient {
    line-height: 38px;
  }

  .image {
    max-width: 100%;
  }

  @media (min-width: 600px) {
    .image {
      max-width: 600px;
    }
  }

  .button {
    border: 2px solid black;
    height: 32px;
    line-height: 28px;
    box-shadow: 3px 3px 0px -1px black;
  }
  .source {
    text-align: right;
    font-style: italic;
  }
</style>
