<template>
  <section>
    <h1>{{ title }}</h1>
    <section :class="$style.cocktailList">
      <div v-for="cocktail in items" :class="$style.cocktailListItem">
        <CocktailListItem :cocktail="cocktail" />
        <button
            @click="$emit('cocktailClick', cocktail)"
            v-text="displayAddToFavoritesButton ? 'Add to favorites' : 'Remove from favorites'">
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import CocktailListItem from '@/components/CocktailListItem';

export default {
  components: {
    CocktailListItem
  },
  props: {
    title: String,
    items: Array,
    displayAddToFavoritesButton: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style module>
.cocktailList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -20px;
}

.cocktailListItem {
  flex: 1 0 100%;
  padding: 20px;
  box-sizing: border-box;
}

@media (min-width: 400px) {
  .cocktailListItem {
    flex: 0 1 50%;
  }
}

@media (min-width: 600px) {
  .cocktailListItem {
    flex: 0 1 33.33%;
  }
}
</style>
