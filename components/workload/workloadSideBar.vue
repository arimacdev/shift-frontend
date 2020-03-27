<template>
 <div>
  
  <div class="taskTitleDiv ">
      <div class="taskName-sideBar titleBar">
         <v-list-item>
             <v-list-item-icon class="checkBoxSideBar">
               <!-- <v-icon v-if="this.task.taskStatus == 'closed'" size="35" color="#2EC973">mdi-checkbox-marked-circle</v-icon> -->
             <v-icon size="35" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
             </v-list-item-icon>
             <div class="textAreaSideBar">
               <textarea type="text" disabled class="selectedTaskTitle"  :placeholder="this.task.taskName" ></textarea>
                <span class="selectedTaskStatus">{{this.task.taskStatus}}</span>
             </div>
         </v-list-item>
      </div>
      <div>
        <v-list-group >
          <template v-slot:activator>
            <v-list-item-icon>
             <v-icon size="30" color="#2EC973" >mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
             <v-list-item-content>
            <v-list-item-title class="tabListItemsText itemGroupTitles" @click="fetchSubtasks">Sub Tasks</v-list-item-title>
          </v-list-item-content>
          </template>
          <!-- ----------- loop following list item -------- -->
           <v-list-item class="subTaskItem">
                    <div>
                         <v-checkbox
                          v-model="subtaskStatus"
                          hide-details
                          class="shrink mr-2 mt-0"            
                          >
                          </v-checkbox>

                     </div>
                    <v-list-item-content>
                      <v-list-item-title class="subTaskListName">
                        <span>this is a sub task of main task of project of company of country of world </span>
                        </v-list-item-title>
                    </v-list-item-content>
        </v-list-item>
        </v-list-group>
         <v-divider></v-divider>

       <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#0BAFFF" >mdi-calendar-blank-outline</v-icon>
          </v-list-item-icon>
          <div>
             <v-list-item-title class="tabListItemsText itemGroupTitles">Due Date</v-list-item-title>
           </div>
            <v-list-item-content>
             <v-list-item-title class="tabListItemsText itemGroupDate">{{this.task.dueDate}}</v-list-item-title>
           </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
<v-divider></v-divider>

<v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#FF6767" >mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>
          <div>
             <v-list-item-title class="tabListItemsText itemGroupTitles">Notes</v-list-item-title>
           </div>
        </v-list-item>
        <v-list-item>
          <div class="noteDiv">
            {{this.task.taskNotes}}
          </div>
        </v-list-item>
      </v-list-item-group>
<v-divider></v-divider>

      </div>
  </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
export default {
props: ['task', 'projectId'],
methods: {
  fetchSubtasks() {
    console.log("fetch sub task");
  }
},
    
  }
</script>
