<template>
  <v-app>
    <v-container>
      <v-row>
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
      </v-row>
    </v-container>
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
import "../plugins/chartist";
import MaterialChartCard from "../components/MaterialChartCard";
import ShareCard from "../components/ShareCard";
// import { get } from "vuex-pathify";
import Vue from "vue";
const lineSmooth = Vue.chartist.Interpolation.cardinal({
  tension: 0
});
export default {
  components: { AddTransaction, AddShare, MaterialChartCard, ShareCard },
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
            text: "Share Code",
            align: "start",
            sortable: true,
            value: "shareCode"
          },
          { text: "Share Name", value: "shareName" },
          { text: "Share Id", value: "shareId" },
          { text: "Current Value", value: "currentValue", align: "end" },
          { text: "1 Year Low", value: "l1y", align: "end" },
          { text: "1 Year High", value: "h1y", align: "end" },
          { text: "5 Year Low", value: "l5y", align: "end" },
          { text: "5 Year High", value: "h5y", align: "end" }
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
      charts: [
        {
          type: "Bar",
          color: "primary",
          title: "Website Views",
          subtitle: "Last Campaign Performance",
          time: "updated 10 minutes ago",
          data: {
            labels: [
              "Ja",
              "Fe",
              "Ma",
              "Ap",
              "Mai",
              "Ju",
              "Jul",
              "Au",
              "Se",
              "Oc",
              "No",
              "De"
            ],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0
            }
          },
          responsiveOptions: [
            [
              "screen and (max-width: 640px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                }
              }
            ]
          ]
        },
        {
          type: "Line",
          color: "success",
          title: "Daily Sales",
          subtitle:
            '<i class="mdi mdi-arrow-up green--text"></i><span class="green--text">55%</span>&nbsp;increase in today\'s sales',
          time: "updated 4 minutes ago",
          data: {
            labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
            series: [[230, 750, 450, 300, 280, 240, 200, 190]]
          },
          options: {
            lineSmooth,
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        {
          type: "Line",
          color: "info",
          title: "Completed Tasks",
          subtitle: "Last Campaign Performance",
          time: "campaign sent 26 minutes ago",
          data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            series: [[12, 17, 7, 17, 23, 18, 38]]
          },
          options: {
            lineSmooth,
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        }
      ]
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
