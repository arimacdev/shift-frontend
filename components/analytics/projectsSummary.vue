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
                <v-list-item-subtitle class="leadsSubTitle"
                  >Total Projects</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  projectsOverview.totalProjects.value
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.totalProjects.performance == 'increase'"
              >&#x2191;</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="
                projectsOverview.totalProjects.performance == 'decrese'
              "
              >&#x2193;</span
            >
            <span style="font-size: 10px; color: #67D2E0 !important" v-else
              >&#x2195;</span
            >
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.totalProjects.performance == 'increase'"
              >+</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="
                projectsOverview.totalProjects.performance == 'decrese'
              "
              >-</span
            >
            {{ projectsOverview.totalProjects.percentage }}%) over the past
            {{ projectsOverview.totalProjects.days }} days
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
                <v-list-item-subtitle class="leadsSubTitle"
                  >Pending Leads</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  projectsOverview.leadsPending.value
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsPending.performance == 'increase'"
              >&#x2191;</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsPending.performance == 'decrese'"
              >&#x2193;</span
            >
            <span style="font-size: 10px; color: #67D2E0 !important" v-else
              >&#x2195;</span
            >
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsPending.performance == 'increase'"
              >+</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsPending.performance == 'decrese'"
              >-</span
            >
            {{ projectsOverview.leadsPending.percentage }}%) over the past
            {{ projectsOverview.leadsPending.days }} days
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
                <v-list-item-subtitle class="leadsSubTitle"
                  >Leads Ongoing</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  projectsOverview.leadsOngoing.value
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsOngoing.performance == 'increase'"
              >&#x2191;</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsOngoing.performance == 'decrese'"
              >&#x2193;</span
            >
            <span style="font-size: 10px; color: #67D2E0 !important" v-else
              >&#x2195;</span
            >
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadsOngoing.performance == 'increase'"
              >+</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="projectsOverview.leadsOngoing.performance == 'decrese'"
              >-</span
            >
            {{ projectsOverview.leadsOngoing.percentage }}%) over the past
            {{ projectsOverview.leadsOngoing.days }} days
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
                <v-list-item-subtitle class="leadsSubTitle"
                  >Lead Conversion</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle"
                  >{{
                    projectsOverview.leadConversion.value
                  }}%</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="leadsAnalyticsText">
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadConversion.performance == 'increase'"
              >&#x2191;</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="
                projectsOverview.leadConversion.performance == 'decrese'
              "
              >&#x2193;</span
            >
            <span style="font-size: 10px; color: #67D2E0 !important" v-else
              >&#x2195;</span
            >
            (
            <span
              style="font-size: 10px; color: #66B25F !important"
              v-if="projectsOverview.leadConversion.performance == 'increase'"
              >+</span
            >
            <span
              style="font-size: 10px; color: #E07857 !important"
              v-else-if="
                projectsOverview.leadConversion.performance == 'decrese'
              "
              >-</span
            >
            {{ projectsOverview.leadConversion.percentage }}%) over the past
            {{ projectsOverview.leadConversion.days }} days
          </div>
        </div>
        <div class="leadsDisplay">
          <div class="leadsContentDiv">
            <div>
              <!-- <v-text-field solo dense background-color="#EDF0F5" flat label="All time"></v-text-field> -->
              <!-- <v-btn width="100%" depressed color="#EDF0F5">
                <span class="text-capitalize" style="color: #576377">All Time</span>
              </v-btn>-->
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
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.menu.save(dateRange);
                      filterOverview();
                    "
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleDateSearchSection">
          <v-btn @click="setAllTime()" width="100%" depressed color="#EDF0F5">
            <span class="text-capitalize" style="color: #576377">All Time</span>
          </v-btn>
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
                @click="
                  $refs.menu2.save(dateRangeFilter);
                  loadFilterSummary();
                  loadFilterDetails();
                "
                >OK</v-btn
              >
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
            v-model="key"
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
            @change="loadFilterSummary()"
          ></v-autocomplete>
          <!-- <v-text-field
            v-model="key"
            solo
            dense
            flat
            clearable
            background-color="#EDF0F5"
            prepend-inner-icon="mdi-magnify"
            label="Search here"
            @input="loadFilterSummary()"
          ></v-text-field>-->
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="titleSectionDiv">Summary</div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item dense style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <span class="tableTitle">Project</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Status</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              No of Tasks
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="
                  setSummaryOrderBy('total');
                  summaryOrder = 'ASC';
                  orderFilterSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setSummaryOrderBy('total');
                  summaryOrder = 'DESC';
                  orderFilterSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Completed Tasks
              <v-icon
                v-if="this.summaryOrder == 'DESC'"
                @click="
                  setSummaryOrderBy('completed');
                  summaryOrder = 'ASC';
                  orderFilterSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setSummaryOrderBy('completed');
                  summaryOrder = 'DESC';
                  orderFilterSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Health</span>
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
                <v-list-item-subtitle class="tableText">{{
                  project.projectName
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  getStatus(project.projectStatus)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.totalTasks
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.completedTaskCount
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle
                  class="tableText"
                  style="color: #66B25F !important"
                  >Healthy</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <div class="tableLoadButton text-center">
            <div v-if="projectsSummary == ''">No records to show</div>
            <v-btn
              v-if="projectsSummary != '' && isSummaryLoaded == false"
              @click="loadMoreSummary()"
              color="#ffffff"
              depressed
            >
              <span style="color: #576377" class="text-capitalize"
                >Load More</span
              >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTitleSection">
        <div class="titleSectionDiv">Project Detailed View</div>
      </div>
    </v-row>
    <v-row>
      <div class="summaryTableDiv">
        <v-list-item dense style="background-color: #010101 !important" dark>
          <v-list-item-content>
            <span class="tableTitle">
              Project
              <v-icon
                v-if="this.detailsOrder == 'DESC'"
                @click="
                  setDetailsOrderBy('projectName');
                  detailsOrder = 'ASC';
                  orderDetailsSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setDetailsOrderBy('projectName');
                  detailsOrder = 'DESC';
                  orderDetailsSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Created
              <v-icon
                v-if="this.detailsOrder == 'DESC'"
                @click="
                  setDetailsOrderBy('projectStartDate');
                  detailsOrder = 'ASC';
                  orderDetailsSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setDetailsOrderBy('projectStartDate');
                  detailsOrder = 'DESC';
                  orderDetailsSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Status
              <v-icon
                v-if="this.detailsOrder == 'DESC'"
                @click="
                  setDetailsOrderBy('projectStatus');
                  detailsOrder = 'ASC';
                  orderDetailsSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setDetailsOrderBy('projectStatus');
                  detailsOrder = 'DESC';
                  orderDetailsSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Total Tasks
              <v-icon
                v-if="this.detailsOrder == 'DESC'"
                @click="
                  setDetailsOrderBy('taskcount');
                  detailsOrder = 'ASC';
                  orderDetailsSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setDetailsOrderBy('taskcount');
                  detailsOrder = 'DESC';
                  orderDetailsSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Members
              <v-icon
                v-if="this.detailsOrder == 'DESC'"
                @click="
                  setDetailsOrderBy('memberCount');
                  detailsOrder = 'ASC';
                  orderDetailsSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setDetailsOrderBy('memberCount');
                  detailsOrder = 'DESC';
                  orderDetailsSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Owner</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Engagement</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">
              Time Taken
              <v-icon
                v-if="this.detailsOrder == 'DESC'"
                @click="
                  setDetailsOrderBy('timeTaken');
                  detailsOrder = 'ASC';
                  orderDetailsSummary();
                "
                >mdi-menu-down</v-icon
              >
              <v-icon
                v-else
                @click="
                  setDetailsOrderBy('timeTaken');
                  detailsOrder = 'DESC';
                  orderDetailsSummary();
                "
                >mdi-menu-up</v-icon
              >
            </span>
          </v-list-item-content>
        </v-list-item>
        <div class="tableContentScroll overflow-y-auto">
          <!-- ------ loop list here ------ -->
          <v-list-item-group>
            <v-list-item
              v-for="(project, index) in projectsDetails"
              :key="index"
              dense
              class="tableContentRecord"
            >
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.projectName
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.projectStartDate.slice(0, 10)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  getStatus(project.projectStatus)
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.taskCount
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.memberCount
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <span
                  v-for="(owner, index) in project.owners"
                  :key="index"
                  class="tableText"
                >
                  {{ owner.firstName }}
                  <span v-if="index != project.owners.length - 1">/</span>
                </span>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText">{{
                  project.engagement
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <v-list-item-subtitle class="tableText"
                  >{{ getDays(project.timeTaken) }} Days</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <div class="tableLoadButton text-center">
            <div v-if="projectsDetails == ''">No records to show</div>
            <v-btn
              v-if="projectsDetails != '' && isDetailsLoaded == false"
              @click="loadMoreDetails()"
              color="#ffffff"
              depressed
            >
              <span style="color: #576377" class="text-capitalize"
                >Load More</span
              >
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
import { mapState } from 'vuex';
import Progress from '~/components/popups/progress';
export default {
  components: {
    'progress-loading': Progress,
  },
  data: () => ({
    summaryDateRange: 'from=all&to=all&',
    summaryKey: 'project=all&',
    summaryStatus: 'status=all&',

    dateRangeQuery: 'from=all&to=all',

    loadSummaryCount: 0,
    loadDetailsCount: 0,
    summaryOrder: 'DESC',
    summaryOrderBy: 'total',
    detailsOrder: 'DESC',
    detailsOrderBy: 'taskcount',
    key: [],
    overlay: false,
    filterProject: [],
    menu: false,
    menu2: false,
    summaryParams:
      'from=all&to=all&project=all&status=all&orderBy=total&orderType=DESC',
    detailsParams: 'from=all&to=all&orderBy=taskcount&orderType=DESC',
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
      { name: 'Presales : Project Discovery', id: 'presalesPD' },
      { name: 'Presales : Quotation Submission', id: 'preSalesQS' },
      { name: 'Presales : Negotiation', id: 'preSalesN' },
      { name: 'Presales : Confirmed', id: 'preSalesC' },
      { name: 'Presales : Lost', id: 'preSalesL' },
      { name: 'Ongoing', id: 'ongoing' },
      { name: 'Support', id: 'support' },
      { name: 'Finished', id: 'finished' },
    ],
  }),
  methods: {
    setAllTime() {
      (this.dateRangeFilter = [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ]),
        this.loadFilterSummary();
      this.loadFilterDetails();
    },
    setSummaryOrderBy(orderBy) {
      this.summaryOrderBy = orderBy;
    },
    setDetailsOrderBy(orderBy) {
      this.detailsOrderBy = orderBy;
    },
    getDays(ms) {
      // let oneDay = 1000 * 60 * 60 * 24;
      // return Math.round(ms / oneDay) + " Days";
      if (ms <= 0) {
        return 0;
      } else {
        return ms;
      }
    },
    getStatus(status) {
      switch (status) {
        case 'presalesPD':
          return 'Presales : Discovery';
          break;
        case 'preSalesQS':
          return 'Presales : Quotation Submission';
          break;
        case 'preSalesN':
          return 'Presales : Negotiation';
          break;
        case 'preSalesC':
          return 'Presales : Confirmed';
          break;
        case 'preSalesL':
          return 'Presales : Lost';
          break;
        case 'ongoing':
          return 'Ongoing';
          break;
        case 'support':
          return 'Support';
          break;
        case 'finished':
          return 'Finished';
          break;
      }
    },
    clearDate() {
      // this.dateRange = [
      //   new Date().toISOString().substr(0, 10),
      //   new Date().toISOString().substr(0, 10),
      // ];
      // this.loadFilterSummary();
    },
    orderDetailsSummary() {
      this.loadDetailsCount = 0;
      // let dateRange;

      this.overlay = true;
      this.detailsParams =
        this.dateRangeQuery +
        '&orderBy=' +
        this.detailsOrderBy +
        '&orderType=' +
        this.detailsOrder;
      // console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch('analytics/projectAnalytics/emptyDetailsStore'),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch(
            'analytics/projectAnalytics/fetchProjectDetails',
            {
              params: this.detailsParams,
              startIndex: this.loadDetailsCount * 10,
              endIndex: this.loadDetailsCount * 10 + 10,
            }
          ),
        ]).finally(() => {
          this.overlay = false;
          this.loadDetailsCount++;
        });
      });
    },
    orderFilterSummary() {
      this.overlay = true;
      this.loadSummaryCount = 0;
      this.summaryParams =
        this.summaryDateRange +
        this.summaryKey +
        this.summaryStatus +
        'orderBy=' +
        this.summaryOrderBy +
        '&orderType=' +
        this.summaryOrder;

      Promise.all([
        this.$store.dispatch('analytics/projectAnalytics/emptySummaryStore'),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch(
            'analytics/projectAnalytics/fetchProjectSummary',
            {
              params: this.summaryParams,
              startIndex: this.loadSummaryCount * 10,
              endIndex: this.loadSummaryCount * 10 + 10,
            }
          ),
        ]).finally(() => {
          this.overlay = false;
          this.loadSummaryCount++;
        });
      });
    },
    loadFilterSummary() {
      this.loadSummaryCount = 0;
      if (this.filterType.length != 0) {
        this.summaryStatus = '';
        for (let i = 0; i < this.filterType.length; i++) {
          this.summaryStatus =
            this.summaryStatus + 'status=' + this.filterType[i].id + '&';
        }
      } else {
        this.summaryStatus = 'status=all&';
      }

      if (this.key.length != 0) {
        this.summaryKey = '';
        for (let i = 0; i < this.key.length; i++) {
          this.summaryKey = this.summaryKey + 'project=' + this.key[i].id + '&';
        }
      } else {
        this.summaryKey = 'project=all&';
      }

      if (
        this.dateRangeFilter.toString() !=
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        this.summaryDateRange =
          'from=' +
          this.dateRangeFilter[0] +
          '&to=' +
          this.dateRangeFilter[1] +
          '&';
      } else {
        this.summaryDateRange = 'from=all&to=all&';
      }
      // if (this.key == "" || this.key == null) {
      //   this.summaryKey = "&key=all&";
      // } else {
      //   this.summaryKey = "&key=" + this.key + "&";
      // }
      this.overlay = true;
      this.summaryParams =
        this.summaryDateRange +
        this.summaryKey +
        this.summaryStatus +
        'orderBy=' +
        this.summaryOrderBy +
        '&orderType=' +
        this.summaryOrder;
      // console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch('analytics/projectAnalytics/emptySummaryStore'),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch(
            'analytics/projectAnalytics/fetchProjectSummary',
            {
              params: this.summaryParams,
              startIndex: this.loadSummaryCount * 10,
              endIndex: this.loadSummaryCount * 10 + 10,
            }
          ),
        ]).finally(() => {
          this.overlay = false;
          this.loadSummaryCount++;
        });
      });
    },
    loadFilterDetails() {
      this.loadDetailsCount = 0;
      // let dateRange;

      if (
        this.dateRangeFilter.toString() !=
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        this.dateRangeQuery =
          'from=' + this.dateRangeFilter[0] + '&to=' + this.dateRangeFilter[1];
      } else {
        this.dateRangeQuery = 'from=all&to=all';
      }

      this.overlay = true;
      this.detailsParams =
        this.dateRangeQuery +
        '&orderBy=' +
        this.detailsOrderBy +
        '&orderType=' +
        this.detailsOrder;
      // console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch('analytics/projectAnalytics/emptyDetailsStore'),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch(
            'analytics/projectAnalytics/fetchProjectDetails',
            {
              params: this.detailsParams,
              startIndex: this.loadDetailsCount * 10,
              endIndex: this.loadDetailsCount * 10 + 10,
            }
          ),
        ]).finally(() => {
          this.overlay = false;
          this.loadDetailsCount++;
        });
      });
    },
    loadMoreSummary() {
      this.loadSummaryCount++;
      this.overlay = true;
      Promise.all([
        this.$store.dispatch('analytics/projectAnalytics/fetchProjectSummary', {
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
          'analytics/projectAnalytics/fetchProjectOverview',
          {
            from: this.dateRange[0],
            to: this.dateRange[1],
          }
        ),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    loadMoreDetails() {
      this.loadDetailsCount++;
      this.overlay = true;
      Promise.all([
        this.$store.dispatch('analytics/projectAnalytics/fetchProjectDetails', {
          params: this.detailsParams,
          startIndex: this.loadDetailsCount * 10,
          endIndex: this.loadDetailsCount * 10 + 10,
        }),
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
      projectsDetails: (state) =>
        state.analytics.projectAnalytics.projectDetails,
      isSummaryLoaded: (state) =>
        state.analytics.projectAnalytics.isSummaryLoaded,
      isDetailsLoaded: (state) =>
        state.analytics.projectAnalytics.isDetailsLoaded,
    }),
    dateRangeText() {
      if (
        this.dateRange.toString() ==
        [
          new Date().toISOString().substr(0, 10),
          new Date().toISOString().substr(0, 10),
        ]
      ) {
        return 'Select Date Range';
      } else {
        return this.dateRange.join(' - ');
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
        return 'Select Date Range';
      } else {
        return this.dateRangeFilter.join(' - ');
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
