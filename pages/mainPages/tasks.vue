<template>
    <div class="top-nav">
<navigation-drawer :user=user />
<v-toolbar app
      color=""
      dark fixed 
      
      class="tool-bar"
    >
<div class="title-div">
  <div class="task-name-div">
   
        <v-list-item>

           <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Tasks</v-list-item-title>
          </v-list-item-content>

         
        
  <v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>
      </v-list-item>

      
  </div>
  <div class="task-content-div">
    <!-- <v-list-item-title v-if="this.project.projectName == null " class="font-weight-bold">Select a project</v-list-item-title>
    <v-list-item-title v-else class="font-weight-bold">Task group</v-list-item-title> -->
    <v-list-item-title class="font-weight-bold">Task group</v-list-item-title>
  </div>
</div>
    </v-toolbar>


 <div class="body-div">
      <div class="groupTasksList">

        <task-search-bar />

        <div class="listView overflow-y-auto">
<v-list-item-group active-class="">
          <div v-on:click="component='personal-tasks'">
            <v-list-item class="tasksListItem">
              <v-list-item-action>
                <v-icon size="20" color="#FFFFFF">mdi-calendar-blank-multiple</v-icon>
              </v-list-item-action>
               <v-list-item-content>
                 <v-list-item-title class="taskListName">My personal tasks</v-list-item-title>
               </v-list-item-content>
            </v-list-item>
          </div>

            <!-- task input field  -->
                  <!-- <v-text-field
                  label="Add a new group"
                  outlined
                  background-color="#FFFFFF"
                  prepend-inner-icon="mdi-plus-circle"
                  color="#0BAFFF"
                  class="addGroupListTextBox"
                ></v-text-field> -->

                <!-- group list -->

          <!-- <div v-on:click="component='group-tasks'">
            <v-list-item class="groupsListItem" active-class="activeGroupList">
              <v-list-item-action class="active">
                <v-icon size="20" class="groupListElement">mdi-calendar-blank-multiple</v-icon>
              </v-list-item-action>
               <v-list-item-content class="active">
                 <v-list-item-title class="groupListName">Football group is a group</v-list-item-title>
               </v-list-item-content>
               <v-list-item-action class="active">
                <v-icon size="15" class="groupListElement">mdi-account-group-outline</v-icon>
              </v-list-item-action>
            </v-list-item>
          </div>

             <v-list-item class="groupsListItem" active-class="activeGroupList">
              <v-list-item-action class="active">
                <v-icon size="20" class="groupListElement">mdi-calendar-blank-multiple</v-icon>
              </v-list-item-action>
               <v-list-item-content class="active">
                 <v-list-item-title class="groupListName">Kema sansadaya</v-list-item-title>
               </v-list-item-content>
               <v-list-item-action class="active">
                <v-icon size="15" class="groupListElement">mdi-account-group-outline</v-icon>
              </v-list-item-action>
            </v-list-item> -->

          </v-list-item-group>
        </div>
      </div>
       <component v-bind:is="component"></component>
 </div>





    </div>
</template>
<script>
import NavigationDrawer from '~/components/navigationDrawer'
import TaskSearchBar from '~/components/tools/taskSearchBar'
import PersonalTasks from '~/components/tasksPage/personalTasks'
import GroupTasks from '~/components/tasksPage/groupTasks'

export default {
  components: {
    NavigationDrawer,
    'task-search-bar' : TaskSearchBar,
    'personal-tasks' : PersonalTasks,
    'group-tasks' : GroupTasks
  },
  //     async asyncData({ $axios, app, store }) { 
  //   let userId = store.state.user.userId;
  //   const { data: personalTasks } = await $axios.$get(`/non-project/tasks/personal/${userId}`)
  //   console.log("personalTasks list ====> ", personalTasks)
  //   return { 
  //     personalTasks:personalTasks, 
  //    }
  // },
   data() {
      return {
        component:'personal-tasks',
      }
   }
}
</script>