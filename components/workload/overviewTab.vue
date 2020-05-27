<template>
  <div class="overviewBody overflow-y-auto">
    <div>
      <div class>
        <div class>
          <div class="filterSectionOverview">
            <v-row>
              <v-col md="3">
                <span class="overviewTitle">Workload Overview</span>
                <div style="margin-left: 20px; color: #576377">
                  <v-icon color="#78CF20" size="12">mdi-circle</v-icon>
                  <span style="font-size: 12px">Task Completed</span>
                  <v-icon color="#ED5F5F" size="12">mdi-circle</v-icon>
                  <span style="font-size: 12px">Task Remaining</span>
                </div>
              </v-col>
              <v-col md="4">
                <v-autocomplete
                  v-model="filterAssignee"
                  return-object
                  :items="assigneeArray"
                  item-text="name"
                  item-value="id"
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
                ></v-autocomplete>
              </v-col>
              <v-col md="3">
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
              </v-col>
              <v-col md="1">
                <v-btn @click="jqlSearch()" dark width="100%" height="40px" color="#080848">
                  <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col md="1">
                <v-btn dark width="100%" height="40px" color="#FF6161" @click="clearFilters()">
                  <v-icon color="#FFFFFF">mdi-cancel</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="overflow-y-auto">
            <div class="graphDiv">
              <div class="overviewScrollingWrapper">
                <div class="workloadCard" v-for="(user, index) in taskWorkLoadUsers" :key="index">
                  <div class="progressCounter">{{ user.tasksCompleted + "/" + user.totalTasks}}</div>
                  <div class="overviewProgressSection">
                    <v-progress-linear
                      v-if="user.totalTasks == 0"
                      @click="selectUser(user)"
                      value="0"
                      color="#78CF20"
                      background-color="#ED5F5F"
                      height="13"
                      reactive
                    >
                      <template></template>
                    </v-progress-linear>
                    <v-progress-linear
                      v-else
                      @click="selectUser(user)"
                      :value="(user.tasksCompleted/ user.totalTasks)*100"
                      color="#78CF20"
                      background-color="#ED5F5F"
                      height="13"
                      reactive
                    >
                      <template></template>
                    </v-progress-linear>
                  </div>

                  <div class="graphNameField">
                    <v-divider></v-divider>
                    {{ user.firstName }}
                  </div>

                  <div class="overviewAvater">
                    <v-list-item-avatar @click="selectUser(user)">
                      <v-img
                        v-if="user.profileImage != null && user.profileImage != ''"
                        :src="user.profileImage"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      ></v-img>
                    </v-list-item-avatar>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="this.selectedUser !=''" class="workloadTasksDisplay">
              <div class="workloadSelectedName">{{this.firstName}} {{this.lastName}}</div>
              <div class="workloadContentDiv">
                <div v-if="workloadTasks == ''" class="noResultDiv">No tasks to show</div>
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
                              size="30"
                              color="#2EC973"
                            >mdi-checkbox-marked-circle</v-icon>
                            <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <div class="workloadTaskName">{{ task.taskName }}</div>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-list-item-title
                              :class="dueDateCheck(task)"
                            >{{ getDueDate(task.taskDueDateAt) }}</v-list-item-title>
                          </v-list-item-action>
                        </v-list-item>
                      </div>

                      <!-- ---------------- end task loop ------------- -->
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <v-overlay :value="taskWorkLoadUsers == ''">
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
import NavigationDrawer from "~/components/navigationDrawer";
import usersSearchBar from "~/components/tools/usersSearchBar";
import WorkloadContent from "~/components/workload/workloadContent";
import { mapState, mapGetters } from "vuex";
import TaskDialog from "~/components/workload/filterDialog";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";

