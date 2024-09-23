<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import Pop from '@/utils/Pop';

import { computed } from 'vue';






const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)




async function changePostsPage(pageNumber) {
    try {
        if (AppState.postQuery == '') {
            await postsService.changePostsPage(pageNumber)
        }
        else {
            await postsService.changePostsPage(pageNumber, AppState.postQuery)
        }
    }
    catch (error) {
        Pop.meow(error);
    }



}
</script>


<template>
    <div class="d-flex my-3">
        <button @click="changePostsPage(page - 1)" :disabled="page < 2"
            class="rounded-pill btn btn-primary mx-3">Previous</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="changePostsPage(page + 1)" :disabled="page == 40 || page == totalPages"
            class="rounded-pill btn btn-primary mx-3">Next</button>
    </div>
</template>


<style lang="scss" scoped></style>