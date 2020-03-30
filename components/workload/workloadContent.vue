<template>
    <div>
        <div class="workloadContentDiv workloadBody overflow-y-auto">
           <v-expansion-panels
                v-model="panel"
                :disabled="disabled"
                multiple
                dark=""
                >

                <!-- -------------- loop this pannel for every project ---------- -->
                <v-expansion-panel v-for="(project, index) in workloadTasks" :key="index" class="projectDetailsPannels">
                    <v-expansion-panel-header class="projectDetailsPannelHeader" color="#080848">{{project.projectName}} - {{project.completed}}/{{project.total}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="projectDetailsPannelContent" color="#EDF0F5">
                    
                    <!-- ----------- loop content for tasks of projects --------------- -->
        <div class="taskDetailsBar">
                      <v-list-item class="workloadTaskItems"  @click.stop="drawer = !drawer"  v-for="(task, index) in project.taskList" :key="index" @click="selectTask(task, project.projectId)">
                        <v-list-item-action>
                        <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="workloadTaskName">{{task.taskName}}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title :class="dueDateCheck(task)"> {{getDueDate(task.dueDate)}}</v-list-item-title>
                        </v-list-item-content>
                            
                          <div class="">{{task.taskStatus}}</div>
                        <div class="updatedDate">
                            <div class="body-2"> {{getDueDate(task.dueDate)}}</div>
                        </div>
                        <!-- <v-list-item-avatar>
                    <v-img v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img>
                        <v-img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

                        </v-list-item-avatar> -->
                    </v-list-item>
        </div>

                    <!-- ---------------- end task loop ------------- -->
                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>

                  <!-- -------------- start side bar ----------------- -->

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                right=""
                width="600px"
                class=""
                color="#FFFFFF"
                >
    <task-side-bar :task="task" :projectId="projectId"/>

            </v-navigation-drawer>
          <!-- --------------- end side bar --------------------- -->
    </div>
    </div>
</template>

<script>
import TaskSideBar from '~/components/workload/workloadSideBar'
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    'task-side-bar' : TaskSideBar
  },
   data() {
      return {
        drawer: null,
        task: {},
        projectId: ''
      }
    },
    methods: {
      selectTask(task, projectId) {
        this.task = task;
        this.projectId = projectId
        this.$store.dispatch('subtask/fetchSubTasks',{
          projectId:projectId, 
          taskId:task.taskId
         });
      },
      getDueDate(date){
        let stringDate  = date + " ";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0,10) + " " + stringDate.slice(11,16);           
        return stringDate;
      },
      dueDateCheck(task){
        console.log("check due date color", task);
        if(task.taskStatus === 'closed'){
          return 'workLoadTaskDone';
        } else {
          console.log("due date wf", task.dueDate);
          const dueDate = new Date(task.dueDate);
          const isoDate = dueDate.toUTCString();
          const isoDateS = dueDate.toISOString();

          console.log("due date iso", isoDate, isoDateS);
          const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Colombo"});
          const slNow = new Date(now);
          console.log("duedate-->", dueDate, "now", slNow);
          const isounix = Date.parse(isoDateS)
          console.log("unix", isounix)
          console.log("SLTime", slNow.getTime(), "DueTime", isounix);
          if(slNow.getTime()> isounix){
            console.log("overdue")
            return 'workLoadTaskHealthy';
          } else {
            return 'workLoadTaskOverDue';
          }
        }
      }
    },
   computed: {
      ...mapState({
          workloadTasks: state => state.workload.workloadTasks,
      })
   }
}
</script>