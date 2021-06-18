<template>
  <div>
    <v-row>
      <v-col>
        <h1>Your personal equity manager</h1>
        <h4>
          A nice benefit line to be added here that gives the quick overview of
          the program, followed by 2-3 key pointers.
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" v-for="card in cards" :key="card.title">
        <v-card elevation="0">
          <v-icon>
            {{ card.icon }}
          </v-icon>
          <v-card-title>
            {{ card.title }}
          </v-card-title>
          <v-card-text>
            {{ card.text }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          title: "What is fear management?",
          icon: "mdi-lightbulb",
          text: `Perquity uses a study ‘Staircase’ method of buying and selling in
            your own lots of any scrip on the basis of percentage of profit
            predecided by every user of their own, on the basis of less risky
            scrips out of your own holdings, which are bullish in the
            fluctuating markets. This eventually decreases the average price of
            the best holdings out of your whole lot.`
        },
        {
          title: "What is fear management?",
          icon: "mdi-lightbulb",
          text: `Perquity uses a study ‘Staircase’ method of buying and selling in
            your own lots of any scrip on the basis of percentage of profit
            predecided by every user of their own, on the basis of less risky
            scrips out of your own holdings, which are bullish in the
            fluctuating markets. This eventually decreases the average price of
            the best holdings out of your whole lot.`
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
