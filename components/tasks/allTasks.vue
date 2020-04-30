<template>
  <div class="taskContent">
    <!-- <v-select
      v-model="taskSelect"
      :items="items"
      item-text="name"
      item-value="id"
      label="All"
      solo
      @change="taskFilter"
    ></v-select>-->
    <div class="filterSection">
      <div class="taskFilterTypeDiv">
        <div class="filterTitleDiv">Filter by:</div>
        <div class="filterDropdownDiv">
          <v-select
            dense
            v-model="taskFilter"
            :items="filterOptions"
            item-text="name"
            item-value="id"
            label="None"
            solo
            @mousedown="clearFilter()"
          ></v-select>
        </div>
      </div>
      <div class="taskFilterDiv">
        <!-- ---------- filter options ------------- -->
        <div class="filterOptionDiv">
          <v-select
            dense
            v-if="this.taskFilter == 'assignee'"
            v-model="addTaskAssignee"
            :items="states"
            item-text="name"
            item-value="id.assigneeId"
            label="Task assignee"
            solo
            class="createFormElements"
            @mousedown="querySelections"
          ></v-select>

          <v-select
            dense
            v-model="taskSelect"
            v-if="this.taskFilter == 'type'"
            :items="items"
            item-text="name"
            item-value="id"
            label="Select type"
            class="createFormElements"
            solo
          ></v-select>
          <VueCtkDateTimePicker
            v-if="this.taskFilter == 'dateRange'"
            :no-value-to-custom-elem="false"
            color="#3f51b5"
            v-model="dateRange"
            label="Filter tasks by"
            range
            right
            noButton
            autoClose
          ></VueCtkDateTimePicker>
        </div>
        <!-- ----------- filter assignee button ---------- -->
        <div class="filterSubmitButton">
          <v-btn
            v-if="this.taskFilter == 'assignee'"
            dark
            width="100%"
            height="40px"
            color="#080848"
          >
            <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>Filter
          </v-btn>
          <!-- ------------- filter dateRange button ---------------- -->
          <v-btn
            v-else-if="this.taskFilter == 'dateRange'"
            dark
            width="100%"
            height="45px"
            color="#080848"
          >
            <v-icon color="#FFFFFF">mdi-filter-outline</v-icon>Filter
          </v-btn>
        </div>
      </div>
    </div>

    <div class="restructuredTaskCreate">
      <v-text-field
        v-model="personalTask"
        background-color="#EDF0F5"
        solo
        prepend-inner-icon="mdi-plus-circle"
        label="Add a main task..."
        class
      ></v-text-field>
    </div>

    <div class="taskListViewContent overflow-y-auto">
      <!-- ------ start task filter list ------- -->
      <div v-for="(task, index) in projectAllTasks" :key="index">
        <div class="taskList restructuredMainTaskList">
          <v-list-item
            v-if="
              task.taskStatus == taskSelect ||
                taskFilter == 'none' ||
                taskFilter == 'assignee' ||
                taskFilter == 'dateRange' ||
                taskSelect == 'all'
            "
            @click="
              selectTask(task.parentTask);
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
              <v-icon v-else size="30" color="#FFFFFF"
                >mdi-checkbox-blank-circle</v-icon
              >
            </v-list-item-action>
            <div class="tasklistTaskNames restructuredMainTaskName">
              <div class="body-2">
                <span class="restructuredMainTaskCode">MRI - #1</span>
                {{ task.parentTask.taskName }}
              </div>
            </div>
            <div class="restStatusChip" :class="statusCheck(task)">
              {{ task.parentTask.issueType }}
            </div>
            <v-list-item-content class="updatedDate">
              <v-list-item-title :class="dueDateCheck(task)">
                {{ getProjectDates(task.parentTask.taskDueDateAt) }}
              </v-list-item-title>
            </v-list-item-content>
            <div>
              <v-list-item-avatar>
                <v-img
                  v-if="task.parentTask.taskAssigneeProfileImage != null"
                  :src="task.parentTask.taskAssigneeProfileImage"
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
                  '/task/' + task.parentTask.taskId + '/?project=' + projectId
                "
                style="text-decoration: none;"
              >
                <v-icon color="blue">mdi-link-variant</v-icon>
              </nuxt-link>
            </div>
          </v-list-item>
        </div>

        <!-- -------------- sub task design --------------- -->
        <div class="restructuredSubTaskCreate">
          <v-text-field
            v-model="personalTask"
            background-color="#0BAFFF"
            solo
            dark
            prepend-inner-icon="mdi-plus-circle"
            label="Add a sub task..."
            class
            @keyup.enter="addParentTask"
          ></v-text-field>
        </div>
        <div v-if="task.childTasks.length !== 0">
          <div
            v-for="(childTask, index) in task.childTasks"
            :key="index"
            class="taskList restructuredSubTaskList"
          >
            <v-list-item
              @click.stop="drawer = !drawer"
              @click="selectTask(childTask)"
            >
              <v-list-item-action>
                <v-icon
                  v-if="childTask.taskStatus == 'closed'"
                  size="30"
                  color="#2EC973"
                  >mdi-checkbox-marked-circle</v-icon
                >
                <v-icon v-else size="30" color="#FFFFFF"
                  >mdi-checkbox-blank-circle</v-icon
                >
              </v-list-item-action>
              <div class="tasklistTaskNames restructuredSubTaskName">
                <div class="body-2">
                  <span class="restructuredMainTaskCode">MRI - #1</span>
                  {{ childTask.taskName }}
                </div>
              </div>
              <div class="restStatusChip" :class="statusCheck(task)">
                {{ childTask.issueType }}
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title :class="dueDateCheck(task)">
                  {{ getProjectDates(childTask.taskDueDateAt) }}
                </v-list-item-title>
              </v-list-item-content>
              <div>
                <v-list-item-avatar>
                  <v-img
                    v-if="childTask.taskAssigneeProfileImage != null"
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
                  :to="'/task/' + childTask.taskId + '/?project=' + projectId"
                  style="text-decoration: none;"
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

    <!-- -------------- start side bar ----------------- -->

    <v-navigation-drawer
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
        :projectUsers="projectUsers"
        :componentClose="componentClose"
        @listenChange="listenToChange"
        @shrinkSideBar="shrinkSideBar"
      />
    </v-navigation-drawer>
    <!-- ------------ task dialog --------- -->

    <v-dialog
      v-model="taskDialog"
      width="90vw"
      transition="dialog-bottom-transition"
      ><v-toolbar dark color="primary">
        <v-btn icon dark @click="taskDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-bold">{{
          task.taskName
        }}</v-toolbar-title>
      </v-toolbar>
      <task-dialog
        :task="task"
        :assignee="assignee"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :projectUsers="projectUsers"
        :componentClose="componentClose"
      />
    </v-dialog>

    <!-- --------------- end side bar --------------------- -->
  </div>
