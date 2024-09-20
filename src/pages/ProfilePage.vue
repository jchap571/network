<script setup>
import { AppState } from "@/AppState.js";
import { profilesService } from "@/services/ProfilesService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";


const route = useRoute()

const profile = computed(() => AppState.activeProfile)

onMounted(() => {
  getProfileById()
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



</script>


<template>


  <h1>Profile Page</h1>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <h1>{{ profile.name }}</h1>
        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="text-light"
          title="Connect with me on LinkedIn!"> <i class="mdi mdi-linkedin"></i></a>
        <div>
          <img :src="profile.picture" :alt="profile.name">
          <i v-if="profile.graduated" class="mdi mdi-certificate-outline fs-1"></i>
        </div>
      </div>
    </section>

    <div class="container">
      <section class="row">
        <p>{{ profile.bio }}</p>
      </section>
    </div>
  </div>





</template>


<style lang="scss" scoped></style>