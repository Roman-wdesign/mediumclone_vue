<template>
<div>{{message}}</div>
</template>

<script>
export default {
  name: "McvErrorMessage",
  props: {
    message: {
      type: String,
      default: 'You have some error',
      required: false
    },
  },
}
</script>

<style scoped>

</style>