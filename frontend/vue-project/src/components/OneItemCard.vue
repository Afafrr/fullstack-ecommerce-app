<script>
import ErrorHandler from "../components/ErrorHandler.vue";

export default {
  components: {
    ErrorHandler,
  },
};
</script>

<script setup>
import { onMounted, ref } from "vue";
import router from "../router";
import { getPhones } from "../store/storeFetches.js";

//func which redirects to phone details
const goToPhonePage = (id) => {
  router.push({ name: "PhonePage", params: { id } });
};
let phones = ref([]);
const error = ref(null);

//onMounted use imported fetch func
onMounted(() => {
  getPhones()
    .then((data) => {
      phones.value = data;
    })
    .catch((err) => {
      error.value = err.message;
    });
});
</script>

<template>
  <div class="container">
    <ErrorHandler v-if="error" :errorProps="error" />

    <div class="phone" v-for="phone in phones" :key="phone._id">
      <div class="image" @click="goToPhonePage(phone._id)">
        <img
          v-if="phone.image"
          :src="phone.image"
          :alt="phone.name + ' image'"
        />
        <img v-else src="../../assets/no-image-icon.jpg" alt="No image" />
      </div>

      <div class="info">
        <p class="price">{{ phone.price.$numberDouble }}</p>
        <p class="title">{{ phone.name }}</p>
        <button
          @click="
            this.$store.commit('addToCart', [phone?.collection, phone._id])
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.phone {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 350px;
  text-align: center;
  border-radius: 10px;
}
.phone:hover {
  box-shadow: 0px 3px 16px -10px rgb(0, 0, 0);
}
.phone .image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  padding: 15px;
  cursor: pointer;
  overflow: hidden;
}
.phone img {
  height: 100%;
  object-fit: contain;
}

.phone .info {
  position: relative;
  max-width: 200px;
  height: 150px;
}

.phone .info button {
  width: 90%;
  position: absolute;
  bottom: 10px;
  transform: translateX(-50%);
  color: blueviolet;
}
.price {
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  overflow: hidden;
}

@media (max-width: 768px) {
  .container {
    gap: 5px;
  }
  .phone {
    width: 160px;
    height: 310px;
  }
  .info {
    position: relative;
    width: 160px;
    height: 150px;
  }
}
@media (max-width: 576px) {
  .phone {
    width: 130px;
    height: 280px;
  }
  .info {
    position: relative;
    width: 130px;
    height: 150px;
  }
}
</style>
