<template>
  <div>
    <div class="defaultBoard">
      <div class="boardTitle">
        <span>Default Board</span>
      </div>
      <div class="boardTaskList overflow-y-auto">
        <div v-for="(task, index) in projectAllTasks" :key="index">
          <div
            v-if="task.parentTask.sprintId == 'default'"
            class="boardTaskListItem boardItemPadding"
          >
            <!-- -------- load parent tasks (default board) ------------ -->

            <v-list-item @click="selectTask(task.parentTask, task); taskDialog = true ">
              <!-- @click.stop="drawer = !drawer" -->
              <v-list-item-action>
                <v-icon
                  v-if="task.parentTask.taskStatus == 'closed'"
                  size="25"
                  color="#2EC973"
                >mdi-checkbox-marked-circle</v-icon>
                <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{
                  task.parentTask.taskName
                  }}
                </v-list-item-title>
                <div
                  :class="dueDateCheck(task.parentTask)"
                >{{ getProjectDates(task.parentTask.taskDueDateAt) }}</div>
              </v-list-item-content>
              <v-list-item-avatar size="25">
                <v-img
                  v-if="task.parentTask.taskAssigneeProfileImage != null"
                  :src="task.parentTask.taskAssigneeProfileImage"
                ></v-img>
                <v-img
                  v-else
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                ></v-img>
              </v-list-item-avatar>
              <div class="boardTabLinkIcon">
                <nuxt-link
                  :to="
                    '/task/' + task.parentTask.taskId + '/?project=' + projectId
                  "
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <v-icon size="15" color="blue">mdi-link-variant</v-icon>
                </nuxt-link>
              </div>
              <div class="bluePart"></div>
            </v-list-item>
          </div>
          <!-- -------------- load child tasks (default board) ----------- -->

          <div v-for="(childTask, index) in task.childTasks" :key="index">
            <v-list-item
              v-if="childTask.sprintId == 'default'"
              class="boardTaskChildListItem"
              @click="selectTask(childTask, task);  taskDialog = true"
            >
              <!-- @click.stop="drawer = !drawer" -->
              <v-list-item-action>
                <v-icon
                  v-if="childTask.taskStatus == 'closed'"
                  size="25"
                  color="#2EC973"
                >mdi-checkbox-marked-circle</v-icon>
                <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ childTask.taskName }}</v-list-item-title>
                <div :class="dueDateCheck(childTask)">{{ getProjectDates(childTask.taskDueDateAt) }}</div>
              </v-list-item-content>
              <v-list-item-avatar size="25">
                <v-img
                  v-if="childTask.taskAssigneeProfileImage != null"
                  :src="childTask.taskAssigneeProfileImage"
                ></v-img>
                <v-img
                  v-else
                  src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                ></v-img>
              </v-list-item-avatar>
              <div class="boardTabLinkIcon">
                <nuxt-link
                  :to="'/task/' + childTask.taskId + '/?project=' + projectId"
                  style="text-decoration: none;"
                  target="_blank"
                >
                  <v-icon size="15" color="blue">mdi-link-variant</v-icon>
                </nuxt-link>
              </div>
            </v-list-item>
          </div>
        </div>
      </div>
    </div>
    <div class>
      <div class="boardBodyDiv">
        <div class="scrolling-wrapper">
          <div class="card" v-for="(projectSprint, index) in projectSprints" :key="index">
            <div class="actualBoard" v-if="projectSprint.sprintId != 'default'">
              <div class="sprintTitle">
                <div class="sprintUpdateButton">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">
                        <update-sprint
                          :projectId="projectId"
                          :sprintId="projectSprint.sprintId"
                          :sprintName="projectSprint.sprintName"
                          :description="projectSprint.sprintDescription"
                        />
                      </span>
                    </template>
                    <span>Edit sprint details</span>
                  </v-tooltip>
                </div>
                <div class="sprintTitleName">
                  <v-list-item-title>{{ projectSprint.sprintName }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{
                    projectSprint.sprintDescription
                    }}
                  </v-list-item-subtitle>
                </div>
              </div>

              <div class="boardTaskList overflow-y-auto">
                <!-- -------- load parent tasks (project boards) ------------ -->
                <div v-for="(task, index) in projectAllTasks" :key="index">
                  <div
                    v-if="task.parentTask.sprintId == projectSprint.sprintId"
                    class="boardTaskListItem"
                  >
                    <v-list-item @click="selectTask(task.parentTask, task); taskDialog = true;">
                      <!-- @click.stop="drawer = !drawer" -->
                      <v-list-item-action>
                        <v-icon
                          v-if="task.parentTask.taskStatus == 'closed'"
                          size="25"
                          color="#2EC973"
                        >mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{
                          task.parentTask.taskName
                          }}
                        </v-list-item-title>
                        <div
                          :class="dueDateCheck(task.parentTask)"
                        >{{ getProjectDates(task.parentTask.taskDueDateAt) }}</div>
                      </v-list-item-content>
                      <v-list-item-avatar size="25">
                        <v-img
                          v-if="
                            task.parentTask.taskAssigneeProfileImage != null
                          "
                          :src="task.parentTask.taskAssigneeProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        ></v-img>
                      </v-list-item-avatar>
                      <div class="boardTabLinkIcon">
                        <nuxt-link
                          :to="
                            '/task/' +
                              task.parentTask.taskId +
                              '/?project=' +
                              projectId
                          "
                          style="text-decoration: none;"
                          target="_blank"
                        >
                          <v-icon size="15" color="blue">mdi-link-variant</v-icon>
                        </nuxt-link>
                      </div>
                      <div class="bluePart"></div>
                    </v-list-item>
                  </div>
                  <!-- -------- load child tasks (project boards) ------------ -->
                  <div v-for="(childTask, index) in task.childTasks" :key="index">
                    <v-list-item
                      v-if="childTask.sprintId == projectSprint.sprintId"
                      class="boardTaskListItem"
                      @click="selectTask(childTask, task); taskDialog = true;"
                    >
                      <!-- @click.stop="drawer = !drawer" -->
                      <v-list-item-action>
                        <v-icon
                          v-if="childTask.taskStatus == 'closed'"
                          size="25"
                          color="#2EC973"
                        >mdi-checkbox-marked-circle</v-icon>
                        <v-icon v-else size="30" color="#EDF0F5">mdi-checkbox-blank-circle</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{
                          childTask.taskName
                          }}
                        </v-list-item-title>
                        <div
                          :class="dueDateCheck(childTask)"
                        >{{ getProjectDates(childTask.taskDueDateAt) }}</div>
                      </v-list-item-content>
                      <v-list-item-avatar size="25">
                        <v-img
                          v-if="childTask.taskAssigneeProfileImage != null"
                          :src="childTask.taskAssigneeProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        ></v-img>
                      </v-list-item-avatar>
                      <div class="boardTabLinkIcon">
                        <nuxt-link
                          :to="
                            '/task/' +
                              childTask.taskId +
                              '/?project=' +
                              projectId
                          "
                          style="text-decoration: none;"
                          target="_blank"
                        >
                          <v-icon size="15" color="blue">mdi-link-variant</v-icon>
                        </nuxt-link>
                      </div>
                    </v-list-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="addSprintBoard card">
            <div class="addSprintSection">
              <add-sprint :projectId="projectId" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <task-side-bar
        :task="task"
        :assignee="assignee"
        :projectId="projectId"
        :subTasks="subTasks"
        :taskFiles="taskFiles"
        :people="people"
        @listenChange="listenChange"
        @shrinkSideBar="shrinkSideBar"
      />
    </v-navigation-drawer>
    <!-- ------------ task dialog --------- -->

    <v-dialog persistent v-model="taskDialog" width="90vw" transition="dialog-bottom-transition">
      <task-dialog
        :task="task"
        :projectId="projectId"
        :taskFiles="taskFiles"
        :componentClose="componentClose"
        :taskObject="taskObject"
        @taskDialogClosing="taskDialogClosing()"
      />
    </v-dialog>
    <!-- --------------------- delete task popup --------------- -->

    <v-dialog v-model="taskDeleteDialog" max-width="380">
      <v-card>
        <div class="popupConfirmHeadline">
          <v-icon class="deletePopupIcon" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
          <br />
          <span class="alertPopupTitle">Delete Task</span>
          <br />
          <span class="alertPopupText">
            You're about to permanantly delete this task, its comments and
            attachments, and all of its data. If you're not sure, you can
            cancel this action.
          </span>
        </div>

        <div class="popupBottom">
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" width="100px" @click="taskDeleteDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
            <v-btn
              color="error"
              width="100px"
              @click="
                      taskDeleteDialog = false;
                      taskDialog = false;
                      deleteTask();
                    "
            >Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
        <!-- <div @click="close" class="allTaskPopupPlacements">
          <component v-bind:is="component" :errorMessage="errorMessage"></component>
          <success-popup />
        </div>-->
      </v-card>
    </v-dialog>

    <!-- ---------------------- end popup ------------------ -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import TaskSideBar from "~/components/tasks/taskSideBar";
