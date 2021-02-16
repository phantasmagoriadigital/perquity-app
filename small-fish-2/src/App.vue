<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

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
    <!-- <div id="app">
      <v-app-bar app>
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link :to="{ name: 'About' }">About</router-link> |
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <a @click="logOut">Logout</a>
        <router-view />
      </v-app-bar>
    </div> -->
    <v-main app>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city", route: { name: "Home" } },
        { title: "About", icon: "mdi-account", route: { name: "About" } },
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
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
    }
  }
};
</script>
