<script setup>
import { AppState } from '@/AppState';
import { postsService } from '@/services/PostsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)
// const creatorId = computed(()=> AppState.activeProfile.)

const editablePostData = ref({
    body: '',
    imgUrl: '',
})



async function createPost() {
    try {
        const postData = editablePostData.value
        await postsService.createPost(postData)
        editablePostData.value = {
            body: '',
            imgUrl: '',
        }
    }
    catch (error) {
        Pop.error(error);
        logger.log(error)
    }
}

</script>


<template>
    <div class="card">
        <form @submit.prevent="createPost()" v-if="account != null">
            <div class="mb-3">
                <label for="body" class="form-control-label">Body</label>
                <input v-model="editablePostData.body" type="string" name="body" id="body" class="form-control"
                    maxlength="5000" required>
            </div>
            <div class="mb-3">
                <label for="imgUrl" class="form-control-label">Picture</label>
                <input v-model="editablePostData.imgUrl" type="url" name="imgUrl" id="imgUrl" class="form-control"
                    maxlength="500">
            </div>
            <div>
                <button class="flex-grow mb-3 bg-success rounded" type="submit">Create Post</button>
            </div>
        </form>
    </div>

</template>


<style lang="scss" scoped></style>