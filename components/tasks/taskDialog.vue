<template>
  <div>
    <v-card width="100vw" height="100%">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="taskDialogClosing()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-bold">{{ taskName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <!-- <v-btn dark text @click="dialog = false">Save</v-btn> -->
          <button class>
            <v-list-item dark>
              <div>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      @click="taskDeleteDialog = true"
                      size="30px"
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
              <v-col sm="2" md="2">
                <div class="taskViewTitle">
                  Task -
                  <span class="secondaryId">#{{ selectedTask.secondaryTaskId }}</span>
                </div>
              </v-col>
              <v-col sm="2" md="2">
                <div class="taskStatusDropdown">{{ taskStatus }}</div>
              </v-col>
              <v-col sm="8" md="8" class="taskViewLinksDiv">
                <nuxt-link
                  :to="'/projects/' + this.projectId"
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <v-icon size="18" color="#0083E2">icon-project</v-icon>Project
                </nuxt-link>/
                <nuxt-link
                  v-if="selectedTask.isParent == false"
                  target="_blank"
                  :to="
                    '/task/' +
                      this.taskObject.parentTask.taskId +
                      '/?project=' +
                      this.projectId
                  "
                  style="text-decoration: none;"
                >
                  <v-icon size="18" color="#0083E2">icon-task</v-icon>
                  {{ this.taskObject.parentTask.secondaryTaskId }}
                </nuxt-link>
                <span v-if="selectedTask.isParent == false">/</span>

                <nuxt-link
                  :to="
                    '/task/' +
                      selectedTask.taskId +
                      '/?project=' +
                      this.projectId
                  "
                  target="_blank"
                  style="text-decoration: none; color: #B9B9B9"
                >
                  <v-icon size="18" color="#B9B9B9">icon-task</v-icon>
                  {{ selectedTask.secondaryTaskId }}
                </nuxt-link>
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
                      @keyup.enter="saveEditTaskName"
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

            <!-- --------------- body row ------------ -->
            <div class="formRowTaskDetailsBody">
              <v-row class="mb-12" no-gutters>
                <v-col sm="8" md="8">
                  <div class="leftSideColumn">
                    <v-row v-if="projectAllTasks.length != 1" class="addParentButtonRow" no-gutters>
                      <v-col sm="6" md="6" no-gutters></v-col>
                      <v-col sm="3" md="3" no-gutters>
                        <add-parent-task
                          v-if="
                            taskObject.childTasks.length == 0 &&
                              selectedTask.isParent == true &&
                              children.length == 0
                          "
                          :taskId="this.selectedTask.taskId"
                          :projectId="this.projectId"
                        />
                      </v-col>
                      <v-col sm="3" md="3" no-gutters>
                        <add-child-task
                          v-if="selectedTask.isParent == true"
                          :taskId="selectedTask.taskId"
                          :projectId="this.projectId"
                        />
                      </v-col>
                    </v-row>
                    <!-- ----------- parent task section --------- -->
                    <div v-if="selectedTask.isParent == false">
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
                                  v-if="parent.taskStatus == 'closed'"
                                  size="25"
                                  color="#2EC973"
                                >mdi-checkbox-marked-circle</v-icon>
                                <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                              </v-list-item-action>
                              <v-list-item-action
                                style="font-size: 14px; font-weight: 800; padding-right: 20px"
                              >{{ parent.secondaryTaskId }}</v-list-item-action>
                              <v-list-item-content style="width: 200px">
                                <v-list-item-title>{{ parent.taskName }}</v-list-item-title>
                              </v-list-item-content>
                              <div>
                                <v-list-item-action>
                                  <v-list-item-sub-title
                                    :class="dueDateCheck(parent)"
                                  >{{ getProjectDates(parent.taskDueDateAt) }}</v-list-item-sub-title>
                                </v-list-item-action>
                              </div>
                              <div>
                                <v-list-item-avatar size="25">
                                  <v-img
                                    v-if="
                                      this.parentTaskUser.profileImage !=
                                        null &&
                                        this.parentTaskUser.profileImage != ''
                                    "
                                    :src="this.parentTaskUser.profileImage"
                                  ></v-img>
                                  <v-img
                                    v-else
                                    src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                                  ></v-img>
                                </v-list-item-avatar>
                              </div>
                              <div class="boardTabLinkIcon">
                                <nuxt-link
                                  :to="
                                    '/task/' +
                                      parent.taskId +
                                      '/?project=' +
                                      projectId
                                  "
                                  style="text-decoration: none;"
                                  target="_blank"
                                >
                                  <v-icon size="20" color="blue">mdi-link-variant</v-icon>
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
                    <div v-if="selectedTask.isParent == true">
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
                                <v-list-item-action
                                  style="font-size: 14px; font-weight: 800; padding-right: 20px"
                                >{{ childTask.secondaryTaskId }}</v-list-item-action>

                                <v-list-item-content style="width: 200px">
                                  <v-list-item-title>{{ childTask.taskName }}</v-list-item-title>
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
                                        childTask.taskAssigneeProfileImage !=
                                          null &&
                                          childTask.taskAssigneeProfileImage !=
                                            ''
                                      "
                                      :src="childTask.taskAssigneeProfileImage"
                                    ></v-img>
                                    <v-img
                                      v-else
                                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
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
                                    <v-icon size="20" color="blue">mdi-link-variant</v-icon>
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
                          <v-icon size="25" color="#0BAFFF">icon-task</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="viewTaskFontColors">Task type</v-list-item-title>
                      </v-list-item>
                      <v-list-item-content class="parentChildTaskList">
                        <!-- ---------- task list --------- -->
                        <div class="taskViewTaskListPadding">
                          <v-row class="mb-12" no-gutters>
                            <v-col sm="6" md="6">
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-model="issueType"
                                :items="issueTypeList"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task type"
                                outlined
                                class="createFormElements"
                                @change="updateIssueType"
                              ></v-select>
                            </v-col>
                            <v-col sm="6" md="6">
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'development'"
                                v-model="taskStatus"
                                :items="development"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
                              ></v-select>
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'qa'"
                                v-model="taskStatus"
                                :items="qa"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
                              ></v-select>
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'design'"
                                v-model="taskStatus"
                                :items="design"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
                              ></v-select>
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'bug'"
                                v-model="taskStatus"
                                :items="bug"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
                              ></v-select>
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'operational'"
                                v-model="taskStatus"
                                :items="operational"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
                              ></v-select>
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'preSales'"
                                v-model="taskStatus"
                                :items="preSales"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
                              ></v-select>
                              <v-select
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-if="this.issueTypes == 'general'"
                                v-model="taskStatus"
                                :items="general"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Task status"
                                outlined
                                class="createFormElements"
                                @change="updateStatus"
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
                          <v-icon size="25" color="#6FCD17">icon-board</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="viewTaskFontColors">Board</v-list-item-title>
                      </v-list-item>
                      <v-list-item-content class="parentChildTaskList">
                        <!-- ---------- task list --------- -->
                        <div class="taskViewTaskListPadding">
                          <v-row class="mb-12" no-gutters>
                            <v-col sm="12" md="12">
                              <v-select
                                v-if="selectedTask.isParent == true"
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-model="selectedSprint"
                                :items="sprints"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Board"
                                outlined
                                class="createFormElements"
                                @change="changeTaskSprint"
                              ></v-select>
                              <v-select
                                v-else
                                disabled
                                :menu-props="{ maxHeight: '500' }"
                                dense
                                v-model="selectedSprint"
                                :items="sprints"
                                background-color="#EDF0F5"
                                item-text="name"
                                item-value="id"
                                label="Board"
                                outlined
                                class="createFormElements"
                                @change="changeTaskSprint"
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
                          <v-icon size="30" color="#FF6767">mdi-square-edit-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="viewTaskFontColors">Notes</v-list-item-title>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="subItem noteSubItem">
                            <v-textarea name="input-7-4" auto-grow outlined v-model="taskNote"></v-textarea>
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
                  <v-list-item v-if="!this.userExists">
                    <v-list-item-action>
                      <v-icon size="15" color="red">mdi-alert-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="userBlockedWarning">
                      Assignee is no longer a participant of the
                      project
                    </v-list-item-content>
                  </v-list-item>
                  <div class="rightSideColumn">
                    <!-- --------- assignee section ---------- -->
                    <v-list-item>
                      <v-list-item-icon
                        style="background-color: #02C1D4; padding: 10px; border-radius: 50%"
                      >
                        <v-icon size="25" color="#FFFFFF">icon-assignee</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-subtitle class="rightColumnItemsSubTitle">Task Assignee</v-list-item-subtitle>
                        <v-list-item-title>
                          <!-- <select
                          v-model="taskAssignee"
                          @change="changeAssignee"
                          class="rightColumnItemsText"
                        >
                          <option value disabled>
                            {{ selectedTaskUser.firstName }}
                            {{ selectedTaskUser.lastName }}
                          </option>
                          <option
                            class="tabListItemsText"
                            v-for="(taskAssignee, index) in peopleList"
                            :key="index"
                            :value="taskAssignee.assigneeId"
                          >
                            {{ taskAssignee.assigneeFirstName }}
                            {{ taskAssignee.assigneeLastName }}
                          </option>
                          </select>-->

                          <v-select
                            style="margin-left: -10px"
                            dense
                            v-model="taskAssignee"
                            :items="assignees"
                            item-text="name"
                            item-value="id"
                            solo
                            flat
                            class="createFormElements"
                            @change="changeAssignee"
                          ></v-select>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <!-- ----------- Due date section --------- -->

                    <v-list-item>
                      <v-list-item-icon
                        style="background-color: #7CDD00; padding: 10px; border-radius: 50%"
                      >
                        <v-icon size="25" color="#FFFFFF">mdi-calendar-blank-outline</v-icon>
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
                      <v-list-item-action>
                        <datetime
                          hidden
                          type="datetime"
                          v-model="taskDue"
                          :max-datetime="this.fetchProject.projectEndDate"
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
                            <p>Confirm</p>
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

                    <!-- ----------- Reminder date section --------- -->
                    <v-list-item>
                      <v-list-item-icon
                        style="background-color: #7CDD00; padding: 10px; border-radius: 50%"
                      >
                        <v-icon size="25" color="#FFFFFF">mdi-clock-outline</v-icon>
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
                      <v-list-item-action>
                        <datetime
                          hidden
                          type="datetime"
                          v-model="taskRemindOn"
                          zone="local"
                          input-id="remindDate"
                          :max-datetime="this.selectedTask.taskDueDateAt"
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
                      <v-list-item-icon
                        style="background-color: #FFAE4F; padding: 10px; border-radius: 50%"
                      >
                        <v-icon size="25" color="#FFFFFF">mdi-paperclip</v-icon>
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
                            >{{ file.taskFileName }}</a>
                          </v-list-item-title>
                          <v-list-item-subtitle
                            class="fileSubTitles"
                          >{{ file.taskFileSize / 1000 }}KB</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="fileTitles">
                            {{ file.firstName }}
                            {{ file.lastName }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            class="fileSubTitles"
                          >{{ getProjectDates(file.taskFileDate) }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <div>
                          <a
                            style="text-decoration: none;"
                            :href="file.taskFileUrl"
                            target="_blank"
                          >
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

      <!-- --------------------- delete task popup --------------- -->

      <v-dialog v-model="taskDeleteDialog" max-width="380">
        <v-card>
          <div class="popupConfirmHeadline">
            <v-icon
              class="deletePopupIcon"
              size="60"
              color="deep-orange lighten-1"
            >mdi-alert-outline</v-icon>
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

      <v-tabs height="40px" style="padding-left: 20px" slider-size="3" v-model="selectedTab">
        <v-tab
          class="text-capitalize activityInactiveTabs"
          key="comments"
          @click="selectedVTab('comments')"
        >Comments</v-tab>
        <v-tab
          class="text-capitalize activityInactiveTabs"
          key="logs"
          @click="selectedVTab('logs')"
        >Logs</v-tab>
      </v-tabs>

      <div class="RestTaskLogDiv">
        <!-- <div class="RestTaskLogTitle">
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Task Log</v-list-item-title>
          </v-list-item-content>
        </div>-->

        <task-logs v-if="this.activity == 'logs'" :pageNum="page" :page="page" />
        <task-comments
          v-if="this.activity == 'comments'"
          :stomp="this.stomp"
          :commentPage="commentPage"
        />
        <div></div>
      </div>

      <!-- ---------------------- end popup ------------------ -->

      <div @click="close" class="taskPopupPopups">
        <component
          v-bind:is="component"
          :successMessage="successMessage"
          :errorMessage="errorMessage"
        ></component>
        <!-- <success-popup /> -->
      </div>
      <v-overlay :value="overlay">
        <progress-loading />
      </v-overlay>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import AddParentTask from "~/components/tasks/addParentTask";
import AddChildTask from "~/components/tasks/addChildTask";
import Progress from "~/components/popups/progress";
import TaskLogs from "~/components/tasks/taskLogs";
import TaskComments from "~/components/tasks/taskComments";

export default {
  props: ["projectId", "logs", "people", "taskObject", "stomp", "pageNum"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "add-parent-task": AddParentTask,
    "add-child-task": AddChildTask,
    "progress-loading": Progress,
    "task-logs": TaskLogs,
    "task-comments": TaskComments
  },
  created() {
    console.log("props--------->");
    //console.log("props", this.selectedTask);
  },
  data() {
    return {
      selectedTab: "comments",
      activity: "comments",
      page: 1,
      commentPage: 1,
      overlay: false,
      maxdate: "2020-05-11 12:17",
      taskId: "",
      projectId: "",
      taskDeleteDialog: false,
      userId: this.$store.state.user.userId,
      sprints: [],
      assignees: [],
      editTask: true,
      // task: {},
      files: [],
      // taskObject: {},
      updatedIssue: "",
      updatedStatus: "",
      updatedSprint: "",
      issueTypes: "",
      component: "",
      errorMessage: "",
      successMessage: "",
      updatedTaskDueDate: null,
      updatedRemindOnDate: null,
      // taskDue: this.selectedTask.taskDueDateAt,
      uploadLoading: false,
      // taskAssignee: "",
      updatedTask: {
        taskName: "",
        taskAssignee: "",
        taskNotes: "",
        taskStatus: "",
        taskRemindOnDate: "",
        taskDueDateAt: ""
      },
      userExists: true,
      // taskStatus: this.task.taskStatus,
      // issueType: this.task.issueType,

      issueTypeList: [
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
  methods: {
    selectedVTab(component) {
      this.activity = component;
      if (component === "logs") {
      } else {
        this.$store.dispatch("comments/fetchTaskActivityComment", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });

        this.$store.dispatch(
          "comments/fetchTaskCommentLength",
          this.selectedTask.taskId
        );
      }
    },
    getUser() {
      this.$store.dispatch("user/fetchOwnUser", this.userId);
    },
    checkUserExists() {
      const index = this.people.findIndex(
        user => user.assigneeId === this.selectedTask.taskAssignee
      );
      if (index === -1) this.userExists = false;
      else this.userExists = true;
    },
    getMaxDueDate() {
      let stringDate = this.fetchProject.projectEndDate + "";
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10) + " " + "23:59";
      // console.log("max date : " + stringDate);
      return stringDate;
    },
    getMaxRemindDate() {
      let stringDate = this.updatedTaskDueDate + "";
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);

      // console.log("max date : " + stringDate);
      // if (stringDate === undefined) {
      //   return null;
      // } else {
      return stringDate + " " + "23:59";
      // }
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

    async deleteTask() {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId,
              type: "project"
            }
          }
        );
        // this.component = 'success-popup'
        this.$emit("listenChange");
        this.$emit("shrinkSideBar");
        this.taskDialogClosing();
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        // console.log(response.data);
        this.overlay = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("Error creating project", e);
      }
    },
    taskDialogClosing() {
      this.$emit("taskDialogClosing");
      Object.assign(this.$data, this.$options.data.apply(this));
      this.selectedTab = "comments";
    },
    async updateIssueType() {
      this.overlay = true;
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            issueType: this.updatedIssue
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);

        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });
        this.component = "success-popup";
        this.successMessage = "Type successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log("Error updating a status", e);
      }
    },
    // ------------- update task status ----------
    async updateStatus() {
      this.overlay = true;
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            taskStatus: this.updatedStatus
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });
        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("Error updating a status", e);
      }
    },
    async saveEditTaskName() {
      if (this.updatedTask.taskName != "") {
        this.overlay = true;
        // console.log("updatedTaskName ->", this.updatedTask.taskName);
        let response;
        try {
          response = await this.$axios.$put(
            `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
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
          this.$store.dispatch("activityLog/fetchTaskActivityLog", {
            taskId: this.selectedTask.taskId,
            startIndex: 0,
            endIndex: 10
          });
          if (this.selectedTask.isParent) {
            this.$store.dispatch("task/updateTask", {
              taskId: this.selectedTask.taskId,
              taskName: this.updatedTask.taskName
            });
          } else {
            this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
          }
          setTimeout(() => {
            this.close();
          }, 3000);
          this.overlay = false;
          this.editTask = true;
          console.log("edit task response", response);
        } catch (e) {
          console.log("Error updating the name", e);
          this.errorMessage = e.response.data;
          this.component = "error-popup";
          setTimeout(() => {
            this.close();
          }, 3000);
          this.editTask = true;
          this.overlay = false;
        }
      }
    },

    // ------ update task assignee ---------
    async changeAssignee() {
      this.overlay = true;
      console.log("assignee changed");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            taskAssignee: this.updatedTask.taskAssignee
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });
        this.component = "success-popup";
        this.successMessage = "Assignee successfully updated";
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);

        this.userExists = true;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log("Error updating a status", e);
      }
    },

    getAssigneeDetails(v) {
      // console.log("board list", this.projectSprints);
      this.checkUserExists();
      this.assignees = [];
      let assigneeSearchList = this.peopleList;
      for (let index = 0; index < assigneeSearchList.length; ++index) {
        let assignee = assigneeSearchList[index];
        this.assignees.push({
          name: assignee.assigneeFirstName + " " + assignee.assigneeLastName,
          id: assignee.assigneeId
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    // -------- update sprint ----------
    async changeTaskSprint() {
      this.overlay = true;
      // console.log("onchange sprint", this.updatedSprint);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/sprint`,
          {
            previousSprint: this.selectedTask.sprintId,
            newSprint: this.updatedSprint
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });
        // this.$store.dispatch("task/setSelectedTask", task);
        this.component = "success-popup";
        this.successMessage = "Sprint successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update sprint status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("Error updating a sprint", e);
      }
    },
    // ---------- update task note -----------
    async updateTaskNote() {
      this.overlay = true;
      // console.log("updatedTaskValue ->", this.updatedTask.taskNote);
      let response;

      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            taskNotes: this.updatedTask.taskNote
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });
        this.component = "success-popup";
        this.successMessage = "Note successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("edit task response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("Error updating a note", e);
      }
    },

    async updateTaskDates(type) {
      this.overlay = true;
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
        changedDate = {
          taskDueDate: dueDate
        };

        this.$store.dispatch("task/updateProjectDates", {
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
        this.$store.dispatch("task/updateProjectDates", {
          type: "remindDate",
          date: remindDate
        });
      }
      // console.log("dueDate", dueDate);
      // console.log("remindDate", remindDate);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          changedDate,
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });

        this.component = "success-popup";
        this.successMessage = "Date successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update task dates response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("Error updating a date", e);
      }
    },
    // --------- upload task files ----------

    async taskFileUpload() {
      this.overlay = true;
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
              `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/upload`,
              formData,
              {
                headers: {
                  user: this.userId
                }
              }
            );
            this.$store.dispatch("task/appendTaskFile", fileResponse.data);
            this.$store.dispatch("activityLog/fetchTaskActivityLog", {
              taskId: this.selectedTask.taskId,
              startIndex: 0,
              endIndex: 10
            });
            this.uploadLoading = false;
            this.component = "success-popup";
            this.successMessage = "File(s) successfully uploaded";
            setTimeout(() => {
              this.close();
            }, 3000);
            this.overlay = false;
            // console.log("file response", this.taskFiles);
          } catch (e) {
            this.overlay = false;
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
      this.overlay = false;
      this.files = null;
    },
    // ------------ file remove ---------
    async handleFileDelete(taskFileId) {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/upload/${taskFileId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        // console.log(response.data);
        this.$store.dispatch("task/removeTaskFile", taskFileId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10
        });
        this.component = "success-popup";
        this.successMessage = "File successfully deleted";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("Error deleting task", e);
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
  async created() {
    this.projectId = this.$route.params.projects;
  },
  computed: {
    taskUser() {
      if (Object.keys(this.selectedTaskUser).length === 0) {
        this.$store.dispatch(
          "user/setSelectedTaskUser",
          this.selectedTask.taskAssignee
        );
        return "";
      } else {
        return (
          this.selectedTaskUser.firstName + " " + this.selectedTaskUser.lastName
        );
      }
    },
    ...mapState({
      parent: state => state.task.parentTask,
      children: state => state.task.childTasks,
      people: state => state.task.userCompletionTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      projectAllTasks: state => state.task.allTasks,
      // projectId: state => state.project.project.projectId,
      selectedTaskUser: state => state.user.selectedTaskUser,
      taskFiles: state => state.task.taskFiles,
      selectedTask: state => state.task.selectedTask,
      fetchProject: state => state.project.project,
      parentTaskUser: state => state.user.parentTaskUser
    }),
    ...mapGetters(["getuserCompletionTasks"]),
    peopleList() {
      // console.log("people list", this.people);
      if (this.people.length == 0) {
        this.$store.dispatch(
          "task/fetchProjectUserCompletionTasks",
          this.$route.query.project
        );
      } else {
        return this.people;
      }
    },

    // taskAssignee: {
    //   get() {
    //     return this.selectedTask.taskAssignee;
    //   },
    //   set(assignee) {
    //     this.updatedTask.taskAssignee = assignee;
    //   }
    // },

    taskAssignee: {
      get() {
        this.getAssigneeDetails();
        if (this.updatedTask.taskAssignee == "") {
          return this.selectedTask.taskAssignee;
        } else {
          return this.updatedTask.taskAssignee;
        }
        // console.log("sprintId", this.selectedTask);
      },
      set(assignee) {
        // console.log("spid", sprintId);
        this.updatedTask.taskAssignee = assignee;
      }
    },

    taskName: {
      get() {
        // if (this.updatedTask.taskName == "") {
        return this.selectedTask.taskName;
        // } else return this.updatedTask.taskName;
      },
      set(name) {
        this.updatedTask.taskName = name;
      }
    },
    taskStatus: {
      get() {
        if (this.updatedStatus == "") {
          return this.selectedTask.taskStatus;
        } else {
          return this.updatedStatus;
        }
      },
      set(value) {
        // console.log("task status", value);
        this.updatedStatus = value;
      }
    },
    issueType: {
      get() {
        // this.issueTypes = this.selectedTask.issueType;
        // return this.selectedTask.issueType;

        if (this.updatedIssue == "") {
          this.issueTypes = this.selectedTask.issueType;
          return this.selectedTask.issueType;
        } else {
          this.issueTypes = this.updatedIssue;
          return this.updatedIssue;
        }
      },
      set(value) {
        this.updatedIssue = value;
        this.issueTypes = value;
        // console.log("issue type", this.updatedIssue);
      }
    },
    selectedSprint: {
      get() {
        this.getSprintDetails();
        if (this.updatedSprint == "") {
          return this.selectedTask.sprintId;
        } else {
          return this.updatedSprint;
        }
        // console.log("sprintId", this.selectedTask);
      },
      set(sprintId) {
        // console.log("spid", sprintId);
        this.updatedSprint = sprintId;
      }
    },
    taskNote: {
      get() {
        return this.selectedTask.taskNote;
      },
      set(value) {
        this.updatedTask.taskNote = value;
      }
    },

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
          this.selectedTask.taskReminderAt === "1970-01-01T05:30:00.000+0000"
        )
          return "Add Reminder Date";
        let stringDate = this.selectedTask.taskReminderAt + "";
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
