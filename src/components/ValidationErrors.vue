<template>
  <ul class="error-messages">
    <li v-for="errorMessage in errorMessages" :key="errorMessage">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "McvValidationErrors",
  props: {
    // входные параметры из Registering
    validationErrors: {
      type: Object,
      required: true
    }
  },
  data: () => ({}),
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    }
  },
}
</script>

<style scoped>

</style>