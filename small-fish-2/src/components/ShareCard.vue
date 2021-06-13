<template>
  <div>
    <v-card elevation="0" v-for="share in shares" v-bind:key="share.shareId">
      <v-row class="d-flex">
        <v-col cols="8">
          <v-card height="100%">
            <v-row>
              <v-col cols="3">
                <v-card-title>{{ share.title }}</v-card-title>
              </v-col>
              <v-col cols="2">
                <v-card-text> BSE {{ share.BSE }} </v-card-text>
              </v-col>
              <v-col cols="2">
                <v-card-text> Volume {{ share.volume }} </v-card-text>
              </v-col>
              <v-col cols="4">
                <v-card-text
                  >₹ {{ share.closing }} LAST CLOSING RATE</v-card-text
                >
              </v-col>
            </v-row>
            <v-row class="d-flex">
              <v-col>
                <v-card-text>Total Shares Purchased </v-card-text>
                <v-card-subtitle>{{ share.purchased }}</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-text>Average Cost per share </v-card-text>
                <v-card-subtitle>{{ share.averageCost }}</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-text>Composite purchase value </v-card-text>
                <v-card-subtitle>{{ share.compositeValue }}</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-text>Last Market Value</v-card-text>
                <v-card-subtitle>{{ share.marketValue }}</v-card-subtitle>
              </v-col>
              <v-col>
                <v-card-text>Total gain / loss </v-card-text>
                <v-card-subtitle>{{ share.gainLoss }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-card height="100%">
            <v-row>
              <v-col class="d-flex justify-end">
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn light icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      v-for="(menuItem, i) in menuItems"
                      :key="i"
                      @click="menuItem.onClick"
                      @mousedown="rowSelected"
                    >
                      <v-list-item-title>{{
                        menuItem.title
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-card-subtitle>ROI</v-card-subtitle>
            </v-row>
            <v-row class="d-flex justify-center">
              <v-card-title>{{ share.roi }}</v-card-title>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import router from "../router";
// import Vue from "vue";

// const lineSmooth = Vue.chartist.Interpolation.cardinal({
//   tension: 0
// });
export default {
  name: "ShareCard",
  // components: { MaterialChartCard },
  data() {
    return {
      // show: false
      // shares: [
      //   {
      //     id: "userShares.shareId",
      //     title: "shareName",
      //     BSE: "-2.5 (-0.26%)",
      //     volume: "49714",
      //     closing: "238",
      //     purchased: "440",
      //     averageCost: "6.89",
      //     compositeValue: "3031",
      //     marketValue: "104720",
      //     gainLoss: "101689",
      //     roi: "3355.25"
      //   }
      // ],
      menuItems: [
        {
          title: "Add New Transaction",
          onClick: this.toggleAddTransactionForm
        },
        {
          title: "View Transaction History",
          onClick: () => {
            router.push({ name: "About" });
          }
        },
        {
          title: "Trade Advice",
          onClick: () => {
            router.push({ name: "About" });
          }
        }
      ]
    };
  },
  computed: {
    ...mapState(["user", "userShares"])
  },
  methods: {
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
    ...mapActions(["toggleAddTransactionForm"])
  }
};
</script>

<style lang="scss" scoped></style>
