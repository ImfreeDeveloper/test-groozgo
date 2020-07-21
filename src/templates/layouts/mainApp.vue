<template>
  <div class="wrapper">
    <header>
      <hamburger
        @handlerOpen="open"
      />
      <div class="logo">
        <img src="/images/logo_theme_dark.png" alt="logo" />
      </div>
      <p
        class="logout"
        @click="logout"
      >Выйти</p>
    </header>
    <main class="content content-with-sidebar">
      <v-alert
          type="success"
          v-if="success"
      >
        {{ success.message }}
      </v-alert>
      <div class="sidebar" :class="{'open': isOpen}"></div>
      <div class="main-content">
        <slot />
      </div>
    </main>
    <footer>
      <p>&copy; 2017-2020 Groozgo.ru</p>
    </footer>
  </div>
</template>

<script>
import hamburger from '../../components/hamburger.vue'
import vAlert from '../../components/v-alert.vue'

export default {
  components: {
    hamburger,
    vAlert
  },
  computed: {
    success () {
      return this.$store.getters.success
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    open (val) {
      this.isOpen = val
    }
  },
  watch: {
    success (val) {
      if (val) {
        setTimeout(() => {
          this.$store.commit('clearSuccess')
        }, 3000)
      }
    }
  }
}
</script>
