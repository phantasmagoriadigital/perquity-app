<template>
  <div>
    <pre>{{ logdata }}</pre>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      user: {
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
        shares: [
          {
            share_count: 685,
            avg_share_price: 0,
            composit_purchase_value: 9996,
            last_traded_price: 411,
            share_name: 0,
            share_code: 0,
            last_transaction_trade_price: 0,
            market_value: 0, // (share_count x last_traded_price)
            profit_loss_value: 10, // (market_value – composit_purchase_value)
            profit_loss_percentage: 0, // (profit_loss_value / composit_purchase_value)
            share_category: 0, // (refer column s)
            category_rating: 0, // (order desc index)
            invest_value_serial: 0, // (column m (comp_purch_val) desc index)
            trade_recommendation: 0, //(1=sell, 2=purchase) (comp_purchase < avg_cat_inv => purchase)
            trade_min_price: 0, // (last_transaction_trade_price - (last_transaction_trade_price * greed_percentage)
            trade_max_price: 0 // (last_transaction_trade_price + (last_transaction_trade_price * greed_percentage)
          },
          {
            share_count: 440,
            avg_share_price: 0,
            composit_purchase_value: 3031,
            last_traded_price: 238,
            share_name: 0,
            share_code: 0,
            last_transaction_trade_price: 0,
            market_value: 0, // (share_count x last_traded_price)
            profit_loss_value: 10, // (market_value – composit_purchase_value)
            profit_loss_percentage: 0, // (profit_loss_value / composit_purchase_value)
            share_category: 0, // (refer column s)
            category_rating: 0, // (order desc index)
            invest_value_serial: 0, // (column m (comp_purch_val) desc index)
            trade_recommendation: 0, //(1=sell, 2=purchase) (comp_purchase < avg_cat_inv => purchase)
            trade_min_price: 0, // (last_transaction_trade_price - (last_transaction_trade_price * greed_percentage)
            trade_max_price: 0 // (last_transaction_trade_price + (last_transaction_trade_price * greed_percentage)
          },

          {
            share_count: 170,
            avg_share_price: 0,
            composit_purchase_value: 17082,
            last_traded_price: 1474,
            share_name: 0,
            share_code: 0,
            last_transaction_trade_price: 0,
            market_value: 0, // (share_count x last_traded_price)
            profit_loss_value: 10, // (market_value – composit_purchase_value)
            profit_loss_percentage: 0, // (profit_loss_value / composit_purchase_value)
            share_category: 0, // (refer column s)
            category_rating: 0, // (order desc index)
            invest_value_serial: 0, // (column m (comp_purch_val) desc index)
            trade_recommendation: 0, //(1=sell, 2=purchase) (comp_purchase < avg_cat_inv => purchase)
            trade_min_price: 0, // (last_transaction_trade_price - (last_transaction_trade_price * greed_percentage)
            trade_max_price: 0 // (last_transaction_trade_price + (last_transaction_trade_price * greed_percentage)
          }
        ]
      },
      tradedShares: [
        {
          company_name: 0,
          id: 0,
          last_traded_price: 0,
          net_profit: 0,
          sales: 0,
          ticker: 0,
          year_high: 0,
          year_low: 0,
          all_time_low: 0, // Augmented
          all_time_high: 0, // Augmented
          yearly_avg: 0, // (=(high+low)/2)
          mean_mode: 0, // (last_traded_price / yearly_avg)
          distance_from_avg: 0, // (mean_mode: >1.25=10, >1<1.25=20, <1=30)
          sales_growth: 0, // Augmented
          profit_loss_growth: 0, // Augmented
          future: 0, // Augmented
          growth_future_score: 0, // (SUM(sales_growth, profit_loss_grwoth, future)
          special_anouncement: 0 // Augmented
        }
      ],
      logdata: ""
    };
  },
  methods: {
    log(newLine) {
      this.logdata += `${newLine} \n`;
    },
    compute_share_values(userShares) {
      userShares.forEach(share => {
        // compute market value
        share.market_value = share.share_count * share.last_traded_price;
        this.log(`updated share.market_value: ${share.market_value} ...`);

        // compue profit loss value
        share.profit_loss_value =
          share.market_value - share.composit_purchase_value; // (share.market_value – share.composit_purchase_value)
        this.log(
          `updated share.profit_loss_value: ${share.profit_loss_value} ...`
        );
        // compute profit/loss percentage
        share.profit_loss_percentage =
          (share.profit_loss_value / share.composit_purchase_value) * 100; // (profit_loss_value / composit_purchase_value)
        this.log(
          `updated share.profit_loss_percentage: ${share.profit_loss_percentage} ...`
        );
      });
      this.compute_user_values();
    },

    compute_user_values() {
      //   composit purchase value of all shares held by user
      let all_shares_composit_purchase_value = 0;
      let profit_loss_value = 0;

      this.user.shares.forEach(share => {
        all_shares_composit_purchase_value += share.composit_purchase_value;
        profit_loss_value += share.profit_loss_value;
        this.computeShareCategory(share);
      });
      this.user.all_shares_composit_purchase_value = all_shares_composit_purchase_value;
      this.log(
        `updated user.all_shares_composit_purchase_value: ${this.user.all_shares_composit_purchase_value} ...`
      );

      //   Total profit & loss
      this.user.total_profit_loss = profit_loss_value;
      this.log(
        `updated user.total_profit_loss: ${this.user.total_profit_loss} ...`
      );

      // average profit loss percentage
      this.user.avg_profit_loss_percentage =
        profit_loss_value / all_shares_composit_purchase_value;
      this.log(
        `updated user.avg_profit_loss_percentage: ${this.user.avg_profit_loss_percentage} ...`
      );
      this.computeShareCategoryRating(this.user.shares);

      //   Assign categories to shares based on profit/loss percentage
      /**
       * A – > 1000%
       * B – < 1000 > 500
       * C – < 500 > AVG profit/loss %
       * D – < AVG profit/loss % > -1
       * E – < -1
       */

      // share.share_category = 0; // (refer column s)
      // share.category_rating = 0; // (order desc index)
      // share.invest_value_serial = 0; // (column m (comp_purch_val) desc index)
      // share.trade_recommendation = 0; //(1=sell; 2=purchase) (comp_purchase < avg_cat_inv => purchase)
      // share.trade_min_price = 0; // (last_transaction_trade_price - (last_transaction_trade_price * greed_percentage)
      // share.trade_max_price = 0; // (last_transaction_trade_price + (last_transaction_trade_price * greed_percentage)
    },
    computeShareCategory(share) {
      if (share.profit_loss_percentage > 1000) {
        share.share_category = "A";
        this.log("Assigned category: A");
      } else if (share.profit_loss_percentage > 500) {
        share.share_category = "B";
        this.log("Assigned category: B");
      } else if (
        share.profit_loss_percentage > this.user.avg_profit_loss_percentage
      ) {
        share.share_category = "C";
        this.log("Assigned category: C \n");
      } else if (share.profit_loss_percentage > -1) {
        share.share_category = "D";
        this.log("Assigned category: D");
      } else if (share.profit_loss_percentage < -1) {
        share.share_category = "E";
        this.log("Assigned category: E");
      }
    },
    computeShareCategoryRating(shares) {
      console.log(shares);
      let test = _.sortBy(
        shares,
        ["share_category", "profit_loss_percentage"],
        ["desc", "desc"]
      );
      console.log("test", test);
      test.forEach(share => {
        console.log(share.profit_loss_percentage);
      });
      //   console.log(shares);
    },
    computeSharesCategoryAvg(shares) {
      const catA = shares.filter(share => (share.category_rating = "A"));
      console.log("cat A", catA);
    }
  },
  created: function() {
    this.compute_share_values(this.user.shares);
  }
};
</script>

<style lang="scss" scoped></style>
