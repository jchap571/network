<script setup>
import { AppState } from "@/AppState.js";
import PageNavition from "@/components/globals/PageNavition.vue";

import { Account } from "@/models/Account";
import { adsService } from "@/services/AdsService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, onUnmounted } from "vue";

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)




onMounted(() => {
  getAllPosts()
  getAds()

})

onUnmounted(() => {
  postsService.clearPosts()
})


async function getAllPosts() {
  try {
    await postsService.getAllPosts()
  }
  catch (error) {
    Pop.meow(error);
    logger.log(error)
  }
}

async function getAds() {
  try {
    await adsService.getAds()

  }
  catch (error) {
    Pop.meow(error);
    Pop.error(error);
  }
}


async function likePosts() {
  try {
    await postsService.likePosts()
  }
  catch (error) {
    Pop.meow('You have to login to like a post!')
    Pop.error(error);
  }
}






</script>

<template>
  <div class="container">
    <section class="row">





      <!-- Page Navigation component template -->
      <PageNavition />
      <!-- <div class="d-flex my-3">
        <button @click="changePage(page - 1)" class="rounded-pill btn btn-primary mx-3">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="changePage(page + 1)" class="rounded-pill btn btn-primary mx-3">Next</button>
      </div> -->

      <!-- Create post form -->

      <PostForm />






      <!-- Start of posts PROP template -->
      <div v-for="post in posts" :key="post.id" class="col-md-8 mt-2">
        <PostCard :postProp="post" />



      </div>

      <!-- Start of ads template -->
      <div class="d-flex align-items-start col-md-4 flex-column">
        <div v-for="ad in ads" :key="ad.id" class="col-4 card">
          <AdCard :adProp="ad" />
        </div>
      </div>

    </section>
  </div>



</template>

<style scoped lang="scss"></style>
