<template>
  <div>
    <v-row>
      <div class="col1">
        <div class="searchTabLeftBar overflow-y-auto">
          <span class="containsText">Contains Text</span>

          <v-text-field outlined solo flat background-color="#FFFFFF"></v-text-field>
          <v-row align="center">
            <v-col md="12">
              <v-autocomplete
                v-model="assignee"
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
              <VueCtkDateTimePicker
                :no-value-to-custom-elem="false"
                color="#3f51b5"
                v-model="dateRange"
                label="Date Range"
                range
                left
                noButton
                autoClose
              ></VueCtkDateTimePicker>
              <v-autocomplete
                class="filterOrderWorkload"
                v-model="orderBy"
                :items="orderByArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                dense
                chips
                background-color="#FFFFFF"
                small-chips
                label="Order By"
                multiple
                clearable
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter
                      <strong>Order By</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
              <v-radio-group v-model="radioGroup">
                <v-row>
                  <v-col md="6">
                    <v-radio label="Ascending" value="asc"></v-radio>
                  </v-col>
                  <v-col md="6">
                    <v-radio label="Decending" value="des"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <v-row>
                <v-col md="12">
                  <div class="filterSearchBtn">Search</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="col2">
        <div
          class="searchTabRightBar"
        >{{this.filterAssignee}} {{this.filterProject}} {{ this.filterType}} {{ this.filterStatus}} {{this.radioGroup}}</div>
      </div>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: null,
    assigneeArray: [],
    projectArray: [],
    filterAssignee: [],
    filterProject: [],
    filterType: [],
    filterStatus: [],
    filterOrderBy: [],
    searchAssignee: null,
    selectAssignee: null,
    searchProject: null,
    selectProject: null,
    dateRange: new Date(),
    radioGroup: "asc",
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
      { name: "Assignee", id: "assignee" },
      { name: "Projects", id: "projects" },
      { name: "Type", id: "type" },
      { name: "Status", id: "status" },
      { name: "Date", id: "date" }
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