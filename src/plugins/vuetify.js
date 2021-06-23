import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
// import { preset } from "vue-cli-plugin-vuetify-preset-rally/preset";

Vue.use(Vuetify);

// const opts = { theme: { dark: false, light: false } };

// export default new Vuetify(opts);
export default new Vuetify({
  theme: { light: 0 }
});
