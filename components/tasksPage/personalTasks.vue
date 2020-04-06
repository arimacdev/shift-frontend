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
    <div class="taskList" v-for="(personalTask, index) in personalTasks"
        :key="index" >
         <v-list-item v-if="personalTask.taskStatus == taskSelect" @click.stop="drawer = !drawer" @click="selectPersonalTask(personalTask)">
              <v-list-item-action>
              <v-icon v-if="personalTask.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
       
              </v-list-item-action>
              <div class="tasklistTaskNames">
                <div class="body-2">{{ personalTask.taskName }}</div>
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">{{ getTaskDueDate(personalTask.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
               
            </v-list-item>


             <v-list-item v-if="taskSelect == 'all' || taskSelect == null" @click.stop="drawer = !drawer" @click="selectPersonalTask(personalTask)">
              <v-list-item-action>
              <v-icon v-if="personalTask.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
       
              </v-list-item-action>
              <div class="tasklistTaskNames">
                <div class="body-2">{{ personalTask.taskName }}</div>
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">{{ getTaskDueDate(personalTask.taskDueDateAt) }}</v-list-item-title>
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
      <tasks-side-drawer :task="task" :assignee="assignee"  :subTasks="subTasks" />
    </v-navigation-drawer>

          <!-- --------------- end side bar --------------------- -->
       

</div>
</template>

<script>
import TaskSideDrawer from '~/components/tasksPage/tasksSideDrawer'
import TaskSideBar from '~/components/tasks/taskSideBar'
import axios from 'axios'
import { mapState } from 'vuex'


  export default {
       components: {
      'tasks-side-drawer' : TaskSideDrawer,
      'task-side-bar' : TaskSideBar
    },
     data () {
      return {
        drawer: null,
         userId: this.$store.state.user.userId,
         personalTask: '',
         taskSelect: null,
         task: {},
         assignee: {},
         subTasks: [],
         items: [
           {id:'all', name: 'All'},
           {id: 'open', name: 'Open'},
            {id: 'closed', name: 'Closed'}
       ],
      }
    },

    created() {
     this.$store.dispatch('personalTasks/fetchAllPersonalTasks');
    },

    methods: {
           taskFilter(){
         console.log("-----------> changed" + this.taskSelect)
       },
        async selectPersonalTask(personalTask){
        this.task = personalTask;
     console.log("selectedTask", personalTask);
      this.$axios.get (`/users/${this.task.taskAssignee}`)
      .then (async response => {
       console.log("fetched task -->", response.data.data)
       this.assignee = response.data.data;
       //if task fetch is successful,
       let subTaskResponse;
       try {
            subTaskResponse = await this.$axios.$get(`/non-project/tasks/personal/${this.task.taskId}/subtask?userId=${this.userId}`) 
            console.log("subtasks--->", subTaskResponse.data)     ;
            this.subTasks = subTaskResponse.data;  
      //get files related to task
      let taskFilesResponse;
      try {
      taskFilesResponse = await this.$axios.$get(`/projects/${this.projectId}/tasks/${task.taskId}/files`,
      {
        headers: {
          user: this.userId,
       }
      }
      ) 
      console.log("files--->", taskFilesResponse.data)     ;
      this.taskFiles = taskFilesResponse.data;   
       } catch (error) {
          console.log("Error fetching data", error);
       }         
            
       } catch (error) {
          console.log("Error fetching data", error);
       }       
      })
      .catch (e => {
       console.log("error", e)
      }) 
        },
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
        this.personalTask = ''
        console.log(response);

       } catch(e){
          console.log("Error adding a subTask", e);
       }  
      },
      getTaskDueDate(date) {
      if(date === null || date === '1970-01-01T05:30:00.000+0000')
          return "Add Due Date";
        let stringDate  =  date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0,10);           
        return stringDate;
      }

    },
       computed: {
      ...mapState({
          personalTasks: state => state.personalTasks.personalTasks,
      })
    }
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