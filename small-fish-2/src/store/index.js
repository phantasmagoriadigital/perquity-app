import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vue from "vue";
import Vuex from "vuex";
// declare db for the firebase database, import to store
import { db } from "@/db";

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

    sharesModule: {
      shares: [],
      localdata: {
        createShare: {
          isActivelyTraded: true,
          price: 1952,
          name: "AXIS Bank Ltd voltas111111",
          shareInfo: { low1y: 1001, high5y: 2030, high1y: 2030, low5y: 0 }
        }
      }
    },

    /* state.users 
       declared as an empty array
       will receive the users from firestore through
       the fireStoreAction in actions.bindUsers()
    */
    users: []
  },
  mutations: {
    // other mutations
    ...vuexfireMutations
  },
  actions: {
    bindShares: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "shares"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("shares", db.collection("sharesMaster"));
    }),
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "users"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("users", db.collection("users"));
    }),
    //
    addShareMaster: firestoreAction((context, payload) => {
      // return the promise so we can await the write
      console.log(payload.id, payload.shareData);
      // console.log(context);
      return db
        .collection("sharesMaster")
        .doc(payload.id)
        .set(payload.shareData);
    })
  },
  modules: {}
});
