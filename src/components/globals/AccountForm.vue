<script setup>
import { ref } from "vue";

const editableAccountData = ref({
  name: '',
  picture: '',
  email: '',
  bio: '',
  coverImg: '',
  linkedIn: '',
  graduated: false,
  github: '',
  class: '',



})
</script>

<template>


  <form>
    <div class="mb-3">
      <label for="accountName" class="form-label">Account Name</label>
      <input required v-model="editableAccountData.name" type="text" name="accountName" id="accountName"
        class="form-control " maxlength="100">
    </div>
    <div class="mb-3">
      <label for="accountPicture" class="form-label">Picture</label>
      <input v-model="editableAccountData.picture" type="url" name="accountPicture" id="accountPicture"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountCoverImg" class="form-label">Cover Image</label>
      <input v-model="editableAccountData.coverImg" type="url" name="accountCoverImg" id="accountCoverImg"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountLinkedin" class="form-label">Linkedin</label>
      <input v-model="editableAccountData.linkedIn" type="url" name="accountLinkedin" id="accountLinkedin"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountGithub" class="form-label">Github</label>
      <input v-model="editableAccountData.github" type="url" name="accountGithub" id="accountGithub"
        class="form-control" maxlength="500">
    </div>
    <div class="mb-3">
      <label for="accountBio" class="form-label">Bio</label>
      <textarea v-model="editableAccountData.bio" name="accountBio" id="accountBio" class="form-control"
        maxlength="1000"></textarea>
    </div>
    <div class="mb-3">
      <label for="accountGraduated" class="form-label me-3">Have You Graduated?</label>
      <input v-model="editableAccountData.graduated" type="checkbox" name="accountGraduated" id="accountGraduated">
    </div>
    <div>
      <button class="flex-grow mb-3 bg-success" type="submit">Save Changes</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>
