# Lab 10 - State management with Vuex

1. Run `yarn && yarn serve` inside this folder.
1. In your IDE, open the `src` folder and explore the code. A `store.js` file has appeared, and this is our future Vuex store, so far empty.
Let's refactor our application to use Vuex store.
1. Let's start by removing data from the `main.js` file - we don't need this workaround anymore! Let's declare same two properties with same initial values in our store's state.

    <details>
    <summary>Hint</summary>
    
    `store.js`
    ```js
    ....
    
    export default new Vuex.Store({
      state: {
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      mutations: {
       
      },
      actions: {
    
      }
    })
    ```
    </details>

1. Now we need to refactor all the application logic that modifies that state. For example adding and removing cocktails from the list of favorites.
Which Vuex concept would you use for this?

    <details>
    <summary>Hint</summary>
    
    Logic that modifies, or better said, mutates the state belongs, of course, to mutations.
    </details>

1. Let's refactor `addToFavorites` method from `AllRecipes.vue` component in such a way, that it uses the store.
Here's some code to copy to speed things up.

    `store.js`
    ```js
    ....
    
    export default new Vuex.Store({
      state: {
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      mutations: {
        addToFavorites(state, cocktail) {
          if (!state.favoriteCocktails.some(item => item.title === cocktail.title)) {
            state.favoriteCocktails.push(cocktail);
          }
        }
      },
      actions: {
    
      }
    })
    ```
    
    `AllRecipes.vue`
    ```vue
    <script>
      ....
    
      export default {
        ....
        methods: {
          addToFavorites(cocktail) {
            this.$store.commit('addToFavorites', cocktail);
          }
        }
      }
    </script>
    ```
    
    `FavoriteRecipes.vue`
    ```vue
    <script>
      ....
    
      export default {
        ....
        computed: {
          items() {
            return this.$store.state.favoriteCocktails;
          }
        },
        ....
      }
    </script>
    ```
    
1. Note how we access the store inside the component as `this.$store`, how we declare and commit the mutation.
`addToFavorites` mutation has the same logic as before, but operates over the state, instead of `this.$root`.
And we also read from the store's state in `FavoriteRecipes.vue` instead of `this.$root`.
Now let's do the same for removing the item from the favorites. Your turn now :)

    <details>
    <summary>Hint</summary>
    
    `store.js`
    ```js
    ....
    
    export default new Vuex.Store({
      state: {
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      mutations: {
        addToFavorites(state, cocktail) {
          if (!state.favoriteCocktails.some(item => item.title === cocktail.title)) {
            state.favoriteCocktails.push(cocktail);
          }
        },
        removeFromFavorites(state, cocktail) {
          Vue.delete(
            state.favoriteCocktails,
            state.favoriteCocktails.findIndex(item => item.title === cocktail.title)
          );
        }
      },
      actions: {
    
      }
    })
    ```
    
    `FavoriteRecipes.vue`
    ```vue
    <script>
      ....
    
      export default {
        ....
        methods: {
          removeFromFavorites(cocktail) {
            this.$store.commit('removeFromFavorites', cocktail);
          }
        }
      }
    </script>
    ```
    </details>

1. Great! Now we should be able to test this functionality in the browser.
Since everything is working great, let's add the possibility to add cocktail to favorites into the only spot, where it's still missing - the `Cocktail` view.
Up to you where on the page you want to put the button and how you want to style it.

    <details>
    <summary>Hint</summary>
    
    `Cocktail.vue`
    ```vue
    <template>
      ....
      <button @click="addToFavorites(cocktail)">
        Add to favorites
      </button>
      ....
    </template>
    
    <script>
      ....
      export default {
        ....
        methods: {
          ....
          addToFavorites(cocktail) {
            this.$store.commit('addToFavorites', cocktail);
          }
        }
      };
    </script>
    ```
    </details>

1. Nice! Managing our favorites has just become much easier!
Now let's refactor the shopping cart logic in the same way. Declaring mutations, committing mutations, you know the drill.

    <details>
    <summary>Hint</summary>
    
    `store.js`
    ```js
    ....
    export default new Vuex.Store({
      state: {
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      mutations: {
        ....
        addIngredientToShoppingCart(state, ingredient) {
          let quantity = 1;
    
          if (state.shoppingCartItems[ingredient.title]) {
            quantity = state.shoppingCartItems[ingredient.title].quantity + 1;
          }
    
          Vue.set(
            state.shoppingCartItems,
            ingredient.title,
            {
              price: ingredient.price,
              quantity: quantity
            });
        },
        removeIngredientFromShoppingCart(state, ingredientTitle) {
          Vue.delete(state.shoppingCartItems, ingredientTitle);
        }
      },
      actions: {
    
      }
    })
    ```
    
    `Cocktail.vue`
    ```vue
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
          <button
              @click="addToFavorites(cocktail)"
              :class="$style.button">
            Add to favorites
          </button>
          <SimilarCocktails v-if="cocktail" :cocktail-id="cocktail.id"></SimilarCocktails>
        </div>
      </div>
    </template>
    
    <script>
      ....
      export default {
        ....
        methods: {
          ....
          orderIngredient(ingredient) {
            this.$store.commit('addIngredientToShoppingCart', ingredient);
          },
          ....
        }
      };
    </script>
    ```
    
    `ShoppingCart.vue`
    ```vue
    <script>
      ....
      export default {
        ....
        computed: {
          items() {
            return this.$store.state.shoppingCartItems;
          },
          ....
        },
        methods: {
          removeFromShoppingList(ingredientTitle) {
            this.$store.commit('removeIngredientFromShoppingCart', ingredientTitle);
          }
        },
        ....
      };
    </script>
    ```
    </details>

