<template>
  <div>
    <v-card>
      <v-icon>
        mdi-percent
      </v-icon>
      <v-btn @click="toggle">
        <v-icon>
          mdi-close-circle
        </v-icon>
      </v-btn>
      <v-card-title>
        Set Profit Ratio
      </v-card-title>
      <v-form ref="form" v-model="form.valid">
        <v-select
          :items="form.percent"
          v-model="form.model.greed_percentage"
          :rules="form.rules"
          required
        >
        </v-select>
      </v-form>
      <v-card-actions>
        <v-btn>
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
          greed_percentage: "Input your risk appetite"
        },
        percent: [
          "10%",
          "20%",
          "30%",
          "40%",
          "50%",
          "60%",
          "70%",
          "80%",
          "90%",
          "100%"
        ]
      }
    };
  },
  methods: {
    validate() {
      console.log(this.$refs.form.validate());
    },
    ...mapActions(["toggleAddProfitRatioForm"])
  },
  computed: {
    ...mapState([""])
  }
};
</script>

<style lang="scss" scoped></style>
