<template>
  <div :class="[$style.item, skin]">
    <strong>{{ title }}</strong> <br />
    CHF {{ price }} <br />
    Qty: {{ quantity }}
    <button @click="$emit('removeItem', title)">Remove</button>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      price: Number,
      quantity: Number,
      skin: String
    }
  }
</script>

<style module>
  .item {
    padding: 10px 40px;
  }
</style>
