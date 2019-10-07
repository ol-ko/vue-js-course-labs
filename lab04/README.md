# Lab 4 - Component composition

1. Run `yarn && yarn serve` inside this folder. Open the started website and see that it is displaying list of recipes and a list of favorites, just like the previous lab.
1. In your IDE, open `src/App.vue` file and explore the code. See that the template became a little repetitive? Time to extract some logic into a component!
1. Add some recipes to favorites, notice that now we display not just the title, but the whole recipe.
1. In an `src` folder, create a `Cocktail.vue` file. In this file, declare a Vue component, that receives a mandatory `cocktail` property and is able to display the cocktail data in the same way as `App.vue` did

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div class="cocktail">
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
    </template>
 
    <script>
    export default {
      props: {
        cocktail: Object
      }
    }
    </script>
    
    <style>
      .cocktail {
        display: flex;
      }
    
      img {
        margin: 20px 20px 20px 0;
      }
    </style>

    ```
    </details>
    
1. Import the newly created component into `App.vue` and refactor our app to display every cocktail recipe using the `Cocktail` component.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div id='app'>
        <section>
          <h1>Recipes</h1>
          <div v-for="cocktail in cocktails">
            <Cocktail :cocktail="cocktail" />
            <button @click="addToFavorites(cocktail)">Add to favorites</button>
          </div>
        </section>
        <section>
          <h1>Favorites</h1>
          <div v-if="favoriteCocktails.length === 0">No favorites yet</div>
          <!-- Note how we add a key binding here, because v-for directive is used on a component -->
          <Cocktail :cocktail="cocktail" v-for="cocktail in favoriteCocktails" v-bind:key="cocktail.title"/>
        </section>
      </div>
    </template>
    
    <script>
    import Cocktail from './Cocktail';
    
    export default {
      components: {
        Cocktail
      },
      ....
    }
    </script>
    
    <style>
      #app {
        display: flex;
      }
    </style>
    ```
    </details>

1. Now let's add some functionality to our app.
    Imagine that our young cocktail startup has cut a deal with an online liquor shop.
    We want to add a shopping cart functionality to our website, so that our users can easily shop for ingredients.
    Let's add a 'Shopping cart' section right after the 'Favorites' one in our `App.vue` and a `shoppingCartItems` data property, that will in future hold a map of ingredients to purchase and their quantity.
    
    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      ....
       <section>
         <h1>Shopping cart</h1>
         {{shoppingCartItems}}
       </section>
    </template>
    
    <script>
    ....
    export default {
      data() {
        return {
         shoppingCartItems: {}
        }
      }
      ....
    }
    </script>
    ```
    </details>
      
1. Let's assume that all ingredients, that have prices, are available in our partner liquor shop.  
   In our `Cocktail.vue` component, for those ingredients we have prices for, let's display a "Buy for CHF XYZ" button, where "XYZ" would be the price.  
   When user clicks this button, an ingredient should be added to the `shoppingCartItems` data property in the parent app.  
   For now, let's assume `shoppingCartItems` is an array. 
   
    <details>
    <summary>Hint</summary>
    
    `Cocktail.vue`
    ```vue
    <template>
    ....
    <li v-for="ingredient in cocktail.ingredients">
        {{ingredient.quantity}} {{ingredient.title}}
        <button v-if="ingredient.price" @click="$emit('ingredientClicked', ingredient)">Buy for CHF {{ingredient.price}}</button>
    </li>
    ....
    </template>
    ```
    
    `App.vue`
    ```vue
    <template>
    ....
    <section>
      <h1>Shopping cart</h1>
      <ul>
        <li v-for="ingredient in shoppingCartItems">
          {{ingredient.title}} CHF {{ingredient.price}}
        </li>
      </ul>
    </section>
    </template>
    
    <script>
    ....
    export default {
      ....
      methods: {
        ....
        addToShoppingList(ingredient) {
          this.shoppingCartItems.push(ingredient);
        }
      },
      data() {
        return {
          shoppingCartItems: [],
          ....
        }
      }
    }
    </script>
    ```   
    </details>

1. Now we should be able to add ingredients to the shopping cart by clicking the buttons in the `Recipes` section. 
But can you order an ingredient from the favorites section? If not - why?

    <details>
    <summary>Hint</summary>
    
    Because we aren't handling the event coming from the `Cocktail` components in a Favorites section.
    </details>

### Bonus track
   
1. We get the information propagated from the child components and displayed. Let's just iterate on the UI a bit.  
First of all - we don't want the shopping cart to look like this:

   ```text
    Aperol CHF 51.64
    Aperol CHF 51.64
    Aperol CHF 51.64
    Aperol CHF 51.64
   ```   
   
   It would look better like this:
   
   ```text
    Aperol CHF 51.64 Qty: 4
   ```   
   
   Note: Remember how `v-for` directive can not only iterate through arrays, but also through the key/value pairs of the object?
   Also, don't forget to modify your data structures in a reactive way.
   

  <details>
  <summary>Hint</summary>
  
  `App.vue`
  ```vue
  <template>
    ....
    <section>
      <h1>Shopping cart</h1>
      <ul>
        <li v-for="(ingredient, ingredientTitle) in shoppingCartItems">
          {{ingredientTitle}} CHF {{ingredient.price}}
          Qty: {{ingredient.quantity}}
        </li>
      </ul>
    </section>
    ....
  </template>
  
  <script>
    ....
    export default {
      data() {
        return {
          shoppingCartItems: {},
          ....
        }
      },
      methods: {
        addToShoppingList(ingredient) {
          let quantity = 1;
    
          if (this.shoppingCartItems[ingredient.title]) {
            quantity = this.shoppingCartItems[ingredient.title].quantity + 1;
          }
    
          Vue.set(
            this.shoppingCartItems,
            ingredient.title,
            {
              price: ingredient.price,
              quantity: quantity
            });
        },
        ....
      }
    }
  </script>
  ```
  </details>
