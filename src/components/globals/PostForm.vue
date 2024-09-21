<script setup>
import { AppState } from '@/AppState';
import { computed } from 'vue';

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)
const page = computed(() => AppState.page)
const totalPages = computed(() => AppState.totalPages)
const account = computed(() => AppState.account)
</script>


<template>

    <form v-if="account != null">
        <div class="mb-3">
            <label for="accountPicture" class="form-label">Body</label>
            <input type="url" name="accountPicture" id="accountPicture" class="form-control" maxlength="500">
        </div>
        <div class="mb-3">
            <label for="accountPicture" class="form-label">Picture</label>
            <input type="url" name="accountPicture" id="accountPicture" class="form-control" maxlength="500">
        </div>
        <div>
            <button class="flex-grow mb-3 bg-success" type="submit">Create Post</button>
        </div>
    </form>

</template>


<style lang="scss" scoped></style>