<template>
  <div class="wrapper">
    <header>
      <hamburger
        v-model="open"
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
      <div class="sidebar" :class="{'open': open}">
        <ul>
          <li>
            <router-link tag="a" to="/profile" active-class="active" @click.native="open = false">
              <i class="icon-user"></i>
              Профиль
            </router-link>
            <router-link tag="a" to="/page1" active-class="active" @click.native="open = false">
              <i class="icon-cog"></i>
              Пункт меню 1
            </router-link>
            <router-link tag="a" to="/page2" active-class="active" @click.native="open = false">
              <i class="icon-cog"></i>
              Пункт меню 2
            </router-link>
          </li>
        </ul>
      </div>
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
      open: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
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
