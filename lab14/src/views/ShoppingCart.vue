<template>
  <section>
    <h1>Shopping cart</h1>
    <div :class="$style.items">
      <div v-if="hasItems">
        <ul>
          <li v-for="(data, title, index) in items">
            <ShoppingCartItem
                :title="title"
                :price="data.price"
                :quantity="data.quantity"
                :skin="(index % 2 === 1) ? $style.evenShoppingListItem : ''"
                @removeItem="removeFromShoppingList">
            </ShoppingCartItem>
          </li>
        </ul>
      </div>
      <div v-if="hasItems" :class="$style.totals">
        <p>Enter your 10-digit promo code:</p>
        <input type="text" v-model="promoCode" :class="$style.promoCodeInput"/>
        <button @click="validatePromoCode">Apply promotion code</button>
        <p v-if="applyPromotion">
          <strong>10% promo discount applied to your total amount!</strong>
        </p>

        <p>
          Subtotal: {{ subtotal | price(locale, currency) }}<br />
          Delivery fee: {{ deliveryFee | price(locale, currency) }}<br />
          Total: {{ total | price(locale, currency) }}
        </p>
      </div>
      <div v-else>
        Let's add some ingredients!
      </div>
    </div>
  </section>
</template>

<script>
  import axios from "axios";
  import ShoppingCartItem from '@/components/ShoppingCartItem';
  import localizationMixin from '@/localizationMixin';

  export default {
    components: {
      ShoppingCartItem
    },
    mixins: [localizationMixin],
    data() {
      return {
        showTotals: true,
        applyPromotion: false,
        promoCode: ""
      };
    },
    computed: {
      items() {
        return this.$store.state.shoppingCartItems;
      },
      hasItems() {
        return Object.keys(this.items).length > 0;
      },
      subtotal() {
        return Object.values(this.items).reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
      deliveryFee() {
        return this.subtotal < 100 ? 12 : 0;
      },
      total() {
        return (
          (this.subtotal + this.deliveryFee) * (this.applyPromotion ? 0.9 : 1)
        );
      }
    },
    methods: {
      removeFromShoppingList(ingredientTitle) {
        this.$store.commit('removeIngredientFromShoppingCart', ingredientTitle);
      },
      async validatePromoCode() {
        if (this.promoCode.length === 10) {
          const response = await axios.get(
            `https://anca22974l.execute-api.eu-central-1.amazonaws.com/dev/isPromoCodeValid?promoCode=${this.promoCode}`
          );
          this.applyPromotion = response.data;
        } else {
          this.applyPromotion = false;
        }
      }
    }
  };
</script>

<style module>
  .items ul {
    list-style-type: none;
    padding: 0;
    margin: 0 -40px;
  }

  .totals {
    margin-top: 40px;
    border-top: 2px dashed black;
  }

  .evenShoppingListItem {
    background: #f0f0f0;
  }

  .promoCodeInput {
    margin-right: 1em;
  }
</style>
