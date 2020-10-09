<template>
  <div class>
    <v-btn
      v-if="this.filterList != '' && this.taskFilter != 'none'"
      style="position: absolute; right: 60px; margin-top: -48px"
      @click="exportAsCSV"
      dark
      height="30px"
      outlined
      color="blue"
    >
      <v-icon color="blue" size="20">mdi-download</v-icon>
      <v-list-item-action-text>Export as CSV</v-list-item-action-text>
      <!-- Cancel -->
    </v-btn>
    <div class="filterSectionAllTasks">
      <div
        class="filterTriggersDrop"
        style="width: 10%; float: left; padding-right: 10px"
      >
        <v-btn
          depressed
          dark
          width="100%"
          height="30px"
          color="#060631"
          @click="changeTaskOption('my-tasks')"
        >
          <v-icon
            size="13"
            color="#FFFFFF"
            style="margin-right: 3px; margin-top: 3px !important"
            >icon-task</v-icon
          >
          <span class="text-capitalize" style="font-size: 10px !important"
            >My Tasks</span
          >
        </v-btn>
      </div>
      <div
        class="filterTriggersDrop"
        style="width: 10%; float: left; padding-right: 10px"
      >
        <v-btn
          depressed
          dark
          width="100%"
          height="30px"
          color="#66B35F"
          @click="changeTaskOption('add-task')"
        >
          <v-icon
            size="13"
            color="#FFFFFF"
            style="margin-right: 3px; margin-top: 3px !important"
            >icon-task</v-icon
          >
          <span class="text-capitalize" style="font-size: 10px !important"
            >Add Tasks</span
          >
        </v-btn>
      </div>
      <div
        class="filterTriggers"
        style="width: 14%; float: left; margin-right: 10px"
      >
        <v-text-field
          dense
          clearable
          @click:clear="clearName()"
          v-model="nameOfTask"
          outlined
          flat
          label="Task Name"
          background-color="#FFFFFF"
          @input="jqlSearch()"
        ></v-text-field>
      </div>
      <div
        class="filterTriggersDrop"
        style="width: 12%; float: left; padding-right: 10px"
      >
        <v-autocomplete
          v-model="filterAssignee"
          return-object
          :items="assigneeArray"
          item-text="name"
          item-value="id"
          flat
          outlined
          dense
          chips
          background-color="#FFFFFF"
          small-chips
          label="Assignee"
          multiple
          clearable
          :clear-icon-cb="clearAssignee()"
          @change="jqlSearch()"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip x-small style="width: 30px" v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-autocomplete>
      </div>
      <div
        class="filterTriggersDrop"
        style="width: 12%; float: left; padding-right: 10px"
      >
        <v-autocomplete
          v-model="filterType"
          return-object
          :items="taskTypeArray"
          item-text="name"
          item-value="id"
          flat
          outlined
          dense
          chips
          background-color="#FFFFFF"
          small-chips
          label="Task Type"
          multiple
          clearable
          @click:clear="clearType()"
          @change="jqlSearch()"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip x-small style="width: 30px" v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-autocomplete>
      </div>
      <div
        class="filterTriggersDrop"
        style="width: 12%; float: left; padding-right: 10px"
      >
        <v-autocomplete
          v-model="filterStatus"
          return-object
          :items="taskStatusArray"
          item-text="name"
          item-value="id"
          flat
          outlined
          dense
          chips
          background-color="#FFFFFF"
          small-chips
          label="Task Status"
          multiple
          clearable
          @click:clear="clearStatus()"
          @change="jqlSearch()"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip x-small style="width: 30px" v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
          </template>
        </v-autocomplete>
      </div>
      <div
        class="filterTriggersDrop"
        style="width: 15%; float: left; padding-right: 10px"
      >
        <VueCtkDateTimePicker
          :no-value-to-custom-elem="false"
          color="#3f51b5"
          v-model="dateRange"
          label="Date Range"
          range
          right
          noButton
          autoClose
          :clear-icon-cb="clearDate()"
          @input="jqlSearch()"
        ></VueCtkDateTimePicker>
      </div>

      <div
        class="filterTriggersDrop"
        style="width: 5%; float: left; margin-right: 20px"
      >
        <v-btn
          depressed
          @click="jqlSearch()"
          dark
          width="100%"
          height="30px"
          color="#333369"
        >
          <span class="text-capitalize" style="font-size: 10px !important"
            >Search</span
          >
        </v-btn>
      </div>
      <div
        class="filterTriggersDrop"
        style="width: 5%; float: left; padding-right: 10px"
      >
        <v-btn
          depressed
          @click="filterChange()"
          dark
          width="100%"
          height="30px"
          color="#FF6161"
        >
          <span class="text-capitalize" style="font-size: 10px !important"
            >Clear</span
          >
        </v-btn>
      </div>
    </div>

    <div
      v-if="this.taskFilter == 'none'"
      class="taskListViewContent overflow-y-auto"
      id="mainDiv"
    >
      <div
        v-if="this.taskFilter == 'none'"
        class="restructuredTaskCreate allTaskCreateTab"
      >
        <v-form onsubmit="return false" ref="form">
          <v-text-field
            ref="txtMainTask"
            v-model="taskName"
            background-color="#FFFFFF"
            outlined
            solo
            flat
            dense
            prepend-inner-icon="mdi-plus"
            label="Add a main task. Format: <TaskName> @<Assignee> #<DueDate>"
            class
            style="border-radius: 0px"
            @keyup.enter="addTask(null, 'general')"
            @input="autoFilling()"
          ></v-text-field>
        </v-form>
      </div>
      <div>
        <div v-if="tagging" class="taggingPopupBoxTaskCreate overflow-y-auto">
          <div>
            <v-list-item-group>
              <div v-for="(user, index) in assigneeLoadArray()" :key="index">
                <v-list-item @click="tagPeople(user)" dense>
                  <v-list-item-avatar size="20">
                    <v-img
                      v-if="user.img != null && user.img != ''"
                      :src="user.img"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-group>
          </div>
        </div>
      </div>
      <v-col
        v-if="datePickerDialog"
        class="datePopupBoxTaskCreate"
        cols="12"
        sm="6"
        md="4"
      >
        <v-date-picker
          @input="
            datePickerDialog = false;
            addDate();
          "
          v-model="datePicker"
          scrollable
        ></v-date-picker>
      </v-col>
      <!-- ------ start task list ------- -->
      <div v-for="(task, index) in projectAllTasks" :key="index">
        <!-- <v-hover open-delay="600" v-slot:default="{ hover }"> -->
        <div>
          <div>
            <v-hover
              open-delay="600"
              close-delay="1000"
              v-slot:default="{ hover }"
            >
              <div>
                <div class="restructuredMainTaskList">
                  <v-list-item class="upperListItem">
                    <v-list-item class="innerListItem">
                      <!-- @click.stop="drawer = !drawer" -->
                      <v-list-item-action>
                        <v-icon
                          v-if="task.parentTask.taskStatus == 'closed'"
                          size="25"
                          color="#66B25F"
                          >mdi-checkbox-blank</v-icon
                        >
                        <v-icon
                          @click="closeTask(task.parentTask.taskId, false)"
                          style="cursor: pointer"
                          v-else
                          size="25"
                          color="#939393"
                          >mdi-checkbox-blank-outline</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content
                        @click="
                          selectTask(task.parentTask, task);
                          taskDialog = true;
                        "
                        style="cursor: pointer"
                      >
                        <!-- <div class="tasklistTaskNames restructuredMainTaskName"> -->
                        <div style="color: #576377">
                          <span
                            class="restructuredMainTaskCode fontRestructure12"
                            >{{ task.parentTask.secondaryTaskId }}</span
                          >
                          {{ task.parentTask.taskName }}
                        </div>
                        <!-- </div> -->
                      </v-list-item-content>
                      <!-- <div
                      class="restStatusChip"
                      :class="statusCheck(task.parentTask.issueType)"
                      >{{ taskStatusFormatting(task.parentTask.taskStatus) }}</div>-->
                      <!-- <div
                      class="restStatusChip"
                      :class="statusCheck(task.parentTask.issueType)"
                      >{{ taskTypeFormatting(task.parentTask.issueType) }}</div>-->
                      <v-list-item-action>
                        <v-chip
                          class="chipsContent"
                          :class="statusCheck(task.parentTask.taskStatus)"
                          x-small
                        >
                          <span class="fontRestructure12">
                            {{
                              taskStatusFormatting(task.parentTask.taskStatus)
                            }}
                          </span>
                        </v-chip>
                      </v-list-item-action>
                      <v-list-item-action>
                        <v-chip
                          class="chipsContent"
                          :class="TypeCheck(task.parentTask.issueType)"
                          x-small
                        >
                          <span class="fontRestructure12">
                            {{ taskTypeFormatting(task.parentTask.issueType) }}
                          </span>
                        </v-chip>
                      </v-list-item-action>

                      <v-list-item-action class="updatedDate">
                        <v-list-item-title
                          class="fontRestructure12"
                          :class="dueDateCheck(task.parentTask)"
                          >{{
                            getProjectDates(task.parentTask.taskDueDateAt)
                          }}</v-list-item-title
                        >
                      </v-list-item-action>
                      <!-- <div style="margin-right: -25px"> -->
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <v-list-item-avatar size="25" v-on="on">
                            <v-img
                              v-if="
                                task.parentTask.taskAssigneeProfileImage !=
                                  null &&
                                task.parentTask.taskAssigneeProfileImage != ''
                              "
                              :src="task.parentTask.taskAssigneeProfileImage"
                            ></v-img>
                            <v-img
                              v-else
                              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                            ></v-img>
                          </v-list-item-avatar>
                        </template>
                        <span>
                          {{ task.parentTask.firstName }}
                          {{ task.parentTask.lastName }}
                        </span>
                      </v-tooltip>
                      <!-- </div> -->
                      <!-- <div class="bluePartMyTask"></div> -->
                    </v-list-item>
                    <div class="boardTabLinkIcon">
                      <nuxt-link
                        :to="
                          '/task/' +
                          task.parentTask.taskId +
                          '/?project=' +
                          projectId
                        "
                        style="text-decoration: none"
                        target="_blank"
                      >
                        <v-icon size="17" color="#9F9F9F"
                          >mdi-open-in-new</v-icon
                        >
                      </nuxt-link>
                    </div>
                  </v-list-item>
                </div>

                <!-- -------------- sub task design --------------- -->
                <div
                  class="restructuredSubTaskCreate"
                  v-if="task.parentTask.taskStatus != 'closed'"
                >
                  <v-expand-transition>
                    <v-text-field
                      ref="txtSubTask"
                      v-if="hover"
                      v-model="subTaskName"
                      background-color="#FFFFFF"
                      outlined
                      solo
                      flat
                      dense
                      prepend-inner-icon="mdi-plus"
                      label="Add a sub task. Format: <TaskName> @<Assignee> #<DueDate>"
                      style="margin-top: 5px; border-radius: 0px"
                      @keyup.enter="
                        addSubTask(
                          index,
                          task.parentTask.taskId,
                          task.parentTask.issueType,
                          task.parentTask.sprintId,
                          task.parentTask.taskDueDateAt
                        )
                      "
                      @input="autoFillingSubTask(index)"
                    ></v-text-field>
                    <div v-else hidden>{{ clearTaskName() }}</div>
                  </v-expand-transition>
                  <div
                    v-if="hover && subTagging"
                    class="taggingPopupBoxSubTaskCreate overflow-y-auto"
                  >
                    <div>
                      <v-list-item-group>
                        <div
                          v-for="(user, index) in assigneeLoadArray()"
                          :key="index"
                        >
                          <v-list-item
                            @click="tagPeopleSubTask(user, index)"
                            dense
                          >
                            <v-list-item-avatar size="20">
                              <v-img
                                v-if="user.img != null && user.img != ''"
                                :src="user.img"
                              ></v-img>
                              <v-img
                                v-else
                                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                              ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-subtitle>{{
                                user.name
                              }}</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </div>
                      </v-list-item-group>
                    </div>
                  </div>
                  <v-col
                    v-if="hover && datePickerSubDialog"
                    class="datePopupBoxSubTaskCreate"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-date-picker
                      @input="
                        datePickerSubDialog = false;
                        addSubDate();
                      "
                      v-model="datePicker"
                      scrollable
                    ></v-date-picker>
                  </v-col>
                </div>

                <div
                  class="restructuredSubTaskCreate"
                  v-else
                  style="margin-bottom: -5px"
                ></div>
              </div>
            </v-hover>
            <div v-if="task.childTasks.length !== 0">
              <div
                v-for="(childTask, index) in task.childTasks"
                :key="index"
                class="restructuredSubTaskListRestructure"
              >
                <v-list-item class="upperListItem">
                  <v-list-item class="innerListItem">
                    <!-- @click.stop="drawer = !drawer" -->
                    <v-list-item-action>
                      <v-icon
                        v-if="childTask.taskStatus == 'closed'"
                        color="#66B25F"
                        >mdi-checkbox-blank</v-icon
                      >
                      <v-icon
                        @click="closeTask(childTask.taskId, false)"
                        v-else
                        size="25"
                        color="#939393"
                        >mdi-checkbox-blank-outline</v-icon
                      >
                    </v-list-item-action>
                    <!-- <div class="restructuredSubTaskName"> -->
                    <v-list-item-content
                      @click="
                        selectTask(childTask, task);
                        taskDialog = true;
                      "
                      style="cursor: pointer"
                    >
                      <div style="color: #576377">
                        <span
                          class="restructuredMainTaskCode fontRestructure12"
                          >{{ childTask.secondaryTaskId }}</span
                        >
                        {{ childTask.taskName }}
                      </div>
                    </v-list-item-content>
                    <!-- </div> -->
                    <!-- <div
                        class="restStatusChip"
                        :class="statusCheck(childTask.issueType)"
                    >{{ taskStatusFormatting(childTask.taskStatus) }}</div>-->
                    <!-- <div
                        class="restStatusChip"
                        :class="statusCheck(task.parentTask.issueType)"
                    >{{ taskTypeFormatting(task.parentTask.issueType) }}</div>-->
                    <v-list-item-action>
                      <v-chip
                        class="chipsContent"
                        :class="statusCheck(childTask.taskStatus)"
                        x-small
                      >
                        <span class="fontRestructure12">
                          {{ taskStatusFormatting(childTask.taskStatus) }}
                        </span>
                      </v-chip>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-chip
                        class="chipsContent"
                        :class="TypeCheck(childTask.issueType)"
                        x-small
                      >
                        <span class="fontRestructure12">
                          {{ taskTypeFormatting(childTask.issueType) }}
                        </span>
                      </v-chip>
                    </v-list-item-action>
                    <v-list-item-action class="updatedDate">
                      <v-list-item-title
                        class="fontRestructure12"
                        :class="dueDateCheck(childTask)"
                        >{{
                          getProjectDates(childTask.taskDueDateAt)
                        }}</v-list-item-title
                      >
                    </v-list-item-action>
                    <!-- <div style="margin-right: -25px"> -->
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-list-item-avatar size="25" v-on="on">
                          <v-img
                            v-if="
                              childTask.taskAssigneeProfileImage != null &&
                              childTask.taskAssigneeProfileImage != ''
                            "
                            :src="childTask.taskAssigneeProfileImage"
                          ></v-img>
                          <v-img
                            v-else
                            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                          ></v-img>
                        </v-list-item-avatar>
                      </template>
                      <span>
                        {{ childTask.firstName }}
                        {{ childTask.lastName }}
                      </span>
                    </v-tooltip>
                    <!-- </div> -->
                  </v-list-item>
                  <div class="boardTabLinkIcon">
                    <nuxt-link
                      :to="
                        '/task/' + childTask.taskId + '/?project=' + projectId
                      "
                      style="text-decoration: none"
                      target="_blank"
                    >
                      <v-icon size="17" color="#9F9F9F">mdi-open-in-new</v-icon>
                    </nuxt-link>
                  </div>
                </v-list-item>
              </div>
            </div>

            <!-- -------------- end sub task design -------------- -->
          </div>
        </div>
        <!-- </v-hover> -->
      </div>
      <!-- <div style="margin-top: 50px">
        <v-pagination
          @input="getAllTasks()"
          v-model="pagination"
          :length="Math.ceil(this.allTaskCount / 10)"
          circle
          :total-visible="8"
        ></v-pagination>
      </div>-->
      <!-- <v-hover v-slot:default="{ hover }">
        <div>
          hi
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >this is textbox</div>
          </v-expand-transition>
        </div>
      </v-hover>-->
      <div
        v-if="this.scrollCount <= Math.ceil(this.allTaskCount / 10)"
        class="loadMoreTasks text-center"
      >
        <v-btn
          v-if="projectsSummary != ''"
          @click="loadMoreButtonAction()"
          color="#ffffff"
          depressed
        >
          <span style="color: #576377" class="text-capitalize"
            >Load More Tasks</span
          >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- -------------- filter list -------------- -->
    <div v-else class="taskListViewContent filterListTop overflow-y-auto">
      <div v-if="this.filterList == ''" class="filterTitleDiv headline">
        No items to show
      </div>
      <div v-for="(task, index) in filterList" :key="index">
        <div
          class="restructuredFilterTaskList"
          :class="filterStyles(task.isParent)"
        >
          <v-list-item class="upperFilterListItem">
            <!-- @click.stop="drawer = !drawer" -->
            <v-list-item-action>
              <v-icon
                v-if="task.taskStatus == 'closed'"
                size="25"
                color="#66B25F"
                >mdi-checkbox-blank</v-icon
              >
              <v-icon
                @click="closeTask(task.taskId, true)"
                v-else
                size="25"
                color="#939393"
                >mdi-checkbox-blank-outline</v-icon
              >
            </v-list-item-action>
            <!-- <div class="tasklistFilterTaskNames restructuredMainTaskName"> -->

            <v-list-item-content
              style="cursor: pointer"
              @click="
                selectTask(task, task);
                taskDialog = true;
              "
            >
              <div style="color: #576377">
                <span class="restructuredMainTaskCode fontRestructure12">
                  {{ task.secondaryTaskId }}
                </span>
                {{ task.taskName }}
              </div>
            </v-list-item-content>
            <!-- </div> -->
            <!-- <div
                class="restStatusChip"
                :class="statusCheck(task.issueType)"
              >{{ taskStatusFormatting(task.taskStatus) }}</div>
              <div
                class="restStatusChip"
                :class="statusCheck(task.issueType)"
            >{{ taskTypeFormatting(task.issueType) }}</div>-->
            <v-list-item-action>
              <v-chip
                class="chipsContent"
                :class="statusCheck(task.taskStatus)"
                x-small
              >
                <span class="fontRestructure12">
                  {{ taskStatusFormatting(task.taskStatus) }}
                </span>
              </v-chip>
            </v-list-item-action>
            <v-list-item-action>
              <v-chip
                class="chipsContent"
                :class="TypeCheck(task.issueType)"
                x-small
              >
                <span class="fontRestructure12">
                  {{ taskTypeFormatting(task.issueType) }}
                </span>
              </v-chip>
            </v-list-item-action>
            <v-list-item-action class="updatedDateFilter">
              <v-list-item-title
                class="fontRestructure12"
                :class="dueDateCheck(task)"
                >{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title
              >
            </v-list-item-action>
            <!-- <div> -->
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-list-item-avatar size="25" v-on="on">
                  <v-img
                    v-if="task.profileImage != null && task.profileImage != ''"
                    :src="task.profileImage"
                  ></v-img>
                  <v-img
                    v-else
                    src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                  ></v-img>
                </v-list-item-avatar>
              </template>
              <span>{{ task.firstName }} {{ task.lastName }}</span>
            </v-tooltip>
            <!-- </div> -->
            <v-list-item-action style="cursor: pointer">
              <nuxt-link
                :to="'/task/' + task.taskId + '/?project=' + projectId"
                style="text-decoration: none"
                target="_blank"
              >
                <v-icon size="17" color="#9F9F9F">mdi-open-in-new</v-icon>
              </nuxt-link>
            </v-list-item-action>
          </v-list-item>
        </div>
      </div>
    </div>
    <!-- -------------- start side bar ----------------- -->

    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
      height="100vh"
      width="800px"
      class
      color="#FFFFFF"
    >
      <task-side-bar
        :task="task"
        :assignee="assignee"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :componentClose="componentClose"
        @listenChange="listenToChange"
        @shrinkSideBar="shrinkSideBar"
      />
    </v-navigation-drawer>-->
    <!-- ------------ task dialog --------- -->

    <v-dialog
      v-model="taskDialog"
      width="90vw"
      transition="dialog-bottom-transition"
      persistent
    >
      <task-dialog
        :task="task"
        :logs="logs"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :componentClose="componentClose"
        :taskObject="taskObject"
        :stomp="stomp"
        @taskDialogClosing="taskDialogClosing()"
        @clearStore="clearStore()"
        :pageNum="1"
      />
    </v-dialog>

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
              class="text-capitalize"
              depressed
              color="success"
              width="100px"
              @click="taskDeleteDialog = false"
              >Cancel</v-btn
            >
            <v-spacer></v-spacer>
            <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
            <v-btn
              class="text-capitalize"
              depressed
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

    <!-- --------------- end side bar --------------------- -->
    <div @click="close" class="allTaskPopupPlacements">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import TaskSideBar from "~/components/tasks/taskSideBar";
import TaskDialog from "~/components/tasks/taskDialog";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Papa from "papaparse";

export default {
  props: ["pagination"],
  data() {
    return {
      traverseText: "",
      hover: false,
      scrollCount: 1,
      datePickerDialog: false,
      datePickerSubDialog: false,
      datePicker: new Date().toISOString().substr(0, 10),
      selectedDueDate: "",
      tagging: false,
      subTagging: false,
      assigneeId: "",
      pagination: this.pagination,
      logs: {},
      searchAssignee: "",
      overlay: false,
      subTaskName: "",
      projectId: "",
      jqlQuery: "",
      assigneeQuery: "",
      projectQuery: "",
      typeQuery: "",
      statusQuery: "",
      orderByQuery: "",
      dateQuery: "",
      taskNameQuery: "",
      // assigneeArray: [],
      templateArray: [],
      filterAssignee: [],
      filterProject: [],
      filterTemplate: "",
      filterType: [],
      filterStatus: [],
      filterResult: [],

      errorMessage: "",
      successMessage: "",
      component: "",
      taskDialog: false,
      taskDeleteDialog: false,
      dateRange: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      states: [],
      filterList: {},
      taskAssigneeFilter: "",
      updatedTask: {
        taskName: "",
      },
      nameOfTask: "",
      taskTypeArray: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" },
      ],
      taskStatusArray: [
        { name: "Pending", id: "pending" },
        { name: "On hold", id: "onHold" },
        { name: "Open", id: "open" },
        { name: "Cancel", id: "cancel" },
        { name: "ReOpened", id: "reOpened" },
        { name: "Fixing", id: "fixing" },
        { name: "Testing", id: "testing" },
        { name: "Resolved", id: "resolved" },
        { name: "In progress", id: "inprogress" },
        { name: "Completed", id: "completed" },
        { name: "Implementing", id: "implementing" },
        { name: "Under review", id: "underReview" },
        { name: "Weiting for approval", id: "waitingForApproval" },
        { name: "Review", id: "review" },
        { name: "Discussion", id: "discussion" },
        { name: "Waiting response", id: "waitingResponse" },
        { name: "Ready", id: "ready" },
        { name: "Deployed", id: "deployed" },
        { name: "Fixed", id: "fixed" },
        { name: "Rejected", id: "rejected" },
        { name: "Closed", id: "closed" },
      ],

      items: [
        { name: "Development", id: "development" },
        { name: "QA", id: "qa" },
        { name: "Design", id: "design" },
        { name: "Bug", id: "bug" },
        { name: "Operational", id: "operational" },
        { name: "Pre-sales", id: "preSales" },
        { name: "General", id: "general" },
      ],
      filterOptions: [
        { id: "none", name: "None" },
        { id: "assignee", name: "Assignee" },
        { id: "issueType", name: "Task type" },
        { id: "dueDate", name: "Date Range" },
      ],
      projects: ["pr1"],
      drawer: null,
      task: {},
      taskObject: {},
      subTasks: [],
      taskFiles: [],
      assignee: {},
      userId: this.$store.state.user.userId,
      taskSelect: "all",
      taskFilter: "none",
      componentClose: null,
      stomp: null,
      baseUrl: process.env.SYSTEM_URL,
    };
  },
  components: {
    "task-side-bar": TaskSideBar,
    "task-dialog": TaskDialog,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
  },
  watch: {
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    },
  },
  mounted() {
    // this.scrollEvent();
  },
  methods: {
    clearTaskName() {
      this.subTaskName = "";
      this.subTagging = false;
      this.datePickerSubDialog = false;
    },
    clearStore() {
      this.$store.dispatch("task/emptyStore");
      this.scrollCount = 1;
      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: false,
      });
      this.$store.dispatch(
        "task/fetchTasksAllTasks",
        this.$route.params.projects
      );
    },
    scrollEvent() {
      var myDiv = document.getElementById("mainDiv");
      myDiv.onscroll = () => {
        let bottomOfWindow =
          myDiv.scrollTop + myDiv.clientHeight === myDiv.scrollHeight;

        if (bottomOfWindow) {
          this.scrollCount = this.scrollCount + 1;
          if (this.scrollCount <= Math.ceil(this.allTaskCount / 10) + 1) {
            this.getAllTasksLazyLoading(this.scrollCount);
          }
        }
      };
    },
    loadMoreButtonAction() {
      this.scrollCount = this.scrollCount + 1;
      this.getAllTasksLazyLoading(this.scrollCount);
    },
    getAllTasksLazyLoading(scrollCount) {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("task/setIndex", {
          startIndex: scrollCount * 10 - 10,
          endIndex: scrollCount * 10,
          isAllTasks: false,
        }),
        this.$store.dispatch(
          "task/fetchTasksAllTasks",
          this.$route.params.projects
        ),
        this.$store.dispatch(
          "task/fetchTotalTaskCount",
          this.$route.params.projects
        ),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    getAllTasks() {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("task/setIndex", {
          startIndex: this.pagination * 10 - 10,
          endIndex: this.pagination * 10,
          isAllTasks: false,
        }),
        this.$store.dispatch(
          "task/fetchTasksAllTasks",
          this.$route.params.projects
        ),
        this.$store.dispatch(
          "task/fetchTotalTaskCount",
          this.$route.params.projects
        ),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    addDate() {
      this.selectedDueDate = this.datePicker;
      this.updatedTask.taskName =
        this.updatedTask.taskName + this.selectedDueDate;
      this.$refs.txtMainTask.focus();
    },
    addSubDate() {
      this.selectedDueDate = this.datePicker;
      this.subTaskName = this.subTaskName + this.selectedDueDate;
      // this.$refs.txtSubTask.focus();
    },
    tagPeople(user) {
      this.tagging = false;
      this.assigneeId = user.id;

      if (this.traverseText != "") {
        this.updatedTask.taskName =
          this.updatedTask.taskName.slice(0, -this.traverseText.length) +
          user.display;
      } else {
        this.updatedTask.taskName = this.updatedTask.taskName + user.display;
      }
      this.$refs.txtMainTask.focus();
      // console.log("SELECTED TAGGING: " + this.assigneeId);
    },
    tagPeopleSubTask(user, index) {
      this.subTagging = false;
      this.assigneeId = user.id;
      if (this.traverseText != "") {
        this.subTaskName =
          this.subTaskName.slice(0, -this.traverseText.length) + user.display;
      } else {
        this.subTaskName = this.subTaskName + user.display;
      }

      // this.$refs.txtSubTask.focus();
      // console.log("SELECTED TAGGING INDEX: " + index);
    },
    autoFillingSubTask(index) {
      if (this.subTaskName != undefined) {
        if (
          this.subTaskName.split("@")[1] != undefined &&
          this.subTaskName.split("@")[1] != ""
        ) {
          this.traverseText = this.subTaskName.split("@")[1];
          // console.log('TAGGING: ' + this.subTaskName.split('@')[1]);
        }
        if (!this.subTaskName.includes("@")) {
          this.subTagging = false;
          this.traverseText = "";
        }
      }
      if (this.subTaskName != "" && this.subTaskName != null) {
        if (
          !this.subTaskName
            .slice(0, this.subTaskName.length - 1)
            .includes("@") &&
          this.subTaskName.charAt(this.subTaskName.length - 1) == "@"
        ) {
          this.subTagging = true;
          this.traverseText = "";
          // console.log("TAGGING: " + this.subTagging);
        } else if (
          !this.subTaskName
            .slice(0, this.subTaskName.length - 1)
            .includes("#") &&
          this.subTaskName.charAt(this.subTaskName.length - 1) == "#"
        ) {
          this.datePickerSubDialog = true;
          // console.log("TAGGING: " + this.tagging);
        } else {
          // this.subTagging = false;
          this.datePickerSubDialog = false;
          // this.assigneeId = "";
        }
      } else {
        // this.subTagging = false;
        this.datePickerSubDialog = false;
      }
    },
    autoFilling() {
      // if (
      //   this.updatedTask.taskName != null &&
      //   this.updatedTask.taskName
      //     .slice(0, this.updatedTask.taskName.length - 1)
      //     .includes('@')
      // ) {
      //   console.log('############### true');
      // } else {
      //   console.log('############### false');
      // }
      if (this.updatedTask.taskName != undefined) {
        if (
          this.updatedTask.taskName.split("@")[1] != undefined &&
          this.updatedTask.taskName.split("@")[1] != ""
        ) {
          this.traverseText = this.updatedTask.taskName.split("@")[1];
          // console.log("TAGGING: " + this.updatedTask.taskName.split("@")[1]);
        }
        if (!this.updatedTask.taskName.includes("@")) {
          this.tagging = false;
          this.traverseText = "";
        }
      }

      if (
        this.updatedTask.taskName != "" &&
        this.updatedTask.taskName != null
      ) {
        if (
          !this.updatedTask.taskName
            .slice(0, this.updatedTask.taskName.length - 1)
            .includes("@") &&
          this.updatedTask.taskName.charAt(
            this.updatedTask.taskName.length - 1
          ) == "@"
        ) {
          this.tagging = true;
          this.traverseText = "";
        } else if (
          !this.updatedTask.taskName
            .slice(0, this.updatedTask.taskName.length - 1)
            .includes("#") &&
          this.updatedTask.taskName.charAt(
            this.updatedTask.taskName.length - 1
          ) == "#"
        ) {
          this.datePickerDialog = true;
          // console.log("TAGGING: " + this.tagging);
        } else {
          // this.tagging = false;
          // this.assigneeId = "";
          this.datePickerDialog = false;
        }
      } else {
        // this.tagging = false;
        this.datePickerDialog = false;
      }
    },
    assigneeLoadArray() {
      let assigneeList = [];
      if (this.tagging || this.subTagging) {
        const matches = this.people.filter((user) => {
          if (
            user.assigneeFirstName
              .toLowerCase()
              .startsWith(this.traverseText.toLowerCase())
          ) {
            assigneeList.push({
              name: user.assigneeFirstName + " " + user.assigneeLastName,
              id: user.assigneeId,
              img: user.assigneeProfileImage,
              display: user.assigneeFirstName + user.assigneeLastName,
            });
          }
        });
        if (assigneeList.length === 0) {
          this.tagging = false;
          this.subTagging = false;
          this.traverseText = "";
        }
        return assigneeList;
      } else {
        let AssigneeSearchList = this.people;
        for (let index = 0; index < AssigneeSearchList.length; ++index) {
          let user = AssigneeSearchList[index];
          assigneeList.push({
            name: user.assigneeFirstName + " " + user.assigneeLastName,
            id: user.assigneeId,
            img: user.assigneeProfileImage,
            display: user.assigneeFirstName + user.assigneeLastName,
          });
        }
        return assigneeList;
      }
    },
    async closeTask(taskId, filter) {
      this.clearStore();
      this.waiting = true;
      this.scrollCount = 1;

      // console.log("onchange updated status ->");
      let response;
      try {
        response = await this.$axios.$put(
          `/projects/${this.projectId}/tasks/${taskId}`,
          {
            taskStatus: "closed",
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );

        this.$store.dispatch("activityLog/fetchTaskActivityLog", {
          taskId: taskId,
          startIndex: 0,
          endIndex: 10,
        });
        if (filter) {
          this.jqlSearch();
        }

        this.$store.dispatch("task/setIndex", {
          startIndex: 0,
          endIndex: 10,
          isAllTasks: false,
        });

        this.component = "success-popup";
        this.successMessage = "Status successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;

        this.clearStore();

        // console.log("update task status response", response);
      } catch (e) {
        // this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.waiting = false;
        // console.log("Error updating a status", e);
      }
    },
    changeTaskOption(type) {
      this.scrollCount = 1;
      this.$store.dispatch("task/emptyStore");
      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: false,
      });
      this.$emit("changeTaskOption", type);
    },

    backPannelDisplay(child) {
      if (child != 0) {
        return "backPannelAllTask";
      } else {
        return "";
      }
    },
    taskStatusFormatting(status) {
      switch (status) {
        case "pending":
          return "Pending";
          break;
        case "onHold":
          return "On Hold";
          break;
        case "open":
          return "Open";
          break;
        case "cancel":
          return "Cancel";
          break;
        case "reOpened":
          return "Re Opened";
          break;
        case "fixing":
          return "Fixing";
          break;
        case "testing":
          return "Testing";
          break;
        case "resolved":
          return "Resolved";
          break;
        case "inprogress":
          return "Inprogress";
          break;
        case "completed":
          return "Completed";
          break;
        case "implementing":
          return "Implementing";
          break;
        case "underReview":
          return "UnderReview";
          break;
        case "waitingForApproval":
          return "Waiting for Approval";
          break;
        case "review":
          return "Review";
          break;
        case "discussion":
          return "Discussion";
          break;
        case "waitingResponse":
          return "Waiting Response";
          break;
        case "ready":
          return "Ready";
          break;
        case "deployed":
          return "Deployed";
          break;
        case "fixed":
          return "Fixed";
          break;
        case "rejected":
          return "Rejected";
          break;
        case "closed":
          return "Closed";
          break;
        default:
      }
    },
    taskTypeFormatting(type) {
      switch (type) {
        case "development":
          return "Development";
          break;
        case "qa":
          return "QA";
          break;
        case "design":
          return "Design";
          break;
        case "bug":
          return "Bug";
          break;
        case "operational":
          return "Operational";
          break;
        case "preSales":
          return "Pre-sales";
          break;
        case "general":
          return "General";
          break;
        default:
      }
    },
    exportAsCSV() {
      var blob = new Blob([Papa.unparse(this.filterList)], {
        type: "text/csv;charset=utf-8;",
      });

      var link = document.createElement("a");

      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "taskList.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    filterChange() {
      this.nameOfTask = "";
      this.assigneeOfTask = [];
      this.taskType = [];
      this.taskStatus = [];
      this.dateRange = null;
      this.taskFilter = "none";

      this.taskNameQuery = "";
      this.assigneeQuery = "";
      this.typeQuery = "";
      this.statusQuery = "";
      this.dateRange = null;
      this.jqlQuery = null;
    },
    jqlSearch() {
      this.overlay = true;
      if (this.filterAssignee.length != 0) {
        let assigneeList = "";
        for (let i = 0; i < this.filterAssignee.length; i++) {
          assigneeList = assigneeList + '"' + this.filterAssignee[i].id + '"';
          if (i < this.filterAssignee.length - 1) {
            assigneeList = assigneeList + ",";
          }
        }
        this.assigneeQuery = "taskAssignee IN " + "(" + assigneeList + ") AND ";
      }
      this.projectQuery = 'projectId IN ("' + this.projectId + '")  AND ';
      if (this.filterType.length != 0) {
        let typeList = "";
        for (let i = 0; i < this.filterType.length; i++) {
          typeList = typeList + '"' + this.filterType[i].id + '"';
          if (i < this.filterType.length - 1) {
            typeList = typeList + ",";
          }
        }
        this.typeQuery = "issueType IN " + "(" + typeList + ")  AND ";
      }
      if (this.filterStatus.length != 0) {
        let statusList = "";
        for (let i = 0; i < this.filterStatus.length; i++) {
          statusList = statusList + '"' + this.filterStatus[i].id + '"';
          if (i < this.filterStatus.length - 1) {
            statusList = statusList + ",";
          }
        }
        this.statusQuery = "taskStatus IN " + "(" + statusList + ")  AND ";
      }
      if (this.dateRange != null) {
        if (
          this.dateRange.start !== undefined &&
          this.dateRange.end !== undefined
        ) {
          this.from = this.dateRange.start;
          this.to = this.dateRange.end;
          const startDate = new Date(this.dateRange.start);
          const isoStartDate = new Date(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          ).toISOString();

          const endDate = new Date(this.dateRange.end);
          const isoEndDate = new Date(
            endDate.getTime() - endDate.getTimezoneOffset() * 60000
          ).toISOString();

          this.dateQuery =
            'taskDueDateAt BETWEEN "' +
            isoStartDate +
            '" AND "' +
            isoEndDate +
            '" AND ';
        }
      }
      this.orderByQuery =
        "ORDER BY FIELD(taskStatus, 'closed') ASC,  taskCreatedAt DESC";

      if (this.nameOfTask != "" && this.nameOfTask != null) {
        this.taskNameQuery =
          'taskName LIKE "%25' + this.nameOfTask + '%25"  AND ';
      }

      let filterQuery =
        this.assigneeQuery +
        this.projectQuery +
        this.typeQuery +
        this.statusQuery +
        this.dateQuery +
        this.taskNameQuery;

      this.jqlQuery = filterQuery.slice(0, -5) + this.orderByQuery;
      // console.log("QUERY:  " + encodeURI(this.jqlQuery));
      this.events = [];
      this.getFilterResponse();
    },
    async getFilterResponse() {
      let taskFilterResponse;
      try {
        taskFilterResponse = await this.$axios.$get(
          `/projects/workload/filter?query=${this.jqlQuery}`,
          {
            headers: {
              user: this.$store.state.user.userId,
            },
          }
        );
        // console.log("tasks--->", taskFilterResponse.data);
        this.taskFilter = true;
        this.overlay = false;
        this.filterList = taskFilterResponse.data;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error fetching data", error);
      }
    },
    clearAssignee() {
      this.assigneeQuery = "";
      this.jqlQuery = "";
    },
    clearType() {
      this.typeQuery = "";
      this.jqlQuery = "";
    },
    clearStatus() {
      this.statusQuery = "";
      this.jqlQuery = "";
    },
    clearDate() {
      this.dateQuery = "";
      this.jqlQuery = "";
    },
    clearName() {
      this.taskNameQuery = "";
      this.jqlQuery = "";
    },
    loadAssignee(v) {
      let AssigneeSearchList = this.people;
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        this.assigneeArray.push({
          name: user.assigneeFirstName + " " + user.assigneeLastName,
          id: user.assigneeId,
          img: user.assigneeProfileImage,
        });
      }
    },
    filterStyles(isParent) {
      if (isParent == true) {
        return "restructuredMainTaskFilterList";
      } else {
        return "restructuredChildTaskFilterList";
      }
    },
    checkBoxColor(isParent) {
      if (isParent == true) {
        return "#EDF0F5";
      } else {
        return "#FFFFFF";
      }
    },
    taskDialogClosing() {
      if (this.filterList != "" && this.taskFilter != "none") {
        // console.log("TRIGGERED");
        this.jqlSearch();
      }
      this.taskDialog = false;
      // console.log("Task Dialog Closing");
      if (this.stomp !== null) {
        this.stomp.disconnect(() => {
          // console.log("client disconnected");
        });
      }
    },
    // async filterTasks(filterType, assignee, from, to, issueType) {
    //   console.log(
    //     "filter options " + filterType,
    //     assignee,
    //     from,
    //     to,
    //     issueType
    //   );
    //   let response;
    //   try {
    //     response = await this.$axios.$get(
    //       `/projects/${this.projectId}/tasks/filter`,
    //       {
    //         data: {},
    //         headers: {
    //           user: this.userId,
    //           filterType: filterType,
    //           assignee: assignee,
    //           issueType: issueType,
    //           from: from.slice(0, 10),
    //           to: to.slice(0, 10)
    //         }
    //       }
    //     );
    //     this.filterList = response.data;
    //     console.log("filter response: " + response.data);
    //   } catch (e) {
    //     console.log("Error filter task", e);
    //   }
    // },
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
        // this.component = 'success-popup'
        this.$emit("listenChange");
        this.$emit("shrinkSideBar");

        // console.log(response.data);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
    // ------- popup close ----------
    close() {
      this.component = "";
    },
    async addTask(selectedParentTask, issueType) {
      if (
        this.updatedTask.taskName != "" ||
        this.updatedTask.taskName != null
      ) {
        this.scrollCount = 1;
        this.overlay = true;
        let response;
        let taskName;
        let assignee;

        if (!this.updatedTask.taskName.includes("@")) {
          this.assigneeId = "";
        }
        if (!this.updatedTask.taskName.includes("#")) {
          this.selectedDueDate = "";
        }

        if (this.assigneeId != "" && this.selectedDueDate == "") {
          taskName = this.updatedTask.taskName.split("@")[0];
          assignee = this.assigneeId;
        } else if (this.selectedDueDate != "" && this.assigneeId != "") {
          taskName = this.updatedTask.taskName.split("@")[0];
          assignee = this.assigneeId;
        } else if (this.selectedDueDate != "" && this.assigneeId == "") {
          taskName = this.updatedTask.taskName.split("#")[0];
        } else {
          taskName = this.updatedTask.taskName;
          assignee = this.userId;
        }

        try {
          response = await this.$axios.$post(
            `/projects/${this.projectId}/tasks`,
            {
              taskName: taskName,
              projectId: this.projectId,
              taskInitiator: this.userId,
              taskAssignee: assignee,
              taskDueDate: new Date(this.selectedDueDate),
              taskRemindOnDate: "",
              taskStatus: null,
              taskNotes: "",
              issueType: issueType,
              parentTaskId: selectedParentTask,
            }
          );
          this.$refs.form.reset();
          this.component = "success-popup";
          this.successMessage = "Task added successfully";
          setTimeout(() => {
            this.close();
          }, 3000);
          this.overlay = false;
          this.selectedDueDate = "";
          this.assigneeId = "";
          this.scrollCount = 1;
          this.$store.dispatch("task/emptyStore");
          this.$store.dispatch("task/setIndex", {
            startIndex: 0,
            endIndex: 10,
            isAllTasks: false,
          });
          this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
          this.updatedTask.taskName = "";
        } catch (e) {
          this.overlay = false;
          this.selectedDueDate = "";
          this.assigneeId = "";
          this.errorMessage = e.response.data;
          this.component = "error-popup";
          setTimeout(() => {
            this.close();
          }, 3000);
          console.log("Error updating a status", e);
        }
      }
    },
    async addSubTask(index, selectedParentTask, issueType, sprintId, dueDate) {
      // this.scrollCount = 1;
      this.overlay = true;
      let response;
      let taskName;
      let assignee;
      let taskDue;

      // if (this.assigneeId != "") {
      //   taskName = this.subTaskName.split("@")[0];
      //   assignee = this.assigneeId;
      // } else {
      //   taskName = this.subTaskName;
      //   assignee = this.userId;
      // }

      if (!this.subTaskName.includes("@")) {
        this.assigneeId = "";
      }
      if (!this.subTaskName.includes("#")) {
        this.selectedDueDate = "";
      }

      if (this.assigneeId != "" && this.selectedDueDate == "") {
        taskName = this.subTaskName.split("@")[0];
        taskDue = dueDate;
        assignee = this.assigneeId;
      } else if (this.selectedDueDate != "" && this.assigneeId != "") {
        taskName = this.subTaskName.split("@")[0];
        assignee = this.assigneeId;
        taskDue = this.selectedDueDate;
      } else if (this.selectedDueDate != "" && this.assigneeId == "") {
        taskName = this.subTaskName.split("#")[0];
        taskDue = this.selectedDueDate;
      } else {
        taskName = this.subTaskName;
        assignee = this.userId;
        taskDue = dueDate;
      }

      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: taskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: assignee,
            taskDueDate: taskDue,
            taskRemindOnDate: "",
            taskStatus: null,
            taskNotes: "",
            issueType: issueType,
            sprintId: sprintId,
            parentTaskId: selectedParentTask,
          }
        );
        this.subTaskName = "";
        this.component = "success-popup";
        this.successMessage = "Task added successfully";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        this.selectedDueDate = "";
        this.assigneeId = "";
        this.scrollCount = 1;
        this.$store.dispatch("task/emptyStore");
        this.$store.dispatch("task/setIndex", {
          startIndex: 0,
          endIndex: 10,
          isAllTasks: false,
        });
        this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        this.selectedDueDate = "";
        this.assigneeId = "";
        console.log("Error updating a status", e);
      }
    },
    clearFilter() {
      // console.log("selected===========> " + this.taskSelect);
      this.taskSelect == null;
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
          img: user.assigneeProfileImage,
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    listenToChange() {
      // console.log("listened to changes ------->");
      this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
      this.$store.dispatch("task/fetchTasksMyTasks", this.projectId);
      this.$store.dispatch("task/fetchProjectTaskCompletion", this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    taskFilterHandler() {
      // console.log("-----------> changed" + this.taskSelect);
    },
    websocketConnectInit(taskId) {
      // console.log("initalize websocket connection for task", taskId);
      const url = this.baseUrl + "/api/pm-service";
      try {
        // console.log("connecting to ws...");
        let socket = new SockJS(url + "/chat");
        //this.stompClient = Stomp.over(socket);
        this.stomp = Stomp.over(socket);
        //this.$store.dispatch("stompClient/setStompClient", "this.stomp");
        //let client = this.stompClient;
        this.stomp.connect({}, (frame) => {
          // console.log("connected to: " + frame);
          // console.log("subscribing to topic: " + "/topic/messages/" + taskId);
          this.stomp.subscribe("/topic/messages/" + taskId, (response) => {
            // console.log("Response", response);
            let data = JSON.parse(response.body);
            // console.log("outside----->");
            if (data.actionType === "comment") {
              // console.log("inside----->");
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
    async selectTask(task, taskObject) {
      // console.log("select________>");
      this.websocketConnectInit(task.taskId);
      this.task = task;
      this.$store.dispatch("task/setSelectedTask", task);
      this.taskObject = taskObject;
      this.componentClose = "";
      this.$axios.get(`/users/${task.taskAssignee}`).then(async (response) => {
        // console.log("fetched task -->", response.data.data);
        this.assignee = response.data.data;
      });
      this.$store.dispatch("user/setSelectedTaskUser", task.taskAssignee);
      if (this.filterList != "" && this.taskFilter != "none") {
        if (this.task.parent) {
          // console.log("parent task 1");
          this.$store.dispatch("task/fetchChildren", {
            projectId: this.projectId,
            taskId: this.task.taskId,
          });
        } else {
          this.$store.dispatch("task/fetchParentTask", {
            projectId: this.projectId,
            taskId: this.task.parentId,
          });
        }
      } else {
        if (this.task.isParent) {
          // console.log("parent task 2");
          this.$store.dispatch("task/fetchChildren", {
            projectId: this.projectId,
            taskId: this.task.taskId,
          });
        } else {
          this.$store.dispatch("task/fetchParentTask", {
            projectId: this.projectId,
            taskId: this.task.parentId,
          });
        }
      }
      // if (this.task.isParent) {
      //   // console.log("parent task");
      //   this.$store.dispatch("task/fetchChildren", {
      //     projectId: this.projectId,
      //     taskId: this.task.taskId,
      //   });
      // } else {
      //   this.$store.dispatch("task/fetchParentTask", {
      //     projectId: this.projectId,
      //     taskId: this.task.parentId,
      //   });
      // }
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/${task.taskId}/files`,
          {
            headers: {
              user: this.userId,
              type: "project",
            },
          }
        );
        // console.log("files--->", taskFilesResponse.data);
        this.taskFiles = taskFilesResponse.data;
        this.$store.dispatch("task/setTaskFiles", taskFilesResponse.data);
      } catch (error) {
        // console.log("Error fetching data", error);
      }

      this.$store.dispatch("activityLog/fetchTaskActivityLog", {
        taskId: task.taskId,
        startIndex: 0,
        endIndex: 10,
      });

      this.$store.dispatch("comments/fetchTaskActivityComment", {
        taskId: task.taskId,
        startIndex: 0,
        endIndex: 10,
      });

      this.$store.dispatch("comments/fetchTaskCommentLength", task.taskId);

      this.$store.dispatch("user/fetchOwnUser", this.userId);

      // let taskLogResponse;
      // try {
      //   taskLogResponse = await this.$axios.$get(
      //     `/activity/task/${this.selectedTask.taskId}?startIndex=0&endIndex=10`,
      //     {
      //       headers: {
      //         userId: this.selectedTask.taskAssignee,
      //       },
      //     }
      //   );
      //   console.log('logs--->', taskLogResponse.data);
      //   this.logs = taskLogResponse.data;
      // } catch (error) {
      //   console.log('Error fetching data', error);
      // }
    },
    TypeCheck(task) {
      if (task === "development") {
        return "developmentStatus";
      } else if (task === "qa") {
        return "qaStatus";
      } else if (task === "design") {
        return "designStatus";
      } else if (task === "bug") {
        return "bugStatus";
      } else if (task === "operational") {
        return "operationalStatus";
      } else if (task === "preSales") {
        return "preSalesStatus";
      } else if (task === "general") {
        return "generalStatus";
      } else {
        return "otherStatus";
      }
    },
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
  },
  async created() {
    this.projectId = this.$route.params.projects;
  },
  computed: {
    ...mapState({
      fetchProject: (state) => state.project.project,
      allTaskCount: (state) => state.task.totalCount,
      people: (state) => state.task.userCompletionTasks,
      projectAllTasks: (state) => state.task.allTasks,
      // projectId: state => state.project.project.projectId,
      selectedTask: (state) => state.task.selectedTask,
      // stompClient: state => state.stompClient.stompClient
    }),
    assigneeArray() {
      let AssigneeSearchList = this.people;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.assigneeFirstName + " " + user.assigneeLastName,
          id: user.assigneeId,
          img: user.assigneeProfileImage,
          display: user.assigneeFirstName + user.assigneeLastName,
        });
      }
      return assigneeList;
    },
    assigneeOfTask: {
      get() {
        this.loadAssignee();
      },
      set(value) {
        this.filterAssignee = value;
      },
    },
    taskType: {
      get() {},
      set(value) {
        this.filterType = value;
      },
    },
    taskStatus: {
      get() {},
      set(value) {
        this.filterStatus = value;
      },
    },
    taskName: {
      get() {
        return this.updatedTask.taskName;
      },
      set(value) {
        this.updatedTask.taskName = value;
      },
    },
  },
};
</script>

<style scoped></style>