export default {
  components: {
    NavigationDrawer,
    "workload-content": WorkloadContent,
    "task-dialog": TaskDialog,

    "progress-loading": Progress,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  data() {
    return {
      overlay: true,
      errorMessage: "",
      successMessage: "",
      component: "",
      progress: 0,
      task: {},
      taskDialog: false,
      taskFiles: [],
      taskSprint: "",
      taskUser: {},
      filterAssignee: [],
      // assigneeArray: [],
      dateRange: null,
      dateQuery: "",
      jqlQuery: "",
      assigneeQuery: "",
      userId: this.$store.state.user.userId,
      component: "add-user",
      workLoad: {},
      userData: {},
      firstName: "",
      lastName: "",
      selectedUser: "",
      skill: "",
      search: null,
      select: {},
      states: [],
      drawer: null
    };
  },

  created() {
    this.$store.dispatch("workload/fetchAllTaskLoadUsers", {
      assignees: "assignee=all",
      from: "all",
      to: "all"
    });
    this.$store.dispatch("project/clearProject");
  },

  watch: {
    search(val) {
      // console.log("value is ", val);
      val && val !== this.select && this.querySelections(val);
    },
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    }
  },
  methods: {
    close() {
      this.component = "";
    },
    getProgress(completed, total) {
      this.progress = (completed / total) * 100;
      return this.progress;
    },
    jqlSearch() {
      this.overlay = true;
      if (this.filterAssignee.length != 0) {
        let assigneeList = "";
        for (let i = 0; i < this.filterAssignee.length; i++) {
          assigneeList = assigneeList + "assignee=" + this.filterAssignee[i].id;
          if (i < this.filterAssignee.length - 1) {
            assigneeList = assigneeList + "&";
          }
        }
        this.assigneeQuery = assigneeList;
        // console.log("ASSIGNEE QUERY======> " + this.assigneeQuery);
      }
      // console.log("from" + this.dateRange);

      if (this.dateRange == null) {
        this.from = "all";
        this.to = "all";
      } else {
        if (
          this.dateRange.start !== undefined &&
          this.dateRange.end !== undefined
        ) {
          this.from = this.dateRange.start.slice(0, 10);
          this.to = this.dateRange.end.slice(0, 10);
          const startDate = new Date(this.dateRange.start);
          const isoStartDate = new Date(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          ).toISOString();
        }
      }
      this.selectedUser = "";
      this.getFilterResponse(this.from, this.to);
    },
    async getFilterResponse(from, to) {
      // console.log("from", from, "to", to);
      // let taskFilterResponse;
      // try {
      //   taskFilterResponse = await this.$axios.$get(
      //     `/projects/tasks/users/workload?${this.assigneeQuery}`,
      //     {
      //       headers: {
      //         user: this.$store.state.user.userId,
      //         from: new Date(from).toISOString(),
      //         to: new Date(to).toISOString()
      //       }
      //     }
      //   );
      //   console.log("tasks##--->", taskFilterResponse.data);
      this.taskFilter = true;

      // this.filterList = taskFilterResponse.data;

      // let fromV = if(from === null) ? "all" ? new Date(from).toISOString();
      // let to

      const filters = {
        assignees: this.assigneeQuery,
        from: from == "all" ? "all" : new Date(from).toISOString(),
        to: to == "all" ? "all" : new Date(to).toISOString()
      };
      this.$store.dispatch("workload/fetchAllTaskLoadUsers", filters);
      this.overlay = false;
      // } catch (error) {
      //   console.log("Error fetching data", error);
      // }
    },
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
    clearAssignee() {
      this.assigneeQuery = "assignee=all";
      this.jqlQuery = "";
    },
    clearDate() {
      this.from = "all";
      this.to = "all";
      this.jqlQuery = "";
    },
    clearFilters() {
      this.dateRange = null;
      this.filterAssignee = [];
      this.assigneeQuery = "assignee=all";
      this.from = "all";
      this.to = "all";

      this.getFilterResponse(this.from, this.to);
    },
    onSelectUser() {
      // console.log("details", this.select);
      if (this.select !== undefined) {
        // this.userData.firstName = this.select.firstName;
        // this.userData.lastName = this.select.lastName;
        this.firstName = this.select.firstName;
        this.lastName = this.select.lastName;
        this.selectedUser = this.select.userId;
        //  if(this.select.totalTasks != 0){
        this.$store.dispatch("workload/fetchAllWorkloadTasks", {
          userId: this.select.userId,
          from: "all",
          to: "all"
        });
        //  } else {
        //    this.$store.dispatch('workload/clearWorkLoadTasks');
        //    this.$store.dispatch('workload/loadWorkLoadTask',this.select.userId);
        //  }
      }
    },
    async selectUser(userData) {
      // this.userData = userData;
      if (this.dateRange != null) {
        this.selectedUser = userData.userId;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        const startDate = this.dateRange.start;
        const endDate = this.dateRange.end;
        if (startDate != null && endDate != null) {
          let start = new Date(startDate);
          let end = new Date(endDate);
          const filterStart = new Date(
            start.getTime() - start.getTimezoneOffset() * 60000
          ).toISOString();
          const filterEnd = new Date(
            end.getTime() - end.getTimezoneOffset() * 60000
          ).toISOString();
          this.$store.dispatch("workload/fetchAllWorkloadTasks", {
            userId: userData.userId,
            from: filterStart,
            to: filterEnd
          });
        }
        // console.log("FILTER APPLIED");
      } else {
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        // console.log("check", userData);
        this.selectedUser = userData.userId;
        this.$store.dispatch("workload/fetchAllWorkloadTasks", {
          userId: userData.userId,
          from: "all",
          to: "all"
        });
        // console.log("NO FILTER APPLIED");
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
    querySelections(v) {
      let projectSearchList = this.taskWorkLoadUsers;
      for (let index = 0; index < projectSearchList.length; ++index) {
        let user = projectSearchList[index];
        this.states.push({
          name: user.firstName + " " + user.lastName,
          id: user
        });
      }
      // console.log("usersList for search bar", this.taskWorkLoadUsers, "nameList", this.states)
      this.loading = true;
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      });
      this.loading = false;
    }
  },
  computed: {
    ...mapState({
      workloadTasks: state => state.workload.workloadTasks,
      taskWorkLoadUsers: state => state.workload.taskWorkLoadUsers,
      users: state => state.user.users,
      allProjects: state => state.project.projects
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
    }
  }
};
</script>
