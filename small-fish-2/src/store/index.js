import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vue from "vue";
// polifill for es6 promise (needs to be inserted before vuex)
import "es6-promise/auto";
import Vuex from "vuex";
// declare fb.db for the firebase database, import to store
import * as fb from "@/db";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // state holds all the data of the application
    /* state.shares 
       declared as an empty array
       will receive the shares from firestore through
       the fireStoreAction in actions.bindShares()
    */
    shares: [],

    /* state.users 
       declared as an empty array
       will receive the users from firestore through
       the fireStoreAction in actions.bindUsers()
    */
    users: [],
    user: []
  },
  mutations: {
    USER_IS_CREATED(state, val) {
      state.userIsCreated = val;
    },
    SET_USER_PROFILE(state, val) {
      state.user = val;
    },
    // other mutations
    ...vuexfireMutations
  },
  actions: {
    bindShares: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "shares"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("shares", fb.db.collection("sharesMaster"));
    }),

    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "users"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("users", fb.db.collection("users"));
    }),

    bindUser: firestoreAction(({ bindFirestoreRef }, uid) => {
      return bindFirestoreRef("user", fb.db.collection("users").doc(uid));
    }),

    addShareMaster: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      console.log(payload.id, payload.shareData);
      // console.log(context);
      return fb.db
        .collection("sharesMaster")
        .doc(payload.id)
        .set(payload.shareData);
    }),
    /**
     * Login User through firebase Auth
     * @param {object} context
     * @param {object} loginData form email and password
     */
    loginUser({ dispatch }, loginData) {
      console.log("loginData: ", loginData);
      const authenticateUser = fb.auth.signInWithEmailAndPassword(
        loginData.email,
        loginData.password
      );
      authenticateUser
        .then(userCredential => {
          // Signed in
          var user = userCredential.user;
          console.log("🚀 ~ file: index.js ~ line 70 ~ loginUser ~ user", user);
          // ...
          console.log(user.uid);
          dispatch("getUserProfile", user);
        })
        .catch(error => {
          var errorCode = error.code;
          console.log(
            "🚀 ~ file: index.js ~ line 75 ~ loginUser ~ errorCode",
            errorCode
          );
          var errorMessage = error.message;
          console.log(
            "🚀 ~ file: index.js ~ line 77 ~ loginUser ~ errorMessage",
            errorMessage
          );
        });
    },

    async logOut({ commit }) {
      await fb.auth.signOut();
      commit("SET_USER_PROFILE", {});
      router.push({ name: "Login" });
    },
    async getUserProfile({ commit }, user) {
      console.log(
        "🚀 ~ file: index.js ~ line 99 ~ getUserProfile ~ user",
        user
      );

      const userProfile = await fb.db
        .collection("users")
        .doc(user.uid)
        .get();

      console.log(
        "🚀 ~ file: index.js ~ line 101 ~ getUserProfile ~ userProfile",
        userProfile.data()
      );

      await fb.db
        .collection("users")
        .doc(user.uid)
        .collection("shares")
        .get()
        .then(shares => {
          shares.docs.forEach(share => {
            console.log("share: ", share.data());
          });
        });

      let userObject = {
        auth: user,
        profile: userProfile.data()
      };
      console.log(
        "🚀 ~ file: index.js ~ line 119 ~ getUserProfile ~ userObject",
        userObject
      );
      commit("SET_USER_PROFILE", userObject);
      router.push({ name: "Home" });
    },

    updateUser({ commit }, data) {
      console.log(data);
      data.user
        .updateProfile({
          displayName: "My Display Name"
        })
        .then(() => {
          console.log("updated User Profile succesfully");
        })
        .catch(err => {
          console.log("error: ", err.message);
          this.error = err.message;
        });
      commit("USER_IS_CREATED", true);
    },

    async createUser({ commit, dispatch }, formData) {
      console.log(
        "🚀 ~ file: index.js ~ line 106 ~ createUser ~ formData",
        formData
      );

      try {
        const user = await fb.auth.createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        console.log("🚀 ~ file: index.js ~ line 111 ~ createUser ~ user", user);

        // update state
        commit("USER_IS_CREATED", true);

        // create user profile
        dispatch("createUserProfile", { user, formData });
      } catch (error) {
        console.error(
          "🚀 ~ file: index.js ~ line 141 ~ createUser ~ error",
          error.message
        );
      }
    },

    async createUserProfile(context, data) {
      console.log(
        "🚀 ~ file: index.js ~ line 148 ~ createUserProfile ~ user",
        data
      );
      try {
        await fb.db
          .collection("users")
          .doc(data.user.user.uid)
          .set({
            name: data.formData.name
          });
      } catch (error) {
        console.log(error);
      }
    },

    createUser1({ commit, dispatch }, formData) {
      console.log(formData);

      const createNewUser = fb.auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      createNewUser.then(user => {
        console.log("user", user);
        // console.log(user.user.uid);
        // update user
        dispatch("createUserProfile", { user, formData });
        // this.updateUser(data.user);

        commit("USER_IS_CREATED", true);
      });

      createNewUser.catch(err => {
        console.log("error: ", err.message);
        this.error = err.message;
      });

      return createNewUser;
      // return fb.auth
      //   .createUserWithEmailAndPassword(formData.email, formData.password)
      //   .then(data => {
      //     console.log("data", data);
      //     console.log(data.user.uid);
      //     data.user
      //       .updateProfile({
      //         displayName: "My Display Name"
      //       })
      //       .then(data => {
      //         console.log("updateUserPrimose: ", data);
      //       });
      //     commit("USER_IS_CREATED", true);
      //   })
      //   .catch(err => {
      //     console.log("error: ", err.message);
      //     this.error = err.message;
      //   });
    }
  },
  modules: {}
});
