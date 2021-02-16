<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

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
      <v-text-field
        v-model="confirmPassword"
        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirm ? 'text' : 'password'"
        :rules="[password === confirmPassword || 'Passwords must match']"
        label="Confirm Password"
        counter
        @click:append="showConfirm = !showConfirm"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Register
      </v-btn>
    </v-form>
  </v-app>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    show: false,
    showConfirm: false,
    valid: false,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 6) || "Password must be more than 6 characters"
    ],
    confirmPassword: ""
  }),

  methods: {
    validate() {
      this.$refs.form.validate() ? this.registerUser() : false;
    },
    registerUser() {
      let registerUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("createUser", registerUser);
      // console.log(this.model);
    }
  }
};
</script>

<style lang="scss" scoped></style>
