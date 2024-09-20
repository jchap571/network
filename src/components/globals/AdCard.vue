<script setup>
import { Ad } from "@/models/Ad.js";




defineProps({
  adProp: { type: Ad, required: true }
}
)

</script>


<template>
  <img :src="adProp.tall" alt="" class="img-fluid ad-img">

</template>


<style lang="scss" scoped></style>