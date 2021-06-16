<template>
  <div>
    <v-btn color="primary" min-width="150" @click="getTradilioShares">
      Fetch Shares
    </v-btn>
    <div v-for="share in sharesTradilio[0]" v-bind:key="share.id">
      {{ share }}
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
    ...mapState(["sharesTradilio"])
    // formattedShares: function() {
    //   let computedValue = [];
    //   this.sharesTradilio[0].forEach(element => {
    //     computedValue.push(element.ticker);
    //   });
    //   return computedValue;
    // }
  },
  methods: {
    ...mapActions(["getTradilioShares"])
  }
};
</script>

<style lang="scss" scoped></style>
