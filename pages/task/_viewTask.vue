<template>
  <div class="top-nav">
    <navigation-drawer :user="user" :currentUser="currentUser" />
    <v-toolbar app color dark fixed class="tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Task</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="user_org_role === 'SUPER_ADMIN'">
              <button v-on:click="component = 'add-project'">
                <v-icon @click="createNewProject">mdi-plus-circle</v-icon>
              </button>
            </v-list-item-icon>
            <v-list-item-icon v-else>
              <!-- <button v-on:click="component='add-project'"><v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon></button> -->
            </v-list-item-icon>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
        <div class="content-div">
          <v-list-item-title class="font-weight-bold">{{this.taskId}}</v-list-item-title>
        </div>
      </div>
    </v-toolbar>
    <div class="viewTaskContent">
      <div class="taskRestFormDiv">
        <form>
          <v-row class="mb-12 formRow" no-gutters>
            <v-col sm="2" md="2">
              <div class="taskViewTitle">
                Task -
                <span>#42</span>
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <v-select
                label="Task status"
                dense
                dark
                background-color="#0BAFFF"
                solo
                class="adasddad"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mb-12 formRow" no-gutters>
            <v-col sm="12" md="12">
              <v-text-field
                label="Task name*"
                outlined
                class="createFormElements"
                background-color="#EDF0F5"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mb-12 formRow" no-gutters>
            <v-col sm="12" md="12">
              <v-select
                v-model="addTaskAssignee"
                :items="states"
                item-text="name"
                item-value="id.assigneeId"
                label="Task assignee"
                background-color="#EDF0F5"
                outlined
                class="createFormElements"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mb-12 formRow" no-gutters>
            <v-col sm="12" md="12">
              <v-select
                v-model="addTaskAssignee"
                :items="states"
                item-text="name"
                item-value="id.assigneeId"
                label="Parent task"
                outlined
                background-color="#EDF0F5"
                class="createFormElements"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mb-12 formRow groupFormRow" no-gutters>
            <v-col sm="4" md="4">
              <v-select
                v-model="addTaskAssignee"
                :items="states"
                item-text="name"
                item-value="id.assigneeId"
                label="Task type"
                background-color="#EDF0F5"
                outlined
                class="createFormElements"
              ></v-select>
            </v-col>
            <v-col sm="4" md="4">
              <v-select
                v-model="taskStatus"
                :items="items"
                background-color="#EDF0F5"
                item-text="name"
                item-value="id"
                label="Task status"
                outlined
                class="createFormElements"
              ></v-select>
            </v-col>
            <v-col sm="4" md="4">
              <v-select
                v-model="taskStatus"
                :items="items"
                item-text="name"
                background-color="#EDF0F5"
                item-value="id"
                label="Board"
                outlined
                class="createFormElements"
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
                  label="Task due date and time"
                  input-size="lg"
                />
                <!-- <div
                v-if="$v.taskDueDate.$error && !$v.taskDueDate.dateCheck"
                class="errorText errorDiv"
                >Task due date cannot be past date</div>-->
              </div>
            </v-col>
            <v-col sm="6" md="6">
              <!-- <input v-model="taskRemindOnDate"  type="text" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Reminder" class="formElements"> -->
              <div class="pickerContainer taskDatePickerField pickerDiv">
                <VueCtkDateTimePicker
                  color="#3f51b5"
                  id="reminder"
                  class="dateTimePickerInternal"
                  label="Reminder"
                  input-size="lg"
                />
                <!-- <div
                v-if="$v.taskRemindOnDate.$error && !$v.taskRemindOnDate.dateCheck"
                class="errorText errorDiv"
                >Reminder date should be before due date</div>-->
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
                outlined
                class="textArea"
                label="Notes"
                height="200px"
                background-color="#EDF0F5"
              ></v-textarea>
              <!-- <div
              v-if="$v.taskNotes.$error && !$v.taskNotes.maxLength"
              class="errorText"
              >Cannot use more than 500 characters</div>-->
            </v-col>
          </v-row>
        </form>
      </div>
    </div>

    <div class="RestTaskLogDiv">
      <div class="RestTaskLogTitle">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">Task Log</v-list-item-title>
        </v-list-item-content>
      </div>
    </div>
  </div>
</template>



<script>
import NavigationDrawer from "~/components/navigationDrawer";
export default {
  components: {
    NavigationDrawer
  },
  data: {
    taskId: "",
    projectId: ""
  },
  created() {
    this.taskId = this.$route.params.viewTask;
    this.projectId = this.$route.query.project;
  }
};
</script>