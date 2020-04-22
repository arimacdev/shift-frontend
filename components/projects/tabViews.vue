<template>
  <div class="body-tabs">
    <!-- tabs body -->
    <div>
      <v-card class="tabs">
        <v-tabs>
          <v-tab @click="changeTabView('task')">
            Tasks
          </v-tab>
          <v-tab @click="changeTabView('board')">
            Board
          </v-tab>
          <v-tab @click="changeTabView('people')">
            People
          </v-tab>
          <v-tab @click="changeTabView('project')">
            Project
          </v-tab>
          <v-tab @click="changeTabView('files')">
            Files
          </v-tab>

          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <tasks :MyTasks="MyTasks" :projectId="projectId" :people="people" />
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <board-tab :projectId="projectId" :people="people" />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <people />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <project-tab />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <files-tab />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </div>
</template>

<script>
  import Tasks from '~/components/tabsView/tasks';
  import TaskDrawer from '~/components/projects/taskDrawer';
  import People from '~/components/people/people';
  import ProjectTab from '~/components/projects/projectTab';
  import FilesTab from '~/components/projects/filesTab';
  import BoardTab from '~/components/projects/boardTab';
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        drawer: null,
        userId: this.$store.state.user.userId,
        items: [],
        taskCompletion: {},
      };
    },
    props: [
      'name',
      'projectSprints',
      'projectFiles',
      'projectId',
      'project',
      'users',
      'MyTasks',
      'people',
      'taskLog',
      'taskCompletion',
    ],
    name: 'tabViews',
    components: {
      tasks: Tasks,
      'task-drawer': TaskDrawer,
      people: People,
      'project-tab': ProjectTab,
      'files-tab': FilesTab,
      'board-tab': BoardTab,
    },
    methods: {
      changeTabView(type) {
        switch (type) {
          case 'task':
            this.$store.dispatch('tab/updateTabViewsTab', 'task');
            this.$emit('refreshSelectedTab', 'task');
            break;
          case 'people':
            this.$store.dispatch('tab/updateTabViewsTab', 'people');
            this.$emit('refreshSelectedTab', 'people');
            break;
          case 'project':
            this.$store.dispatch('tab/updateTabViewsTab', 'project');
            this.$emit('refreshSelectedTab', 'project');
            break;
          case 'board':
            this.$store.dispatch('tab/updateTabViewsTab', 'board');
            this.$emit('refreshSelectedTab', 'board');
            break;
          case 'files':
            this.$store.dispatch('tab/updateTabViewsTab', 'files');
            this.$emit('refreshSelectedTab', 'files');
            break;
        }
      },
      onSelectProject() {
        //      this.$axios.get(`projects/${this.project.projectId}/tasks/completion`, {
        //    headers: {
        //     user: this.userId,
        //  }
        //    .then (response => {
        //  this.taskCompletion = response.data.data;
        // })
        // .catch (e => {
        //  console.log("error", e)
        // })
      }, // })
    },
  };
</script>

<style scoped>
  .tabs {
    padding-left: 10px;
    box-shadow: none !important;
  }
  .wrapper {
    width: 100%;
  }
</style>
