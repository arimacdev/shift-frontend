<template>
     <v-card flat>
          <v-card-text>
             
<div class="heading">
        <div class="allTasks tasksButtons">
                <v-list-item v-on:click="component='all-tasks'" 
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
            <v-list-item v-on:click="component='my-tasks'" 
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
                <v-list-item v-on:click="component='add-task'" 
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

       <!-- <all-tasks :projects=projects /> -->
            <keep-alive>
                 <component v-bind:is="component" :projectId=projectId></component>
            </keep-alive>
        
          </v-card-text>
        </v-card>
</template>

<script>
import axios from 'axios'
import AllTasks from '~/components/projects/allTasks'
import MyTasks from '~/components/projects/myTasks'
import AddTask from '~/components/projects/addTask'

export default {
    props: ['name', 'projectId'],
    name: 'tasks',
     components: {
      'all-tasks' : AllTasks,
      'my-tasks' : MyTasks,
      'add-task' : AddTask
    },
     data() {
      return {
        component:'all-tasks',
      }
     }
  }
 
</script>

<style scoped>
.taskContent{
    width: 100%;
    margin-top: 60px;
}

</style>