import AddSprint from "~/components/projects/addSprint";
import UpdateSprint from "~/components/projects/updateSprint";
import TaskDialog from "~/components/tasks/sprintTaskDialog";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
export default {
  components: {
    "task-side-bar": TaskSideBar,
    "add-sprint": AddSprint,
    "task-dialog": TaskDialog,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "update-sprint": UpdateSprint
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      component: "",
      drawer: null,
      taskObject: {},
      taskDialog: false,
      taskDeleteDialog: false,
      task: {},
      subTasks: [],
      taskFiles: [],
      assignee: {},
      userId: this.$store.state.user.userId,
      taskSelect: null
    };
  },
  computed: {
    ...mapState({
      projectAllTasks: state => state.task.allTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      projectId: state => state.project.project.projectId,
      selectedTask: state => state.task.selectedTask
      // people: (state) => state.
    })
  },
  methods: {
    taskDialogClosing() {
      // console.log("Task Dialog Closing");
      this.taskDialog = false;
    },
    // ------- popup close ----------
    close() {
      this.component = "";
    },
    async deleteTask() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/tasks/${this.task.taskId}`,
          {
            data: {},
            headers: {
              user: this.userId,
              type: "project"
            }
          }
        );
        // this.component = 'success-popup'
        this.$emit("listenChange");
        this.$emit("shrinkSideBar");

        console.log(response.data);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
    listenChange() {
      this.$store.dispatch("task/fetchTasksAllTasks", this.projectId);
    },
    shrinkSideBar() {
      this.drawer = false;
    },
    async selectTask(task, taskObject) {
      this.taskObject = taskObject;
      // console.log("selectedTask sprint", task.sprintId);
      //  if(task.sprintId !== "default")
      this.task = task;
      this.$store.dispatch("task/setSelectedTask", task);
      // console.log("selectedTask", task);
      this.$axios
        .get(`/users/${this.task.taskAssignee}`)
        .then(async response => {
          // console.log("fetched task -->", response.data.data);
          this.assignee = response.data.data;
          //if task fetch is successful,
          let subTaskResponse;
          try {
            subTaskResponse = await this.$axios.$get(
              `/projects/${this.projectId}/tasks/${task.taskId}/subtask?userId=${this.userId}`,
              {
                headers: {
                  type: "project"
                }
              }
            );
            this.$store.dispatch("user/setSelectedTaskUser", task.taskAssignee);
            // console.log("subtasks--->", subTaskResponse.data);
            this.subTasks = subTaskResponse.data;
            //get files related to task
            let taskFilesResponse;
            try {
              taskFilesResponse = await this.$axios.$get(
                `/projects/${this.projectId}/tasks/${task.taskId}/files`,
                {
                  headers: {
                    user: this.userId,
                    type: "project"
                  }
                }
              );
              // console.log("files--->", taskFilesResponse.data);
              this.taskFiles = taskFilesResponse.data;
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
    dueDateCheck(task) {
      // console.log("check due date color", task);
      if (task.taskStatus === "closed") {
        return "boardTaskDone";
      } else if (task.taskDueDateAt == null) {
        return "boardTaskDefault";
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
          return "boardTaskOverDue";
        } else {
          return "boardTaskHealthy";
        }
      }
    },
    getProjectDates(date) {
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
        now.getMonth() - 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() - 1 === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() + 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() + 1 === dueToUtcDate.getFullYear()
      ) {
        return "Tomorrow";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10);
        return stringDate;
      }
    }
  }
};
</script>
