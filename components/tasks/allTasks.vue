<template>
  <div class>
    <v-btn
      v-if="this.filterList != '' && this.taskFilter != 'none'"
      style="position: absolute; right: 60px; margin-top: -45px"
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
    <div class="filterSection">
      <v-row>
        <v-col md="2">
          <v-text-field
            dense
            clearable
            @click:clear="clearName()"
            v-model="nameOfTask"
            outlined
            flat
            label="Task Name"
            background-color="#FFFFFF"
          ></v-text-field>
        </v-col>
        <v-col md="2">
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
          >
            <template v-slot:selection="{ item, index }">
              <v-chip x-small style="width: 30px" v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="2">
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
          >
            <template v-slot:selection="{ item, index }">
              <v-chip x-small style="width: 30px" v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="2">
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
          >
            <template v-slot:selection="{ item, index }">
              <v-chip x-small style="width: 30px" v-if="index === 0">
                <span>{{ item.name }}</span>
              </v-chip>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="2">
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
          ></VueCtkDateTimePicker>
        </v-col>
        <v-col md="1">
          <v-btn
            @click="jqlSearch()"
            dark
            width="100%"
            height="40px"
            color="#080848"
          >
            <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>
            <!-- Filter -->
          </v-btn>
        </v-col>
        <v-col md="1">
          <v-btn
            @click="filterChange()"
            dark
            width="100%"
            height="40px"
            color="#FF6161"
          >
            <v-icon color="#FFFFFF">mdi-cancel</v-icon>
            <!-- Cancel -->
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div
      v-if="this.taskFilter == 'none'"
      class="taskListViewContent overflow-y-auto"
    >
      <div
        v-if="this.taskFilter == 'none'"
        class="restructuredTaskCreate allTaskCreateTab"
      >
        <v-form onsubmit="return false" ref="form">
          <v-text-field
            v-model="taskName"
            background-color="#EDF0F5"
            solo
            prepend-inner-icon="mdi-plus-circle"
            label="Add a main task..."
            class
            @keyup.enter="addTask(null, 'general')"
            clearable
            hint="Type a task name and hit enter"
          ></v-text-field>
        </v-form>
      </div>
      <!-- ------ start task list ------- -->
      <div v-for="(task, index) in projectAllTasks" :key="index">
        <v-hover v-slot:default="{ hover }">
          <div>
            <div class="backPannelAllTask">
              <div class="taskList restructuredMainTaskList">
                <v-list-item class="upperListItem">
                  <v-list-item
                    class="innerListItem"
                    @click="
                      selectTask(task.parentTask, task);
                      taskDialog = true;
                    "
                  >
                    <!-- @click.stop="drawer = !drawer" -->
                    <v-list-item-action>
                      <v-icon
                        v-if="task.parentTask.taskStatus == 'closed'"
                        size="30"
                        color="#2EC973"
                        >mdi-checkbox-marked-circle</v-icon
                      >
                      <v-icon v-else size="30" color="#EDF0F5"
                        >mdi-checkbox-blank-circle</v-icon
                      >
                    </v-list-item-action>
                    <div class="tasklistTaskNames restructuredMainTaskName">
                      <div class="body-2">
                        <span class="restructuredMainTaskCode">{{
                          task.parentTask.secondaryTaskId
                        }}</span>
                        {{ task.parentTask.taskName }}
                      </div>
                    </div>
                    <div
                      class="restStatusChip"
                      :class="statusCheck(task.parentTask.issueType)"
                    >
                      {{ taskTypeFormatting(task.parentTask.issueType) }}
                    </div>
                    <v-list-item-content class="updatedDate">
                      <v-list-item-title
                        :class="dueDateCheck(task.parentTask)"
                        >{{
                          getProjectDates(task.parentTask.taskDueDateAt)
                        }}</v-list-item-title
                      >
                    </v-list-item-content>
                    <div>
                      <v-list-item-avatar>
                        <v-img
                          v-if="
                            task.parentTask.taskAssigneeProfileImage != null &&
                              task.parentTask.taskAssigneeProfileImage != ''
                          "
                          :src="task.parentTask.taskAssigneeProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                        ></v-img>
                      </v-list-item-avatar>
                    </div>
                    <div class="bluePartMyTask"></div>
                  </v-list-item>
                  <div class="boardTabLinkIcon">
                    <nuxt-link
                      :to="
                        '/task/' +
                          task.parentTask.taskId +
                          '/?project=' +
                          projectId
                      "
                      style="text-decoration: none;"
                      target="_blank"
                    >
                      <v-icon color="blue">mdi-link-variant</v-icon>
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
                    v-if="hover"
                    v-model="subTaskName[index]"
                    background-color="#0BAFFF"
                    solo
                    dark
                    prepend-inner-icon="mdi-plus-circle"
                    label="Add a sub task..."
                    class
                    @keyup.enter="
                      addSubTask(
                        index,
                        task.parentTask.taskId,
                        task.parentTask.issueType,
                        task.parentTask.sprintId
                      )
                    "
                    clearable
                  ></v-text-field>
                </v-expand-transition>
              </div>
              <div v-if="task.childTasks.length !== 0">
                <div
                  v-for="(childTask, index) in task.childTasks"
                  :key="index"
                  class="taskList restructuredSubTaskList"
                >
                  <v-list-item class="upperListItem">
                    <v-list-item
                      class="innerListItem"
                      @click="
                        selectTask(childTask, task);
                        taskDialog = true;
                      "
                    >
                      <!-- @click.stop="drawer = !drawer" -->
                      <v-list-item-action>
                        <v-icon
                          v-if="childTask.taskStatus == 'closed'"
                          size="30"
                          color="#2EC973"
                          >mdi-checkbox-marked-circle</v-icon
                        >
                        <v-icon v-else size="30" color="#EDF0F5"
                          >mdi-checkbox-blank-circle</v-icon
                        >
                      </v-list-item-action>
                      <div class="tasklistTaskNames restructuredSubTaskName">
                        <div class="body-2">
                          <span class="restructuredMainTaskCode">{{
                            childTask.secondaryTaskId
                          }}</span>
                          {{ childTask.taskName }}
                        </div>
                      </div>
                      <div
                        class="restStatusChip"
                        :class="statusCheck(childTask.issueType)"
                      >
                        {{ taskTypeFormatting(childTask.issueType) }}
                      </div>
                      <v-list-item-content class="updatedDate">
                        <v-list-item-title :class="dueDateCheck(childTask)">{{
                          getProjectDates(childTask.taskDueDateAt)
                        }}</v-list-item-title>
                      </v-list-item-content>
                      <div>
                        <v-list-item-avatar>
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
                      </div>
                    </v-list-item>
                    <div class="boardTabLinkIcon">
                      <nuxt-link
                        :to="
                          '/task/' + childTask.taskId + '/?project=' + projectId
                        "
                        style="text-decoration: none;"
                        target="_blank"
                      >
                        <v-icon color="blue">mdi-link-variant</v-icon>
                      </nuxt-link>
                    </div>
                  </v-list-item>
                </div>
              </div>

              <!-- -------------- end sub task design -------------- -->
            </div>
          </div>
        </v-hover>
      </div>
      <div style="margin-top: 50px">
        <v-pagination
          @input="getAllTasks()"
          v-model="pagination"
          :length="Math.ceil(this.allTaskCount / 10)"
          circle
          :total-visible="8"
        ></v-pagination>
      </div>
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
    </div>
    <!-- -------------- filter list -------------- -->
    <div v-else class="taskListViewContent filterListTop overflow-y-auto">
      <div v-if="this.filterList == ''" class="filterTitleDiv headline">
        No items to show
      </div>
      <div v-for="(task, index) in filterList" :key="index">
        <div class="taskList" :class="filterStyles(task.isParent)">
          <nuxt-link
            :to="'/task/' + task.taskId + '/?project=' + projectId"
            style="text-decoration: none;"
            target="_blank"
          >
            <v-list-item @click="selectTask(task, task)">
              <!-- @click.stop="drawer = !drawer" -->
              <v-list-item-action>
                <v-icon
                  v-if="task.taskStatus == 'closed'"
                  size="30"
                  color="#2EC973"
                  >mdi-checkbox-marked-circle</v-icon
                >
                <v-icon v-else size="30" :color="checkBoxColor(task.isParent)"
                  >mdi-checkbox-blank-circle</v-icon
                >
              </v-list-item-action>
              <div class="tasklistTaskNames restructuredMainTaskName">
                <div class="body-2">
                  <span class="restructuredMainTaskCode">{{
                    task.secondaryTaskId
                  }}</span>
                  {{ task.taskName }}
                </div>
              </div>
              <div class="restStatusChip" :class="statusCheck(task.issueType)">
                {{ taskTypeFormatting(task.issueType) }}
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title :class="dueDateCheck(task)">{{
                  getProjectDates(task.taskDueDateAt)
                }}</v-list-item-title>
              </v-list-item-content>
              <div>
                <v-list-item-avatar>
                  <v-img
                    v-if="task.profileImage != null && task.profileImage != ''"
                    :src="task.profileImage"
                  ></v-img>
                  <v-img
                    v-else
                    src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                  ></v-img>
                </v-list-item-avatar>
              </div>
              <div v-if="task.isParent == true" class="bluePart"></div>
            </v-list-item>
          </nuxt-link>
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
              color="success"
              width="100px"
              @click="taskDeleteDialog = false"
              >Cancel</v-btn
            >
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
    <v-overlay :value="overlay">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import TaskSideBar from '~/components/tasks/taskSideBar';
