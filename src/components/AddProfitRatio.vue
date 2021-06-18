<template>
  <div>
    <v-card>
      <v-icon>
        mdi-percent
      </v-icon>
      <v-btn @click="toggleAddProfitRatioForm">
        <v-icon>
          mdi-close-circle
        </v-icon>
      </v-btn>
      <v-card-title>
        Set Profit Ratio - current: {{ userProfile.greedPercentage * 100 }}%
      </v-card-title>
      <v-form ref="form" v-model="form.valid">
        <v-text-field
          v-model="form.model.greed_percentage"
          :rules="form.rules"
          label="Input your risk appetite in percent, eg. 12.5"
          required
        >
        </v-text-field>
      </v-form>
      <v-card-actions>
        <v-btn text @click="reset">
          Reset
        </v-btn>
        <v-btn text :disabled="!form.valid" @click="validate">
          Set Ratio
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AddProfitRatio",
  data() {
    return {
      form: {
        valid: false,
        model: {
          greed_percentage: 1
        },
        rules: [v => !!v || "Risk appetite is required"]
      }
    };
  },
  methods: {
    validate() {
      console.log(this.$refs.form.validate());
      this.$refs.form.validate
        ? this.addGreedPercentage()
        : console.log("validation error");

      //   hide dialog window
      this.$refs.form.reset();
      this.toggleAddProfitRatioForm();
    },
    addGreedPercentage() {
      let data = this.form.model.greed_percentage / 100;
      this.$store.dispatch("updateGreedPercentage", data);
      console.log("greed", data);
    },
    reset() {
      // reset form
      this.$refs.form.reset();
    },
    ...mapActions(["toggleAddProfitRatioForm"])
  },
  computed: {
    ...mapState(["userProfile"])
  },
  mounted() {
    this.form.model.greed_percentage = this.userProfile.greedPercentage;
  }
};
</script>

<style lang="scss" scoped></style>
