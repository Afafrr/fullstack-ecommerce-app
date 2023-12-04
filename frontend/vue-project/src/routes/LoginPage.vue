<script>
import AppNavbar from "../components/AppNavbar.vue";
import axios from "axios";
import { ref } from "vue";
export default { components: { AppNavbar } };
import router from "../router/index.js";
</script>

<script setup>
const error = ref();

async function handleSubmit(email, password) {
  await axios
    .post("http://localhost:4000/user/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data.user) {
        localStorage.setItem("token", res.data.accessToken);
        router.push("/posts");
      }
    })
    .catch((err) => (error.value = err));
}
</script>

<template>
  <div class="login-main">
    <app-navbar />

    <form @submit.prevent="handleSubmit(email, password)">
      <div class="login">
        <div class="mb-3">
          <label for="exampleFormControlInput" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            class="form-control"
            id="exampleFormControlInput"
            placeholder="name@example.com"
            required
          />
        </div>
        <label for="inputPassword5" class="form-label">Password</label>
        <input
          type="password"
          v-model="password"
          id="inputPassword"
          class="form-control"
          aria-describedby="passwordHelpBlock"
          required
        />
        <div id="passwordHelpBlock" class="form-text">
          Your password must be 8-20 characters long, contain letters and
          numbers, and must not contain spaces, special characters, or emoji.
        </div>
        <p class="error">{{ error }}</p>
        <button type="submit" class="btn btn-primary login-btn">LOG IN</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-main {
  height: 100svh;
  width: 100svw;
  position: relative;
}
.login {
  width: 80%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.8s;
}
.login-btn {
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  transition: width 0.4s, margin 0.8s;
}
.error {
  margin-top: 30px;
  color: red;
  width: 100%;
  text-align: center;
}
@media (min-width: 576px) {
  .login {
    width: 60%;
  }
  .login-btn {
    width: 70%;
    margin-top: 10px;
  }
  .error {
    margin-top: 10px;
  }
}
@media (min-width: 992px) {
  .login {
    transition: width 0.3s;
    width: 50%;
  }
}
@media (min-width: 1200px) {
  .login {
    transition: width 0.3s;
    width: 400px;
  }
}
</style>
