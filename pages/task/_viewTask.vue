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

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
        <div class="content-div">
          <v-list-item-title class="font-weight-bold">
            {{
            this.taskName
            }}
          </v-list-item-title>
          <v-list-item-action class="viewTaskDelete">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  size="30px"
                  v-on="on"
                  @click="taskDeleteDialog = true"
                  color="#FFFFFF"
                >mdi-delete-circle</v-icon>
              </template>
              <span>Delete task</span>
            </v-tooltip>
          </v-list-item-action>
        </div>
      </div>
    </v-toolbar>
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
    <div class="viewTaskContent overflow-y-auto">
      <div class="taskRestFormDiv">
        <form>
          <v-row class="mb-12 formRowSpec" no-gutters>
            <v-col sm="2" md="2">
              <div class="taskViewTitle">
                Task -
                <span class="secondaryId">#{{this.task.secondaryTaskId}}</span>
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <div class="taskStatusDropdown">{{this.task.taskStatus }}</div>
            </v-col>
            <v-col sm="8" md="8" class="taskViewLinksDiv">
              <nuxt-link :to="'/projects/'  +  this.projectId" style="text-decoration: none;">
                <v-icon size="22" color="#0083E2">mdi-folder-outline</v-icon>Project
              </nuxt-link>/
              <nuxt-link
                v-if="this.task.isParent == false"
                :to="'/task/' +   this.parentTask.taskId + '/?project=' +  this.projectId"
                style="text-decoration: none;"
              >
                <v-icon size="22" color="#0083E2">mdi-calendar-check</v-icon>
                {{this.parentTask.secondaryTaskId}}
              </nuxt-link>
              <span v-if="this.task.isParent == false">/</span>

              <nuxt-link
                :to="'/task/' +  this.task.taskId + '/?project=' +  this.projectId"
                style="text-decoration: none; color: #B9B9B9"
                class="currentTaskColor"
              >
                <v-icon size="22" color="#B9B9B9">mdi-calendar-check-outline</v-icon>
                {{this.task.secondaryTaskId}}
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
                  <v-row class="addParentButtonRow" no-gutters>
                    <v-col sm="6" md="6" no-gutters></v-col>
                    <v-col sm="3" md="3" no-gutters>
                      <add-parent-task
                        v-if="this.children.length == 0 && this.selectedTask.isParent == true"
                        :taskId="this.selectedTask.taskId"
                        :projectId="this.projectId"
                      />
                    </v-col>
                    <v-col sm="3" md="3" no-gutters>
                      <add-child-task
                        v-if=" this.selectedTask.isParent == true"
                        :taskId="this.selectedTask.taskId"
                        :projectId="this.projectId"
                      />
                    </v-col>
                  </v-row>

                  <!-- ----------- parent task section --------- -->
                  <div v-if="!this.selectedTask.isParent">
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
                                v-if="this.parentTask.taskStatus == 'closed'"
                                size="25"
                                color="#2EC973"
                              >mdi-checkbox-marked-circle</v-icon>
                              <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                            </v-list-item-action>
                            <v-list-item-action
                              style="font-size: 14px; font-weight: 800; padding-right: 20px"
                            >
                              {{
                              this.parentTask.secondaryTaskId
                              }}
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                {{
                                this.parentTask.taskName
                                }}
                              </v-list-item-title>
                            </v-list-item-content>
                            <div>
                              <v-list-item-action>
                                <v-list-item-sub-title :class="dueDateCheck(this.parentTask)">
                                  {{
                                  getProjectDates(
                                  this.parentTask.taskDueDateAt
                                  )
                                  }}
                                </v-list-item-sub-title>
                              </v-list-item-action>
                            </div>
                            <div>
                              <v-list-item-avatar size="25">
                                <v-img
                                  v-if="this.parentTaskUser.profileImage != null && this.parentTaskUser.profileImage != ''"
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
                                    this.parentTask.taskId +
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
                  <div v-if="this.selectedTask.isParent">
                    <div class="expansionViewHeader">
                      <v-list-group>
                        <template v-slot:activator>
                          <v-list-item-icon>
                            <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title class="viewTaskFontColors">
                            Child Tasks:
                            <span>{{ childrenCount }} Task(s)</span>
                          </v-list-item-title>
                        </template>

                        <v-list-item-content class="parentChildTaskList">
                          <!-- ---------- task list --------- -->
                          <!-- <nuxt-link :to="'/task/' + child.taskId + '/?project=' + this.projectId" style="text-decoration: none;"> -->

                          <div
                            class="taskViewTaskListContent"
                            v-for="(child, index) in children"
                            :key="index"
                          >
                            <v-list-item>
                              <v-list-item-action>
                                <v-icon
                                  v-if="child.taskStatus == 'closed'"
                                  size="25"
                                  color="#2EC973"
                                >mdi-checkbox-marked-circle</v-icon>
                                <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                              </v-list-item-action>
                              <v-list-item-action
                                style="font-size: 14px; font-weight: 800; padding-right: 20px"
                              >
                                {{
                                child.secondaryTaskId
                                }}
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{
                                  child.taskName
                                  }}
                                </v-list-item-title>
                              </v-list-item-content>
                              <div>
                                <v-list-item-action>
                                  <v-list-item-sub-title>
                                    {{
                                    getProjectDates(child.taskDueDateAt)
                                    }}
                                  </v-list-item-sub-title>
                                </v-list-item-action>
                              </div>
                              <div>
                                <v-list-item-avatar size="25">
                                  <v-img
                                    v-if="child.taskAssigneeProfileImage != null && child.taskAssigneeProfileImage != ''"
                                    :src="child.taskAssigneeProfileImage"
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
                                      child.taskId +
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
                        <v-icon size="30" color="#0BAFFF">mdi-checkbox-multiple-blank-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Task Type</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="6" md="6">
                            <v-select
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
                              dense
                              v-model="selectedSprint"
                              :items="getAllSprints()"
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
                              dense
                              v-model="selectedSprint"
                              :items="getAllSprints()"
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
                          class="rightColumnItemsText"
                          @change="changeAssignee"
                        >
                          <!-- <option>Naveen Perera</option> -->
                          <!-- <option value disabled>
                            {{
                            taskUser
                            }}
                          </option>-->
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
                    <v-row>
                      <v-col md="10">
                        <VueCtkDateTimePicker
                          color="#3f51b5"
                          id="duePicker"
                          class
                          v-model="taskDueDate"
                          label="Add due date"
                          right
                        />
                      </v-col>
                      <v-col md="2">
                        <v-btn v-on="on" icon color="deep-orange">
                          <v-icon
                            @click="updateTaskDates('dueDate')"
                          >mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
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
                    <v-row>
                      <v-col md="10">
                        <VueCtkDateTimePicker
                          color="#3f51b5"
                          id="reminderPicker"
                          class
                          v-model="taskRemindOnDate"
                          label="Add remind date"
                          right
                        />
                      </v-col>
                      <v-col md="2">
                        <v-btn v-on="on" icon color="deep-orange">
                          <v-icon
                            @click="updateTaskDates('remindOn')"
                          >mdi-checkbox-marked-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
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
                        @click="taskFileUpload()"
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
                  <div class="filesViewDiv" v-for="(file, index) in fileList" :key="index">
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
                          getUserDetails(file.taskFileCreator)
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
    <div @click="close" class="taskPopupPopups">
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
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import AddParentTask from "~/components/tasks/addParentTask";
import AddChildTask from "~/components/tasks/addChildTask";
import NavigationDrawer from "~/components/navigationDrawer";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";

