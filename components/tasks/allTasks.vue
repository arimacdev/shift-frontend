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
    ></v-select> -->
    <div class="filterSection">
      <div class="taskFilterTypeDiv">
        <div class="filterTitleDiv">
          Filter by:
        </div>
        <div class="filterDropdownDiv">
          <v-select
            v-model="taskFilter"
            :items="filterOptions"
            item-text="name"
            item-value="id"
            label="None"
            solo
          ></v-select>
        </div>
      </div>
      <div class="taskFilterDiv">
        <div class="filterOptionDiv">
          <v-select
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
            v-model="taskSelect"
            v-if="this.taskFilter == 'type'"
            :items="items"
            item-text="name"
            item-value="id"
            label="All"
            solo
          ></v-select>
        </div>
        <div class="filterSubmitButton">
          <v-btn
            v-if="
              this.taskFilter != null &&
                this.taskFilter != 'none' &&
                this.taskFilter != 'type'
            "
            dark=""
            width="100%"
            height="45px"
            color="#080848"
            ><v-icon color="#FFFFFF">mdi-filter-outline</v-icon> Filter</v-btn
          >
        </div>
      </div>
    </div>

    <div class="allTasksDropDown"></div>
    <div class="taskListViewContent overflow-y-auto">
      <!-- ------ start task filter list ------- -->
      <div
        v-for="(task, index) in projectAllTasks"
        :key="index"
        class="taskList"
      >
        <v-list-item
          v-if="task.taskStatus == taskSelect"
          @click.stop="drawer = !drawer"
          @click="selectTask(task)"
        >
          <v-list-item-action>
            <!-- <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div> -->
            <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973"
              >mdi-checkbox-marked-circle</v-icon
            >
            <v-icon v-else size="30" color="#FFFFFF"
              >mdi-checkbox-blank-circle</v-icon
            >
          </v-list-item-action>
          <div class="tasklistTaskNames">
            <div class="body-2">{{ task.taskName }}</div>
          </div>
          <v-list-item-content class="updatedDate">
            <v-list-item-title class="body-2">{{
              getProjectDates(task.taskDueDateAt)
            }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img
              v-if="task.taskAssigneeProfileImage != null"
              :src="task.taskAssigneeProfileImage"
            ></v-img>
            <v-img
              v-else
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <!-- -------------- filter for all ------------ -->
        <v-list-item
          v-if="
            taskSelect == 'all' ||
              taskSelect == null ||
              taskFilter == 'none' ||
              taskFilter == null
          "
          @click.stop="drawer = !drawer"
          @click="selectTask(task)"
        >
          <v-list-item-action>
            <!-- <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div> -->
            <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973"
              >mdi-checkbox-marked-circle</v-icon
            >
            <v-icon v-else size="30" color="#FFFFFF"
              >mdi-checkbox-blank-circle</v-icon
            >
          </v-list-item-action>
          <div class="tasklistTaskNames">
            <div class="body-2">{{ task.taskName }}</div>
          </div>
          <v-list-item-content>
            <v-list-item-title :class="dueDateCheck(task)">{{
              getProjectDates(task.taskDueDateAt)
            }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-img
              v-if="task.taskAssigneeProfileImage != null"
              :src="task.taskAssigneeProfileImage"
            ></v-img>
            <v-img
              v-else
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </div>
    </div>

    <!-- -------------- start side bar ----------------- -->

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right=""
      height="100vh"
      width="800px"
      class=""
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

    <!-- --------------- end side bar --------------------- -->
  </div>
</template>

<script>
import TaskSideBar from '~/components/tasks/taskSideBar';
import { mapState } from 'vuex';
export default {
  // props: ['projectId', 'projectUsers', 'people'],
  data() {
    return {
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
      taskSelect: null,
      taskFilter: null,
      componentClose: null,
    };
  },
  components: {
    'task-side-bar': TaskSideBar,
  },
  methods: {
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
      this.componentClose = '';
      console.log('selectedTask', task);
      this.$axios
        .get(`/users/${this.task.taskAssignee}`)
        .then(async (response) => {
          console.log('fetched task -->', response.data.data);
          this.assignee = response.data.data;
          //if task fetch is successful,
          let subTaskResponse;
          try {
            subTaskResponse = await this.$axios.$get(
              `/projects/${this.projectId}/tasks/${task.taskId}/subtask?userId=${this.userId}`,
              {
                headers: {
                  type: 'project',
                },
              }
            );
            console.log('subtasks--->', subTaskResponse.data);
            this.subTasks = subTaskResponse.data;
            //get files related to task
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
              console.log('files--->', taskFilesResponse.data);
              this.taskFiles = taskFilesResponse.data;
            } catch (error) {
              console.log('Error fetching data', error);
            }
          } catch (error) {
            console.log('Error fetching data', error);
          }
        })
        .catch((e) => {
          console.log('error', e);
        });
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
