<template>
  <section>
    <h1>{{ title }}</h1>
    <div v-for="cocktail in items" class="cocktailListItem">
      <Cocktail :cocktail="cocktail" @ingredientClick="onIngredientClick" />
      <button
        v-text="displayAddToFavoritesButton ? 'Add to favorites' : 'Remove from favorites'"
        @click="$emit('cocktailClick', cocktail)"
        class="button">
      </button>
    </div>
  </section>
</template>

<script>
import Cocktail from "./Cocktail";

export default {
  components: {
    Cocktail
  },
  props: {
    title: String,
    items: Array,
    displayAddToFavoritesButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onIngredientClick(ingredient) {
      this.$emit("ingredientClick", ingredient);
    }
  }
};
</script>

<style>
.button {
  color: white;
  background: black;
  border: none;
  padding: 1em;
  margin: 1em 0 0 220px;
}

.cocktailListItem {
  padding: 2em 0;
  border-bottom: 2px dashed black;
}

.cocktailListItem:first-of-type {
  padding-top: 0;
}
</style>
