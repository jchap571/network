<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="about text-center">
    <div v-if="account" class="p-5">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" :alt="account.name" />
      <p>{{ account.email }}</p>
      <AccountForm />
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>

  <PostForm />
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
