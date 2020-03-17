<template>
     <div class="taskContent">

       <div class="allTasksDropDown">
       </div>
       <div >
        <div v-for="(task, index) in Alltasks"
        :key="index" class="taskList">
            <v-list-item >
              <v-list-item-action>
              <div class="round">
                <input type="checkbox" name="a2" value="1" id="checkbox" />
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
    </div>
</template>

<script>
 import TaskSidebar from '@/components/tasks/taskSideBar.vue';
  export default {
    props: ['projectId', 'Alltasks'],
    // name: 'allTasks',
    components: {
      TaskSidebar,
    },
    data() {
      return {
        projects: ["pr1"]
      }
    },
    components: {
      
    },
  }
</script>

<style scoped>

</style>