<template>
     <div class="taskContent">

       <div class="allTasksDropDown">
       </div>
       <div >
        <div v-for="(task, index) in Alltasks"
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
                <v-list-item-title class="body-2">Yesterday</v-list-item-title>
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
      height="100vh"
      width="400px"
      color="#E5E5E5"
      class="sideNav"
    >
    <task-side-bar :task=task :assignee="assignee" />
    
    </v-navigation-drawer>


          <!-- --------------- end side bar --------------------- -->
    </div>
</template>

<script>
import TaskSideBar from '~/components/tasks/taskSideBar'

  export default {
    props: ['projectId', 'Alltasks'],
    data() {
      return {
        projects: ["pr1"],
        drawer: null,
        items: [
          
        ],
        task: {},
        assignee: {}
      }
    },
    components: {
      'task-side-bar' : TaskSideBar,
    },
     methods: {
    selectTask(task){
     this.task = task;
      this.$axios.get (`/users/${this.task.taskAssignee}`)
      .then (response => {
       console.log("data", response.data.data)
       this.assignee = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })
     
    },
    
      
    
     }
  }
</script>

<style scoped>

</style>