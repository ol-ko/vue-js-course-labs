# Lab 2 - Template syntax

1. Run `yarn && yarn serve` inside this folder. Open the started website and see that it is displaying a welcome message.
1. In your IDE, open `src/App.vue` file. Notice that there is some data in the application, but the template only displays a static message.
1. Loop through the `cocktails` data property and for each cocktail display a title.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div id='app'>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
        </div>
      </div>
    </template>
    ```
    </details>

1. Display a preparation method for each cocktail. Note that method fields contain some HTML.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div id='app'>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
    </template>
    ```
    </details>

1. Display an image for each cocktail. Limit the width of the image to 200px.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div id='app'>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
          <div><img :src="cocktail.imageUrl" width="200"></div>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
    </template>
    ```
    </details>

1. For each cocktail display the list of ingredients and their required quantities.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div id='app'>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
          <div><img :src="cocktail.imageUrl" width="200"></div>
          <ul>
            <li v-for="ingredient in cocktail.ingredients">
              {{ingredient.quantity}} {{ingredient.title}}
            </li>
          </ul>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
    </template>
    ```
    </details>

1. For each ingredient, that has a price, display price in CHF.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <div id='app'>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
          <div><img :src="cocktail.imageUrl" width="200"></div>
          <ul>
            <li v-for="ingredient in cocktail.ingredients">
              {{ingredient.quantity}} {{ingredient.title}}
              <strong v-if="ingredient.price">CHF {{ingredient.price}}</strong>
            </li>
          </ul>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
    </template>
    ```
    </details>

1. Now let's try out some more conditional rendering and create a button that toggles the display of prices:
    
    - Prices should be initially hidden.
    - When the prices are hidden, button text is "Show prices".
    - When the prices are displayed, button text should change to "Hide prices".
    
   As we know, there are a few directives, that could help us achieve the desired effect. Choose the one you like.
         
   <details>
    <summary>Hint</summary>
    
    Here's a version with v-if:

    ```vue
    <template>
      <div id='app'>
        <button v-on:click="displayPrices = !displayPrices" v-text="displayPrices ? 'Hide prices' : 'Show prices'"></button>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
          <div><img :src="cocktail.imageUrl" width="200"></div>
          <ul>
            <li v-for="ingredient in cocktail.ingredients">
              {{ingredient.quantity}} {{ingredient.title}}
              <strong v-if="displayPrices && ingredient.price">CHF {{ingredient.price}}</strong>
            </li>
          </ul>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
    </template>  
    ```
   </details>
    
1. Try accomplishing the previous task with a different directive. Do you notice the difference when you inspect the DOM in a browser?

    <details>
    <summary>Hint</summary>
    
    Here's a version with v-show:
    
    ```vue
    <template>
      <div id='app'>
        <button v-on:click="displayPrices = !displayPrices" v-text="displayPrices ? 'Hide prices' : 'Show prices'"></button>
        <div v-for="cocktail in cocktails">
          <h3>
            {{cocktail.title}}
          </h3>
          <div><img :src="cocktail.imageUrl" width="200"></div>
          <ul>
            <li v-for="ingredient in cocktail.ingredients">
              {{ingredient.quantity}} {{ingredient.title}}
              <strong v-if="ingredient.price" v-show="displayPrices">CHF {{ingredient.price}}</strong>
            </li>
          </ul>
          <div v-html="cocktail.method"></div>
        </div>
      </div>
   </template>
    ```
    </details>
