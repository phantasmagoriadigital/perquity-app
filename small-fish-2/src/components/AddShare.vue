<template>
  <v-card>
    <v-card-title class="headline primary darken-2">
      Add Share
    </v-card-title>

    <v-card-text>
      <v-form ref="addShareForm" v-model="addShareForm.valid">
        <v-select
          v-if="shareCodeOptions.length"
          :items="shareCodeOptions"
          v-model="addShareForm.model.shareCode"
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
        model: {
          shareCode: ""
        },
        rules: {
          shareCode: [v => !!v || "Share Code is required"]
        }
      }
    };
  },
  methods: {
    //   validate the form and pass the addShareForm data if valid
    validate() {
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
      if (this.masterShares.length) {
        console.log(
          "🚀 ~ file: AddShare.vue ~ line 65 ~ shareCodeOptions ~ this.masterShares.length",
          this.masterShares.length
        );
        let shareCodes = [];
        this.masterShares.forEach(element => {
          shareCodes.push(element.shareCode);
        });
        let userShares = [];
        this.userShares.forEach(element => {
          userShares.push(element.shareCode);
        });
        let shareCodeOptions = shareCodes.filter(
          val => !userShares.includes(val)
        );
        return shareCodeOptions;
      } else {
        return null;
      }
    },
    ...mapState(["masterShares", "userShares"])
  },
  created() {
    const options = {
      headers: [],
      records: null,
      COLUMNS: 7,
      sheetPageNumber: 1,
      SHEETID: "1ZHjmvPAMGqkngxk9MWkHafBNaItfxaiTKRluqA9ZjtA"
    };
    this.$store.dispatch("getMasterShares", options);
  }
};
</script>

<style lang="scss" scoped></style>
