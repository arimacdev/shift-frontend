<template>
    <div>
        <div class="workloadContentDiv workloadBody">
           <v-expansion-panels
                v-model="panel"
                :disabled="disabled"
                multiple
                dark=""
                >

                <!-- -------------- loop this pannel for every project ---------- -->
                <v-expansion-panel class="projectDetailsPannels">
                    <v-expansion-panel-header class="projectDetailsPannelHeader" color="#080848">Project SAIV - 1/5</v-expansion-panel-header>
                    <v-expansion-panel-content class="projectDetailsPannelContent" color="#EDF0F5">
                    
                    <!-- ----------- loop content for tasks of projects --------------- -->
        <div class="taskDetailsBar">
                      <v-list-item  @click.stop="drawer = !drawer" @click="">
                        <v-list-item-action>
                        <!-- <v-icon v-if="task.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon> -->
                        <v-icon  size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="workloadTaskName">Add Task Name</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content class="updatedDate">
                            <v-list-item-title class="body-2">add due date</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-avatar>
                    <!-- <v-img v-if="task.taskAssigneeProfileImage != null" :src="task.taskAssigneeProfileImage"></v-img> -->
                        <v-img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

                        </v-list-item-avatar>
                    </v-list-item>
        </div>

                    <!-- ---------------- end task loop ------------- -->
                    </v-expansion-panel-content>
                </v-expansion-panel>
                </v-expansion-panels>

                  <!-- -------------- start side bar ----------------- -->

            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                right=""
                width="600px"
                class=""
                color="#FFFFFF"
                >
    <task-side-bar />

            </v-navigation-drawer>
          <!-- --------------- end side bar --------------------- -->
    </div>
    </div>
</template>

<script>
import TaskSideBar from '~/components/workload/taskSideBar'

export default {
  components: {
    'task-side-bar' : TaskSideBar
  },
   data() {
      return {
        drawer: null,
      }
    },
}
</script>