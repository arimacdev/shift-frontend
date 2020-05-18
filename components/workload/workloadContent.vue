<template>
  <div>
    <div class="workloadFilter">
      <v-list-item-action class="filterIcon"></v-list-item-action>
      <v-list-item-action>
        <VueCtkDateTimePicker
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
          <!-- <button>Clear Filters</button> -->
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
        </VueCtkDateTimePicker>
      </v-list-item-action>
    </div>
    <div class="workloadContentDiv">
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
              <v-icon color="error">mdi-alert-circle</v-icon>
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
                @click="selectTask(task, project.projectId)"
              >
                <v-list-item-action>
                  <v-icon
                    v-if="task.taskStatus == 'closed'"
                    size="30"
                    color="#2EC973"
                  >mdi-checkbox-marked-circle</v-icon>
                  <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <div class="workloadTaskName">{{ task.taskName }}</div>
                </v-list-item-content>
                <!-- <v-list-item-action>
                  <div class="workloadTaskName">{{ task.taskName }}</div>
                </v-list-item-action>-->

                <v-list-item-action>
                  <v-list-item-title :class="dueDateCheck(task)">{{ getDueDate(task.dueDate) }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </div>

            <!-- ---------------- end task loop ------------- -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- -------------- start side bar ----------------- -->

      <!-- <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
        width="600px"
        class
        color="#FFFFFF"
      >
        <task-side-bar :task="task" :projectId="projectId" />
      </v-navigation-drawer>-->
      <!-- --------------- end side bar --------------------- -->
    </div>
    <!-- {{getStartDate()}} -->
  </div>
</template>

<script>
import TaskSideBar from "~/components/workload/workloadSideBar";
import { mapState, mapGetters } from "vuex";
export default {
  props: ["selectedUser"],
  components: {
    "task-side-bar": TaskSideBar
  },
  data() {
    return {
      drawer: null,
      task: {},
      projectId: "",
      dateRange: new Date(),
      filterStart: "",
      filterEnd: "",
      looped: false,
      projectTasks: [],
      emptyTasks: []
    };
  },
  methods: {
    getProjects(type) {
      const projectsAll = this.workloadTasks;
      if (this.looped === false) {
        console.log("run loop inside: " + projectsAll);
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
          to: filterEnd
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
        to: "all"
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
    selectTask(task, projectId) {
      console.log("FETCHED TASK: ", task);
      this.task = task;
      this.projectId = projectId;
      this.$store.dispatch("subtask/fetchSubTasks", {
        projectId: projectId,
        taskId: task.taskId
      });
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
        console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
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
    }
  },
  computed: {
    ...mapState({
      workloadTasks: state => state.workload.workloadTasks
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
      }
    }
  }
};
</script>


