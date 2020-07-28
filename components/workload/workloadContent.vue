<template>
  <div>
    <div class="workloadFilter">
      <v-list-item-action class="filterIcon"></v-list-item-action>
      <div class="filterBottom">
        <!-- <VueCtkDateTimePicker
          :no-value-to-custom-elem="false"
          color="#3f51b5"
          v-model="dateRange"
          label="Filter tasks by"
          range
          right
          noButton
          autoClose
          clearable
        >
          <button type="button" class="rangePickerButton">
            <v-icon color="#FFFFFF">mdi-filter</v-icon>Filter by
          </button>
          <button
            v-if="dateRange.end == null"
            disabled
            type="button"
            class="filterButtonWorkLoadError"
            @click="applyFilter"
          >
            <v-icon color="#FFFFFF">mdi-magnify</v-icon>
          </button>
          <button v-else type="button" class="filterButtonWorkLoad" @click="applyFilter">
            <v-icon color="#FFFFFF">mdi-magnify</v-icon>
          </button>
          <button
            v-if="dateRange.end"
            type="button"
            class="clearButtonWorkLoad"
            @click="clearFilter"
          >
            <v-icon color="#FFFFFF">mdi-close</v-icon>
          </button>
        </VueCtkDateTimePicker>-->

        <v-row>
          <v-col md="8">
            <VueCtkDateTimePicker
              :no-value-to-custom-elem="false"
              color="#3f51b5"
              v-model="dateRange"
              label="Filter tasks by"
              range
              left
              noButton
              autoClose
            ></VueCtkDateTimePicker>
          </v-col>
          <v-col md="2">
            <v-btn @click="applyFilter()" dark width="100%" height="40px" color="#080848">
              <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>
              <!-- Filter -->
            </v-btn>
          </v-col>
          <v-col md="2">
            <v-btn dark width="100%" @click="clearFilter()" height="40px" color="#FF6161">
              <v-icon color="#FFFFFF">mdi-cancel</v-icon>
              <!-- Cancel -->
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="workloadContentDiv">
      <div v-if="this.workloadTasks == ''" class="filterTitleDiv headline">No items to show</div>

      <v-expansion-panels v-model="panel" :disabled="disabled" multiple dark>
        <!-- -------------- loop this pannel for every project ---------- -->
        <v-expansion-panel
          v-for="(project, index) in workloadTasks"
          :key="index"
          class="projectDetailsPannels"
        >
          <v-expansion-panel-header
            v-if="project.total > 0"
            class="projectDetailsPannelHeader"
            color="#080848"
          >
            {{ project.projectName }} - {{ project.completed }}/{{
            project.total
            }}
            <template
              v-slot:actions
            >
              <v-icon color="#2EC973">mdi-arrow-down-circle-outline</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-header
            v-else-if="project.total == 0"
            class="projectDetailsEmptyPannelHeader"
            color="#EDF0F5"
          >
            {{ project.projectName }} - {{ project.completed }}/{{
            project.total
            }}
            <template
              v-slot:actions
            >
              <v-icon color="#ACACAC">mdi-arrow-down-circle-outline</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="projectDetailsPannelContent" color="#EDF0F5">
            <!-- ----------- loop content for tasks of projects --------------- -->
            <div class="taskDetailsBar">
              <v-list-item
                class="workloadTaskItems"
                @click.stop="drawer = !drawer"
                v-for="(task, index) in project.taskList"
                :key="index"
                @click="selectTask(task); taskDialog = true;"
              >
                <v-list-item-action>
                  <v-icon
                    v-if="task.taskStatus == 'closed'"
                    size="25"
                    color="#66B25F"
                  >mdi-checkbox-blank</v-icon>
                  <v-icon v-else size="25" color="#939393">mdi-checkbox-blank-outline</v-icon>
                </v-list-item-action>
                <v-list-item-action>
                  <div
                    style="font-weight: bold; margin-right: 30px"
                    class="workloadTaskName"
                  >{{ task.secondaryTaskId }}</div>
                </v-list-item-action>
                <v-list-item-content>
                  <div class="workloadTaskName">{{ task.taskName }}</div>
                </v-list-item-content>
                <v-list-item-action>
                  <v-chip class="chipsContent" :class="statusCheck(task.issueType)" x-small>
                    <span class="fontRestructure12">{{ taskStatusFormatting(task.taskStatus) }}</span>
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action>
                  <v-chip class="chipsContent" :class="statusCheck(task.issueType)" x-small>
                    <span class="fontRestructure12">{{ taskTypeFormatting(task.issueType) }}</span>
                  </v-chip>
                </v-list-item-action>

                <v-list-item-action class="updatedDate">
                  <v-list-item-title
                    class="fontRestructure12"
                    :class="dueDateCheck(task)"
                  >{{ getDueDate(task.taskDueDateAt) }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </div>

            <!-- ---------------- end task loop ------------- -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

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
    </div>
  </div>
</template>

<script>
// import TaskSideBar from "~/components/workload/workloadSideBar";
import { mapState, mapGetters } from "vuex";
import TaskDialog from "~/components/workload/filterDialog";
export default {
  props: ["selectedUser"],
  components: {
    // "task-side-bar": TaskSideBar,
    "task-dialog": TaskDialog,
  },
  data() {
    return {
      task: {},
      taskDialog: false,
      taskFiles: [],
      taskSprint: "",
      taskUser: {},
      drawer: null,
      projectId: "",
      dateRange: new Date(),
      filterStart: "",
      filterEnd: "",
      looped: false,
      projectTasks: [],
      emptyTasks: [],
    };
  },
  methods: {
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
    taskDialogClosing() {
      // console.log("Task Dialog Closing");
      this.taskDialog = false;
    },
    getProjects(type) {
      const projectsAll = this.workloadTasks;
      if (this.looped === false) {
        // console.log("run loop inside: " + projectsAll);
        for (let i = 0; i < projectsAll.length; i++) {
          let taskCount = projectsAll[i].total;
          switch (taskCount) {
            case 0:
              this.emptyTasks.push(projectsAll[i]);
              break;

            default:
              this.projectTasks.push(projectsAll[i]);
              break;
          }
          this.looped = true;
        }
      }
      switch (type) {
        case 0:
          return this.emptyTasks;
          break;

        default:
          return this.projectTasks;
          break;
      }
    },
    applyFilter() {
      const startDate = this.dateRange.start;
      const endDate = this.dateRange.end;
      if (startDate != null && endDate != null) {
        // console.log("selected both");
        let start = new Date(startDate);
        let end = new Date(endDate);
        const filterStart = new Date(
          start.getTime() - start.getTimezoneOffset() * 60000
        ).toISOString();
        const filterEnd = new Date(
          end.getTime() - end.getTimezoneOffset() * 60000
        ).toISOString();
        this.$store.dispatch("workload/fetchAllWorkloadTasks", {
          userId: this.selectedUser,
          from: filterStart,
          to: filterEnd,
        });
      }
    },
    clearFilter() {
      (this.dateRange = new Date()),
        (this.filterStart = ""),
        (this.filterEnd = "");
      this.$store.dispatch("workload/fetchAllWorkloadTasks", {
        userId: this.selectedUser,
        from: "all",
        to: "all",
      });
    },
    showDates() {
      // console.log("fire event-----------");
      // console.log("iso Start date", this.getStartDate());
      // console.log("end WF", this.dateRange.end);
      // console.log("iso end date", this.getEndDate());
    },
    getStartDate() {
      const startDate = new Date(this.dateRange.start);
      const isoDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      ).toISOString();
      // console.log("iso Start date", isoDate);
      return isoDate;
    },
    getEndDate() {
      if (this.dateRange.end == null) {
        // add 24h to start date
      }
      const endDate = new Date(this.dateRange.end);
      const isoDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      ).toISOString();
      // console.log("iso end date", isoDate);
      return isoDate;
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
          console.log("sprint--->", sprintResponse.data.sprintName);
          this.taskSprint = sprintResponse.data.sprintName;
        } catch (error) {
          // console.log("Error fetching data", error);
        }
      }
      let userResponse;
      try {
        userResponse = await this.$axios.$get(`/users/${task.taskAssignee}`);
        console.log("user--->", userResponse.data);
        this.taskUser = userResponse.data;
      } catch (error) {
        // console.log("Error fetching data", error);
      }
    },
    getDueDate(date) {
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
  },
  computed: {
    ...mapState({
      workloadTasks: (state) => state.workload.workloadTasks,
    }),
    getDateRange: {
      get() {
        // console.log("get date range---->");
        return new Date();
      },
      set(value) {
        const startDate = value.start;
        const endDate = value.end;
        // console.log("set date range start --->", startDate);
        // console.log("set date range end --->", endDate);
        this.filterStart = value.start;
        this.filterEnd = value.end;
        if (startDate != null && endDate != null) {
          // console.log("Go Ahead!");
        }
      },
    },
  },
};
</script>


