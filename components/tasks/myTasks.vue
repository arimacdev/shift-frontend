<template>
     <div class="taskContent">
        <v-select
        v-model="taskSelect"
           :items="items"
          item-text="name"
          item-value="id"
          label="All"
          solo
          @change="taskFilter"
        ></v-select>
       <div class="allTasksDropDown">
       </div>
       <div class="taskListViewContent overflow-y-auto">
          <!-- ------ start task filter list ------- -->
        <div v-for="(task, index) in projectMyTask"
        :key="index" class="taskList" >
            <v-list-item v-if="task.taskStatus == taskSelect" @click.stop="drawer = !drawer" @click="selectTask(task)">
              <v-list-item-action>
              <!-- <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div> -->
             <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
        
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ task.taskName}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
               <v-list-item-avatar>
          <v-img v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
          <v-img v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

        </v-list-item-avatar>
            </v-list-item>

<!-- -------------- filter for all ------------ -->
             <v-list-item v-if="taskSelect == 'all' || taskSelect == null" @click.stop="drawer = !drawer" @click="selectTask(task)">
              <v-list-item-action>
              <!-- <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div> -->
             <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
        
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ task.taskName}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="updatedDate">
                <v-list-item-title :class="dueDateCheck(task)">{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
               <v-list-item-avatar>
          <v-img v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
          <v-img v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

        </v-list-item-avatar>
            </v-list-item>
        </div>
       </div>
         <!-- -------------- start side bar ----------------- -->

  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right=""
      height="85vh"
      width="800px"
      class=""
      color="#FFFFFF"
    >
    <task-side-bar :task=task :assignee="assignee" :projectId="projectId" :subTasks="subTasks" :taskFiles="taskFiles" :projectUsers="projectUsers" :people="people" @listenChange="listenToChange"/>
    
    </v-navigation-drawer>


          <!-- --------------- end side bar --------------------- -->
    </div>
</template>

<script>
import TaskSideBar from '~/components/tasks/taskSideBar'
import { mapState } from 'vuex';
  export default {
    props: ['projectId',  'projectUsers', 'people'],
    data() {
      return {
        items: ['all', 'pending', 'implementing', 'qa', 'readyToDeploy', 'reOpened', 'deployed', 'closed'],
        projects: ["pr1"],
        drawer: null,
       
        task: {},
        subTasks: [],
        taskFiles: [],
        assignee: {},
        userId: this.$store.state.user.userId,
        taskSelect: null
      }
    },
    components: {
      'task-side-bar' : TaskSideBar,
    },
     methods: {
       checkme(){
        console.log("you can check", this.projectMyTask)
      },
      dueDateCheck(task){
        console.log("check due date color", task);
        if(task.taskStatus === 'closed'){
          return 'workLoadTaskDone';
        }
        else if (task.taskDueDateAt == null) {
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
      taskFilter(){
         console.log("-----------> changed" + this.taskSelect)
       },
       listenToChange(){
         console.log("listened to changes ------->");
          this.$store.dispatch('task/fetchTasksMyTasks', this.projectId)
          this.$store.dispatch('task/fetchTasksAllTasks', this.projectId)
          this.$store.dispatch('task/fetchProjectTaskCompletion', this.projectId)
       },
    async selectTask(task){
     this.task = task;
     console.log("selectedTask", task);
      this.$axios.get (`/users/${this.task.taskAssignee}`)
      .then (async response => {
       console.log("fetched task -->", response.data.data)
       this.assignee = response.data.data;
       //if task fetch is successful,
       let subTaskResponse;
       try {
            subTaskResponse = await this.$axios.$get(`/projects/${this.projectId}/tasks/${task.taskId}/subtask?userId=${this.userId}`) 
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
    getProjectDates(date) {
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
          projectMyTask: state => state.task.myTasks,
      })
    }
  }
</script>

<style scoped>

</style>