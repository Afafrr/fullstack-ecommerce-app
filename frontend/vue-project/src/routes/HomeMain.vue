<script>
import AppNavbar from "../components/AppNavbar.vue";
import MainCarousel from "../components/startPage/MainCarousel.vue";
import OneItemCard from "../components/OneItemCard.vue";
export default {
  components: {
    AppNavbar,
    MainCarousel,
    OneItemCard,
  },
};
</script>

<template>
  <div>
    <app-navbar />
    <main-carousel />
    <one-item-card />
  </div>
</template>

<style></style>
