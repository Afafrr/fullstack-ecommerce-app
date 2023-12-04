<script setup>
import store from "../store/store";
import { computed } from "vue";

const numOfItemsInCart = computed(() => {
  return store.state.cart.reduce((acc, curr) => {
    return acc + curr.count;
  }, 0);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Gadget-shop!</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse z-3" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/phones">Phones</a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle w-90"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Tablets
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle w-90"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              PC's & Laptops
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#"></a>
              </li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <a
          href="/cart"
          type="button"
          class="cart-btn btn btn- position-relative"
        >
          <i class="bi bi-cart-fill"></i>
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
          >
            {{ numOfItemsInCart }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.cart {
  position: absolute;
}
.cart-btn {
  width: 45px;
  height: 45px;
  margin: 10px;
  border: 1px solid grey;
}
a i {
  font-size: 1.3rem;
}
a span {
  background-color: black;
}
</style>
