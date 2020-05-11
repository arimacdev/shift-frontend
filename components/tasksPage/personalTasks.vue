<template>
  <div class="personal-task-tab">
    <!-- tabs body -->
    <div>
      <v-card class="tabs">
        <v-tabs>
          <v-tab>Tasks</v-tab>

          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <!-- ------------------------- personal task content ------------------- -->

            <div class="taskFilter-tasksPage">
              <v-select
                v-model="taskSelect"
                :items="items"
                item-text="name"
                item-value="id"
                label="All"
                solo
              ></v-select>

              <v-text-field
                v-model="personalTask"
                solo
                prepend-inner-icon="mdi-plus-circle"
                label="Add a new task"
                class="addPersonalTaskTextBox"
                @keyup.enter="addPersonalTask"
              ></v-text-field>

              <!-- -------- loop task list here ----------- -->
              <div class="taskPageContentScroll overflow-y-auto">
                <div class="taskList" v-for="(personalTask, index) in personalTasks" :key="index">
                  <v-list-item
                    v-if="personalTask.taskStatus == taskSelect"
                    @click="selectPersonalTask(personalTask);  taskDialog = true;"
                  >
                    <!-- @click.stop="drawer = !drawer" -->
                    <v-list-item-action>
                      <v-icon
                        v-if="personalTask.taskStatus == 'closed'"
                        size="30"
                        color="#2EC973"
                      >mdi-checkbox-marked-circle</v-icon>
                      <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                    </v-list-item-action>
                    <div class="tasklistTaskNames">
                      <div class="body-2">{{ personalTask.taskName }}</div>
                    </div>
                    <v-list-item-content class="updatedDate">
                      <v-list-item-title
                        :class="dueDateCheck(personalTask)"
                      >{{ getTaskDueDate(personalTask.taskDueDateAt) }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    v-if="taskSelect == 'all' || taskSelect == null"
                    @click="selectPersonalTask(personalTask); taskDialog = true;"
                  >
                    <!-- @click.stop="drawer = !drawer" -->
                    <v-list-item-action>
                      <v-icon
                        v-if="personalTask.taskStatus == 'closed'"
                        size="30"
                        color="#2EC973"
                      >mdi-checkbox-marked-circle</v-icon>
                      <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                    </v-list-item-action>
                    <div class="tasklistTaskNames">
                      <div class="body-2">{{ personalTask.taskName }}</div>
                    </div>
                    <v-list-item-content class="updatedDate">
                      <v-list-item-title
                        :class="dueDateCheck(personalTask)"
                      >{{ getTaskDueDate(personalTask.taskDueDateAt) }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </div>
            </div>
            <!-- ------------------- personal task content end --------------- -->
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>

    <!-- -------------- start side bar ----------------- -->

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      height="100vh"
      width="800px"
      class
      color="#FFFFFF"
    >
      <tasks-side-drawer
        :task="task"
        :assignee="assignee"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        @shrinkSideBar="shrinkSideBar"
      />
    </v-navigation-drawer>

    <!-- --------------- end side bar --------------------- -->
    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="taskDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-bold">
          {{
          this.task.taskName
          }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <button class :disabled="checkValidation">
            <v-list-item dark>
              <div>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      size="30px"
                      @click="taskDeleteDialog = true"
                      color="#FFFFFF"
                    >mdi-delete-circle</v-icon>
                  </template>
                  <span>Delete task</span>
                </v-tooltip>
              </div>
            </v-list-item>
          </button>
        </v-toolbar-items>
      </v-toolbar>
      <task-dialog :task="task" :subTasks="subTasks" :taskFiles="taskFiles" />
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
    <div @click="close">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>

<script>
import TaskSideDrawer from "~/components/tasksPage/tasksSideDrawer";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import TaskDialog from "~/components/tasksPage/personalTaskDialog";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    "tasks-side-drawer": TaskSideDrawer,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "task-dialog": TaskDialog
  },
  data() {
    return {
      taskDialog: false,
      taskDeleteDialog: false,
      errorMessage: "",
      component: "",
      drawer: null,
      userId: this.$store.state.user.userId,
      personalTask: "",
      taskSelect: null,
      task: {},
      assignee: {},
      subTasks: [],
      taskFiles: [],
      items: [
        { id: "all", name: "All" },
        { id: "open", name: "Open" },
        { id: "closed", name: "Closed" }
      ]
    };
  },

  created() {
    this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
  },

  methods: {
    close() {
      this.component = "";
    },
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/non-project/tasks/personal/${this.task.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        this.$emit("shrinkSideBar");
        console.log(response.data);
      } catch (e) {
        console.log("Error deleting task", e);

        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 2000);
      }
    },
    dueDateCheck(task) {
      console.log("check due date color", task);
      if (task.taskStatus === "closed") {
        return "workLoadTaskDone";
      } else if (
        task.taskDueDateAt == null ||
        task.taskDueDateAt === "1970-01-01T05:30:00.000+0000"
      ) {
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
    shrinkSideBar() {
      console.log("shrink side bar");
      this.drawer = false;
    },
    async selectPersonalTask(personalTask) {
      this.task = personalTask;
      console.log("selectedTask", personalTask);
      this.$axios
        .get(`/users/${this.task.taskAssignee}`)
        .then(async response => {
          console.log("fetched task -->", response.data.data);
          this.assignee = response.data.data;
          //if task fetch is successful,
          let subTaskResponse;
          try {
            // subTaskResponse = await this.$axios.$get(
            //   `/non-project/tasks/personal/${this.task.taskId}/subtask?userId=${this.userId}`
            // );
            // console.log("subtasks--->", subTaskResponse.data);
            // this.subTasks = subTaskResponse.data;
            //get files related to task
            let taskFilesResponse;
            try {
              taskFilesResponse = await this.$axios.$get(
                `/non-project/tasks/personal/${this.task.taskId}/files`,
                {
                  headers: {
                    user: this.userId
                  }
                }
              );
              console.log("files--->", taskFilesResponse.data);
              this.taskFiles = taskFilesResponse.data;
            } catch (error) {
              console.log("Error fetching data", error);
            }
          } catch (error) {
            console.log("Error fetching data", error);
          }
        })
        .catch(e => {
          console.log("error", e);
        });
    },
    async addPersonalTask() {
      console.log("add personal task");
      let response;
      try {
        response = await this.$axios.$post(`/non-project/tasks/personal`, {
          taskName: this.personalTask,
          taskAssignee: this.userId,
          taskDueDate: null,
          taskRemindOnDate: null
        });
        this.personalTask = "";
        console.log(response);
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 2000);
      } catch (e) {
        console.log("Error adding a subTask", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 2000);
      }
    },
    getTaskDueDate(date) {
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
      personalTasks: state => state.personalTasks.personalTasks
    })
  }
};
</script>

<style scoped>
.tabs {
  padding-left: 10px;
  box-shadow: none !important;
}
.wrapper {
  width: 100%;
}
</style>