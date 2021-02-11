<template>
  <div id="login">
    <div id="signin">
      <h1>hello</h1>
      <form id="registration">
        <vue-form-generator
          id="registrationForm"
          :schema="forms.registration.schema"
          :model="forms.registration.model"
          :options="forms.registration.formOptions"
        >
        </vue-form-generator>
      </form>
      <vue-form-generator
        id="loginForm"
        :schema="forms.login.schema"
        :model="forms.login.model"
        :options="forms.login.formOptions"
      >
      </vue-form-generator>
      <!-- render the login form
        user will input the email and password
        submit buttom will send the data to a function
        this function will send the data to firebase
        attempt to login which will return a promise or an error
        if promise
          - update the state with the user data (id, email, displayName)
          - fetch additional user data from firestore user collection
            if promise 
              - update state with additional user data.
              state.user: {
                auth: {
                  id: '',
                  displayName: '',
                  email: ''
                },
                profile: {
                  ...
                }
              }
        else catch error-->
    </div>
    <div id="register"></div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      forms: {
        registration: {
          model: {},
          schema: {
            groups: [
              {
                legend: "User Details",
                fields: [
                  {
                    type: "input",
                    inputType: "text",
                    label: "ID (disabled text field)",
                    model: "id",
                    readonly: true,
                    disabled: true
                  },
                  {
                    type: "input",
                    inputType: "text",
                    label: "Name",
                    model: "name",
                    id: "user_name",
                    placeholder: "Your name",
                    featured: true,
                    required: true
                  },
                  {
                    type: "input",
                    inputType: "email",
                    label: "E-mail",
                    model: "email",
                    placeholder: "User's e-mail address"
                  },
                  {
                    type: "input",
                    inputType: "password",
                    label: "Password",
                    model: "password",
                    min: 6,
                    required: true,
                    hint: "Minimum 6 characters",
                    validator: "string"
                  },
                  {
                    type: "submit",
                    id: "regSubmit",
                    buttonText: "Submit",
                    validateBeforeSubmit: true,
                    onSubmit: this.registerUser
                  }
                ]
              }
            ]
          },
          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true,
            validateAsync: true
          }
        },
        login: {
          //create a model
          model: {},
          //create a schema
          schema: {
            fields: [
              {
                type: "input",
                inputType: "email",
                id: "loginEmail",
                label: "Email",
                model: "email"
              },
              {
                type: "input",
                inputType: "password",
                id: "loginPassword",
                label: "Password",
                model: "password"
              },
              {
                type: "submit",
                buttonText: "Submit",
                id: "loginSubmit",
                onSubmit: this.loginUser
              }
            ]
          }
          //create formoptions
        }
      }
    };
  },
  methods: {
    // ...mapActions(["loginUser"]),
    loginUser(loginData) {
      this.$store.dispatch("loginUser", loginData);
    },
    registerUser(formModel) {
      console.log(formModel.email);
      this.$store.dispatch("createUser", formModel);
      // console.log(this.model);
    }
  }
};
</script>

<style lang="scss" scoped></style>
