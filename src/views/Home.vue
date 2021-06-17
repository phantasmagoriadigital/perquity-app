<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          Portfolio Overview
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-card elevation="2" height="100%">
            <v-card-subtitle>
              Portfolio Strength
            </v-card-subtitle>
          </v-card>
        </v-col>
        <!-- <v-col cols="6"> -->
        <!-- Dashboard Card -->
        <!-- <dashboard-card /> -->
        <v-col cols="2" v-for="card in cards" v-bind:key="card.title">
          <v-card elevation="2" height="100%" class="text-center">
            <v-card-text>
              {{ card.overtitle }}
            </v-card-text>
            <v-card-subtitle>
              {{ card.title }}
            </v-card-subtitle>
            <v-card-title>
              {{ card.value }}
            </v-card-title>
            <v-icon>
              {{ card.icon }}
            </v-icon>
            <v-card-text>
              {{ card.text }}
            </v-card-text>
            <v-tooltip bottom max-width="192px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  mdi-alert-circle
                </v-icon>
              </template>
              <span>{{ card.info }}</span>
            </v-tooltip>
          </v-card>
        </v-col>
        <!-- </v-col> -->
        <v-col cols="3">
          <v-card elevation="2" height="100%">
            <v-card-subtitle>
              Portfolio
            </v-card-subtitle>
            <v-card-title>
              302.08
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Classification of your holdings on the basis of reducing ROI
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex" cols="12" md="2">
          <v-select :items="select" label="Filter"></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex" cols="12" md="2">
          <v-text-field
            label="Enter your search term"
            hide-details="auto"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12">
          <v-row>
            <v-col
              v-for="(chart, i) in charts"
              :key="`chart-${i}`"
              cols="12"
              md="6"
              lg="4"
            >
              <material-chart-card
                :color="chart.color"
                :data="chart.data"
                :options="chart.options"
                :responsive-options="chart.responsiveOptions"
                :title="chart.title"
                :type="chart.type"
              >
                <template #subtitle>
                  <div class="font-weight-light text--secondary">
                    <div v-html="chart.subtitle" />
                  </div>
                </template>

                <template #actions>
                  <v-icon class="mr-1" small>
                    mdi-clock-outline
                  </v-icon>

                  <span
                    class="text-caption grey--text font-weight-light"
                    v-text="chart.time"
                  />
                </template>
              </material-chart-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->

      <!-- Share Card -->
      <share-card />
      <!-- Shares table -->
      <v-card color="grey darken-2">
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
          item-key="ticker"
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
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddTransaction from "../components/AddTransaction.vue";
import AddShare from "../components/AddShare.vue";
import ShareCard from "../components/ShareCard";
import DashboardCard from "../components/DashboardCard";
// import { get } from "vuex-pathify";
// import Vue from "vue";
export default {
  components: {
    AddTransaction,
    AddShare,
    ShareCard,
    DashboardCard
  },
  name: "Home",
  data() {
    return {
      cards: [
        {
          overtitle: "COMPOSITE",
          title: "PURCHASE VALUE",
          value: "",
          icon: "mdi-info",
          text: "VALUE IN INR",
          info:
            "Composite cost of capital represents a company's cost to finance its business as determined by its weighted average cost of capital (WACC)."
        },
        {
          overtitle: "LAST",
          title: "MARKET VALUE",
          value: "",
          icon: "mdi-info",
          text: "VALUE IN INR",
          info: "Info"
        },
        {
          overtitle: "TOTAL",
          title: "GAIN / LOSS",
          value: "",
          icon: "mdi-info",
          text: "VALUE IN INR",
          info: "Info"
        }
      ],
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
            text: "Share Code",
            align: "start",
            sortable: true,
            value: "ticker"
          },
          { text: "Share Name", value: "company_name" },
          { text: "Share Id", value: "id" },
          { text: "Current Value", value: "last_traded_price", align: "end" },
          { text: "1 Year Low", value: "year_low", align: "end" },
          { text: "1 Year High", value: "year_high", align: "end" },
          { text: "Net Prof", value: "net_profit", align: "end" },
          { text: "Sales", value: "sales", align: "end" }
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
          { text: "Transaction Type", value: "transactionType" },
          { text: "Quantity", value: "quantity", align: "end" },
          {
            text: "Price Per Share",
            value: "transactionPricePerShare",
            align: "end"
          },
          {
            text: "Transaction Value",
            value: "transactionValue",
            align: "end"
          },
          { text: "Transaction Date", value: "dateTime", align: "end" }
        ],
        transactions: []
      },
      select: ["Item1", "Item2", "Item3"]
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
