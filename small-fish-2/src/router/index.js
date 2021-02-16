import { auth } from "@/db";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      requiresAuth: false
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  console.log(
    "🚀 ~ file: index.js ~ line 44 ~ router.beforeEach ~ requiresAuth",
    requiresAuth
  );
  console.log(
    "🚀 ~ file: index.js ~ line 51 ~ router.beforeEach ~ auth.currentUser",
    auth.currentUser
  );

  if (requiresAuth && !auth.currentUser) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
