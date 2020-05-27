<template>
  <div class="taskContent">
    <div class="filterSection">
      <v-row>
        <v-col md="2">
          <v-text-field
            dense
            clearable
            @click:clear="clearName()"
            v-model="nameOfTask"
            outlined
            flat
            label="Task Name"
            background-color="#FFFFFF"
          ></v-text-field>
        </v-col>

        <v-col md="2">
          <v-autocomplete
            v-model="filterType"
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
            <template v-slot:selection="{ item, index }">
              <v-chip x-small style="width: 30px" v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="2">
          <v-autocomplete
            v-model="filterStatus"
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
            <template v-slot:selection="{ item, index }">
              <v-chip x-small style="width: 30px" v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="4">
          <VueCtkDateTimePicker
            :no-value-to-custom-elem="false"
            color="#3f51b5"
            v-model="dateRange"
            label="Date Range"
            range
            right
            noButton
            autoClose
            :clear-icon-cb="clearDate()"
          ></VueCtkDateTimePicker>
        </v-col>
        <v-col md="1">
          <v-btn @click="jqlSearch()" dark width="100%" height="40px" color="#080848">
            <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>
            <!-- Filter -->
          </v-btn>
        </v-col>
        <v-col md="1">
          <v-btn @click="filterChange()" dark width="100%" height="40px" color="#FF6161">
            <v-icon color="#FFFFFF">mdi-cancel</v-icon>
            <!-- Cancel -->
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-if="this.taskFilter == 'none'" class="restructuredTaskCreate">
      <v-text-field
        v-model="taskName"
        background-color="#EDF0F5"
        solo
        prepend-inner-icon="mdi-plus-circle"
        label="Add a main task..."
        class
        @keyup.enter="addTask(null)"
        clearable
      ></v-text-field>
    </div>
    <div v-if="this.taskFilter == 'none'" class="taskListViewContent overflow-y-auto">
      <!-- ------ start task filter list ------- -->
      <div v-for="(task, index) in projectAllTasks" :key="index">
        <div class>
          <div
            class="taskList restructuredMyTaskList"
            v-if="task.parentTask.taskAssignee == userId"
          >
            <v-list-item class="upperListItem">
              <v-list-item
                class="innerListItem"
                @click="
              selectTask(task.parentTask, task);
              taskDialog = true;
            "
              >
                <!-- @click.stop="drawer = !drawer" -->
                <v-list-item-action>
                  <v-icon
                    v-if="task.parentTask.taskStatus == 'closed'"
                    size="30"
                    color="#2EC973"
                  >mdi-checkbox-marked-circle</v-icon>
                  <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <div class="tasklistTaskNames restructuredMainTaskName">
                  <div class="body-2">
                    <span class="restructuredMainTaskCode">{{task.parentTask.secondaryTaskId}}</span>
                    {{ task.parentTask.taskName }}
                  </div>
                </div>
                <div
                  class="restStatusChip"
                  :class="statusCheck(task.parentTask.issueType)"
                >{{ task.parentTask.issueType }}</div>
                <v-list-item-content class="updatedDate">
                  <v-list-item-title
                    :class="dueDateCheck(task.parentTask)"
                  >{{ getProjectDates(task.parentTask.taskDueDateAt) }}</v-list-item-title>
                </v-list-item-content>
                <div>
                  <v-list-item-avatar>
                    <v-img
                      v-if="task.parentTask.taskAssigneeProfileImage != null && task.parentTask.taskAssigneeProfileImage != ''"
                      :src="task.parentTask.taskAssigneeProfileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                    ></v-img>
                  </v-list-item-avatar>
                </div>
                <div class="bluePartMyTask"></div>
              </v-list-item>
              <div class="boardTabLinkIcon">
                <nuxt-link
                  :to="
                  '/task/' + task.parentTask.taskId + '/?project=' + projectId
                "
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <v-icon color="blue">mdi-link-variant</v-icon>
                </nuxt-link>
              </div>
            </v-list-item>
          </div>

          <!-- -------------- sub task design --------------- -->

          <div v-if="task.childTasks.length !== 0">
            <!-- restructuredMySubTaskList -->
            <div v-for="(childTask, index) in task.childTasks" :key="index" class="taskList">
              <v-list-item class="upperListItem" v-if="childTask.taskAssignee == userId">
                <v-list-item
                  class="innerListItem"
                  @click="
                selectTask(childTask, task);
                taskDialog = true;
              "
                >
                  <!-- @click.stop="drawer = !drawer" -->
                  <v-list-item-action>
                    <v-icon
                      v-if="childTask.taskStatus == 'closed'"
                      size="30"
                      color="#2EC973"
                    >mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                  </v-list-item-action>
                  <div class="tasklistTaskNames restructuredMainTaskName">
                    <div class="body-2">
                      <span class="restructuredMainTaskCode">{{childTask.secondaryTaskId}}</span>
                      {{ childTask.taskName }}
                    </div>
                  </div>
                  <div
                    class="restStatusChip"
                    :class="statusCheck(childTask.issueType)"
                  >{{ childTask.issueType }}</div>
                  <v-list-item-content class="updatedDate">
                    <v-list-item-title
                      :class="dueDateCheck(childTask)"
                    >{{ getProjectDates(childTask.taskDueDateAt) }}</v-list-item-title>
                  </v-list-item-content>
                  <div>
                    <v-list-item-avatar>
                      <v-img
                        v-if="childTask.taskAssigneeProfileImage != null && childTask.taskAssigneeProfileImage != ''"
                        :src="childTask.taskAssigneeProfileImage"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      ></v-img>
                    </v-list-item-avatar>
                  </div>
                </v-list-item>
                <div class="boardTabLinkIcon">
                  <nuxt-link
                    :to="'/task/' + childTask.taskId + '/?project=' + projectId"
                    style="text-decoration: none;"
                    target="_blank"
                  >
                    <v-icon color="blue">mdi-link-variant</v-icon>
                  </nuxt-link>
                </div>
              </v-list-item>
            </div>
          </div>

          <!-- -------------- end sub task design -------------- -->
        </div>
      </div>
    </div>
    <!-- -------------- filter list -------------- -->
    <div v-else class="taskListViewContent filterListTop overflow-y-auto">
      <div v-if="this.filterList == ''" class="filterTitleDiv headline">No items to show</div>
      <div v-for="(task, index) in filterList" :key="index">
        <div
          class="taskList"
          :class="filterStyles(task.isParent)"
          v-if="task.taskAssignee == userId"
        >
          <nuxt-link
            :to="
                  '/task/' + task.taskId + '/?project=' + projectId
                "
            style="text-decoration: none;"
            target="_blank"
          >
            <v-list-item @click="
              selectTask(task, task);
            ">
              <!-- @click.stop="drawer = !drawer" -->
              <v-list-item-action>
                <v-icon
                  v-if="task.taskStatus == 'closed'"
                  size="30"
                  color="#2EC973"
                >mdi-checkbox-marked-circle</v-icon>
                <v-icon
                  v-else
                  size="30"
                  :color="checkBoxColor(task.isParent)"
                >mdi-checkbox-blank-circle</v-icon>
              </v-list-item-action>
              <div class="tasklistTaskNames restructuredMainTaskName">
                <div class="body-2">
                  <span class="restructuredMainTaskCode">{{task.secondaryTaskId}}</span>
                  {{ task.taskName }}
                </div>
              </div>
              <div class="restStatusChip" :class="statusCheck(task.issueType)">{{ task.issueType }}</div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title
                  :class="dueDateCheck(task)"
                >{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
              <div>
                <v-list-item-avatar>
                  <v-img
                    v-if="task.profileImage != null && task.profileImage != ''"
                    :src="task.profileImage"
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

    <!-- -------------- start side bar ----------------- -->

    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
      height="100vh"
      width="800px"
      class
      color="#FFFFFF"
    >
      <task-side-bar
        :task="task"
        :assignee="assignee"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :projectUsers="projectUsers"
        :componentClose="componentClose"
        @listenChange="listenToChange"
        @shrinkSideBar="shrinkSideBar"
      />
    </v-navigation-drawer>-->
    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition" persistent>
      <task-dialog
        :task="task"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :componentClose="componentClose"
        :taskObject="taskObject"
        @taskDialogClosing="taskDialogClosing()"
      />
    </v-dialog>

    <!-- --------------- end side bar --------------------- -->
    <div @click="close" class="allTaskPopupPlacements">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>
    <v-overlay :value="overlay">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
// import TaskSideBar from "~/components/tasks/taskSideBar";
import TaskDialog from "~/components/tasks/taskDialog";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
export default {
  // props: ['projectId', 'projectUsers', 'people'],
  data() {
    return {
      overlay: false,
      projectId: "",
      jqlQuery: "",
      assigneeQuery: "",
      projectQuery: "",
      typeQuery: "",
      statusQuery: "",
      orderByQuery: "",
      dateQuery: "",
      taskNameQuery: "",
      assigneeArray: [],
      templateArray: [],
      filterAssignee: [],
      filterProject: [],
      filterTemplate: "",
      filterType: [],
      filterStatus: [],
      filterResult: [],

      errorMessage: "",
      successMessage: "",
      component: "",
      taskDialog: false,
      taskDeleteDialog: false,
      dateRange: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      states: [],
      filterList: {},
      taskAssigneeFilter: "",
      taskName: "",
      updatedTask: {
        taskName: ""
      },
      nameOfTask: "",
      taskTypeArray: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" }
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
      ],

      items: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" }
      ],
      filterOptions: [
        { id: "none", name: "None" },
        { id: "issueType", name: "Task type" },
        { id: "dueDate", name: "Date Range" }
      ],
      projects: ["pr1"],
      drawer: null,
      task: {},
      taskObject: {},
      subTasks: [],
      taskFiles: [],
      assignee: {},
      userId: this.$store.state.user.userId,
      taskSelect: "all",
      taskFilter: "none",
      componentClose: null
    };
  },
  async created() {
    this.projectId = this.$route.params.projects;
  },
  components: {
    // "task-side-bar": TaskSideBar,
    "task-dialog": TaskDialog,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress
  },
  methods: {
    filterChange() {
      this.nameOfTask = "";
      this.taskType = [];
      this.taskStatus = [];
      this.dateRange = null;
      this.taskFilter = "none";

      this.taskNameQuery = "";
      this.typeQuery = "";
      this.statusQuery = "";
      this.dateRange = null;
      this.jqlQuery = "";
    },
    jqlSearch() {
      this.overlay = true;
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
      this.projectQuery = 'projectId IN ("' + this.projectId + '")  AND ';
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
      this.orderByQuery = "ORDER BY projectName ASC";

      if (this.nameOfTask != "") {
        this.taskNameQuery =
          'taskName LIKE "%25' + this.nameOfTask + '%25"  AND ';
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
        this.taskFilter = true;
        this.overlay = false;

        this.filterList = taskFilterResponse.data;
      } catch (error) {
        this.overlay = false;
        console.log("Error fetching data", error);
      }
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
    clearName() {
      this.taskNameQuery = "";
      this.jqlQuery = "";
    },
    taskDialogClosing() {
      // console.log("Task Dialog Closing");
      this.taskDialog = false;
    },
    filterStyles(isParent) {
      if (isParent == true) {
        return "restructuredMainTaskFilterList";
      } else {
        return "restructuredChildTaskFilterList";
      }
    },
    checkBoxColor(isParent) {
      if (isParent == true) {
        return "#EDF0F5";
      } else {
        return "#FFFFFF";
      }
    },
    async filterTasks(filterType, assignee, from, to, issueType) {
      // console.log(
      //   "filter options " + filterType,
      //   assignee,
      //   from,
      //   to,
      //   issueType
      // );
      let response;
      try {
        response = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/filter`,
          {
            data: {},
            headers: {
              user: this.userId,
              filterType: filterType,
              assignee: this.userId,
              issueType: issueType,
              from: from.slice(0, 10),
              to: to.slice(0, 10)
            }
          }
        );
        this.filterList = response.data;
        // console.log("filter response: " + response.data);
      } catch (e) {
        // console.log("Error filter task", e);
      }
    },
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId,
              type: "project"
            }
          }
        );
        // this.component = 'success-popup'
        this.$emit("listenChange");
        this.$emit("shrinkSideBar");

        // console.log(response.data);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("Error creating project", e);
      }
    },
    // ------- popup close ----------
    close() {
      this.component = "";
    },
    async addTask(selectedParentTask) {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: this.taskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.userId,
            taskDueDate: "",
            taskRemindOnDate: "",
            taskStatus: null,
            taskNotes: "",
            issueType: "development",
            parentTaskId: selectedParentTask
          }
        );
        this.taskName = "";
        this.component = "success-popup";
        this.successMessage = "Task added successfully";
        this.overlay = false;
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("Task adding successful", response);
        if (this.taskAssignee === this.userId) {
          // console.log("assignee is me", this.taskAssignee, this.userId);
          this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
          this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        } else {
          // console.log("assignee is NOT me", this.taskAssignee);
          this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        }
        (this.taskName = ""),
          (this.taskAssignee = ""),
          (this.taskStatus = "pending"),
          (this.taskDueDate = new Date()),
          (this.taskRemindOnDate = new Date()),
          (this.taskNotes = ""),
          (this.files = null);
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("Error updating a status", e);
      }
    },
    clearFilter() {
      console.log("selected===========> " + this.taskSelect);
      this.taskSelect == null;
    },
    querySelections(v) {
      // console.log("people list", this.people);
      this.states = [];
      let projectSearchList = this.people;
      for (let index = 0; index < projectSearchList.length; ++index) {
        let user = projectSearchList[index];
        this.states.push({
          name: user.assigneeFirstName + " " + user.assigneeLastName,
          id: user,
          img: user.assigneeProfileImage
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    listenToChange() {
      // console.log("listened to changes ------->");
      this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
      this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
      this.$store.dispatch("task/fetchProjectTaskCompletion", this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    taskFilterHandler() {
      // console.log("-----------> changed" + this.taskSelect);
    },
    async selectTask(task, taskObject) {
      this.task = task;
      this.$store.dispatch("task/setSelectedTask", task);
      this.taskObject = taskObject;
      this.componentClose = "";
      // console.log("selectedTask", task);
      this.$axios.get(`/users/${task.taskAssignee}`).then(async response => {
        // console.log("fetched task -->", response.data.data);
        this.assignee = response.data.data;
      });
      this.$store.dispatch("user/setSelectedTaskUser", task.taskAssignee);
      if (this.task.isParent) {
        // console.log("parent task");
        this.$store.dispatch("task/fetchChildren", {
          projectId: this.projectId,
          taskId: this.task.taskId
        });
      } else {
        this.$store.dispatch("task/fetchParentTask", {
          projectId: this.projectId,
          taskId: this.task.parentId
        });
      }
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/${task.taskId}/files`,
          {
            headers: {
              user: this.userId,
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
      } else if (task.taskDueDateAt == null) {
        return "workLoadTaskDefault";
      } else {
        const dueDate = new Date(task.taskDueDateAt);
        const dueToUtc = new Date(
          dueDate.toLocaleString("en-US", { timeZone: "UTC" })
        );
        const dueToUtcDate = new Date(dueToUtc);
        const now = new Date();
        // console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          // console.log("overdue");
          return "workLoadTaskOverDue";
        } else {
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
      people: state => state.task.userCompletionTasks,
      projectAllTasks: state => state.task.allTasks,
      // projectId: state => state.project.project.projectId,
      selectedTask: state => state.task.selectedTask
    }),
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

    // taskName: {
    //   get() {
    //     return null;
    //   },
    //   set(value) {
    //     this.updatedTask.taskName = value;
    //   }
    // }
  }
};
</script>

<style scoped></style>
