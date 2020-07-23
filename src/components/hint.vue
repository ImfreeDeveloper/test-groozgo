<template>
  <div class="hint"
    @mouseover="open=true"
    @mouseout ="open=false"
  >
    <span>?</span>
    <p class="popover top popover_not_ws" v-if="open">{{ hintLabel }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      open: false
    }
  },
  props: [
    'hintLabel'
  ]
}
</script>
