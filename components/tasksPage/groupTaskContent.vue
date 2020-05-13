<template>
  <div class>
    <!-- tabs body -->
    <div>
      <v-card class="tabs">
        <!-- ------------------------- group task content ------------------- -->

        <div class="taskFilter-tasksPage">
          <v-select
            v-model="taskSelect"
            :items="items"
            item-text="name"
            item-value="id"
            label="All"
            solo
          ></v-select>
          <v-text-field
            v-model="addNewTask"
            solo
            prepend-inner-icon="mdi-plus-circle"
            label="Add a new task"
            class="addPersonalTaskTextBox"
            @keyup.enter="addGroupTask(null)"
          ></v-text-field>
          <!-- -------- loop task list here ----------- -->
          <div v-for="(task, index) in groupTasks" :key="index">
            <div class="backPannelAllTask" v-if="taskSelect == 'all'">
              <div class="taskList restructuredMainTaskList">
                <v-list-item @click="
              selectGroupTask(task.parentTask, task);">
                  <!-- @click.stop="drawer = !drawer" -->
                  <v-list-item-action>
                    <v-icon
                      v-if="task.parentTask.taskStatus == 'closed'"
                      size="30"
                      color="#2EC973"
                    >mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                  </v-list-item-action>
                  <div class="tasklistTaskNames restructuredMainTaskName">
                    <div class="body-2">
                      <span class="restructuredMainTaskCode">{{task.parentTask.secondaryTaskId}}</span>
                      {{ task.parentTask.taskName }}
                    </div>
                  </div>
                  <v-list-item-content class="updatedDate">
                    <v-list-item-title
                      :class="dueDateCheck(task.parentTask)"
                    >{{ getTaskDueDate(task.parentTask.taskDueDateAt) }}</v-list-item-title>
                  </v-list-item-content>
                  <div>
                    <v-list-item-avatar>
                      <v-img
                        v-if="task.parentTask.taskAssigneeProfileImage != null"
                        :src="task.parentTask.taskAssigneeProfileImage"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      ></v-img>
                    </v-list-item-avatar>
                  </div>
                  <!-- <div class="boardTabLinkIcon">
                    <nuxt-link
                      :to="
                  '/task/' + task.parentTask.taskId + '/?project=' + projectId
                "
                      style="text-decoration: none;"
                    >
                      <v-icon color="blue">mdi-link-variant</v-icon>
                    </nuxt-link>
                  </div>-->
                  <div class="bluePart"></div>
                </v-list-item>
              </div>

              <!-- -------------- sub task design --------------- -->
              <div class="restructuredSubTaskCreate">
                <v-text-field
                  v-model="addNewTask"
                  background-color="#0BAFFF"
                  solo
                  dark
                  prepend-inner-icon="mdi-plus-circle"
                  label="Add a sub task..."
                  class
                  @keyup.enter="addGroupTask(task.parentTask.taskId)"
                  clearable
                ></v-text-field>
              </div>
              <div v-if="task.childTasks.length !== 0">
                <div
                  v-for="(childTask, index) in task.childTasks"
                  :key="index"
                  class="taskList restructuredSubTaskList"
                >
                  <v-list-item
                    @click="
                selectGroupTask(childTask, task);
                taskDialog = true;
              "
                  >
                    <!-- @click.stop="drawer = !drawer" -->
                    <v-list-item-action>
                      <v-icon
                        v-if="childTask.taskStatus == 'closed'"
                        size="30"
                        color="#2EC973"
                      >mdi-checkbox-marked-circle</v-icon>
                      <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                    </v-list-item-action>
                    <div class="tasklistTaskNames restructuredSubTaskName">
                      <div class="body-2">
                        <span class="restructuredMainTaskCode">{{childTask.secondaryTaskId}}</span>
                        {{ childTask.taskName }}
                      </div>
                    </div>

                    <v-list-item-content class="updatedDate">
                      <v-list-item-title
                        :class="dueDateCheck(childTask)"
                      >{{ getTaskDueDate(childTask.taskDueDateAt) }}</v-list-item-title>
                    </v-list-item-content>
                    <div>
                      <v-list-item-avatar>
                        <v-img
                          v-if="childTask.taskAssigneeProfileImage != null"
                          :src="childTask.taskAssigneeProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        ></v-img>
                      </v-list-item-avatar>
                    </div>
                    <!-- <div class="boardTabLinkIcon">
                      <nuxt-link
                        :to="'/task/' + childTask.taskId + '/?project=' + projectId"
                        style="text-decoration: none;"
                      >
                        <v-icon color="blue">mdi-link-variant</v-icon>
                      </nuxt-link>
                    </div>-->
                  </v-list-item>
                </div>
              </div>

              <!-- -------------- end sub task design -------------- -->
            </div>
          </div>

          <!-- -------- loop filter list here ----------- -->
          <div v-for="(task, index) in groupTasks" :key="index">
            <div class v-if="taskSelect != 'all'">
              <div
                v-if="task.parentTask.taskStatus == taskSelect"
                class="restructuredGroupMainTaskFilterList parentOwerflow"
              >
                <v-list-item @click="
              selectGroupTask(task.parentTask, task);">
                  <!-- @click.stop="drawer = !drawer" -->
                  <v-list-item-action>
                    <v-icon
                      v-if="task.parentTask.taskStatus == 'closed'"
                      size="30"
                      color="#2EC973"
                    >mdi-checkbox-marked-circle</v-icon>
                    <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                  </v-list-item-action>
                  <div class="tasklistTaskNames restructuredMainTaskName">
                    <div class="body-2">
                      <span class="restructuredMainTaskCode">{{task.parentTask.secondaryTaskId}}</span>
                      {{ task.parentTask.taskName }}
                    </div>
                  </div>
                  <v-list-item-content class="updatedDate">
                    <v-list-item-title
                      :class="dueDateCheck(task.parentTask)"
                    >{{ getTaskDueDate(task.parentTask.taskDueDateAt) }}</v-list-item-title>
                  </v-list-item-content>
                  <div>
                    <v-list-item-avatar>
                      <v-img
                        v-if="task.parentTask.taskAssigneeProfileImage != null"
                        :src="task.parentTask.taskAssigneeProfileImage"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      ></v-img>
                    </v-list-item-avatar>
                  </div>
                  <!-- <div class="boardTabLinkIcon">
                    <nuxt-link
                      :to="
                  '/task/' + task.parentTask.taskId + '/?project=' + projectId
                "
                      style="text-decoration: none;"
                    >
                      <v-icon color="blue">mdi-link-variant</v-icon>
                    </nuxt-link>
                  </div>-->
                  <div class="bluePart"></div>
                </v-list-item>
              </div>

              <!-- -------------- sub task design --------------- -->

              <div v-if="task.childTasks.length !== 0">
                <div
                  v-for="(childTask, index) in task.childTasks"
                  :key="index"
                  class="restructuredGroupMainTaskFilterList"
                >
                  <v-list-item
                    v-if="childTask.taskStatus == taskSelect"
                    @click="
                selectGroupTask(childTask, task);
                taskDialog = true; 
              "
                  >
                    <!-- @click.stop="drawer = !drawer" -->
                    <v-list-item-action>
                      <v-icon
                        v-if="childTask.taskStatus == 'closed'"
                        size="30"
                        color="#2EC973"
                      >mdi-checkbox-marked-circle</v-icon>
                      <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                    </v-list-item-action>
                    <div class="tasklistTaskNames restructuredSubTaskName">
                      <div class="body-2">
                        <span class="restructuredMainTaskCode">{{childTask.secondaryTaskId}}</span>
                        {{ childTask.taskName }}
                      </div>
                    </div>

                    <v-list-item-content class="updatedDate">
                      <v-list-item-title
                        :class="dueDateCheck(childTask)"
                      >{{ getTaskDueDate(childTask.taskDueDateAt) }}</v-list-item-title>
                    </v-list-item-content>
                    <div>
                      <v-list-item-avatar>
                        <v-img
                          v-if="childTask.taskAssigneeProfileImage != null"
                          :src="childTask.taskAssigneeProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        ></v-img>
                      </v-list-item-avatar>
                    </div>
                    <!-- <div class="boardTabLinkIcon">
                      <nuxt-link
                        :to="'/task/' + childTask.taskId + '/?project=' + projectId"
                        style="text-decoration: none;"
                      >
                        <v-icon color="blue">mdi-link-variant</v-icon>
                      </nuxt-link>
                    </div>-->
                  </v-list-item>
                </div>
              </div>

              <!-- -------------- end sub task design -------------- -->
            </div>
          </div>
        </div>
        <!-- ------------------- group task content end --------------- -->
      </v-card>
    </div>

    <!-- -------------- start side bar ----------------- -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      right
      height="100vh"
      width="800px"
      class
      color="#FFFFFF"
    >
      <group-side-drawer
        :task="task"
        :group="group"
        :assignee="assignee"
        :groupPeople="groupPeople"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        @shrinkSideBar="shrinkSideBar"
      />
    </v-navigation-drawer>
    <!-- --------------- end side bar --------------------- -->
    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition" persistent>
      <!-- <v-toolbar dark color="primary">
        <v-btn icon dark @click="taskDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-bold">
          {{
          this.task.taskName
          }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <button class :disabled="checkValidation">
            <v-list-item dark>
              <div>
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      v-on="on"
                      size="30px"
                      @click="taskDeleteDialog = true"
                      color="#FFFFFF"
                    >mdi-delete-circle</v-icon>
                  </template>
                  <span>Delete task</span>
                </v-tooltip>
              </div>
            </v-list-item>
          </button>
        </v-toolbar-items>
      </v-toolbar>-->
      <task-dialog
        ref="taskDialog"
        :task="task"
        :projectId="projectId"
        :subTasks="subTasks"
        :projectUsers="projectUsers"
        :componentClose="componentClose"
        :taskObject="taskObject"
        :taskFiles="taskFiles"
        @taskDialogClosing="taskDialogClosing()"
      />
    </v-dialog>

    <div @click="close">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>

<script>
import GroupSideDrawer from "~/components/tasksPage/groupSideDrawer";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import TaskDialog from "~/components/tasksPage/groupTaskDialog";
import axios from "axios";
import { mapState } from "vuex";

export default {
  props: ["group"],
  components: {
    "group-side-drawer": GroupSideDrawer,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "task-dialog": TaskDialog
  },
  data() {
    return {
      taskObject: {},
      taskDialog: false,
      taskDeleteDialog: false,
      taskSelect: "all",
      errorMessage: "",
      successMessage: "",
      component: "",
      drawer: null,
      userId: this.$store.state.user.userId,
      personalTask: "",
      groupTask: "",
      updatedTaskName: "",
      task: {},
      assignee: {},
      subTasks: [],
      taskFiles: [],
      items: [
        { id: "all", name: "All" },
        { id: "open", name: "Open" },
        { id: "closed", name: "Closed" }
      ]
    };
  },

  // created() {
  // //  this.$store.dispatch('personalTasks/fetchAllPersonalTasks');
  // },

  methods: {
    taskDialogClosing() {
      this.taskDialog = false;
    },

    close() {
      this.component = "";
    },
    dueDateCheck(task) {
      console.log("check due date color", task);
      if (task.taskStatus === "closed") {
        return "workLoadTaskDone";
      } else if (
        task.taskDueDateAt == null ||
        task.taskDueDateAt === "1970-01-01T05:30:00.000+0000"
      ) {
        return "workLoadTaskDefault";
      } else {
        const dueDate = new Date(task.taskDueDateAt);
        const dueToUtc = new Date(
          dueDate.toLocaleString("en-US", { timeZone: "UTC" })
        );
        const dueToUtcDate = new Date(dueToUtc);
        const now = new Date();
        console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          console.log("overdue");
          return "workLoadTaskOverDue";
        } else {
          return "workLoadTaskHealthy";
        }
      }
    },
    shrinkSideBar() {
      console.log("shrink side bar");
      this.drawer = false;
    },
    async selectGroupTask(groupTask, taskObject) {
      this.taskDialog = true;
      // this.$refs.taskDialog.clicked();

      this.task = groupTask;
      this.taskObject = taskObject;
      console.log("selectedTask", groupTask);
      this.$axios
        .get(`/users/${this.task.taskAssignee}`)
        .then(async response => {
          //  console.log("fetched task -->", response.data.data)
          this.assignee = response.data.data;
          //if task fetch is successful,
          let subTaskResponse;
          try {
            let taskFilesResponse;
            try {
              taskFilesResponse = await this.$axios.$get(
                `/taskgroup/${this.task.taskGroupId}/tasks/${this.task.taskId}/files`,
                {
                  headers: {
                    user: this.userId
                  }
                }
              );
              console.log("files--->", taskFilesResponse.data);
              this.taskFiles = taskFilesResponse.data;
              this.$store.dispatch(
                "groups/groupTask/setGroupTaskFiles",
                taskFilesResponse.data
              );
              this.$store.dispatch(
                "user/setSelectedTaskUser",
                this.task.taskAssignee
              );
            } catch (error) {
              console.log("Error fetching data", error);
            }
          } catch (error) {
            console.log("Error fetching data", error);
          }
        })
        .catch(e => {
          console.log("error", e);
        });
    },
    async addGroupTask(selectedParentTask) {
      console.log("add group task");
      this.$store.dispatch("groups/groupTask/addTaskToGroup", {
        taskName: this.updatedTaskName,
        taskGroupId: this.group.taskGroupId,
        parentTaskId: selectedParentTask
      });
      this.updatedTaskName = "";
      this.$refs.form.reset();
      // this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
      //   taskGroupId: this.group.taskGroupId,
      //   userId: this.userId
      // });
    },
    getTaskDueDate(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();
      console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "Add Due Date";
      } else if (now.getDate() === dueToUtcDate.getDate()) {
        return "Today";
      } else if (now.getDate() - 1 === dueToUtcDate.getDate()) {
        return "Yesterday";
      } else if (now.getDate() + 1 === dueToUtcDate.getDate()) {
        return "Tomorrow";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10);
        return stringDate;
      }
    }
  },
  computed: {
    ...mapState({
      groupTasks: state => state.groups.groupTask.groupTasks,
      groupPeople: state => state.groups.groupPeople.groupPeople
    }),
    addNewTask: {
      get() {
        return null;
      },
      set(value) {
        this.updatedTaskName = value;
      }
    }
  }
};
</script>

<style scoped>
.tabs {
  padding-left: 10px;
  box-shadow: none !important;
}
.wrapper {
  width: 100%;
}
</style>