<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const error = ref();

// onMounted use getItem func that fetches items from db using passed item properties .collection name and .itemId
onMounted(() => {
  axios
    .get("http://localhost:4000/posts", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      console.log(res.data.posts);
    })
    .catch((err) => (error.value = err));
});
</script>

<script>
import AppNavbar from "../components/AppNavbar.vue";
export default {
  components: {
    AppNavbar,
  },
};
</script>

<template>
  <div>
    <AppNavbar />
    <p class="error">{{ error }}</p>
  </div>
</template>

<style scoped>


@media (min-width: 576px) {

}
</style>
