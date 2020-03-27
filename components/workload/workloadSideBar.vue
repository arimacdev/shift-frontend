<template>
 <div>
  
  <div class="taskTitleDiv ">
      <div class="taskName-sideBar titleBar">
         <v-list-item>
             <v-list-item-icon>
               <!-- <v-icon v-if="this.task.taskStatus == 'closed'" size="35" color="#2EC973">mdi-checkbox-marked-circle</v-icon> -->
             <v-icon size="35" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
             </v-list-item-icon>
             <div class="textAreaSideBar">
               <input type="text" class="selectedTaskTitle" v-model="updatedName" placeholder="TaskName" >
                <span class="selectedTaskStatus">Implementing</span>
             </div>
         </v-list-item>
      </div>
  </div>


  
  </div>
</template>

<script>

</script>

