<template>
  <div class="taskContent">
    <!-- <v-select
      v-model="taskSelect"
      :items="items"
      item-text="name"
      item-value="id"
      label="All"
      solo
      @change="taskFilter"
    ></v-select>-->
    <div class="filterSection">
      <div class="taskFilterTypeDiv">
        <div class="filterTitleDiv">Filter by:</div>
        <div class="filterDropdownDiv">
          <v-select
            flat
            background-color="#CDCFD2"
            dense
            v-model="taskFilter"
            :items="filterOptions"
            item-text="name"
            item-value="id"
            label="None"
            solo
            @mousedown="clearFilter()"
          ></v-select>
        </div>
      </div>
      <div class="taskFilterDiv">
        <!-- ---------- filter options ------------- -->
        <div class="filterOptionDiv">
          <v-select
            flat
            background-color="#EDF0F5"
            dense
            v-if="this.taskFilter == 'assignee'"
            v-model="taskAssigneeFilter"
            :items="states"
            item-text="name"
            item-value="id.assigneeId"
            label="Task assignee"
            solo
            class="createFormElements"
            @mousedown="querySelections"
            @change="filterTasks('assignee', taskAssigneeFilter, '', '', '')"
          ></v-select>

          <v-select
            flat
            background-color="#EDF0F5"
            dense
            v-model="taskSelect"
            v-if="this.taskFilter == 'issueType'"
            :items="items"
            item-text="name"
            item-value="id"
            label="Select type"
            class="createFormElements"
            solo
            @change="filterTasks('issueType', '', '', '', taskSelect)"
          ></v-select>
          <VueCtkDateTimePicker
            v-if="this.taskFilter == 'dueDate'"
            :no-value-to-custom-elem="false"
            color="#3f51b5"
            v-model="dateRange"
            label="Filter tasks by"
            range
            right
            noButton
            autoClose
          ></VueCtkDateTimePicker>
        </div>
        <!-- ----------- filter assignee button ---------- -->
        <div class="filterSubmitButton">
          <!-- <v-btn
            @click="filterTasks('assignee', taskAssigneeFilter, '', '', '')"
            v-if="this.taskFilter == 'assignee'"
            dark
            width="100%"
            height="40px"
            color="#080848"
          >
            <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>Filter
          </v-btn>-->
          <!-- ------------- filter dateRange button ---------------- -->
          <v-btn
            v-if="this.taskFilter == 'dueDate'"
            dark
            width="100%"
            height="45px"
            color="#080848"
            @click="filterTasks('dueDate', '', dateRange.start, dateRange.end, '')"
          >
            <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>Filter
          </v-btn>
        </div>
      </div>
    </div>

    <div v-if="this.taskFilter == 'none'" class="restructuredTaskCreate">
      <v-form v-model="isValid" onsubmit="return false" ref="form">
        <v-text-field
          v-model="taskName"
          background-color="#EDF0F5"
          solo
          prepend-inner-icon="mdi-plus-circle"
          label="Add a main task..."
          class
          @keyup.enter="addTask(null, 'general')"
          clearable
        ></v-text-field>
      </v-form>
    </div>
    <div v-if="this.taskFilter == 'none'" class="taskListViewContent overflow-y-auto">
      <!-- ------ start task filter list ------- -->
      <div v-for="(task, index) in projectAllTasks" :key="index">
        <div class="backPannelAllTask">
          <div class="taskList restructuredMainTaskList">
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
                  <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
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
                      v-if="task.parentTask.taskAssigneeProfileImage != null"
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
                >
                  <v-icon color="blue">mdi-link-variant</v-icon>
                </nuxt-link>
              </div>
            </v-list-item>
          </div>

          <!-- -------------- sub task design --------------- -->
          <div class="restructuredSubTaskCreate">
            <v-text-field
              v-model="subTaskName"
              background-color="#0BAFFF"
              solo
              dark
              prepend-inner-icon="mdi-plus-circle"
              label="Add a sub task..."
              class
              @keyup.enter="addSubTask(subTaskName, task.parentTask.taskId, task.parentTask.issueType)"
              clearable
            ></v-text-field>
          </div>
          <div v-if="task.childTasks.length !== 0">
            <div
              v-for="(childTask, index) in task.childTasks"
              :key="index"
              class="taskList restructuredSubTaskList"
            >
              <v-list-item class="upperListItem">
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
                    <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                  </v-list-item-action>
                  <div class="tasklistTaskNames restructuredSubTaskName">
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
                        v-if="childTask.taskAssigneeProfileImage != null"
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
    <div v-else class="taskListViewContent overflow-y-auto">
      <div v-if="this.filterList == ''" class="filterTitleDiv headline">No items to show</div>
      <div v-for="(task, index) in filterList" :key="index">
        <div class="taskList" :class="filterStyles(task.isParent)">
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

    <!-- -------------- start side bar ----------------- -->

    <v-navigation-drawer
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
    </v-navigation-drawer>
    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition" persistent>
      <task-dialog
        :task="task"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :projectUsers="projectUsers"
        :componentClose="componentClose"
        :taskObject="taskObject"
        @taskDialogClosing="taskDialogClosing()"
      />
    </v-dialog>

    <!-- --------------------- delete task popup --------------- -->

    <v-dialog v-model="taskDeleteDialog" max-width="380">
      <v-card>
        <div class="popupConfirmHeadline">
          <v-icon class="deletePopupIcon" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
          <br />
          <span class="alertPopupTitle">Delete Task</span>
          <br />
          <span class="alertPopupText">
            You're about to permanantly delete this task, its comments and
            attachments, and all of its data. If you're not sure, you can
            cancel this action.
          </span>
        </div>

        <div class="popupBottom">
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" width="100px" @click="taskDeleteDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
            <v-btn
              color="error"
              width="100px"
              @click="
                      taskDeleteDialog = false;
                      taskDialog = false;
                      deleteTask();
                    "
            >Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- ---------------------- end popup ------------------ -->

    <!-- --------------- end side bar --------------------- -->
    <div @click="close" class="allTaskPopupPlacements">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>

