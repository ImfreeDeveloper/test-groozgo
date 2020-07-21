<template>
  <div class="v-alert" :class="type">
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>
