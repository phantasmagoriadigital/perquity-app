<template>
  <v-card>
    <v-card-title class="headline primary darken-2">
      Add Transaction
    </v-card-title>

    <v-card-text>
      <div>
        <!-- Add transaction form which displays on clicking a share row -->
        <v-form v-if="selectedShare" ref="form" v-model="form.valid">
          <v-select
            :items="form.items"
            v-model="form.model.transactionType"
            :rules="form.transactionTypeRules"
            label="Transaction Type"
            required
          ></v-select>
          <v-text-field
            v-model="form.model.transactionPricePerShare"
            :rules="form.transactionPricePerShareRules"
            label="Price per Share"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.model.quantity"
            :rules="form.quantityRules"
            label="Quantity"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.model.dateTime"
            label="Select the transaction date"
            readonly
          >
          </v-text-field>
          <v-date-picker
            label="Select the transaction date"
            v-model="form.model.dateTime"
            full-width
            required
          ></v-date-picker>
        </v-form>
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="toggleAddTransactionForm()">
        Close
      </v-btn>
      <v-btn
        text
        :disabled="!form.valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AddTransaction",
  data() {
    return {
      form: {
        valid: false,
        model: {
          transactionType: "",
          transactionPricePerShare: 0,
          quantity: 0,
          dateTime: new Date().toISOString().substr(0, 10)
        },
        items: ["Buy", "Sell"],
        transactionTypeRules: [v => !!v || "Transaction Type is required"],
        transactionPricePerShareRules: [v => !!v || "Price is required"],
        quantityRules: [v => !!v || "Quantity is required"]
      }
    };
  },
  methods: {
    // handles submit for add transaction form
    validate() {
      console.log(
        "🚀 ~ file: AddTransaction.vue ~ line 92 ~ validate ~ this.$refs.form.validate",
        this.$refs.form.validate()
      );
      this.$refs.form.validate
        ? this.addTransaction()
        : console.log("validation error");
      //   this.$refs.form.resetValidation();
    },
    // send the add transaction form data to store
    addTransaction() {
      //   create a temporary var to add computed data
      let transactionData = { ...this.form.model };

      // Add the transactionValue to the data
      transactionData.transactionValue =
        // Convert the sell amount in a negative value
        this.form.model.transactionType == "Sell"
          ? (transactionData.transactionValue = -Math.abs(
              transactionData.transactionPricePerShare *
                transactionData.quantity
            ))
          : transactionData.transactionPricePerShare * transactionData.quantity;

      // convert transactionPricePerShare to Int
      transactionData.transactionPricePerShare = parseInt(
        transactionData.transactionPricePerShare
      );

      transactionData.quantity = parseInt(transactionData.quantity);

      console.log(
        "🚀 ~ file: AddTransaction.vue ~ line 99 ~ addTransaction ~ transactionData",
        transactionData
      );

      this.$store.dispatch("addTransaction", transactionData);
      console.log(
        "🚀 ~ file: Home.vue ~ line 136 ~ addTransaction ~ transactionData",
        transactionData
      );

      //   hide dialog window
      this.$refs.form.reset();
      this.toggleAddTransactionForm();
    },
    ...mapActions(["toggleAddTransactionForm"])
  },
  computed: {
    ...mapState(["selectedShare"])
  }
};
</script>

<style lang="scss" scoped></style>
