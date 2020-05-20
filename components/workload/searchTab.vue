<template>
  <div>
    <v-row>
      <div class="col1">
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
              <VueCtkDateTimePicker
                :no-value-to-custom-elem="false"
                color="#3f51b5"
                v-model="dateRange"
                label="Date Range"
                range
                left
                noButton
                autoClose
                :clear-icon-cb="clearDate()"
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
                @click:clear="clearOrderBy()"
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
              <v-radio-group v-model="filterOrderSequence">
                <v-row>
                  <v-col md="6">
                    <v-radio label="Ascending" value="ASC"></v-radio>
                  </v-col>
                  <v-col md="6">
                    <v-radio label="Decending" value="DESC"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              <v-row>
                <v-col md="12">
                  <div @click="jqlSearch()" class="filterSearchBtn">Search</div>
                </v-col>
              </v-row>

              <v-row>
                <v-col md="12">
                  <span class="containsText">Filter templates</span>
                  <v-row>
                    <v-col md="8">
                      <v-autocomplete
                        v-model="template"
                        return-object
                        :items="templateArray"
                        item-text="name"
                        item-value="id"
                        :search-input.sync="searchAssignee"
                        flat
                        solo
                        dense
                        chips
                        background-color="#FFFFFF"
                        small-chips
                        label="Saved Templates"
                        clearable
                        :clear-icon-cb="clearAssignee()"
                      >
                        <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title>
                              Filter by
                              <strong>Saved templates</strong>
                            </v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col md="4">
                      <v-btn width="100%" color="primary" @click="loadTemplate">Go</v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <save-template
                        :saveTemplateQuery="saveTemplateQuery"
                        :filterAssignee="filterAssignee"
                        :filterProject="filterProject"
                        :filterType="filterType"
                        :filterStatus="filterStatus"
                        :from="from"
                        :to="to"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="col2">
        <!-- {{this.filterAssignee}} {{this.filterProject}} {{ this.filterType}} {{ this.filterStatus}} {{this.filterOrderSequence}} -->
        <div class="searchTabRightBar overflow-y-auto">
          <div v-if="this.filterResult == ''" class="defaultFilterBackground">
            <v-icon size="150" color="#EDF0F5">mdi-magnify</v-icon>
          </div>
          <div v-else>
            <!-- {{this.filterResult}} -->
            <div v-for="(entityTasks, entity, index) in this.orderedTaskList()" :key="index">
              <!-- <span> {{entityTasks}} || {{entity}} || {{index}}</span> -->
              <div
                class="orderByEntity"
                v-if="filterOrderBy === 'taskDueDateAt' && entity == null"
              >No Due Date</div>
              <div class="orderByEntity" v-if="entity != undefined">{{entity}}</div>

              <div v-for="(task, index) in entityTasks" :key="index">
                <div class="taskList restructuredWorkloadTaskFilterList">
                  <nuxt-link
                    :to="
                  '/task/' + task.taskId + '/?project=' + projectId
                "
                    style="text-decoration: none;"
                    target="_blank"
                  >
                    <v-list-item>
                      <!-- @click.stop="drawer = !drawer" -->
                      <v-list-item-action>
                        <v-icon
                          v-if="task.taskStatus == 'closed'"
                          size="30"
                          color="#2EC973"
                        >mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                      </v-list-item-action>
                      <div class="tasklistTaskNames restructuredMainTaskName">
                        <div class="body-2">
                          <span class="restructuredMainTaskCode">{{task.secondaryTaskId}}</span>
                          {{ task.taskName }}
                        </div>
                      </div>
                      <!-- <div
                      class="restStatusChip"
                      :class="statusCheck(task.issueType)"
                      >{{ task.issueType }}</div>-->
                      <v-list-item-content class="updatedDate">
                        <v-list-item-title
                          :class="dueDateCheck(task)"
                        >{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
                      </v-list-item-content>
                      <div>
                        <v-list-item-avatar>
                          <v-img
                            v-if="task.taskAssigneeProfileImage != null"
                            :src="task.taskAssigneeProfileImage"
                          ></v-img>
                          <v-img
                            v-else
                            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                          ></v-img>
                        </v-list-item-avatar>
                      </div>
                      <div v-if="task.isParent == true" class="bluePart"></div>
                    </v-list-item>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SaveTemplate from "~/components/workload/saveTemplate";
export default {
  components: {
    "save-template": SaveTemplate
  },
  created() {
    this.$store.dispatch("workload/fetchTemplates");
  },
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: null,
    saveTemplateQuery: "",
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
    templateArray: [],
    filterAssignee: [],
    filterProject: [],
    filterTemplate: "",
    filterType: [],
    filterStatus: [],
    filterResult: [],
    filterOrderBy: "projectName",
    searchAssignee: null,
    selectAssignee: null,
    searchProject: null,
    selectProject: null,
    selectTemplate: null,
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
    },
    searchTemplate(val) {
      val && val !== this.selectTemplate && this.loadTempalte(val);
    }
  },
  methods: {
    orderedTaskList() {
      const taskList = this.filterResult;
      const name = "projectName";
      const orderedList = taskList.reduce((accumilate, current) => {
        accumilate[current[this.filterOrderBy]] = (
          accumilate[current[this.filterOrderBy]] || []
        ).concat(current);
        return accumilate;
      }, {});
      console.log("taskList", taskList);
      console.log("taskListOrder", orderedList);

      // return taskList;
      return orderedList;
    },
    async loadTemplate() {
      console.log("loadTemplate", this.filterTemplate.query);
      let taskFilterResponse;
      try {
        taskFilterResponse = await this.$axios.$get(
          `/projects/workload/filter?query=${this.filterTemplate.query}`,
          {
            headers: {
              user: this.$store.state.user.userId
            }
          }
        );
        this.filterResult = taskFilterResponse.data;
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
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
        this.orderByQuery =
          "ORDER BY " + this.filterOrderBy + " " + this.filterOrderSequence;
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
      this.saveTemplateQuery = encodeURI(this.jqlQuery);
      console.log("TEMP QUERY:  " + this.saveTemplateQuery);

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
    clearDate() {
      this.dateQuery = "";
      this.jqlQuery = "";
    },
    clearOrderBy() {
      this.orderByQuery = "";
      this.jqlQuery = "";
      this.filterOrderBy = "projectName";
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
    },
    loadTempalte(v) {
      // let templateResponse;
      // let userId = this.$store.state.user.userId;
      // try {
      //   templateResponse = await this.$axios.$get(`/template/${userId}`);
      // } catch (e) {}
      // console.log("template list", templateResponse.data);
      // this.$store.dispatch("workload/fetchTemplates");
      let templateSearchList = this.templates;
      for (let index = 0; index < templateSearchList.length; ++index) {
        let template = templateSearchList[index];
        this.templateArray.push({
          name: template.templateName,
          id: template.templateId,
          query: template.templateQuery
        });
      }
    },
    statusCheck(task) {
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
        return "Add Due Date";
      } else if (
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Today";
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() - 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() - 1 === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() + 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() + 1 === dueToUtcDate.getFullYear()
      ) {
        return "Tomorrow";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10);
        return stringDate;
      }
    }
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      allProjects: state => state.project.projects,
      templates: state => state.workload.templates
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
        console.log("project", value);
        this.filterProject = value;
      }
    },
    template: {
      get() {
        this.loadTempalte();
      },
      set(value) {
        this.filterTemplate = value;
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
    },
    orderBy: {
      get() {},
      set(value) {
        this.filterOrderBy = value;
      }
    }
  }
};
</script>