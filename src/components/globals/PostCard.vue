<script setup>


import { Post } from "@/models/Post.js";

defineProps({
  postProp: { type: Post, required: true }
})


</script>


<template>
  <div class="card post-card w-100 rounded">
    <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }"
      :title="`Go to ${postProp.creatorName}'s Profile Page!`">
      <img class="img-fluid creator-img" :src="postProp.creatorPicture" alt="">
    </router-link>
    <div class="card-body px-2">
      <h5 class="card-title">{{ postProp.creatorName }}</h5>
      <p class="card-text">{{ postProp.body }}</p>
      <p>{{ postProp.creatorUpdatedAt }}</p>
      <a href="#" class="mdi mdi-heart "></a>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.creator-img {
  border-radius: 50%;

  aspect-ratio: 1/1;
}


.post-card {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  box-shadow: 1px 1px 3px black;
}
</style>