export default {
  computed: {
    currency() {
      return this.$store.state.currency;
    },
    locale() {
      return this.$store.state.locale;
    }
  }
}
