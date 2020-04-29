<template>
  <div class="bodyContentSideDrawer">
    <div class="taskTitleDiv">
      <div class="taskName-sideBar titleBar">
        <v-list-item>
          <v-list-item-icon class="checkBoxSideBar">
            <v-icon
              v-if="this.task.taskStatus == 'closed'"
              size="35"
              color="#2EC973"
            >mdi-checkbox-marked-circle</v-icon>
            <v-icon v-else size="35" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
          </v-list-item-icon>
          <div class="textAreaSideBar">
            <!-- <textarea type="text" disabled class="selectedTaskTitle"  :placeholder="this.task.taskName" v-model="this.task.taskName" ></textarea> -->
            <div class="selectedTaskTitle">{{ this.task.taskName }}</div>
            <div class="selectedTaskStatus">{{this.task.taskStatus}}</div>
          </div>
        </v-list-item>
      </div>
      <div>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="tabListItemsText itemGroupTitles"
                @click="fetchSubtasks"
              >Sub Tasks</v-list-item-title>
            </v-list-item-content>
          </template>
          <!-- ----------- loop following list item -------- -->
          <div>
            <v-list-item class="subTaskItem" v-for="(subTask, index) in subTasks" :key="index">
              <div class="workloadCheckBox">
                <v-checkbox
                  v-model="subTask.subtaskStatus"
                  hide-details
                  class="shrink mr-2 mt-0"
                  disabled="true"
                ></v-checkbox>
              </div>
              <v-list-item-content>
                <v-list-item-title class="subTaskListName">
                  <!-- <input class="subTaskListNameContent" v-model="subTask.subtaskName" type="text" disabled/> -->
                  <textarea
                    type="text"
                    disabled
                    class="selectedTaskTitle selectedsubTaskTitle"
                    :placeholder="subTask.subtaskName"
                  ></textarea>

                  <!-- <span>{{subtask.subtaskName}}</span> -->
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-group>
        <v-divider></v-divider>

        <v-list-item-group class="tabListItems">
          <v-list-item>
            <v-list-item-icon>
              <v-icon size="30" color="#0BAFFF">mdi-calendar-blank-outline</v-icon>
            </v-list-item-icon>
            <div>
              <v-list-item-title class="tabListItemsText itemGroupTitles">Due Date</v-list-item-title>
            </div>
            <v-list-item-content>
              <v-list-item-title class="tabListItemsText itemGroupDate">{{getDueDate(taskDue)}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>

        <!-- <v-list-item-group class="tabListItems"> -->
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#FF6767">mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>
          <div>
            <v-list-item-title class="tabListItemsText itemGroupTitles">Notes</v-list-item-title>
          </div>
        </v-list-item>
        <v-list-item class="noteDiv">
          <!-- {{this.task.taskNotes}} -->
          <v-textarea name="input-7-4" auto-grow outlined disabled v-model="this.task.taskNotes"></v-textarea>
        </v-list-item>
        <!-- </v-list-item-group> -->
        <v-divider></v-divider>

        <v-divider></v-divider>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon size="30" color="#FF6767">mdi-paperclip</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="tabListItemsText">Files</v-list-item-title>
            </v-list-item-content>
          </template>
          <div class="attchmentContainer fileAttachSideBar"></div>
          <div class="attchmentContainer">
            <v-list-item
              class="subTaskListItems"
              v-for="(taskFile,index) in subTaskFiles"
              :key="index"
            >
              <div class="listAttachment">
                <a style="text-decoration: none;" :href="taskFile.taskFileUrl" target="_blank">
                  <v-icon size="30" color="#0BAFFF">mdi-paperclip</v-icon>
                  <div class="attachmentName">
                    <span>{{ taskFile.taskFileName }}</span>
                  </div>
                </a>
              </div>
            </v-list-item>
          </div>
        </v-list-group>

        <v-divider></v-divider>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["task", "projectId"],
  methods: {
    fetchSubtasks() {
      console.log("fetch sub task");
    },

    getDueDate(date) {
      if (date == "1970-01-01T05:30" || date == null) return "No Due Date";
      let stringDate = date + " ";
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(11, 16);
      return stringDate;
    }
  },
  computed: {
    ...mapState({
      subTasks: state => state.subtask.subtasks,
      subTaskFiles: state => state.subtask.subTaskFiles
    }),
    taskDue: {
      get() {
        let stringDate = this.task.dueDate + " ";
        // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 16);
        return stringDate;
        // return newDate;
      }
    }
  }
};
</script>
