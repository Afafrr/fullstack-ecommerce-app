<script setup>
import { ref, onMounted } from "vue";
import { addItemToDB, getCollections } from "../store/storeFetches";

const collError = ref("");
const error = ref("");

const name = ref("");
const brand = ref("");
const price = ref("");
const selectedCollection = ref("");
const newCollection = ref("");

function handleSubmit(name, brand, price) {
  const collectionName =
    selectedCollection.value === "new"
      ? newCollection.value
      : selectedCollection.value;

  addItemToDB(name, brand, price, collectionName)
    .then((res) => {
      console.log(res.data.result);
      alert("Created!");
    })
    .catch((err) => (error.value = err?.response?.data.error));
}

//onMounted get collection names from backend and create array of it
const collectionArray = ref([]);

onMounted(() => {
  getCollections()
    .then((res) => {
      res.data.forEach((item) => {
        collectionArray.value.push(item?.name);
      });
    })
    .catch((err) => {
      // (collError.value = err.message?.response.data.error),
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      }
    });
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
    <div class="form">
      <form @submit.prevent="handleSubmit(name, brand, price)">
        <label for="name">Name</label>
        <input
          class="form-control"
          id="name"
          type="text"
          placeholder="Iphone 13"
          aria-label="default input example"
          v-model="name"
        />
        <label for="brand">Brand</label>

        <input
          class="form-control"
          id="brand"
          type="text"
          placeholder="Apple"
          aria-label="default input example"
          v-model="brand"
        />
        <div class="price-collection">
          <div class="price-div">
            <label for="price">Price</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                type="number"
                id="price"
                class="form-control"
                aria-label="Amount (to the nearest dollar)"
                v-model="price"
              />
            </div>
          </div>
          <div class="select-div">
            <label for="collection">Collection</label>
            <select
              class="form-select"
              aria-label="Default select example"
              id="collection"
              v-model="selectedCollection"
            >
              <option value="new">New collection</option>

              <option v-for="name in collectionArray" :value="name" :key="name">
                {{ name }}
              </option>
            </select>

            <p class="collection-err">{{ collError }}</p>
          </div>
          <div
            class="new-collection"
            :class="[selectedCollection === 'new' ? 'show' : '']"
          >
            <label for="name">New Collection</label>
            <input
              class="form-control"
              id="name"
              type="text"
              placeholder="Phones"
              aria-label="default input example"
              v-model="newCollection"
            />
          </div>
        </div>
        <p class="collection-err">{{ error }}</p>

        <button type="submit" class="submit-btn btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: height 0.3s, width 0.3s;
}
.form form {
  width: 80%;
  max-width: 600px;
}
.form form label {
  margin-top: 10px;
  padding: 5px;
}
.form form input,
.form form select {
  height: 50px;
}
.input-group {
  min-width: 100px;
  max-width: 150px;
  transition: all 0.3s;
}
.price-div {
  margin-right: 20px;
}
.select-div {
  min-width: 100px;
  width: 150px;
  margin-right: 20px;
  transition: all 0.3s;
}

.submit-btn {
  margin-top: 30px;
  width: 100%;
  height: 50px;
}
.price-collection {
  display: flex;
  flex-wrap: wrap;
}
.new-collection {
  min-width: 100px;
  max-width: 150px;
  height: 0px;
  opacity: 0%;
  transform: scale(0.1);
  transition: opacity 0.2s, transform 0.3s ease-in-out, display 0.5s;
}
.collection-err {
  margin: 10px;
  color: red;
  text-align: center;
}
.show {
  opacity: 100%;
  transform: scale(1);
  height: auto;
}
@media (min-width: 576px) {
  .input-group {
    min-width: 100px;
    max-width: 200px;
  }
}
</style>
