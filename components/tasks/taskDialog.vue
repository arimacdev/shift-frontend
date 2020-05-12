<template>
  <v-card width="100vw">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="taskDialogClosing()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold">
        {{
        taskName
        }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- <v-btn dark text @click="dialog = false">Save</v-btn> -->
        <button class :disabled="checkValidation">
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
                <span class="secondaryId">#{{selectedTask.secondaryTaskId}}</span>
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <div class="taskStatusDropdown">{{taskStatus}}</div>
            </v-col>
            <v-col sm="2" md="2">
              <!-- {{task.taskStatus.charAt(0).toUpperCase()+ task.taskStatus.slice(1)}} -->
            </v-col>
            <v-col sm="8" md="8" class="taskViewLinksDiv">
              <nuxt-link
                :to="'/projects/'  +  this.projectId"
                style="text-decoration: none;"
                target="_blank"
              >
                <v-icon size="22" color="#0083E2">mdi-folder-outline</v-icon>Project
              </nuxt-link>/
              <nuxt-link
                v-if="selectedTask.isParent == false"
                target="_blank"
                :to="'/task/' +    this.taskObject.parentTask.taskId + '/?project=' +  this.projectId"
                style="text-decoration: none;"
              >
                <v-icon size="22" color="#0083E2">mdi-calendar-check</v-icon>Parent Task
              </nuxt-link>
              <span v-if="selectedTask.isParent == false">/</span>

              <nuxt-link
                :to="'/task/' +  selectedTask.taskId + '/?project=' +  this.projectId"
                target="_blank"
                style="text-decoration: none; color: #B9B9B9"
              >
                <v-icon size="22" color="#B9B9B9">mdi-calendar-check-outline</v-icon>Current Task
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
                    maxlength="49"
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
                  <v-row class="addParentButtonRow" no-gutters>
                    <v-col sm="6" md="6" no-gutters></v-col>
                    <v-col sm="3" md="3" no-gutters>
                      <add-parent-task
                        v-if="taskObject.childTasks.length == 0 && selectedTask.isParent == true"
                        :taskId="selectedTask.taskId"
                      />
                    </v-col>
                    <v-col sm="3" md="3" no-gutters>
                      <add-child-task
                        v-if=" selectedTask.isParent == true"
                        :taskId="selectedTask.taskId"
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
                                v-if="
                                  taskObject.parentTask.taskStatus == 'closed'
                                "
                                size="25"
                                color="#2EC973"
                              >mdi-checkbox-marked-circle</v-icon>
                              <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{
                                taskObject.parentTask.taskName
                                }}
                              </v-list-item-title>
                            </v-list-item-content>
                            <div>
                              <v-list-item-action>
                                <v-list-item-sub-title :class="dueDateCheck(taskObject.parentTask)">
                                  {{
                                  getProjectDates(
                                  taskObject.parentTask.taskDueDateAt
                                  )
                                  }}
                                </v-list-item-sub-title>
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
                            <span>- {{ taskObject.childTasks.length }} Task(s)</span>
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
                        <v-icon size="30" color="#0BAFFF">mdi-checkbox-multiple-blank-outline</v-icon>
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
                        <v-icon size="30" color="#6FCD17">mdi-animation-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Board</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="12" md="12">
                            <v-select
                              v-if=" selectedTask.isParent == true"
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
                          <!-- <option>Naveen Perera</option> -->
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
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Due Date</v-list-item-subtitle>
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
                  <div class="pickerButtonDiv">
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
                  </div>

                  <!-- ----------- Reminder date section --------- -->

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#7CDD00">mdi-clock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Remind Date</v-list-item-subtitle>
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
                  <div class="pickerButtonDiv">
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
                  </div>

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
                        <v-list-item-subtitle class="fileSubTitles">125.54kB</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">
                          {{
                          taskUser
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

    <div class="RestTaskLogDiv">
      <div class="RestTaskLogTitle">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">Task Log</v-list-item-title>
        </v-list-item-content>
      </div>
    </div>
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
  props: ["projectId", "people", "taskObject"],
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
      // task: {},
      files: [],
      taskObject: {},
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
        { name: "Reopened", id: "reopened" },
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
    async deleteTask() {
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
        taskDialogClosing();
        console.log(response.data);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
    taskDialogClosing() {
      this.$emit("taskDialogClosing");
      Object.assign(this.$data, this.$options.data.apply(this));
    },
    async updateIssueType() {
      console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            taskStatus: this.taskStatus,
            issueType: this.updatedIssue
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.component = "success-popup";
        this.successMessage = "Type successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    // ------------- update task status ----------
    async updateStatus() {
      console.log("onchange updated status ->");
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
        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    async saveEditTaskName() {
      console.log("updatedTaskName ->", this.updatedTask.taskName);
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
      }
    },

    // ------ update task assignee ---------
    async changeAssignee() {
      console.log("assignee changed");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
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
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    // -------- update sprint ----------
    async changeTaskSprint() {
      console.log("onchange sprint", this.updatedSprint);
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
        this.component = "success-popup";
        this.successMessage = "Sprint successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update sprint status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a sprint", e);
      }
    },
    // ---------- update task note -----------
    async updateTaskNote() {
      console.log("updatedTaskValue ->", this.updatedTask.taskNote);
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
        this.component = "success-popup";
        this.successMessage = "Note successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("edit task response", response);
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
    // async updateTaskDates(type) {
    //   console.log(
    //     "task due updated ---------> " + this.updatedTask.taskDueDateAt
    //   );
    //   console.log(
    //     "task remind updated ---------> " + this.updatedTask.taskRemindOnDate
    //   );
    //   let dueDate;
    //   let remindDate;
    //   if (type === "dueDate" && this.updatedTask.taskDueDateAt != "") {
    //     console.log("inside due date");
    //     dueDate = new Date(this.updatedTask.taskDueDateAt);
    //     const isoDate = new Date(
    //       dueDate.getTime() - dueDate.getTimezoneOffset() * 60000
    //     ).toISOString();
    //     console.log("iso edit due date", isoDate);
    //     dueDate = isoDate;
    //     remindDate = this.updatedTask.taskRemindOnDate;
    //   } else if (this.updatedTask.taskRemindOnDate != "") {
    //     console.log("inside remind on date");
    //     remindDate = new Date(this.updatedTask.taskRemindOnDate);
    //     const isoDate = new Date(
    //       remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
    //     ).toISOString();
    //     console.log("iso edit remind date", isoDate);
    //     dueDate = this.updatedTask.taskDueDateAt;
    //     remindDate = isoDate;
    //   }
    //   console.log("dueDate", dueDate);
    //   console.log("remindDate", remindDate);
    //   let response;
    //   try {
    //     response = await this.$axios.$put(
    //       `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
    //       {
    //         taskDueDate: dueDate,
    //         taskRemindOnDate: remindDate
    //       },
    //       {
    //         headers: {
    //           user: this.userId
    //         }
    //       }
    //     );
    //     this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
    //     this.component = "success-popup";
    //     this.successMessage = "Date successfully updated";
    //     setTimeout(() => {
    //       this.close();
    //     }, 3000);
    //     console.log("update task dates response", response);
    //   } catch (e) {
    //     this.errorMessage = e.response.data;
    //     this.component = "error-popup";
    //     setTimeout(() => {
    //       this.close();
    //     }, 3000);
    //     console.log("Error updating a status", e);
    //   }
    // },
    async updateTaskDates(type) {
      let dueDate;
      let remindDate;
      if (type === "dueDate") {
        console.log("inside due date");
        dueDate = new Date(this.updatedTaskDueDate);
        const isoDate = new Date(
          dueDate.getTime() - dueDate.getTimezoneOffset() * 60000
        ).toISOString();
        console.log("iso edit due date", isoDate);
        dueDate = isoDate;
        remindDate = this.selectedTask.taskReminderAt;
      } else {
        console.log("inside remind on date");
        remindDate = new Date(this.updatedRemindOnDate);
        const isoDate = new Date(
          remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
        ).toISOString();
        console.log("iso edit remind date", isoDate);
        dueDate = this.selectedTask.taskDueDateAt;
        remindDate = isoDate;
      }
      console.log("dueDate", dueDate);
      console.log("remindDate", remindDate);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}`,
          {
            taskDueDate: dueDate,
            taskRemindOnDate: remindDate
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.component = "success-popup";
        this.successMessage = "Date successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update task dates response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a date", e);
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
              `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/upload`,
              formData,
              {
                headers: {
                  user: this.userId
                }
              }
            );
            this.$store.dispatch("task/appendTaskFile", fileResponse.data);
            this.uploadLoading = false;
            this.component = "success-popup";
            this.successMessage = "File(s) successfully uploaded";
            setTimeout(() => {
              this.close();
            }, 3000);
            console.log("file response", this.taskFiles);
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
          `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/upload/${taskFileId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        console.log(response.data);
        this.$store.dispatch("task/removeTaskFile", taskFileId);
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
      console.log("select =========>" + this.taskDueDate);
      // this.issueType = issueType;
    },
    dueDateCheck(task) {
      console.log("check due date color", task);
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
        console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          console.log("overdue");
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
    },
    getSprintDetails(v) {
      console.log("board list", this.projectSprints);
      this.sprints = [];
      let sprintSearchList = this.projectSprints;
      for (let index = 0; index < sprintSearchList.length; ++index) {
        let sprint = sprintSearchList[index];
        this.sprints.push({
          name: sprint.sprintName,
          id: sprint.sprintId
        });
      }
      console.log("nameList", this.states);
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
      people: state => state.task.userCompletionTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      projectAllTasks: state => state.task.allTasks,
      projectId: state => state.project.project.projectId,
      selectedTaskUser: state => state.user.selectedTaskUser,
      taskFiles: state => state.task.taskFiles,
      selectedTask: state => state.task.selectedTask
    }),
    ...mapGetters(["getuserCompletionTasks"]),
    peopleList() {
      console.log("people list", this.people);
      if (this.people.length == 0) {
        this.$store.dispatch(
          "task/fetchProjectUserCompletionTasks",
          this.$route.query.project
        );
      } else {
        return this.people;
      }
    },

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
    taskStatus: {
      get() {
        if (this.updatedStatus == "") {
          return this.selectedTask.taskStatus;
        } else {
          return this.updatedStatus;
        }
      },
      set(value) {
        console.log("task status", value);
        this.updatedStatus = value;
      }
    },
    issueType: {
      get() {
        this.issueTypes = this.selectedTask.issueType;
        // return this.selectedTask.issueType;

        if (this.updatedIssue == "") {
          return this.selectedTask.issueType;
        } else {
          return this.updatedIssue;
        }
      },
      set(value) {
        this.updatedIssue = value;
        this.issueTypes = value;
        console.log("issue type", this.updatedIssue);
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
        console.log("sprintId", this.selectedTask);
      },
      set(sprintId) {
        console.log("spid", sprintId);
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

    taskDueDate: {
      get() {
        if (
          this.updatedTaskDueDate == null ||
          this.updatedTaskDueDate == "1970-01-01T05:30:00.000+0000"
        )
          this.updatedTaskDueDate = this.selectedTask.taskDueDateAt;

        return this.updatedTaskDueDate;
      },
      set(value) {
        console.log("set updated", value);
        this.updatedTaskDueDate = value;
      }
    },

    taskRemindOnDate: {
      get() {
        if (
          this.updatedRemindOnDate == null ||
          this.updatedRemindOnDate == "1970-01-01T05:30:00.000+0000"
        )
          this.updatedRemindOnDate = this.selectedTask.taskReminderAt;
        return this.updatedRemindOnDate;
      },
      set(value) {
        console.log("updated remind on ->", value);
        this.updatedRemindOnDate = value;
      }
    }
  }
};
</script>
