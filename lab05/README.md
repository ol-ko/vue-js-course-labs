# Lab 5 - Computed properties and watchers

1. Run `yarn && yarn serve` inside this folder. Open the website and see the application with three sections - Recipes, Favorites and Shopping cart. 
1. In your IDE, open the `src` folder and explore the code. Our application has components now and is a bit more organized.
1. Now that we have individual ingredients in our shopping cart, let's display the total amount.
In a template of a `ShoppingCart.vue` component display a total amount in CHF. Mind that ingredients have quantity!
Not sure how to find the sum in one line of code? Not a big deal! Ask your neighbour for some [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) advice :)

    <details>
    <summary>No helpful neighbours around?</summary>
    
    A little Javascript reminder!    
    `items` is an object, which in our case has a structure like
    
    ```js
    {
       Aperol: {
         price: 12.45,
         quantity: 3
       },
       Prosecco: {
         price: 11.45,
         quantity: 2
       },
       ....
    }
    ```  
    
    We would like to: 
    - iterate through all the values of this object
    - multiply price by quantity and sum the results up.
    
    We could of course write a classic loop, but this kind of code will not work in an template.
    
    To do such things in one line, we can use the [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.
    And to get all values of an object as an array, we can use [Object.values() function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)   
    
    Isn't functional programming just lovely?
    </details>    

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <section>
        <h1>Shopping cart</h1>
        <ul>
          <li v-for="(data, title) in items">
            {{title}} CHF {{data.price}}
            Qty: {{data.quantity}}
          </li>
        </ul>
        <p>
          Total: CHF {{Object.values(this.items).reduce((sum, item) => (sum + item.price * item.quantity), 0)}}
        </p>
      </section>
    </template>
    ```
    </details>

1. Even if you are that Javascript-savvy neighbour, such statements don't look pretty in templates.
Even worse if you have to use the result value several times! Let's extract this code into a computed property.

    <details>
    <summary>Hint</summary>

    ```vue
    <template>
      <section>
        <h1>Shopping cart</h1>
        <ul>
          <li v-for="(data, title) in items">
            {{title}} CHF {{data.price}}
            Qty: {{data.quantity}}
          </li>
        </ul>
        <p>
          Total: CHF {{total}}
        </p>
      </section>
    </template>
    
    <script>
      export default {
        props: {
          items: Object
        },
        computed: {
          total() {
            return Object.values(this.items).reduce((sum, item) => (sum + item.price * item.quantity), 0);
          }
        }
      }
    </script>
    ```
    </details>

1. Much better! Now that we know how to declare computed properties, let's add a few more.
Our liquor retail partner puts a delivery price of CHF 12 on all the orders that amount to less than CHF 100.
Let's adjust our template to display a shopping cart subtotal, delivery price and a total amount to pay.
It should look like this:

    ```text
    Subtotal: CHF 54.12
    Delivery fee: CHF 12
    Total: CHF 66.12
    
    or
    
    Subtotal: CHF 100
    Delivery fee: CHF 0
    Total: CHF 100
    ```  
    
    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <section>
        ....
        <p>
          Subtotal: CHF {{subtotal}}<br>
          Delivery fee: CHF {{deliveryFee}}<br>
          Total: CHF {{total}}
        </p>
      </section>
    </template>
    
    <script>
      export default {
        props: {
          items: Object
        },
        computed: {
          subtotal() {
            return Object.values(this.items).reduce((sum, item) => (sum + item.price * item.quantity), 0);
          },
          deliveryFee() {
            return this.subtotal < 100 ? 12 : 0;
          },
          total() {
            return this.subtotal + this.deliveryFee;
          }
        }
      }
    </script>
    ```
    </details>
    
1. Oh snap, a new requirement has arrived.
Our partner liquor store has launched a promo campaign - users that sign up for their newsletter get a one-time promo code for a 10% discount for their next order.
We even get provided an API, that tells us whether the promo code is valid.
All that's left to do is to adjust our application.   
Add the following code to the `ShoppingCart.vue` component:

    Into the `<template>` section:
    
    ```vue
    Enter your 10-digit promo code:
    <input type="text" v-model="promoCode">
    <div v-if="applyPromotion"><strong>10% promo discount applied to your total amount!</strong></div>
    ```
    
    Into the `<script>` section:
    
    ```vue
    export default {
        data() {
          return {
            ....
            applyPromotion: false,
            promoCode: ''
          }
        },
        ....
    }
    ```
    
    Now we have a field for the users to enter a promo code. 
    
1. Now let's call the API. Our app has `axios` library pre-installed, which you can import like: 

    ```js
    import axios from 'axios';
    ```
    
    Using `axios` you can get the verdict about the promo code validity like this:
    
    ```js
    const response = await axios.get('https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/isPromoCodeValid?promoCode=1234567890');
    const isValid = response.data;
    ```

    Now our partners have told us, that all the valid codes would be 10 symbols long.
    So our task is to make an *asynchronous* call to the API as soon as the user enters something long enough into the input field.
    If the promo code is correct, let's apply the discount to the total.
    
    <details>
    <summary>BTW, the correct promo code is...</summary>
    
    `drinks2019`
    </details>    
    
    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <section>
        ....
        Enter your 10-digit promo code:
        <input type="text" v-model="promoCode">
        <div v-if="applyPromotion"><strong>10% promo discount applied to your total amount!</strong></div>
        <p>
          Subtotal: CHF {{subtotal}}<br>
          Delivery fee: CHF {{deliveryFee}}<br>
          Total: CHF {{total}}
        </p>
      </section>
    </template>
    
    <script>
      import axios from 'axios';
      export default {
        ....
        computed: {
          ....
          total() {
            return (this.subtotal + this.deliveryFee) * (this.applyPromotion ? 0.9 : 1);
          }
        },
        watch: {
          // note the use of async/await here
          async promoCode(value) {
            if (value.length === 10) {
              const response = await axios.get(`https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/isPromoCodeValid?promoCode=${value}`);
              this.applyPromotion = response.data;
    
            } else {
              this.applyPromotion = false;
            }
          }
        }
      }
    </script>

    ```
    </details>

### Bonus track

What happens if we use methods instead of computed properties? 

1. To compare both approaches, let's replace a `total` computed property with a method.

    <details>
    <summary>Hint</summary>
    
    ```vue
    <template>
      <section>
        ....
        <p>
          Subtotal: CHF {{subtotal}}<br>
          Delivery fee: CHF {{deliveryFee}}<br>
          Total: CHF {{total()}}
        </p>
      </section>
    </template>
    
    <script>
      export default {
        props: {
          items: Object
        },
        computed: {
          subtotal() {
            return Object.values(this.items).reduce((sum, item) => (sum + item.price * item.quantity), 0);
          },
          deliveryFee() {
            return this.subtotal < 100 ? 12 : 0;
          }
        },
        methods: {
          total() {
            return this.subtotal + this.deliveryFee;
          }
        }
      }
    </script>
    ```
    </details>

1. Now let's set up the experiment. Create a "Toggle shopping cart" button, that toggles the display of the totals section.

     <details>
     <summary>Hint</summary>
     
     ```vue
     <template>
       <section>
         ....
         <button @click="showTotals = !showTotals">Show/hide totals</button>
         <p v-if="showTotals">
           Subtotal: CHF {{subtotal}}<br>
           Delivery fee: CHF {{deliveryFee}}<br>
           Total: CHF {{total()}}
         </p>
       </section>
     </template>
     
     <script>
       export default {
         data() {
           return {
             showTotals: true
           }
         },
         ....
       }
     </script>

     ```
     </details>

1. Now, when we click this button, the contents of the cart do not change, but the portion of the template containing totals gets re-rendered.
Let's see how often computed properties get called in comparison to the method.
Add a different `console.log` statement to both computed properties and the method.

    <details>
     <summary>Hint</summary>
     
     ```vue
     <script>
       export default {
         ....
         computed: {
           subtotal() {
             console.log('subtotal called');
             return Object.values(this.items).reduce((sum, item) => (sum + item.price * item.quantity), 0);
           },
           deliveryFee() {
             console.log('deliveryFee called');
             return this.subtotal < 100 ? 12 : 0;
           }
         },
         methods: {
           total() {
             console.log('total called');
             return this.subtotal + this.deliveryFee;
           }
         }
       }
     </script>

     ```
     </details>

1. Run the application in a browser with the console open.
Notice which console statements appear when you add items to cart and when you only show/hide the totals section.
Can you explain the behaviour?
What would you rather use for calculating a total in this case - computed property or method?

