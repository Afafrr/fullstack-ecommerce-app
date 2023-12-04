<script></script>

<template>
  <div class="main">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

html,
body {
  font-family: "Montserrat", sans-serif;
}
.main {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1920px;
}
</style>
