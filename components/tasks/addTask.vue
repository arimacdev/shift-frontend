<template>
  <div>
    <div class="taskFormDiv overflow-y-auto">
      <!-- <div class="taskAddTitle">
        New task -
        <span>#{{ this.projectAllTasks.length + 1 }}</span>
      </div>-->
      <form @submit.prevent="handleSubmit">
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="12">
            <v-text-field
              label="Task name*"
              outlined
              class="createFormElements"
              v-model.trim="$v.taskName.$model"
              background-color="#EDF0F5"
            ></v-text-field>
            <div
              v-if="$v.taskName.$error && !$v.taskName.required"
              class="errorText"
            >Task name is required</div>
            <div
              v-if="$v.taskName.$error && !$v.taskName.maxLength"
              class="errorText"
            >Cannot use more than 100 characters</div>
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="12">
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-model="addTaskAssignee"
              :items="states"
              item-text="name"
              item-value="id.assigneeId"
              label="Task assignee"
              background-color="#EDF0F5"
              outlined
              class="createFormElements"
              @mousedown="querySelections"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="12">
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-model="parentTask"
              :items="parentTasks"
              item-text="name"
              item-value="id"
              label="Parent task"
              outlined
              background-color="#EDF0F5"
              class="createFormElements"
              @mousedown="getParentTasks"
              @change="getSprint"
              clearable
            >
              <template v-slot:selection="data">
                <template>
                  <v-list-item-action>
                    <v-list-item-subtitle v-html="data.item.secondaryId"></v-list-item-subtitle>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
              <template v-slot:item="data">
                <template>
                  <v-list-item-content>
                    <v-list-item-subtitle v-html="data.item.secondaryId"></v-list-item-subtitle>

                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow groupFormRow" no-gutters>
          <v-col sm="4" md="4">
            <v-select
              v-model="taskType"
              :items="items"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task type"
              outlined
              :menu-props="{ maxHeight: '500' }"
              class="createFormElements"
              clearable
            ></v-select>
          </v-col>
          <v-col sm="4" md="4">
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'development'"
              v-model="taskStatus"
              :items="development"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'qa'"
              v-model="taskStatus"
              :items="qa"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'design'"
              v-model="taskStatus"
              :items="design"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'bug'"
              v-model="taskStatus"
              :items="bug"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'operational'"
              v-model="taskStatus"
              :items="operational"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'preSales'"
              v-model="taskStatus"
              :items="preSales"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
            <v-select
              :menu-props="{ maxHeight: '500' }"
              v-if="this.taskType == 'general'"
              v-model="taskStatus"
              :items="general"
              background-color="#EDF0F5"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
              clearable
            ></v-select>
          </v-col>
          <v-col sm="4" md="4">
            <v-select
              :disabled="this.parentTask != '' && this.parentTask != undefined"
              :menu-props="{ maxHeight: '500' }"
              v-model="taskBoard"
              :items="sprints"
              item-text="name"
              background-color="#EDF0F5"
              item-value="id"
              label="Sprint"
              outlined
              class="createFormElements"
              clearable
              @mousedown="getSprintDetails"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow groupFormRow" no-gutters>
          <v-col sm="6" md="6">
            <!-- <input  v-model="taskDueDate" placeholder="Due date" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" type="text" class="formElements"> -->
            <div class="pickerContainer taskDatePickerField pickerDiv">
              <VueCtkDateTimePicker
                color="#3f51b5"
                id="due"
                class="dateTimePickerInternal"
                v-model="$v.taskDueDate.$model"
                label="Task due date and time"
                input-size="lg"
                :max-date="this.getMaxDueDate()"
              />
              <div
                v-if="$v.taskDueDate.$error && !$v.taskDueDate.dateCheck"
                class="errorText errorDiv"
              >Task due date cannot be past date</div>
            </div>
          </v-col>
          <v-col sm="6" md="6">
            <!-- <input v-model="taskRemindOnDate"  type="text" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Reminder" class="formElements"> -->
            <div class="pickerContainer taskDatePickerField pickerDiv">
              <VueCtkDateTimePicker
                color="#3f51b5"
                id="reminder"
                class="dateTimePickerInternal"
                v-model="$v.taskRemindOnDate.$model"
                label="Reminder"
                input-size="lg"
                :max-date="this.getMaxDueDate()"
              />
              <div
                v-if="
                  $v.taskRemindOnDate.$error && !$v.taskRemindOnDate.dateCheck
                "
                class="errorText errorDiv"
              >Reminder date should be before due date</div>
            </div>
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="12">
            <!-- <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Drop files to attach, or browse" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload fileUploadField"/> -->

            <v-file-input
              label="Attachments"
              v-model="files"
              outlined
              prepend-inner-icon="mdi-paperclip"
              prepend-icon
              class="createFormElements"
              background-color="#EDF0F5"
              chips
              show-size
              multiple
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow groupFormRow" no-gutters>
          <v-col sm="12" md="12" class>
            <!-- <textarea v-model="taskNotes" placeholder="Note" class="formElements textArea"></textarea> -->
            <v-textarea
              v-model.trim="$v.taskNotes.$model"
              outlined
              class="textArea"
              label="Notes"
              height="200px"
              background-color="#EDF0F5"
            ></v-textarea>
            <div
              v-if="$v.taskNotes.$error && !$v.taskNotes.maxLength"
              class="errorText"
            >Cannot use more than 500 characters</div>
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow groupFormRow" no-gutters>
          <v-col sm="12" md="6" class></v-col>
          <v-col sm="12" md="6" class="buttonGrid">
            <button :class="addTaskStyling" @click="addTask" :disabled="checkValidation">
              <v-list-item dark>
                <v-list-item-action>
                  <v-icon size="20" color>mdi-calendar-blank-multiple</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Create task</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-list-item-action>
              </v-list-item>
            </button>
          </v-col>
        </v-row>
      </form>
    </div>
    <v-overlay :value="overlay">
      <progress-loading />
    </v-overlay>

    <div @click="close" class="taskAddPopupPlacements">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
    </div>
    <!-- <success-popup /> -->
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import { mapState } from "vuex";

