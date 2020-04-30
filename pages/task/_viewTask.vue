<template>
  <div class="top-nav">
    <navigation-drawer :user="user" :currentUser="currentUser" />
    <v-toolbar app color dark fixed class="tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium"
                >Task</v-list-item-title
              >
            </v-list-item-content>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
        <div class="content-div">
          <v-list-item-title class="font-weight-bold">{{
            this.taskId
          }}</v-list-item-title>
          <v-list-item-title class="font-weight-bold">{{
            this.task.taskAssignee
          }}</v-list-item-title>
        </div>
      </div>
    </v-toolbar>
    <div class="viewTaskContent overflow-y-auto">
      <div class="taskRestFormDiv">
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
                :href="'http://localhost:3000/projects/' + this.projectId"
                style="text-decoration: none;"
                target="_blank"
              >
                <v-icon size="22" color="#0083E2">mdi-folder-outline</v-icon>
                Project
              </a>
              /
              <a
                v-if="this.task.isParent == false"
                :href="
                  'http://localhost:3000/task/' +
                    this.parentTask.taskId +
                    '/?project=' +
                    this.projectId
                "
                style="text-decoration: none;"
                target="_blank"
              >
                <v-icon size="22" color="#0083E2">mdi-calendar-check</v-icon>
                Parent Task
              </a>
              <span v-if="this.task.isParent == false"> /</span>
              <a
                :href="
                  'http://localhost:3000/task/' +
                    this.task.taskId +
                    '/?project=' +
                    this.projectId
                "
                style="text-decoration: none;"
                target="_blank"
              >
                <v-icon size="22" color="#0083E2"
                  >mdi-calendar-check-outline</v-icon
                >
                Current Task
              </a>
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
                    maxlength="49"
                    type="text"
                    class="viewTaskTitleEdit"
                    v-model="taskName"
                    v-if="editTask == false"
                    :disabled="editTask"
                  />
                </v-col>
                <v-col sm="1" md="1" class="taskEditIconCol">
                  <v-icon
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
                  <!-- <div v-if="!this.task.isParent" class="expansionViewHeader topItemTaskView">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Parent Task</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <div class="taskViewTaskListContent">
                        <v-list-item @click.stop="drawer = !drawer">
                          <v-list-item-action>
                            <v-icon size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>{{this.parentTask.taskName}}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-list-item-sub-title>{{getProjectDates(this.parentTask.taskDueDateAt)}}</v-list-item-sub-title>
                          </v-list-item-action>
                          <v-list-item-avatar size="25">
                            
                            <v-img
                              :src="this.parentProfile.profileImage"
                            ></v-img>
                          </v-list-item-avatar>
                        </v-list-item>
                      </div>
                    </v-list-item-content>
                  </div> -->

                  <!-- ----------- parent task section --------- -->
                  <div v-if="this.task.isParent == false">
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
                                v-if="this.parentTask.taskStatus == 'closed'"
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
                                this.parentTask.taskName
                              }}</v-list-item-title>
                            </v-list-item-content>
                            <div>
                              <v-list-item-action>
                                <v-list-item-sub-title
                                  :class="dueDateCheck(this.parentTask)"
                                  >{{
                                    getProjectDates(
                                      this.parentTask.taskDueDateAt
                                    )
                                  }}</v-list-item-sub-title
                                >
                              </v-list-item-action>
                            </div>
                            <div>
                              <v-list-item-avatar size="25">
                                <v-img
                                  v-if="this.parentProfile.profileImage != null"
                                  :src="this.parentProfile.profileImage"
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
                                    this.parentTask.taskId +
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
                  <div v-if="this.task.isParent == true">
                    <div class="expansionViewHeader">
                      <v-list-group>
                        <template v-slot:activator>
                          <v-list-item-icon>
                            <v-icon size="30" color="#2EC973"
                              >mdi-package-variant-closed</v-icon
                            >
                          </v-list-item-icon>
                          <v-list-item-title class="viewTaskFontColors">
                            Child Tasks:
                            <span>{{ childrenCount }} Task(s)</span>
                          </v-list-item-title>
                        </template>

                        <v-list-item-content
                          v-for="(child, index) in children"
                          :key="index"
                          class="parentChildTaskList"
                        >
                          <!-- ---------- task list --------- -->
                          <!-- <nuxt-link :to="'/task/' + child.taskId + '/?project=' + this.projectId" style="text-decoration: none;"> -->

                          <div class="taskViewTaskListContent">
                            <v-list-item>
                              <v-list-item-action>
                                <v-icon size="25" color="#2EC973"
                                  >mdi-checkbox-marked-circle</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>{{
                                  child.taskName
                                }}</v-list-item-title>
                              </v-list-item-content>
                              <div>
                                <v-list-item-action>
                                  <v-list-item-sub-title>{{
                                    getProjectDates(child.taskDueDateAt)
                                  }}</v-list-item-sub-title>
                                </v-list-item-action>
                              </div>
                              <div>
                                <v-list-item-avatar size="25">
                                  <v-img
                                    :src="child.taskAssigneeProfileImage"
                                  ></v-img>
                                </v-list-item-avatar>
                              </div>
                              <div class="boardTabLinkIcon">
                                <nuxt-link
                                  :to="
                                    '/task/' +
                                      child.taskId +
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
                          <!-- </nuxt-link> -->
                        </v-list-item-content>
                      </v-list-group>
                    </div>
                  </div>
                  <v-divider></v-divider>
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
                              :items="issueTypes"
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
                              v-model="taskStatus"
                              :items="taskStatuses"
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
                              :items="getAllSprints()"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Board"
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
                          <option value disabled>{{
                            this.task.taskAssignee
                          }}</option>
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
                    <v-list-item v-for="(file, index) in fileList" :key="index">
                      <v-list-item-action>
                        <v-icon size="30">mdi-file-document-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">{{
                          file.taskFileName
                        }}</v-list-item-title>
                        <v-list-item-subtitle class="fileSubTitles"
                          >125.54kB</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">{{
                          taskUser
                        }}</v-list-item-title>

                        <v-list-item-subtitle class="fileSubTitles">{{
                          file.taskFileDate
                        }}</v-list-item-subtitle>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import NavigationDrawer from '~/components/navigationDrawer';