export default {
  components: {
    NavigationDrawer,
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
      userId: "",
      sprints: [],
      editTask: true,
      // parentTask: {},
      parentProfile: {},
      updatedTaskDueDate: null,
      updatedRemindOnDate: null,
      // taskAssignee: "",
      task: {},
      updatedTaskName: "",
      updatedTask: {
        taskName: "",
        taskAssignee: ""
      },
      updatedIssue: "",
      updatedStatus: "",
      issueTypes: "",
      issueStatus: "",
      componentUsers: [],
      files: [],
      component: "",
      errorMessage: "",
      successMessage: "",
      // issueTypes: ['development', 'qa', 'bug', 'operational'],
      // taskStatuses: ['open', 'pending', 'closed'],
      allSprints: [{ sprintId: "default", sprintName: "Default" }],
      fetchSprintCount: 0,
      fetchFilesCount: 0,
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
        { name: "ReOpened", id: "reOpened" },
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
            type: "project"
          }
        }
      );
      this.task = taskResponse.data;
      this.$store.dispatch("task/setSelectedTask", taskResponse.data);
      // console.log("Selected Task get response", this.task);
    } catch (e) {
      console.log("Error fetching task", e);
    }
    if (this.task.isParent) {
      // console.log("parent task");
      this.$store.dispatch("task/fetchChildren", {
        projectId: this.$route.query.project,
        taskId: this.$route.params.viewTask
      });
    } else {
      // console.log("child task");
      this.$store.dispatch("task/fetchParentTask", {
        projectId: this.$route.query.project,
        taskId: this.task.parentId
      });
    }
  },
  methods: {
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId,
              type: "project"
            }
          }
        );
        this.$emit("listenChange");
        this.$emit("shrinkSideBar");
        window.location.href = "/projects/" + this.projectId;

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
    async updateStatus() {
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskStatus: this.updatedTask.taskStatus
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
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
        // console.log("Error updating a status", e);
      }
    },
    async updateIssueType() {
      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
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
        // console.log("Error updating a status", e);
      }
    },
    close() {
      this.component = "";
    },
    async changeTaskSprint() {
      // console.log("onchange sprint", this.updatedTask.sprintId);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}/sprint`,
          {
            previousSprint: this.task.sprintId,
            newSprint: this.updatedTask.sprintId
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Sprint successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update sprint status response", response);
      } catch (e) {
        console.log("Error updating a sprint", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a sprint", e);
      }
    },
    async changeAssignee() {
      // console.log("onchange updated assignee ->", this.taskAssignee);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskAssignee: this.updatedTask.taskAssignee
          },
          {
            headers: {
              user: this.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "Assignee successfully updated";
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
    async updateTaskNote() {
      // console.log("updatedTaskValue ->", this.updatedTask.taskNotes);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
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
    async saveEditTaskName() {
      // console.log("updatedTaskName ->", this.updatedTask.taskName);
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
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
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("UPDATED", this.$store.state.task.myTasks);
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
    },
    getAllSprints() {
      // console.log("lenght", this.projectSprints.length);
      if (this.projectSprints.length != 0) {
        let sprints = this.projectSprints;
        let sprintList = [];
        for (let index = 0; index < sprints.length; ++index) {
          let sprint = sprints[index];
          sprintList.push({
            name: sprint.sprintName,
            id: sprint.sprintId
          });
        }
        return sprintList;
      } else if (this.fetchSprintCount < 1) {
        // console.log("sprint dispatched actually");
        this.$store.dispatch(
          "sprints/sprint/fetchAllProjectSprints",
          this.$route.query.project
        );
        this.fetchSprintCount += 1;
      }
      // return [];
    },
    async updateTaskDates(type) {
      console.log("triggered");
      let dueDate;
      let remindDate;
      let changedDate = {};
      console.log(
        "dates ========> " +
          this.updatedTaskDueDate +
          "/" +
          this.updatedRemindOnDate
      );
      if (
        type === "dueDate" &&
        this.updatedTaskDueDate != "" &&
        this.updatedTaskDueDate != null
      ) {
        dueDate = new Date(this.updatedTaskDueDate);
        const isoDate = new Date(
          dueDate.getTime() - dueDate.getTimezoneOffset() * 60000
        ).toISOString();
        dueDate = isoDate;
        remindDate = this.updatedRemindOnDate;
        changedDate = {
          taskDueDate: dueDate
        };
        this.$store.dispatch("task/updateProjectDates", {
          type: "dueDate",
          date: dueDate
        });
      } else if (type === "remindOn" && this.updatedRemindOnDate != null) {
        remindDate = new Date(this.updatedRemindOnDate);
        const isoDate = new Date(
          remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
        ).toISOString();
        remindDate = isoDate;
        dueDate = this.updatedRemindOnDate;
        changedDate = {
          taskRemindOnDate: remindDate
        };
        this.$store.dispatch("task/updateProjectDates", {
          type: "remindDate",
          date: remindDate
        });
      }
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          changedDate,
          {
            headers: {
              user: this.userId
            }
          }
        );
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
        console.log("Error updating a date", e);
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
              `/projects/${this.projectId}/tasks/${this.task.taskId}/upload`,
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
            // console.log("file response", this.taskFiles);
          } catch (e) {
            // console.log("Error adding group file", e);
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
    async handleFileDelete(taskFileId) {
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.task.taskId}/upload/${taskFileId}`,
          {
            data: {},
            headers: {
              user: this.userId
            }
          }
        );
        // console.log(response.data);
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

    getUserDetails(userId) {
      // console.log("checkuser", userId, this.selectedTaskUser.userId);

      if (userId == this.selectedTaskUser.userId) {
        return (
          this.selectedTaskUser.firstName + " " + this.selectedTaskUser.lastName
        );
      } else if (
        userId != this.selectedTaskUser.userId &&
        this.componentUsers.length === 0
      ) {
        // this.$store.dispatch("user/setComponentUser", userId);
        let fileUser;
        const index = this.componentUsers.findIndex(i => i.userId === userId);
        if (index === -1) {
          this.$axios
            .get(`/users/${userId}`)
            .then(response => {
              // console.log("component user---->", response.data.data);
              // this.userList = response.data.data;
              // console.log("another user", response.data.data);
              this.componentUsers.push(response.data.data);
              let fileUser = response.data.data;
              return fileUser.firstName;
            })
            .catch(e => {
              console.log("error", e);
            });
        }
      } else {
        const index = this.componentUsers.findIndex(i => i.userId === userId);
        if (index > -1) {
          const user = this.componentUsers[index];
          return user.firstName + " " + user.lastName;
        }
      }
    }
  },
  computed: {
    ...mapState({
      selectedTask: state => state.task.selectedTask,
      selectedTaskUser: state => state.user.selectedTaskUser,
      parentTaskUser: state => state.user.parentTaskUser,
      componentUser: state => state.user.componentUser,
      people: state => state.task.userCompletionTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      taskFiles: state => state.task.taskFiles,
      children: state => state.task.childTasks,
      parentTask: state => state.task.parentTask
    }),
    ...mapGetters(["getuserCompletionTasks"]),

    taskUser() {
      if (Object.keys(this.selectedTaskUser).length === 0) {
        this.$store.dispatch(
          "user/setSelectedTaskUser",
          this.task.taskAssignee
        );
        return "";
      } else {
        return (
          this.selectedTaskUser.firstName + " " + this.selectedTaskUser.lastName
        );
      }
    },

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

    fileList() {
      if (this.taskFiles.length == 0 && this.fetchFilesCount < 1) {
        // console.log("file length dispatch", this.taskFiles.length);
        this.$store.dispatch("task/fetchTaskFiles", {
          projectId: this.projectId,
          taskId: this.taskId
        });
        this.fetchFilesCount += 1;
      } else {
        return this.taskFiles;
      }
    },

    childrenCount() {
      return this.children.length;
    },

    taskAssignee: {
      get() {
        return this.task.taskAssignee;
      },
      set(assignee) {
        this.updatedTask.taskAssignee = assignee;
      }
    },

    taskName: {
      get() {
        if (this.updatedTask.taskName == "") {
          return this.task.taskName;
        } else return this.updatedTask.taskName;
      },
      set(name) {
        this.updatedTask.taskName = name;
      }
    },
    taskStatus: {
      get() {
        // console.log("issueStatus", this.issueStatus);
        if (this.issueStatus == "") {
          return this.task.taskStatus;
        } else {
          return this.issueStatus;
        }
        // this.issueStatus = this.task.taskStatus;

        // return this.task.taskStatus;
      },
      set(value) {
        this.updatedTask.taskStatus = value;
      }
    },
    issueType: {
      get() {
        this.issueTypes = this.task.issueType;
        return this.task.issueType;
      },
      set(value) {
        this.updatedIssue = value;
        this.issueTypes = value;
        this.issueStatus = "pending";
        // console.log("issue type", this.updatedIssue);
      }
    },
    selectedSprint: {
      get() {
        this.getAllSprints();
        return this.task.sprintId;
      },
      set(value) {
        this.updatedTask.sprintId = value;
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
    taskDueDate: {
      get() {
        if (
          this.updatedTaskDueDate == null ||
          this.updatedTaskDueDate === "1970-01-01T05:30:00.000+0000"
        )
          this.updatedTaskDueDate = this.task.taskDueDateAt;

        return this.updatedTaskDueDate;
      },
      set(value) {
        // console.log("set updated", value);
        this.updatedTaskDueDate = value;
      }
    },
    taskRemindOnDate: {
      get() {
        if (
          this.updatedRemindOnDate == null ||
          this.updatedRemindOnDate === "1970-01-01T05:30:00.000+0000"
        )
          this.updatedRemindOnDate = this.task.taskReminderAt;

        return this.updatedRemindOnDate;
      },
      set(value) {
        // console.log("updated remind on ->", value);
        this.updatedRemindOnDate = value;
      }
    }
  }
};
</script>
