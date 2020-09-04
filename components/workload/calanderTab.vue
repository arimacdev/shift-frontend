<template>
  <div>
    <v-row>
      <div class="calanderCol1">
        <div class="searchTabLeftBar overflow-y-auto">
          <span class="containsText">Contains Text</span>

          <v-text-field
            style="border-radius: 0px"
            clearable
            @click:clear="clearName()"
            v-model="taskName"
            outlined
            solo
            flat
            background-color="#FFFFFF"
            @input="jqlSearch()"
          ></v-text-field>

          <v-row align="center">
            <v-col md="12">
              <v-autocomplete
                dense
                v-model="filterAssignee"
                return-object
                :items="assigneeArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                style=" margin-bottom: -10px"
                class="searchOptionValue"
                background-color="#292929"
                dark
                small-chips
                label="Assignee"
                multiple
                clearable
                :clear-icon-cb="clearAssignee()"
                @change="jqlSearch()"
              ></v-autocomplete>

              <v-autocomplete
                dense
                v-model="filterProject"
                return-object
                :items="projectArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                style=" margin-bottom: -10px"
                class="searchOptionValue"
                background-color="#292929"
                dark
                small-chips
                label="Project"
                multiple
                clearable
                :clear-icon-cb="clearProject()"
                @change="jqlSearch()"
              ></v-autocomplete>
              <v-autocomplete
                dense
                v-model="filterType"
                return-object
                :items="taskTypeArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                style=" margin-bottom: -10px"
                class="searchOptionValue"
                background-color="#292929"
                dark
                small-chips
                label="Task Type"
                multiple
                clearable
                @click:clear="clearType()"
                @change="jqlSearch()"
              ></v-autocomplete>
              <v-autocomplete
                dense
                v-model="filterStatus"
                return-object
                :items="taskStatusArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                style=" margin-bottom: -10px"
                class="searchOptionValue"
                background-color="#292929"
                dark
                small-chips
                label="Task Status"
                multiple
                clearable
                @click:clear="clearStatus()"
                @change="jqlSearch()"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="9">
              <!-- <div @click="jqlSearch()" class="filterSearchBtn">Search</div> -->
              <v-btn
                depressed
                class="text-capitalize"
                @click="jqlSearch()"
                height="50px"
                color="#151515"
                dark
                width="100%"
              >Search</v-btn>
            </v-col>
            <v-col md="3">
              <v-btn depressed @click="clear()" height="50px" color="#ff6161" dark width="70%">
                <v-icon color="#FFFFFF">mdi-cancel</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="calanderCol2">
        <div class="searchTabRightBar overflow-y-auto">
          <v-row class="calanderSection">
            <v-col>
              <v-sheet height="64">
                <v-toolbar flat color="white">
                  <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
                  <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                  </v-btn>
                  <v-toolbar-title>{{ title }}</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-menu bottom right>
                    <template v-slot:activator="{ on }">
                      <v-btn outlined color="grey darken-2" v-on="on">
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>mdi-menu-down</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="type = 'day'">
                        <v-list-item-title>Day</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'week'">
                        <v-list-item-title>Week</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = 'month'">
                        <v-list-item-title>Month</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-toolbar>
              </v-sheet>
              <v-sheet height="600">
                <v-calendar
                  ref="calendar"
                  v-model="focus"
                  color="primary"
                  :events="events"
                  :event-color="getEventColor"
                  :now="today"
                  :type="type"
                  @click:event="showEvent"
                  @click:more="viewDay"
                  @click:date="viewDay"
                  @change="updateRange"
                ></v-calendar>
                <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-x
                >
                  <v-card color="grey lighten-4" width="450px" flat>
                    <v-toolbar :color="selectedEvent.color" dark>
                      <!-- <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>-->
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <!-- <v-spacer></v-spacer>
                       <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>-->
                    </v-toolbar>
                    <v-card-text>
                      <v-row>
                        <v-col>
                          <div class="templateText">Assignee:</div>
                          <span v-html="selectedEvent.assignee"></span>
                        </v-col>
                        <v-col>
                          <div class="templateText">Project:</div>
                          <span v-html="selectedEvent.project"></span>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div class="templateText">Type:</div>
                          <span v-html="selectedEvent.issueType"></span>
                        </v-col>
                        <v-col>
                          <div class="templateText">Status:</div>
                          <span v-html="selectedEvent.status"></span>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col>
                          <div class="templateText">Start Date:</div>
                          <span v-html="selectedEvent.start"></span>
                        </v-col>
                        <v-col>
                          <div class="templateText">End Date:</div>
                          <span v-html="selectedEvent.end"></span>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </v-sheet>
            </v-col>
          </v-row>
          <!-- {{this.filterResult}}
          {{this.events}}-->
          <div>
            <!-- {{this.filterAssignee}} {{this.filterProject}} {{ this.filterType}} {{ this.filterStatus}} {{this.filterOrderSequence}} -->
            <div>
              <!-- <div v-if="this.filterResult == ''" class="defaultFilterBackground">
            <v-icon size="150" color="red">mdi-magnify</v-icon>
              </div>-->
              <div>
                <!-- {{this.filterResult}} -->
                <div v-for="(entityTasks, entity, index) in this.orderedTaskList()" :key="index">
                  <!-- <span> {{entityTasks}} || {{entity}} || {{index}}</span> -->
                  <div
                    class="orderByEntity"
                    v-if="
                  filterOrderBy === 'taskDueDateAt' &&
                    entity === null &&
                    entity != undefined
                "
                  >No Due</div>
                  <div
                    class="orderByEntity"
                    v-if="entity != undefined && filterOrderBy === 'taskDueDateAt'"
                  >{{ entity.slice(0, 11) }}</div>
                  <div
                    class="orderByEntity"
                    v-if="filterOrderBy === 'taskAssignee' && entity != undefined"
                  >{{ entityTasks[0].firstName }} {{ entityTasks[0].lastName }}</div>
                  <div
                    class="orderByEntity"
                    v-if="
                  entity != undefined &&
                    filterOrderBy !== 'taskAssignee' &&
                    filterOrderBy !== 'taskDueDateAt'
                "
                  >{{ entity.charAt(0).toUpperCase() + entity.slice(1) }}</div>

                  <div v-for="(task, index) in entityTasks" :key="index">
                    <v-tooltip top color="blue">
                      <template v-slot:activator="{ on }">
                        <div v-on="on">
                          <v-list-item
                            class="workloadTaskItems"
                            @click="
                          selectTask(task);
                          taskDialog = true;
                        "
                          >
                            <!-- @click.stop="drawer = !drawer" -->
                            <v-list-item-action>
                              <v-icon
                                v-if="task.taskStatus == 'closed'"
                                size="25"
                                color="#66B25F"
                              >mdi-checkbox-blank</v-icon>
                              <v-icon v-else size="25" color="#939393">mdi-checkbox-blank-outline</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <!-- class="tasklistTaskNames restructuredMainTaskName" -->
                              <div>
                                <span class="restructuredMainTaskCode">
                                  {{
                                  task.secondaryTaskId
                                  }}
                                </span>
                                {{ task.taskName }}
                              </div>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-chip
                                class="chipsContent"
                                :class="statusCheck(task.taskStatus)"
                                x-small
                              >
                                <span
                                  class="fontRestructure12"
                                >{{ taskStatusFormatting(task.taskStatus) }}</span>
                              </v-chip>
                            </v-list-item-action>
                            <v-list-item-action>
                              <v-chip
                                class="chipsContent"
                                :class="typeCheck(task.issueType)"
                                x-small
                              >
                                <span
                                  class="fontRestructure12"
                                >{{ taskTypeFormatting(task.issueType) }}</span>
                              </v-chip>
                            </v-list-item-action>
                            <!-- <div
                        class="restStatusChip"
                        :class="statusCheck(task.issueType)"
                            >{{ task.issueType }}</div>-->
                            <v-list-item-action class="updatedDate" style="margin-right: 10px">
                              <v-list-item-title
                                class="fontRestructure12"
                                :class="dueDateCheck(task)"
                              >
                                {{
                                getProjectDates(task.taskDueDateAt)
                                }}
                              </v-list-item-title>
                            </v-list-item-action>
                            <div>
                              <v-list-item-avatar size="25">
                                <v-img
                                  v-if="
                                task.profileImage != null &&
                                  task.profileImage != ''
                              "
                                  :src="task.profileImage"
                                ></v-img>
                                <v-img
                                  v-else
                                  src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                                ></v-img>
                              </v-list-item-avatar>
                            </div>
                            <div v-if="task.isParent == true" class="bluePart"></div>
                          </v-list-item>
                        </div>
                      </template>
                      <span>{{ task.firstName }} {{ task.lastName }}</span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition">
      <task-dialog
        :selectedTask="task"
        :taskFiles="taskFiles"
        :taskSprint="taskSprint"
        :taskUser="taskUser"
        @taskDialogClosing="taskDialogClosing()"
      />
    </v-dialog>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
    <div @click="close" class="filterTaskPopupPlacements">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
