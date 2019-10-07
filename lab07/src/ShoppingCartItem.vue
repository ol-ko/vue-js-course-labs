<template>
  <div class="item">
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
      quantity: Number
    }
  }
</script>

<style>
  .item {
    padding: 10px 40px;
  }
</style>
