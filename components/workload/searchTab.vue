<template>
  <div>
    <v-row>
      <div class="col1">
        <div class="searchTabLeftBar overflow-y-auto">
          <span class="containsText">Contains Text</span>

          <v-text-field
            @click:clear="clearName()"
            clearable
            v-model="taskName"
            outlined
            solo
            flat
            background-color="#FFFFFF"
          ></v-text-field>
          <v-row align="center">
            <v-col md="12">
              <!-- :search-input.sync="searchAssignee" -->
              <v-autocomplete
                v-model="filterAssignee"
                return-object
                :items="assigneeArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                background-color="#FFFFFF"
                small-chips
                label="Assignee"
                multiple
                clearable
                :clear-icon-cb="clearAssignee()"
              ></v-autocomplete>
              <!-- :search-input.sync="searchProject" -->
              <v-autocomplete
                v-model="filterProject"
                return-object
                :items="projectArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                background-color="#FFFFFF"
                small-chips
                label="Project"
                multiple
                clearable
                :clear-icon-cb="clearProject()"
              ></v-autocomplete>
              <v-autocomplete
                v-model="filterType"
                return-object
                :items="taskTypeArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                background-color="#FFFFFF"
                small-chips
                label="Task Type"
                multiple
                clearable
                @click:clear="clearType()"
              ></v-autocomplete>
              <v-autocomplete
                v-model="filterStatus"
                return-object
                :items="taskStatusArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                background-color="#FFFFFF"
                small-chips
                label="Task Status"
                multiple
                clearable
                @click:clear="clearStatus()"
              ></v-autocomplete>
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
              <v-select
                class="filterOrderWorkload"
                v-model="filterOrderBy"
                :items="orderByArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                chips
                background-color="#FFFFFF"
                small-chips
                label="Order By"
                @click:clear="clearOrderBy()"
              ></v-select>
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
                <v-col md="10">
                  <v-btn @click="jqlSearch()" height="70px" color="#080848" dark width="100%">Search</v-btn>
                </v-col>
                <v-col md="2">
                  <v-btn @click="jqlCancel()" height="70px" color="#ff6161" dark width="70%">
                    <v-icon color="#FFFFFF">mdi-cancel</v-icon>
                  </v-btn>
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
                        :search-input.sync="searchTemplate"
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
                        <!-- <template v-slot:no-data>
                          <v-list-item>
                            <v-list-item-title>
                              Filter by
                              <strong>Saved templates</strong>
                            </v-list-item-title>
                          </v-list-item>
                        </template>-->
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
                    <div v-on="on" class="taskList restructuredWorkloadTaskFilterList">
                      <v-list-item
                        @click="
                          selectTask(task);
                          taskDialog = true;
                        "
                      >
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
                          <div>
                            <span class="restructuredMainTaskCode">
                              {{
                              task.secondaryTaskId
                              }}
                            </span>
                            {{ task.taskName }}
                          </div>
                        </div>
                        <!-- <div
                        class="restStatusChip"
                        :class="statusCheck(task.issueType)"
                        >{{ task.issueType }}</div>-->
                        <v-list-item-content class="updatedDate">
                          <v-list-item-title :class="dueDateCheck(task)">
                            {{
                            getProjectDates(task.taskDueDateAt)
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <div>
                          <v-list-item-avatar>
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
import SaveTemplate from "~/components/workload/saveTemplate";
import TaskDialog from "~/components/workload/filterDialog";
import Progress from "~/components/popups/progress";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";

export default {
  components: {
    "save-template": SaveTemplate,
    "task-dialog": TaskDialog,
    "progress-loading": Progress,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  created() {
    this.$store.dispatch("workload/fetchTemplates");
  },
  data: () => ({
    overlay: false,
    errorMessage: "",
    successMessage: "",
    component: "",
    task: {},
    taskDialog: false,
    taskFiles: [],
    taskSprint: "",
    taskUser: {},
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
    async getUserName(entity) {
      let userResponse;
      try {
        userResponse = await this.$axios.$get(`/users/${entity}`);
        // console.log(
        //   "user--->",
        //   userResponse.data.firstName + " " + userResponse.data.lastName
        // );
        return userResponse.data.firstName;
      } catch (error) {
        // console.log("Error fetching data", error);
      }
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
              type: "project"
            }
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
                userId: task.taskAssignee
              }
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
    taskDialogClosing() {
      // console.log("Task Dialog Closing");
      this.taskDialog = false;
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
    async jqlCancel() {
      try {
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
        this.dateRange = null;
        this.filterResult = [];
        this.jqlQuery = "";
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    async loadTemplate() {
      this.taskName = "";
      this.filterAssignee = [];
      this.filterProject = [];
      this.filterType = [];
      this.filterStatus = [];
      this.dateRange = null;
      this.filterOrderBy = "";
      this.taskName = "";

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

        ////Filling the Filters
        let decodedFilterTempQuery;
        try {
          decodedFilterTempQuery = decodeURI(this.filterTemplate.query);
          // console.log("dec", decodedFilterTempQuery);
        } catch (e) {
          // console.log("Invalid Filter Template Query");
        }

        if (decodedFilterTempQuery.includes("taskAssignee")) {
          this.fillTemplateCriteria("taskAssignee", decodedFilterTempQuery);
        }
        if (decodedFilterTempQuery.includes("projectId")) {
          this.fillTemplateCriteria("projectId", decodedFilterTempQuery);
        }
        if (decodedFilterTempQuery.includes("issueType")) {
          this.fillTemplateCriteria("issueType", decodedFilterTempQuery);
        }
        if (decodedFilterTempQuery.includes("taskStatus")) {
          this.fillTemplateCriteria("taskStatus", decodedFilterTempQuery);
        }
        if (decodedFilterTempQuery.includes("ORDER")) {
          this.fillTemplateCriteria("ORDERBY", decodedFilterTempQuery);
        }
        if (decodedFilterTempQuery.includes("LIKE")) {
          this.fillTemplateCriteria("LIKE", decodedFilterTempQuery);
        }
        if (decodedFilterTempQuery.includes("BETWEEN")) {
          this.fillTemplateCriteria("BETWEEN", decodedFilterTempQuery);
        }
        // this.jqlSearch(); ------> removed this
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    fillTemplateCriteria(criteria, decodedFilterTempQuery) {
      // console.log("criteria", criteria);

      if (criteria === "ORDERBY") {
        const orderby = decodedFilterTempQuery.split("ORDER BY");

        if (orderby[1]) {
          // console.log("criteria", orderby[1]);
          const orderByString = orderby[1].trim();
          // console.log("criteria", orderByString);
          const orderBySplit = orderByString.split(" ");

          if (!orderBySplit.length < 2) {
            const orderByType = orderBySplit[0];
            // console.log("criteria", orderByType);

            const orderBySequence = orderBySplit[1];
            // console.log("criteria", orderBySequence);
            let filterOrderByType = this.orderByArray.find(
              type => type.id === orderByType
            );
            // console.log(
            //   "criteria",
            //   JSON.parse(JSON.stringify(filterOrderByType))
            // );

            if (filterOrderByType) {
              this.filterOrderBy = JSON.parse(
                JSON.stringify(filterOrderByType)
              ).id;
              this.filterOrderSequence = orderBySequence;
              // this.dateRange.start = new Date("2020-04-10T20:40:00.000+0000");
              // this.dateRange.end = new Date("2020-04-15T20:40:00.000+0000");
            }
          }
        }
      } else if (criteria === "BETWEEN") {
        const entityBetween = new RegExp(`${criteria}\s*(.*?)\s*ORDER`, "g");
        //validation
        const between = entityBetween.exec(decodedFilterTempQuery);
        if (between != null) {
          // console.log("betweenPara", between);
          const paramRemove = between[1].replace(/^"(.*)"$/, "$1");
          const twoDates = paramRemove.split("AND");
          // console.log("betweenPara", twoDates);
          if (twoDates[0] && twoDates[1]) {
            console.log("from", twoDates[0].slice(0, 12));
            console.log("to", twoDates[1].slice(0, 12));
            this.dateRange = new Date();
            this.dateRange.start = new Date(twoDates[0].slice(0, 12));
            this.dateRange.end = new Date(twoDates[1].slice(0, 12));
          }
        }
      } else {
        const entityBetween = new RegExp(`${criteria}\s*(.*?)\s*AND`, "g");
        const entityEnd = new RegExp(`${criteria}\s*(.*?)\s*ORDER`, "g");

        // const entityEnd = /taskAssignee\s*(.*?)\s*AND/g;

        const between = entityBetween.exec(decodedFilterTempQuery);
        const end = entityEnd.exec(decodedFilterTempQuery);
        // console.log("bewteen", between, end);
        if (between != null || end != null) {
          let entityMatchString;
          if (between) entityMatchString = between[1];
          else entityMatchString = end[1];
          // console.log("decode", entityMatchString);
          if (criteria === "LIKE") {
            let likeString = entityMatchString.replace(/^"(.*)"$/, "$1");
            const likeText = likeString.match(/%25(.*)%/).pop();
            // console.log("like", likeText);
            this.taskName = likeText;
          } else {
            //Get String Between Parantheses
            const regExp = /\(([^)]+)\)/;
            const paranthesesMatch = regExp.exec(entityMatchString);
            // console.log("para", paranthesesMatch);
            //Multiple Assignees
            let entityString = paranthesesMatch[1];
            let entities = [];
            // console.log("dec", paranthesesMatch[1]);
            if (entityString.includes(",")) {
              entityString.split(/\s*,\s*/).forEach(assignee => {
                //Remove Quotation Marks
                assignee = assignee.replace(/^"(.*)"$/, "$1");
                entities.push(assignee);
                // console.log("entity", assignee);
              });
            } else {
              entityString = entityString.replace(/^"(.*)"$/, "$1");
              entities.push(entityString);
            }

            for (let i = 0; i < entities.length; i++) {
              switch (criteria) {
                case "taskAssignee":
                  let filterUser = this.users.find(
                    user => user.userId === entities[i]
                  );
                  // console.log("filterUser", filterUser);
                  if (filterUser) {
                    this.filterAssignee.push({
                      name: filterUser.firstName,
                      id: filterUser.userId,
                      img: filterUser.profileImage
                    });
                  }
                  break;
                case "projectId":
                  let filterProject = this.allProjects.find(
                    project => project.projectId === entities[i]
                  );
                  // console.log("filterProject", filterProject);
                  if (filterProject) {
                    this.filterProject.push({
                      name: filterProject.projectName,
                      id: filterProject.projectId
                    });
                  }
                  break;
                case "issueType":
                  let filterIssueType = this.taskTypeArray.find(
                    issueType => issueType.id === entities[i]
                  );
                  if (filterIssueType) this.filterType.push(filterIssueType);
                  break;
                case "taskStatus":
                  let filterTaskStatus = this.taskStatusArray.find(
                    taskStatus => taskStatus.id === entities[i]
                  );
                  if (filterTaskStatus)
                    this.filterStatus.push(filterTaskStatus);
              }
            }
          }
        }
      }
    },
    close() {
      this.component = "";
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
        this.orderByQuery =
          "ORDER BY " + this.filterOrderBy + " " + this.filterOrderSequence;
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
      this.saveTemplateQuery = encodeURI(this.jqlQuery);
      // console.log("TEMP QUERY:  " + this.saveTemplateQuery);
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
              user: this.$store.state.user.userId
            }
          }
        );
        // this.component = "success-popup";
        // this.successMessage = "Tasks successfully retrieved";
        // setTimeout(() => {
        //   this.close();
        // }, 3000);
        this.overlay = false;
        this.filterResult = taskFilterResponse.data;
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
      this.taskName = "";
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
    }
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      allProjects: state => state.project.projects,
      templates: state => state.workload.templates
    }),
    assigneeArray() {
      let AssigneeSearchList = this.users;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          img: user.profileImage
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
          id: project.projectId
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
      }
    },
    project: {
      get() {
        this.loadProject();
      },
      set(value) {
        // console.log("project", value);
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

var str = " taskAssignee IN ("138bbb3d-02ed-4d72-9a03-7e8cdfe89eff") AND
projectId IN ("033a26dd-0532-4c5b-97f4-55b0c5efa841") ORDER BY projectName ASC";
var regex = /taskAssignee\s*(.*?)\s*AND/g; var matches = []; while (m =
regex.exec(str)) { matches.push(m[1]); } var str = "taskAssignee IN
('138bbb3d-02ed-4d72-9a03-7e8cdfe89eff') AND projectId IN
('033a26dd-0532-4c5b-97f4-55b0c5efa841') ORDER BY projectName ASC"; var regex =
/taskAssignee\s*(.*?)\s*AND/g; var matches = []; var exec = regex.exec(str);
while (exec) { matches.push(exec[1]); }
