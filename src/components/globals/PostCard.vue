<script setup>


import { AppState } from '../../AppState.js';
import { Post } from "@/models/Post.js";
import { postsService } from "@/services/PostsService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { computed, onMounted, watch } from "vue";


// NOTE something about the way the account is computed is breaking my v-if on the delete button
const account = computed(() => AppState.account)

// watch(() => AppState.account, (newValue) => {
//   console.log("Account changed:", newValue);
// })


const props = defineProps({
  postProp: { type: Post, required: true }
})




onMounted(() => {
  console.log("Account ID:", account);
  console.log("Creator ID:", props.postProp.creatorId);
})

async function deletePost() {
  try {
    const wantsToDelete = await Pop.confirm('Are you sure you want to delete this post?')
    if (!wantsToDelete) {
      return
    }
    logger.log('post id', props.postProp.id)
    await postsService.deletePost(props.postProp.id)

    console.log('deleting post')
  }
  catch (error) {
    Pop.meow(error)
    Pop.error(error);
  }
}


</script>


<template>
  <div class="card post-card w-100 rounded">

    <div class="card-body">
      <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }"
        :title="`Go to ${postProp.creatorName}'s Profile Page! They have ${postProp.imgUrl.length} on their page!`"
        class="fs-1">
        <img class="img-fluid creator-img" :src="postProp.creatorPicture" alt="">
      </router-link>
      <h5 class="card-title">{{ postProp.creatorName }}</h5>
      <p class="card-text fs-4">{{ postProp.body }}</p>
      <div class="d-flex ">
        <p>{{ postProp.creatorUpdatedAt }}
          <img :src="postProp.imgUrl" :alt="postProp.creator" class="card-img-bottom img-fluid">
          <a href="#" class="mdi mdi-heart "></a>
        </p>
      </div>

      <button v-if="account && postProp.creatorId === account.id" @click="deletePost()"
        class="flex-grow mb-3 bg-danger rounded" type="submit">Delete
        Post</button>
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

.card-img-bottom {
  min-width: 100%;
}



.post-card {
  // padding-left: 5px;
  // padding-right: 5px;
  // padding-top: 5px;
  box-shadow: 1px 1px 3px black;
}
</style>