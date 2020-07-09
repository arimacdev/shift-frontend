<template>
  <div>
    <div style="position: fixed; right: 20px; top: 100px">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-on:click="
              setTaskTab('all-tasks');
              fetchAllTasks();
            "
          >
            <v-list-item-action>
              <v-icon size="17" color="#0c0c5a">icon-task</v-icon>
            </v-list-item-action>
            <v-list-item-content class="buttonText">
              <v-list-item-title class="bodyWiew">All tasks</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-on:click="
              setTaskTab('my-tasks');
              fetchMyTasks();
            "
          >
            <v-list-item-action>
              <v-icon size="17" color="#2EC973">icon-task</v-icon>
            </v-list-item-action>
            <v-list-item-content class="buttonText">
              <v-list-item-title class="bodyWiew">My tasks</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-on:click="setTaskTab('add-task')">
            <v-list-item-action>
              <v-icon size="17" color="#0BAFFF">mdi-plus-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content class="buttonText">
              <v-list-item-title class="bodyWiew">Add task</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-card flat>
      <v-card-text>
        <!-- <div class="heading">
          <v-list-item-group>
            <div class="allTasks tasksButtons">
              <v-list-item
                v-on:click="setTaskTab('all-tasks')"
                active-class="activeTaskTabList"
                dark
              >
                <v-list-item-action>
                  <v-icon size="20" color>icon-task</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">All tasks</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>

            <div class="myTasks tasksButtons">
              <v-list-item
                v-on:click="setTaskTab('my-tasks')"
                active-class="activeTaskTabList"
                dark
              >
                <v-list-item-action>
                  <v-icon size="20" color>icon-task</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">My tasks</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>

            <div class="createTask tasksButtons">
              <v-list-item
                v-on:click="setTaskTab('add-task')"
                active-class="activeTaskTabList"
                dark
              >
                <v-list-item-action>
                  <v-icon size="20" color>icon-task</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Add task</v-list-item-title>
                </v-list-item-content>
                <v-icon>mdi-plus-circle</v-icon>
              </v-list-item>
            </div>
          </v-list-item-group>
        </div>-->

        <!-- <keep-alive> -->
        <div class="taskActionContents">
          <component
            v-bind:is="component"
            :projectId="projectId"
            :Alltasks="Alltasks"
            :MyTasks="MyTasks"
            :people="people"
            :pagination="pagination"
            :myTaskPagination="myTaskPagination"
          ></component>
        </div>
        <!-- </keep-alive> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import AllTasks from '~/components/tasks/allTasks';
import MyTasks from '~/components/tasks/myTasks';
import AddTask from '~/components/tasks/addTask';

export default {
  props: ['name', 'projectId', 'Alltasks', 'MyTasks', 'people', 'pagination'],
  data() {
    return {
      key: value,
    };
  },
  name: 'tasks',
  components: {
    'all-tasks': AllTasks,
    'my-tasks': MyTasks,
    'add-task': AddTask,
  },
  data() {
    return {
      myTaskPagination: 1,
      component: 'all-tasks',
    };
  },
  methods: {
    fetchAllTasks() {
      this.$store.dispatch('task/setIndex', {
        startIndex: 0,
        endIndex: 10,
      });
      this.$store.dispatch(
        'task/fetchTasksAllTasks',
        this.$route.params.projects
      );
      this.$store.dispatch(
        'task/fetchTotalTaskCount',
        this.$route.params.projects
      );
    },
    fetchMyTasks() {
      this.$store.dispatch('task/setIndex', {
        startIndex: 0,
        endIndex: 10,
      });
      this.$store.dispatch(
        'task/fetchTasksMyTasks',
        this.$route.params.projects
      );
      this.$store.dispatch(
        'task/fetchMyTaskCount',
        this.$route.params.projects
      );
    },
    setTaskTab(tabType) {
      this.component = tabType;
    },
  },
};
</script>

<style scoped>
.taskContent {
  width: 100%;
  margin-top: 60px;
}
</style>
