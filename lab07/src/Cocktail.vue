<template>
  <div class="cocktail">
    <div>
      <img :src="cocktail.imageUrl" width="200" />
    </div>
    <div>
      <h3>
        {{ cocktail.title }}
      </h3>
      <ul>
        <li v-for="ingredient in cocktail.ingredients" class="ingredient">
          {{ ingredient.quantity }} {{ ingredient.title }}
          <button
            v-if="ingredient.price"
            @click="$emit('ingredientClick', ingredient)">
            Buy for CHF {{ ingredient.price }}
          </button>
        </li>
      </ul>
      <div v-html="cocktail.method"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cocktail: {
      type: Object,
      validator(value) {
        if (!value.title || !value.method) {
          return false;
        }

        if (value.ingredients && value.ingredients.length) {
          return value.ingredients.every(
            ingredient => ingredient.quantity && ingredient.title
          );
        }

        return true;
      }
    }
  }
};
</script>

<style>
.cocktail {
  display: flex;
}

.ingredient {
  line-height: 38px;
}

img {
  margin: 0 20px 20px 0;
}
</style>
