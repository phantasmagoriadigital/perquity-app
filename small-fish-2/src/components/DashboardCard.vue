<template>
  <div>
    <v-col cols="2">
      <v-card
        elevation="2"
        height="100%"
        v-for="card in cards"
        v-bind:key="card.title"
      >
        <v-card-text>
          {{ card.overtitle }}
        </v-card-text>
        <v-card-subtitle>
          {{ card.title }}
        </v-card-subtitle>
        <v-card-title>
          {{ card.value }}
        </v-card-title>
        <v-icon>
          {{ card.icon }}
        </v-icon>
        <v-card-text>
          {{ card.text }}
        </v-card-text>
      </v-card>
    </v-col>
  </div>
</template>
<script>
export default {
  name: "DashboardCard",
  data() {
    return {
      cards: [
        {
          overtitle: "COMPOSITE",
          title: "PURCHASE VALUE",
          value: "",
          icon: "mdi-info",
          text: "VALUE IN INR"
        },
        {
          overtitle: "LAST",
          title: "MARKET VALUE",
          value: "",
          icon: "mdi-info",
          text: "VALUE IN INR"
        },
        {
          overtitle: "TOTAL",
          title: "GAIN / LOSS",
          value: "",
          icon: "mdi-info",
          text: "VALUE IN INR"
        }
      ]
    };
  }
};
</script>
