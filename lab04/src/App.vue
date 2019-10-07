<template>
  <div id='app'>
    <section>
      <h1>Recipes</h1>
      <div v-for="cocktail in cocktails" class="cocktail">
        <div><img :src="cocktail.imageUrl" width="200"></div>
        <div>
          <h3>
            {{cocktail.title}}
          </h3>
          <ul>
            <li v-for="ingredient in cocktail.ingredients">
              {{ingredient.quantity}} {{ingredient.title}}
            </li>
          </ul>
          <div v-html="cocktail.method"></div>
          <button @click.once="addToFavorites(cocktail)">Add to favorites</button>
        </div>
      </div>
    </section>
    <section>
      <h1>Favorites</h1>
      <div v-if="favoriteCocktails.length === 0">No favorites yet</div>
      <div v-for="cocktail in favoriteCocktails" class="cocktail">
        <div><img :src="cocktail.imageUrl" width="200"></div>
        <div>
          <h3>
            {{cocktail.title}}
          </h3>
          <ul>
            <li v-for="ingredient in cocktail.ingredients">
              {{ingredient.quantity}} {{ingredient.title}}
            </li>
          </ul>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    methods: {
      addToFavorites(cocktail) {
        this.favoriteCocktails.push(cocktail);
      }
    },
    data() {
      return {
        favoriteCocktails: [],
        cocktails: [
          {
            title: 'Aperol Spritz',
            ingredients: [
              {
                quantity: '2 oz.',
                title: 'Aperol',
                price: 51.64
              },
              {
                quantity: '1 oz.',
                title: 'Carpenè Malvolti Prosecco',
                price: 38.35
              },
              {
                quantity: '1 oz.',
                title: 'Club Soda'
              },
              {
                quantity: '0.5 oz.',
                title: 'Orange Juice'
              }
            ],
            method: '<p>Add everything to a chilled rocks glass, then fill with ice.</p><p>Stir and garnish with half an orange wheel.</p>',
            imageUrl: 'https://cocktail-recipes-for-vue-js-training.s3.eu-central-1.amazonaws.com/aperol-spritz.jpg'
          },
          {
            title: 'Bee\'s Knees',
            ingredients: [
              {
                quantity: '2 oz.',
                title: 'Plymouth Gin',
                price: 40.6
              },
              {
                quantity: '0.75 oz',
                title: 'Lemon Juice'
              },
              {
                quantity: '0.75 oz',
                title: 'Honey Sirup'
              }
            ],
            method: '<p>Shake with ice and strain into a chilled coupe.</p><p>No garnish.</p>',
            imageUrl: 'https://cocktail-recipes-for-vue-js-training.s3.eu-central-1.amazonaws.com/bees-knees.jpg'
          },
          {
            title: 'Caipirinha',
            ingredients: [
              {
                quantity: '2 oz',
                title: 'Beleza Pura Cachaça',
                price: 20.34
              },
              {
                quantity: '0.5',
                title: 'Lime'
              },
              {
                quantity: '2 barspoons',
                title: 'Demerara Sugar'
              }
            ],
            method: '<p>Muddle the lime and sugar.</p><p>Add the cachaça, then shake with ice and pour unstrained into a chilled rocks glass.</p><p>No garnish.</p>',
            imageUrl: 'https://cocktail-recipes-for-vue-js-training.s3.eu-central-1.amazonaws.com/caipirinha.jpg'
          }
        ]
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
  }

  img {
    margin: 20px 20px 20px 0;
  }

  #app > * {
    flex: 1 0 33%;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
