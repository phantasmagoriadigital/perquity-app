<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div v-if="isLoading" style="border:solid 2px #f00">
          loading.....
        </div>
        <ul v-if="shares">
          <li v-for="share in shares" :key="share.id">
            {{ share.name }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      isLoading: false,
      createShare: {
        isActivelyTraded: true,
        price: 1952,
        name: "AXIS Bank Ltd ^^^^^",
        shareInfo: { low1y: 1001, high5y: 2030, high1y: 2030, low5y: 0 }
      }
    };
  },
  methods: {
    ...mapActions([
      "bindShares", // map `this.increment()` to `this.$store.dispatch('increment')`

      // `mapActions` also supports payloads:
      "bindUsers", // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
      "addShareMaster" // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ])
  },
  computed: {
    localComputed() {
      return "hello";
    },

    // Add mappState to end of computed to acess state objects
    // directly through a local variable eg. {{ shares }}
    // instead of {{ this.$tore.state.shares }}
    // shares() {
    //   return this.$store.state.shares;
    // },
    // users() {
    //   return this.$store.state.users;
    // },
    ...mapState(["shares", "users"])
  },
  // this code gets executed whenever the component is created
  created() {
    // to tell the store to bind the shares data to the state
    // by calling the action bindShares
    this.isLoading = true;
    this.bindShares();
    this.addShareMaster({
      id: "BBBBBB",
      shareData: this.createShare
    });
  }
};
</script>
