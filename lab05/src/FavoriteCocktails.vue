<template>
  <section>
    <h1>Favorites</h1>
    <div v-if="items.length === 0">No favorites yet</div>
    <Cocktail :cocktail="cocktail" v-for="cocktail in items" v-bind:key="cocktail.title"/>
  </section>
</template>

<script>
  import Cocktail from './Cocktail';

  export default {
    components: {
      Cocktail
    },
    props: {
      items: Array
    }
  }
</script>
