<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';

import { computed } from 'vue';
import { useRoute } from 'vue-router';




const route = useRoute()

const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)





async function changePostsPage(pageNumber) {
    try {
        // need to check which page I'm on - ie. profile page or home page
        // FIXME reference projectCard from art terminal inside template, look for the v-if
        if (route.name == 'Home') {
            await postsService.changePostsPage(pageNumber)
        }
        else {
            await postsService.changePostsPageById(pageNumber, AppState.activeProfile.id)
        }
    }
    catch (error) {
        Pop.meow(error);
    }



}
</script>


<template>
    <div class="d-flex my-3">
        <button v-if="route.name == 'Home'" @click="changePostsPage(page - 1)" :disabled="page < 2"
            class="rounded-pill btn btn-primary mx-3">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="changePostsPage(page + 1)" :disabled="page == 40 || page == totalPages"
            class="rounded-pill btn btn-primary mx-3">Next</button>
    </div>
</template>


<style lang="scss" scoped></style>