</template>

<script>
import TaskSideBar from '~/components/tasks/taskSideBar';
import TaskDialog from '~/components/tasks/taskDialog';
import { mapState } from 'vuex';
export default {
  // props: ['projectId', 'projectUsers', 'people'],
  data() {
    return {
      taskDialog: false,
      dateRange: new Date(),
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      states: [],
      items: [
        { id: 'all', name: 'All' },
        { id: 'pending', name: 'Pending' },
        { id: 'implementing', name: 'Implementing' },
        { id: 'qa', name: 'QA' },
        { id: 'readyToDeploy', name: 'Ready to deploy' },
        { id: 'reOpened', name: 'Reopened' },
        { id: 'deployed', name: 'Deployed' },
        { id: 'closed', name: 'Closed' },
      ],
      filterOptions: [
        { id: 'none', name: 'None' },
        { id: 'assignee', name: 'Assignee' },
        { id: 'type', name: 'Type' },
        { id: 'dateRange', name: 'Date Range' },
      ],
      projects: ['pr1'],
      drawer: null,
      task: {},
      subTasks: [],
      taskFiles: [],
      assignee: {},
      userId: this.$store.state.user.userId,
      taskSelect: 'all',
      taskFilter: 'none',
      componentClose: null,
    };
  },
  components: {
    'task-side-bar': TaskSideBar,
    'task-dialog': TaskDialog,
  },
  methods: {
    clearFilter() {
      console.log('selected===========> ' + this.taskSelect);
      this.taskSelect == null;
    },
    querySelections(v) {
      console.log('people list', this.people);
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
      console.log('nameList', this.states);
      this.loading = true;
    },
    listenToChange() {
      console.log('listened to changes ------->');
      this.$store.dispatch('task/fetchTasksAllTasks', this.projectId);
      this.$store.dispatch('task/fetchTasksMyTasks', this.projectId);
      this.$store.dispatch('task/fetchProjectTaskCompletion', this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    taskFilterHandler() {
      console.log('-----------> changed' + this.taskSelect);
    },
    async selectTask(task) {
      this.task = task;
      let parentTask = task;
      this.componentClose = '';
      console.log('selectedTask', parentTask);
      this.$store.dispatch('user/setSelectedTaskUser', parentTask.taskAssignee);
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/projects/${this.projectId}/tasks/${parentTask.taskId}/files`,
          {
            headers: {
              user: this.userId,
              type: 'project',
            },
          }
        );
        console.log('files--->', taskFilesResponse.data);
        this.taskFiles = taskFilesResponse.data;
        this.$store.dispatch('task/setTaskFiles', taskFilesResponse.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    },
    statusCheck(task) {
      if (task.taskStatus === 'closed') {
        return 'closedStatus';
      } else {
        return 'otherStatus';
      }
    },
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
  },
  computed: {
    ...mapState({
      people: (state) => state.task.userCompletionTasks,
      projectAllTasks: (state) => state.task.allTasks,
      projectId: (state) => state.project.project.projectId,
    }),
  },
};
</script>

<style scoped></style>
