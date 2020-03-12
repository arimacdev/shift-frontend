<template>
     <v-card flat>
          <v-card-text>
             
<div class="heading">
        <div class="allTasks tasksButtons">
                <v-list-item @click="" 
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
            <v-list-item @click="" 
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
                <v-list-item @click="" 
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
      
          </v-card-text>
        </v-card>
        
</template>

<script>
import axios from 'axios'

export default {
    props: ['name'],
    
  }
 
</script>

<style scoped>
.heading{
    /* width: 100%; */
}
.tasksButtons{
    border-radius: 5px;
    float: left;
    margin-right: 5px;
}
.buttonText{
    margin-left: -20px;
}
.createTask{
    background-color: #0BAFFF;
    width: 30%;
}
.myTasks{
    background-color: #2EC973;
    width: 25%;
}
.allTasks{
    background-color: #0C0C5A;
    width: 25%;
}
.showTasks{
    width: 100%;
    margin-top: 70px;
}

</style>