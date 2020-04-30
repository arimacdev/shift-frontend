<template>
  <v-card width="100vw">
    <div class="viewDialogTaskContent overflow-y-auto">
      <div class="taskDialogFormDiv">
        <form>
          <v-row class="mb-12 formRowSpec" no-gutters>
            <v-col sm="2" md="2">
              <div class="taskViewTitle">
                Task -
                <span>#42</span>
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <!-- <v-select label="Task status" dense dark background-color="#0BAFFF" solo></v-select> -->
              <div class="taskStatusDropdown">
                <select
                  v-model="taskStatus"
                  class="viewTaskStatusDropDown"
                  :class="statusCheck()"
                >
                  <option key="pending" value="pending">Pending</option>
                  <option key="implementing" value="implementing"
                    >Implementing</option
                  >
                  <option key="qa" value="qa">QA</option>
                  <option key="readyToDeploy" value="readyToDeploy"
                    >Ready to Deploy</option
                  >
                  <option key="reOpened" value="reOpened">Re-Opened</option>
                  <option key="deployed" value="deployed">Deployed</option>
                  <option key="closed" value="closed">Closed</option>
                </select>
              </div>
            </v-col>
            <v-col sm="8" md="8" class="taskViewLinksDiv">
              <a
                style="text-decoration: none;"
                :href="'http://localhost:3000/projects/' + this.projectId"
                >Project Link</a
              >
              /
              <a href>Parent task link</a>
              /
              <a
                style="text-decoration: none;"
                :href="
                  'http://localhost:3000/task/' +
                    this.taskId +
                    '/?project=' +
                    this.projectId
                "
                >Task link</a
              >
            </v-col>
          </v-row>
          <v-row class="mb-12" no-gutters>
            <v-col sm="12" md="12" class="formRowNameRange">
              <v-row class="mb-12" no-gutters>
                <v-col sm="11" md="11">
                  <input
                    type="text"
                    placeholder="Test task name"
                    class="viewTaskTitle"
                    v-model="taskName"
                  />
                </v-col>
                <v-col sm="1" md="1" class="taskEditIconCol">
                  <v-icon
                    v-model="taskName"
                    size="25"
                    color="#424F64"
                    class="editIcon"
                    @click="EditTaskName"
                    >mdi-pencil-circle</v-icon
                  >
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
                  <!-- ----------- parent task section --------- -->
                  <div v-if="task.isParent == false">
                    <div class="expansionViewHeader topItemTaskView">
                      <v-list-item class="taskViewTitleSection">
                        <v-list-item-icon>
                          <v-icon size="30" color="#2EC973"
                            >mdi-package-variant-closed</v-icon
                          >
                        </v-list-item-icon>
                        <v-list-item-title class="viewTaskFontColors"
                          >Parent Task</v-list-item-title
                        >
                      </v-list-item>
                      <v-list-item-content class="parentChildTaskList">
                        <!-- ---------- task list --------- -->
                        <div class="taskViewTaskListContent">
                          <v-list-item>
                            <v-list-item-action>
                              <v-icon
                                v-if="
                                  taskObject.parentTask.taskStatus == 'closed'
                                "
                                size="25"
                                color="#2EC973"
                                >mdi-checkbox-marked-circle</v-icon
                              >
                              <v-icon v-else size="30" color="#FFFFFF"
                                >mdi-checkbox-blank-circle</v-icon
                              >
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>{{
                                taskObject.parentTask.taskName
                              }}</v-list-item-title>
                            </v-list-item-content>
                            <div>
                              <v-list-item-action>
                                <v-list-item-sub-title
                                  :class="dueDateCheck(taskObject.parentTask)"
                                  >{{
                                    getProjectDates(
                                      taskObject.parentTask.taskDueDateAt
                                    )
                                  }}</v-list-item-sub-title
                                >
                              </v-list-item-action>
                            </div>
                            <div>
                              <v-list-item-avatar size="25">
                                <v-img
                                  v-if="
                                    taskObject.parentTask
                                      .taskAssigneeProfileImage != null
                                  "
                                  :src="
                                    taskObject.parentTask
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
                              <nuxt-link
                                :to="
                                  '/task/' +
                                    taskObject.parentTask.taskId +
                                    '/?project=' +
                                    projectId
                                "
                                style="text-decoration: none;"
                                target="_blank"
                              >
                                <v-icon size="20" color="blue"
                                  >mdi-link-variant</v-icon
                                >
                              </nuxt-link>
                            </div>
                          </v-list-item>
                        </div>
                        <!-- --------------- -->
                      </v-list-item-content>
                    </div>
                    <v-divider></v-divider>
                  </div>
                  <!-- -------------- child tasks section ----------- -->
                  <div v-if="task.isParent == true">
                    <div class="expansionViewHeader">
                      <v-list-group>
                        <template v-slot:activator>
                          <v-list-item-icon>
                            <v-icon size="30" color="#2EC973"
                              >mdi-package-variant-closed</v-icon
                            >
                          </v-list-item-icon>
                          <v-list-item-title class="viewTaskFontColors">
                            Child Tasks
                            <span
                              >({{ taskObject.childTasks.length }} tasks)</span
                            >
                          </v-list-item-title>
                        </template>

                        <v-list-item-content class="parentChildTaskList">
                          <!-- ---------- task list --------- -->
                          <div
                            class="taskViewTaskListContent"
                            v-for="(childTask, index) in taskObject.childTasks"
                            :key="index"
                          >
                            <v-list-item>
                              <v-list-item-action>
                                <v-icon
                                  v-if="childTask.taskStatus == 'closed'"
                                  size="25"
                                  color="#2EC973"
                                  >mdi-checkbox-marked-circle</v-icon
                                >
                                <v-icon v-else size="30" color="#FFFFFF"
                                  >mdi-checkbox-blank-circle</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>{{
                                  childTask.taskName
                                }}</v-list-item-title>
                              </v-list-item-content>
                              <div>
                                <v-list-item-action>
                                  <v-list-item-sub-title
                                    :class="dueDateCheck(childTask)"
                                    >{{
                                      getProjectDates(childTask.taskDueDateAt)
                                    }}</v-list-item-sub-title
                                  >
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
                                <nuxt-link
                                  :to="
                                    '/task/' +
                                      childTask.taskId +
                                      '/?project=' +
                                      projectId
                                  "
                                  style="text-decoration: none;"
                                  target="_blank"
                                >
                                  <v-icon size="20" color="blue"
                                    >mdi-link-variant</v-icon
                                  >
                                </nuxt-link>
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
                        <v-icon size="30" color="#0BAFFF"
                          >mdi-checkbox-multiple-blank-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Task type</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="6" md="6">
                            <v-select
                              dense
                              v-model="issueType"
                              :items="items"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task type"
                              outlined
                              class="createFormElements"
                            ></v-select>
                          </v-col>
                          <v-col sm="6" md="6">
                            <v-select
                              dense
                              v-if="this.issueType == 'development'"
                              v-model="taskStatus"
                              :items="development"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                            <v-select
                              dense
                              v-if="this.issueType == 'qa'"
                              v-model="taskStatus"
                              :items="qa"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                            <v-select
                              dense
                              v-if="this.issueType == 'design'"
                              v-model="taskStatus"
                              :items="design"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                            <v-select
                              dense
                              v-if="this.issueType == 'bug'"
                              v-model="taskStatus"
                              :items="bug"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                            <v-select
                              dense
                              v-if="this.issueType == 'operational'"
                              v-model="taskStatus"
                              :items="operational"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                            <v-select
                              dense
                              v-if="this.issueType == 'preSales'"
                              v-model="taskStatus"
                              :items="preSales"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                            <v-select
                              dense
                              v-if="this.issueType == 'general'"
                              v-model="taskStatus"
                              :items="general"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </div>
                      <!-- --------------- -->
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>

                  <!-- -------------- project board section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#6FCD17"
                          >mdi-animation-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Board</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="12" md="12">
                            <v-select
                              dense
                              v-model="selectedSprint"
                              :items="sprints"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Board"
                              outlined
                              @mousedown="getSprintDetails"
                              class="createFormElements"
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
                        <v-icon size="30" color="#FF6767"
                          >mdi-file-document-edit-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Notes</v-list-item-title
                      >
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
                      <v-icon size="35" color="#02C1D4"
                        >mdi-account-arrow-left-outline</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle"
                        >Task Assignee</v-list-item-subtitle
                      >
                      <v-list-item-title>
                        <select
                          v-model="taskAssignee"
                          class="rightColumnItemsText"
                        >
                          <!-- <option>Naveen Perera</option> -->
                          <option value disabled
                            >{{ selectedTaskUser.firstName }}
                            {{ selectedTaskUser.lastName }}</option
                          >
                          <option
                            class="tabListItemsText"
                            v-for="(taskAssignee, index) in peopleList"
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
                      <v-icon size="35" color="#7CDD00"
                        >mdi-calendar-blank-outline</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle"
                        >Due Date</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <div class="viewTaskPickerDiv">
                    <VueCtkDateTimePicker
                      color="#3f51b5"
                      id="duePicker"
                      class
                      v-model="taskDueDate"
                      label="Add due date"
                      right
                    />
                  </div>
                  <!-- ----------- Reminder date section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#7CDD00"
                        >mdi-clock-outline</v-icon
                      >
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle"
                        >Remind Date</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <div class="viewTaskPickerDiv">
                    <VueCtkDateTimePicker
                      color="#3f51b5"
                      id="duePicker"
                      class
                      v-model="taskRemindOnDate"
                      label="Add remind date"
                      right
                    />
                  </div>
                  <v-divider class="datePickerDivider"></v-divider>
                  <!-- ----------- Files section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#FFAE4F">mdi-paperclip</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="rightColumnItemsTitle"
                        >Files</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <div class="viewTaskPickerDiv">
                    <v-file-input
                      label="Upload files"
                      v-model="files"
                      outlined
                      prepend-inner-icon="mdi-upload-outline"
                      prepend-icon
                      class
                      chips
                      multiple
                      dense
                    ></v-file-input>
                  </div>
                  <div class="viewTaskPickerDiv">
                    <div class="fileUploadButton taskViewFileUploadButton">
                      <v-btn
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
                  <div class="filesViewDiv">
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon size="30">mdi-file-document-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles"
                          >FRS.pdf</v-list-item-title
                        >
                        <v-list-item-subtitle class="fileSubTitles"
                          >125.54kB</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles"
                          >Naveen Perera</v-list-item-title
                        >
                        <v-list-item-subtitle class="fileSubTitles"
                          >04/10/2020</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon size="25" color="#FF6161"
                          >mdi-delete-circle</v-icon
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                  <div class="filesViewDiv">
                    <v-list-item>
                      <v-list-item-action>
                        <v-icon size="30">mdi-file-document-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles"
                          >FRS.pdf</v-list-item-title
                        >
                        <v-list-item-subtitle class="fileSubTitles"
                          >125.54kB</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles"
                          >Naveen Perera</v-list-item-title
                        >
                        <v-list-item-subtitle class="fileSubTitles"
                          >04/10/2020</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon size="25" color="#FF6161"
                          >mdi-delete-circle</v-icon
                        >
                      </v-list-item-action>
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
          <v-list-item-title class="font-weight-medium"
            >Task Log</v-list-item-title
          >
        </v-list-item-content>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import NavigationDrawer from '~/components/navigationDrawer';
