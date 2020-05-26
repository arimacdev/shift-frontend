<template>
  <v-card width="100vw">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="taskDialogClosing()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        {{
        this.selectedTask.taskName
        }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items></v-toolbar-items>
    </v-toolbar>
    <div class="viewDialogTaskContent overflow-y-auto">
      <div class="taskDialogFormDiv">
        <form>
          <v-row class="mb-12 formRowSpec" no-gutters>
            <v-col sm="2" md="2">
              <div class="taskViewTitle">
                Task -
                <span class="secondaryId">#{{this.selectedTask.secondaryTaskId}}</span>
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <div
                class="taskStatusDropdown"
              >{{this.selectedTask.taskStatus.charAt(0).toUpperCase()+ this.selectedTask.taskStatus.slice(1)}}</div>
            </v-col>
          </v-row>
          <v-row class="mb-12" no-gutters>
            <v-col sm="12" md="12" class="formRowNameRange">
              <v-row class="mb-12" no-gutters>
                <v-col>
                  <div class="viewTaskTitle">{{this.selectedTask.taskName}}</div>
                </v-col>
              </v-row>
              <v-divider class="nameRangeDevider"></v-divider>
            </v-col>
          </v-row>
          <!-- --------------- body row ------------ -->
          <div class="formRowTaskDetailsBody">
            <v-row class="mb-12" no-gutters>
              <v-col sm="8" md="8">
                <div class="leftSideColumn">
                  <!-- -------------- task type section ------------- -->
                  <v-row>
                    <v-col md="6">
                      <div class="expansionViewHeader">
                        <v-list-item class="taskViewTitleSection">
                          <v-list-item-icon>
                            <v-icon size="30" color="#0BAFFF">mdi-checkbox-multiple-blank-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title class="viewTaskFontColors">Task Type</v-list-item-title>
                        </v-list-item>
                        <v-list-item-content class="parentChildTaskList">
                          <!-- ---------- task list --------- -->
                          <div class="taskViewTaskListPadding">
                            <v-row class="mb-12" no-gutters>
                              <v-col>
                                <div
                                  class="statusSpan"
                                >{{this.selectedTask.taskStatus.charAt(0).toUpperCase()+ this.selectedTask.taskStatus.slice(1)}}</div>
                              </v-col>
                            </v-row>
                          </div>
                          <!-- --------------- -->
                        </v-list-item-content>
                      </div>
                    </v-col>
                    <v-col md="6">
                      <div class="expansionViewHeader">
                        <v-list-item class="taskViewTitleSection">
                          <v-list-item-icon>
                            <v-icon size="30" color="#0BAFFF">mdi-checkbox-multiple-blank-outline</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title class="viewTaskFontColors">Task Status</v-list-item-title>
                        </v-list-item>
                        <v-list-item-content class="parentChildTaskList">
                          <!-- ---------- task list --------- -->
                          <div class="taskViewTaskListPadding">
                            <v-row class="mb-12" no-gutters>
                              <v-col>
                                <div
                                  class="statusSpan"
                                >{{this.selectedTask.issueType.charAt(0).toUpperCase()+ this.selectedTask.issueType.slice(1)}}</div>
                              </v-col>
                            </v-row>
                          </div>
                          <!-- --------------- -->
                        </v-list-item-content>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>

                  <!-- -------------- task sprint section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#6FCD17">mdi-animation-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Board</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="6" md="6">
                            <div class="statusSpan">{{this.taskSprint}}</div>
                          </v-col>
                        </v-row>
                      </div>
                      <!-- --------------- -->
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>

                  <!-- -------------- notes section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#FF6767">mdi-file-document-edit-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Notes</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="subItem noteSubItem">
                          <v-textarea
                            disabled
                            name="input-7-4"
                            auto-grow
                            clearable
                            outlined
                            v-model="this.selectedTask.taskNote"
                          ></v-textarea>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-col>
              <!-- ------------------ right side column ------------- -->
              <v-col sm="4" md="4">
                <div class="rightSideColumn">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#02C1D4">mdi-account-arrow-left-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Task Assignee</v-list-item-subtitle>
                      <v-list-item-title>{{this.taskUser.firstName}} {{this.taskUser.lastName}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- ----------- Due date section --------- -->

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#7CDD00">mdi-calendar-blank-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Task Due Date</v-list-item-subtitle>
                      <v-list-item-title>
                        {{
                        getProjectDisplayDates(
                        this.selectedTask.taskDueDateAt
                        )
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- ----------- Reminder date section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#7CDD00">mdi-clock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Task Remind Date</v-list-item-subtitle>

                      <v-list-item-title>
                        {{
                        getProjectDisplayDates(
                        this.selectedTask.taskReminderAt
                        )
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider class="datePickerDivider"></v-divider>
                  <!-- ----------- Files section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#FFAE4F">mdi-paperclip</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="rightColumnItemsTitle">Files</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- ------------- file viewer ------------ -->
                  <div class="filesViewDiv" v-for="(file, index) in this.taskFiles" :key="index">
                    <v-list-item>
                      <div>
                        <v-icon size="30">mdi-file-document-outline</v-icon>
                      </div>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">
                          <a
                            style="text-decoration: none;"
                            :href="file.taskFileUrl"
                            target="_blank"
                          >
                            {{
                            file.taskFileName
                            }}
                          </a>
                        </v-list-item-title>
                        <v-list-item-subtitle class="fileSubTitles">
                          {{
                          file.taskFileSize/1000
                          }}KB
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">
                          {{
                          file.firstName
                          }}
                          {{
                          file.lastName
                          }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="fileSubTitles">
                          {{
                          getProjectDates(file.taskFileDate)
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <div>
                        <a style="text-decoration: none;" :href="file.taskFileUrl" target="_blank">
                          <v-icon size="25" color="#0BAFFF">mdi-cloud-download</v-icon>
                        </a>
                      </div>
                      <!-- <div>
                        <v-icon
                          @click="handleFileDelete(file.taskFileId)"
                          size="25"
                          color="#FF6161"
                        >mdi-delete-circle</v-icon>
                      </div>-->
                    </v-list-item>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </form>
      </div>
    </div>
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

    <!-- <div class="RestTaskLogDiv">
      <div class="RestTaskLogTitle">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">Task Log</v-list-item-title>
        </v-list-item-content>
      </div>
    </div>-->
    <div @click="close" class="taskPopupPopups">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import AddParentTask from "~/components/tasks/addParentTask";
import AddChildTask from "~/components/tasks/addChildTask";

export default {
  props: ["selectedTask", "taskFiles", "taskSprint", "taskUser"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "add-parent-task": AddParentTask,
    "add-child-task": AddChildTask
  },
  data() {
    return {
      taskId: "",
      projectId: "",
      taskDeleteDialog: false,
      userId: this.$store.state.user.userId,
      sprints: [],
      editTask: true,
      task: {},
      files: [],
      taskObject: {},
      updatedIssue: "",
      updatedStatus: "",
      issueTypes: "",
      component: "",
      errorMessage: "",
      successMessage: "",
      updatedTaskDueDate: null,
      updatedRemindOnDate: null,
      uploadLoading: false,
      taskAssignee: "",
      updatedTask: {
        taskName: "",
        taskAssignee: "",
        taskNotes: "",
        // taskStatus: "",
        taskRemindOnDate: "",
        taskDueDateAt: ""
      },

      status: [
        { name: "Open", id: "open" },
        { name: "Closed", id: "closed" }
      ]
    };
  },
  methods: {
    getProjectDisplayDates(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();
      // console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "Add Task Date";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(12, 16);
        return stringDate;
      }
    },
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/non-project/tasks/personal/${this.selectedTask.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        this.$emit("shrinkSideBar");
        // console.log(response.data);
        this.taskDialogClosing();
      } catch (e) {
        console.log("Error deleting task", e);

        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 2000);
      }
    },
    taskDialogClosing() {
      this.$emit("taskDialogClosing");
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    async updateTaskStatus() {
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/non-project/tasks/personal/${this.selectedTask.taskId}`,
          {
            taskStatus: this.updatedStatus
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    async updateTaskName() {
      console.log("updatedTaskName ->", this.updatedTask.taskName);
      let response;
      try {
        response = await this.$axios.$put(
          `/non-project/tasks/personal/${this.selectedTask.taskId}`,
          {
            taskName: this.updatedTask.taskName
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Name successfully updated";
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        setTimeout(() => {
          this.close();
        }, 3000);
        this.editTask = true;
        // console.log("edit task response", response);
      } catch (e) {
        console.log("Error updating the name", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.editTask = true;
      }
    },

    // ---------- update task note -----------
    async updateTaskNote() {
      console.log("updatedTaskValue ->", this.updatedTask.taskNote);
      let response;

      try {
        response = await this.$axios.$put(
          `/non-project/tasks/personal/${this.selectedTask.taskId}`,
          {
            taskNotes: this.updatedTask.taskNote
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Note successfully updated";
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("edit task response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a note", e);
      }
    },
    // ----------- update task dates -----------
    async updateTaskDates(type) {
      let dueDate;
      let remindDate;
      let changedDate = {};
      if (type === "dueDate" && this.updatedTask.taskDueDateAt != "") {
        // console.log("inside due date");
        dueDate = new Date(this.updatedTask.taskDueDateAt);
        const isoDate = new Date(
          dueDate.getTime() - dueDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso edit due date", isoDate);
        dueDate = isoDate;
        changedDate = {
          taskDueDate: dueDate
        };
        remindDate = this.updatedTask.taskRemindOnDate;
        this.$store.dispatch("personalTasks/updateProjectDates", {
          type: "dueDate",
          date: dueDate
        });
      } else if (this.updatedTask.taskRemindOnDate != "") {
        // console.log("inside remind on date");
        remindDate = new Date(this.updatedTask.taskRemindOnDate);
        const isoDate = new Date(
          remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso edit remind date", isoDate);
        dueDate = this.updatedTask.taskDueDateAt;
        remindDate = isoDate;
        changedDate = {
          taskRemindOnDate: remindDate
        };
        this.$store.dispatch("personalTasks/updateProjectDates", {
          type: "remindDate",
          date: remindDate
        });
      }
      // console.log("dueDate", dueDate);
      // console.log("remindDate", remindDate);
      let response;
      try {
        response = await this.$axios.$put(
          `/non-project/tasks/personal/${this.selectedTask.taskId}`,
          changedDate,
          {
            headers: {
              user: this.userId
            }
          }
        );
        //remove
        this.$store.dispatch("personalTasks/fetchAllPersonalTasks");
        this.component = "success-popup";
        this.successMessage = "Date successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task dates response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    // --------- upload task files ----------

    async taskFileUpload() {
      if (this.files != null) {
        for (let index = 0; index < this.files.length; ++index) {
          this.uploadLoading = true;
          let formData = new FormData();
          formData.append("files", this.files[index]);
          formData.append("type", "profileImage");
          formData.append("taskType", "project");
          let fileResponse;
          try {
            fileResponse = await this.$axios.$post(
              `/personal/tasks/${this.selectedTask.taskId}/upload`,
              formData,
              {
                headers: {
                  user: this.userId
                }
              }
            );
            this.$store.dispatch(
              "personalTasks/addPersonalTaskFile",
              fileResponse.data
            );
            this.uploadLoading = false;
            this.component = "success-popup";
            this.successMessage = "File(s) successfully uploaded";
            setTimeout(() => {
              this.close();
            }, 3000);
            // console.log("file response", this.taskFiles);
          } catch (e) {
            console.log("Error adding group file", e);
            this.errorMessage = e.response.data;
            this.component = "error-popup";
            setTimeout(() => {
              this.close();
            }, 3000);
            this.uploadLoading = false;
          }
        }
      }
      this.files = null;
    },
    // ------------ file remove ---------
    async handleFileDelete(taskFileId) {
      let response;
      try {
        response = await this.$axios.$delete(
          `/non-project/tasks/personal/${this.selectedTask.taskId}/files/${taskFileId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        // console.log(response.data);
        this.$store.dispatch("personalTasks/removeTaskFile", taskFileId);
        this.component = "success-popup";
        this.successMessage = "File successfully deleted";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error deleting task", e);
      }
    },
    // ------- popup close ----------
    close() {
      this.component = "";
    },
    // ------ listen change ------
    // listenChange() {
    //   this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
    // },
    click() {
      // console.log("select =========>" + this.taskDueDate);
      // this.issueType = issueType;
    },
    dueDateCheck(task) {
      // console.log("check due date color", task);
      if (task.selectedTask.taskStatus === "closed") {
        return "workLoadTaskDone";
      } else if (task.taskDueDateAt == null) {
        return "workLoadTaskDefault";
      } else {
        const dueDate = new Date(task.selectedTask.taskDueDateAt);
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
    },

    isTaskAssignee(taskAssignee) {
      if (taskAssignee.assigneeId == this.selectedTask.taskAssignee) {
        return true;
      } else {
        return false;
      }
    },
    statusCheck() {
      return "pendingStatus";
    },
    EditTaskName() {
      this.editTask = false;
    }
  },
  computed: {
    ...mapState({
      //   people: state => state.task.userCompletionTasks,
      //   projectSprints: state => state.sprints.sprint.sprints,
      //   projectAllTasks: state => state.task.allTasks,
      //   projectId: state => state.project.project.projectId,
      //   selectedTask: state => state.personalTasks.selectedTask,
      //   taskFiles: state => state.personalTasks.personalTaskFiles
    }),
    ...mapGetters(["getuserCompletionTasks"]),

    taskName: {
      get() {
        if (this.updatedTask.taskName == "") {
          return this.selectedTask.taskName;
        } else return this.updatedTask.taskName;
      },
      set(name) {
        this.updatedTask.taskName = name;
      }
    },
    // taskStatus: {
    //   get() {
    //     return this.selectedTask.taskStatus;
    //   },
    //   set(value) {
    //     // console.log("task status", value);
    //     this.updatedStatus = value;
    //   }
    // },

    // taskNote: {
    //   get() {
    //     return this.selectedTask.taskNote;
    //   },
    //   set(value) {
    //     this.updatedTask.taskNote = value;
    //   }
    // },

    taskDue: {
      get() {
        if (
          this.selectedTask.taskDueDateAt === null ||
          this.selectedTask.taskDueDateAt === "1970-01-01T05:30:00.000+0000"
        )
          return null;
        let stringDate = this.selectedTask.taskDueDateAt + " ";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 16);
        return stringDate;
      },
      set(value) {
        // console.log("updated task due ->", value);
        this.updatedTask.taskDueDateAt = value;
      }
    },
    taskRemindOn: {
      get() {
        if (
          this.selectedTask.taskReminderAt === null ||
          this.selectedTask.taskDueDateAt === "1970-01-01T05:30:00.000+0000"
        )
          return "Add Reminder Date";
        let stringDate = this.selectedTask.taskReminderAt + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 16);
        return stringDate;
      },
      set(value) {
        // console.log("updated selectedTask reminder ->", value);
        this.updatedTask.taskRemindOnDate = value;
      }
    }
  }
};
</script>
