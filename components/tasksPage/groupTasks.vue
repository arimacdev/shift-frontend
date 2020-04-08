<template>
    <div class="group-task-tab">   
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
          
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
            <group-task-content />
      </v-tab-item>
    
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
          <group-task-people />
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

  export default {
     components: {
     'group-task-content' : GroupTaskContent,
     'group-task-people' : GroupTaskPeople
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