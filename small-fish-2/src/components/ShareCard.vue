<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col cols="3">
              <v-card-title>Share Name(ShareCode)</v-card-title>
            </v-col>
            <v-col>
              <v-card-text>
                <v-chip
                  >1990
                  <v-icon>
                    mdi-account
                  </v-icon>
                  2.14%
                </v-chip>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-text>Total Shares: 85</v-card-text>
            </v-col>
            <v-col>
              <v-card-text>Composit Purchase Value: 13,158</v-card-text>
            </v-col>
            <v-col>
              <v-card-text>Current market value: 1,69,190</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-card-title>
            Profit/Loss
          </v-card-title>
          <v-card-text>
            1,56,78 (-12%)
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-title>
            Ranking
          </v-card-title>
          <v-chip>
            D
          </v-chip>
        </v-col>
        <v-col>
          <v-card-title>
            Trade opportunity
          </v-card-title>
          <v-card-text>
            Purchase Shares now
          </v-card-text>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-row>
            <v-col
              v-for="(chart, i) in charts"
              :key="`chart-${i}`"
              cols="12"
              md="6"
              lg="4"
            >
              <material-chart-card
                :color="chart.color"
                :data="chart.data"
                :options="chart.options"
                :responsive-options="chart.responsiveOptions"
                :title="chart.title"
                :type="chart.type"
              >
                <template #subtitle>
                  <div class="font-weight-light text--secondary">
                    <div v-html="chart.subtitle" />
                  </div>
                </template>

                <template #actions>
                  <v-icon class="mr-1" small>
                    mdi-clock-outline
                  </v-icon>

                  <span
                    class="text-caption grey--text font-weight-light"
                    v-text="chart.time"
                  />
                </template>
              </material-chart-card>
            </v-col>
            <!-- <v-col col="12">
              <material-chart-card
                :color="chart.color"
                :data="chart.data"
                :options="chart.options"
                :responsive-options="chart.responsiveOptions"
                :title="chart.title"
                :type="chart.type"
              >
                <template #subtitle>
                  <div class="font-weight-light text--secondary">
                    <div v-html="chart.subtitle" />
                  </div>
                </template>

                <template #actions>
                  <v-icon class="mr-1" small>
                    mdi-clock-outline
                  </v-icon>

                  <span
                    class="text-caption grey--text font-weight-light"
                    v-text="chart.time"
                  />
                </template>
              </material-chart-card>
            </v-col> -->
          </v-row>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import "../plugins/chartist";
import MaterialChartCard from "./MaterialChartCard";
import Vue from "vue";

const lineSmooth = Vue.chartist.Interpolation.cardinal({
  tension: 0
});
export default {
  name: "ShareCard",
  components: { MaterialChartCard },
  data() {
    return {
      show: false,
      charts: [
        {
          type: "Bar",
          color: "primary",
          title: "Website Views",
          subtitle: "Last Campaign Performance",
          time: "updated 10 minutes ago",
          data: {
            labels: [
              "Ja",
              "Fe",
              "Ma",
              "Ap",
              "Mai",
              "Ju",
              "Jul",
              "Au",
              "Se",
              "Oc",
              "No",
              "De"
            ],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0
            }
          },
          responsiveOptions: [
            [
              "screen and (max-width: 640px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                }
              }
            ]
          ]
        },
        {
          type: "Line",
          color: "success",
          title: "Daily Sales",
          subtitle:
            '<i class="mdi mdi-arrow-up green--text"></i><span class="green--text">55%</span>&nbsp;increase in today\'s sales',
          time: "updated 4 minutes ago",
          data: {
            labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
            series: [[230, 750, 450, 300, 280, 240, 200, 190]]
          },
          options: {
            lineSmooth,
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        {
          type: "Line",
          color: "info",
          title: "Completed Tasks",
          subtitle: "Last Campaign Performance",
          time: "campaign sent 26 minutes ago",
          data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            series: [[12, 17, 7, 17, 23, 18, 38]]
          },
          options: {
            lineSmooth,
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
