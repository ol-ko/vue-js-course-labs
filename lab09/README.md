# Lab 9 - Component lifecycle

1. Run `yarn && yarn serve` inside this folder.
1. In your IDE, open the `src` folder and explore the code. 
1. Let's take a closer look at the `SimilarCocktails` component.
This component is responsible for fetching the similar cocktails via an API,
but to make an API call we need a current `cocktailId`, which is passed through as a prop.
Note how we only perform an API call, when component is `mounted`.

    <details>
    <summary>Look at the component lifecycle diagram:</summary>
    
    ![component lifecycle diagram](https://vuejs.org/images/lifecycle.png)
    </details>
 
    What other hooks can we use to do the initial data fetching?
    And which ones are not suitable? Why?

    <details>
    <summary>Hint</summary>
    
    - beforeCreate: not possible, the value of the prop will not arrive yet
    - created: possible, best point, because it's the earliest
    - beforeMount: possible
    - mounted: possible
    - beforeUpdate, updated: not a good idea for an initial data fetch - these hooks won't get fired until the prop changes to a different value
    - beforeDestroy, destroyed - these are simply too late
    </details>

    Try different lifecycle hooks in place of `created` and test by opening and reloading the cocktail details. 
    Don't forget to look into browser console for errors!
    Restore the code to use `created` hook after testing.
    
1. Now let's try something.
Open `http://localhost:8080/cocktails/aperol-spritz`.
Scroll to the similar cocktails section and remember which cocktails are there.
Now click on the first suggestion and scroll to the similar cocktails again.
You will see exactly same 3 cocktails as before, one of them being the currently viewed recipe.
Something is wrong.
In the Network tab of the browser console you will notice that the API has only been called once.
Why do you think this happens?

    <details>
    <summary>Hint</summary>
    
    Since we are staying on the same route we aren't re-mounting the `SimilarCocktails` component.
    Therefore `created` hook doesn't get called anymore and the new suggestions aren't loaded.
    </details> 

1. It seems like `created` hook isn't enough to achieve what we need.
But `beforeUpdated` seems like a good match - it will get fired when the component is about to update. 
Let's add the following to the `SimilarCocktails` component:

    ```vue
    <script>
      export default {
        ....
        beforeUpdate() {
          console.log('beforeUpdate triggered. Calling API...');
          this.loadSimilarCocktails()
        },
        ....
      }
    </script>
    ```

    
1. Now let's test the page but with browser developer tools open in the Console tab.
Look how many times does the API get called. Looks like we're in an endless loop!
Quickly close the browser tab so that we don't call the API so often.
Now what exactly happened there?

    <details>
    <summary>Hint</summary>
    
    Our `this.loadSimilarCocktails()` method has a side-effect - it changes the value of the `similarCocktails` data property and that triggers a DOM update.
    Then of course `beforeUpdate` gets called again and we find ourselves in an endless loop of API calls and DOM updates.
    </details> 

1. Looks like performing an action with a side-effect like this wasn't a good idea after all.
What else can we use to react to prop updates?

    <details>
    <summary>Hint</summary>
    
    We can use a watcher!
    ```vue
    <script>
      ....
    
      export default {
        ....
        props: {
          cocktailId: String
        },
        created() {
          this.loadSimilarCocktails()
        },
        ....
        watch: {
          cocktailId() {
            this.loadSimilarCocktails();
          }
        }
      }
    </script>
    ```
    </details> 
