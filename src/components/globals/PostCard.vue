<script setup>


import { Post } from "@/models/Post.js";

defineProps({
  postProp: { type: Post, required: true }
})


</script>


<template>
  <div class="card w-100 rounded">
    <img class="img-fluid creator-img" :src="postProp.creatorPicture" alt="">
    <div class="card-body">
      <h5 class="card-title">{{ postProp.creatorName }}</h5>
      <p class="card-text">{{ postProp.body }}</p>
      <a href="#" class="mdi mdi-heart "></a>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>