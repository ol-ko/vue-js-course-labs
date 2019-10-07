# Lab 1 - Displaying data and reacting to user events

1. Run `yarn && yarn serve` inside this folder. Open the started website and see that it is displaying a welcome message.
1. In your IDE, open `src/App.vue` file. See that it's a very minimal Vue application, displaying a static message.
1. Add the data about the Gimlet cocktail to the correct place in the `<script>` section of the `App.vue`:
    ```js
    {
          title: 'Gimlet',
          ingredients: 'Plymouth Gin, Lime Cordial, Lime Juice'
    }
    ```
    
    <details>
      <summary>Hint</summary>
      
      ```vue
          <script>
          export default {
            name: 'app',
            data() {  
              return {
                title: 'Gimlet',
                ingredients: 'Plymouth Gin, Lime Cordial, Lime Juice'
              }
            }
          }
          </script>
      ```
    </details>
    
1. Display the title and the ingredients of the cocktail.
    <details>
          <summary>Hint</summary>
          
    ```vue
    <template>
      <div id='app'>
        <h1>{{title}}</h1>
        <p>{{ingredients}}</p>
      </div>
    </template>
    ```
    </details>

1. Below the cocktail information, create a section with a "Cocktails to make" heading.

    <details>
          <summary>Hint</summary>
          
    ```vue
    <template>
      <div id='app'>
        <h1>{{title}}</h1>
        <p>{{ingredients}}</p>
        <h1>Cocktails to make</h1>
      </div>
    </template>
    ```
    </details>
 
1. Displaying total number of cocktails to make:
    - Add the data property, representing the total number of the cocktails bartender needs to make.
    - Initialize it with a zero. Display it's value below the "Cocktails to make" title.
    - Check that the app is displaying the number zero correctly.

    <details>
          <summary>Hint</summary>
          
    ```vue
    <template>
      <div id='app'>
        <h1>{{title}}</h1>
        <p>
          {{ingredients}}
        </p>
    
        <h1>Cocktails to make</h1>
        {{cocktailsOrdered}}
      </div>
    </template>
    
    <script>
    export default {
      name: 'app',
      data() {
        return {
          title: 'Gimlet',
          ingredients: 'Plymouth Gin, Lime Cordial, Lime Juice',
          cocktailsOrdered: 0
        }
      }
    }
    </script>
    ```
    </details>
1. "Order cocktail" button.
    - In a template section, next to the cocktail data, create "Order cocktail" button.
    - For this button create a click event handler, that will increase the number of cocktails ordered by one.

    <details>
          <summary>Hint</summary>
          
    ```vue
    <template>
      <div id='app'>
        <h1>{{title}}</h1>
        <p>
          {{ingredients}}
        </p>
        <button v-on:click="cocktailsOrdered += 1">Order this cocktail</button>
        <h1>Cocktails to make</h1>
        {{cocktailsOrdered}}
      </div>
    </template>
    
    <script>
    export default {
      name: 'app',
      data() {
        return {
          title: 'Gimlet',
          ingredients: 'Plymouth Gin, Lime Cordial, Lime Juice',
          cocktailsOrdered: 0
        }
      }
    }
    </script>
    ``` 
    </details>
1. Test your app in a browser. Observe that by clicking the "Order cocktail" button, the number of cocktails to make increases. 
