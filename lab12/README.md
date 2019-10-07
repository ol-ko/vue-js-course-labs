# Lab 12 - Filters and mixins

1. Run `yarn && yarn serve` inside this folder.
1. In your IDE, open the `src` folder and explore the code.
1. Have you noticed how sometimes the total price in the shopping cart looks like `CHF 115.05000000000001`?

    In javascript all numbers are stored as floating point numbers and the arithmetic is known to not always be accurate.

    It would be great if we could instruct Vue.js to treat some numbers as currencies, round and format them correspondingly.

    The actual formatting is easily done with the Internationalization API:
    
    ```js
    new Intl.NumberFormat('en-us', { style: 'currency', currency: 'CHF' }).format(123.456789); // will result in CHF 123.45
    ```
    
1. Let's create a global `price` filter, that does exactly that and use it every component, that displays prices.

    <details>
    <summary>Hint</summary>
    
    `main.js`
    ```js
    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'
    
    Vue.config.productionTip = false
    
    Vue.filter('price', (value) => {
      return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'CHF' }).format(value);
    })
    
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    ```
    
    `Cocktail.vue`
    ```vue
    <template>
      ....
      <button
        v-if="ingredient.price"
        @click="orderIngredient(ingredient)"
        :class="$style.button">
        Buy for {{ ingredient.price | price }}
      </button>
     ....
    </template>
    ```
    
    `ShoppingCart.vue`
    ```vue
    <template>
        ....
        <p>
          Subtotal: CHF {{ subtotal | price }}<br />
          Delivery fee: CHF {{ deliveryFee | price }}<br />
          Total: CHF {{ total | price }}
        </p>
        ....
    </template>
    ```

    `ShoppingCartItem.vue`
    ```vue
    <template>
      ....
      <div>
        <strong>{{ title }}</strong> <br />
        {{ price | price }} <br />
        Qty: {{ quantity }}
      </div>
      ....
    </template>
    ```
    </details>
 
1. Now let's imagine our shop becomes available in different countries and has to display prices in different currencies.
We will not be able to hardcode `CHF` or the `en-us` locale in the filter anymore.
We can store the currency value in the Vuex store and pass it to the filter as a parameter.
Let's adjust just the `Cocktail` component so far.

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
        favoriteCocktails: [],
        currency: 'CHF',
        locale: 'en-us'
      },
      ....
    })
    ```
    
    `main.js`
    ```js
    ....
    Vue.filter('price', (value, locale, currency) => {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
    })
    ....
    ```
    
    `Cocktail.vue`
    ```vue
    <template>
      ....
      <button
        v-if="ingredient.price"
        @click="orderIngredient(ingredient)"
        :class="$style.button">
        Buy for {{ ingredient.price | price(locale, currency) }}
      </button>
      ....
    </template>
    
    <script>
      ....
      export default {
        ....
        computed: {
          currency() {
            return this.$store.state.currency;
          },
          locale() {
            return this.$store.state.locale;
          }
        },
        ....
      };
    </script>
    ```
    </details>

1. An error happens now when we open Shopping Cart - we are not passing `locale` and `currency` parameters to our price filter there.
In order not to re-create computed properties in every component we need, let's:
    - declare a `localizationMixin` mixin in a separate file
    - import it into those components, that use `price` filter
    - make sure we pass `locale` and `currency` parameters everywhere we use `price` filter

    <details>
    <summary>Hint</summary>
    
    `localizationMixin.js`
    ```js
    export default {
      computed: {
        currency() {
          return this.$store.state.currency;
        },
        locale() {
          return this.$store.state.locale;
        }
      }
    }
    ```
    
    `Cocktail.vue` (and other components using `price` filter)
    ```vue
    <script>
      ....
      import localizationMixin from '@/localizationMixin';
    
      export default {
        mixins: [localizationMixin],
        ....
      };
    </script>
    ```
    </details> 

1. Now let's go to the `store.js` and switch locale to 'de-DE' and currency to 'EUR' to verify that our logic works.
The price formatting should change from `CHF 38.35` to `38,35 €`.
