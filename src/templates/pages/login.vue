<template>
  <div class="container">
    <div class="row">
      <div class="auth">
        <h2>Вход</h2>
        <div class="wrap-errors" v-for="(errors, idx) in errorsAuth" :key="idx">
          <p class="text-warning" v-for="(error, idx) in errors" :key="idx">{{error}}</p>
        </div>

        <form @submit.prevent="submitHandler">
          <div class="wrp-field">
            <input
              type="text"
              placeholder="Номер телефона"
              v-model="phone"
              v-mask="'+7 (###) ### - ## - ##'"
              @focus="setStartInput"
              @blur="validateField('phone')"
              :class="{'is-danger': $v.phone.$error}"
            />
            <p class="popover right" v-if="$v.phone.$error">Введите корректный номер телефона</p>
          </div>
          <div class="wrp-field">
            <input
              type="password"
              placeholder="Пароль"
              v-model="password"
              @blur="validateField('password')"
              :class="{'is-danger': $v.password.$error}"
            />
            <p class="popover right" v-if="$v.password.$error">Введите пароль</p>
          </div>
          <div class="gorizontal">
            <button class="btn btn-secondary" :disabled="showLoader">
              <span class="btn-loader" v-if="showLoader"></span>
              Войти
            </button>
            <a href="#" class="link-no-decorate">
              <span>Забыли пароль?</span>
            </a>
          </div>
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
      showLoader: false,
      errorsAuth: null
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(22)
    },
    password: {
      required,
      minLength: minLength(2)
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
            this.errorsAuth = null
            this.$router.push('/profile')
          }, 1000)
        } catch (e) {
          this.errorsAuth = e.errors
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
