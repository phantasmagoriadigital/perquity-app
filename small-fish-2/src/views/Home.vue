<template>
  <v-app>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="shareHeaders"
        :items="shares"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      search: "",
      shareHeaders: [
        {
          text: "shareCode",
          align: "start",
          sortable: true,
          value: "shareCode"
        },
        { text: "shareName", value: "shareName" },
        { text: "currentValue", value: "currentValue", align: "end" },
        { text: "l1y", value: "l1y", align: "end" },
        { text: "h1y", value: "h1y", align: "end" },
        { text: "l5y", value: "l5y", align: "end" },
        { text: "h5y", value: "h5y", align: "end" }
      ],
      shares: []
    };
  }
};
</script>
