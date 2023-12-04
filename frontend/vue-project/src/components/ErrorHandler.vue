<script>
export default {
  props: ["errorProps"],
};
</script>

<template>
  <div class="error">Error! {{ errorProps }}</div>
</template>

<style scoped>
.error {
  font-size: 2rem;
  text-align: center;
}
</style>
