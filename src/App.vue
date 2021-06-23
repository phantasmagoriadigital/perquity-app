<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      v-if="user.profile"
      permanent
      app
      clipped
    >
      <v-divider></v-divider>
      <v-btn
        v-for="navItem in navItems"
        :key="navItem.title"
        x-large
        left
        block
        elevation="4"
        @click="navItem.onClick"
      >
        <v-icon>{{ navItem.icon }}</v-icon>
        {{ navItem.title }}
      </v-btn>
      <!-- <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar> -->

      <!-- <template v-if="user.profile.name">
          <v-list-item-title>
            {{ user.profile.name }}
          </v-list-item-title>
        </template> -->

      <!-- <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item> -->

      <!-- <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route">
          <v-btn x-large elevation="4" block>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logOut">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>
    <v-app-bar class="nav-bar" app clipped-left flat>
      <v-toolbar-title>Perquity</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="link.title"
        text
        rounded
        :to="link.route"
        >{{ link.title }}
      </v-btn>

      <v-avatar color="primary" size="48"
        ><v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-avatar>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(menuItem, i) in menuItems"
            :key="i"
            @click="menuItem.onClick"
          >
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main app>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
        <v-dialog v-model="profitRatioFormIsVisible" width="500" persistent>
          <add-profit-ratio />
          <v-dialog v-model="shareFormIsVisible" width="500" persistent>
            <add-share />
          </v-dialog>
        </v-dialog>
      </v-container>
    </v-main>
    <v-footer app class="footer">
      <h3>Powered by Two</h3>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import router from "./router";
import AddProfitRatio from "./components/AddProfitRatio";
import AddShare from "./components/AddShare.vue";

export default {
  components: {
    AddProfitRatio,
    AddShare
  },
  data() {
    return {
      valid: false,
      drawer: true,
      navItems: [
        {
          title: "Add New Scrip",
          icon: "mdi-plus",
          onClick: this.toggleAddShareForm
        },
        {
          title: "Set Profit Ratio",
          icon: "mdi-currency-inr",
          onClick: this.toggleAddProfitRatioForm
        },
        {
          title: "Trade Advice",
          icon: "mdi-message-text-outline",
          onClick: () => {
            router.push({ name: "Algorithm" });
          }
        },
        {
          title: "FAQs",
          icon: "mdi-frequently-asked-questions",
          onClick: () => {
            router.push({ name: "FAQs" });
          }
        },
        {
          title: "Fetch Shares",
          icon: "mdi-frequently-asked-questions",
          onClick: () => {
            router.push({ name: "FetchAPI" });
          }
        }
      ],
      links: [
        {
          title: "Login",
          icon: "mdi-account-group-outline",
          route: { name: "Login" }
        },
        {
          title: "Register",
          icon: "mdi-account-group-outline",
          route: { name: "Register" }
        }
      ],
      menuItems: [{ title: "Logout", onClick: this.logOut }],
      mini: true
      // user: {
      //   profile: {
      //     name: "loading"
      //   }
      // }
    };
  },
  computed: {
    ...mapState([
      "user",
      "profitRatioFormIsVisible",
      "shareFormIsVisible",
      "ShareSourceData"
    ])
  },
  beforeCreate() {
    if (!this.$store.state.user.auth) {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    },
    ...mapActions(["toggleAddShareForm", "toggleAddProfitRatioForm"])
  }
};
</script>
<style lang="scss" scoped>
@import "~@/sass/variables.scss";
.nav-bar,
.footer {
  background-color: $colors-brand-primary !important;
  color: $colors-brand-ui_5;
  // @include body1;
}
</style>
