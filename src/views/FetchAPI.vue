<template>
  <div>
    <v-btn color="primary" min-width="150" @click="getShareSourceData">
      Fetch Shares
    </v-btn>
    <div v-for="share in ShareSourceData[0]" v-bind:key="share.id">
      <v-row>
        <v-col> Share ID: {{ share.id }} </v-col>
        <v-col> Ticker: {{ share.ticker }} </v-col>
        <v-col> Company Name: {{ share.company_name }} </v-col>
        <v-col> Last Traded Price: {{ share.last_traded_price }} </v-col>
        <v-col> Net Profit: {{ share.net_profit }} </v-col>
        <v-col> Sales: {{ share.sales }} </v-col>
        <v-col> Year High: {{ share.year_high }} </v-col>
        <v-col> Year Low: {{ share.year_low }} </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  //   data() {
  //     return {
  //       key: value
  //     };
  //   },
  computed: {
    ...mapState(["ShareSourceData"])
    // formattedShares: function() {
    //   let computedValue = [];
    //   this.sharesTradilio[0].forEach(element => {
    //     computedValue.push(element.ticker);
    //   });
    //   return computedValue;
    // }
  },
  methods: {
    ...mapActions(["getShareSourceData"])
  }
};
</script>

<style lang="scss" scoped></style>