1. Now that we see how things work with the store, why don't we move some more state into it?
Like the list of recipes from the `AllRecipes.vue` component. That data is currently fetched asynchronously via the API. 
Which Vuex concept would you use for this?

    <details>
    <summary>Hint</summary>
    
    Asynchronous operations can be done in actions. 
    </details>

1. Let's declare an `allRecipes` property in the store state, initialize it with an empty array and use it in the `AllRecipes.vue`.

    <details>
    <summary>Hint</summary>
    
    `store.js`
    ```js
    ....
    export default new Vuex.Store({
      state: {
        allRecipes: [],
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      mutations: {
        ....
      },
      actions: {
    
      }
    })
    ```
    
    `AllRecipes.vue`
    ```vue
    <script>
      ....
      export default {
        ....
        computed: {
          cocktails() {
            return this.$store.state.allRecipes;
          }
        },
        ....
      }
    </script>
    ```
    </details>

1. Now let's create a `fetchAllRecipes` action in the store and move the logic from `beforeMount` hook of the `AllRecipes.vue`.
Remember that as a result action is supposed to commit a mutation, which we'll also need to create. 
Oh, and let's not forget about error handling this time.

    <details>
    <summary>Hint</summary>
    
    `store.js`
    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios';
    
    Vue.use(Vuex)
    
    export default new Vuex.Store({
      state: {
        error: undefined,
        allRecipes: [],
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      mutations: {
        ....
        setAllRecipes(state, recipes) {
          state.allRecipes = recipes;
        },
        setError(state, recipes) {
          state.error = recipes;
        }
      },
      actions: {
        async fetchAllRecipes(context) {
          let response;
          try {
            response = await axios.get('https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/cocktails');
            context.commit('setAllRecipes', response.data)
          }
          catch(error) {
            context.commit('setError', error)
          }
        }
      }
    })
    ```
    
    `AllRecipes.vue`
    ```vue
    <script>
      export default {
        ....
        computed: {
          cocktails() {
            return this.$store.state.allRecipes;
          },
          error() {
            return this.$store.state.error;
          }
        },
        mounted() {
          this.$store.dispatch('fetchAllRecipes');
        },
        ....
      }
    </script>
    ```
    </details>

1. If we try adding recipes to favorites or ingredients to the shopping cart, numbers on the navigation links won't update.
That's because that code's commented out. And it's still referring to the `this.$root`, which is no good.
If we want to make it work with our shiny new store, Which Vuex concept should we be using?

    <details>
    <summary>Hint</summary>
    
    Getters are the best to compute derived state based on store state. 
    </details>

1. Now let's refactor that part!

    <details>
    <summary>Hint</summary>
    
    `store.js`
    ```js
    ....
    export default new Vuex.Store({
      state: {
        error: undefined,
        allRecipes: [],
        shoppingCartItems: {},
        favoriteCocktails: []
      },
      getters: {
        favoriteCocktailsTotal(state) {
          return state.favoriteCocktails.length;
        },
        shoppingCartItemsTotal(state) {
          return Object.entries(state.shoppingCartItems).reduce((sum, [key, value]) => (sum + value.quantity), 0);
        },
      },
      mutations: {
        ....
      },
      actions: {
        ....
      }
    })
    ```
    
    `App.vue`
    ```vue
    <template>
        ....
        <span v-if="favoriteCocktailsTotal > 0">({{ favoriteCocktailsTotal }})</span>
        ....
        <span v-if="shoppingCartItemsTotal > 0">({{ shoppingCartItemsTotal }})</span>
        ....
    </template>
    
    <script>
      export default {
        computed: {
          favoriteCocktailsTotal() {
            return this.$store.getters.favoriteCocktailsTotal;
          },
          shoppingCartItemsTotal() {
            return this.$store.getters.shoppingCartItemsTotal;
          }
        }
      }
    </script>
    ```
    </details>

1. Now let's shorten the code of the `App.vue` by using a shorthand for mapping component to getters.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <script>
      import { mapGetters } from 'vuex';
    
      export default {
        computed: {
          ...mapGetters([
            'favoriteCocktailsTotal',
            'shoppingCartItemsTotal'
          ])
        }
      }
    </script>
    ```
    </details>

### Bonus track

What other application state can we move to store? 
