# Lab 13 - Testing

1. Run `yarn && yarn serve` inside this folder.
1. In your IDE, open the `src` folder and explore the code. Note the `tests` folder and an example test file.
1. Run `yarn test:unit` inside the project folder. This command will run all the unit tests once.
1. Run `yarn test:unit --watchAll` inside the project folder. This command will watch for changes in both tests and application code and re-run all tests on each change.
It could be stopped by pressing `Cmd+C`. 

1. Now let's take a look at our only test suite so far: `tests/unit/CocktailListItem.spec.js`. 
This test tests the `CocktailListItem.vue` component by shallowly mounting it in isolation. 
We provide some values for the mandatory properties and the stub for the `router-link` component we use.
We assert that the title and description are displayed.
Now let's open `CocktailListItem.vue` component and remove the line, that displays the title to see our test fail.
Revert the change and see the test pass.

1. Now let's also test that the image with the given URL is displayed.

    <details>
    <summary>Hint</summary>
    
    To do this we can simply add the following assertion:
    ```js
    expect(wrapper.find('img').attributes('src')).toEqual(testCocktail.imageUrl);
    ```
    </details>

1. Let's add a snapshot test for this component.

    <details>
    <summary>Hint</summary>
    
    ```js
    it('matches the snapshot', () => {
    const wrapper = shallowMount(CocktailListItem, {
      propsData: {
        cocktail: testCocktail
      },
      stubs: ['router-link']
    });
    expect(wrapper).toMatchSnapshot();
    });
    ```
    </details>

1. Note how a __snapshots__ folder gets created when you run the snapshot test for the first time.
Open the `tests/unit/__snapshots__/CocktailListItem.spec.js.snap` file and see how it looks like.
Note that instead of changing into an `<a>` tag, like it happens when you run the application, `<router-link>` gets replaced with the `<router-link-stub>`.

    From now on, if you change either test or application code in such a way, that it results in a different snapshot - this test will fail.
    If such change was intended, we can re-generate the snapshot by either physically removing the file and running the test, or by running the test with the `-u` flag.
    
    Now try removing the `stubs: ['router-link']` part and run test with the `-u` flag.

    <details>
    <summary>Hint</summary>
    
    The `router-link` doesn't get stubbed and Vue throws a warning like this:
    `[Vue warn]: Unknown custom element: <router-link> - did you register the component correctly? For recursive components, make sure to provide the "name" option.`
    </details>

1. Now how do we test that the `router-link` points to the correct route?
We can provide our own mock implementation of the `router-link` component or we can mock the entire router.
Let's try both, starting with the first.
Create a new test, where you shallowMount the component with the `router-link` stubbed as a mock component:

    ```js
    it('links to cocktail page', () => {
    const wrapper = shallowMount(CocktailListItem, {
      propsData: {
        cocktail: testCocktail
      },
      stubs: {
        ['router-link']: {
          template: '<div>{{to}}</div>',
          props: ['to']
        }
      }
    });
    ```

    To provide a mock component as a stub, it's enough to specify an object, that has a `template` property with the mock template.
    As we want to test whether we pass correct parameters to the `router-link`, we define that our mock component also receives the `to` property.
    To be able to test it, we render it in our template string.
    
    Now let's add the assertion:

    ```js
    const expectedRoute = { name: 'cocktail', params: { id: 'TestCocktailId' } };
    
    expect(wrapper.text()).toEqual(expectedRoute);
    ```

    `expectedRoute` contains the set of parameters we expect to be passed to the `router-link` component.
    Now it's passed to our mock component instead, that just renders them - so it's easy for us to verify by comparing the text of the mounted component.
    The only caveat here is that both `expectedRoute` and the `to` property of the mock component are objects.
    So let's use `JSON.stringify` on them.

    <details>
    <summary>Full working test</summary>
    
    ```js
    it('links to cocktail page', () => {
    const wrapper = shallowMount(CocktailListItem, {
      propsData: {
        cocktail: testCocktail
      },
      stubs: {
        ['router-link']: {
          template: '<div>{{JSON.stringify(to)}}</div>',
          props: ['to']
        }
      }
    });
    
    const expectedRoute = { name: 'cocktail', params: { id: 'TestCocktailId' } };
    
    expect(wrapper.text()).toEqual(JSON.stringify(expectedRoute));
    ```
    </details>

