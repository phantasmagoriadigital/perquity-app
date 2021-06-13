<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <material-card color="primary" icon="mdi-account-outline">
            <template #title>
              Edit Profile —
              <small class="text-body-1">Complete your profile</small>
            </template>

            <v-form>
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field disabled label="Company (disabled)" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field color="purple" label="User Name" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field color="purple" label="Email Address" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field color="purple" label="First Name" />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field color="purple" label="Last Name" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field color="purple" label="Adress" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field color="purple" label="City" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field color="purple" label="Country" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      color="purple"
                      label="Postal Code"
                      type="number"
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      color="purple"
                      label="About Me"
                      value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                  </v-col>

                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      min-width="150"
                      @click="getTradilioShares"
                    >
                      Update Profile
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </material-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["sharesTradilio"])
  },
  methods: {
    ...mapActions(["getTradilioShares"])
  }
};
</script>