<script>
import TaskSideBar from "~/components/tasks/taskSideBar";
import TaskDialog from "~/components/tasks/taskDialog";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import { mapState } from "vuex";
export default {
  // props: ['projectId', 'projectUsers', 'people'],
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      component: "",
      taskDialog: false,
      taskDeleteDialog: false,
      dateRange: new Date(),
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      states: [],
      filterList: {},
      taskAssigneeFilter: "",
      updatedTask: {
        taskName: ""
      },

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
        { id: "assignee", name: "Assignee" },
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
  components: {
    "task-side-bar": TaskSideBar,
    "task-dialog": TaskDialog,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  methods: {
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
    taskDialogClosing() {
      console.log("Task Dialog Closing");
      this.taskDialog = false;
    },
    async filterTasks(filterType, assignee, from, to, issueType) {
      console.log(
        "filter options " + filterType,
        assignee,
        from,
        to,
        issueType
      );
      let response;
      try {
        response = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/filter`,
          {
            data: {},
            headers: {
              user: this.userId,
              filterType: filterType,
              assignee: assignee,
              issueType: issueType,
              from: from.slice(0, 10),
              to: to.slice(0, 10)
            }
          }
        );
        this.filterList = response.data;
        console.log("filter response: " + response.data);
      } catch (e) {
        console.log("Error filter task", e);
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

        console.log(response.data);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
    // ------- popup close ----------
    close() {
      this.component = "";
    },
    async addTask(selectedParentTask, issueType) {
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: this.updatedTask.taskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.userId,
            taskDueDate: "",
            taskRemindOnDate: "",
            taskStatus: null,
            taskNotes: "",
            issueType: issueType,
            parentTaskId: selectedParentTask
          }
        );
        this.$refs.form.reset();
        this.component = "success-popup";
        this.successMessage = "Task added successfully";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    async addSubTask(subTaskName, selectedParentTask, issueType) {
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: subTaskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.userId,
            taskDueDate: "",
            taskRemindOnDate: "",
            taskStatus: null,
            taskNotes: "",
            issueType: issueType,
            parentTaskId: selectedParentTask
          }
        );
        this.subTaskName = "";
        this.component = "success-popup";
        this.successMessage = "Task added successfully";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    clearFilter() {
      console.log("selected===========> " + this.taskSelect);
      this.taskSelect == null;
    },
    querySelections(v) {
      console.log("people list", this.people);
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
      console.log("nameList", this.states);
      this.loading = true;
    },
    listenToChange() {
      console.log("listened to changes ------->");
      this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
      this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
      this.$store.dispatch("task/fetchProjectTaskCompletion", this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    taskFilterHandler() {
      console.log("-----------> changed" + this.taskSelect);
    },
    async selectTask(task, taskObject) {
      this.task = task;
      this.$store.dispatch("task/setSelectedTask", task);
      this.taskObject = taskObject;
      this.componentClose = "";
      console.log("selectedTask", task);
      this.$axios.get(`/users/${task.taskAssignee}`).then(async response => {
        console.log("fetched task -->", response.data.data);
        this.assignee = response.data.data;
      });
      this.$store.dispatch("user/setSelectedTaskUser", task.taskAssignee);
      if (this.task.isParent) {
        console.log("parent task");
        this.$store.dispatch("task/fetchChildren", {
          projectId: this.projectId,
          taskId: this.task.taskId
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
        console.log("files--->", taskFilesResponse.data);
        this.taskFiles = taskFilesResponse.data;
        this.$store.dispatch("task/setTaskFiles", taskFilesResponse.data);
      } catch (error) {
        console.log("Error fetching data", error);
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
      console.log("check due date color", task);
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
        console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          console.log("overdue");
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
      console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "Add Due Date";
      } else if (now.getDate() === dueToUtcDate.getDate()) {
        return "Today";
      } else if (now.getDate() - 1 === dueToUtcDate.getDate()) {
        return "Yesterday";
      } else if (now.getDate() + 1 === dueToUtcDate.getDate()) {
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
      projectId: state => state.project.project.projectId,
      selectedTask: state => state.task.selectedTask
    }),

    taskName: {
      get() {
        return null;
      },
      set(value) {
        this.updatedTask.taskName = value;
      }
    }
  }
};
</script>

<style scoped></style>
