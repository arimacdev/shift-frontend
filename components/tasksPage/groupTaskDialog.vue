<template>
  <v-card width="100vw">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="closeTaskDialog()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        {{
        taskName
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
    <div class="viewDialogTaskContent overflow-y-auto">
      <div class="taskDialogFormDiv">
        <form>
          <v-row class="mb-12 formRowSpec" no-gutters>
            <v-col sm="2" md="2"></v-col>
            <v-col sm="2" md="2">
              <!-- <v-select label="Task status" dense dark background-color="#0BAFFF" solo></v-select> -->
              <div class="taskStatusDropdown">{{taskStatus}}</div>

              <!-- {{task.taskStatus.charAt(0).toUpperCase()+ task.taskStatus.slice(1)}} -->
            </v-col>
          </v-row>
          <v-row class="mb-12" no-gutters>
            <v-col sm="12" md="12" class="formRowNameRange">
              <v-row class="mb-12" no-gutters>
                <v-col sm="11" md="11">
                  <input
                    type="text"
                    class="viewTaskTitle"
                    v-model="taskName"
                    v-if="editTask == true"
                    :disabled="editTask"
                  />
                  <input
                    maxlength="100"
                    type="text"
                    class="viewTaskTitleEdit"
                    v-model="taskName"
                    v-if="editTask == false"
                    :disabled="editTask"
                    @keyup.enter="updateTaskName"
                  />
                </v-col>
                <v-col sm="1" md="1" class="taskEditIconCol">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        v-on="on"
                        size="25"
                        color="#424F64"
                        class="editIcon"
                        @click="EditTaskName"
                      >mdi-pencil-circle</v-icon>
                    </template>
                    <span>Edit task name</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-divider class="nameRangeDevider"></v-divider>
            </v-col>
          </v-row>
          <!-- {{this.taskFiles}} -->
          <!-- {{taskObject}} -->
          <!-- --------------- body row ------------ -->
          <div class="formRowTaskDetailsBody">
            <v-row class="mb-12" no-gutters>
              <v-col sm="8" md="8">
                <div class="leftSideColumn">
                  <v-row class="addParentButtonRow" no-gutters>
                    <v-col sm="6" md="6" no-gutters></v-col>
                    <v-col sm="3" md="3" no-gutters>
                      <add-parent-task
                        v-if="taskObject.childTasks.length == 0 && selectedTaskGroupTask.isParent == true"
                        :taskId="this.task.taskId"
                        :groupId="this.task.taskGroupId"
                      />
                    </v-col>
                    <v-col sm="3" md="3" no-gutters>
                      <add-child-task
                        :groupId="this.task.taskGroupId"
                        :taskId="this.task.taskId"
                        v-if=" task.isParent == true"
                      />
                    </v-col>
                  </v-row>
                  <!-- ----------- parent task section --------- -->
                  <div v-if="selectedTaskGroupTask.isParent == false">
                    <div class="expansionViewHeader topItemTaskView">
                      <v-list-item class="taskViewTitleSection">
                        <v-list-item-icon>
                          <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="viewTaskFontColors">Parent Task</v-list-item-title>
                      </v-list-item>
                      <v-list-item-content class="parentChildTaskList">
                        <!-- ---------- task list --------- -->
                        <div class="taskViewTaskListContent">
                          <v-list-item>
                            <v-list-item-action>
                              <v-icon
                                v-if="
                                  parent.taskStatus == 'closed'
                                "
                                size="25"
                                color="#2EC973"
                              >mdi-checkbox-marked-circle</v-icon>
                              <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{
                                parent.taskName
                                }}
                              </v-list-item-title>
                            </v-list-item-content>
                            <div>
                              <v-list-item-action>
                                <v-list-item-sub-title :class="dueDateCheck(parent)">
                                  {{
                                  getProjectDates(
                                  parent.taskDueDateAt
                                  )
                                  }}
                                </v-list-item-sub-title>
                              </v-list-item-action>
                            </div>
                            <div>
                              <v-list-item-avatar size="25">
                                <v-img
                                  v-if="
                                    parent
                                      .taskAssigneeProfileImage != null
                                  "
                                  :src="
                                    parent
                                      .taskAssigneeProfileImage
                                  "
                                ></v-img>
                                <v-img
                                  v-else
                                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                                ></v-img>
                              </v-list-item-avatar>
                            </div>
                            <div class="boardTabLinkIcon">
                              <!-- <nuxt-link
                                :to="
                                  '/task/' +
                                    taskObject.parentTask.taskId +
                                    '/?project=' +
                                    projectId
                                "
                                style="text-decoration: none;"
                                target="_blank"
                              >
                                <v-icon size="20" color="blue">mdi-link-variant</v-icon>
                              </nuxt-link>-->
                            </div>
                          </v-list-item>
                        </div>
                        <!-- --------------- -->
                      </v-list-item-content>
                    </div>
                    <v-divider></v-divider>
                  </div>
                  <!-- -------------- child tasks section ----------- -->
                  <div v-if="selectedTaskGroupTask.isParent == true">
                    <div class="expansionViewHeader">
                      <v-list-group>
                        <template v-slot:activator>
                          <v-list-item-icon>
                            <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title class="viewTaskFontColors">
                            Child Tasks
                            <span>- {{ children.length }} Task(s)</span>
                          </v-list-item-title>
                        </template>

                        <v-list-item-content class="parentChildTaskList">
                          <!-- ---------- task list --------- -->
                          <div
                            class="taskViewTaskListContent"
                            v-for="(childTask, index) in children"
                            :key="index"
                          >
                            <v-list-item>
                              <v-list-item-action>
                                <v-icon
                                  v-if="childTask.taskStatus == 'closed'"
                                  size="25"
                                  color="#2EC973"
                                >mdi-checkbox-marked-circle</v-icon>
                                <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{
                                  childTask.taskName
                                  }}
                                </v-list-item-title>
                              </v-list-item-content>
                              <div>
                                <v-list-item-action>
                                  <v-list-item-sub-title :class="dueDateCheck(childTask)">
                                    {{
                                    getProjectDates(childTask.taskDueDateAt)
                                    }}
                                  </v-list-item-sub-title>
                                </v-list-item-action>
                              </div>
                              <div>
                                <v-list-item-avatar size="25">
                                  <v-img
                                    v-if="
                                      childTask.taskAssigneeProfileImage != null
                                    "
                                    :src="childTask.taskAssigneeProfileImage"
                                  ></v-img>
                                  <v-img
                                    v-else
                                    src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                                  ></v-img>
                                </v-list-item-avatar>
                              </div>
                              <div class="boardTabLinkIcon">
                                <!-- <nuxt-link
                                  :to="
                                    '/task/' +
                                      childTask.taskId +
                                      '/?project=' +
                                      projectId
                                  "
                                  style="text-decoration: none;"
                                  target="_blank"
                                >
                                  <v-icon size="20" color="blue">mdi-link-variant</v-icon>
                                </nuxt-link>-->
                              </div>
                            </v-list-item>
                          </div>
                          <!-- --------------- -->
                        </v-list-item-content>
                      </v-list-group>
                    </div>
                    <v-divider></v-divider>
                  </div>
                  <!-- -------------- task type section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#0BAFFF">mdi-checkbox-multiple-blank-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Task status</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="6" md="6">
                            <v-select
                              dense
                              v-model="taskStatus"
                              :items="status"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                              @change="updateTaskStatus"
                            ></v-select>
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
                            name="input-7-4"
                            auto-grow
                            clearable
                            outlined
                            v-model="taskNote"
                          ></v-textarea>
                        </v-list-item-title>
                        <div class="noteUpdateButton">
                          <v-btn
                            class="ma-2"
                            small
                            rounded
                            depressed
                            color="#0BAFFF"
                            dark
                            @click="updateTaskNote"
                          >
                            <v-icon left>mdi-pencil</v-icon>Update note
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-col>
              <!-- ------------------ right side column ------------- -->
              <v-col sm="4" md="4">
                <div class="rightSideColumn">
                  <!-- --------- assignee section ---------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#02C1D4">mdi-account-arrow-left-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Task Assignee</v-list-item-subtitle>
                      <v-list-item-title>
                        <select
                          v-model="taskAssignee"
                          @change="changeAssignee"
                          class="rightColumnItemsText"
                        >
                          <!-- <option value disabled>
                            {{this.task.taskAssignee}}
                          </option>-->
                          <option value disabled>
                            {{
                            taskUser
                            }}
                          </option>
                          <option
                            class="tabListItemsText"
                            v-for="(taskAssignee, index) in groupPeople"
                            :key="index"
                            :value="taskAssignee.assigneeId"
                          >
                            {{ taskAssignee.assigneeFirstName }}
                            {{ taskAssignee.assigneeLastName }}
                          </option>
                        </select>
                      </v-list-item-title>
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
                        this.task.taskDueDateAt
                        )
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <datetime
                        hidden
                        type="datetime"
                        v-model="taskDue"
                        zone="local"
                        input-id="dueDate"
                      >
                        <label for="dueDate" slot="before" class="tabListItemsTextDue">
                          <!-- <span class="dialogPickerNewText">Due Date</span> -->
                        </label>
                        <label for="dueDate" slot="after" class>
                          <v-icon>mdi-pencil-plus</v-icon>
                        </label>
                        <template slot="button-cancel">
                          <fa :icon="['far', 'times']"></fa>Cancel
                        </template>
                        <template slot="button-confirm">
                          <fa :icon="['fas', 'check-circle']"></fa>
                          <p @click="clickToPrint">Confirm</p>
                        </template>
                      </datetime>
                    </v-list-item-action>

                    <v-list-item-action>
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on" icon color="deep-orange">
                            <v-icon
                              @click="updateTaskDates('dueDate')"
                            >mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Select date and click to update</span>
                      </v-tooltip>
                    </v-list-item-action>
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
                        this.task.taskReminderAt
                        )
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <datetime
                        hidden
                        type="datetime"
                        v-model="taskRemindOn"
                        zone="local"
                        input-id="remindDate"
                        :max-datetime="this.task.taskDueDateAt"
                      >
                        <label for="remindDate" slot="before" class="tabListItemsTextDue">
                          <!-- <span class="dialogPickerNewText">Remind Date</span> -->
                        </label>
                        <label for="remindDate" slot="after" class>
                          <v-icon>mdi-pencil-plus</v-icon>
                        </label>
                        <template slot="button-cancel">
                          <fa :icon="['far', 'times']"></fa>Cancel
                        </template>
                        <template slot="button-confirm">
                          <fa :icon="['fas', 'check-circle']"></fa>
                          <p>Confirm</p>
                        </template>
                      </datetime>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on" icon color="deep-orange">
                            <v-icon
                              @click="updateTaskDates('remindOn')"
                            >mdi-checkbox-marked-circle-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Select date and click to update</span>
                      </v-tooltip>
                    </v-list-item-action>
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
                  <div class="viewTaskPickerDiv">
                    <v-file-input
                      label="Upload files"
                      v-model="files"
                      outlined
                      prepend-inner-icon="mdi-upload-outline"
                      prepend-icon
                      multiple
                      class
                      chips
                      dense
                    ></v-file-input>
                  </div>
                  <div class="viewTaskPickerDiv">
                    <div class="fileUploadButton taskViewFileUploadButton">
                      <v-btn
                        @click="taskFileUpload()"
                        class="ma-2"
                        x-small
                        rounded
                        depressed
                        color="#0BAFFF"
                        dark
                      >
                        <v-icon left>mdi-upload</v-icon>Upload
                      </v-btn>
                      <v-progress-circular
                        v-if="uploadLoading == true"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </div>
                  </div>
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
                          }} {{
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
                      <div>
                        <v-icon
                          @click="handleFileDelete(file.taskFileId)"
                          size="25"
                          color="#FF6161"
                        >mdi-delete-circle</v-icon>
                      </div>
                    </v-list-item>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
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
import AddParentTask from "~/components/tasksPage/addParentTask";
import AddChildTask from "~/components/tasksPage/addChildTask";

export default {
  props: ["task", "projectId", "people", "taskObject"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "add-parent-task": AddParentTask,
    "add-child-task": AddChildTask
  },
  data() {
    return {
      taskDeleteDialog: false,
      taskId: "",
      projectId: "",
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
      // taskDue: this.task.taskDueDateAt,
      uploadLoading: false,
      taskAssignee: "",
      updatedTask: {
        taskName: "",
        taskAssignee: "",
        taskNotes: "",
        taskStatus: "",
        taskRemindOnDate: "",
        taskDueDateAt: ""
      },
      // taskStatus: this.task.taskStatus,
      // issueType: this.task.issueType,

      status: [
        { name: "Open", id: "open" },
        { name: "Closed", id: "closed" }
      ]
    };
  },
  methods: {
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        // this.component = 'success-popup'
        this.$emit("listenChange");
        this.$emit("shrinkSideBar");
        this.closeTaskDialog();
        this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
          taskGroupId: this.task.taskGroupId,
          userId: this.userId
        });
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
    closeTaskDialog() {
      this.$emit("taskDialogClosing");
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    clickToPrint() {
      // console.log("==============> clicked!!!!");
    },
    // ------------- update task status ----------
    async updateTaskStatus() {
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}`,
          {
            taskStatus: this.updatedStatus
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
          taskGroupId: this.task.taskGroupId,
          userId: this.userId
        });
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task status response", response);
      } catch (e) {
        // console.log("Error updating a status", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
      }
    },
    async updateTaskName() {
      // console.log("updatedTaskName ->", this.updatedTask.taskName);
      let response;
      try {
        response = await this.$axios.$put(
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}`,
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

        this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
          taskGroupId: this.task.taskGroupId,
          userId: this.userId
        });
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

    // ------ update task assignee ---------
    async changeAssignee() {
      // console.log("assignee changed");
      let response;
      try {
        response = await this.$axios.$put(
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}`,
          {
            taskAssignee: this.taskAssignee
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Assignee successfully updated";
        this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
          taskGroupId: this.task.taskGroupId,
          userId: this.userId
        });
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
        // console.log("Error updating a status", e);
      }
    },
    // ---------- update task note -----------
    async updateTaskNote() {
      // console.log("updatedTaskValue ->", this.updatedTask.taskNote);
      let response;

      try {
        response = await this.$axios.$put(
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}`,
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
        this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
          taskGroupId: this.task.taskGroupId,
          userId: this.userId
        });
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
        // console.log("Error updating a note", e);
      }
    },
    // ----------- update task dates -----------
    async updateTaskDates(type) {
      // console.log(
      //   "task due updated ---------> " + this.updatedTask.taskDueDateAt
      // );
      // console.log(
      //   "task remind updated ---------> " + this.updatedTask.taskRemindOnDate
      // );
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
        remindDate = this.updatedTask.taskRemindOnDate;
        this.$store.dispatch("groups/groupTask/updateProjectDates", {
          type: "dueDate",
          date: dueDate
        });
        changedDate = {
          taskDueDate: dueDate
        };
      } else if (this.updatedTask.taskRemindOnDate != "") {
        // console.log("inside remind on date");
        remindDate = new Date(this.updatedTask.taskRemindOnDate);
        const isoDate = new Date(
          remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso edit remind date", isoDate);
        dueDate = this.updatedTask.taskDueDateAt;
        remindDate = isoDate;
        this.$store.dispatch("groups/groupTask/updateProjectDates", {
          type: "remindDate",
          date: remindDate
        });
        changedDate = {
          taskRemindOnDate: remindDate
        };
      }
      // console.log("dueDate", dueDate);
      // console.log("remindDate", remindDate);
      let response;
      try {
        response = await this.$axios.$put(
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}`,
          changedDate,
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Date successfully updated";

        this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
          taskGroupId: this.task.taskGroupId,
          userId: this.userId
        });
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
              `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}/upload`,
              formData,
              {
                headers: {
                  user: this.userId
                }
              }
            );
            this.$store.dispatch(
              "groups/groupTask/appendTaskFile",
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
          `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}/upload/${taskFileId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        // console.log(response.data);
        // this.$store.dispatch("task/removeTaskFile", taskFileId);
        this.$store.dispatch("groups/groupTask/deleteTaskFile", taskFileId);
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
        // console.log("Error deleting task", e);
      }
    },
    // ------- popup close ----------
    close() {
      this.component = "";
    },

    click() {
      // console.log("select =========>" + this.taskDueDate);
      // this.issueType = issueType;
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
    },
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
        stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(11, 16);
        return stringDate;
      }
    },

    isTaskAssignee(taskAssignee) {
      if (taskAssignee.assigneeId == this.task.taskAssignee) {
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
    taskUser() {
      return (
        this.selectedTaskUser.firstName + " " + this.selectedTaskUser.lastName
      );
    },
    ...mapState({
      people: state => state.task.userCompletionTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      projectAllTasks: state => state.task.allTasks,
      projectId: state => state.project.project.projectId,
      selectedTaskUser: state => state.user.selectedTaskUser,
      groupPeople: state => state.groups.groupPeople.groupPeople,
      taskFiles: state => state.groups.groupTask.groupTaskFiles,
      selectedTaskGroupTask: state => state.groups.groupTask.selectedGroupTask,
      children: state => state.groups.groupTask.children,
      parent: state => state.groups.groupTask.parentTask
    }),
    ...mapGetters(["getuserCompletionTasks"]),

    taskName: {
      get() {
        if (this.updatedTask.taskName == "") {
          return this.task.taskName;
        } else return this.updatedTask.taskName;
      },
      set(name) {
        if (this) this.updatedTask.taskName = name;
      }
    },
    taskStatus: {
      get() {
        if (this.updatedStatus == "") {
          return this.task.taskStatus;
        } else return this.updatedStatus;
      },
      set(value) {
        // console.log("task status", value);
        this.updatedStatus = value;
      }
    },

    taskNote: {
      get() {
        return this.task.taskNote;
      },
      set(value) {
        this.updatedTask.taskNote = value;
      }
    },

    taskDue: {
      get() {
        if (
          this.task.taskDueDateAt === null ||
          this.task.taskDueDateAt === "1970-01-01T05:30:00.000+0000"
        )
          return null;
        let stringDate = this.task.taskDueDateAt + " ";
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
          this.task.taskReminderAt === null ||
          this.task.taskDueDateAt === "1970-01-01T05:30:00.000+0000"
        )
          return "Add Reminder Date";
        let stringDate = this.task.taskReminderAt + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 16);
        return stringDate;
      },
      set(value) {
        // console.log("updated task reminder ->", value);
        this.updatedTask.taskRemindOnDate = value;
      }
    }
  }
};
</script>
