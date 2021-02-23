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
import { mapActions } from "vuex";
import { vueGsheets } from "vue-gsheets";
export default {
  mixins: [vueGsheets],
  name: "AddShare",
  data() {
    return {
      COLUMNS: 7,
      sheetPageNumber: 1,
      SHEETID: "1ZHjmvPAMGqkngxk9MWkHafBNaItfxaiTKRluqA9ZjtA",
      items: [],
      addShareForm: {
        valid: false,
        model: {
          shareCode: ""
        },
        shareCodeOptions: ["share1", "share2", "share3", "share4"],
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
    ...mapActions(["toggleAddShareForm", "addShare"])
  },
  computed: {
    shareCodeOptions() {
      if (this.items.length) {
        console.log(
          "🚀 ~ file: AddShare.vue ~ line 65 ~ shareCodeOptions ~ this.items.length",
          this.items.length
        );
        let shareCodes = [];
        this.items.forEach(element => {
          shareCodes.push(element.shareCode);
        });
        let userShares = [];
        this.$store.state.userShares.forEach(element => {
          userShares.push(element.shareCode);
        });
        let shareCodeOptions = shareCodes.filter(
          val => !userShares.includes(val)
        );
        return shareCodeOptions;
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
