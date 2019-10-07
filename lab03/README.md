# Lab 3 - Reacting to events

1. Run `yarn && yarn serve` inside this folder. Open the started website and see that it is displaying a list of cocktail recipes and a list of favorites.
1. In your IDE, open `src/App.vue` file. Take a moment to look at the template. It should be similar to the one you have ended up with in a previous lab.
1. Add an "Add to favorites" button next to every cocktail recipe. Make this button react to a click event from user. Once a button is clicked, a corresponding cocktail has to be added to the favorites section. No need to make sure the recipe is added just once yet.

    <details>
    <summary>Hint</summary>
    
    ```vue
     <template>
        ....
        <div v-for="cocktail in cocktails" class="cocktail">
            ....
            <button @click="addFavorite(cocktail.title)">Add to favorites</button>
        </div>  
        ....
    </template>
 
    <script>
      export default {
        methods: {
          addFavorite(title) {
            this.favorites.push(title);
          }
        },
        ....
    </script>
    ```
    </details>

1. See how clicking the "Add to favorites" button results in same recipe being added multiple times to the favorites section. Use an event modifier to make sure a recipe can only be added to favorites once.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <button @click.once="addFavorite(cocktail.title)">Add to favorites</button>
    ```
    </details>

1. In the favorites section, add a text input field using the following code:

    ```vue
    <input type="text" v-model="customCocktail">
    ```

1. `v-model` directive tells the input field in which property to store it's value. We will cover this directive in the section dedicated to forms. For now, let's add `customCocktail` property to data object and initialize it as an empty string.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <script>
      export default {
        data() {
          return {
             customCocktail: '',
             ....
          }
       }
    }
    ```
    </details>

1. Using events and modifiers, extend input to add it's value to the list of favorites when user clicks Ctrl+Enter

    <details>
    <summary>Hint</summary>
    
    ```vue
    <input type="text" v-model="customCocktail" @keyup.ctrl.enter="addFavorite(customCocktail)">
    ```
    </details>


 
1. Using events and modifiers, extend input to clear it's value when user clicks Ctrl+Esc 

    <details>
    <summary>Hint</summary>
    
    ```vue
    <input type="text" v-model="customCocktail" @keyup.ctrl.esc="customCocktail = ''" @keyup.ctrl.enter="addFavorite(customCocktail)">
    ```
    </details>