export default {
  props: ['task', 'projectId', 'subTasks', 'taskFiles', 'people', 'taskObject'],
  components: {
    NavigationDrawer,
  },
  data() {
    return {
      taskId: '',
      projectId: '',
      userId: '',
      sprints: [],
      editTask: true,
      task: {},
      taskObject: {},
      updatedTask: {},
      taskAssignee: '',
      taskStatuses: this.task.taskStatus,
      issueType: this.task.issueType,
      taskStatus: this.task.taskStatus,
      items: [
        { name: 'Development', id: 'development' },
        { name: 'QA', id: 'qa' },
        { name: 'Design', id: 'design' },
        { name: 'Bug', id: 'bug' },
        { name: 'Operational', id: 'operational' },
        { name: 'Pre-sales', id: 'preSales' },
        { name: 'General', id: 'general' },
      ],
      development: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Open', id: 'cancel' },
        { name: 'Completed', id: 'completed' },
        { name: 'Implementing', id: 'implementing' },
        { name: 'Deployed', id: 'deployed' },
        { name: 'Closed', id: 'closed' },
      ],
      qa: [
        { name: 'Pending', id: 'pending' },
        { name: 'Testing', id: 'testing' },
        { name: 'Review', id: 'review' },
        { name: 'Closed', id: 'closed' },
      ],
      design: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Cancel', id: 'cancel' },
        { name: 'Fixing', id: 'fixing' },
        { name: 'Resolved', id: 'resolved' },
        { name: 'In progress', id: 'inprogress' },
        { name: 'Completed', id: 'completed' },
        { name: 'Under review', id: 'underReview' },
        { name: 'Weiting for approval', id: 'waitingForApproval' },
        { name: 'Review', id: 'review' },
        { name: 'Waiting response', id: 'waitingResponse' },
        { name: 'Rejected', id: 'rejected' },
        { name: 'Closed', id: 'closed' },
      ],
      bug: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Open', id: 'open' },
        { name: 'Cancel', id: 'cancel' },
        { name: 'Reopen', id: 'reopen' },
        { name: 'Fixing', id: 'fixing' },
        { name: 'Testing', id: 'testing' },
        { name: 'Resolved', id: 'resolved' },
        { name: 'Under review', id: 'underReview' },
        { name: 'Review', id: 'review' },
        { name: 'Waiting response', id: 'waitingResponse' },
        { name: 'Closed', id: 'closed' },
      ],
      operational: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Open', id: 'open' },
        { name: 'Cancel', id: 'cancel' },
        { name: 'Resolved', id: 'resolved' },
        { name: 'In progress', id: 'inprogress' },
        { name: 'Completed', id: 'completed' },
        { name: 'Under review', id: 'underReview' },
        { name: 'Weiting for approval', id: 'waitingForApproval' },
        { name: 'Discussion', id: 'discussion' },
        { name: 'Waiting response', id: 'waitingResponse' },
        { name: 'Ready', id: 'ready' },
        { name: 'Rejected', id: 'rejected' },
        { name: 'Closed', id: 'closed' },
      ],
      preSales: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Open', id: 'open' },
        { name: 'Cancel', id: 'cancel' },
        { name: 'Resolved', id: 'resolved' },
        { name: 'In progress', id: 'inprogress' },
        { name: 'Under review', id: 'underReview' },
        { name: 'Weiting for approval', id: 'waitingForApproval' },
        { name: 'Discussion', id: 'discussion' },
        { name: 'Waiting response', id: 'waitingResponse' },
        { name: 'Rejected', id: 'rejected' },
        { name: 'Closed', id: 'closed' },
      ],
      general: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Open', id: 'open' },
        { name: 'Cancel', id: 'cancel' },
        { name: 'In progress', id: 'inprogress' },
        { name: 'Completed', id: 'completed' },
        { name: 'Closed', id: 'closed' },
      ],
    };
  },
  async created() {
    this.taskId = this.$route.params.viewTask;
    this.projectId = this.$route.query.project;
    this.userId = this.$store.state.user.userId;

    let taskResponse;
    try {
      taskResponse = await this.$axios.$get(
        `/projects/${this.$route.query.project}/tasks/${this.$route.params.viewTask}`,
        {
          headers: {
            user: this.userId,
            type: 'project',
          },
        }
      );
      this.task = taskResponse.data;
      console.log('group get response', this.task);
    } catch (e) {
      console.log('Error fetching groups', e);
    }
  },
  methods: {
    dueDateCheck(task) {
      console.log('check due date color', task);
      if (task.taskStatus === 'closed') {
        return 'workLoadTaskDone';
      } else if (task.taskDueDateAt == null) {
        return 'workLoadTaskDefault';
      } else {
        const dueDate = new Date(task.taskDueDateAt);
        const dueToUtc = new Date(
          dueDate.toLocaleString('en-US', { timeZone: 'UTC' })
        );
        const dueToUtcDate = new Date(dueToUtc);
        const now = new Date();
        console.log('now', now.getTime(), 'DueTime', dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          console.log('overdue');
          return 'workLoadTaskOverDue';
        } else {
          return 'workLoadTaskHealthy';
        }
      }
    },
    getProjectDates(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString('en-US', { timeZone: 'UTC' })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();
      console.log('Today', now.getDate(), 'DueDate', dueToUtcDate.getDate());

      if (date === null || date === '1970-01-01T05:30:00.000+0000') {
        return 'Add Due Date';
      } else if (now.getDate() === dueToUtcDate.getDate()) {
        return 'Today';
      } else if (now.getDate() - 1 === dueToUtcDate.getDate()) {
        return 'Yesterday';
      } else if (now.getDate() + 1 === dueToUtcDate.getDate()) {
        return 'Tomorrow';
      } else {
        let stringDate = date + '';
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10);
        return stringDate;
      }
    },
    getSprintDetails(v) {
      console.log('board list', this.projectSprints);
      this.sprints = [];
      let sprintSearchList = this.projectSprints;
      for (let index = 0; index < sprintSearchList.length; ++index) {
        let sprint = sprintSearchList[index];
        this.sprints.push({
          name: sprint.sprintName,
          id: sprint.sprintId,
        });
      }
      console.log('nameList', this.states);
      this.loading = true;
    },
    isTaskAssignee(taskAssignee) {
      if (taskAssignee.assigneeId == this.task.taskAssignee) {
        return true;
      } else {
        return false;
      }
    },
    statusCheck() {
      return 'pendingStatus';
    },
    EditTaskName() {
      this.editTask = false;
    },
  },
  computed: {
    ...mapState({
      people: (state) => state.task.userCompletionTasks,
      projectSprints: (state) => state.sprints.sprint.sprints,
      projectAllTasks: (state) => state.task.allTasks,
      projectId: (state) => state.project.project.projectId,
      selectedTaskUser: (state) => state.user.selectedTaskUser,
    }),
    ...mapGetters(['getuserCompletionTasks']),
    peopleList() {
      console.log('people list', this.people);
      if (this.people.length == 0) {
        this.$store.dispatch(
          'task/fetchProjectUserCompletionTasks',
          this.$route.query.project
        );
      } else {
        return this.people;
      }
    },

    taskName: {
      get() {
        return this.task.taskName;
      },
      set(name) {
        this.updatedTask.taskName = name;
      },
    },
    taskStatus: {
      get() {
        return this.task.taskStatus;
      },
      set(value) {
        this.updatedTask.taskStatus = value;
      },
    },
    issueType: {
      get() {
        return this.task.issueType;
      },
      set(value) {
        this.updatedTask.issueType = value;
      },
    },
    selectedSprint: {
      get() {
        return this.task.sprintId;
      },
      set(sprintId) {
        console.log('spid', sprintId);
        this.updatedSprint = sprintId;
      },
    },
    taskNote: {
      get() {
        return this.task.taskNote;
      },
      set(value) {
        this.updatedTask.taskNote = value;
      },
    },
    taskDueDate: {
      get() {
        return this.task.taskDueDateAt;
      },
      set(value) {
        console.log('updated task due ->', value);
        this.updatedTask.taskDueDateAt = value;
      },
    },
    taskRemindOnDate: {
      get() {
        return this.task.taskReminderAt;
      },
      set(value) {
        console.log('updated remind on ->', value);
        this.updatedTask.taskReminderAt = value;
      },
    },
  },
};
</script>
