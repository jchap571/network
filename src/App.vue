<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import Pop from './utils/Pop';
import { adsService } from './services/AdsService';
// FIXME add get ads here so that will fix it everywhere





async function getAds() {
  try {
    await adsService.getAds()

  }
  catch (error) {
    Pop.meow(error);
    Pop.error(error);
  }
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />



  </main>
  <footer class="bg-primary text-light">

  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
