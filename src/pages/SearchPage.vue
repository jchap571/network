<script setup>
import { AppState } from '@/AppState';
import { adsService } from '@/services/AdsService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

// FIXME reference search page from vue flix - just search by posts


const ads = computed(() => AppState.ads)

const posts = computed(() => AppState.posts)

onMounted(() => {
    getAds()
})





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