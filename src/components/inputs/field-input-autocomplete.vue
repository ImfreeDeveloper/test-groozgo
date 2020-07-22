<template>
  <div class="wrp-field">
    <label :class="{'text-warning': validError || serverError.length }">{{ label }}</label>
    <autocomplete
        :search="asyncFind"
        :placeholder="placeholder"
        v-mask="setMask"
        v-on="inputListeners"
        :class="{'is-danger': validError || serverError.length}"
        :get-result-value="getResultValue"
        @submit="onSubmit"
        :value="value"
    >
      <template #result="{ result, props }">
        <li
            v-bind="props"
            class="autocomplete-result"
        >
          <p class="title">
            {{ result.data.name.payment }}
          </p>
          <div class="descr">
            <p>{{ result.data.bic }}</p>
            <p>{{ result.data.address.value }}</p>
          </div>
        </li>
      </template>
    </autocomplete>
    <p class="text-warning" v-if="validError">{{ validErrorText }}</p>
    <div class="errors-server" v-if="serverError.length">
      <p class="text-warning" v-for="(error, idx) in serverError" :key="idx">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import { fetchBik } from '../../js/repository/repository'
export default {
  components: {
    Autocomplete
  },
  data () {
    return {
      endpoint: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank'
    }
  },
  props: [
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
  },
  methods: {
    async asyncFind (query) {
      if (query.length < 1) {
        return []
      }
      let formData = {
        count: 5,
        query
      }
      const bikBanks = await fetchBik('post', this.endpoint, formData)
      return bikBanks.data.suggestions
    },
    getResultValue (result) {
      return result.data.bic
    },
    onSubmit (value) {
      this.$emit('submit', value)
    }
  }
}
</script>
