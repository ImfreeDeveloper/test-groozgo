<template>
  <div class="wrp-field">
    <label :class="{'text-warning': validError || serverError.length }">
      {{ label }}
      <hint
        v-if="hintLabel"
        :hintLabel="hintLabel"
      />
    </label>
    <input v-if="setMask"
        type="text"
        :placeholder="placeholder"
        :value="value"
        v-on="inputListeners"
        :class="{'is-danger': validError || serverError.length}"
        :disabled="disabled"
        v-mask="setMask"
    />
    <input
        v-else
        type="text"
        :placeholder="placeholder"
        :value="value"
        v-on="inputListeners"
        :class="{'is-danger': validError || serverError.length}"
        :disabled="disabled"
    />
    <p class="text-warning" v-if="validError">{{ validErrorText }}</p>
    <div class="errors-server" v-if="serverError.length">
      <p class="text-warning" v-for="(error, idx) in serverError" :key="idx">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import hint from '../hint.vue'

export default {
  components: {
    hint
  },
  props: [
    'hintLabel',
    'disabled',
    'label',
    'value',
    'validError',
    'validErrorText',
    'serverError',
    'setMask',
    'placeholder'
  ],
  computed: {
    inputListeners: function () {
      let vm = this
      return Object.assign({},
        // Все слушатели из родителя
        this.$listeners,
        // Перезаписать поведение некоторых существующих.
        {
          // Это обеспечит, что будет работать v-model на компоненте
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  }
}
</script>
