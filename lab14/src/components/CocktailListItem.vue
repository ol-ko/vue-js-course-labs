<template>
  <router-link :to="{ name: 'cocktail', params: { id: cocktail.id } }" :class="$style.cocktail">
    <img :src="cocktail.imageUrl" :class="$style.image"/>
    <h3>{{ cocktail.title }}</h3>
    <p>{{cocktail.description}}</p>
  </router-link>
</template>

<script>
export default {
  props: {
    cocktail: {
      type: Object,
      validator(value) {
        if (!value.title || !value.description || !value.id || !value.imageUrl) {
          return false;
        }
        return true;
      }
    }
  }
};
</script>

<style module>
.cocktail {
  text-decoration: none;
  color: inherit;
}
.image {
  width: 100%;
}
</style>
