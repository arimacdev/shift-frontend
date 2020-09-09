<template>
  <div class="projectSummarypage">
    <v-row>
      <div class="projectTopSection">
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #66B25F">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Total Projects</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">{{projectsOverview.totalProjects.value}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.totalProjects.performance == 'increase'"
            >&#x2191;</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.totalProjects.performance == 'decrese'"
            >&#x2193;</span>
            <span style="font-size: 10px; color: #67D2E0 !important" v-else>&#x2195;</span>
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.totalProjects.performance == 'increase'"
            >+</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.totalProjects.performance == 'decrese'"
            >-</span>
            {{projectsOverview.totalProjects.percentage}}%) over the past {{projectsOverview.totalProjects.days}} days
          </div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #E07857">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Pending Leads</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">{{projectsOverview.leadsPending.value}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsPending.performance == 'increase'"
            >&#x2191;</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsPending.performance == 'decrese'"
            >&#x2193;</span>
            <span style="font-size: 10px; color: #67D2E0 !important" v-else>&#x2195;</span>
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsPending.performance == 'increase'"
            >+</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsPending.performance == 'decrese'"
            >-</span>
            {{projectsOverview.leadsPending.percentage}}%) over the past {{projectsOverview.leadsPending.days}} days
          </div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #67D2E0">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Leads Ongoing</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">{{projectsOverview.leadsOngoing.value}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsOngoing.performance == 'increase'"
            >&#x2191;</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsOngoing.performance == 'decrese'"
            >&#x2193;</span>
            <span style="font-size: 10px; color: #67D2E0 !important" v-else>&#x2195;</span>
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsOngoing.performance == 'increase'"
            >+</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsOngoing.performance == 'decrese'"
            >-</span>
            {{projectsOverview.leadsOngoing.percentage}}%) over the past {{projectsOverview.leadsOngoing.days}} days
          </div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv" style="background-color: #E0CA57">
            <v-list-item>
              <v-list-item-icon
                style="background-color: #FFFFFF; padding: 15px; border-radius: 50%"
              >
                <v-icon size="20">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle">Leads Conversion</v-list-item-subtitle>
                <v-list-item-title class="leadsTitle">{{projectsOverview.leadConversion.value}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadConversion.performance == 'increase'"
            >&#x2191;</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadConversion.performance == 'decrese'"
            >&#x2193;</span>
            <span style="font-size: 10px; color: #67D2E0 !important" v-else>&#x2195;</span>
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadConversion.performance == 'increase'"
            >+</span>
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadConversion.performance == 'decrese'"
            >-</span>
            {{projectsOverview.leadConversion.percentage}}%) over the past {{projectsOverview.leadConversion.days}} days
          </div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv">
            <div>
              <!-- <v-text-field solo dense background-color="#EDF0F5" flat label="All time"></v-text-field> -->
              <v-btn width="100%" depressed color="#EDF0F5">
                <span class="text-capitalize" style="color: #576377">All Time</span>
              </v-btn>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-x
                width="100%"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Date range"
                    prepend-inner-icon="mdi-calendar-blank"
                    readonly
                    style="margin-top: 5px !important"
                    solo
                    dense
                    background-color="#EDF0F5"
                    flat
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker range v-model="dateRange" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(dateRange); filterOverview()"
                  >OK</v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Summary</div>
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
                @click="$refs.menu2.save(dateRangeFilter); loadFilterSummary() "
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <div class="titleSearchSection">
          <v-autocomplete
            v-model="filterType"
            dense
            return-object
            :items="statusArray"
            item-text="name"
            item-value="id"
            flat
            background-color="#EDF0F5"
            chips
            small-chips
            multiple
            label="Status"
            solo
            clearable
            @change="loadFilterSummary()"
          ></v-autocomplete>
        </div>
        <div class="titleSearchSection">
          <v-autocomplete
            v-model="filterProject"
            prepend-inner-icon="mdi-magnify"
            return-object
            :items="projectArray"
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
          ></v-autocomplete>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item dense style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Project</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Status</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">No of Tasks</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Completed Tasks</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Health</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div class="tableContentScroll overflow-y-auto">
          <!-- ------ loop list here ------ -->
          <v-list-item-group>
            <v-list-item
              v-for="(project, index) in projectsSummary"
              :key="index"
              dense
              class="tableContentRecord"
            >
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{project.projectName}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Pending</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{project.totalTasks}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{project.completedTaskCount}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText" style="color: #66B25F !important">Healthy</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <div class="tableLoadButton text-center">
            <v-btn @click="loadMoreSummary()" color="#ffffff" depressed>
              <span class="text-capitalize">Load More</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Project Status</div>
        <!-- <div class="titleSearchSection">
          <v-autocomplete
            v-model="filterType"
            dense
            return-object
            :items="statusArray"
            item-text="name"
            item-value="id"
            flat
            background-color="#EDF0F5"
            chips
            small-chips
            label="Status"
            solo
            clearable
          ></v-autocomplete>
        </div>
        <div class="titleSearchSection">
          <v-autocomplete
            v-model="filterProject"
            return-object
            :items="projectArray"
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
          ></v-autocomplete>
        </div>-->
      </div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item dense style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Project</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Created</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Status</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Total Tasks</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Members</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Owner</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Engagement</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="tableTitle">Time Taken</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div class="tableContentScroll overflow-y-auto">
          <!-- ------ loop list here ------ -->
          <v-list-item-group>
            <v-list-item dense class="tableContentRecord">
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">PM - Tool</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">12-10-2020</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Pending</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">1245</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">10</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">Naveen</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">12</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">5 Days</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
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
import Progress from "~/components/popups/progress";
export default {
  components: {
    "progress-loading": Progress,
  },
  data: () => ({
    loadSummaryCount: 0,
    overlay: false,
    filterProject: [],
    menu: false,
    menu2: false,
    summaryParams:
      "from=all&to=all&key=all&status=all&orderBy=total&orderType=DESC",
    dateRangeFilter: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    dateRange: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    filterType: [],
    statusArray: [
      { name: "Presales : Project Discovery", id: "presalesPD" },
      { name: "Presales : Quotation Submission", id: "preSalesQS" },
      { name: "Presales : Negotiation", id: "preSalesN" },
      { name: "Presales : Confirmed", id: "preSalesC" },
      { name: "Presales : Lost", id: "preSalesL" },
      { name: "Ongoing", id: "ongoing" },
      { name: "Support", id: "support" },
      { name: "Finished", id: "finished" },
    ],
  }),
  methods: {
    loadFilterSummary() {
      this.$store.dispatch("analytics/projectAnalytics/emptyStore"),
        (this.loadSummaryCount = 0);
      let dateRange;
      let key;
      let status = "";
      if (this.filterType.length != 0) {
        for (let i = 0; i < this.filterType.length; i++) {
          status = status + "status=" + this.filterType[i].id + "&";
          // if (i < this.filterType.length - 1) {
          //   assigneeList = assigneeList + ",";
          // }
        }
      } else {
        status = "status=all&";
      }
      if (
        this.dateRangeFilter.toString() !=
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        dateRange =
          "from=" + this.dateRangeFilter[0] + "&to=" + this.dateRangeFilter[1];
      } else {
        dateRange = "from=all&to=all";
      }
      this.overlay = true;
      this.summaryParams =
        dateRange + "&key=all&" + status + "orderBy=total&orderType=DESC";
      console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch("analytics/projectAnalytics/fetchProjectSummary", {
          params: this.summaryParams,
          startIndex: this.loadSummaryCount * 10,
          endIndex: this.loadSummaryCount * 10 + 10,
        }),
      ]).finally(() => {
        this.overlay = false;
        this.loadSummaryCount++;
      });
    },
    loadMoreSummary() {
      this.loadSummaryCount++;
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("analytics/projectAnalytics/fetchProjectSummary", {
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
      allProjects: (state) => state.project.allOrgProjects,
      projectsOverview: (state) =>
        state.analytics.projectAnalytics.projectOverview,
      projectsSummary: (state) =>
        state.analytics.projectAnalytics.projectSummary,
    }),
    dateRangeText() {
      if (
        this.dateRange.toString() ==
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        return "Select Date Range";
      } else {
        return this.dateRange.join(" - ");
      }
    },
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
    projectArray() {
      let projectSearchList = this.allProjects;
      let projectList = [];
      for (let index = 0; index < projectSearchList.length; ++index) {
        let project = projectSearchList[index];
        projectList.push({
          name: project.projectName,
          id: project.projectId,
        });
      }
      return projectList;
    },
  },
};
</script>
