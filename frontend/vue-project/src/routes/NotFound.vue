<script>
import AppNavbar from "../components/AppNavbar.vue";
export default { components: { AppNavbar } };
</script>

<template>
  <div class="not-found">
    <app-navbar />
    <h1>NOT FOUND</h1>
  </div>
</template>

<style scoped>
.not-found {
  position: relative;
  height: 100vh;
}
.not-found h1 {
  font-size: 3rem;
  font-weight: 600;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
