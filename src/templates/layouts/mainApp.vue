<template>
  <div class="wrapper">
    <header>
      <div class="logo">
        <img src="/images/logo_theme_dark.png" alt="logo" />
      </div>
      <p
        class="logout"
        @click="logout"
      >Выйти</p>
    </header>
    <main class="content content-with-sidebar">
      <div class="sidebar"></div>
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
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
