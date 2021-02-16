<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="passwordRules"
        label="Password"
        counter
        @click:append="show = !show"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Login
      </v-btn>
    </v-form>
  </v-app>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      valid: false,
      show: false,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ]
    };
  },
  methods: {
    // ...mapActions(["loginUser"]),
    validate() {
      this.$refs.form.validate
        ? this.loginUser()
        : console.log("validation error");
    },
    loginUser() {
      let loginData = {
        email: this.email,
        password: this.password
      };
      console.log(
        "🚀 ~ file: Login.vue ~ line 58 ~ loginUser ~ loginData",
        loginData
      );

      if (loginData.email && loginData.password) {
        this.$store.dispatch("loginUser", loginData);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
