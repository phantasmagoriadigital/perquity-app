<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      v-if="user.profile"
      :mini-variant.sync="mini"
      permanent
      app
      clipped
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <!-- <template v-if="user.profile.name">
          <v-list-item-title>
            {{ user.profile.name }}
          </v-list-item-title>
        </template> -->

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logOut">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-toolbar-title>Small Fish</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="link.title"
        text
        rounded
        :to="link.route"
        >{{ link.title }}
      </v-btn>
    </v-app-bar>
    <v-main app>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
    <v-footer app>
      <h3>Powered by Two</h3>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      valid: false,
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", route: { name: "Home" } },
        { title: "Account", icon: "mdi-account", route: { name: "About" } }
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
      mini: true
      // user: {
      //   profile: {
      //     name: "loading"
      //   }
      // }
    };
  },
  computed: {
    ...mapState(["user"])
  },
  beforeCreate() {
    if (!this.$store.state.user.auth) {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>
