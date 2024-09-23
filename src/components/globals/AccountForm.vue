<script setup>
import { AppState } from "@/AppState";
import { accountService } from "@/services/AccountService";
import { logger } from "@/utils/Logger";
import Pop from "@/utils/Pop";
import { onMounted, ref } from "vue";


const editableAccountData = ref({
  name: '',
  picture: '',
  bio: '',
  coverImg: '',
  linkedin: '',
  graduated: false,
  github: '',
  class: '',

})


onMounted(() => {
  editableAccountData.value = AppState.account
})

async function updateAccount() {
  try {
    await accountService.updateAccount(editableAccountData.value)
    Pop.success('Account details changed!')
  }
  catch (error) {
    Pop.meow(error)
    logger.error(error)
  }
}


</script>

<template>


  <form @submit.prevent="updateAccount()">
    <div class="mb-3">
      <label for="accountName" class="form-label">Account Name</label>
      <input v-model="editableAccountData.name" type="text" name="accountName" id="accountName" class="form-control "
        maxlength="100">
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
      <input v-model="editableAccountData.linkedin" type="url" name="accountLinkedin" id="accountLinkedin"
        class="form-control" maxlength="500">
    </div>

    <div class="mb-3">
      <label for="accountBio" class="form-label">Bio</label>
      <textarea v-model="editableAccountData.bio" name="accountBio" id="accountBio" class="form-control"
        maxlength="1000"></textarea>
      <div class="mb-3">
        <label for="accountGithub" class="form-label me-3">Do you have a github?</label>
        <input class="form-control" v-model="editableAccountData.github" type="url" name="accountGithub"
          id="accountGithub">
      </div>
      <div class="mb-3">
        <label for="accountClass" class="form-label me-3">What class are you in?</label>
        <input class="form-control" v-model="editableAccountData.class" type="text" name="accountClass"
          id="accountClass">
      </div>
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
