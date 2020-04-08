<template>
    <div class="">   
        <!-- tabs body -->
              <div>
             <v-card class="tabs">
     
           <!-- ------------------------- group task content ------------------- -->

<div  class="taskFilter-tasksPage ">
        <v-select
          v-model="taskSelect"
           :items="items"
          item-text="name"
          item-value="id"
          label="All"
          solo
        ></v-select>


        <v-text-field
        v-model="groupTask"
        solo
        prepend-inner-icon="mdi-plus-circle"
        label="Add a new task"
        class="addPersonalTaskTextBox"
        @keyup.enter="addGroupTask"
        > </v-text-field>





<!-- -------- loop task list here ----------- -->
<div class="taskPageContentScroll overflow-y-auto">
    <div class="taskList" v-for="(groupTask, index) in groupTasks"
        :key="index" >
         <v-list-item v-if="groupTask.taskStatus == taskSelect" @click.stop="drawer = !drawer" @click="selectGroupTask(groupTask)">
              <v-list-item-action>
              <v-icon v-if="groupTask.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
       
              </v-list-item-action>
              <div class="tasklistTaskNames">
                <div class="body-2">{{ groupTask.taskName }}</div>
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">{{ getTaskDueDate(groupTask.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
               
            </v-list-item>


             <v-list-item v-if="taskSelect == 'all' || taskSelect == null" @click.stop="drawer = !drawer" @click="selectGroupTask(groupTask)">
              <v-list-item-action>
              <v-icon v-if="groupTask.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
       
              </v-list-item-action>
              <div class="tasklistTaskNames">
                <div class="body-2">{{ groupTask.taskName }}</div>
              </div>
              <v-list-item-content class="updatedDate">
                <v-list-item-title :class="dueDateCheck(groupTask)">{{ getTaskDueDate(groupTask.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
               <v-list-item-avatar>
          <v-img v-if="task.taskAssigneeProfileImage != null" :src="groupTask.taskAssigneeProfileImage"></v-img>
          <v-img v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

        </v-list-item-avatar>
               
            </v-list-item>
    </div>


</div>

</div>
           <!-- ------------------- group task content end --------------- -->
     
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
      <group-side-drawer :task="task" :group="group" :assignee="assignee"  :subTasks="subTasks" :taskFiles="taskFiles" @shrinkSideBar="shrinkSideBar"/>
    </v-navigation-drawer>
          <!-- --------------- end side bar --------------------- -->
       

</div>
</template>

<script>
import GroupSideDrawer from '~/components/tasksPage/groupSideDrawer'
import axios from 'axios'
import { mapState } from 'vuex'


  export default {
    props: ['groupTasks', 'group'],
       components: {
      'group-side-drawer' : GroupSideDrawer,
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
         taskFiles: [],
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
        dueDateCheck(task){
        console.log("check due date color", task);
        if(task.taskStatus === 'closed'){
          return 'workLoadTaskDone';
        }
        else if (task.taskDueDateAt == null || task.taskDueDateAt === '1970-01-01T05:30:00.000+0000') {
          return 'workLoadTaskDefault';
        }
        else {
          const dueDate = new Date(task.taskDueDateAt);
          const dueToUtc = new Date(dueDate.toLocaleString("en-US", {timeZone: "UTC"}));
          const dueToUtcDate = new Date(dueToUtc);
          const now = new Date();
          console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
          if(now.getTime() > dueToUtcDate.getTime()){
            console.log("overdue")
            return 'workLoadTaskOverDue';
          } else {
            return 'workLoadTaskHealthy';
          }
        }
      },
      shrinkSideBar(){
        console.log("shrink side bar")
        this.drawer = false;
      },
        async selectGroupTask(groupTask){
        this.task = groupTask;
     console.log("selectedTask", groupTask);
      this.$axios.get (`/users/${this.task.taskAssignee}`)
      .then (async response => {
       console.log("fetched task -->", response.data.data)
       this.assignee = response.data.data;
       //if task fetch is successful,
       let subTaskResponse;
       try {
            subTaskResponse = await this.$axios.$get(`/non-project/tasks/personal/${this.task.taskId}/subtask?userId=${this.userId}`) 
            console.log("subtasks--->", subTaskResponse.data);
            this.subTasks = subTaskResponse.data;  
      //get files related to task
      let taskFilesResponse;
      try {
      taskFilesResponse = await this.$axios.$get(`/non-project/tasks/personal/${this.task.taskId}/files`,
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
     async addGroupTask(){
        console.log("add group task");
        let response;
          try{
          response = await this.$axios.$post(`/projects/${this.group.taskGroupId}/tasks`, 
          {
            taskName: this.groupTask,
            projectId: this.group.taskGroupId,
            taskInitiator: this.userId,
            taskDueDate: null,
            taskRemindOnDate: null,
            taskType: 'taskGroup'
          }
        )
        this.groupTask = ''
        console.log(response);
       } catch(e){
          console.log("Error adding a group task", e);
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