<template>
    <div class="body-tabs">   
        <!-- tabs body -->
              <div>
             <v-card class="tabs">
      <v-tabs>
          <v-tab>
            Tasks
          </v-tab>
          <v-tab>
            Board
          </v-tab>
          <v-tab>
            People
          </v-tab>
          <v-tab @click="onSelectProject">
            Projects
          </v-tab>
          <v-tab>
            Files
          </v-tab>
          
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
            <tasks :MyTasks="MyTasks" :projectId="projectId" :people="people"/>

      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
         
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <people :projectId="projectId" :people="people" :users="users"/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <project-tab :project="project" :taskCompletion="taskCompletion" :taskLog="taskLog"/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <v-card-text>
            

          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
  </div>
       

</div>
</template>

<script>
import Tasks from '~/components/tabsView/tasks'
import TaskDrawer from '~/components/projects/taskDrawer'
import People from '~/components/people/people'
import ProjectTab from '~/components/projects/projectTab'

  export default {
     data () {
      return {
        drawer: null,
        userId: this.$store.state.user.userId,
        items: [          
        ],
        taskCompletion: {}
      }
    },
     props: ['name', 'projectId', 'project', 'users', 'MyTasks', 'people', 'taskLog', 'taskCompletion'],
    name: 'tabViews',
    components: {
      'tasks' : Tasks,
      'task-drawer' : TaskDrawer,
      'people' : People,
      'project-tab' : ProjectTab
    },
    methods: {
      onSelectProject() {
      //      this.$axios.get(`projects/${this.project.projectId}/tasks/completion`, {
      //    headers: {
      //     user: this.userId,
      //  }
      // })
      // .then (response => {
      //  this.taskCompletion = response.data.data;
      // })
      // .catch (e => {
      //  console.log("error", e)
      // })
      }
    },
  }
</script>

<style scoped>
.tabs{
  padding-left: 10px;
  box-shadow: none !important;
}
.wrapper{
  width: 100%;
}

</style>