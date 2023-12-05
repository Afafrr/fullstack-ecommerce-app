import { createRouter, createWebHistory } from "vue-router";
import HomeMain from "../routes/HomeMain.vue";
import PhonesPage from "../routes/PhonesPage.vue";
import PhonePage from "../routes/PhonePage.vue";
import NotFound from "../routes/NotFound.vue";
import ShoppingCart from "../routes/ShoppingCart.vue";
import CreatePost from "../routes/CreatePost.vue";
import LoginPage from "../routes/LoginPage.vue";
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
    path: "/phones/:id",
    name: "PhonePage",
    component: PhonePage,
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/posts/post",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/user/login",
    name: "LoginPage",
    component: LoginPage,
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
