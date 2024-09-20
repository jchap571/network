<script setup>


import { Post } from "@/models/Post.js";

defineProps({
  postProp: { type: Post, required: true }
})


</script>


<template>
  <div class="card w-100">
    <img class=" creator-img" src="https://placehold.it/10x10" alt="">
    <div class="card-body">
      <h5 class="card-title">{{ postProp.creator }}</h5>
      <p class="card-text">{{ postProp.body }}</p>
      <a href="#" class="mdi mdi-heart "></a>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>