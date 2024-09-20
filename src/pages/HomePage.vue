<script setup>
import { AppState } from "@/AppState.js";
import { adsService } from "@/services/AdsService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";

const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)
const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)

onMounted(() => {
  getAllPosts()
  getAds()
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

async function changePage(pageNumber) {
  try {
    await postsService.changePostsPage(pageNumber)
  }
  catch (error) {
    Pop.error(error);
    Pop.meow(error)
  }

}




</script>

<template>
  <div class="container">
    <section class="row">
      <!-- <PageNavigation /> -->

      <!-- Page Navigation component template -->
      <div class="f-flex my-3">
        <button @click="changePage(page - 1)" class="rounded-pill btn btn-primary">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="changePage(page + 1)" class="rounded-pill btn btn-primary">Next</button>
      </div>
      <!-- Start of posts template -->
      <div v-for="post in posts" :key="post.id" class="col-md-8 mt-3">
        <PostCard :postProp="post" />



      </div>

      <!-- Start of ads template -->
      <div class="col-4 card">
        <h1>{{ ads }}</h1>


      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
