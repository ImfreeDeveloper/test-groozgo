<template>
  <div
      class="hamburger-menu"
      :class="{'open': isOpen}"
      @click="openHandler"
  >
    <label class="menu__btn">
      <span></span>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    openHandler () {
      this.isOpen = !this.isOpen
      this.$emit('handlerOpen', this.isOpen)
    }
  }
}
</script>
