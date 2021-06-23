<template>
  <v-card v-bind:class="['ds-share-card', share.share_category]">
    <v-row class="d-flex">
      <v-col cols="8">
        <v-card elevation="0" height="100%">
          <v-row class="card-top">
            <v-col cols="4">
              <v-card-title class="ds-card-title">{{
                share.company_name
              }}</v-card-title>
            </v-col>
            <v-col cols="3">
              <v-card-text class="ds-card-overtitle">
                Year High/Low {{ share.year_high }}/{{ share.year_low }}
              </v-card-text>
            </v-col>
            <v-col cols="2" class="ds-card-overtitle">
              <v-card-text> Ticker: {{ share.ticker }} </v-card-text>
            </v-col>
            <v-col cols="3" class="ds-card-overtitle">
              <v-card-text
                >LAST CLOSING RATE: ₹ {{ share.last_traded_price }}</v-card-text
              >
            </v-col>
          </v-row>
          <v-row class="d-flex ds-card-stats">
            <v-col>
              <v-card-text class="ds-card-subtitle"
                >total shares purchased
              </v-card-text>
              <v-divider></v-divider>
              <v-card-subtitle class="ds-card-value">{{
                share.share_count
              }}</v-card-subtitle>
            </v-col>
            <v-col>
              <v-card-text class="ds-card-subtitle"
                >average cost per share
              </v-card-text>
              <v-divider></v-divider>
              <v-card-subtitle class="ds-card-value">{{
                share.composit_purchase_value / share.share_count
              }}</v-card-subtitle>
            </v-col>
            <v-col>
              <v-card-text class="ds-card-subtitle"
                >composite purchase value
              </v-card-text>
              <v-divider></v-divider>
              <v-card-subtitle class="ds-card-value">{{
                share.composit_purchase_value
              }}</v-card-subtitle>
            </v-col>
            <v-col>
              <v-card-text class="ds-card-subtitle"
                >last market value</v-card-text
              >
              <v-divider></v-divider>
              <v-card-subtitle class="ds-card-value">{{
                share.market_value
              }}</v-card-subtitle>
            </v-col>
            <v-col>
              <v-card-text class="ds-card-subtitle"
                >total gain / loss
              </v-card-text>
              <v-divider></v-divider>
              <v-card-subtitle class="ds-card-value">{{
                share.profit_loss_percentage
              }}</v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-card elevation="0" height="100%" class="ds-card-roi">
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
                    <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
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
  props: {
    share: Object
  },
  data() {
    return {
      // show: false
      shares: [
        {
          id: "userShares.shareId",
          title: "share.company_name",
          BSE: "-2.5 (-0.26%)",
          volume: "49714",
          closing: "238",
          purchased: "440",
          averageCost: "6.89",
          compositeValue: "3031",
          marketValue: "104720",
          gainLoss: "101689",
          roi: "3355.25"
        }
      ],
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

<style lang="scss" scoped>
@import "~@/sass/variables.scss";
.ds-card-title {
  @include heading_3_regular;
}
.ds-card-overtitle {
  @include secondary_paragraph_3_regular;
}
.ds-card-subtitle {
  @include secondary_small-cap_2_medium;
  padding: 0 0 0.375rem 0;
  .v-divider {
  }
}
.ds-share-card {
  @include ds-elevation_1;
  margin-bottom: 1.25rem;
}
.card-top {
  margin-left: 0px;
}
.A {
  border-left: solid 0.25rem $colors-brand-secondary-pink;
  .card-top {
    background-color: $colors-brand-secondary-pink_light-7;
  }
  .ds-card-roi {
    background-color: $colors-brand-secondary-pink_light-6;
  }
  .v-divider {
    border-bottom: solid 0.0625rem $colors-brand-secondary-pink;
    max-width: 1.75rem;
  }
}
.B {
  border-left: solid 0.25rem $colors-brand-secondary-green;
  .card-top {
    background-color: $colors-brand-secondary-green_light-7;
  }
  .ds-card-roi {
    background-color: $colors-brand-secondary-green_light-6;
  }
  .v-divider {
    border-bottom: solid 0.0625rem $colors-brand-secondary-green;
    max-width: 1.75rem;
    margin-bottom: 0.625rem;
  }
}
.C {
  border-left: solid 0.25rem $colors-brand-secondary-yellow;
  .card-top {
    background-color: $colors-brand-secondary-yellow_light-7;
  }
  .ds-card-roi {
    background-color: $colors-brand-secondary-yellow_light-6;
  }
  .v-divider {
    border-bottom: solid 0.0625rem $colors-brand-secondary-yellow;
    max-width: 1.75rem;
    margin-bottom: 0.625rem;
  }
}
.D {
  border-left: solid 0.25rem $colors-brand-secondary-blue;
  .card-top {
    background-color: $colors-brand-secondary-blue_light-7;
  }
  .ds-card-roi {
    background-color: $colors-brand-secondary-blue_light-6;
  }
  .v-divider {
    border-bottom: solid 0.0625rem $colors-brand-secondary-blue;
    max-width: 1.75rem;
    margin-bottom: 0.625rem;
  }
}
.E {
  border-left: solid 0.25rem $colors-brand-secondary-orange;
  .card-top {
    background-color: $colors-brand-secondary-orange_light-7;
  }
  .ds-card-roi {
    background-color: $colors-brand-secondary-orange_light-6;
  }
  .v-divider {
    border-bottom: solid 0.0625rem $colors-brand-secondary-orange;
    max-width: 1.75rem;
    margin-bottom: 0.625rem;
  }
}
.ds-card-value {
  @include secondary_paragraph_1_bold;
  padding: 0;
}
.ds-card-stats {
  .col {
    padding-left: 2.5rem;
    padding-top: 1.875rem;
    padding-bottom: 1.875rem;
    padding-right: 2.5rem;
  }
}
</style>