import TaskDialog from "~/components/workload/filterDialog";
export default {
  components: {
    "progress-loading": Progress,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "task-dialog": TaskDialog,
  },
  data: () => ({
    taskDialog: false,
    overlay: false,
    errorMessage: "",
    successMessage: "",
    component: "",
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
      "KKKK",
    ],

    value: null,
    jqlQuery: "",
    assigneeQuery: "",
    projectQuery: "",
    typeQuery: "",
    statusQuery: "",
    orderByQuery: "",
    dateQuery: "",
    taskNameQuery: "",
    task: {},
    taskUser: {},
    // assigneeArray: [],
    // projectArray: [],
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
      { name: "General", id: "general" },
    ],
    orderByArray: [
      { name: "Assignee", id: "taskAssignee" },
      { name: "Projects", id: "projectName" },
      { name: "Type", id: "issueType" },
      { name: "Status", id: "taskStatus" },
      { name: "Date", id: "taskDueDateAt" },
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
      { name: "Closed", id: "closed" },
    ],
  }),
  watch: {
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    },
    searchProject(val) {
      val && val !== this.selectProject && this.loadProject(val);
    },
  },
  methods: {
    taskDialogClosing() {
      // console.log("Task Dialog Closing");
      this.taskDialog = false;
    },
    async selectTask(task) {
      // console.log("FETCHED TASK: ", task);
      this.task = task;
      this.projectId = task.projectId;
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/${task.taskId}/files`,
          {
            headers: {
              user: task.taskAssignee,
              type: "project",
            },
          }
        );
        // console.log("files--->", taskFilesResponse.data);
        this.taskFiles = taskFilesResponse.data;
        this.$store.dispatch("task/setTaskFiles", taskFilesResponse.data);
      } catch (error) {
        // console.log("Error fetching data", error);
      }
      let sprintResponse;
      if (task.sprintId == "default") {
        this.taskSprint = "Default";
      } else {
        try {
          sprintResponse = await this.$axios.$get(
            `/sprints/${this.projectId}/${task.sprintId}`,
            {
              headers: {
                userId: task.taskAssignee,
              },
            }
          );
          // console.log("sprint--->", sprintResponse.data.sprintName);
          this.taskSprint = sprintResponse.data.sprintName;
        } catch (error) {
          // console.log("Error fetching data", error);
        }
      }

      let userResponse;
      try {
        userResponse = await this.$axios.$get(`/users/${task.taskAssignee}`);
        // console.log("user--->", userResponse.data);
        this.taskUser = userResponse.data;
      } catch (error) {
        // console.log("Error fetching data", error);
      }
    },
    typeCheck(task) {
      if (task === "development") {
        return "developmentStatus";
      } else if (task === "qa") {
        return "qaStatus";
      } else if (task === "design") {
        return "designStatus";
      } else if (task === "bug") {
        return "bugStatus";
      } else if (task === "operational") {
        return "operationalStatus";
      } else if (task === "preSales") {
        return "preSalesStatus";
      } else if (task === "general") {
        return "generalStatus";
      } else {
        return "otherStatus";
      }
    },
    statusCheck(task) {
      switch (task) {
        case "pending":
          return "pendingStatus";
          break;
        case "onHold":
          return "onHoldStatus";
          break;
        case "open":
          return "openStatus";
          break;
        case "cancel":
          return "cancelStatus";
          break;
        case "reOpened":
          return "reOpenedStatus";
          break;
        case "fixing":
          return "fixingStatus";
          break;
        case "testing":
          return "testingStatus";
          break;
        case "resolved":
          return "resolvedStatus";
          break;
        case "inprogress":
          return "inprogressStatus";
          break;
        case "completed":
          return "completedStatus";
          break;
        case "implementing":
          return "implementingStatus";
          break;
        case "underReview":
          return "underReviewStatus";
          break;
        case "waitingForApproval":
          return "waitingForApprovalStatus";
          break;
        case "review":
          return "reviewStatus";
          break;
        case "discussion":
          return "discussionStatus";
          break;
        case "waitingResponse":
          return "waitingResponseStatus";
          break;
        case "ready":
          return "readyStatus";
          break;
        case "deployed":
          return "deployedStatus";
          break;
        case "fixed":
          return "fixedStatus";
          break;
        case "rejected":
          return "rejectedStatus";
          break;
        case "closed":
          return "closedStatus";
          break;
        default:
          return "defaultStatus";
      }
    },
    taskStatusFormatting(status) {
      switch (status) {
        case "pending":
          return "Pending";
          break;
        case "onHold":
          return "On Hold";
          break;
        case "open":
          return "Open";
          break;
        case "cancel":
          return "Cancel";
          break;
        case "reOpened":
          return "Re Opened";
          break;
        case "fixing":
          return "Fixing";
          break;
        case "testing":
          return "Testing";
          break;
        case "resolved":
          return "Resolved";
          break;
        case "inprogress":
          return "Inprogress";
          break;
        case "completed":
          return "Completed";
          break;
        case "implementing":
          return "Implementing";
          break;
        case "underReview":
          return "UnderReview";
          break;
        case "waitingForApproval":
          return "Waiting for Approval";
          break;
        case "review":
          return "Review";
          break;
        case "discussion":
          return "Discussion";
          break;
        case "waitingResponse":
          return "Waiting Response";
          break;
        case "ready":
          return "Ready";
          break;
        case "deployed":
          return "Deployed";
          break;
        case "fixed":
          return "Fixed";
          break;
        case "rejected":
          return "Rejected";
          break;
        case "closed":
          return "Closed";
          break;
        default:
      }
    },
    taskTypeFormatting(type) {
      switch (type) {
        case "development":
          return "Development";
          break;
        case "qa":
          return "QA";
          break;
        case "design":
          return "Design";
          break;
        case "bug":
          return "Bug";
          break;
        case "operational":
          return "Operational";
          break;
        case "preSales":
          return "Pre-sales";
          break;
        case "general":
          return "General";
          break;
        default:
      }
    },
    clear() {
      this.taskName = "";
      this.taskNameQuery = "";
      this.filterAssignee = [];
      this.assigneeQuery = "";
      this.filterProject = [];
      this.projectQuery = "";
      this.filterType = [];
      this.typeQuery = "";
      this.filterStatus = [];
      this.statusQuery = "";
      this.filterResult = [];
      this.jqlQuery = "";
      this.events = [];
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    orderedTaskList() {
      const taskList = this.filterResult;
      const orderedList = taskList.reduce((accumilate, current) => {
        // console.log("accumilate", this.filterOrderBy);
        // console.log("current", current);
        if (this.filterOrderBy === "taskDueDateAt") {
          let dueDate;
          if (current.taskDueDateAt)
            dueDate = current.taskDueDateAt.slice(0, 10);
          else dueDate = "No Due Date";
          accumilate[dueDate] = (accumilate[dueDate] || []).concat(current);
        } else {
          accumilate[current[this.filterOrderBy]] = (
            accumilate[current[this.filterOrderBy]] || []
          ).concat(current);
        }
        return accumilate;
      }, {});
      // console.log("taskList", taskList);
      // console.log("taskListOrder", orderedList);

      // return taskList;
      return orderedList;
    },
    updateRange({ start, end }) {
      const events = [];
      // console.log("LOOP TRIGERED: " + start.date + end.date);

      // const min = new Date(`${start.date}T00:00:00`);
      // const max = new Date(`${end.date}T23:59:59`);
      // const days = (max.getTime() - min.getTime()) / 86400000;
      // const eventCount = this.rnd(days, days + 20);

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + secondTimestamp);

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: this.formatDate(first, !allDay),
      //     end: this.formatDate(second, !allDay),
      //     color: this.colors[this.rnd(0, this.colors.length - 1)]
      //   });
      // }

      let taskSearchList = this.filterResult;
      // console.log("LOOP TRIGERED changed: " + taskSearchList);
      for (let index = 0; index < taskSearchList.length; ++index) {
        let task = taskSearchList[index];
        // console.log("TASK ADDED: " + task);
        events.push({
          name: task.taskName,
          start: this.getProjectDisplayDates(task.taskCreatedAt),
          end: this.getProjectDisplayDates(task.taskDueDateAt),
          project: task.projectName,
          status: task.taskStatus,
          issueType: task.issueType,
          assignee: task.firstName + " " + task.lastName,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }

      this.start = start;
      this.end = end;
      this.events = events;
      // console.log("START: " + this.start);
    },
    close() {
      this.component = "";
    },
    dueDateCheck(task) {
      // console.log("check due date color", task);
      if (task.taskStatus === "closed") {
        return "workLoadTaskDone";
      } else if (task.dueDate == null) {
        return "workLoadTaskDefault";
      } else {
        const dueDate = new Date(task.dueDate);
        const dueToUtc = new Date(
          dueDate.toLocaleString("en-US", { timeZone: "UTC" })
        );
        const dueToUtcDate = new Date(dueToUtc);
        const now = new Date();
        const today = dueToUtcDate.toDateString() === now.toDateString();
        // console.log("isToday--->", today);
        // console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          // console.log("overdue");
          return "workLoadTaskOverDue";
        } else if (today) {
          /// This is where I check
          return "workLoadTaskOverDue";
          // console.log("this is Today--->", today);
        }
        {
          return "workLoadTaskHealthy";
        }
      }
    },
    getProjectDates(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();
      // console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "No Due Date";
      } else if (
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Today";
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Tomorrow";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10);
        return stringDate;
      }
    },
    getProjectDisplayDates(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(11, 16);
        return stringDate;
      }
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${
            a.getMonth() + 1
          }-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },
    jqlSearch() {
      this.overlay = true;
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

      if (this.taskName != "" && this.taskName != null) {
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
      // console.log("QUERY:  " + encodeURI(this.jqlQuery));
      this.events = [];
      if (filterQuery != "") {
        this.getFilterResponse();
      } else {
        this.overlay = false;
      }
    },
    async getFilterResponse() {
      let taskFilterResponse;
      try {
        taskFilterResponse = await this.$axios.$get(
          `/projects/workload/filter?query=${this.jqlQuery}`,
          {
            headers: {
              user: this.$store.state.user.userId,
            },
          }
        );
        // console.log("tasks--->", taskFilterResponse.data);

        this.filterResult = taskFilterResponse.data;
        this.overlay = false;
        this.component = "success-popup";
        this.successMessage = "Calander successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.loadTasks(taskFilterResponse.data);
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
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
      this.taskName = "";
      this.taskNameQuery = "";
      this.jqlQuery = "";
    },
    loadTasks(taskSearchList) {
      // const events = [];
      // console.log("LOOP TRIGERED 123: " + taskSearchList);
      for (let index = 0; index < taskSearchList.length; ++index) {
        let task = taskSearchList[index];
        // console.log("TASK ADDED: " + task);
        this.events.push({
          name: "#" + task.secondaryTaskId + " " + task.taskName,
          start: this.getProjectDisplayDates(task.taskCreatedAt),
          end: this.getProjectDisplayDates(task.taskDueDateAt),
          project: task.projectName,
          status: task.taskStatus,
          issueType: task.issueType,
          assignee: task.firstName + " " + task.lastName,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }
    },
    loadAssignee(v) {
      let AssigneeSearchList = this.users;
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        this.assigneeArray.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          img: user.profileImage,
        });
      }
    },
    loadProject(v) {
      let projectSearchList = this.allProjects;
      for (let index = 0; index < projectSearchList.length; ++index) {
        let project = projectSearchList[index];
        this.projectArray.push({
          name: project.projectName,
          id: project.projectId,
        });
      }
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.user.users,
      allProjects: (state) => state.project.projects,
    }),
    assigneeArray() {
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
    assignee: {
      get() {
        this.loadAssignee();
      },
      set(value) {
        this.filterAssignee = value;
      },
    },
    project: {
      get() {
        this.loadProject();
      },
      set(value) {
        this.filterProject = value;
      },
    },
    taskType: {
      get() {},
      set(value) {
        this.filterType = value;
      },
    },
    taskStatus: {
      get() {},
      set(value) {
        this.filterStatus = value;
      },
    },

    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
};
</script>