<script setup>
import { AppState } from '@/AppState';
import { adsService } from '@/services/AdsService';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';
import { computed, onMounted, onUnmounted, ref } from 'vue';




const ads = computed(() => AppState.ads)

const posts = computed(() => AppState.posts)

const editableQuery = ref('')

onMounted(() => {
    getAds()
})

onUnmounted(() => {
    postsService.clearSearchQuery()
})

async function searchPosts() {
    try {
        await postsService.searchPosts(editableQuery.value)
    }
    catch (error) {
        Pop.error(error);
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
</script>


<template>
    <h1>Search Page</h1>
    <div class="card">
        <form @submit.prevent="searchPosts()">
            <div class="mb-3">
                <label for="" class="form-control-label">Search Posts or Profiles</label>
                <input v-model="editableQuery" type="text" name="query" id="query" class="form-control" maxlength="100"
                    required>
            </div>
            <div>
                <button class="flex-grow mb-3 bg-success rounded" type="submit">Search Posts</button>
            </div>
        </form>
    </div>




    <div class="container">
        <section class="row">
            <div v-for="post in posts" :key="post.id" class="col-md-8 mt-2">
                <PostCard :postProp="post" />
            </div>
        </section>






        <div class="d-flex align-items-start col-md-4 flex-column">
            <div v-for="ad in ads" :key="ad.id" class="col-4 card">
                <AdCard :adProp="ad" />
            </div>
        </div>

    </div>

</template>


<style lang="scss" scoped></style>