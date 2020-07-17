<template>
  <div class="wrapper">
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (Err) {
      console.log(Err)
    }
  }
}
</script>
