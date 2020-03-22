<template>
     <div class="taskContent">

       <div class="allTasksDropDown">
       </div>
       <div class="taskListViewContent overflow-y-auto">
        <div v-for="(task, index) in MyTasks"
        :key="index" class="taskList" >
            <v-list-item @click.stop="drawer = !drawer" @click="selectTask(task)">
              <v-list-item-action>
              <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ task.taskName}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">{{ getProjectDates(task.taskDueDateAt) }}</v-list-item-title>
              </v-list-item-content>
               <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/89.jpg"></v-img>
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
      width="400px"
      class=""
      color="#E5E5E5"
    >
    <task-side-bar :task=task :assignee="assignee" :projectId="projectId" :subTasks="subTasks" :taskFiles="taskFiles" :projectUsers="projectUsers" :people="people"/>
    
    </v-navigation-drawer>


          <!-- --------------- end side bar --------------------- -->
    </div>
</template>

<script>
import TaskSideBar from '~/components/tasks/taskSideBar'

  export default {
    props: ['projectId', 'MyTasks', 'projectUsers', 'people'],
    data() {
      return {
        projects: ["pr1"],
        drawer: null,
        items: [
          
        ],
        task: {},
        subTasks: [],
        taskFiles: [],
        assignee: {},
        userId: this.$store.state.user.userId
      }
    },
    components: {
      'task-side-bar' : TaskSideBar,
    },
     methods: {
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
          console.log(date);
         let stringDate = new Date(date);
         console.log(stringDate);
         let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
         return formateedDate;
      },
      
    
     }
  }
</script>

<style scoped>

</style>