export default {
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
      parentTask: {},
      parentProfile: {},
      taskAssignee: '',
      task: {},
      updatedTask: {},
      issueTypes: ['development', 'qa', 'bug', 'operational'],
      taskStatuses: ['open', 'pending', 'closed'],
      allSprints: [{ sprintId: 'default', sprintName: 'Default' }],
      fetchSprintCount: 0,
      fetchFilesCount: 0,
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
      console.log('Selected Task get response', this.task);
    } catch (e) {
      console.log('Error fetching task', e);
    }
    if (this.task.isParent) {
      console.log('parent tasl');
      this.$store.dispatch('task/fetchChildren', {
        projectId: this.$route.query.project,
        taskId: this.$route.params.viewTask,
      });
    } else {
      console.log('child tasl');
      let response = await this.$axios.$get(
        `/projects/${this.$route.query.project}/tasks/${this.task.parentId}`,
        {
          headers: {
            user: this.userId,
            type: 'project',
          },
        }
      );
      this.parentTask = response.data;
      console.log('Parent Task get response', response.data);
      let userResponse;
      try {
        userResponse = await this.$axios.$get(
          `/users/${response.data.taskAssignee}`,
          {
            headers: {
              user: this.userId,
            },
          }
        );
        console.log('fetch parent task profile', userResponse.data);
        this.parentProfile = userResponse.data;
      } catch (e) {
        console.log('Error fetching parent task profile', e);
      }
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
    getAllSprints() {
      console.log('lenght', this.projectSprints.length);
      if (this.projectSprints.length != 0) {
        let sprints = this.projectSprints;
        let sprintList = [];
        for (let index = 0; index < sprints.length; ++index) {
          let sprint = sprints[index];
          sprintList.push({
            name: sprint.sprintName,
            id: sprint.sprintId,
          });
        }
        return sprintList;
      } else if (this.fetchSprintCount < 1) {
        console.log('sprint dispatched actually');
        this.$store.dispatch(
          'sprints/sprint/fetchAllProjectSprints',
          this.$route.query.project
        );
        this.fetchSprintCount += 1;
      }
      // return [];
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
  },
  computed: {
    ...mapState({
      selectedTaskUser: (state) => state.user.selectedTaskUser,
      people: (state) => state.task.userCompletionTasks,
      projectSprints: (state) => state.sprints.sprint.sprints,
      taskFiles: (state) => state.task.taskFiles,
      children: (state) => state.task.childTasks,
    }),
    ...mapGetters(['getuserCompletionTasks']),

    taskUser() {
      if (Object.keys(this.selectedTaskUser).length === 0) {
        this.$store.dispatch(
          'user/setSelectedTaskUser',
          this.task.taskAssignee
        );
        return '';
      } else {
        return (
          this.selectedTaskUser.firstName + ' ' + this.selectedTaskUser.lastName
        );
      }
    },

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

    fileList() {
      if (this.taskFiles.length == 0 && this.fetchFilesCount < 1) {
        console.log('file length dispatch', this.taskFiles.length);
        this.$store.dispatch('task/fetchTaskFiles', {
          projectId: this.projectId,
          taskId: this.taskId,
        });
        this.fetchFilesCount += 1;
      } else {
        return this.taskFiles;
      }
    },

    childrenCount() {
      return this.children.length;
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
    // selectedSprint: {
    //   get() {
    //     return this.task.sprintId;
    //   },
    //   set(value) {
    //     this.updatedTask.sprintId = value;
    //   }
    // },
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
