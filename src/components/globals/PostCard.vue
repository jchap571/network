<script setup>


import { Post } from "@/models/Post.js";

defineProps({
  postProp: { type: Post, required: true }
})


</script>


<template>
  <div class="card post-card w-100 rounded">

    <div class="card-body">
      <img :src="postProp.imgUrl" :alt="postProp.title" class="card-img-top">
      <h5 class="card-title">{{ postProp.creatorName }}</h5>
      <p class="card-text fs-4">{{ postProp.body }}</p>
      <div class="d-flex">
        <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }"
          :title="`Go to ${postProp.creatorName}'s Profile Page!`" class="fs-1">
          <img class="img-fluid creator-img" :src="postProp.creatorPicture" alt="">
        </router-link>
        <p>{{ postProp.creatorUpdatedAt }}
          <a href="#" class="mdi mdi-heart "></a>
        </p>
      </div>

    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 35dvh;
  object-fit: cover;
  object-position: center;
}



.creator-img {
  border-radius: 50%;
  height: 15dvh;
  aspect-ratio: 1/1;

}



.post-card {
  // padding-left: 5px;
  // padding-right: 5px;
  // padding-top: 5px;
  box-shadow: 1px 1px 3px black;
}
</style>