# Lab 11 - Slots

1. Run `yarn && yarn serve` inside this folder.
1. In your IDE, open the `src` folder and explore the code.
1. In a `CocktailList.vue` we currently have a button that serves double purpose - it can be an "Add to favorites" or "Remove from favorites" button.
Moreover, we are basing our display logic on a value passed via `displayAddToFavoritesButton` property and emitting event, that is handled outside.
Now we know there is a better way!
Let's declare a slot in a `CocktailList.vue` component and move those call to action buttons to the parent components, right where they belong.
And let's not think about styling or handling the click event for now. In fact - let's drop the related attributes for a while. 
Since adding to favorites wouldn't work for a while, let's put one cocktail recipe into favorites list just so that we can test:

    `store.js`
    ```js
    ....
    export default new Vuex.Store({
      state: {
        ....
        favoriteCocktails: [
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
      },
      ....
    })
    ```

    <details>
    <summary>Hint</summary>
    
    `CocktailList.vue`
    ```vue
    <template>
      <section>
        <h1>{{ title }}</h1>
        <section :class="$style.cocktailList">
          <div v-for="cocktail in items" :class="$style.cocktailListItem">
            <CocktailListItem :cocktail="cocktail" />
            <slot></slot>
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
        items: Array
      }
    };
    </script>
    ```
    
    `AllRecipes.vue`
    ```vue
    <template>
      ....
      <CocktailList
        v-if="cocktails"
        title="All recipes"
        :items="cocktails">
        <button>
          Add to favorites
        </button>
      </CocktailList>
      ....
    </template>
    ```
    
    `FavoriteRecipes.vue`
    ```vue
    <template>
      ....
      <CocktailList
        title="Favorite recipes"
        :items="items">
        <button>
          Remove from favorites
        </button>
      </CocktailList>
      ....
    </template>
    ```
    </details>

1. To restore the click handling logic, our parent components would need to know some context of a child.
More precisely - which exact cocktail of the list has been clicked.
Let's add click handlers to the buttons in `AllRecipes` and `FavoriteRecipes` and use scoped slots to pass the context.

    <details>
    <summary>Hint</summary>
    
    `CocktailList.vue`
    ```vue
    <template>
      ....
      <slot v-bind:cocktail="cocktail"></slot>
      ....
    </template>
    ```
    
    `AllRecipes.vue`
    ```vue
    <template>
      ....
        <CocktailList
            v-if="cocktails"
            title="All recipes"
            :items="cocktails">
          <template v-slot="context">
            <button @click="addToFavorites(context.cocktail)">
              Add to favorites
            </button>
          </template>
        </CocktailList>
      ....
    </template>
    ```
    
    `FavoriteRecipes.vue`
    ```vue
    <template>
      ....
        <CocktailList
            title="Favorite recipes"
            :items="items">
          <template v-slot="context">
            <button @click="removeFromFavorites(context.cocktail)">
              Remove from favorites
            </button>
          </template>
        </CocktailList>
      ....
    </template>
    ```
    </details>
