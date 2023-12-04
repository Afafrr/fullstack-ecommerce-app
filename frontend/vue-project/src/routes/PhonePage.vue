<script>
import AppNavbar from "../components/AppNavbar.vue";
import ErrorHandler from "../components/ErrorHandler.vue";

export default {
  components: {
    AppNavbar,
    ErrorHandler,
  },
};
</script>
<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { getPhone } from "../store/storeFetches.js";
import { useRoute } from "vue-router";

let phoneDetails = ref({});
const error = ref(null);

const route = useRoute();
const phoneId = route.params.id;
const availabilityColor = computed(() => {
  return phoneDetails.value.availability === "In stock"
    ? "color: green"
    : "color: red";
});

onBeforeMount(() => {
  phoneDetails.value = {};
});

onMounted(() => {
  getPhone(phoneId)
    .then((data) => {
      phoneDetails.value = data;
    })
    .catch((err) => {
      error.value = err.message;
    });
});
</script>

<template>
  <div>
    <app-navbar />
    <ErrorHandler v-if="error" :errorProps="error" />
    <div class="main-container">
      <h1>
        {{ phoneDetails.brand + " " + phoneDetails.name }}
      </h1>
      <div class="details">
        <div class="image">
          <img
            v-if="phoneDetails.image"
            :src="phoneDetails.image"
            :alt="phoneDetails.name + ' image'"
          />
          <img v-else src="../../assets/no-image-icon.jpg" alt="No image" />
        </div>

        <div class="right-container">
          <p class="price">$ {{ phoneDetails.price }}</p>
          <p :style="availabilityColor">
            {{ phoneDetails.availability || "Availability unknown" }}
          </p>
          <button
            class="btn btn-dark"
            @click="
              this.$store.commit('addToCart', [
                phoneDetails?.collection,
                phoneDetails._id,
              ])
            "
          >
            Add to cart
          </button>
        </div>
      </div>
      <div class="specification">
        <h2>Specification</h2>
        <div>
          <table class="specification-table">
            <tr>
              <td>Camera:</td>
              <td>{{ phoneDetails.specifications?.camera }}</td>
            </tr>
            <tr>
              <td>Display:</td>
              <td>{{ phoneDetails.specifications?.display }}</td>
            </tr>
            <tr>
              <td>Processor:</td>
              <td>{{ phoneDetails.specifications?.processor }}</td>
            </tr>
            <tr>
              <td>Storage:</td>
              <td>{{ phoneDetails.specifications?.storage }}</td>
            </tr>
          </table>
        </div>
        <div class="other"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  padding: 20px;
}
.right-container {
  float: none;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding: 10px;
  max-width: 600px;
}

.right-container button {
  width: 100%;
  letter-spacing: 1px;
  height: 50px;
}
.details .image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  overflow: hidden;
}
.details .image img {
  max-width: 500px;
  min-width: 200px;
}
.details {
  display: flex;
  flex-direction: column;
}
.price {
  font-size: 2rem;
}

.specification {
  margin-left: 10px;
  margin-top: 20px;
}

table tr {
  border-top: 1px solid lightgray;
}
table tr:first-child {
  border-top: none;
}
table td {
  padding: 10px 5px;
}

@media (min-width: 768px) {
  .main-container {
    position: relative;
    left: 50%;
    max-width: 1500px;
    transform: translateX(-50%);
    padding: 10px 60px;
  }
  .details {
    flex-direction: row;
  }
  .image {
    width: 60%;
  }
  .right-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    padding-left: 50px;
  }
  .right-container button {
    justify-self: start;
    font-size: 1.3rem;

    margin-top: 50px;
    width: 300px;
    border-radius: 10px;
  }
  .specification-table {
    margin: 30px 10px 0px 0px;
  }
  table td {
    padding: 15px;
  }
}
</style>
