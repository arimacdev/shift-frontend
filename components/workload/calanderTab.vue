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
                  event-height="15"
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
        </div>
      </div>
    </v-row>
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
export default {
  components: {
    "progress-loading": Progress,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
  },
  data: () => ({
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