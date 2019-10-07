<template>
  <div id="app">
    <div class="logo">--- Ye Olde Book of Cocktails ---</div>
    <nav>
      <router-link
        to="/"
        :class="$style.navLink"
        :active-class="$style.navLinkActive"
        exact>
        All recipes
      </router-link>
      <router-link
        to="/favorite-recipes"
        :class="$style.navLink"
        :active-class="$style.navLinkActive"
        exact>
        Favorite recipes
        <!--<span v-if="favoriteCocktailsTotal > 0">({{ favoriteCocktailsTotal }})</span>-->
      </router-link>
      <router-link
        to="/shopping-cart"
        :class="$style.navLink"
        :active-class="$style.navLinkActive"
        exact>
        Shopping cart
        <!--<span v-if="shoppingCartItemsTotal > 0">({{ shoppingCartItemsTotal }})</span>-->
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  // export default {
  //   computed: {
  //     favoriteCocktailsTotal() {
  //       return this.$root.favoriteCocktails.length;
  //     },
  //     shoppingCartItemsTotal() {
  //       return Object.entries(this.$root.shoppingCartItems).reduce((sum, [key, value]) => (sum + value.quantity), 0);
  //     }
  //   }
  // }
</script>

<style>
/* Global styles */
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto+Slab:400,700&display=swap");

body,
input,
button,
textarea {
  font-family: "Roboto Slab", serif;
  font-size: 18px;
}

body {
  padding: 0;
  margin: 0;
  background: black;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Roboto Condensed", serif;
}

#app {
  max-width: 1040px;
  margin: 0 auto;
  padding: 40px;
  position: relative;
  background: white;
}

.logo {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
}

nav {
  padding: 40px 0;
  text-align: center;
}
</style>

<style module>
.navLink {
  display: block;
  font-size: 18px;
  color: black;
  font-weight: bold;
  margin: 0 1em 0.5em 1em;
  padding: 0.5em;
  border: 2px solid black;
  text-decoration: none;
}

@media (min-width: 820px) {
  .navLink {
    font-size: 24px;
    display: inline-block;
    margin: 0 0.5em;
    padding: 1em;
  }
}

.navLinkActive {
  background: black;
  color: white;
}
</style>
