<script setup>
import { onMounted, ref } from "vue";
import { getItem } from "../store/storeFetches.js";
import store from "../store/store.js";

const storeCartItems = ref(store.state.cart);
let fetchedCartItems = ref([]);
// onMounted use getItem func that fetches items from db using passed item properties .collection name and .itemId
onMounted(() => {
  storeCartItems.value.forEach((item) => {
    getItem(item.collection, item.itemId).then((item) => {
      fetchedCartItems.value.push(item);
    });
  });
});
console.log(fetchedCartItems.value);
</script>

<script>
import AppNavbar from "../components/AppNavbar.vue";
export default {
  components: {
    AppNavbar,
  },
};
</script>

<template :is="$store.state.cart">
  <div>
    <app-navbar />
    <h1 v-if="storeCartItems.length > 0">Your cart</h1>
    <div v-if="storeCartItems.length > 0" class="cart-container">
      <div class="item-card" v-for="item in fetchedCartItems" :key="item._id">
        <div class="inner-card">
          <div class="image">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.name + ' image'"
            />
            <img v-else src="../../assets/no-image-icon.jpg" alt="No image" />
          </div>
          <h1>{{ item.name }}</h1>
          <div class="quantityControl">
            <button
              class="minus"
              @click="$store.commit('substractCount', item._id)"
            >
              -
            </button>
            <span>{{ $store.getters.getCount(item._id) }}</span>
            <button class="plus" @click="$store.commit('addCount', item._id)">
              +
            </button>
            <button
              class="plus"
              @click="
                $store.commit('removeFromArr', item._id);
                this.render;
              "
            >
              +
            </button>
          </div>
          <p>
            ${{ (item.price * $store.getters.getCount(item._id)).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="cart-empty">
      <div>
        <h1>Your cart is empty</h1>
        <a href="/" type="button" class="btn btn-secondary"
          >Return to the store</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-card {
  display: grid;
  grid-auto-flow: row dense;

  width: 95%;
  min-height: 100px;
  margin: 2px 0px;
  padding: 1px;
  border: 1px solid lightgrey;
  border-radius: 10px;
}
.item-card h1 {
  padding: 5px;
  font-size: 1.2rem;
  text-align: center;
}
.inner-card {
  display: flex;
  align-items: center;
  display: grid;
  grid-template-columns: minmax(50px, 1fr) 3fr 1fr;
  grid-template-rows: auto auto;
  max-height: 300px;
  overflow: hidden;
}

.inner-card button {
  width: 40px;
  height: 50px;
  border-style: none;
}
.inner-card .minus {
  border-radius: 5px 0px 0px 5px;
}
.inner-card .plus {
  border-radius: 0px 5px 5px 0px;
}

.inner-card .image img {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 150px;
  object-fit: cover;
}
.inner-card p {
  /* width: 20%; */
  padding: 5px;
  text-align: center;
  font-size: 1.3rem;
}
.quantityControl {
  order: 1;
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: 2/1/3/4;
  height: 50px;
}
.quantityControl span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 50px;
  border: solid 1px lightgray;
}
.cart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cart-empty {
  position: absolute;
  top: 0px;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}
.cart-empty div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cart-empty div a {
  margin: 15px 0px;
}

@media (min-width: 576px) {
  .item-card h1 {
    font-size: 1.3rem;
    grid-template-rows: 1fr;
    display: flex;
    flex-direction: column;
  }
  .inner-card {
    /* display: flex;
  align-items: center; */
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    grid-template-rows: none;
  }
  .item-card {
    width: 80%;
    max-height: 200px;
    margin: 15px 0px;
  }
  .quantityControl {
    grid-auto-flow: row;
    order: 0;
    grid-area: auto;
  }
}
</style>
