<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";

const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)
const posts = computed(() => AppState.posts)

onMounted(() => {
  getAllPosts()
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




</script>

<template>
  <div class="container">
    <section class="row">
      <div class="f-flex my-3">
        <button class="rounded-pill btn btn-primary">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button class="rounded-pill btn btn-primary">Next</button>
      </div>
      <!-- Start of posts template -->
      <div v-for="post in posts" :key="post.id" class="col-md-8 mt-3">
        <PostCard :postProp="post" />



      </div>

      <!-- Start of ads template -->
      <div class="col-4 card">
        <h1>Ads</h1>


      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
