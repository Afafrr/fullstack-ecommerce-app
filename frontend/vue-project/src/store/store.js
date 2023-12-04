import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
const store = createStore({
  state: {
    cart: [],
  },
  mutations: {
    //add to cart button, which activates this func which checks if there is a duplicate, if so increase count by 1
    addToCart(state, itemsArray) {
      let arrToObj = {
        collection: itemsArray[0],
        itemId: itemsArray[1],
        count: 1,
      };
      const findIndex = store.getters.getIndex(arrToObj.itemId);

      //if item in store array count++, if not add it
      if (findIndex === -1) {
        state.cart.push(arrToObj);
      } else {
        store.commit("addCount", arrToObj.itemId);
      }
    },
    addCount(state, id) {
      state.cart[store.getters.getIndex(id)].count++;
    },
    substractCount(state, id) {
      console.log(state.cart[store.getters.getIndex(id)]);

      const index = state.cart[store.getters.getIndex(id)];
      if (index.count > 0) {
        index.count--;
      }
    },
    removeFromArr(state, id) {
      console.log(state.cart[store.getters.getIndex(id)]);
      // state.cart[store.getters.getIndex(id)].count = 0;
      // state.cart.splice(store.getters.getIndex(id), 1);
      state.cart = state.cart.filter((item) => {
        return item.itemId !== id;
      });
    },
  },
  getters: {
    getIndex: (state) => (id) => {
      //return passed items id in store.state.cart
      return state.cart.findIndex((x) => x.itemId === id);
    },
    //return count of given id
    getCount: (state) => (id) => {
      return state.cart[store.getters.getIndex(id)].count;
    },
  },

  //saving cart to localstorage
  plugins: [createPersistedState()],
});

export default store;
