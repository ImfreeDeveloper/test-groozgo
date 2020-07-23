<template>
  <div
      class="hamburger-menu"
      :class="{'open': value}"
      @click="openHandler"
  >
    <label class="menu__btn">
      <span></span>
    </label>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    openHandler () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
