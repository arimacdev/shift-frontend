<template>
  <div class="projectSummarypage">
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
            <span class="tableTitle">Name</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Joined</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">AdminStatus</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Projects In</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Projects With Tasks</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Total Tasks Assigned</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Groups</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Personal Tasks</span>
          </v-list-item-content>
          <v-list-item-content>
            <span class="tableTitle">Group Tasks Assigned</span>
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
import Progress from "~/components/popups/progress";
export default {
  components: {
    "progress-loading": Progress,
  },
  data: () => ({
    userIdArray: "userId=all&",

    dateRangeQuery: "from=all&to=all",

    loadSummaryCount: 0,
    loadDetailsCount: 0,

    detailsOrder: "DESC",
    detailsOrderBy: "taskcount",
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
    setDetailsOrderBy(orderBy) {
      this.detailsOrderBy = orderBy;
    },

    orderDetailsSummary() {
      this.loadDetailsCount = 0;
      // let dateRange;

      this.overlay = true;
      this.detailsParams =
        this.dateRangeQuery +
        "&orderBy=" +
        this.detailsOrderBy +
        "&orderType=" +
        this.detailsOrder;
      // console.log("SUMMARY " + this.summaryParams);
      Promise.all([
        this.$store.dispatch("analytics/projectAnalytics/emptyDetailsStore"),
      ]).finally(() => {
        Promise.all([
          this.$store.dispatch(
            "analytics/projectAnalytics/fetchProjectDetails",
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
    loadMoreDetails() {
      this.loadDetailsCount++;
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("analytics/projectAnalytics/fetchProjectDetails", {
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
      users: (state) => state.user.users,
      memberDetails: (state) => state.analytics.userAnalytics.memberDetails,
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
