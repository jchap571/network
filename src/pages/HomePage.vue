<script setup>
import { AppState } from "@/AppState.js";
import { Account } from "@/models/Account";
import { adsService } from "@/services/AdsService.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)
const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)
const account = computed(() => AppState.account)


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





      <!-- Page Navigation component template -->
      <div class="d-flex my-3">
        <button @click="changePage(page - 1)" class="rounded-pill btn btn-primary mx-3">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="changePage(page + 1)" class="rounded-pill btn btn-primary mx-3">Next</button>
      </div>

      <!-- Create post form -->

      <PostForm />
      <!-- <form v-if="account != null">
        <div class="mb-3">
          <label for="accountPicture" class="form-label">Body</label>
          <input type="url" name="accountPicture" id="accountPicture" class="form-control" maxlength="500">
        </div>
        <div class="mb-3">
          <label for="accountPicture" class="form-label">Picture</label>
          <input type="url" name="accountPicture" id="accountPicture" class="form-control" maxlength="500">
        </div>
        <div>
          <button class="flex-grow mb-3 bg-success" type="submit">Create Post</button>
        </div>
      </form> -->





      <!-- Start of posts PROP template -->
      <div v-for="post in posts" :key="post.id" class="col-md-8 mt-2">
        <PostCard :postProp="post" />



      </div>

      <!-- Start of ads template -->
      <div class="d-flex align-items-start">
        <div v-for="ad in ads" :key="ad.id" class="col-4 card">
          <AdCard :adProp="ad" />
        </div>
      </div>

    </section>
  </div>



</template>

<style scoped lang="scss"></style>
