import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueFormGenerator from "vue-form-generator";
import "vue-form-generator/dist/vfg.css";

// Firebase Authentication
import * as fb from "./db";

import vuetify from "./plugins/vuetify";

Vue.use(VueFormGenerator);

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }

  if (user) {
    // store.dispatch("fetchUserProfile", user);
  }
});
