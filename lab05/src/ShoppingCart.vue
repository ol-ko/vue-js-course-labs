<template>
  <section>
    <h1>Shopping cart</h1>
    <ul>
      <li v-for="(data, title) in items">
        {{title}} CHF {{data.price}}
        Qty: {{data.quantity}}
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    props: {
      items: Object
    }
  }
</script>
