<template>
    <div class="group-task-tab overflow-y-auto">   
        <!-- tabs body -->
              <div>
             <v-card class="tabs">
      <v-tabs>
          <v-tab>
            Tasks
          </v-tab>
          <v-tab>
            People
          </v-tab>
           <v-tab class="groupSettings">
            Settings
            <v-icon>mdi-cog-outline</v-icon>
          </v-tab>
          
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
            <group-task-content :group=group :completionTasks=completionTasks />
      </v-tab-item>
    
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <group-task-people :users=users :group=group :completionTasks=completionTasks />
        </v-card>
      </v-tab-item>

       <v-tab-item>
          <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <group-settings :group=group  />
        </v-card>
      </v-tab-item>
     
    </v-tabs>
  </v-card>
  </div>
       

</div>
</template>

<script>
import GroupTaskContent from '~/components/tasksPage/groupTaskContent'
import GroupTaskPeople from '~/components/tasksPage/groupTaskPeople'
import GroupSettings from '~/components/tasksPage/groupSettings'

  export default {
    props: ['users', 'group', 'completionTasks'],
     components: {
     'group-task-content' : GroupTaskContent,
     'group-task-people' : GroupTaskPeople,
     'group-settings' : GroupSettings
    },
     data () {
      return {
        drawer: null,
        userId: this.$store.state.user.userId,
        items: [          
        ],
        taskCompletion: {}
      }
    },
    name: 'tabViews',

   
   
    methods: {
      onSelectProject() {
     
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