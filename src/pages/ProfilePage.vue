<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { profilesService } from "@/services/ProfilesService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";


const route = useRoute()

const ads = computed(() => AppState.ads)
const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)

onMounted(() => {
  getProfileById()
  getPostsByCreatorId()
  // FIXME get ads here

})

watch(() => route.params.profileId, () => {
  getProfileById()
  getPostsByCreatorId()
})



async function getProfileById(profileId) {
  try {
    const profileId = route.params.profileId
    logger.log('id of the profile from URL', profileId)
    await profilesService.getProfileById(profileId)
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}

async function getPostsByCreatorId() {
  try {
    const profileId = route.params.profileId
    await postsService.getPostsByCreatorId(profileId)
  }
  catch (error) {
    Pop.meow(error);
    logger.log(error)
  }
}



</script>


<template>



  <div v-if="profile" class="container">
    <section class="row my-3 img-fluid coverImgBg" :style="{ backgroundImage: `url(${profile.coverImg})` }">
      <div class="col-12 d-flex justify-content-around my-3 mx-3 profile-backdrop">
        <h1 class="text-light">{{ profile.name }}</h1>
        <!-- do the same as below -->
        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="text-light"
          title="Connect with me on LinkedIn!"> <i class="mdi mdi-linkedin fs-2"></i></a>
        <p class="text-light fs-2">{{ profile.class }}</p>
        <div class="d-flex text-center justify-content-between">
          <img :src="profile.picture" :alt="profile.name" class="profile-image">
          <i v-if="profile.graduated" class="mdi mdi-certificate-outline fs-1 text-light"></i>
          <!-- FIXME add link for github-->
          <i v-if="profile.github" class="mdi mdi-github"></i>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="row">
        <p class="fs-2">Biographical Details: {{ profile.bio }}</p>
      </section>
    </div>
  </div>

  <PageNavition />

  <section class="row mx-3">
    <div v-for="post in posts" :key="post.id" class="col-md-4 my-3">
      <PostCard :postProp="post" />
    </div>

    <div class="d-flex align-items-start col-md-4 flex-column">
      <div v-for="ad in ads" :key="ad.id" class="col-4 card">
        <AdCard :adProp="ad" />
      </div>
    </div>

  </section>





</template>


<style lang="scss" scoped>
img {
  border-radius: 50%;
  min-height: 20dvh;
  aspect-ratio: 1/1;
  box-shadow: 1px 1px 5px black;
  object-fit: cover;

}


.coverImgBg {
  min-height: 60dvh;
  background-size: cover;

}
</style>