1. Now let's try to test a component, that depends on Vuex store.
In a separate file create a simple snapshot test for the `ShoppingCart.vue` component.
Let's shallowMount and not mock anything yet. What happens if you run this test and why?

    <details>
    <summary>Hint</summary>
    
    `ShoppingCart.spec.js`
    ```js
    import { shallowMount } from '@vue/test-utils';
    import ShoppingCart from '@/views/ShoppingCart.vue';
    
    describe('ShoppingCart.vue', () => {
      it('matches the snapshot', () => {
        const wrapper = shallowMount(ShoppingCart);
        expect(wrapper).toMatchSnapshot();
      });
    });
    ```

    When you run this test, you will get an error from Vue `[Vue warn]: Error in render: "TypeError: Cannot read property 'state' of undefined"`.
    Since our component is mounted in isolation, it doesn't know anything about the Vuex store.
    </details>

1. Now let's use `mocks` property to provide a mock for the Vuex store.
`ShoppingCart.vue` component only subscribes to the part of the store's state and doesn't use getters, so that's all we have to mock.
Adjust your test like the following and run it. Take a look at the newly created snapshot.

    ```js
    describe('ShoppingCart.vue', () => {
      it('matches the snapshot', () => {
        const wrapper = shallowMount(ShoppingCart, {
          mocks: {
            $store: {
              state: {
                shoppingCartItems: {
                  testIngredient: {
                    price: 111.222,
                    quantity: 2
                  }
                },
                locale: 'CHF',
                currency: 'XYZ'
              }
            }
          }
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
    ```

1. Now our store is mocked, but Vue throws another warning: `[Vue warn]: Failed to resolve filter: price`
Indeed, our isolated component knows nothing about the global `price` filter.
To provide global filters, mixins or plugins (or the mocks of them) during testing without polluting the global Vue constructor,
we can create a separate instance of Vue just for the current test. Remember how `vue-test-utils` provides `createLocalVue` method for that?

    <details>
    <summary>Hint</summary>
    
    ```js
    import { shallowMount, createLocalVue } from '@vue/test-utils';
    import ShoppingCart from '@/views/ShoppingCart.vue';
    
    const localVue = createLocalVue()
    localVue.filter('price', (value, locale, currency) => {
       return `${value} ${locale} ${currency}`;
     })
    
    describe('ShoppingCart.vue', () => {
      it('matches the snapshot', () => {
        const wrapper = shallowMount(ShoppingCart, {
          localVue,
          mocks: {
            $store: {
              ....
            }
          }
        });
        expect(wrapper).toMatchSnapshot();
      });
    });
    ```
    </details>

1. Now let's test something interactive. `ShoppingCartItem` component emits an event, when user clicks the `Remove` button.
In a new file let's create a test for the `ShoppingCartItem` component, with some dummy assertion for now.
(We still have to provide a filter and Vuex state for locale and currency because this component depends on them too)

    <details>
    <summary>Hint</summary>
    
    ```js
        import { shallowMount, createLocalVue } from '@vue/test-utils';
        import ShoppingCartItem from '@/components/ShoppingCartItem.vue';
        
        const localVue = createLocalVue()
        localVue.filter('price', (value, locale, currency) => {
          return `${value} ${locale} ${currency}`;
        })
        
        describe('ShoppingCartItem.vue', () => {
          it('matches the snapshot', () => {
            const wrapper = shallowMount(ShoppingCartItem, {
              localVue,
              propsData: {
                title: 'testIngredient',
                price: 111.222,
                quantity: 2
              },
              mocks: {
                $store: {
                  state: {
                    locale: 'CHF',
                    currency: 'XYZ'
                  }
                }
              }
            });
        
            expect(true).toEqual(false);
          });
        });
        ```
    </details>

