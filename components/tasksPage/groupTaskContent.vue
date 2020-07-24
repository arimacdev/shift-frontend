<template>
  <div class>
    <!-- tabs body -->
    <div>
      <v-card class="tabs">
        <!-- ------------------------- group task content ------------------- -->

        <div class="taskFilter-tasksPage">
          <v-select
            v-model="taskSelect"
            background-color="#FFFFFF"
            :items="items"
            item-text="name"
            item-value="id"
            solo
            dense
            flat
            outlined
            style="border-radius: 0px"
          ></v-select>
          <v-form onsubmit="return false" ref="form">
            <v-text-field
              v-model="addNewTask"
              background-color="#FFFFFF"
              outlined
              solo
              dense
              flat
              prepend-inner-icon="mdi-plus"
              label="Add a new task"
              class="addPersonalTaskTextBox"
              style="border-radius: 0px"
              @keyup.enter="addGroupTask(null)"
            ></v-text-field>
          </v-form>
          <!-- -------- loop task list here ----------- -->
          <div v-for="(task, index) in groupTasks" :key="index">
            <v-hover open-delay="500" v-slot:default="{ hover }">
              <div v-if="taskSelect == 'all'">
                <div class="restructuredMainTaskList">
                  <v-list-item class="upperListItem">
                    <v-list-item
                      class="innerListItem"
                      @click="
              selectGroupTask(task.parentTask, task);"
                    >
                      <!-- @click.stop="drawer = !drawer" -->
                      <v-list-item-action>
                        <v-icon
                          v-if="task.parentTask.taskStatus == 'closed'"
                          size="25"
                          color="#66B25F"
                        >mdi-checkbox-blank</v-icon>
                        <v-icon v-else size="25" color="#939393">mdi-checkbox-blank-outline</v-icon>
                      </v-list-item-action>
                      <div class="tasklistTaskNames restructuredMainTaskName">
                        <div>
                          <span class="restructuredMainTaskCode">{{task.parentTask.secondaryTaskId}}</span>
                          {{ task.parentTask.taskName }}
                        </div>
                      </div>
                      <v-list-item-content class="updatedDate">
                        <v-list-item-title
                          class="fontRestructure12"
                          :class="dueDateCheck(task.parentTask)"
                        >{{ getTaskDueDate(task.parentTask.taskDueDateAt) }}</v-list-item-title>
                      </v-list-item-content>
                      <div style="margin-right: -25px">
                        <v-list-item-avatar size="25">
                          <v-img
                            v-if="task.parentTask.taskAssigneeProfileImage != null && task.parentTask.taskAssigneeProfileImage != ''"
                            :src="task.parentTask.taskAssigneeProfileImage"
                          ></v-img>
                          <v-img
                            v-else
                            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                          ></v-img>
                        </v-list-item-avatar>
                      </div>
                    </v-list-item>
                  </v-list-item>
                </div>

                <!-- -------------- sub task design --------------- -->
                <div
                  class="restructuredSubTaskCreate"
                  v-if="task.parentTask.taskStatus != 'closed'"
                >
                  <v-expand-transition>
                    <v-text-field
                      v-if="hover"
                      v-model="subTaskName[index]"
                      background-color="#0BAFFF"
                      solo
                      style="margin-bottom: -25px; margin-top: 5px; border-radius: 0px"
                      dark
                      dense
                      flat
                      prepend-inner-icon="mdi-plus-circle"
                      label="Add a sub task..."
                      class
                      @keyup.enter="addGroupSubTask(index, task.parentTask.taskId)"
                      clearable
                    ></v-text-field>
                  </v-expand-transition>
                </div>
                <div class="restructuredSubTaskCreate" v-else style="margin-bottom: -5px;"></div>
                <div v-if="task.childTasks.length !== 0">
                  <div
                    v-for="(childTask, index) in task.childTasks"
                    :key="index"
                    class="restructuredSubTaskListRestructure"
                  >
                    <v-list-item class="upperListItem">
                      <v-list-item
                        class="innerListItem"
                        @click="
                selectGroupTask(childTask, task);
                taskDialog = true;
              "
                      >
                        <!-- @click.stop="drawer = !drawer" -->
                        <v-list-item-action>
                          <v-icon
                            v-if="childTask.taskStatus == 'closed'"
                            size="25"
                            color="#66B25F"
                          >mdi-checkbox-blank</v-icon>
                          <v-icon v-else size="25" color="#939393">mdi-checkbox-blank-outline</v-icon>
                        </v-list-item-action>
                        <div class="tasklistTaskNames restructuredSubTaskName">
                          <div>
                            <span class="restructuredMainTaskCode">{{childTask.secondaryTaskId}}</span>
                            {{ childTask.taskName }}
                          </div>
                        </div>

                        <v-list-item-content class="updatedDate">
                          <v-list-item-title
                            class="fontRestructure12"
                            :class="dueDateCheck(childTask)"
                          >{{ getTaskDueDate(childTask.taskDueDateAt) }}</v-list-item-title>
                        </v-list-item-content>
                        <div style="margin-right: -25px">
                          <v-list-item-avatar size="25">
                            <v-img
                              v-if="childTask.taskAssigneeProfileImage != null && childTask.taskAssigneeProfileImage != ''"
                              :src="childTask.taskAssigneeProfileImage"
                            ></v-img>
                            <v-img
                              v-else
                              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
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
                    </v-list-item>
                  </div>
                </div>

                <!-- -------------- end sub task design -------------- -->
              </div>
            </v-hover>
          </div>

          <!-- -------- loop filter list here ----------- -->
          <div v-for="(task, index) in groupTasks" :key="index">
            <div class v-if="taskSelect != 'all'">
              <div
                v-if="task.parentTask.taskStatus == taskSelect"
                class="restructuredFilterTaskList"
              >
                <v-list-item
                  @click="
              selectGroupTask(task.parentTask, task);"
                  class="upperFilterListItem"
                >
                  <!-- @click.stop="drawer = !drawer" -->
                  <v-list-item-action>
                    <v-icon
                      v-if="task.parentTask.taskStatus == 'closed'"
                      size="25"
                      color="#66B25F"
                    >mdi-checkbox-blank</v-icon>
                    <v-icon v-else size="25" color="#939393">mdi-checkbox-blank-outline</v-icon>
                  </v-list-item-action>
                  <div class="tasklistTaskNames restructuredMainTaskName">
                    <div>
                      <span class="restructuredMainTaskCode">{{task.parentTask.secondaryTaskId}}</span>
                      {{ task.parentTask.taskName }}
                    </div>
                  </div>
                  <v-list-item-content class="updatedDate">
                    <v-list-item-title
                      :class="dueDateCheck(task.parentTask)"
                      class="fontRestructure12"
                    >{{ getTaskDueDate(task.parentTask.taskDueDateAt) }}</v-list-item-title>
                  </v-list-item-content>
                  <div>
                    <v-list-item-avatar size="25">
                      <v-img
                        v-if="task.parentTask.taskAssigneeProfileImage != null && task.parentTask.taskAssigneeProfileImage != ''"
                        :src="task.parentTask.taskAssigneeProfileImage"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
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
                <div v-for="(childTask, index) in task.childTasks" :key="index">
                  <v-list-item
                    class="restructuredFilterGroupTaskList"
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
                        size="25"
                        color="#66B25F"
                      >mdi-checkbox-blank</v-icon>
                      <v-icon v-else size="25" color="#939393">mdi-checkbox-blank-outline</v-icon>
                    </v-list-item-action>
                    <div class="tasklistTaskNames restructuredSubTaskName">
                      <div>
                        <span class="restructuredMainTaskCode">{{childTask.secondaryTaskId}}</span>
                        {{ childTask.taskName }}
                      </div>
                    </div>

                    <v-list-item-content class="updatedDate">
                      <v-list-item-title
                        :class="dueDateCheck(childTask)"
                        class="fontRestructure12"
                      >{{ getTaskDueDate(childTask.taskDueDateAt) }}</v-list-item-title>
                    </v-list-item-content>
                    <div>
                      <v-list-item-avatar size="25">
                        <v-img
                          v-if="childTask.taskAssigneeProfileImage != null && childTask.taskAssigneeProfileImage != ''"
                          :src="childTask.taskAssigneeProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
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
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer>-->
    <!-- --------------- end side bar --------------------- -->
    <!-- ------------ task dialog --------- -->

    <v-dialog v-model="taskDialog" width="90vw" transition="dialog-bottom-transition" persistent>
      <task-dialog
        ref="taskDialog"
        :task="task"
        :subTasks="subTasks"
        :taskObject="taskObject"
        :taskFiles="taskFiles"
        @taskDialogClosing="taskDialogClosing()"
      />
    </v-dialog>

    <div @click="close">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
      <!-- <success-popup /> -->
    </div>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import GroupSideDrawer from "~/components/tasksPage/groupSideDrawer";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import TaskDialog from "~/components/tasksPage/groupTaskDialog";
