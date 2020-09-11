<template>
  <div class="projectSummarypage">
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Task Rate</div>
        <div class="titleSearchSection">
          <v-select
            v-model="filterCryteria"
            dense
            :items="criteriaArray"
            item-text="name"
            item-value="id"
            flat
            background-color="#EDF0F5"
            label="Select Criteria"
            solo
            @change="loadTaskRate()"
          ></v-select>
        </div>
        <div class="titleDateSearchSection">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-x
            width="100%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeTextField"
                label="Date range"
                prepend-inner-icon="mdi-calendar-blank"
                readonly
                solo
                dense
                background-color="#EDF0F5"
                flat
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker range v-model="dateRangeFilter" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu2.save(dateRangeFilter); loadTaskRate(); "
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
      </div>
    </v-row>
    <div class="small">
      <line-chart
        id="taskChart"
        width="400"
        height="400"
        :chart-data="datacollection"
        :options="options"
      ></line-chart>
      <!-- <button @click="fillData()">Randomize</button> -->
    </div>
    <v-overlay :value="overlay" color="black" style="z-index:1008">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import LineChart from "~/components/charts/chart";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";

export default {
  components: {
    LineChart,
    "progress-loading": Progress,
  },
  data() {
    return {
      filterCryteria: "DAY",
      overlay: false,
      datacollection: null,
      options: null,
      taskCreation: [],
      taskCompletion: [],
      labels: [],
      dateRangeFilter: [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
      criteriaArray: [
        { name: "Day", id: "DAY" },
        { name: "Month", id: "MONTH" },
        { name: "Year", id: "YEAR" },
      ],
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    loadTaskRate() {
      this.overlay = true;
      this.taskCreation = [];
      this.taskCompletion = [];
      this.labels = [];
      let date = new Date();
      let from;
      let to;
      if (
        this.dateRangeFilter.toString() ==
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        from = new Date(date.getFullYear(), date.getMonth(), 1)
          .toISOString()
          .substr(0, 10);
        to = new Date(date.getFullYear(), date.getMonth() + 1, 0)
          .toISOString()
          .substr(0, 10);
      } else {
        from = this.dateRangeFilter[0];
        to = this.dateRangeFilter[1];
      }
      Promise.all([
        this.$store.dispatch("analytics/taskAnalytics/fetchTaskOverview", {
          from: from,
          to: to,
          criteria: this.filterCryteria,
        }),
      ]).finally(() => {
        this.overlay = false;
        this.fillData();
      });
    },
    fillData() {
      let taskRate = this.taskRate;
      Promise.all([]).finally(() => {});

      for (let index = 0; index < taskRate.length; ++index) {
        let record = taskRate[index];
        this.taskCreation[index] = record.taskCreationCount;
        this.taskCompletion[index] = record.taskCompletionCount;
        this.labels[index] = record.date;
        console.log("TRIGGERRED");
      }
      console.log("TRIGGERRED2");
      this.datacollection = {
        labels: this.labels,
        datasets: [
          {
            label: "Task Creation",
            borderColor: "#4F5CC9",
            pointBackgroundColor: "#4F5CC9",
            fill: false,
            data: this.taskCreation,
            borderWidth: 2,
            lineTension: 0,
          },
          {
            label: "Task Completion",
            borderColor: "#4FC971",
            pointBackgroundColor: "#4FC971",
            fill: false,
            data: this.taskCompletion,
            borderWidth: 2,
            lineTension: 0,
          },
        ],
      };
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 12,
            fontColor: "#576377",
          },
        },
      };
    },
  },
  computed: {
    ...mapState({
      taskRate: (state) => state.analytics.taskAnalytics.taskRate,
    }),
    dateRangeTextField() {
      if (
        this.dateRangeFilter.toString() ==
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        return "Select Date Range";
      } else {
        return this.dateRangeFilter.join(" - ");
      }
    },
  },
};
</script>

<style>
.small {
  width: 90vw !important;
  padding-top: 150px auto;
  height: 500px;
}
#taskChart {
  background-color: #fafafa;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding-top: 10px;
}
</style>