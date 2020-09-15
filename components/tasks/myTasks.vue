<template>
  <div class>
    <v-btn
      v-if="this.filterList != '' && this.taskFilter != 'none'"
      style="position: absolute; right: 60px; margin-top: -48px"
      @click="exportAsCSV"
      dark
      height="30px"
      outlined
      color="blue"
    >
      <v-icon color="blue" size="20">mdi-download</v-icon>
      <v-list-item-action-text>Export as CSV</v-list-item-action-text>
      <!-- Cancel -->
    </v-btn>
    <div class="filterSectionAllTasks">
      <div class="filterTriggersDrop" style="width: 10%; float: left; padding-right: 10px">
        <v-btn
          depressed
          dark
          width="100%"
          height="30px"
          color="#060631"
          @click="changeTaskOption('all-tasks')"
        >
          <v-icon
            size="13"
            color="#FFFFFF"
            style="margin-right: 3px; margin-top: 3px !important"
          >icon-task</v-icon>
          <span class="text-capitalize" style="font-size: 10px !important">All Tasks</span>
        </v-btn>
      </div>
      <div class="filterTriggersDrop" style="width: 10%; float: left; padding-right: 10px">
        <v-btn
          depressed
          dark
          width="100%"
          height="30px"
          color="#66B35F"
          @click="changeTaskOption('add-task')"
        >
          <v-icon
            size="13"
            color="#FFFFFF"
            style="margin-right: 3px; margin-top: 3px !important"
          >icon-task</v-icon>
          <span class="text-capitalize" style="font-size: 10px !important">Add Tasks</span>
        </v-btn>
      </div>
      <div class="filterTriggers" style="width: 17%; float: left; margin-right: 10px">
        <v-text-field
          dense
          clearable
          @click:clear="clearName()"
          v-model="nameOfTask"
          outlined
          flat
          label="Task Name"
          background-color="#FFFFFF"
          @input="jqlSearch()"
        ></v-text-field>
      </div>
      <div class="filterTriggersDrop" style="width: 13%; float: left; padding-right: 10px">
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
          @change="jqlSearch()"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip x-small style="width: 30px" v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-autocomplete>
      </div>
      <div class="filterTriggersDrop" style="width: 13%; float: left; padding-right: 10px; ">
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
          @change="jqlSearch()"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip x-small style="width: 30px" v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-autocomplete>
      </div>
      <div class="filterTriggersDrop" style="width: 22%; float: left; padding-right: 10px">
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
          @input="jqlSearch()"
        ></VueCtkDateTimePicker>
      </div>
      <div class="filterTriggersDrop" style="width: 5%; float: left; margin-right: 20px">
        <v-btn depressed @click="jqlSearch()" dark width="100%" height="30px" color="#333369">
          <span class="text-capitalize" style="font-size: 10px !important">Search</span>
        </v-btn>
      </div>
      <div class="filterTriggersDrop" style="width: 5%; float: left; padding-right: 10px">
        <v-btn depressed @click="filterChange()" dark width="100%" height="30px" color="#FF6161">
          <span class="text-capitalize" style="font-size: 10px !important; ">Clear</span>
        </v-btn>
      </div>
    </div>

    <div
      v-if="this.taskFilter == 'none'"
      class="taskListViewContent overflow-y-auto bottomScroll"
      id="mainDiv"
    >
      <div v-if="this.taskFilter == 'none'" class="restructuredTaskCreate">
        <v-text-field
          ref="txtMainTask"
          v-model="taskName"
          background-color="#FFFFFF"
          outlined
          solo
          flat
          dense
          prepend-inner-icon="mdi-plus"
          style="border-radius: 0px; margin-top: 5px"
          label="Add a main task. Format: <TaskName> #<DueDate>"
          class
          @keyup.enter="addTask(null)"
          @input="autoFilling()"
        ></v-text-field>
      </div>
      <v-col v-if="datePickerDialog" class="datePopupBoxTaskCreate" cols="12" sm="6" md="4">
        <v-date-picker
          @input="
            datePickerDialog = false;
            addDate();
          "
          v-model="datePicker"
          scrollable
        ></v-date-picker>
      </v-col>
      <!-- ------ start my task list ------- -->
      <div v-for="(task, index) in projectMyTasks" :key="index">
        <div class>
          <div class="restructuredFilterTaskList">
            <v-list-item class="upperListItem">
              <v-list-item class="innerListItem">
                <!-- @click.stop="drawer = !drawer" -->
                <v-list-item-action>
                  <v-icon
                    v-if="task.taskStatus == 'closed'"
                    size="25"
                    color="#66B25F"
                  >mdi-checkbox-blank</v-icon>
                  <v-icon
                    @click="closeTask(task.taskId, false)"
                    style="cursor: pointer"
                    v-else
                    size="25"
                    color="#939393"
                  >mdi-checkbox-blank-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content
                  @click="
                    selectTask(task);
                    taskDialog = true;
                  "
                  style="cursor: pointer"
                >
                  <!-- <div class="tasklistTaskNames restructuredMainTaskName"> -->
                  <div style="color: #576377">
                    <span
                      class="restructuredMainTaskCode fontRestructure12"
                    >{{ task.secondaryTaskId }}</span>
                    {{ task.taskName }}
                  </div>
                  <!-- </div> -->
                </v-list-item-content>
                <!-- <div
                  class="restStatusChip"
                  :class="statusCheck(task.issueType)"
                >{{ taskTypeFormatting(task.issueType) }}</div>-->
                <v-list-item-action>
                  <v-chip class="chipsContent" :class="statusCheck(task.taskStatus)" x-small>
                    <span class="fontRestructure12">{{ taskStatusFormatting(task.taskStatus) }}</span>
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action>
                  <v-chip class="chipsContent" :class="typeCheck(task.issueType)" x-small>
                    <span class="fontRestructure12">{{ taskTypeFormatting(task.issueType) }}</span>
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action class="updatedDate">
                  <v-list-item-title
                    class="fontRestructure12"
                    :class="dueDateCheck(task)"
                  >{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
                </v-list-item-action>
                <!-- <div style="margin-right: -25px"> -->
                <v-list-item-avatar size="25">
                  <v-img
                    v-if="
                      task.taskAssigneeProfileImage != null &&
                        task.taskAssigneeProfileImage != ''
                    "
                    :src="task.taskAssigneeProfileImage"
                  ></v-img>
                  <v-img
                    v-else
                    src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                  ></v-img>
                </v-list-item-avatar>
                <!-- </div> -->
                <!-- <div v-if="task.isParent == true" class="bluePartMyTask"></div> -->
              </v-list-item>
              <div class="boardTabLinkIcon">
                <nuxt-link
                  :to="'/task/' + task.taskId + '/?project=' + projectId"
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <v-icon size="17" color="#9F9F9F">mdi-open-in-new</v-icon>
                </nuxt-link>
              </div>
            </v-list-item>
          </div>
        </div>
      </div>
      <!-- <div style="margin-top: 50px">
        <v-pagination
          @input="getMyTasks()"
          v-model="myTaskPagination"
          :length="Math.ceil(this.myTaskCount / 10)"
          circle
          :total-visible="8"
        ></v-pagination>
      </div>-->
      <div v-if="this.scrollCount <= this.myTaskCount / 10" class="loadMoreTasks text-center">
        <v-btn
          v-if="projectsSummary != ''"
          @click="loadMoreButtonAction()"
          color="#ffffff"
          depressed
        >
          <span style="color: #576377" class="text-capitalize">Load More Tasks</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </div>

    <div v-else class="taskListViewContent filterListTop overflow-y-auto">
      <div v-if="this.filterList == ''" class="filterTitleDiv headline">No items to show</div>
      <div v-for="(task, index) in filterList" :key="index">
        <div
          class="restructuredFilterTaskList"
          :class="filterStyles(task.isParent)"
          v-if="task.taskAssignee == userId"
        >
          <v-list-item class="upperFilterListItem" @click="selectTask(task)">
            <!-- @click.stop="drawer = !drawer" -->
            <v-list-item-action>
              <v-icon
                v-if="task.taskStatus == 'closed'"
                size="25"
                color="#66B25F"
              >mdi-checkbox-blank</v-icon>
              <v-icon
                @click="closeTask(task.taskId, true)"
                v-else
                size="25"
                color="#939393"
              >mdi-checkbox-blank-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <!-- <div class="tasklistFilterTaskNames restructuredMainTaskName"> -->
              <nuxt-link
                :to="'/task/' + task.taskId + '/?project=' + projectId"
                style="text-decoration: none;"
                target="_blank"
              >
                <div style="color: #576377">
                  <span class="restructuredMainTaskCode fontRestructure12">
                    {{
                    task.secondaryTaskId
                    }}
                  </span>
                  {{ task.taskName }}
                </div>
              </nuxt-link>
              <!-- </div> -->
            </v-list-item-content>
            <!-- <div
                class="restStatusChip"
                :class="statusCheck(task.issueType)"
              >{{ taskStatusFormatting(task.taskStatus) }}</div>
              <div
                class="restStatusChip"
                :class="statusCheck(task.issueType)"
            >{{ taskTypeFormatting(task.issueType) }}</div>-->
            <v-list-item-action>
              <v-chip class="chipsContent" :class="statusCheck(task.taskStatus)" x-small>
                <span class="fontRestructure12">{{ taskStatusFormatting(task.taskStatus) }}</span>
              </v-chip>
            </v-list-item-action>
            <v-list-item-action>
              <v-chip class="chipsContent" :class="typeCheck(task.issueType)" x-small>
                <span class="fontRestructure12">{{ taskTypeFormatting(task.issueType) }}</span>
              </v-chip>
            </v-list-item-action>
            <v-list-item-action class="updatedDate">
              <v-list-item-title
                class="fontRestructure12"
                :class="dueDateCheck(task)"
              >{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
            </v-list-item-action>
            <!-- <div> -->
            <v-list-item-avatar size="25">
              <v-img
                v-if="task.profileImage != null && task.profileImage != ''"
                :src="task.profileImage"
              ></v-img>
              <v-img
                v-else
                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
              ></v-img>
            </v-list-item-avatar>
            <!-- </div> -->
            <div v-if="task.isParent == true" class="bluePart"></div>
          </v-list-item>
        </div>
      </div>
    </div>

    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition" persistent>
      <task-dialog
        :task="task"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :componentClose="componentClose"
        :taskObject="taskObject"
        :stomp="stomp"
        @taskDialogClosing="taskDialogClosing()"
        @clearStore="clearStore()"
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
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import TaskDialog from "~/components/tasks/taskDialog";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Papa from "papaparse";

export default {
  props: ["myTaskPagination"],
  data() {
    return {
      scrollCount: 1,
      datePickerDialog: false,
      datePicker: new Date().toISOString().substr(0, 10),
      selectedDueDate: "",
      myTaskPagination: this.myTaskPagination,
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
        taskName: "",
      },
      nameOfTask: "",
      taskTypeArray: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" },
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

      items: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" },
      ],
      filterOptions: [
        { id: "none", name: "None" },
        { id: "issueType", name: "Task type" },
        { id: "dueDate", name: "Date Range" },
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
      componentClose: null,
      baseUrl: process.env.SYSTEM_URL,
    };
  },
  async created() {
    this.projectId = this.$route.params.projects;
  },
  mounted() {
    // let scrollCount = 0;
    // $(".bottomScroll").scroll(function () {
    //   if (
    //     $(this).scrollTop() + $(this).innerHeight() >=
    //     $(this)[0].scrollHeight
    //   ) {
    //     console.log("SCROLL COUNT " + scrollCount++);
    //   }
    // });
    // this.getMyTasks();
    // this.scroll();
    this.scrollEvent();
  },
  components: {
    // "task-side-bar": TaskSideBar,
    "task-dialog": TaskDialog,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
  },
  methods: {
    clearStore() {
      this.$store.dispatch("task/emptyStore");
      this.scrollCount = 1;
      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: false,
      });
      this.$store.dispatch(
        "task/fetchTasksMyTasks",
        this.$route.params.projects
      );
    },
    scrollEvent() {
      var myDiv = document.getElementById("mainDiv");
      myDiv.onscroll = () => {
        let bottomOfWindow =
          myDiv.scrollTop + myDiv.clientHeight === myDiv.scrollHeight;

        if (bottomOfWindow) {
          this.scrollCount = this.scrollCount + 1;
          // console.log("REACHED COUNT! " + scrollCount);
          if (this.scrollCount <= this.myTaskCount / 10 + 1) {
            this.getMyTasksLazyLoading(this.scrollCount);
          }
        }
      };
    },
    loadMoreButtonAction() {
      this.scrollCount = this.scrollCount + 1;
      this.getMyTasksLazyLoading(this.scrollCount);
    },
    getMyTasksLazyLoading(scrollCount) {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("task/setIndex", {
          startIndex: scrollCount * 10 - 10,
          endIndex: scrollCount * 10,
          isAllTasks: false,
        }),
        this.$store.dispatch(
          "task/fetchTasksMyTasks",
          this.$route.params.projects
        ),
        this.$store.dispatch(
          "task/fetchMyTaskCount",
          this.$route.params.projects
        ),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    getMyTasks() {
      console.log("SCROLL COUNT ");
      this.$store.dispatch("task/setIndex", {
        startIndex: this.myTaskPagination * 10 - 10,
        endIndex: this.myTaskPagination * 10,
        isAllTasks: false,
      });
      this.$store.dispatch(
        "task/fetchTasksMyTasks",
        this.$route.params.projects
      );
      this.$store.dispatch(
        "task/fetchMyTaskCount",
        this.$route.params.projects
      );
    },
    addDate() {
      this.selectedDueDate = this.datePicker;
      this.taskName = this.taskName + this.selectedDueDate;
      this.$refs.txtMainTask.focus();
    },
    autoFilling() {
      if (
        !this.taskName.slice(0, this.taskName.length - 1).includes("#") &&
        this.taskName.charAt(this.taskName.length - 1) == "#"
      ) {
        this.datePickerDialog = true;
        // console.log("TAGGING: " + this.tagging);
      } else {
        this.datePickerDialog = false;
      }
    },
    async closeTask(taskId, filter) {
      this.waiting = true;
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${taskId}`,
          {
            taskStatus: "closed",
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("task/emptyStore");
        this.scrollCount = 1;
        this.$store.dispatch("task/setIndex", {
          startIndex: 0,
          endIndex: 10,
          isAllTasks: false,
        });
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        if (filter) {
          this.jqlSearch();
        }
        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;

        this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("Error updating a status", e);
      }
    },
    changeTaskOption(option) {
      this.$store.dispatch("task/emptyStore");
      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: false,
      });
      this.$emit("changeTaskOption", option);
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
    exportAsCSV() {
      var blob = new Blob([Papa.unparse(this.filterList)], {
        type: "text/csv;charset=utf-8;",
      });

      var link = document.createElement("a");

      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "taskList.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    websocketConnectInit(taskId) {
      console.log("initalize websocket connection for task", taskId);
      const url = this.baseUrl + "/api/pm-service";
      try {
        console.log("connecting to ws...");
        let socket = new SockJS(url + "/chat");
        //this.stompClient = Stomp.over(socket);
        this.stomp = Stomp.over(socket);
        //this.$store.dispatch("stompClient/setStompClient", "this.stomp");
        //let client = this.stompClient;
        this.stomp.connect({}, (frame) => {
          console.log("connected to: " + frame);
          console.log("subscribing to topic: " + "/topic/messages/" + taskId);
          this.stomp.subscribe("/topic/messages/" + taskId, (response) => {
            // console.log("Response", response);
            let data = JSON.parse(response.body);
            console.log("outside----->");
            if (data.actionType === "comment") {
              console.log("inside----->");
              this.$store.dispatch("comments/fetchTaskActivityComment", {
                taskId: this.selectedTask.taskId,
                startIndex: 0,
                endIndex: 9,
              });
            } else if (
              data.actionType === "typing" &&
              data.sender !== this.userId
            ) {
              this.$store.dispatch("stompClient/setTypingStatus", true);
              this.$store.dispatch("stompClient/setTypingUser", data.message);
            } else if (
              data.actionType === "notTyping" &&
              data.sender !== this.userId
            ) {
              this.$store.dispatch("stompClient/setTypingStatus", false);
            }
          });
        });
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },

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
      this.orderByQuery =
        "ORDER BY FIELD(taskStatus, 'closed') ASC,  taskCreatedAt DESC";

      if (this.nameOfTask != "" && this.nameOfTask != null) {
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
              user: this.$store.state.user.userId,
            },
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
      // this.scrollCount = 1;
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
              to: to.slice(0, 10),
            },
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
              type: "project",
            },
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
      this.scrollCount = 1;
      this.$store.dispatch("task/emptyStore");
      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: false,
      });
      this.overlay = true;
      let response;
      let taskName;

      if (!this.updatedTask.taskName.includes("#")) {
        this.selectedDueDate = "";
      }

      if (this.selectedDueDate != "") {
        taskName = this.taskName.split("#")[0];
      } else {
        taskName = this.taskName;
      }

      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: taskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.userId,
            taskDueDate: new Date(this.selectedDueDate),
            taskRemindOnDate: "",
            taskStatus: null,
            taskNotes: "",
            issueType: "development",
            parentTaskId: selectedParentTask,
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
        } else {
          // console.log("assignee is NOT me", this.taskAssignee);
          this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
        }
        (this.taskName = ""),
          (this.taskAssignee = ""),
          (this.taskStatus = ""),
          (this.taskDueDate = new Date()),
          (this.taskRemindOnDate = new Date()),
          (this.taskNotes = ""),
          (this.files = null);
      } catch (e) {
        this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
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
          img: user.assigneeProfileImage,
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    listenToChange() {
      // console.log("listened to changes ------->");
      this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
      this.$store.dispatch("task/fetchProjectTaskCompletion", this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    taskFilterHandler() {
      // console.log("-----------> changed" + this.taskSelect);
    },
    async selectTask(task) {
      this.websocketConnectInit(task.taskId);
      this.task = task;
      this.$store.dispatch("task/setSelectedTask", task);
      // this.taskObject = taskObject;
      this.componentClose = "";
      // console.log("selectedTask", task);
      this.$axios.get(`/users/${task.taskAssignee}`).then(async (response) => {
        // console.log("fetched task -->", response.data.data);
        this.assignee = response.data.data;
      });
      this.$store.dispatch("user/setSelectedTaskUser", task.taskAssignee);
      if (this.task.isParent) {
        // console.log("parent task");
        this.$store.dispatch("task/fetchChildren", {
          projectId: this.projectId,
          taskId: this.task.taskId,
        });
      } else {
        this.$store.dispatch("task/fetchParentTask", {
          projectId: this.projectId,
          taskId: this.task.parentId,
        });
      }
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/${task.taskId}/files`,
          {
            headers: {
              user: this.userId,
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
      this.$store.dispatch("user/fetchOwnUser", this.userId);
      this.$store.dispatch("activityLog/fetchTaskActivityLog", {
        taskId: task.taskId,
        startIndex: 0,
        endIndex: 10,
      });
      this.$store.dispatch("comments/fetchTaskActivityComment", {
        taskId: task.taskId,
        startIndex: 0,
        endIndex: 10,
      });

      this.$store.dispatch("comments/fetchTaskCommentLength", task.taskId);
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
  },
  computed: {
    ...mapState({
      people: (state) => state.task.userCompletionTasks,
      projectAllTasks: (state) => state.task.allTasks,
      projectMyTasks: (state) => state.task.myTasks,
      // projectId: state => state.project.project.projectId,
      selectedTask: (state) => state.task.selectedTask,
      myTaskCount: (state) => state.task.myTaskCount,
    }),
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

    // taskName: {
    //   get() {
    //     return null;
    //   },
    //   set(value) {
    //     this.updatedTask.taskName = value;
    //   }
    // }
  },
};
</script>

<style scoped></style>
