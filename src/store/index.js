import { vuexfireMutations, firestoreAction } from "vuexfire";
import Vue from "vue";
// polifill for es6 promise (needs to be inserted before vuex)
import "es6-promise/auto";
import Vuex from "vuex";
// declare fb.db for the firebase database, import to store
import * as fb from "@/db";
import router from "../router";
import _ from "lodash";

// import ShareDataService from "@/services/ShareDataService.js";
import TradilioAPIService from "@/services/TradilioAPIService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // state holds all the data of the application
    /* state.ShareSourceData: [],
       declared as an empty array
       will receive the shares from firestore through
       the fireStoreAction in actions.bindShares()
    */
    ShareSourceData: [],
    // state holds the available shares that can be added by user
    // masterShares: [],
    /* state.users 
       declared as an empty array
       will receive the users from firestore through
       the fireStoreAction in actions.bindUsers()
    */
    userProfile: [],
    appData: [],
    scrapedSharesOutdated: false,

    // login and user profile
    user: [], // holds all user authentication and user profile data
    // user: [
    //   auth: { },
    //   profile: { } // migrated to userProfile
    // ]

    userShares: [], // populated on login when fetching user profile
    tradeAdvice: [], // populated on login when fetching user profile

    // Dashboard
    // shares
    selectedShare: "", // set from the shares table on click of a row
    shareFormIsVisible: false,
    // transactions
    transactionFormIsVisible: false,
    // shareTransactions: [], // populated on selection of a shares row
    profitRatioFormIsVisible: false
    // profit ratio
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
    // SET_MASTER_SHARES(state, val) {
    //   state.masterShares = val;
    // },

    // SET_SHARE_TRANSACTIONS(state, val) {
    //   state.shareTransactions = val;
    // },
    SET_SELECTED_SHARE(state, val) {
      state.selectedShare = val;
    },
    TOGGLE_TRANSACTION_FORM(state, val) {
      state.transactionFormIsVisible = val;
    },
    TOGGLE_SHARE_FORM(state, val) {
      state.shareFormIsVisible = val;
    },
    TOGGLE_PROFITRATIO_FORM(state, val) {
      state.profitRatioFormIsVisible = val;
    },
    SET_SHARE_SOURCE_DATA(state, val) {
      state.ShareSourceData = val;
    },
    SET_SCRAPED_SHARES_OUTDATED(state, val) {
      state.scrapedSharesOutdated = val;
    },
    SET_TRADE_ADVICE(state, val) {
      state.tradeAdvice = val;
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
    /**
     *
     */
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
        .collection("shareSourceData")
        .doc(String(docId.toMillis()))
        .set({ ...sharesObject, timestamp: fb.Timestamp.fromDate(new Date()) });
    }),
    /**
     * Bind all shares to the state
     */
    bindShares: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "shares"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "ShareSourceData",
        fb.db
          .collection("shareSourceData")
          .orderBy("timestamp", "desc")
          .limit(1)
      );
    }),
    /**
     * Bind all appData to the state
     */
    bindAppData: firestoreAction(({ bindFirestoreRef }) => {
      // this method uses vuexfire to bind a collection in firestore
      // to an object in the state, in this case "shares"

      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        "appData",
        fb.db.collection("appData").doc("scraper")
      );
    }),

    /** *************************************************************
     * USERS MODULE
     ************************************************************** */

    /**
     * Bind all users to the state
     */
    // bindUsers: firestoreAction(({ bindFirestoreRef }) => {
    //   // this method uses vuexfire to bind a collection in firestore
    //   // to an object in the state, in this case "users"

    //   // return the promise returned by `bindFirestoreRef`
    //   return bindFirestoreRef("users", fb.db.collection("users"));
    // }),

    /**
     * Bind user data to the state
     */
    bindUser: firestoreAction(({ bindFirestoreRef }, id) => {
      return bindFirestoreRef(
        "userProfile",
        fb.db.collection("users").doc(id),
        {
          maxRefDepth: 1
        }
      );
    }),
    /**
     * Bind user share data to the state
     */
    bindUserShares: firestoreAction(({ bindFirestoreRef }, user) => {
      return bindFirestoreRef(
        "userShares",
        fb.db
          .collection("users")
          .doc(user.uid)
          .collection("shares"),
        {
          maxRefDepth: 0
        }
      );
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

      // Add profile to user object
      // legacy: replaced by state.userProfile
      let userObject = {
        auth: user,
        profile: userProfile.data()
      };
      commit("SET_USER_PROFILE", userObject);

      // move to dashboard
      router.push({ name: "Home" });

      // bind user shares to the state
      // once bind complete, dispatch trade advice
      dispatch("bindUserShares", user);
      await dispatch("bindShares").then(() => {
        dispatch("runAdvice");
      });

      // bind app settings data to the state
      dispatch("bindAppData");
    },

    async updateGreedPercentage({ state }, percentage) {
      await fb.db.doc(`users/${state.user.auth.uid}`).update({
        greedPercentage: percentage
      });
    },
    checkScrapedSharesOutdated({ state, commit }) {
      let currentTime = fb.Timestamp.fromDate(new Date());
      console.log(currentTime.seconds);
      console.log(state.appData.lastScrape.seconds);
      console.log(
        currentTime.seconds - state.ShareSourceData[0].timestamp.seconds
      );
      let outdated =
        currentTime.seconds - state.ShareSourceData[0].timestamp.seconds > 86400
          ? true
          : false;
      console.log(outdated);
      // return outdated;
      commit("SET_SCRAPED_SHARES_OUTDATED", outdated);
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
        // create new email user in firebase
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
            name: data.formData.name,
            email: data.formData.email,
            mobile: data.formData.mobile,
            dmat: data.formData.dmat
          });
        dispatch("getUserProfile", data.user.user);
      } catch (error) {
        console.log(error);
      }
    },

    /** *************************************************************
     * USER SHARES MODULE
     ************************************************************** */

    /**
     * Get transactions collection for a given share and add them to
     * shareTransactions in the state.
     * @param {string} shareId
     */
    // async getTransactions({ state, commit }, shareId) {
    //   // fetch the transactions collection for the given shareId
    //   const transactionsCollectionRef = await fb.db
    //     .collection("users")
    //     .doc(state.user.auth.uid)
    //     .collection("shares")
    //     .doc(shareId)
    //     .collection("transactions")
    //     .get();

    //   // iterate over all transactions and fix timestamp
    //   let transactionsArray = [];
    //   transactionsCollectionRef.docs.forEach(share => {
    //     // store single transaction data temporarily
    //     let tempShareData = share.data();
    //     // update the timestamp to an actual date and time
    //     tempShareData.dateTime = tempShareData.dateTime.toDate();
    //     // push the modified transaction back into the array
    //     transactionsArray.push({ shareId: share.ref.id, ...tempShareData });
    //   });
    //   // commit transactions array to the store
    //   commit("SET_SHARE_TRANSACTIONS", transactionsArray);
    // },

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
    // Open and close add profit ratio form dialog
    toggleAddProfitRatioForm({ commit, state }) {
      let visibility = !state.profitRatioFormIsVisible;
      commit("TOGGLE_PROFITRATIO_FORM", visibility);
    },

    // add the transaction data into firebase transaction collection
    async addTransaction({ state }, transactionData) {
      // Format transaction data to be stored
      let data = {
        userRef: fb.db.collection("users").doc(state.user.auth.uid),
        shareRef: fb.db
          .collection("users")
          .doc(state.user.auth.uid)
          .collection("shares")
          .doc(state.selectedShare),
        timestamp: fb.Timestamp.fromDate(new Date()),
        ...transactionData
      };
      // update transaction dateTime to proper timestamp
      let tempTime = fb.Timestamp.fromDate(new Date(transactionData.dateTime));
      data.dateTime = tempTime;

      /**
       * Create new document in share/transactions
       * On success, add the transaction to the share object
       * with reference to original transaction
       */
      await data.shareRef
        .collection("transactions")
        .add(data)
        // on success, update transactions array
        .then(async docRef => {
          console.log("Document written with ID: ", docRef.id);
          // Add new object to Transactions Map inside the share
          await data.shareRef.update({
            transactions: fb.arrayAdd.arrayUnion({
              transactionRef: docRef,
              ...data
            })
          });
        });
      // dispatch("getTransactions", state.selectedShare);
    },

    // add the new share to the user on firebase
    async addShare({ state, dispatch }, shareData) {
      await fb.db
        .collection("users")
        .doc(state.user.auth.uid)
        .collection("shares")
        .doc(shareData.ticker)
        .set(shareData);
      dispatch("getUserShares", state.user.auth);
    },
    // fetch share master data from google sheet
    // async getMasterShares(
    //   { commit },
    //   options = {
    //     headers: [],
    //     records: null,
    //     COLUMNS: 7
    //   }
    // ) {
    //   let items = [];
    //   // let getURL =
    //   //   "https://spreadsheets.google.com/feeds/cells/" +
    //   //   options.SHEETID +
    //   //   "/" +
    //   //   options.sheetPageNumber +
    //   //   "/public/full?alt=json";

    //   // eslint-disable-next-line no-unused-vars
    //   const data = await ShareDataService.getShares()
    //     .then(response => {
    //       const entry = response.data.feed.entry;
    //       options.records = entry.length / options.COLUMNS - 1;
    //       for (let i = 0; i < options.COLUMNS; i++) {
    //         options.headers.push(entry[i].content.$t);
    //       }
    //       for (
    //         let i = options.headers.length;
    //         i < entry.length;
    //         i += options.COLUMNS
    //       ) {
    //         const item = {};
    //         for (let j = 0; j < options.headers.length; j++) {
    //           // entry[i].content.$t retrieves the content of each cell
    //           item[options.headers[j]] = entry[i + j].content.$t;
    //         }
    //         items.push(item);
    //       }
    //       commit("SET_MASTER_SHARES", items);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
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
    async getShareSourceData({ dispatch }) {
      let scrapedShares = [];
      // let scrapedShares2 = [];
      let total_pages = 2;
      for (var i = 1; i < total_pages; i++) {
        await TradilioAPIService.getShare2(i).then(response => {
          console.log("fetching API data / page " + i, response.data.data);
          response.data.data.forEach(e => {
            scrapedShares.push(e);
            // scrapedShares2[e.ticker] = e;
            // commit("SET_SHARE_SOURCE_DATA", scrapedShares);

            // dispatch("addMasterShare", e);
          });
          if (i == 1) {
            total_pages = response.data.total_pages;
            console.log(total_pages);
          }
        });
      }
      console.log(scrapedShares);
      // console.log(scrapedShares2);
      // commit("SET_TRADILIO_SHARES", scrapedShares);
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
    },
    compute_share_values(tempUserShares) {
      tempUserShares.forEach((share, index) => {
        this.log(
          `##### SHARE ${index + 1} ${
            share.company_name
          } _________________________________________________`
        );
        // compute market value
        share.market_value = Math.round(
          share.share_count * share.last_traded_price
        );
        this.log(
          `updated share.market_value:            ${Math.round(
            share.market_value
          )}`
        );

        // compute profit loss value
        share.profit_loss_value = Math.round(
          share.market_value - share.composit_purchase_value
        ); // (share.market_value – share.composit_purchase_value)
        this.log(
          `updated share.profit_loss_value:       ${Math.round(
            share.profit_loss_value
          )}`
        );

        // compute profit/loss percentage
        share.profit_loss_percentage = Math.round(
          (share.profit_loss_value / share.composit_purchase_value) * 100
        ); // (profit_loss_value / composit_purchase_value)
        this.log(
          `updated share.profit_loss_percentage:  ${Math.round(
            share.profit_loss_percentage
          )}`
        );

        // compute trade bands MIN/MAX
        share.trading_rates = {
          buy: {
            min: Math.round(
              share.last_transaction_trade_price -
                share.last_transaction_trade_price *
                  this.userProfile.greedPercentage
            ),
            max:
              share.last_transaction_trade_price +
              share.last_transaction_trade_price *
                this.userProfile.greedPercentage
          },
          sell: {
            min:
              share.last_transaction_trade_price +
              share.last_transaction_trade_price *
                this.userProfile.greedPercentage,
            max: share.year_high
          }
        };
        console.log("Greed after", this.userProfile.greedPercentage);

        // compute share category
        this.computeShareCategory(share);

        this.log(`...`);
      });
    },

    compute_user_values() {
      //   composit purchase value of all shares held by user
      this.log(
        `##### CALCULATING USER SHARE COMPOSIT VALUE, AVG P/L%, CAT_____`
      );
      let all_shares_composit_purchase_value = 0;
      let profit_loss_value = 0;

      /**
       * Loop through all user shares and calculate
       */
      this.user.shares.forEach(share => {
        this.log(
          `    adding share value:                ${share.composit_purchase_value}`
        );
        this.log(
          `    adding profit_loss_value:          ${share.profit_loss_value}`
        );
        all_shares_composit_purchase_value += share.composit_purchase_value;
        profit_loss_value += share.profit_loss_value;
        this.log(
          `    _________________________________________________________`
        );
      });

      this.log(`\n##### RESULTS: COMPOSIT VALUE, AVG P/L%, CAT_____________`);
      this.user.all_shares_composit_purchase_value = all_shares_composit_purchase_value;
      this.log(
        `updated user.all_shares_composit_purchase_value:   ${this.user.all_shares_composit_purchase_value}`
      );

      //   Total profit & loss
      this.user.total_profit_loss = profit_loss_value;
      this.log(
        `updated user.total_profit_loss:                    ${Math.round(
          this.user.total_profit_loss
        )}`
      );

      // average profit loss percentage
      this.user.avg_profit_loss_percentage =
        profit_loss_value / all_shares_composit_purchase_value;
      this.log(
        `updated user.avg_profit_loss_percentage:           ${Math.round(
          this.user.avg_profit_loss_percentage
        )}`
      );

      // share.share_category = 0; // (refer column s)
      // share.category_rating = 0; // (order desc index)
      // share.invest_value_serial = 0; // (column m (comp_purch_val) desc index)
      // share.trade_recommendation = 0; //(1=sell; 2=purchase) (comp_purchase < avg_cat_inv => purchase)
      // share.trade_min_price = 0; // (last_transaction_trade_price - (last_transaction_trade_price * greed_percentage)
      // share.trade_max_price = 0; // (last_transaction_trade_price + (last_transaction_trade_price * greed_percentage)
    },

    /**
     * This function evaluates the profit/loss percentage
     * assigns a category A, B, C, D depending on percentage
     * A – > 1000%
     * B – < 1000 > 500
     * C – < 500 > AVG profit/loss %
     * D – < AVG profit/loss % > -1
     * E – < -1
     */
    computeShareCategory(share) {
      if (share.profit_loss_percentage > 1000) {
        share.share_category = "A";
        this.log(
          `Assigned category: A — P/L %:          ${Math.round(
            share.profit_loss_percentage
          )}%`
        );
      } else if (share.profit_loss_percentage > 500) {
        share.share_category = "B";
        this.log(
          `Assigned category: B — P/L %:          ${Math.round(
            share.profit_loss_percentage
          )}%`
        );
      } else if (
        share.profit_loss_percentage > this.user.avg_profit_loss_percentage
      ) {
        share.share_category = "C";
        this.log(
          `Assigned category: C — P/L %:          ${Math.round(
            share.profit_loss_percentage
          )}%`
        );
      } else if (share.profit_loss_percentage > -1) {
        share.share_category = "D";
        this.log(
          `Assigned category: D — P/L %:          ${Math.round(
            share.profit_loss_percentage
          )}%`
        );
      } else if (share.profit_loss_percentage < -1) {
        share.share_category = "E";
        this.log(
          `Assigned category: E — P/L %:          ${Math.round(
            share.profit_loss_percentage
          )}%`
        );
      }
    },

    computeShareCategoryRating(shares) {
      /**
       * Sorting the user shares using lodash orderBy
       * First group by share category ASC
       * Sort by profit_loss_percentage DESC
       * */
      const shares_sorted_by_cat_pl = _.orderBy(
        shares,
        ["share_category", "profit_loss_percentage"],
        ["asc", "asc"]
      );
      // Grouping the shares by category and storing in a temporary array grouped
      let grouped = _.mapValues(
        _.groupBy(shares_sorted_by_cat_pl, "share_category")
      );
      console.table(grouped);

      /**
       * Calculate category_rating and assign to each share
       *
       */

      // Define counters
      let ca = 0;
      let cb = 0;
      let cc = 0;
      let cd = 0;
      let ce = 0;
      let next_count_value = 0;

      // Loop through each share and increment the value depending on category
      shares_sorted_by_cat_pl.forEach(share => {
        if (share.share_category == "A") {
          ca++;
          next_count_value = ca;
        }
        if (share.share_category == "B") {
          cb++;
          next_count_value = cb;
        }
        if (share.share_category == "C") {
          cc++;
          next_count_value = cc;
        }
        if (share.share_category == "D") {
          cd++;
          next_count_value = cd;
        }
        if (share.share_category == "E") {
          ce++;
          next_count_value = ce;
        }
        // Assign category_rating to share
        share.category_rating = `${share.share_category}${next_count_value}`;
      });

      // Assign sorted array back to user shares
      this.user.shares = shares_sorted_by_cat_pl;
      console.log("this.user.shares _____________");
      console.table(this.user.shares);
      console.table(shares_sorted_by_cat_pl);
    },

    computeSharesCategoryAvg(shares) {
      // Empty array to store composit_purchase_value and share count per category
      let catSum = {};
      // Loop through each share to calculate composit_purchase_value and share count per category
      shares.forEach(share => {
        !catSum[share.share_category]
          ? (catSum[share.share_category] = { sum: 0, count: 0 })
          : false;

        catSum[share.share_category].sum += share.composit_purchase_value;
        catSum[share.share_category].count++;
        // catCount[share.share_category]++;
      });
      // Calculate the category average
      for (const [, value] of Object.entries(catSum)) {
        value.avg = value.sum / value.count;
      }
      console.table(catSum);
      this.user.category_values = catSum;
    },

    computeTradeRecommendation(user) {
      let recommendation = [];
      user.shares.forEach(share => {
        console.log(share.composit_purchase_value);
        console.log(user.category_values[share.share_category].avg);
        console.log(share);
        recommendation.push([
          share.share_name,
          share.composit_purchase_value <
          user.category_values[share.share_category].avg
            ? "Buy"
            : "Sell"
        ]);
        share.trade_recommendation =
          share.composit_purchase_value <
          user.category_values[share.share_category].avg
            ? "Buy"
            : "Sell";
      });
      console.table(recommendation);
    },
    duplicateUserShares({ state, commit }) {
      // define the initial object
      let tempTradeAdvice = {
        all_shares_composit_purchase_value: 0, // sum of all shares.composit_purchase_value
        total_profit_loss: 0,
        avg_profit_loss_percentage: 0,
        greed_percentage: 0.07,
        category_values: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0
        },
        shares: []
      };
      // duplicate and augment each user share
      state.userShares.forEach(share => {
        share.share_count = 0;
        share.composit_purchase_value = 0;
        share.last_transaction_trade_price = 0;
        console.log(share);

        // Run only if share has transactions
        if (share.transactions) {
          share.transactions.forEach((t, index) => {
            index == 0
              ? (share.last_transaction_trade_price =
                  t.transactionPricePerShare)
              : false;
            share.composit_purchase_value += t.transactionValue;
            share.share_count += t.quantity;
          });
          // else keep values 0
        }
        tempTradeAdvice.shares.push(share);
      });
      commit("SET_TRADE_ADVICE", tempTradeAdvice);
      return true;
    },
    runAdvice({ dispatch }) {
      console.log(this.userShares);
      // let tempShares = this.userShares;
      dispatch("duplicateUserShares");
      dispatch("compute_share_values", this.tradeAdvice.shares);
      // this.duplicateUserShares();
      // this.compute_share_values(this.user.shares);
      // this.compute_user_values();
      // this.computeShareCategoryRating(this.user.shares);
      // this.computeSharesCategoryAvg(this.user.shares);
      // this.computeTradeRecommendation(this.user);
    },
    updateTradeAdvice({ commit }, tradeAdvice) {
      console.log("tradeA", tradeAdvice);
      commit("SET_TRADE_ADVICE", tradeAdvice.tradeAdvice);
    }
  },
  modules: {}
});
