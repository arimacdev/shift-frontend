<template>
<div>
   
        <div class="defaultBoard">
            <div class="boardTitle">
                <span>Default Board</span>
            </div>
            <div class="boardTaskList overflow-y-auto">
                   <div v-for="(task, index) in projectAllTasks"
                 :key="index" class="boardTaskListItem" >
            <v-list-item @click.stop="drawer = !drawer" @click="selectTask(task)">
                        <v-list-item-action>
                        <v-icon v-if="task.taskStatus == 'closed'" size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> {{ task.taskName}} </v-list-item-title>
                            <div :class="dueDateCheck(task)"> {{ getProjectDates(task.taskDueDateAt) }} </div>
                        </v-list-item-content>
                        <v-list-item-avatar size="25">
                    <v-img  v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
                    <v-img  v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

                    </v-list-item-avatar>
            </v-list-item>
             
        </div>
            </div>

        </div>
        <div class="">
 <div class="boardBodyDiv overflow-x-scroll">
      

        <div class="scrolling-wrapper">
         <div class="actualBoard card" v-for="(projectSprint,index) in projectSprints" :key="index">
             <div class="sprintTitle">
                <!-- <span>Default Board</span> -->
                <v-list-item-title>{{ projectSprint.sprintName }}</v-list-item-title>
                <v-list-item-subtitle>( {{ projectSprint.sprintDescription }} )</v-list-item-subtitle>
            </div>
            <div class="boardTaskList overflow-y-auto">
                   <div v-for="(task, index) in projectAllTasks"
                 :key="index" class="boardTaskListItem" >
                 <v-list-item @click.stop="drawer = !drawer" @click="selectTask(task)">
                        <v-list-item-action>
                        <v-icon v-if="task.taskStatus == 'closed'" size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> {{ task.taskName}} </v-list-item-title>
                            <div :class="dueDateCheck(task)"> {{ getProjectDates(task.taskDueDateAt) }} </div>
                        </v-list-item-content>
                        <v-list-item-avatar size="25">
                    <v-img  v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
                    <v-img  v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

                    </v-list-item-avatar>
                 </v-list-item>
              </div>
            </div>
          </div>

          <!-- <div class="actualBoard card">
             <div class="sprintTitle">
                <span>Default Board</span>
            </div>
            <div class="boardTaskList overflow-y-auto">
                   <div v-for="(task, index) in projectAllTasks"
                 :key="index" class="boardTaskListItem" >
                 <v-list-item @click.stop="drawer = !drawer" @click="selectTask(task)">
                        <v-list-item-action>
                        <v-icon v-if="task.taskStatus == 'closed'" size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> {{ task.taskName}} </v-list-item-title>
                            <div :class="dueDateCheck(task)"> {{ getProjectDates(task.taskDueDateAt) }} </div>
                        </v-list-item-content>
                        <v-list-item-avatar size="25">
                    <v-img  v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
                    <v-img  v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

                    </v-list-item-avatar>
                 </v-list-item>
              </div>
            </div>
          </div> -->

          <!-- <div class="actualBoard card">
             <div class="sprintTitle">
                <span>Default Board</span>
            </div>
            <div class="boardTaskList overflow-y-auto">
                   <div v-for="(task, index) in projectAllTasks"
                 :key="index" class="boardTaskListItem" >
                 <v-list-item @click.stop="drawer = !drawer" @click="selectTask(task)">
                        <v-list-item-action>
                        <v-icon v-if="task.taskStatus == 'closed'" size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title> {{ task.taskName}} </v-list-item-title>
                            <div :class="dueDateCheck(task)"> {{ getProjectDates(task.taskDueDateAt) }} </div>
                        </v-list-item-content>
                        <v-list-item-avatar size="25">
                    <v-img  v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
                    <v-img  v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

                    </v-list-item-avatar>
                 </v-list-item>
              </div>
            </div>
          </div> -->

          <div class="addSprintBoard card">
            <div class="addSprintSection overflow-y-auto">
                    <add-sprint :projectId=projectId />
            </div>
          </div>
         
        </div>


    </div>
        </div>
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
            <task-side-bar :task=task :assignee="assignee" :projectId="projectId" :subTasks="subTasks" :taskFiles="taskFiles" :projectUsers="projectUsers" :people="people"/>
            
    </v-navigation-drawer>
</div>
</template>

<script>
import { mapState } from 'vuex';
import TaskSideBar from '~/components/tasks/taskSideBar'
import AddSprint from '~/components/projects/addSprint'
export default {
    props: ['projectId',  'projectUsers', 'people'],
    components: {
         'task-side-bar' : TaskSideBar,
         'add-sprint' : AddSprint
    },
    data() {
      return {
        drawer: null,
        task: {},
        subTasks: [],
        taskFiles: [],
        assignee: {},
        userId: this.$store.state.user.userId,
        taskSelect: null
      }
    },
    computed: {
      ...mapState({
          projectAllTasks: state => state.task.allTasks,
          projectSprints: state => state.sprints.sprint.sprints
      })
    },
    methods: {
       taskFilter(){
         console.log("-----------> changed" + this.taskSelect)
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
            subTaskResponse = await this.$axios.$get(`/projects/${this.projectId}/tasks/${task.taskId}/subtask?userId=${this.userId}`,{
        headers: {
          'type': 'project'
       }
      }) 
            console.log("subtasks--->", subTaskResponse.data)     ;
            this.subTasks = subTaskResponse.data;  
      //get files related to task
      let taskFilesResponse;
      try {
      taskFilesResponse = await this.$axios.$get(`/projects/${this.projectId}/tasks/${task.taskId}/files`,
      {
        headers: {
          user: this.userId,
          'type': 'project'
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
    dueDateCheck(task){
        console.log("check due date color", task);
        if(task.taskStatus === 'closed'){
          return 'boardTaskDone';
        }
        else if (task.taskDueDateAt == null) {
          return 'boardTaskDefault';
        }
        else {
          const dueDate = new Date(task.taskDueDateAt);
          const dueToUtc = new Date(dueDate.toLocaleString("en-US", {timeZone: "UTC"}));
          const dueToUtcDate = new Date(dueToUtc);
          const now = new Date();
          console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
          if(now.getTime() > dueToUtcDate.getTime()){
            console.log("overdue")
            return 'boardTaskOverDue';
          } else {
            return 'boardTaskHealthy';
          }
        }
      },
    getProjectDates(date) {
      const dueDate = new Date(date);
          const dueToUtc = new Date(dueDate.toLocaleString("en-US", {timeZone: "UTC"}));
          const dueToUtcDate = new Date(dueToUtc);
          const now = new Date();
          console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());


      if(date === null || date === '1970-01-01T05:30:00.000+0000'){
          return "Add Due Date";
      }
        else if(now.getDate() === dueToUtcDate.getDate()){
            return "Today";
        }
        else if(now.getDate()-1 === dueToUtcDate.getDate()){
            return "Yesterday";
        }
        else if(now.getDate()+1 === dueToUtcDate.getDate()){
            return "Tomorrow";
        }
        else{
 let stringDate  =  date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0,10);      
        return stringDate;
        }
      }
     },
}
</script>