import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vue from "vue";
// polifill for es6 promise (needs to be inserted before vuex)
import "es6-promise/auto";
import Vuex from "vuex";
// declare fb.db for the firebase database, import to store
import * as fb from "@/db";
import router from "../router";
import ShareDataService from "@/services/ShareDataService.js";
import TradilioAPIService from "@/services/TradilioAPIService.js";

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
    // state holds the available shares that can be added by user
    masterShares: [],
    /* state.users 
       declared as an empty array
       will receive the users from firestore through
       the fireStoreAction in actions.bindUsers()
    */
    users: [],

    // login and user profile
    user: [], // holds all user authentication and user profile data
    // user: [
    //   auth: { },
    //   profile: { }
    // ]

    userShares: [], // populated on login when fetchin user profile
    // userShares: [
    //   {
    //     shareId: "aI0AdMFHs59ljAiSN7FJ",
    //     shareName: "State Bank of India",
    //     shareCode: "NSE:SBIN"
    //   }
    // ]

    // Dashboard
    // shares
    selectedShare: "", // set from the shares table on click of a row
    shareFormIsVisible: false,
    // transactions
    shareTransactions: [], // populated on selection of a shares row
    transactionFormIsVisible: false,
    sharesTradilio: []
  },
  mutations: {
    USER_IS_CREATED(state, val) {
      state.userIsCreated = val;
    },

    SET_USER_PROFILE(state, val) {
      state.user = val;
    },

    SET_USER_SHARES(state, val) {
      state.userShares = val;
    },
    SET_MASTER_SHARES(state, val) {
      state.masterShares = val;
    },

    SET_SHARE_TRANSACTIONS(state, val) {
      state.shareTransactions = val;
    },
    SET_SELECTED_SHARE(state, val) {
      state.selectedShare = val;
    },
    TOGGLE_TRANSACTION_FORM(state, val) {
      state.transactionFormIsVisible = val;
    },
    TOGGLE_SHARE_FORM(state, val) {
      state.shareFormIsVisible = val;
    },
    SET_TRADILIO_SHARES(state, val) {
      state.sharesTradilio = val;
    },

    // other mutations
    ...vuexfireMutations
  },
  actions: {
    /**
     * Add share to share master collection
     */
    addShareMaster: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      return fb.db
        .collection("MasterShares")
        .doc(payload.id)
        .set(payload.shareData);
    }),
    addShareSourceData: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      let docId = fb.Timestamp.fromDate(new Date());
      console.log(docId.toMillis());
      let sharesObject = {
        data: []
      };
      payload.forEach(item => {
        sharesObject.data.push(item);
      });
      console.log("docId", docId);
      console.log("sharesObject", sharesObject);
      console.log("Uploading to FireStore...............");
      return fb.db
        .collection("ShareSourceData")
        .doc(String(docId.toMillis()))
        .set(sharesObject);
    }),
    /**
     * Bind all shares to the state
     */
    bindShares: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "shares"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("shares", fb.db.collection("masterShares"));
    }),

    /** *************************************************************
     * USERS MODULE
     ************************************************************** */

    /**
     * Bind all users to the state
     */
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "users"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("users", fb.db.collection("users"));
    }),

    /**
     * Bind user data to the state
     */
    bindUser: firestoreAction(({ bindFirestoreRef }, uid) => {
      return bindFirestoreRef("user", fb.db.collection("users").doc(uid), {
        maxRefDepth: 2
      });
    }),

    /**
     * Login User through firebase Auth
     * @param {object} context
     * @param {object} loginData form email and password
     */
    loginUser({ dispatch }, loginData) {
      const authenticateUser = fb.auth.signInWithEmailAndPassword(
        loginData.email,
        loginData.password
      );
      authenticateUser
        .then(userCredential => {
          // Signed in
          var user = userCredential.user;
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

    /**
     * logOut
     * @param {*} param0
     */
    async logOut({ commit }) {
      await fb.auth.signOut();
      commit("SET_USER_PROFILE", {});
      router.push({ name: "Login" });
    },

    /**
     * getUserProfile
     * @param {*} param0
     * @param {*} user
     */
    async getUserProfile({ commit, dispatch }, user) {
      dispatch("bindUser", user.uid);

      // fetch the user document form users collection
      const userProfile = await fb.db
        .collection("users")
        .doc(user.uid)
        .get();
      let userObject = {
        auth: user,
        profile: userProfile.data()
      };
      commit("SET_USER_PROFILE", userObject);
      dispatch("getUserShares", user);
      router.push({ name: "Home" });
    },

    // Fetch the shares collection of the logged in user
    async getUserShares({ commit }, user) {
      const userShares = await fb.db
        .collection("users")
        .doc(user.uid)
        .collection("shares")
        .get();

      // Log user shares in the console
      let sharesArray = [];
      userShares.docs.forEach(share => {
        sharesArray.push({ shareId: share.ref.id, ...share.data() });
      });

      // commit the shares array to the state
      commit("SET_USER_SHARES", sharesArray);
    },

    /**
     * updateUser
     * @param {*} param0
     * @param {*} data
     */
    updateUser({ commit }, data) {
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

    /**
     * createUser
     * @param {*} param0
     * @param {*} formData
     */
    async createUser({ commit, dispatch }, formData) {
      try {
        const user = await fb.auth.createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
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

    /**
     * createUserProfile
     * @param {*} context
     * @param {*} data
     */
    async createUserProfile({ dispatch }, data) {
      try {
        await fb.db
          .collection("users")
          .doc(data.user.user.uid)
          .set({
            name: data.formData.name
          });
        dispatch("getUserProfile", data.user.user);
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * createUser1
     * @param {*} param0
     * @param {*} formData
     */
    // createUser1({ commit, dispatch }, formData) {
    //   const createNewUser = fb.auth.createUserWithEmailAndPassword(
    //     formData.email,
    //     formData.password
    //   );

    //   createNewUser.then(user => {
    //     // update user
    //     dispatch("createUserProfile", { user, formData });
    //     // this.updateUser(data.user);

    //     commit("USER_IS_CREATED", true);
    //   });

    //   createNewUser.catch(err => {
    //     console.log("error: ", err.message);
    //     this.error = err.message;
    //   });

    //   return createNewUser;
    // },

    /** *************************************************************
     * USER SHARES MODULE
     ************************************************************** */

    /**
     * Get transactions collection for a given share and add them to
     * shareTransactions in the state.
     * @param {string} shareId
     */
    async getTransactions({ state, commit }, shareId) {
      // fetch the transactions collection for the given shareId
      const transactionsCollectionRef = await fb.db
        .collection("users")
        .doc(state.user.auth.uid)
        .collection("shares")
        .doc(shareId)
        .collection("transactions")
        .get();

      // iterate over all transactions and fix timestamp
      let transactionsArray = [];
      transactionsCollectionRef.docs.forEach(share => {
        // store single transaction data temporarily
        let tempShareData = share.data();
        // update the timestamp to an actual date and time
        tempShareData.dateTime = tempShareData.dateTime.toDate();
        // push the modified transaction back into the array
        transactionsArray.push({ shareId: share.ref.id, ...tempShareData });
      });
      // commit transactions array to the store
      commit("SET_SHARE_TRANSACTIONS", transactionsArray);
    },

    // load the share id into the selectedShare state
    selectedShareRow({ commit }, shareId) {
      commit("SET_SELECTED_SHARE", shareId);
    },

    // Open and close add transaction form dialog
    toggleAddTransactionForm({ commit, state }) {
      let visibility = !state.transactionFormIsVisible;
      commit("TOGGLE_TRANSACTION_FORM", visibility);
    },

    // Open and close add share form dialog
    toggleAddShareForm({ commit, state }) {
      let visibility = !state.shareFormIsVisible;
      commit("TOGGLE_SHARE_FORM", visibility);
    },

    // add the transaction data into firebase transaction collection
    async addTransaction({ state, dispatch }, transactionData) {
      let data = {
        userRef: fb.db.collection("users").doc(state.user.auth.uid),
        shareRef: fb.db
          .collection("users")
          .doc(state.user.auth.uid)
          .collection("shares")
          .doc(state.selectedShare),
        timestamp: fb.serverTimestamp,
        ...transactionData
      };

      let tempTime = fb.Timestamp.fromDate(new Date(transactionData.dateTime));
      data.dateTime = tempTime;
      await fb.db
        .collection("users")
        .doc(state.user.auth.uid)
        .collection("shares")
        .doc(state.selectedShare)
        .collection("transactions")
        .doc()
        .set(data);
      dispatch("getTransactions", state.selectedShare);
    },

    // add the new share to the user on firebase
    async addShare({ state, dispatch }, shareData) {
      await fb.db
        .collection("users")
        .doc(state.user.auth.uid)
        .collection("shares")
        .doc()
        .set(shareData);
      dispatch("getUserShares", state.user.auth);
    },
    // fetch share master data from google sheet
    async getMasterShares(
      { commit },
      options = {
        headers: [],
        records: null,
        COLUMNS: 7
      }
    ) {
      let items = [];
      // let getURL =
      //   "https://spreadsheets.google.com/feeds/cells/" +
      //   options.SHEETID +
      //   "/" +
      //   options.sheetPageNumber +
      //   "/public/full?alt=json";

      // eslint-disable-next-line no-unused-vars
      const data = await ShareDataService.getShares()
        .then(response => {
          const entry = response.data.feed.entry;
          options.records = entry.length / options.COLUMNS - 1;
          for (let i = 0; i < options.COLUMNS; i++) {
            options.headers.push(entry[i].content.$t);
          }
          for (
            let i = options.headers.length;
            i < entry.length;
            i += options.COLUMNS
          ) {
            const item = {};
            for (let j = 0; j < options.headers.length; j++) {
              // entry[i].content.$t retrieves the content of each cell
              item[options.headers[j]] = entry[i + j].content.$t;
            }
            items.push(item);
          }
          commit("SET_MASTER_SHARES", items);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // async getTradilioShares({ commit }) {

    //   await TradilioAPIService.getShares1()
    //     .then(response => {
    //       commit("SET_TRADILIO_SHARES", response.data);
    //       console.log("shares:", response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    async getTradilioShares({ commit, dispatch }) {
      let scrapedShares = [];
      let total_pages = 2;
      for (var i = 1; i < total_pages; i++) {
        await TradilioAPIService.getShare2(i).then(response => {
          console.log("fetching API data / page " + i, response.data.data);
          response.data.data.forEach(e => {
            scrapedShares.push(e);
            // dispatch("addMasterShare", e);
          });
          if (i == 1) {
            total_pages = response.data.total_pages;
            console.log(total_pages);
          }
        });
      }
      console.log(scrapedShares);
      commit("SET_TRADILIO_SHARES", scrapedShares);
      dispatch("addShareSourceData", scrapedShares);
    },
    // add the transaction data into firebase transaction collection
    async addMasterShare(context, shareData) {
      console.log("shareData", shareData.id);

      await fb.db
        .collection("masterShares")
        .doc(shareData.id)
        .set(shareData)
        .then(async () => {
          let archiveTime = `A${Date.now()}`;
          console.log(archiveTime);
          await fb.db
            .collection("masterShares")
            .doc(shareData.id)
            .collection("archive")
            .doc(archiveTime)
            .set(shareData);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  },
  modules: {}
});
