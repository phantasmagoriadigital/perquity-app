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
            share_name: "VIP IND",
            share_code: 0,
            last_transaction_trade_price: 405,
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
            share_count: 225,
            avg_share_price: 0,
            composit_purchase_value: 11190,
            last_traded_price: 107,
            share_name: "TATA POWER",
            share_code: 0,
            last_transaction_trade_price: 68.15,
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
            share_count: 115,
            avg_share_price: 0,
            composit_purchase_value: 39280,
            last_traded_price: 322,
            share_name: "JINDAL SNP",
            share_code: 0,
            last_transaction_trade_price: 341,
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
            share_count: 140,
            avg_share_price: 0,
            composit_purchase_value: 17384,
            last_traded_price: 383,
            share_name: "SBIN",
            share_code: 0,
            last_transaction_trade_price: 305,
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
            share_count: 2100,
            avg_share_price: 0,
            composit_purchase_value: 31710,
            last_traded_price: 11.85,
            share_name: "IFCI",
            share_code: 0,
            last_transaction_trade_price: 12,
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
            share_count: 2600,
            avg_share_price: 0,
            composit_purchase_value: 12885,
            last_traded_price: 8.55,
            share_name: "ANSAL INFRA",
            share_code: 0,
            last_transaction_trade_price: 12.47,
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
            share_count: 820,
            avg_share_price: 0,
            composit_purchase_value: 17157,
            last_traded_price: 209,
            share_name: "STERLITE TECH",
            share_code: 0,
            last_transaction_trade_price: 211.8,
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
            share_name: "CHAMBAL FERT",
            share_code: 0,
            last_transaction_trade_price: 250.6,
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
            share_name: "DALMIA BHARAT",
            share_code: 0,
            last_transaction_trade_price: 1323.5,
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
      userShares.forEach((share, index) => {
        this.log(
          `##### SHARE ${index +
            1} _________________________________________________`
        );
        // compute market value
        share.market_value = share.share_count * share.last_traded_price;
        this.log(
          `updated share.market_value:            ${Math.round(
            share.market_value
          )}`
        );

        // compute profit loss value
        share.profit_loss_value =
          share.market_value - share.composit_purchase_value; // (share.market_value – share.composit_purchase_value)
        this.log(
          `updated share.profit_loss_value:       ${Math.round(
            share.profit_loss_value
          )}`
        );

        // compute profit/loss percentage
        share.profit_loss_percentage =
          (share.profit_loss_value / share.composit_purchase_value) * 100; // (profit_loss_value / composit_purchase_value)
        this.log(
          `updated share.profit_loss_percentage:  ${Math.round(
            share.profit_loss_percentage
          )}`
        );

        // compute trade bands MIN/MAX
        share.trading_rates = {
          buy: {
            min:
              share.last_transaction_trade_price -
              share.last_transaction_trade_price * this.user.greed_percentage,
            max:
              share.last_transaction_trade_price +
              share.last_transaction_trade_price * this.user.greed_percentage
          },
          sell: {
            min:
              share.last_transaction_trade_price -
              share.last_transaction_trade_price * this.user.greed_percentage,
            max:
              share.last_transaction_trade_price +
              share.last_transaction_trade_price * this.user.greed_percentage
          }
        };

        // compute share category
        this.computeShareCategory(share);

        this.log(`...`);
      });
      this.compute_user_values();
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

      this.computeShareCategoryRating(this.user.shares);
      this.computeSharesCategoryAvg(this.user.shares);

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
      this.computeTradeRecommendation(this.user, this.user.shares);
    },
    computeTradeRecommendation(user, shares) {
      let recommendation = [];
      shares.forEach(share => {
        console.log(share.composit_purchase_value);
        console.log(user.category_values[share.share_category].avg);
        console.log(share);
        recommendation.push([
          share.share_name,
          share.composit_purchase_value <
          user.category_values[share.share_category].avg
            ? 2
            : 1
        ]);
        share.trade_recommendation =
          share.composit_purchase_value <
          user.category_values[share.share_category].avg
            ? 2
            : 1;
      });
      console.table(recommendation);
    }
  },
  created: function() {
    this.compute_share_values(this.user.shares);
  }
};
</script>

<style lang="scss" scoped></style>
