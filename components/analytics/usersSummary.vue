<template>
  <div class="projectSummarypage">
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Member Activity</div>
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
            @change="loadMemberActivity()"
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
                @click="$refs.menu2.save(dateRangeFilter); loadMemberActivity(); "
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
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Members</div>

        <div class="titleSearchSection">
          <v-autocomplete
            v-model="filterUser"
            prepend-inner-icon="mdi-magnify"
            return-object
            :items="userArray"
            dense
            item-text="name"
            item-value="id"
            flat
            chips
            small-chips
            solo
            background-color="#EDF0F5"
            label="Search here"
            multiple
            clearable
            @change="loadFilterSummary()"
          ></v-autocomplete>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item dense style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <span class="tableTitle">
              Name
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="setSummaryOrderBy('firstName'); summaryOrder = 'ASC'; orderFilterSummary()"
              >mdi-menu-up</v-icon>
              <v-icon
                v-else
                @click="setSummaryOrderBy('firstName'); summaryOrder = 'DESC'; orderFilterSummary()"
              >mdi-menu-down</v-icon>
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Joined</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">AdminStatus</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Projects In
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="setSummaryOrderBy('projectCount'); summaryOrder = 'ASC'; orderFilterSummary()"
              >mdi-menu-up</v-icon>
              <v-icon
                v-else
                @click="setSummaryOrderBy('projectCount'); summaryOrder = 'DESC'; orderFilterSummary()"
              >mdi-menu-down</v-icon>
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Active Projects
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="setSummaryOrderBy('activeProjectCount'); summaryOrder = 'ASC'; orderFilterSummary()"
              >mdi-menu-up</v-icon>
              <v-icon
                v-else
                @click="setSummaryOrderBy('activeProjectCount'); summaryOrder = 'DESC'; orderFilterSummary()"
              >mdi-menu-down</v-icon>
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Assigned Tasks
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="setSummaryOrderBy('assignedTasks'); summaryOrder = 'ASC'; orderFilterSummary()"
              >mdi-menu-up</v-icon>
              <v-icon
                v-else
                @click="setSummaryOrderBy('assignedTasks'); summaryOrder = 'DESC'; orderFilterSummary()"
              >mdi-menu-down</v-icon>
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Groups</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Personal Tasks
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="setSummaryOrderBy('personalTaskCount'); summaryOrder = 'ASC'; orderFilterSummary()"
              >mdi-menu-up</v-icon>
              <v-icon
                v-else
                @click="setSummaryOrderBy('personalTaskCount'); summaryOrder = 'DESC'; orderFilterSummary()"
              >mdi-menu-down</v-icon>
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Group Tasks
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="setSummaryOrderBy('taskGroupTaskCount'); summaryOrder = 'ASC'; orderFilterSummary()"
              >mdi-menu-up</v-icon>
              <v-icon
                v-else
                @click="setSummaryOrderBy('taskGroupTaskCount'); summaryOrder = 'DESC'; orderFilterSummary()"
              >mdi-menu-down</v-icon>
            </span>
          </v-list-item-content>
        </v-list-item>
        <div class="tableContentScroll overflow-y-auto">
          <!-- ------ loop list here ------ -->
          <v-list-item-group>
            <v-list-item
              v-for="(user, index) in memberDetails"
              :key="index"
              dense
              class="tableContentRecord"
            >
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{ user.firstName }}
                  {{ user.lastName }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">6-16-2020</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  getUserRole(user.userRole)
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  user.projectCount
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  user.activeProjectCount
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  user.assignedTasks
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  user.taskGroupCount
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  user.personalTaskCount
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-subtitle class="tableText">
                  {{
                  user.taskGroupTaskCount
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <div class="tableLoadButton text-center">
            <div v-if="projectsSummary == ''">No records to show</div>
            <v-btn
              v-if="projectsSummary != ''"
              @click="loadMoreMembers()"
              color="#ffffff"
              depressed
            >
              <span class="text-capitalize">Load More</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-row>

    <v-overlay :value="overlay" color="black" style="z-index:1008">
      <progress-loading />
    </v-overlay>
  </div>
</template>
<script>
import { mapState } from "vuex";
import LineChart from "~/components/charts/chart";
import Progress from "~/components/popups/progress";
export default {
  components: {
    "progress-loading": Progress,
    LineChart,
  },
  data: () => ({
    filterCryteria: "DAY",
    totalActiveMemberCount: [],
    totalTaskCompletionMemberCount: [],
    labels: [],
    datacollection: null,
    options: null,
    criteriaArray: [
      { name: "Day", id: "DAY" },
      { name: "Month", id: "MONTH" },
      { name: "Year", id: "YEAR" },
    ],

    userIdArray: "userId=all&",

    dateRangeQuery: "from=all&to=all",

    loadSummaryCount: 0,
    loadDetailsCount: 0,

    detailsOrder: "DESC",
    detailsOrderBy: "projectCount",
    key: "",
    overlay: false,
    filterUser: [],
    menu: false,
    menu2: false,
    summaryOrder: "DESC",
    summaryOrderBy: "projectCount",
    summaryParams: "userId=all&orderType=DESC&orderBy=projectCount",
    detailsParams: "from=all&to=all&orderBy=taskcount&orderType=DESC",
    dateRangeFilter: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    dateRange: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    filterType: [],
  }),
  mounted() {
    this.fillData();
  },
  methods: {
    loadMemberActivity() {
      this.overlay = true;
      this.totalActiveMemberCount = [];
      this.totalTaskCompletionMemberCount = [];
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
        this.$store.dispatch("analytics/userAnalytics/fetchMemberActivity", {
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
      let memberActivity = this.memberActivity;
      Promise.all([]).finally(() => {});

      for (let index = 0; index < memberActivity.length; ++index) {
        let record = memberActivity[index];
        this.totalActiveMemberCount[index] = record.totalActiveMemberCount;
        this.totalTaskCompletionMemberCount[index] =
          record.totalTaskCompletionMemberCount;
        this.labels[index] = record.date;
      }
      this.datacollection = {
        labels: this.labels,
        datasets: [
          {
            label: "Member who were active",
            borderColor: "#4F5CC9",
            pointBackgroundColor: "#4F5CC9",
            fill: false,
            data: this.totalActiveMemberCount,
            borderWidth: 2,
            lineTension: 0,
          },
          {
            label: "Members who completed tasks",
            borderColor: "#4FC971",
            pointBackgroundColor: "#4FC971",
            fill: false,
            data: this.totalTaskCompletionMemberCount,
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
    getUserRole(role) {
      switch (role) {
        case "USER":
          return "User";
          break;
        case "WORKLOAD":
          return "Workload";
          break;
        case "ADMIN":
          return "Admin";
          break;
        case "SUPER_ADMIN":
          return "Super Admin";
          break;
        case "ORGANIZATION_ADMIN":
          return "Organization Admin";
          break;
      }
    },
    setSummaryOrderBy(orderBy) {
      this.summaryOrderBy = orderBy;
    },

    orderFilterSummary() {
      this.loadSummaryCount = 0;
      // let dateRange;

      this.overlay = true;
      this.summaryParams =
        this.userIdArray +
        "orderBy=" +
        this.summaryOrderBy +
        "&orderType=" +
        this.summaryOrder;
      // console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch("analytics/userAnalytics/emptyUserStore"),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch("analytics/userAnalytics/fetchMemberDetails", {
            params: this.summaryParams,
            startIndex: this.loadSummaryCount * 10,
            endIndex: this.loadSummaryCount * 10 + 10,
          }),
        ]).finally(() => {
          this.overlay = false;
          this.loadSummaryCount++;
        });
      });
    },

    loadFilterSummary() {
      this.loadSummaryCount = 0;
      if (this.filterUser.length != 0) {
        this.userIdArray = "";
        for (let i = 0; i < this.filterUser.length; i++) {
          this.userIdArray =
            this.userIdArray + "userId=" + this.filterUser[i].id + "&";
        }
      } else {
        this.userIdArray = "userId=all&";
      }

      this.overlay = true;
      this.summaryParams =
        this.userIdArray +
        "orderBy=" +
        this.summaryOrderBy +
        "&orderType=" +
        this.summaryOrder;
      // console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch("analytics/userAnalytics/emptyUserStore"),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch("analytics/userAnalytics/fetchMemberDetails", {
            params: this.summaryParams,
            startIndex: this.loadSummaryCount * 10,
            endIndex: this.loadSummaryCount * 10 + 10,
          }),
        ]).finally(() => {
          this.overlay = false;
          this.loadSummaryCount++;
        });
      });
    },

    loadMoreMembers() {
      this.loadSummaryCount++;
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("analytics/userAnalytics/fetchMemberDetails", {
          params: this.summaryParams,
          startIndex: this.loadSummaryCount * 10,
          endIndex: this.loadSummaryCount * 10 + 10,
        }),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    filterOverview() {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch(
          "analytics/projectAnalytics/fetchProjectOverview",
          {
            from: this.dateRange[0],
            to: this.dateRange[1],
          }
        ),
      ]).finally(() => {
        this.overlay = false;
      });
    },
  },

  computed: {
    ...mapState({
      users: (state) => state.user.users,
      memberDetails: (state) => state.analytics.userAnalytics.memberDetails,
      memberActivity: (state) => state.analytics.userAnalytics.memberActivity,
    }),

    userArray() {
      let AssigneeSearchList = this.users;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          img: user.profileImage,
        });
      }
      return assigneeList;
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