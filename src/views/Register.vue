<template>
  <v-app>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="model.name"
        :counter="10"
        :rules="rules.name"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="model.email"
        :rules="rules.email"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="model.password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        :rules="rules.password"
        label="Password"
        counter
        @click:append="show = !show"
        required
      ></v-text-field>
      <v-text-field
        v-model="model.confirmPassword"
        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirm ? 'text' : 'password'"
        :rules="[
          model.password === model.confirmPassword || 'Passwords must match'
        ]"
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
import { mapActions } from "vuex";
export default {
  name: "Register",
  data: () => ({
    show: false,
    showConfirm: false,
    valid: false,
    model: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    rules: {
      name: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ]
    }
  }),

  methods: {
    validate() {
      this.$refs.form.validate() ? this.createUser(this.model) : false;
    },
    // registerUser() {
    //   // let registerUser = {
    //   //   name: this.name,
    //   //   email: this.email,
    //   //   password: this.password
    //   // };
    //   this.$store.dispatch("createUser", this.model);
    //   // console.log(this.model);
    // },
    ...mapActions(["createUser"])
  }
};
</script>

<style lang="scss" scoped></style>