1. Now let's trigger an event on a button and verify that correct custom event gets emitted.

   <details>
   <summary>Hint</summary>
   
   ```js
   ....
   describe('ShoppingCartItem.vue', () => {
     it('matches the snapshot', () => {
       const wrapper = shallowMount(ShoppingCartItem, {
         ....
       });
   
       const button = wrapper.find('button');
       button.trigger('click');
       expect(wrapper.emitted('removeItem')[0][0]).toEqual('testIngredient');
     });
   });
   ```
   
   To get a DOM element, we can use wrapper's `find` method that accepts CSS selectors.
   To trigger a DOM event, we use `trigger` method.
   In our assertion, we access wrapper's `emitted()` method, that returns an object, containing all custom events emitted on the component instance during testing.
   Called with a parameter, representing event name, we get an array of all instances of this event being emitted, each with its set of arguments.
   
   For example, if an event `myEvent` has been emitted first as `$emit('myEvent', 'aaa', '111')` and second time as `$emit('myEvent', 'bbb', '222')`,
   the `emitted()` would return:
   
   ```js
   {
     myEvent: [ ['aaa', '111'], ['bbb', '222'] ]
   }
   ```  
   </details> 

1. Now that we test that `ShoppingCartItem` can emit events, let's test that they are properly handled in parent component.
Remember how we can simulate custom events being emitted from child components?
Let's add a test to the `ShoppingCart.spec.js` that verifies that `removeIngredientFromShoppingCart` store mutation is called correctly when `ShoppingCartItem` component emits a `removeItem` event.
Since we need to spy on the mutation function being called, we will need to mock the store by using `createLocalVue` and a constructor `new Vuex.Store()`. 

    Here's help:
    
    ```js
    import { shallowMount, createLocalVue } from '@vue/test-utils';
    import Vuex from 'vuex';
    import ShoppingCart from '@/views/ShoppingCart.vue';
    import ShoppingCartItem from '@/components/ShoppingCartItem.vue';
    
    const localVue = createLocalVue()
    localVue.use(Vuex);
    
    it('on "removeItem" deletes the item from shopping cart', () => {
        const mutationMock = jest.fn();
        const wrapper = shallowMount(ShoppingCart, {
          localVue,
          store: new Vuex.Store({
            state: {
              shoppingCartItems: {
                testIngredient: {
                  price: 111.222,
                  quantity: 2
                }
              },
              locale: 'CHF',
              currency: 'XYZ'
            },
            mutations: {
              removeIngredientFromShoppingCart: mutationMock
            }
          })
        });
        
        // fill in the rest of the test...
    }
    ```


    <details>
    <summary>Hint</summary>
    
    ```js
    it('on "removeItem" deletes the item from shopping cart', () => {
        const mutationMock = jest.fn();
        const wrapper = shallowMount(ShoppingCart, {
          localVue,
          store: new Vuex.Store({
            state: {
              shoppingCartItems: {
                testIngredient: {
                  price: 111.222,
                  quantity: 2
                }
              },
              locale: 'CHF',
              currency: 'XYZ'
            },
            mutations: {
              removeIngredientFromShoppingCart: mutationMock
            }
          })
        });
    
        wrapper.find(ShoppingCartItem).vm.$emit('removeItem', 'testIngredient');
        expect(mutationMock).toHaveBeenCalled();
        expect(mutationMock.mock.calls[0][1]).toEqual('testIngredient');
        expect(wrapper.text()).not.toContain('testIngredient');
    });
    ```
    </details>

1. The last thing we are going to try is to test some asynchronous behaviour.
In the `ShoppingCart` component user can enter the promo code, which will be validated via an API call.
Let's mock axios call to always return `true`, and check whether success message gets displayed.

    <details>
    <summary>Hint</summary>
    
    ```js
      jest.mock('axios', () => ({
        get: jest.fn().mockResolvedValue({ data: true })
      }));
       
      ....
   
      it('checks promo-code asynchronously', async () => {
        const wrapper = shallowMount(ShoppingCart, {
          localVue,
          store: new Vuex.Store({
            state: {
              shoppingCartItems: {
                testIngredient: {
                  price: 111.222,
                  quantity: 2
                }
              },
              locale: 'CHF',
              currency: 'XYZ'
            }
          })
        });
    
        const promoCodeInput = wrapper.find('input');
        promoCodeInput.element.value = 'testPromoCode';
        promoCodeInput.trigger('input');
        wrapper.find('button').trigger('click');
    
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('10% promo discount');
      });
    ```
    </details>
    
