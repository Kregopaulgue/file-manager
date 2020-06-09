<template>
  <div id="app">
      <Header/>
      <router-view/>
  </div>
</template>

<script>

import Header from './components/Header.vue';

import routes from './routes.js';
import VueRouter from 'vue-router';

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default {
  name: 'App',
  router,
  components: {
      Header
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
