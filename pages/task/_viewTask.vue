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
            this.taskName
          }}</v-list-item-title>
          <v-list-item-action class="viewTaskDelete">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  size="30px"
                  v-on="on"
                  @click="taskDeleteDialog = true"
                  color="#FFFFFF"
                  >mdi-delete-circle</v-icon
                >
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
          <v-icon
            class="deletePopupIcon"
            size="60"
            color="deep-orange lighten-1"
            >mdi-alert-outline</v-icon
          >
          <br />
          <span class="alertPopupTitle">Delete Task</span>
          <br />
          <span class="alertPopupText">
            You're about to permanantly delete this task, its comments and
            attachments, and all of its data. If you're not sure, you can cancel
            this action.
          </span>
        </div>

        <div class="popupBottom">
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="success"
              class="text-capitalize"
              depressed
              width="100px"
              @click="taskDeleteDialog = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
            <v-btn
              depressed
              class="text-capitalize"
              color="error"
              width="100px"
              @click="
                taskDeleteDialog = false;
                taskDialog = false;
                deleteTask();
              "
              >Delete</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- ---------------------- end popup ------------------ -->

    <div class="viewTaskContent overflow-y-auto">
      <div class="tabsSection">
        <v-tabs
          height="40px"
          slider-color="#0c0c5a"
          slider-size="3"
          v-model="selectedTab"
        >
          <v-tab
            class="text-capitalize font-weight-bold tabInactiveStyle"
            active-class="tabTitleStyle"
            key="tasks"
            @click="selectedVTab('tasks')"
            >Tasks</v-tab
          >
          <v-tab
            class="text-capitalize font-weight-bold tabInactiveStyle"
            active-class="tabTitleStyle"
            key="comments"
            @click="selectedVTab('comments')"
            >Comments</v-tab
          >
          <v-tab
            class="text-capitalize font-weight-bold tabInactiveStyle"
            active-class="tabTitleStyle"
            key="logs"
            @click="selectedVTab('logs')"
            >Logs</v-tab
          >
        </v-tabs>
      </div>

      <div v-if="taskView" class="taskRestFormDivUpdated">
        <form>
          <v-row class="mb-12 formRowSpec" no-gutters>
            <v-col sm="2" md="2">
              <div class="taskViewTitle">
                Task -
                <span class="secondaryId"
                  >#{{ this.task.secondaryTaskId }}</span
                >
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <!-- <div class="taskStatusDropdown">{{ this.task.taskStatus }}</div> -->

              <div>
                <v-row class="mb-12" no-gutters>
                  <v-col class="statusSection">
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'development'"
                      v-model="taskStatus"
                      :items="development"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      :background-color="statusCheck(this.task.taskStatus)"
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'qa'"
                      v-model="taskStatus"
                      :items="qa"
                      :background-color="statusCheck(this.task.taskStatus)"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'design'"
                      v-model="taskStatus"
                      :items="design"
                      :background-color="statusCheck(this.task.taskStatus)"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'bug'"
                      v-model="taskStatus"
                      :items="bug"
                      :background-color="statusCheck(this.task.taskStatus)"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'operational'"
                      v-model="taskStatus"
                      :items="operational"
                      :background-color="statusCheck(this.task.taskStatus)"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'preSales'"
                      v-model="taskStatus"
                      :items="preSales"
                      :background-color="statusCheck(this.task.taskStatus)"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                    <v-select
                      :menu-props="{ maxHeight: '500' }"
                      dense
                      v-if="this.issueTypes == 'general'"
                      v-model="taskStatus"
                      :items="general"
                      :background-color="statusCheck(this.task.taskStatus)"
                      item-text="name"
                      item-value="id"
                      solo
                      flat
                      class="createFormElements"
                      @change="updateStatus"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-action>
                            <div
                              style="height: 15px; width: 15px"
                              :class="statusCheck(data.item.id)"
                            ></div>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title
                              v-html="data.item.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col sm="8" md="8" class="taskViewLinksDiv">
              <nuxt-link
                :to="'/projects/' + this.projectId"
                style="text-decoration: none"
              >
                <v-icon size="18" color="#0083E2">icon-project</v-icon
                >Project </nuxt-link
              >/
              <nuxt-link
                v-if="this.task.isParent == false"
                :to="
                  '/task/' +
                  this.parentTask.taskId +
                  '/?project=' +
                  this.projectId
                "
                style="text-decoration: none"
              >
                <v-icon size="18" color="#0083E2">icon-task</v-icon>
                {{ this.parentTask.secondaryTaskId }}
              </nuxt-link>
              <span v-if="this.task.isParent == false">/</span>

              <nuxt-link
                :to="
                  '/task/' + this.task.taskId + '/?project=' + this.projectId
                "
                style="text-decoration: none; color: #b9b9b9"
                class="currentTaskColor"
              >
                <v-icon size="18" color="#B9B9B9">icon-task</v-icon>
                {{ this.task.secondaryTaskId }}
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
                        >mdi-pencil-circle</v-icon
                      >
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
              <v-col sm="6" md="6">
                <div class="leftSideColumn">
                  <!-- -------------- task type section ------------- -->
                  <div class="expansionViewHeader updatedHeaderSection">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="25" color="#0BAFFF">icon-task</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Task Type</v-list-item-title
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

                  <div class="addParentButtonRow" no-gutters>
                    <div class="addChBtnSection">
                      <add-parent-task
                        v-if="
                          children.length == 0 &&
                          selectedTask.isParent == true &&
                          children.length == 0
                        "
                        :taskId="this.selectedTask.taskId"
                        :projectId="this.projectId"
                      />
                    </div>
                    <div class="addChBtnSection">
                      <add-child-task
                        v-if="selectedTask.isParent == true"
                        :taskId="selectedTask.taskId"
                        :projectId="this.projectId"
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <!-- ----------- parent task section --------- -->
                  <div v-if="!this.selectedTask.isParent">
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
                            <v-list-item-action
                              style="
                                font-size: 14px;
                                font-weight: 800;
                                padding-right: 20px;
                              "
                            >
                              {{ this.parentTask.secondaryTaskId }}
                            </v-list-item-action>
                            <v-list-item-content style="width: 200px">
                              <v-list-item-title>
                                {{ this.parentTask.taskName }}
                              </v-list-item-title>
                            </v-list-item-content>
                            <div>
                              <v-list-item-action>
                                <v-list-item-sub-title
                                  :class="dueDateCheck(this.parentTask)"
                                >
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
                                  v-if="
                                    this.parentTaskUser.profileImage != null &&
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
                                  this.parentTask.taskId +
                                  '/?project=' +
                                  projectId
                                "
                                style="text-decoration: none"
                                target="_blank"
                              >
                                <v-icon size="15">mdi-open-in-new</v-icon>
                              </nuxt-link>
                            </div>
                          </v-list-item>
                        </div>
                      </v-list-item-content>
                    </div>
                    <v-divider></v-divider>
                  </div>
                  <!-- -------------- child tasks section ----------- -->
                  <div v-if="this.selectedTask.isParent == true">
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
                            <span>- {{ childrenCount }} Task(s)</span>
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
                                  >mdi-checkbox-marked-circle</v-icon
                                >
                                <v-icon v-else size="30" color="#FFFFFF"
                                  >mdi-checkbox-blank-circle</v-icon
                                >
                              </v-list-item-action>
                              <v-list-item-action
                                style="
                                  font-size: 14px;
                                  font-weight: 800;
                                  padding-right: 20px;
                                "
                              >
                                {{ childTask.secondaryTaskId }}
                              </v-list-item-action>

                              <v-list-item-content style="width: 200px">
                                <v-list-item-title>
                                  {{ childTask.taskName }}
                                </v-list-item-title>
                              </v-list-item-content>

                              <div>
                                <v-list-item-action>
                                  <v-list-item-sub-title
                                    :class="dueDateCheck(childTask)"
                                  >
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
                                      childTask.taskAssigneeProfileImage != ''
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
                                  style="text-decoration: none"
                                  target="_blank"
                                >
                                  <v-icon size="15">mdi-open-in-new</v-icon>
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

                  <!-- -------------- project board section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="25" color="#6FCD17">icon-board</v-icon>
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
                              v-if="selectedTask.isParent == true"
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

                  <!-- --------- assignee section ---------- -->

                  <div class="expansionViewHeaderUpdated">
                    <v-list-item class>
                      <v-list-item-icon>
                        <v-icon size="25" color="#0C97A5">icon-assignee</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Assignee</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <div class="updatedSectionActions">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="12" md="12">
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
                          </v-col>
                        </v-row>
                      </div>
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>

                  <!-- ----------- Due date section --------- -->

                  <div class="expansionViewHeaderUpdated">
                    <v-list-item class>
                      <v-list-item-icon>
                        <v-icon size="25" color="#66B25F"
                          >mdi-calendar-blank-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Due Date</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <div class="updatedSectionActionsDates">
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="dueDate"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dueDate"
                              solo
                              flat
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              @focus="
                                dueDatePicker = true;
                                dueTimePicker = false;
                              "
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            :max="
                              this.fetchProject.projectEndDate.substr(0, 10)
                            "
                            v-if="dueDatePicker"
                            v-model="dueDatePart"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="
                                modal = false;
                                dueDatePicker = false;
                                dueTimePicker = false;
                              "
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="
                                dueDatePicker = false;
                                dueTimePicker = true;
                              "
                              >OK</v-btn
                            >
                          </v-date-picker>
                          <v-time-picker
                            v-if="dueTimePicker"
                            v-model="dueTimePart"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="
                                modal = false;
                                dueDatePicker = false;
                                dueTimePicker = false;
                              "
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="
                                $refs.dialog.save(
                                  dueDatePart + ' ' + dueTimePart
                                )
                              "
                              >OK</v-btn
                            >
                          </v-time-picker>
                        </v-dialog>
                      </div>
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>

                  <!-- ----------- Remind date section --------- -->

                  <div class="expansionViewHeaderUpdated">
                    <v-list-item class>
                      <v-list-item-icon>
                        <v-icon size="25" color="#DCB74E"
                          >mdi-clock-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Remind</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <div class="updatedSectionActionsDates">
                        <v-dialog
                          ref="RemindDialog"
                          v-model="modalRemind"
                          :return-value.sync="remindDate"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="remindDate"
                              solo
                              flat
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              @focus="
                                remindDatePicker = true;
                                remindTimePicker = false;
                              "
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            :max="
                              this.fetchProject.projectEndDate.substr(0, 10)
                            "
                            v-if="remindDatePicker"
                            v-model="remindDatePart"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="
                                modalRemind = false;
                                remindDatePicker = false;
                                remindTimePicker = false;
                              "
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="
                                remindDatePicker = false;
                                remindTimePicker = true;
                              "
                              >OK</v-btn
                            >
                          </v-date-picker>
                          <v-time-picker
                            v-if="remindTimePicker"
                            v-model="remindTimePart"
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="
                                modalRemind = false;
                                remindDatePicker = false;
                                remindTimePicker = false;
                              "
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="
                                $refs.RemindDialog.save(
                                  remindDatePart + ' ' + remindTimePart
                                )
                              "
                              >OK</v-btn
                            >
                          </v-time-picker>
                        </v-dialog>
                      </div>
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>

                  <!-- --------- weight section ---------- -->

                  <!-- -------- story as a weight -------- -->
                  <div
                    class="expansionViewHeaderUpdated"
                    v-if="this.fetchProject.weightMeasure == 'story'"
                  >
                    <v-list-item class>
                      <v-list-item-icon>
                        <v-icon size="25" color="#0BAFFF"
                          >mdi-weight-lifter</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">
                        Task weight -
                        <strong>Story Points</strong>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="weightSection">
                      <v-list-item-title>
                        <v-form v-model="isValidEstimated" ref="estimatedform">
                          <v-row>
                            <v-col md="6">
                              <v-text-field
                                type="number"
                                dense
                                v-model="estimatedWeight"
                                flat
                                label="Estimated"
                                @keyup.enter="changeEstimatedWeight()"
                                hint="Update and hit enter"
                                :rules="estimatedHRules"
                              ></v-text-field>
                            </v-col>
                            <v-col md="6">
                              <v-text-field
                                type="number"
                                dense
                                v-model="actualWeight"
                                flat
                                label="Actual"
                                @keyup.enter="changeActualWeight()"
                                hint="Update and hit enter"
                                :rules="estimatedHRules"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-list-item-title>
                    </v-list-item-content>
                  </div>
                  <!-- --------------- -->

                  <!-- ----------- time as a weight ----------- -->

                  <div
                    class="expansionViewHeaderUpdated"
                    v-if="this.fetchProject.weightMeasure == 'time'"
                  >
                    <v-list-item class>
                      <v-list-item-icon>
                        <v-icon size="25" color="#0BAFFF"
                          >mdi-weight-lifter</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">
                        Task weight -
                        <strong>Time</strong>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="weightSection">
                      <v-list-item-title>
                        <v-row>
                          <v-col md="4" class="rightColumnItemsSubTitle"
                            >Estimated Time</v-col
                          >
                        </v-row>
                        <v-form v-model="isValidEstimated" ref="estimatedform">
                          <v-row style="margin-top: -17px">
                            <v-col md="5">
                              <v-text-field
                                dense
                                type="number"
                                v-model="estimatedHours"
                                flat
                                label="hours"
                                :rules="estimatedHRules"
                              ></v-text-field>
                            </v-col>
                            <v-col md="5">
                              <v-text-field
                                dense
                                type="number"
                                v-model="estimatedMin"
                                flat
                                label="minutes"
                                :rules="estimatedRules"
                              ></v-text-field>
                            </v-col>
                            <v-col style="text-align: right" md="2">
                              <v-btn
                                :disabled="!isValidEstimated"
                                @click="changeEstimatedTime()"
                                icon
                              >
                                <v-icon color="deep-orange"
                                  >mdi-checkbox-marked-circle-outline</v-icon
                                >
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                        <v-row>
                          <v-col md="4" class="rightColumnItemsSubTitle"
                            >Actual Time</v-col
                          >
                        </v-row>
                        <v-form v-model="isValidActual" ref="estimatedform">
                          <v-row style="margin-top: -17px">
                            <v-col md="5">
                              <v-text-field
                                dense
                                type="number"
                                v-model="actualHours"
                                flat
                                label="hours"
                                :rules="actualHRules"
                              ></v-text-field>
                            </v-col>
                            <v-col md="5">
                              <v-text-field
                                dense
                                type="number"
                                v-model="actualMin"
                                flat
                                label="minutes"
                                :rules="actualRules"
                              ></v-text-field>
                            </v-col>
                            <v-col style="text-align: right" md="2">
                              <v-btn
                                :disabled="!isValidActual"
                                @click="changeActualTime()"
                                icon
                              >
                                <v-icon color="deep-orange"
                                  >mdi-checkbox-marked-circle-outline</v-icon
                                >
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-list-item-title>
                    </v-list-item-content>
                  </div>
                </div>
              </v-col>
              <!-- ------------------ right side column ------------- -->
              <v-col sm="6" md="6">
                <!-- <v-list-item v-show="!this.userExists">
                  <v-list-item-action>
                    <v-icon size="15" color="red">mdi-alert-outline</v-icon>
                  </v-list-item-action>
                  <v-list-item-content
                    class="userBlockedWarning"
                  >Assignee is no longer a participant of the project</v-list-item-content>
                </v-list-item>-->
                <div class="rightSideColumn">
                  <div class>
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#FF6767"
                          >mdi-square-edit-outline</v-icon
                        >
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors"
                        >Notes</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="noteSectionUpdated">
                          <v-textarea
                            name="input-7-4"
                            auto-grow
                            outlined
                            v-model="taskNote"
                          ></v-textarea>
                        </v-list-item-title>
                        <div class="noteUpdateButtonUpdated">
                          <v-btn
                            class="text-capitalize"
                            x-small
                            rounded
                            depressed
                            color="#0BAFFF"
                            dark
                            @click="updateTaskNote"
                          >
                            <v-icon size="15" left>mdi-pencil</v-icon>Update
                            note
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <v-divider></v-divider>
                  <!-- ----------- Files section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="30" color="#EDCA14">mdi-paperclip</v-icon>
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
                        class="text-capitalize"
                        x-small
                        rounded
                        depressed
                        color="#0BAFFF"
                        dark
                      >
                        <v-icon size="15" left>mdi-upload</v-icon>Upload
                      </v-btn>
                      <!-- <v-progress-circular
                        v-if="uploadLoading == true"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>-->
                    </div>
                  </div>
                  <!-- ------------- file viewer ------------ -->
                  <div
                    class="filesViewDiv"
                    v-for="(file, index) in fileList"
                    :key="index"
                  >
                    <v-list-item>
                      <div>
                        <v-icon size="30">mdi-file-document-outline</v-icon>
                      </div>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">
                          <a
                            style="text-decoration: none"
                            :href="file.taskFileUrl"
                            target="_blank"
                            >{{ file.taskFileName }}</a
                          >
                        </v-list-item-title>
                        <v-list-item-subtitle class="fileSubTitles">
                          {{ file.taskFileSize / 1000 }}KB
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">{{
                          getUserDetails(file.taskFileCreator)
                        }}</v-list-item-title>

                        <v-list-item-subtitle class="fileSubTitles">
                          {{ getProjectDates(file.taskFileDate) }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <a
                          style="text-decoration: none"
                          :href="file.taskFileUrl"
                          target="_blank"
                        >
                          <v-icon size="25" color="#0BAFFF"
                            >mdi-cloud-download</v-icon
                          >
                        </a>
                      </v-list-item-action>
                      <v-list-item-action>
                        <v-icon
                          @click="handleFileDelete(file.taskFileId)"
                          size="25"
                          color="#FF6161"
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
      <task-logs
        v-if="this.activity == 'logs' && !taskView"
        :pageNum="page"
        :page="page"
      />
      <task-comments
        v-if="this.activity == 'comments' && !taskView"
        :stomp="this.stomp"
        :commentPage="commentPage"
      />
      <div></div>
    </div>

    <div @click="close" class="taskPopupPopups">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
      <v-overlay :value="overlay" color="black">
        <progress-loading />
      </v-overlay>
      <v-overlay :value="waiting" color="black">
        <waiting />
      </v-overlay>
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
import TaskLogs from "~/components/tasks/taskLogs";
import TaskComments from "~/components/tasks/taskComments";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Progress from "~/components/popups/progress";
import Waiting from "~/components/popups/waiting";

export default {
  components: {
    NavigationDrawer,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "add-parent-task": AddParentTask,
    "add-child-task": AddChildTask,
    "task-logs": TaskLogs,
    "task-comments": TaskComments,
    "progress-loading": Progress,
    waiting: Waiting,
  },
  data() {
    return {
      model: false,
      modalRemind: false,
      dueDatePicker: false,
      dueTimePicker: false,
      dueDatePart: new Date().toISOString().substr(0, 10),
      dueTimePart: "00:00",

      remindDatePicker: false,
      remindTimePicker: false,
      remindDatePart: new Date().toISOString().substr(0, 10),
      remindTimePart: "00:00",

      taskView: true,
      // ---------- for weight section -----------
      estimatedRules: [
        (v) => v < 60 || "Invalid!",
        (v) => v > -1 || "Invalid!",
      ],
      estimatedHRules: [(v) => v > -1 || "Invalid!"],
      isValidEstimated: true,
      actualRules: [(v) => v < 60 || "Invalid!", (v) => v > -1 || "Invalid!"],
      actualHRules: [(v) => v > -1 || "Invalid!"],
      isValidActual: true,
      updatedActualMin: "",
      updatedActualHours: "",
      updatedEstimatedHours: "",
      updatedEstimatedMin: "",
      updatedEstimatedWeight: "",
      updatedActualWeight: "",
      overlay: false,
      waiting: false,
      baseUrl: "",
      page: 1,
      commentPage: 1,
      taskDeleteDialog: false,
      taskId: "",
      projectId: "",
      userId: "",
      stomp: null,
      sprints: [],
      activity: "comments",
      assignees: [],
      editTask: true,
      // parentTask: {},
      parentProfile: {},
      updatedTaskDueDate: null,
      updatedRemindOnDate: null,
      // taskAssignee: "",
      task: {},
      updatedTaskName: "",
      updatedIssue: "",
      updatedStatus: "",
      issueTypes: "",
      issueStatus: "",
      componentUsers: [],
      userExists: true,
      files: [],
      component: "",
      errorMessage: "",
      successMessage: "",
      // issueTypes: ['development', 'qa', 'bug', 'operational'],
      // taskStatuses: ['open', 'pending', 'closed'],
      allSprints: [{ sprintId: "default", sprintName: "Default" }],
      fetchSprintCount: 0,
      fetchFilesCount: 0,
      updatedTask: {
        taskRemindOnDate: "",
        taskDueDateAt: "",
        taskName: "",
        taskAssignee: "",
      },
      issueTypeList: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" },
      ],
      development: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Completed", id: "completed" },
        { name: "Implementing", id: "implementing" },
        { name: "Deployed", id: "deployed" },
        { name: "Closed", id: "closed" },
      ],
      qa: [
        { name: "Pending", id: "pending" },
        { name: "Testing", id: "testing" },
        { name: "Review", id: "review" },
        { name: "Closed", id: "closed" },
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
        { name: "Closed", id: "closed" },
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
        { name: "Closed", id: "closed" },
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
        { name: "Closed", id: "closed" },
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
        { name: "Closed", id: "closed" },
      ],
      general: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Cancel", id: "cancel" },
        { name: "In progress", id: "inprogress" },
        { name: "Completed", id: "completed" },
        { name: "Closed", id: "closed" },
      ],
    };
  },
  async created() {
    this.taskId = this.$route.params.viewTask;
    this.projectId = this.$route.query.project;
    this.userId = this.$store.state.user.userId;
    this.baseUrl = process.env.SYSTEM_URL;
    this.websocketConnectInit(this.taskId);
    this.$store.dispatch("project/fetchProject", this.$route.query.project);
    this.$store.dispatch("activityLog/fetchTaskActivityLog", {
      taskId: this.selectedTask.taskId,
      startIndex: 0,
      endIndex: 10,
    });
    this.$store.dispatch(
      "task/fetchProjectUserCompletionTasks",
      this.$route.query.project
    );
    let taskResponse;
    try {
      taskResponse = await this.$axios.$get(
        `/projects/${this.$route.query.project}/tasks/${this.$route.params.viewTask}`,
        {
          headers: {
            user: this.userId,
            type: "project",
          },
        }
      );
      this.task = taskResponse.data;
      this.$store.dispatch("task/setSelectedTask", taskResponse.data);
      // console.log("Selected Task get response", this.task);
    } catch (e) {
      console.log("Error fetching task", e);
    }
    this.$store.dispatch("comments/fetchTaskActivityComment", {
      taskId: this.$route.params.viewTask,
      startIndex: 0,
      endIndex: 10,
    });

    this.$store.dispatch(
      "comments/fetchTaskCommentLength",
      this.$route.params.viewTask
    );
    if (this.task.isParent) {
      this.$store.dispatch("task/fetchChildren", {
        projectId: this.$route.query.project,
        taskId: this.$route.params.viewTask,
      });
    } else {
      this.$store.dispatch("task/fetchParentTask", {
        projectId: this.$route.query.project,
        taskId: this.task.parentId,
      });
    }
    this.$store.dispatch("user/fetchOwnUser", this.$store.state.user.userId);
  },
  methods: {
    async updateDueDate(dueDate) {
      const isoDate = new Date(
        dueDate.getTime() - dueDate.getTimezoneOffset() * 60000
      ).toISOString();
      this.waiting = true;

      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskDueDate: isoDate,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$emit("clearStore");
        // this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });

        this.component = "success-popup";
        this.successMessage = "Date successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("update task dates response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("Error updating a date", e);
      }
    },

    async updateRemindDate(remindDate) {
      console.log("Reming DATE: " + remindDate);
      const isoDate = new Date(
        remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
      ).toISOString();
      this.waiting = true;

      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskRemindOnDate: isoDate,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$emit("clearStore");
        // this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });

        this.component = "success-popup";
        this.successMessage = "Date successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("update task dates response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("Error updating a date", e);
      }
    },

    getProjectDisplayDates(date) {
      const dueDate = new Date(date);
      // const dueToUtc = new Date(
      //   dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      // );
      // const dueToUtcDate = new Date(dueToUtc);
      // const now = new Date();
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
    // -----for weight section ---------
    // ------ update estimated weight ---------
    async changeEstimatedTime() {
      let hours;
      let min;
      if (this.updatedEstimatedHours != "") {
        hours = this.updatedEstimatedHours;
      } else {
        hours = this.estimatedHours;
      }
      if (this.updatedEstimatedMin != "") {
        min = this.updatedEstimatedMin;
      } else {
        min = this.estimatedMin;
      }
      // this.waiting = true;
      console.log("TIME WEIGHT + " + hours + min);
      let response;
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            estimatedWeight: parseFloat(hours + "." + min),
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.task.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.component = "success-popup";
        this.successMessage = "Estimated Weight successfully updated";
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);

        this.userExists = true;
        this.waiting = false;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.waiting = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        console.log("Error updating a status", e);
      }
    },
    async changeActualTime() {
      let hours;
      let min;
      if (this.updatedActualHours != "") {
        hours = this.updatedActualHours;
      } else {
        hours = this.actualHours;
      }
      if (this.updatedActualMin != "") {
        min = this.updatedActualMin;
      } else {
        min = this.actualMin;
      }
      let response;
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            actualWeight: parseFloat(hours + "." + min),
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.task.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.waiting = false;
        this.component = "success-popup";
        this.successMessage = "Actual Weight successfully updated";
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);

        this.userExists = true;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.waiting = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        console.log("Error updating a status", e);
      }
    },
    async changeEstimatedWeight() {
      let response;
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            estimatedWeight: this.updatedEstimatedWeight,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.task.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.component = "success-popup";
        this.successMessage = "Estimated Weight successfully updated";
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);

        this.userExists = true;
        this.waiting = false;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        this.waiting = false;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        console.log("Error updating a status", e);
      }
    },

    async changeActualWeight() {
      this.waiting = true;
      let response;
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            actualWeight: this.updatedActualWeight,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.task.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.component = "success-popup";
        this.successMessage = "Actual Weight successfully updated";
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);

        this.userExists = true;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = true;
        this.waiting = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        this.waiting = false;
        console.log("Error updating a status", e);
      }
    },
    // ------------ end weight methods -----------
    selectedVTab(component) {
      this.waiting = true;
      this.activity = component;
      if (component === "logs") {
        this.waiting = false;
        this.taskView = false;
      } else if (component === "tasks") {
        this.taskView = true;
        this.waiting = false;
      } else {
        Promise.all([
          this.$store.dispatch("comments/fetchTaskActivityComment", {
            taskId: this.selectedTask.taskId,
            startIndex: 0,
            endIndex: 10,
          }),
          this.$store.dispatch(
            "comments/fetchTaskCommentLength",
            this.selectedTask.taskId
          ),
        ]).finally(() => {
          this.waiting = false;
          this.taskView = false;
        });
      }
    },
    websocketConnectInit(taskId) {
      console.log("initalize websocket connection for task", taskId);
      const url = this.baseUrl + "/api/pm-service";
      // const url =  "http://localhost:8080" + "/api/pm-service"

      try {
        console.log("connecting to ws...");
        let socket = new SockJS(url + "/chat");
        //this.stompClient = Stomp.over(socket);
        this.stomp = Stomp.over(socket);
        //this.$store.dispatch("stompClient/setStompClient", "this.stomp");
        //let client = this.stompClient;
        this.stomp.connect({}, (frame) => {
          console.log("connected to: " + frame);
          console.log("subscribing to topic: " + "/topic/messages/" + taskId);
          this.stomp.subscribe("/topic/messages/" + taskId, (response) => {
            console.log("Response", response);
            let data = JSON.parse(response.body);
            console.log("outside----->");
            if (data.actionType === "comment") {
              console.log("inside----->");
              this.$store.dispatch("comments/fetchTaskActivityComment", {
                taskId: this.selectedTask.taskId,
                startIndex: 0,
                endIndex: 9,
              });
            } else if (
              data.actionType === "typing" &&
              data.sender !== this.userId
            ) {
              this.$store.dispatch("stompClient/setTypingStatus", true);
              this.$store.dispatch("stompClient/setTypingUser", data.message);
            } else if (
              data.actionType === "notTyping" &&
              data.sender !== this.userId
            ) {
              this.$store.dispatch("stompClient/setTypingStatus", false);
            }
          });
        });
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    checkUserExists() {
      const index = this.people.findIndex(
        (user) => user.assigneeId === this.selectedTask.taskAssignee
      );
      if (index === -1) {
        this.userExists = false;
      } else {
        this.userExists = true;
      }
    },
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId,
              type: "project",
            },
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
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskStatus: this.updatedTask.taskStatus,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("task/setSelectedTask", this.task);
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        let taskResponse;
        try {
          taskResponse = await this.$axios.$get(
            `/projects/${this.$route.query.project}/tasks/${this.$route.params.viewTask}`,
            {
              headers: {
                user: this.userId,
                type: "project",
              },
            }
          );
          this.task = taskResponse.data;
          this.$store.dispatch("task/setSelectedTask", taskResponse.data);
          // console.log("Selected Task get response", this.task);
        } catch (e) {
          console.log("Error fetching task", e);
        }
        this.component = "success-popup";
        this.waiting = false;
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task status response", response);
      } catch (e) {
        this.waiting = false;
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
      this.waiting = true;
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskStatus: this.taskStatus,
            issueType: this.updatedIssue,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.waiting = false;
        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task status response", response);
      } catch (e) {
        this.waiting = false;
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
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}/sprint`,
          {
            previousSprint: this.task.sprintId,
            newSprint: this.updatedTask.sprintId,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.waiting = false;
        this.component = "success-popup";
        this.successMessage = "Sprint successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update sprint status response", response);
      } catch (e) {
        this.waiting = false;
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
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskAssignee: this.updatedTask.taskAssignee,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.waiting = false;
        this.component = "success-popup";
        this.successMessage = "Assignee successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task status response", response);
      } catch (e) {
        this.waiting = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    getAssigneeDetails(v) {
      // console.log("board list", this.projectSprints);
      this.checkUserExists();

      this.assignees = [];
      let assigneeSearchList = this.people;
      for (let index = 0; index < assigneeSearchList.length; ++index) {
        let assignee = assigneeSearchList[index];
        this.assignees.push({
          name: assignee.assigneeFirstName + " " + assignee.assigneeLastName,
          id: assignee.assigneeId,
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    // getPeopleList() {
    //   console.log("callinglist");
    //   if (this.people.length === undefined || this.people.length === 0) {
    //     this.$store.dispatch(
    //       "task/fetchProjectUserCompletionTasks",
    //       this.$route.query.project
    //     );
    //   } else {
    //     return this.people;
    //   }
    // },
    async updateTaskNote() {
      // console.log("updatedTaskValue ->", this.updatedTask.taskNotes);
      let response;
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            taskNotes: this.updatedTask.taskNote,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.component = "success-popup";
        this.successMessage = "Note successfully updated";
        this.waiting = false;
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("edit task response", response);
      } catch (e) {
        this.waiting = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a note", e);
      }
    },
    async saveEditTaskName() {
      if (this.updatedTask.taskName != "") {
        // console.log("updatedTaskName ->", this.updatedTask.taskName);
        let response;
        this.waiting = true;
        try {
          response = await this.$axios.$put(
            `/projects/${this.projectId}/tasks/${this.task.taskId}`,
            {
              taskName: this.updatedTask.taskName,
            },
            {
              headers: {
                user: this.userId,
              },
            }
          );
          this.$store.dispatch("activityLog/fetchTaskActivityLog", {
            taskId: this.selectedTask.taskId,
            startIndex: 0,
            endIndex: 10,
          });
          this.$store.dispatch(
            "task/setSelectedTaskName",
            this.updatedTask.taskName
          );
          this.waiting = false;
          this.component = "success-popup";
          this.successMessage = "Name successfully updated";
          setTimeout(() => {
            this.close();
          }, 3000);
          // console.log("UPDATED", this.$store.state.task.myTasks);
          this.editTask = true;
          // console.log("edit task response", response);
        } catch (e) {
          this.waiting = false;
          console.log("Error updating the name", e);
          this.errorMessage = e.response.data;
          this.component = "error-popup";
          setTimeout(() => {
            this.close();
          }, 3000);
          this.editTask = true;
        }
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
        return "No Due Date";
      } else if (
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Today";
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
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
    // statusCheck() {
    //   return "pendingStatus";
    // },
    statusCheck(task) {
      switch (task) {
        case "pending":
          return "pendingStatus";
          break;
        case "onHold":
          return "onHoldStatus";
          break;
        case "open":
          return "openStatus";
          break;
        case "cancel":
          return "cancelStatus";
          break;
        case "reOpened":
          return "reOpenedStatus";
          break;
        case "fixing":
          return "fixingStatus";
          break;
        case "testing":
          return "testingStatus";
          break;
        case "resolved":
          return "resolvedStatus";
          break;
        case "inprogress":
          return "inprogressStatus";
          break;
        case "completed":
          return "completedStatus";
          break;
        case "implementing":
          return "implementingStatus";
          break;
        case "underReview":
          return "underReviewStatus";
          break;
        case "waitingForApproval":
          return "waitingForApprovalStatus";
          break;
        case "review":
          return "reviewStatus";
          break;
        case "discussion":
          return "discussionStatus";
          break;
        case "waitingResponse":
          return "waitingResponseStatus";
          break;
        case "ready":
          return "readyStatus";
          break;
        case "deployed":
          return "deployedStatus";
          break;
        case "fixed":
          return "fixedStatus";
          break;
        case "rejected":
          return "rejectedStatus";
          break;
        case "closed":
          return "closedStatus";
          break;
        default:
          return "defaultStatus";
      }
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
            id: sprint.sprintId,
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
          taskDueDate: dueDate,
        };
        this.$store.dispatch("task/updateProjectDates", {
          type: "dueDate",
          date: dueDate,
        });
      } else if (type === "remindOn" && this.updatedRemindOnDate != null) {
        remindDate = new Date(this.updatedRemindOnDate);
        const isoDate = new Date(
          remindDate.getTime() - remindDate.getTimezoneOffset() * 60000
        ).toISOString();
        remindDate = isoDate;
        dueDate = this.updatedRemindOnDate;
        changedDate = {
          taskRemindOnDate: remindDate,
        };
        this.$store.dispatch("task/updateProjectDates", {
          type: "remindDate",
          date: remindDate,
        });
      }
      let response;
      this.waiting = true;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          changedDate,
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        this.component = "success-popup";
        this.successMessage = "Date successfully updated";
        this.waiting = false;
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("update task dates response", response);
      } catch (e) {
        this.waiting = false;
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
        return "No Due Date";
      } else if (
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Today";
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
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
          this.waiting = true;
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
                  user: this.userId,
                },
              }
            );
            this.$store.dispatch("activityLog/fetchTaskActivityLog", {
              taskId: this.selectedTask.taskId,
              startIndex: 0,
              endIndex: 10,
            });
            this.$store.dispatch("task/appendTaskFile", fileResponse.data);
            this.uploadLoading = false;
            this.waiting = false;
            this.component = "success-popup";
            this.successMessage = "File(s) successfully uploaded";
            setTimeout(() => {
              this.close();
            }, 3000);
            // console.log("file response", this.taskFiles);
          } catch (e) {
            // console.log("Error adding group file", e);
            this.waiting = false;
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
      this.waiting = true;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.task.taskId}/upload/${taskFileId}`,
          {
            data: {},
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 10,
        });
        // console.log(response.data);
        this.$store.dispatch("task/removeTaskFile", taskFileId);
        this.component = "success-popup";
        this.successMessage = "File successfully deleted";
        this.waiting = false;
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.waiting = false;
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
        const index = this.componentUsers.findIndex((i) => i.userId === userId);
        if (index === -1) {
          this.$axios
            .get(`/users/${userId}`)
            .then((response) => {
              // console.log("component user---->", response.data.data);
              // this.userList = response.data.data;
              // console.log("another user", response.data.data);
              this.componentUsers.push(response.data.data);
              let fileUser = response.data.data;
              return fileUser.firstName;
            })
            .catch((e) => {
              console.log("error", e);
            });
        }
      } else {
        const index = this.componentUsers.findIndex((i) => i.userId === userId);
        if (index > -1) {
          const user = this.componentUsers[index];
          return user.firstName + " " + user.lastName;
        }
      }
    },
  },
  computed: {
    ...mapState({
      selectedTask: (state) => state.task.selectedTask,
      selectedTaskUser: (state) => state.user.selectedTaskUser,
      parentTaskUser: (state) => state.user.parentTaskUser,
      componentUser: (state) => state.user.componentUser,
      people: (state) => state.task.userCompletionTasks,
      projectSprints: (state) => state.sprints.sprint.sprints,
      taskFiles: (state) => state.task.taskFiles,
      children: (state) => state.task.childTasks,
      parentTask: (state) => state.task.parentTask,
      fetchProject: (state) => state.project.project,
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
      if (this.people.length === undefined || this.people.length === 0) {
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

    // taskAssignee: {
    //   get() {
    //     return this.task.taskAssignee;
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
      },
    },

    taskName: {
      get() {
        // if (this.updatedTask.taskName == "") {
        return this.task.taskName;
        // } else return this.updatedTask.taskName;
      },
      set(name) {
        this.updatedTask.taskName = name;
      },
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
      },
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
      },
    },
    selectedSprint: {
      get() {
        this.getAllSprints();
        return this.task.sprintId;
      },
      set(value) {
        this.updatedTask.sprintId = value;
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
      },
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
      },
    },

    dueDate: {
      get() {
        if (this.updatedTask.taskDueDateAt != "") {
          return this.getProjectDisplayDates(this.updatedTask.taskDueDateAt);
        } else {
          return this.getProjectDisplayDates(this.task.taskDueDateAt);
        }
      },
      set(value) {
        this.updatedTask.taskDueDateAt = value;
        // console.log(
        //   "SET VALUE " + this.updatedTask.taskDueDateAt.toISOString()
        // );
        this.updateDueDate(new Date(value));
      },
    },

    remindDate: {
      get() {
        if (this.updatedTask.taskRemindOnDate != "") {
          return this.getProjectDisplayDates(this.updatedTask.taskRemindOnDate);
        } else {
          return this.getProjectDisplayDates(this.task.taskReminderAt);
        }
      },
      set(value) {
        this.updatedTask.taskRemindOnDate = value;
        // console.log(
        //   "SET VALUE " + this.updatedTask.taskDueDateAt.toISOString()
        // );
        this.updateRemindDate(new Date(value));
      },
    },

    // -------- for weight section ---------
    estimatedWeight: {
      get() {
        return this.task.estimatedWeight;
      },
      set(estimatedWeight) {
        this.updatedEstimatedWeight = estimatedWeight;
      },
    },

    actualWeight: {
      get() {
        return this.task.actualWeight;
      },
      set(actualWeight) {
        this.updatedActualWeight = actualWeight;
      },
    },
    estimatedHours: {
      get() {
        return Math.trunc(this.task.estimatedWeight);
      },
      set(estimatedWeight) {
        this.updatedEstimatedHours = estimatedWeight;
      },
    },
    estimatedMin: {
      get() {
        let min = (this.task.estimatedWeight + "").split(".")[1];
        if (min == undefined) {
          return 0;
        } else {
          return min;
        }
      },
      set(estimatedWeight) {
        this.updatedEstimatedMin = estimatedWeight;
      },
    },
    actualHours: {
      get() {
        return Math.trunc(this.task.actualWeight);
      },
      set(estimatedWeight) {
        this.updatedActualHours = estimatedWeight;
      },
    },
    actualMin: {
      get() {
        let min = (this.task.actualWeight + "").split(".")[1];
        if (min == undefined) {
          return 0;
        } else {
          return min;
        }
      },
      set(actualWeight) {
        this.updatedActualMin = actualWeight;
      },
    },
  },
};
</script>
