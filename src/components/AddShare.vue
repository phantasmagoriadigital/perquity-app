<template>
  <v-card>
    <v-card-title class="headline primary darken-2">
      Add Share
    </v-card-title>

    <v-card-text>
      <v-form ref="addShareForm" v-model="addShareForm.valid">
        <v-select
          v-if="shareCodeOptions != null"
          :items="shareCodeOptions"
          v-model="addShareForm.model"
          :rules="addShareForm.rules.shareCode"
          label="Select Share Code"
        >
        </v-select>
        <p v-else>sorry you got it all!</p>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text @click="toggleAddShareForm()">Close</v-btn>
      <v-btn text :disabled="!addShareForm.valid" @click="validate"
        >Submit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AddShare",
  data() {
    return {
      addShareForm: {
        valid: false,
        model: {},
        rules: {
          shareCode: [v => !!v || "Share Code is required"]
        }
      }
    };
  },
  methods: {
    //   validate the form and pass the addShareForm data if valid
    validate() {
      console.log(
        "🚀 ~ file: AddShare.vue ~ line 60 ~ validate ~ this.addShareForm.model",
        this.addShareForm.model
      );
      this.$refs.addShareForm.validate
        ? this.addShare(this.addShareForm.model)
        : console.log("Add Share Form validation error");
      this.$refs.addShareForm.reset();
      this.toggleAddShareForm();
    },
    ...mapActions(["toggleAddShareForm", "addShare", "getMasterShares"])
  },
  computed: {
    shareCodeOptions() {
      let tempShares = [];
      tempShares = this.shares[0].data;
      console.log(tempShares);
      if (tempShares.length) {
        console.log(
          "🚀 ~ file: AddShare.vue ~ line 65 ~ shareCodeOptions ~ this.masterShares.length",
          tempShares.length
        );
        /**
         * put the shares from master share into an array
         */
        let shareCodes = [];
        tempShares.forEach(element => {
          shareCodes.push(element.ticker);
        });

        // namelessFunction(props) {
        //     shareCode.push(props.shareCode)
        // }

        /**
         * get the shares existing with user
         */
        let userShares = [];
        this.userShares.forEach(element => {
          userShares.push(element.ticker);
          //   let sample = {
          //     text: element.shareCode,
          //     value: element,
          //     disabled: false
          //   };
        });

        /**
         * compare the share code values existing with user and master shares
         * returns the uncommon shares
         */

        // let shareCodeOptions = shareCodes.filter(
        //   val => !userShares.includes(val)
        // );

        let shareCodeOptions = tempShares.filter(
          val => !userShares.includes(val.ticker)
        );

        let shareCodeOptions1 = [];
        shareCodeOptions.forEach(el => {
          shareCodeOptions1.push({
            text: el.ticker,
            value: el
          });
        });

        return shareCodeOptions1;
      } else {
        return null;
      }
    },
    ...mapState(["masterShares", "userShares", "shares"])
  },
  created() {
    const options = {
      headers: [],
      records: null,
      COLUMNS: 7
    };
    this.$store.dispatch("getMasterShares", options);
  }
};
</script>

<style lang="scss" scoped></style>