import Progress from "~/components/popups/progress";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";

import axios from "axios";
export default {
  props: ["projectUsers", "AllTasks"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,

    "progress-loading": Progress
  },

  data() {
    return {
      overlay: false,
      projectId: "",
      selectedSprint: "",
      errorMessage: "",
      successMessage: "",
      userId: this.$store.state.user.userId,
      files: [],
      file: "",
      taskType: "general",
      task: {
        taskName: "",
        taskAssignee: "",
        taskStatus: "",
        taskDueDate: "",
        taskRemindOnDate: "",
        taskNotes: ""
      },
      taskBoard: "",
      component: "",
      issueType: "general",
      taskAssignee: "",
      taskStatus: "pending",
      taskName: "",
      data: "",
      taskDueDate: new Date(),
      taskRemindOnDate: new Date(),
      states: [],
      sprints: [],
      parentTasks: [],
      parentTask: "",
      search: null,
      items: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" }
      ],
      development: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Completed", id: "completed" },
        { name: "Implementing", id: "implementing" },
        { name: "Deployed", id: "deployed" },
        { name: "Closed", id: "closed" }
      ],
      qa: [
        { name: "Pending", id: "pending" },
        { name: "Testing", id: "testing" },
        { name: "Review", id: "review" },
        { name: "Closed", id: "closed" }
      ],
      design: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Cancel", id: "cancel" },
        { name: "Fixing", id: "fixing" },
        { name: "Resolved", id: "resolved" },
        { name: "In progress", id: "inprogress" },
        { name: "Completed", id: "completed" },
        { name: "Under review", id: "underReview" },
        { name: "Weiting for approval", id: "waitingForApproval" },
        { name: "Review", id: "review" },
        { name: "Waiting response", id: "waitingResponse" },
        { name: "Rejected", id: "rejected" },
        { name: "Closed", id: "closed" }
      ],
      bug: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Cancel", id: "cancel" },
        { name: "Reopened", id: "reOpened" },
        { name: "Fixing", id: "fixing" },
        { name: "Testing", id: "testing" },
        { name: "Resolved", id: "resolved" },
        { name: "Under review", id: "underReview" },
        { name: "Review", id: "review" },
        { name: "Waiting response", id: "waitingResponse" },
        { name: "Closed", id: "closed" }
      ],
      operational: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Cancel", id: "cancel" },
        { name: "Resolved", id: "resolved" },
        { name: "In progress", id: "inprogress" },
        { name: "Completed", id: "completed" },
        { name: "Under review", id: "underReview" },
        { name: "Weiting for approval", id: "waitingForApproval" },
        { name: "Discussion", id: "discussion" },
        { name: "Waiting response", id: "waitingResponse" },
        { name: "Ready", id: "ready" },
        { name: "Rejected", id: "rejected" },
        { name: "Closed", id: "closed" }
      ],
      preSales: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Cancel", id: "cancel" },
        { name: "Resolved", id: "resolved" },
        { name: "In progress", id: "inprogress" },
        { name: "Under review", id: "underReview" },
        { name: "Weiting for approval", id: "waitingForApproval" },
        { name: "Discussion", id: "discussion" },
        { name: "Waiting response", id: "waitingResponse" },
        { name: "Rejected", id: "rejected" },
        { name: "Closed", id: "closed" }
      ],
      general: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Cancel", id: "cancel" },
        { name: "In progress", id: "inprogress" },
        { name: "Completed", id: "completed" },
        { name: "Closed", id: "closed" }
      ]
    };
  },
  validations: {
    taskName: {
      required,
      maxLength: maxLength(100)
    },
    taskDueDate: {
      dateCheck() {
        const dueDate = new Date(this.taskDueDate);
        if (this.taskDueDate == null) {
          return true;
        } else {
          const dueToUtc = new Date(
            dueDate.toLocaleString("en-US", { timeZone: "UTC" })
          );
          const dueToUtcDate = new Date(dueToUtc);
          const now = new Date();
          // console.log(
          //   "now",
          //   now.getTime(),
          //   "DueTime",
          //   dueToUtcDate.getTime() + 350000000
          // );
          if (now.getTime() >= dueToUtcDate.getTime() + 35000000) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    taskNotes: {
      maxLength: maxLength(500)
    },
    taskRemindOnDate: {
      dateCheck() {
        const taskRemindOnDate = new Date(this.taskRemindOnDate);
        if (this.taskRemindOnDate == null) {
          return true;
        } else {
          const endToUtc = new Date(
            taskRemindOnDate.toLocaleString("en-US", { timeZone: "UTC" })
          );
          const endToUtcDate = new Date(endToUtc);
          const taskDueDate = new Date(this.taskDueDate);
          // console.log(
          //   "start",
          //   taskDueDate.getTime(),
          //   "end",
          //   endToUtcDate.getTime() + 35000000
          // );
          if (taskDueDate.getTime() <= endToUtcDate.getTime()) {
            // console.log("overdue");
            return false;
          } else {
            return true;
          }
        }
      }
    }
  },
  methods: {
    async getSprint() {
      let sprintResponse;
      if (this.parentTask != "" && this.parentTask != undefined) {
        try {
          sprintResponse = await this.$axios.$get(
            `/projects/${this.projectId}/tasks/${this.parentTask}`,
            {
              headers: {
                user: this.userId
              }
            }
          );
          console.log("sprint--->", sprintResponse.data);
          this.taskBoard = sprintResponse.data.sprintId;
        } catch (error) {
          console.log("Error fetching data", error);
        }
      } else {
        this.taskBoard = "";
      }
    },
    getMaxDueDate() {
      let stringDate = this.fetchProject.projectEndDate + "";
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10) + " " + "23:59";
      // console.log("max date : " + stringDate);
      return stringDate;
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
    getSprintDetails(v) {
      // console.log("board list", this.projectSprints);
      this.sprints = [];
      let sprintSearchList = this.projectSprints;
      for (let index = 0; index < sprintSearchList.length; ++index) {
        let sprint = sprintSearchList[index];
        this.sprints.push({
          name: sprint.sprintName,
          id: sprint.sprintId
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    getParentTasks(v) {
      // console.log("parent task list", this.projectAllTasks);
      this.parentTasks = [];
      let parentSearchList = this.projectAllTasks;
      this.parentTasks.push({
        name: "",
        id: "",
        secondaryId: "No parent"
      });
      for (let index = 0; index < parentSearchList.length; ++index) {
        let parent = parentSearchList[index];
        this.parentTasks.push({
          name: parent.parentTask.taskName,
          id: parent.parentTask.taskId,
          secondaryId: parent.parentTask.secondaryTaskId
        });
      }

      // console.log("nameList", this.states);
      this.loading = true;
    },
    getDueDate() {
      if (this.taskDueDate == null) {
        return null;
      } else {
        const startDate = new Date(this.taskDueDate);
        const isoDate = new Date(
          startDate.getTime() - startDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso due date", isoDate);
        return isoDate;
      }
    },
    getRemindOnDate() {
      if (this.taskRemindOnDate == null) {
        return null;
      } else {
        const endDate = new Date(this.taskRemindOnDate);
        const isoDate = new Date(
          endDate.getTime() - endDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso remond on date", isoDate);
        return isoDate;
      }
    },
    submit() {
      this.$v.$touch();
    },
    handleFileUploads(e) {
      this.file = this.$refs.files.files[0];
    },
    close() {
      this.component = "";
    },

    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
    async addTask() {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: this.taskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.taskAssignee,
            taskDueDate: this.getDueDate(),
            taskRemindOnDate: this.getRemindOnDate(),
            taskStatus: this.taskStatus,
            taskNotes: this.taskNotes,
            issueType: this.taskType,
            parentTaskId: this.parentTask,
            sprintId: this.taskBoard
          }
        );
        this.component = "success-popup";
        this.successMessage = "Task added successfully";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Task adding successful", response);

        let taskId = response.data.taskId;
        if (this.files != null) {
          // console.log("files ------>" + this.files);
          for (let index = 0; index < this.files.length; ++index) {
            let formData = new FormData();
            formData.append("files", this.files[index]);
            formData.append("type", "profileImage");

            this.$axios
              .$post(
                `/projects/${this.projectId}/tasks/${taskId}/upload`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    user: this.userId
                  }
                }
              )
              .then(function(res) {
                console.log("File upload successful");
              })
              .catch(function() {
                console.log("File Upload Failed");
              });
          }
          this.overlay = false;
        }
        this.files = null;
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
        this.$v.$reset();
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    }
  },
  async created() {
    this.projectId = this.$route.params.projects;
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      // projectId: state => state.project.project.projectId,
      people: state => state.task.userCompletionTasks,
      projectAllTasks: state => state.task.allTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      fetchProject: state => state.project.project
    }),
    checkValidation: {
      get() {
        if (this.$v.$invalid == true) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        this.taskName = value;
      }
    },
    addTaskAssignee: {
      get() {
        // console.log("Task assignee -->!", this.taskAssignee);
        return this.taskAssignee;
      },
      set(value) {
        this.taskAssignee = value;
      }
    },
    addTaskStyling: {
      get() {
        if (this.$v.$invalid == true) {
          return "addTaskButtonFail";
        } else {
          return "addTaskButtonSuccess";
        }
      }
    }
  }
};
</script>
