<template>
     <v-card flat>
          <v-card-text>
             
<div class="heading">
        <div class="createTask">
                <v-list-item @click="" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="body-2">Add new task</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </div>

        <div class="completedTasks">
            <v-list-item @click="" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="body-2">Show completed tasks</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </div>
</div>       

<div class="showTasks">

</div>

          </v-card-text>
        </v-card>
</template>


<style scoped>
.heading{
    width: 100%;
    background-color: red;
}
.createTask{
    background-color: #0BAFFF;
    border-radius: 5px;
    width: 69%;
    float: left;
}
.completedTasks{
    background-color: #2EC973;
    border-radius: 5px;
    width: 29%;
    float: right;
}
</style>