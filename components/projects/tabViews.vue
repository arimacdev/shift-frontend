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
          <v-tab>
            Projects
          </v-tab>
          <v-tab>
            Files
          </v-tab>
          
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
            <tasks :Alltasks="Alltasks" :MyTasks="MyTasks" :projectId="projectId"/>

      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
         
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
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

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

  export default {
     data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
      }
    },
     props: ['name', 'projectId', 'users', 'Alltasks', 'MyTasks'],
    name: 'tabViews',
    components: {
      'tasks' : Tasks,
      'task-drawer' : TaskDrawer,
      'people' : People
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