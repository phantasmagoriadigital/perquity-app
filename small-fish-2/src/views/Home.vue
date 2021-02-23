<template>
  <v-app>
    <!-- Shares table -->
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="share.search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        >
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="toggleAddShareForm" color="primary">Add Share</v-btn>
      </v-card-title>
      <v-data-table
        :headers="share.shareHeaders"
        :items="userShares"
        :expanded.sync="share.expanded"
        :search="share.search"
        show-expand
        single-expand
        item-key="shareCode"
        @item-expanded="rowSelected"
      >
        <template v-slot:expanded-item>
          <!-- Shares transaction table based on the shares row clicked -->
          <td :colspan="share.shareHeaders.length + 1">
            <v-card>
              <v-card-title> </v-card-title>
              <v-btn @click="toggleAddTransactionForm" color="primary"
                >Add Transaction</v-btn
              >
              <v-data-table
                :headers="transactions.transactionHeaders"
                :items="shareTransactions"
              ></v-data-table>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="transactionFormIsVisible" width="500" persistent>
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Click Me
        </v-btn>
      </template> -->
      <!-- <add-transaction /> -->
      <component v-bind:is="dialogComponent.AddTransaction"></component>
    </v-dialog>
    <v-dialog v-model="shareFormIsVisible" width="500" persistent>
      <add-share />
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddTransaction from "../components/AddTransaction.vue";
import AddShare from "../components/AddShare.vue";
export default {
  components: { AddTransaction, AddShare },
  name: "Home",
  data() {
    return {
      dialogComponent: {
        AddTransaction,
        AddShare
      },
      // console.log(dialogComponent);

      share: {
        search: "",
        expanded: [],
        shareHeaders: [
          {
            text: "shareCode",
            align: "start",
            sortable: true,
            value: "shareCode"
          },
          { text: "shareName", value: "shareName" },
          { text: "shareId", value: "shareId" }
          // { text: "currentValue", value: "currentValue", align: "end" },
          // { text: "l1y", value: "l1y", align: "end" },
          // { text: "h1y", value: "h1y", align: "end" },
          // { text: "l5y", value: "l5y", align: "end" },
          // { text: "h5y", value: "h5y", align: "end" }
        ],
        shares: []
      },
      transactions: {
        search: "",
        transactionHeaders: [
          // {
          //   text: "shareRef",
          //   align: "start",
          //   sortable: true,
          //   value: "shareRef"
          // },
          { text: "transactionType", value: "transactionType" },
          { text: "quantity", value: "quantity", align: "end" },
          {
            text: "transactionPricePerShare",
            value: "transactionPricePerShare",
            align: "end"
          },
          { text: "transactionValue", value: "transactionValue", align: "end" },
          { text: "dateTime", value: "dateTime", align: "end" }
        ],
        transactions: []
      }
    };
  },
  methods: {
    // handles click:row events for User Shares data table
    // Automatically receives the event as a param
    rowSelected(event) {
      console.log(
        "🚀 ~ file: Home.vue ~ line 95 ~ rowSelected ~ event",
        event.item
      );
      // on click of share row, load trasactions based on share id
      // shareId is received through the event.
      this.selectedShareRow(event.item.shareId);
      this.getTransactions(event.item.shareId);
    },
    // handles submit for add transaction form
    // validate() {
    //   this.$refs.form.validate
    //     ? this.addTransaction()
    //     : console.log("validation error");
    // },
    // // send the add transaction form data to store
    // addTransaction() {
    //   let transactionData = this.form.model;
    //   this.$store.dispatch("addTransaction", this.form.model);
    //   console.log(
    //     "🚀 ~ file: Home.vue ~ line 136 ~ addTransaction ~ transactionData",
    //     transactionData
    //   );
    // },
    ...mapActions([
      "getTransactions",
      "selectedShareRow",
      "toggleAddTransactionForm",
      "toggleAddShareForm"
    ])
  },
  computed: {
    ...mapState([
      "userShares",
      "shareTransactions",
      "selectedShare",
      "transactionFormIsVisible",
      "shareFormIsVisible"
    ])
  }
};
</script>
