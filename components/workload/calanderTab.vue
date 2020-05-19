<template>
  <div>
    <v-row>
      <div class="calanderCol1">
        <div class="searchTabLeftBar overflow-y-auto">
          <span class="containsText">Contains Text</span>

          <v-text-field
            clearable
            @click:clear="clearName()"
            v-model="taskName"
            outlined
            solo
            flat
            background-color="#FFFFFF"
          ></v-text-field>
          <v-row align="center">
            <v-col md="12">
              <v-autocomplete
                v-model="assignee"
                return-object
                :items="assigneeArray"
                item-text="name"
                item-value="id"
                :search-input.sync="searchAssignee"
                flat
                outlined
                dense
                chips
                background-color="#FFFFFF"
                small-chips
                label="Assignee"
                multiple
                clearable
                :clear-icon-cb="clearAssignee()"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Assignee</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>

              <v-autocomplete
                v-model="project"
                return-object
                :items="projectArray"
                item-text="name"
                item-value="id"
                :search-input.sync="searchProject"
                flat
                outlined
                dense
                chips
                background-color="#FFFFFF"
                small-chips
                label="Project"
                multiple
                clearable
                :clear-icon-cb="clearProject()"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Project</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="taskType"
                return-object
                :items="taskTypeArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                dense
                chips
                background-color="#FFFFFF"
                small-chips
                label="Task Type"
                multiple
                clearable
                @click:clear="clearType()"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Type</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="taskStatus"
                return-object
                :items="taskStatusArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                dense
                chips
                background-color="#FFFFFF"
                small-chips
                label="Task Status"
                multiple
                clearable
                @click:clear="clearStatus()"
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Status</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <div @click="jqlSearch()" class="filterSearchBtn">Search</div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="calanderCol2">
        <div class="searchTabRightBar overflow-y-auto"></div>
      </div>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    value: null,
    jqlQuery: "",
    assigneeQuery: "",
    projectQuery: "",
    typeQuery: "",
    statusQuery: "",
    orderByQuery: "",
    dateQuery: "",
    taskNameQuery: "",
    assigneeArray: [],
    projectArray: [],
    filterAssignee: [],
    filterProject: [],
    filterType: [],
    filterStatus: [],
    filterResult: [],
    filterOrderBy: "projectName",
    searchAssignee: null,
    selectAssignee: null,
    searchProject: null,
    selectProject: null,
    from: "",
    to: "",
    dateRange: new Date(),
    filterOrderSequence: "ASC",
    taskName: "",
    taskTypeArray: [
      { name: "Development", id: "development" },
      { name: "QA", id: "qa" },
      { name: "Design", id: "design" },
      { name: "Bug", id: "bug" },
      { name: "Operational", id: "operational" },
      { name: "Pre-sales", id: "preSales" },
      { name: "General", id: "general" }
    ],
    orderByArray: [
      { name: "Assignee", id: "taskAssignee" },
      { name: "Projects", id: "projectName" },
      { name: "Type", id: "issueType" },
      { name: "Status", id: "taskStatus" },
      { name: "Date", id: "taskDueDateAt" }
    ],
    taskStatusArray: [
      { name: "Pending", id: "pending" },
      { name: "On hold", id: "onHold" },
      { name: "Open", id: "open" },
      { name: "Cancel", id: "cancel" },
      { name: "ReOpened", id: "reOpened" },
      { name: "Fixing", id: "fixing" },
      { name: "Testing", id: "testing" },
      { name: "Resolved", id: "resolved" },
      { name: "In progress", id: "inprogress" },
      { name: "Completed", id: "completed" },
      { name: "Implementing", id: "implementing" },
      { name: "Under review", id: "underReview" },
      { name: "Weiting for approval", id: "waitingForApproval" },
      { name: "Review", id: "review" },
      { name: "Discussion", id: "discussion" },
      { name: "Waiting response", id: "waitingResponse" },
      { name: "Ready", id: "ready" },
      { name: "Deployed", id: "deployed" },
      { name: "Fixed", id: "fixed" },
      { name: "Rejected", id: "rejected" },
      { name: "Closed", id: "closed" }
    ]
  }),
  watch: {
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    },
    searchProject(val) {
      val && val !== this.selectProject && this.loadProject(val);
    }
  },
  methods: {
    jqlSearch() {
      // filterAssignee: [],
      // filterProject: [],
      // filterType: [],
      // filterStatus: [],
      // filterOrderBy: [],

      if (this.filterAssignee.length != 0) {
        let assigneeList = "";
        for (let i = 0; i < this.filterAssignee.length; i++) {
          assigneeList = assigneeList + '"' + this.filterAssignee[i].id + '"';
          if (i < this.filterAssignee.length - 1) {
            assigneeList = assigneeList + ",";
          }
        }
        this.assigneeQuery = "taskAssignee IN " + "(" + assigneeList + ") AND ";
      }
      if (this.filterProject.length != 0) {
        let projectList = "";
        for (let i = 0; i < this.filterProject.length; i++) {
          projectList = projectList + '"' + this.filterProject[i].id + '"';
          if (i < this.filterProject.length - 1) {
            projectList = projectList + ",";
          }
        }
        this.projectQuery = "projectId IN " + "(" + projectList + ")  AND ";
      }
      if (this.filterType.length != 0) {
        let typeList = "";
        for (let i = 0; i < this.filterType.length; i++) {
          typeList = typeList + '"' + this.filterType[i].id + '"';
          if (i < this.filterType.length - 1) {
            typeList = typeList + ",";
          }
        }
        this.typeQuery = "issueType IN " + "(" + typeList + ")  AND ";
      }
      if (this.filterStatus.length != 0) {
        let statusList = "";
        for (let i = 0; i < this.filterStatus.length; i++) {
          statusList = statusList + '"' + this.filterStatus[i].id + '"';
          if (i < this.filterStatus.length - 1) {
            statusList = statusList + ",";
          }
        }
        this.statusQuery = "taskStatus IN " + "(" + statusList + ")  AND ";
      }
      if (this.dateRange != null) {
        if (
          this.dateRange.start !== undefined &&
          this.dateRange.end !== undefined
        ) {
          this.from = this.dateRange.start;
          this.to = this.dateRange.end;
          const startDate = new Date(this.dateRange.start);
          const isoStartDate = new Date(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          ).toISOString();

          const endDate = new Date(this.dateRange.end);
          const isoEndDate = new Date(
            endDate.getTime() - endDate.getTimezoneOffset() * 60000
          ).toISOString();

          this.dateQuery =
            'taskDueDateAt BETWEEN "' +
            isoStartDate +
            '" AND "' +
            isoEndDate +
            '" AND ';
        }
      }
      if (this.filterOrderBy != "" && this.filterOrderBy != undefined) {
        this.orderByQuery = "ORDER BY projectName ASC";
      }

      if (this.taskName != "") {
        this.taskNameQuery =
          'taskName LIKE "%25' + this.taskName + '%25"  AND ';
      }

      let filterQuery =
        this.assigneeQuery +
        this.projectQuery +
        this.typeQuery +
        this.statusQuery +
        this.dateQuery +
        this.taskNameQuery;

      this.jqlQuery = filterQuery.slice(0, -5) + this.orderByQuery;
      console.log("QUERY:  " + encodeURI(this.jqlQuery));
      this.getFilterResponse();
    },
    async getFilterResponse() {
      let taskFilterResponse;
      try {
        taskFilterResponse = await this.$axios.$get(
          `/projects/workload/filter?query=${this.jqlQuery}`,
          {
            headers: {
              user: this.$store.state.user.userId
            }
          }
        );
        // console.log("tasks--->", taskFilterResponse.data);
        this.filterResult = taskFilterResponse.data;
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    clearAssignee() {
      this.assigneeQuery = "";
      this.jqlQuery = "";
    },
    clearProject() {
      this.projectQuery = "";
      this.jqlQuery = "";
    },
    clearType() {
      this.typeQuery = "";
      this.jqlQuery = "";
    },
    clearStatus() {
      this.statusQuery = "";
      this.jqlQuery = "";
    },
    clearName() {
      this.taskNameQuery = "";
      this.jqlQuery = "";
    },
    loadAssignee(v) {
      let AssigneeSearchList = this.users;
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        this.assigneeArray.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          img: user.profileImage
        });
      }
    },
    loadProject(v) {
      let projectSearchList = this.allProjects;
      for (let index = 0; index < projectSearchList.length; ++index) {
        let project = projectSearchList[index];
        this.projectArray.push({
          name: project.projectName,
          id: project.projectId
        });
      }
    }
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      allProjects: state => state.project.projects
    }),
    assignee: {
      get() {
        this.loadAssignee();
      },
      set(value) {
        this.filterAssignee = value;
      }
    },
    project: {
      get() {
        this.loadProject();
      },
      set(value) {
        this.filterProject = value;
      }
    },
    taskType: {
      get() {},
      set(value) {
        this.filterType = value;
      }
    },
    taskStatus: {
      get() {},
      set(value) {
        this.filterStatus = value;
      }
    }
  }
};
</script>