import TaskDialog from '~/components/tasks/taskDialog';
import SuccessPopup from '~/components/popups/successPopup';
import ErrorPopup from '~/components/popups/errorPopup';
import Progress from '~/components/popups/progress';
import { mapState } from 'vuex';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Papa from 'papaparse';

export default {
  props: ['pagination'],
  data() {
    return {
      pagination: this.pagination,
      logs: {},
      searchAssignee: '',
      overlay: false,
      subTaskName: [],
      projectId: '',
      jqlQuery: '',
      assigneeQuery: '',
      projectQuery: '',
      typeQuery: '',
      statusQuery: '',
      orderByQuery: '',
      dateQuery: '',
      taskNameQuery: '',
      // assigneeArray: [],
      templateArray: [],
      filterAssignee: [],
      filterProject: [],
      filterTemplate: '',
      filterType: [],
      filterStatus: [],
      filterResult: [],

      errorMessage: '',
      successMessage: '',
      component: '',
      taskDialog: false,
      taskDeleteDialog: false,
      dateRange: null,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      states: [],
      filterList: {},
      taskAssigneeFilter: '',
      updatedTask: {
        taskName: '',
      },
      nameOfTask: '',
      taskTypeArray: [
        { name: 'Development', id: 'development' },
        { name: 'QA', id: 'qa' },
        { name: 'Design', id: 'design' },
        { name: 'Bug', id: 'bug' },
        { name: 'Operational', id: 'operational' },
        { name: 'Pre-sales', id: 'preSales' },
        { name: 'General', id: 'general' },
      ],
      taskStatusArray: [
        { name: 'Pending', id: 'pending' },
        { name: 'On hold', id: 'onHold' },
        { name: 'Open', id: 'open' },
        { name: 'Cancel', id: 'cancel' },
        { name: 'ReOpened', id: 'reOpened' },
        { name: 'Fixing', id: 'fixing' },
        { name: 'Testing', id: 'testing' },
        { name: 'Resolved', id: 'resolved' },
        { name: 'In progress', id: 'inprogress' },
        { name: 'Completed', id: 'completed' },
        { name: 'Implementing', id: 'implementing' },
        { name: 'Under review', id: 'underReview' },
        { name: 'Weiting for approval', id: 'waitingForApproval' },
        { name: 'Review', id: 'review' },
        { name: 'Discussion', id: 'discussion' },
        { name: 'Waiting response', id: 'waitingResponse' },
        { name: 'Ready', id: 'ready' },
        { name: 'Deployed', id: 'deployed' },
        { name: 'Fixed', id: 'fixed' },
        { name: 'Rejected', id: 'rejected' },
        { name: 'Closed', id: 'closed' },
      ],

      items: [
        { name: 'Development', id: 'development' },
        { name: 'QA', id: 'qa' },
        { name: 'Design', id: 'design' },
        { name: 'Bug', id: 'bug' },
        { name: 'Operational', id: 'operational' },
        { name: 'Pre-sales', id: 'preSales' },
        { name: 'General', id: 'general' },
      ],
      filterOptions: [
        { id: 'none', name: 'None' },
        { id: 'assignee', name: 'Assignee' },
        { id: 'issueType', name: 'Task type' },
        { id: 'dueDate', name: 'Date Range' },
      ],
      projects: ['pr1'],
      drawer: null,
      task: {},
      taskObject: {},
      subTasks: [],
      taskFiles: [],
      assignee: {},
      userId: this.$store.state.user.userId,
      taskSelect: 'all',
      taskFilter: 'none',
      componentClose: null,
      stomp: null,
      baseUrl: process.env.SYSTEM_URL,
    };
  },
  components: {
    'task-side-bar': TaskSideBar,
    'task-dialog': TaskDialog,
    'success-popup': SuccessPopup,
    'error-popup': ErrorPopup,
    'progress-loading': Progress,
  },
  watch: {
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    },
  },
  methods: {
    taskTypeFormatting(type) {
      switch (type) {
        case 'development':
          return 'Development';
          break;
        case 'qa':
          return 'QA';
          break;
        case 'design':
          return 'Design';
          break;
        case 'bug':
          return 'Bug';
          break;
        case 'operational':
          return 'Operational';
          break;
        case 'preSales':
          return 'Pre-sales';
          break;
        case 'general':
          return 'General';
          break;
        default:
      }
    },
    exportAsCSV() {
      var blob = new Blob([Papa.unparse(this.filterList)], {
        type: 'text/csv;charset=utf-8;',
      });

      var link = document.createElement('a');

      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'taskList.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    getAllTasks() {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch('task/setIndex', {
          startIndex: this.pagination * 10 - 10,
          endIndex: this.pagination * 10,
        }),
        this.$store.dispatch(
          'task/fetchTasksAllTasks',
          this.$route.params.projects
        ),
        this.$store.dispatch(
          'task/fetchTotalTaskCount',
          this.$route.params.projects
        ),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    filterChange() {
      this.nameOfTask = '';
      this.assigneeOfTask = [];
      this.taskType = [];
      this.taskStatus = [];
      this.dateRange = null;
      this.taskFilter = 'none';

      this.taskNameQuery = '';
      this.assigneeQuery = '';
      this.typeQuery = '';
      this.statusQuery = '';
      this.dateRange = null;
      this.jqlQuery = null;
    },
    jqlSearch() {
      this.overlay = true;
      if (this.filterAssignee.length != 0) {
        let assigneeList = '';
        for (let i = 0; i < this.filterAssignee.length; i++) {
          assigneeList = assigneeList + '"' + this.filterAssignee[i].id + '"';
          if (i < this.filterAssignee.length - 1) {
            assigneeList = assigneeList + ',';
          }
        }
        this.assigneeQuery = 'taskAssignee IN ' + '(' + assigneeList + ') AND ';
      }
      this.projectQuery = 'projectId IN ("' + this.projectId + '")  AND ';
      if (this.filterType.length != 0) {
        let typeList = '';
        for (let i = 0; i < this.filterType.length; i++) {
          typeList = typeList + '"' + this.filterType[i].id + '"';
          if (i < this.filterType.length - 1) {
            typeList = typeList + ',';
          }
        }
        this.typeQuery = 'issueType IN ' + '(' + typeList + ')  AND ';
      }
      if (this.filterStatus.length != 0) {
        let statusList = '';
        for (let i = 0; i < this.filterStatus.length; i++) {
          statusList = statusList + '"' + this.filterStatus[i].id + '"';
          if (i < this.filterStatus.length - 1) {
            statusList = statusList + ',';
          }
        }
        this.statusQuery = 'taskStatus IN ' + '(' + statusList + ')  AND ';
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
      this.orderByQuery = 'ORDER BY projectName ASC';

      if (this.nameOfTask != '' && this.nameOfTask != null) {
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
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error fetching data', error);
      }
    },
    clearAssignee() {
      this.assigneeQuery = '';
      this.jqlQuery = '';
    },
    clearType() {
      this.typeQuery = '';
      this.jqlQuery = '';
    },
    clearStatus() {
      this.statusQuery = '';
      this.jqlQuery = '';
    },
    clearDate() {
      this.dateQuery = '';
      this.jqlQuery = '';
    },
    clearName() {
      this.taskNameQuery = '';
      this.jqlQuery = '';
    },
    loadAssignee(v) {
      let AssigneeSearchList = this.people;
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        this.assigneeArray.push({
          name: user.assigneeFirstName + ' ' + user.assigneeLastName,
          id: user.assigneeId,
          img: user.assigneeProfileImage,
        });
      }
    },
    filterStyles(isParent) {
      if (isParent == true) {
        return 'restructuredMainTaskFilterList';
      } else {
        return 'restructuredChildTaskFilterList';
      }
    },
    checkBoxColor(isParent) {
      if (isParent == true) {
        return '#EDF0F5';
      } else {
        return '#FFFFFF';
      }
    },
    taskDialogClosing() {
      console.log('Task Dialog Closing');
      if (this.stomp !== null) {
        this.stomp.disconnect(() => {
          console.log('client disconnected');
        });
      }
      this.taskDialog = false;
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
              type: 'project',
            },
          }
        );
        // this.component = 'success-popup'
        this.$emit('listenChange');
        this.$emit('shrinkSideBar');

        // console.log(response.data);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error creating project', e);
      }
    },
    // ------- popup close ----------
    close() {
      this.component = '';
    },
    async addTask(selectedParentTask, issueType) {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: this.updatedTask.taskName,
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.userId,
            taskDueDate: '',
            taskRemindOnDate: '',
            taskStatus: null,
            taskNotes: '',
            issueType: issueType,
            parentTaskId: selectedParentTask,
          }
        );
        this.$refs.form.reset();
        this.component = 'success-popup';
        this.successMessage = 'Task added successfully';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        this.$store.dispatch('task/fetchTasksAllTasks', this.projectId);
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error updating a status', e);
      }
    },
    async addSubTask(index, selectedParentTask, issueType, sprintId) {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/tasks`,
          {
            taskName: this.subTaskName[index],
            projectId: this.projectId,
            taskInitiator: this.userId,
            taskAssignee: this.userId,
            taskDueDate: '',
            taskRemindOnDate: '',
            taskStatus: null,
            taskNotes: '',
            issueType: issueType,
            sprintId: sprintId,
            parentTaskId: selectedParentTask,
          }
        );
        this.subTaskName = [];
        this.component = 'success-popup';
        this.successMessage = 'Task added successfully';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        this.$store.dispatch('task/fetchTasksAllTasks', this.projectId);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error updating a status', e);
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
          name: user.assigneeFirstName + ' ' + user.assigneeLastName,
          id: user,
          img: user.assigneeProfileImage,
        });
      }
      // console.log("nameList", this.states);
      this.loading = true;
    },
    listenToChange() {
      // console.log("listened to changes ------->");
      this.$store.dispatch('task/fetchTasksAllTasks', this.projectId);
      this.$store.dispatch('task/fetchTasksMyTasks', this.projectId);
      this.$store.dispatch('task/fetchProjectTaskCompletion', this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    taskFilterHandler() {
      // console.log("-----------> changed" + this.taskSelect);
    },
    websocketConnectInit(taskId) {
      console.log('initalize websocket connection for task', taskId);
      const url = this.baseUrl + '/api/pm-service';
      try {
        console.log('connecting to ws...');
        let socket = new SockJS(url + '/chat');
        //this.stompClient = Stomp.over(socket);
        this.stomp = Stomp.over(socket);
        //this.$store.dispatch("stompClient/setStompClient", "this.stomp");
        //let client = this.stompClient;
        this.stomp.connect({}, (frame) => {
          console.log('connected to: ' + frame);
          console.log('subscribing to topic: ' + '/topic/messages/' + taskId);
          this.stomp.subscribe('/topic/messages/' + taskId, (response) => {
            // console.log("Response", response);
            let data = JSON.parse(response.body);
            console.log('outside----->');
            if (data.actionType === 'comment') {
              console.log('inside----->');
              this.$store.dispatch('comments/fetchTaskActivityComment', {
                taskId: this.selectedTask.taskId,
                startIndex: 0,
                endIndex: 9,
              });
            } else if (
              data.actionType === 'typing' &&
              data.sender !== this.userId
            ) {
              this.$store.dispatch('stompClient/setTypingStatus', true);
              this.$store.dispatch('stompClient/setTypingUser', data.message);
            } else if (
              data.actionType === 'notTyping' &&
              data.sender !== this.userId
            ) {
              this.$store.dispatch('stompClient/setTypingStatus', false);
            }
          });
        });
      } catch (error) {
        console.log('Error fetching data', error);
      }
    },
    async selectTask(task, taskObject) {
      console.log('select________>');
      this.websocketConnectInit(task.taskId);
      this.task = task;
      this.$store.dispatch('task/setSelectedTask', task);
      this.taskObject = taskObject;
      this.componentClose = '';
      this.$axios.get(`/users/${task.taskAssignee}`).then(async (response) => {
        // console.log("fetched task -->", response.data.data);
        this.assignee = response.data.data;
      });
      this.$store.dispatch('user/setSelectedTaskUser', task.taskAssignee);
      if (this.task.isParent) {
        // console.log("parent task");
        this.$store.dispatch('task/fetchChildren', {
          projectId: this.projectId,
          taskId: this.task.taskId,
        });
      } else {
        this.$store.dispatch('task/fetchParentTask', {
          projectId: this.projectId,
          taskId: this.task.parentId,
        });
      }
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/${task.taskId}/files`,
          {
            headers: {
              user: this.userId,
              type: 'project',
            },
          }
        );
        // console.log("files--->", taskFilesResponse.data);
        this.taskFiles = taskFilesResponse.data;
        this.$store.dispatch('task/setTaskFiles', taskFilesResponse.data);
      } catch (error) {
        // console.log("Error fetching data", error);
      }

      this.$store.dispatch('activityLog/fetchTaskActivityLog', {
        taskId: task.taskId,
        startIndex: 0,
        endIndex: 10,
      });

      this.$store.dispatch('comments/fetchTaskActivityComment', {
        taskId: task.taskId,
        startIndex: 0,
        endIndex: 10,
      });

      this.$store.dispatch('comments/fetchTaskCommentLength', task.taskId);

      this.$store.dispatch('user/fetchOwnUser', this.userId);

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
    statusCheck(task) {
      if (task === 'development') {
        return 'developmentStatus';
      } else if (task === 'qa') {
        return 'qaStatus';
      } else if (task === 'design') {
        return 'designStatus';
      } else if (task === 'bug') {
        return 'bugStatus';
      } else if (task === 'operational') {
        return 'operationalStatus';
      } else if (task === 'preSales') {
        return 'preSalesStatus';
      } else if (task === 'general') {
        return 'generalStatus';
      } else {
        return 'otherStatus';
      }
    },
    dueDateCheck(task) {
      // console.log("check due date color", task);
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
        // console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          // console.log("overdue");
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
      // console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === '1970-01-01T05:30:00.000+0000') {
        return 'Add Due Date';
      } else if (
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return 'Today';
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return 'Yesterday';
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return 'Tomorrow';
      } else {
        let stringDate = date + '';
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
          name: user.assigneeFirstName + ' ' + user.assigneeLastName,
          id: user.assigneeId,
          img: user.assigneeProfileImage,
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
        return null;
      },
      set(value) {
        this.updatedTask.taskName = value;
      },
    },
  },
};
</script>

<style scoped></style>
