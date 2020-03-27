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
               <textarea type="text" disabled class="selectedTaskTitle" v-model="updatedName" placeholder="TaskName" ></textarea>
                <span class="selectedTaskStatus">Implementing</span>
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
            <v-list-item-title class="tabListItemsText">Sub Tasks</v-list-item-title>
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
      </div>
  </div>
  </div>
</template>
