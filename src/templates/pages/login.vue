<template>
  <div class="container">
    <div class="row">
      <div class="auth">
        <h2>Вход</h2>
        <form @submit.prevent="submitHandler">
          <p class="wrp-field">
            <input
              type="text"
              placeholder="Номер телефона"
              v-model="phone"
              v-mask="'+7 (###) ### - ## - ##'"
              @focus="setStartInput"
              @blur="validateField('phone')"
              :class="{'is-danger': $v.phone.$error}"
            />
            <span class="popover popover-right" v-if="$v.phone.$error">Введите корректный номер телефона</span>
          </p>
          <p class="wrp-field">
            <input
              type="password"
              placeholder="Пароль"
              v-model="password"
              @blur="validateField('password')"
              :class="{'is-danger': $v.password.$error}"
            />
            <span class="popover popover-right" v-if="$v.password.$error">Введите пароль</span>
          </p>
          <button class="btn btn-secondary" :disabled="showLoader">
            <span class="btn-loader" v-if="showLoader"></span>
            Войти
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      phone: '',
      password: '',
      showLoader: false
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(22)
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    setStartInput () {
      if (!this.phone.length) {
        this.phone = ' ('
      }
    },
    async submitHandler () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let formData = {
          phone: getValidPhone(this.phone),
          password: this.password
        }
        this.showLoader = true

        try {
          await this.$store.dispatch('login', formData)
          setTimeout(() => {
            this.showLoader = false
            this.$router.push('/profile')
          }, 1000)
        } catch (e) {
          this.showLoader = false
        }
      }
    },
    validateField (vmfield) {
      if (vmfield === 'phone') {
        this[vmfield] = this[vmfield] === '+7 (' ? '' : this[vmfield]
      }
      this.$v[vmfield].$touch()
    }
  }
}

function getValidPhone (phone) {
  return phone.replace(/\D+/g, '').slice(1)
}
</script>
