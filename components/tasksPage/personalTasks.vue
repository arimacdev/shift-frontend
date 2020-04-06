<template>
    <div class="personal-task-tab">   
        <!-- tabs body -->
              <div>
             <v-card class="tabs">
      <v-tabs>
          <v-tab>
            Tasks
          </v-tab>
          
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
           <!-- ------------------------- personal task content ------------------- -->

<div  class="taskFilter-tasksPage">
        <v-select
          v-model="taskSelect"
           :items="items"
          item-text="name"
          item-value="id"
          label="All"
          solo
          @change="taskFilter"
        ></v-select>


        <v-text-field
        v-model="personalTask"
        solo
        prepend-inner-icon="mdi-plus-circle"
        label="Add a new task"
        class="addPersonalTaskTextBox"
        @keyup.enter="addPersonalTask"
        > </v-text-field>





<!-- -------- loop task list here ----------- -->
    <div class="taskList">
         <v-list-item @click.stop="drawer = !drawer">
              <v-list-item-action>
              <!-- <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon> -->
             <v-icon size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
       
              </v-list-item-action>
              <div class="tasklistTaskNames">
                <div class="body-2">Test task 1 </div>
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">2020-10-19</v-list-item-title>
              </v-list-item-content>
               
            </v-list-item>
    </div>




</div>
           <!-- ------------------- personal task content end --------------- -->
      </v-tab-item>
     
    </v-tabs>
  </v-card>
  </div>


   <!-- -------------- start side bar ----------------- -->

  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right=""
      height="100vh"
      width="800px"
      class=""
      color="#FFFFFF"
    >
      <tasks-side-drawer />
    </v-navigation-drawer>

          <!-- --------------- end side bar --------------------- -->
       

</div>
</template>

<script>
import TaskSideDrawer from '~/components/tasksPage/tasksSideDrawer'

  export default {
       components: {
      'tasks-side-drawer' : TaskSideDrawer,
    },
     data () {
      return {
        drawer: null,
         userId: this.$store.state.user.userId,
         personalTask: '',
         items: [
           {id:'all', name: 'All'},
          {id: 'pending', name: 'Pending'},
           {id: 'implementing', name: 'Implementing'},
            {id: 'qa', name: 'QA'},
             {id:'readyToDeploy', name: 'Ready to deploy'},
              {id: 'reOpened', name: 'Reopened'},
               {id: 'deployed', name: 'Deployed'},
                {id: 'closed', name: 'Closed'}
                ],
      }
    },
    methods: {
     async addPersonalTask(){
        console.log("add personal task");
        let response;
          try{
          response = await this.$axios.$post(`/non-project/tasks/personal`, 
          {
            taskName: this.personalTask,
            taskAssignee: this.userId,
            taskDueDate: null,
            taskRemindOnDate: null,
            taskType: 'personal'
          }
        )
        
        console.log(response);

       } catch(e){
          console.log("Error adding a subTask", e);
       }  
      },

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