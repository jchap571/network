<script setup>
import { adsService } from '@/services/AdsService';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';

// FIXME reference search page from vue flix - just search by posts
// FIXME get ads here


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





</template>


<style lang="scss" scoped></style>