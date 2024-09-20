<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";


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
      {{ posts }}
      <!-- Start of posts template -->
      <div v-for="post in posts" :key="post.id" class="col-md-8 mt-3">
        <PostCard :postProp="Post" />

        <!-- <div class="card w-100">
          <img class=" creator-img" src="https://placehold.it/10x10" alt="">
          <div class="card-body">
            <h5 class="card-title">Poster's Name</h5>
            <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum enim nostrum vero
              repellendus, sit voluptatum.</p>
            <a href="#" class="mdi mdi-heart ">Like</a>
          </div>
        </div> -->


      </div>

      <!-- Start of ads template -->
      <div class="col-4">Ads


      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.creator-img {
  border-radius: 50%;
}
</style>
