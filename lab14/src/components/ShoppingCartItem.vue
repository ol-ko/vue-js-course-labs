<template>
  <div :class="[$style.item, skin]">
    <div>
      <strong>{{ title }}</strong> <br />
      {{ price | price(locale, currency) }} <br />
      Qty: {{ quantity }}
    </div>
    <div :class="$style.button">
      <button @click="$emit('removeItem', title)">Remove</button>
    </div>
  </div>
</template>

<script>
  import localizationMixin from '@/localizationMixin';

  export default {
    props: {
      title: String,
      price: Number,
      quantity: Number,
      skin: String
    },
    mixins: [localizationMixin]
  }
</script>

<style module>
  .item {
    padding: 10px 40px;
    display: flex;
  }

  .item > * {
    flex: 1 1 50%;
  }

  .button {
    text-align: right;
  }
</style>
