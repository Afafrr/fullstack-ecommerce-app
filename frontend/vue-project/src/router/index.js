import { createRouter, createWebHistory } from "vue-router";
import HomeMain from "../routes/HomeMain.vue";
import PhonesPage from "../routes/PhonesPage.vue";
import PhonePage from "../routes/PhonePage.vue";
import NotFound from "../routes/NotFound.vue";
import ShoppingCart from "../routes/ShoppingCart.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeMain,
  },
  {
    path: "/phones",
    name: "PhonesPage",
    component: PhonesPage,
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/phones/:id",
    name: "PhonePage",
    component: PhonePage,
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
