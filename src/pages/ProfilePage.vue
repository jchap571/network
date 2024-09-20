<script setup>
import { AppState } from "@/AppState.js";
import { postsService } from "@/services/PostsService.js";
import { profilesService } from "@/services/ProfilesService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";


const route = useRoute()

const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.posts)

onMounted(() => {
  getProfileById()
  // getPostsByCreatorId()
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
    <section class="row my-3 img-fluid" :style="{ backgroundImage: `url(${profile.coverImg})` }">
      <div class="col-12 d-flex justify-between my-3 mx-3 profile-backdrop">
        <h1 class="text-light">{{ profile.name }}</h1>
        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="text-light"
          title="Connect with me on LinkedIn!"> <i class="mdi mdi-linkedin"></i></a>
        <div class="d-flex text-end">
          <img :src="profile.picture" :alt="profile.name" class="profile-image">
          <i v-if="profile.graduated" class="mdi mdi-certificate-outline fs-1 text-light"></i>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="row">
        <p class="fs-2">Biographical Details: {{ profile.bio }}</p>
      </section>
    </div>
  </div>





</template>


<style lang="scss" scoped>
.profile-image {
  border-radius: 50%;
  aspect-ratio: 1/1;
  box-shadow: 1px 1px 5px black;
  object-fit: cover;

}
</style>