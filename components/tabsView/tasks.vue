<template>
     <v-card flat>
          <v-card-text>
<div class="heading">
        <div class="allTasks tasksButtons">
                <v-list-item v-on:click="setTaskTab('all-tasks')" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">All tasks</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </div>

        <div class="myTasks tasksButtons">
            <v-list-item v-on:click="setTaskTab('my-tasks')" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">My tasks</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </div>

        <div class="createTask tasksButtons">
                <v-list-item v-on:click="setTaskTab('add-task')" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Add task</v-list-item-title>
                    </v-list-item-content>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-list-item>
        </div>
</div>   

            <!-- <keep-alive> -->
                 <component v-bind:is="component" :projectId=projectId :Alltasks="Alltasks" :MyTasks="MyTasks" :projectUsers="projectUsers" :people="people"></component>
            <!-- </keep-alive> -->
        
          </v-card-text>
        </v-card>
</template>

<script>
import AllTasks from '~/components/tasks/allTasks'
import MyTasks from '~/components/tasks/myTasks'
import AddTask from '~/components/tasks/addTask'

export default {
    props: ['name', 'projectId', 'Alltasks', 'MyTasks', 'people'],
    data() {
        return {
            key: value
        }
    },
    name: 'tasks',
     components: {
      'all-tasks' : AllTasks,
      'my-tasks' : MyTasks,
      'add-task' : AddTask
    },
     data() {
      return {
        component:'all-tasks',
        projectUsers: []
      }
     },
     methods: {
         setTaskTab(tabType) {
             console.log("projectId", this.projectId)
             this.component = tabType;
            //  if(tabType === 'add-task'){
                this.$axios.get (`users/project/${this.projectId}`)
                .then (response => {
                console.log("project users", response.data.data)
                this.projectUsers = response.data.data;
                })
                .catch (e => {
                console.log("error", e)
                })
            //  }
         }
     },
  }
 
</script>

<style scoped>
.taskContent{
    width: 100%;
    margin-top: 60px;
}

</style>