import Progress from "~/components/popups/progress";
import axios from "axios";
import { mapState } from "vuex";

export default {
  props: ["group"],
  components: {
    "group-side-drawer": GroupSideDrawer,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "task-dialog": TaskDialog,
    "progress-loading": Progress
  },
  data() {
    return {
      subTaskName: [],
      overlay: false,
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
    backPannelDisplay(child) {
      if (child != 0) {
        return "backPannelAllTask";
      } else {
        return "";
      }
    },
    taskDialogClosing() {
      this.taskDialog = false;
    },

    close() {
      this.component = "";
    },
    dueDateCheck(task) {
      // console.log("check due date color", task);
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
        // console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime());
        if (now.getTime() > dueToUtcDate.getTime()) {
          // console.log("overdue");
          return "workLoadTaskOverDue";
        } else {
          return "workLoadTaskHealthy";
        }
      }
    },
    shrinkSideBar() {
      // console.log("shrink side bar");
      this.drawer = false;
    },
    async selectGroupTask(groupTask, taskObject) {
      this.taskDialog = true;
      // this.$refs.taskDialog.clicked();

      this.task = groupTask;
      this.taskObject = taskObject;
      // console.log("selectedTask", groupTask);
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
              // console.log("files--->", taskFilesResponse.data);
              this.taskFiles = taskFilesResponse.data;
              this.$store.dispatch(
                "groups/groupTask/setGroupTaskFiles",
                taskFilesResponse.data
              );
              this.$store.dispatch(
                "user/setSelectedTaskUser",
                this.task.taskAssignee
              );
              this.$store.dispatch(
                "groups/groupTask/addSelectedGroupTask",
                groupTask
              );
              if (this.task.isParent) {
                // console.log("isparent");
                this.$store.dispatch("groups/groupTask/fetchChildren", {
                  taskGroupId: this.task.taskGroupId,
                  taskId: this.task.taskId
                });
              } else {
                this.$store.dispatch(
                  "groups/groupTask/addParentTask",
                  this.task.parentId
                );
              }
            } catch (error) {
              console.log("Error fetching data", error);
            }
          } catch (error) {
            console.log("Error fetching data", error);
          }
        })
        .catch(e => {
          // console.log("error", e);
        });
    },
    async addGroupTask(selectedParentTask) {
      this.overlay = true;
      // console.log("add group task");
      await this.$store.dispatch("groups/groupTask/addTaskToGroup", {
        taskName: this.updatedTaskName,
        taskGroupId: this.group.taskGroupId,
        parentTaskId: selectedParentTask
      });
      this.updatedTaskName = "";
      this.$refs.form.reset();
      this.overlay = false;
      this.$store.dispatch("groups/groupPeople/fetchGroupPeople", {
        taskGroupId: this.group.taskGroupId,
        userId: "user"
      });
    },
    async addGroupSubTask(index, selectedParentTask) {
      this.overlay = true;
      // console.log("add group task");
      this.$store.dispatch("groups/groupTask/addTaskToGroup", {
        taskName: this.subTaskName[index],
        taskGroupId: this.group.taskGroupId,
        parentTaskId: selectedParentTask
      });
      this.subTaskName = [];
      this.overlay = false;
    },
    getTaskDueDate(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();
      // console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "Add Due Date";
      } else if (
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Today";
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
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