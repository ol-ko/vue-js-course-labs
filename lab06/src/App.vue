<template>
  <div id='app'>
    <section>
      <h1>Order form</h1>
      <em>--> Your form goes here <--</em>
    </section>
    <section>
      <h1>Data preview:</h1>
      <div>
        Name:
        <pre>{{name}}</pre>
      </div>
      <div>
        Address:
        <pre>{{address}}</pre>
      </div>
      <div>
        Delivery method:
        {{deliveryMethod}}
      </div>
      <div v-if="store">
        Pickup store:
        {{store}}
      </div>
      <div>
        Email types:
        <span v-for="emailType in emailTypes">{{emailType}} </span>
      </div>
      <div>
        Comment:
        <div>
          <pre>{{comment}}</pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        address: '',
        deliveryMethod: undefined,
        store: undefined,
        emailTypes: [],
        comment: ''
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
  }

  #app > * {
    padding: 0 20px;
    box-sizing: border-box;
  }

  pre {
    display: inline-block;
    color: white;
    background: black;
    margin: 0;
  }
</style>
