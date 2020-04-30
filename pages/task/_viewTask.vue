<template>
  <div class="top-nav">
    <navigation-drawer :user="user" :currentUser="currentUser" />
    <v-toolbar app color dark fixed class="tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Task</v-list-item-title>
            </v-list-item-content>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
        <div class="content-div">
          <v-list-item-title class="font-weight-bold">{{this.taskId}}</v-list-item-title>
          <v-list-item-title class="font-weight-bold">{{this.task.taskAssignee}}</v-list-item-title>

        </div>
      </div>
    </v-toolbar>
    <div class="viewTaskContent overflow-y-auto">
      <div class="taskRestFormDiv">
        <form>
          <v-row class="mb-12 formRowSpec" no-gutters>
            <v-col sm="2" md="2">
              <div class="taskViewTitle">
                Task -
                <span>#42</span>
              </div>
            </v-col>
            <v-col sm="2" md="2">
              <!-- <v-select label="Task status" dense dark background-color="#0BAFFF" solo></v-select> -->
              <div class="taskStatusDropdown">
                <select v-model="taskStatus" class="viewTaskStatusDropDown" :class="statusCheck()">
                  <option key="pending" value="pending">Pending</option>
                  <option key="implementing" value="implementing">Implementing</option>
                  <option key="qa" value="qa">QA</option>
                  <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                  <option key="reOpened" value="reOpened">Re-Opened</option>
                  <option key="deployed" value="deployed">Deployed</option>
                  <option key="closed" value="closed">Closed</option>
                </select>
              </div>
            </v-col>
            <v-col sm="8" md="8" class="taskViewLinksDiv">
              <a
                style="text-decoration: none;"
                :href="'http://localhost:3000/projects/'+ this.projectId"
              >Project Link</a>
              /
              <a href>Parent task link</a>
              /
              <a
                style="text-decoration: none;"
                :href="'http://localhost:3000/task/'+ this.taskId + '/?project=' + this.projectId"
              >Task link</a>
            </v-col>
          </v-row>
          <v-row class="mb-12" no-gutters>
            <v-col sm="12" md="12" class="formRowNameRange">
              <v-row class="mb-12" no-gutters>
                <v-col sm="11" md="11">
                  <input
                    type="text"
                    placeholder="Test task name"
                    class="viewTaskTitle"
                    v-model="taskName"
                  />
                </v-col>
                <v-col sm="1" md="1" class="taskEditIconCol">
                  <v-icon
                    size="25"
                    color="#424F64"
                    class="editIcon"
                    @click="EditTaskName"
                  >mdi-pencil-circle</v-icon>
                </v-col>
              </v-row>
              <v-divider class="nameRangeDevider"></v-divider>
            </v-col>
          </v-row>

          <!-- --------------- body row ------------ -->
          <div class="formRowTaskDetailsBody">
            <v-row class="mb-12" no-gutters>
              <v-col sm="8" md="8">
                <div class="leftSideColumn">
                  <div class="expansionViewHeader topItemTaskView">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Parent Task</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListContent">
                        <v-list-item @click.stop="drawer = !drawer">
                          <v-list-item-action>
                            <v-icon size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                            <!-- <v-icon v-else size="30" color="#EDF0F5"
                        >mdi-checkbox-blank-circle</v-icon
                            >-->
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>this is the parent task</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-list-item-sub-title>12/12/2010</v-list-item-sub-title>
                          </v-list-item-action>
                          <v-list-item-avatar size="25">
                            <!-- <v-img
                        v-if="task.taskAssigneeProfileImage != null"
                        :src="task.taskAssigneeProfileImage"
                            ></v-img>-->
                            <v-img
                              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                            ></v-img>
                          </v-list-item-avatar>
                        </v-list-item>
                      </div>
                      <!-- --------------- -->
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>
                  <div class="expansionViewHeader">
                    <v-list-group>
                      <template v-slot:activator>
                        <v-list-item-icon>
                          <v-icon size="30" color="#2EC973">mdi-package-variant-closed</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="viewTaskFontColors">
                          Child Tasks
                          <span>(4 tasks)</span>
                        </v-list-item-title>
                      </template>

                      <v-list-item-content class="parentChildTaskList">
                        <!-- ---------- task list --------- -->
                        <div class="taskViewTaskListContent">
                          <v-list-item @click.stop="drawer = !drawer">
                            <v-list-item-action>
                              <v-icon size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                              <!-- <v-icon v-else size="30" color="#EDF0F5"
                        >mdi-checkbox-blank-circle</v-icon
                              >-->
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>this is the child task</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-sub-title>12/12/2010</v-list-item-sub-title>
                            </v-list-item-action>
                            <v-list-item-avatar size="25">
                              <!-- <v-img
                        v-if="task.taskAssigneeProfileImage != null"
                        :src="task.taskAssigneeProfileImage"
                              ></v-img>-->
                              <v-img
                                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                              ></v-img>
                            </v-list-item-avatar>
                          </v-list-item>
                        </div>
                        <!-- --------------- -->
                        <!-- ---------- task list --------- -->
                        <div class="taskViewTaskListContent">
                          <v-list-item @click.stop="drawer = !drawer">
                            <v-list-item-action>
                              <v-icon size="25" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                              <!-- <v-icon v-else size="30" color="#EDF0F5"
                        >mdi-checkbox-blank-circle</v-icon
                              >-->
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>this is the child task</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-sub-title>12/12/2010</v-list-item-sub-title>
                            </v-list-item-action>
                            <v-list-item-avatar size="25">
                              <!-- <v-img
                        v-if="task.taskAssigneeProfileImage != null"
                        :src="task.taskAssigneeProfileImage"
                              ></v-img>-->
                              <v-img
                                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                              ></v-img>
                            </v-list-item-avatar>
                          </v-list-item>
                        </div>
                        <!-- --------------- -->
                      </v-list-item-content>
                    </v-list-group>
                  </div>
                  <v-divider></v-divider>
                  <!-- -------------- task type section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#0BAFFF">mdi-checkbox-multiple-blank-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Task type</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="6" md="6">
                            <v-select
                              dense
                              v-model="issueType"
                              :items="issueTypes"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task type"
                              outlined
                              class="createFormElements"
                            ></v-select>
                          </v-col>
                          <v-col sm="6" md="6">
                            <v-select
                              dense
                              v-model="taskStatus"
                              :items="taskStatuses"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Task status"
                              outlined
                              class="createFormElements"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </div>
                      <!-- --------------- -->
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>

                  <!-- -------------- project board section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#6FCD17">mdi-animation-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Board</v-list-item-title>
                    </v-list-item>
                    <v-list-item-content class="parentChildTaskList">
                      <!-- ---------- task list --------- -->
                      <div class="taskViewTaskListPadding">
                        <v-row class="mb-12" no-gutters>
                          <v-col sm="12" md="12">
                            <v-select
                              dense
                              v-model="selectedSprint"
                              :items="getAllSprints()"
                              background-color="#EDF0F5"
                              item-text="name"
                              item-value="id"
                              label="Board"
                              outlined
                              class="createFormElements"
                              
                            ></v-select>
                          </v-col>
                        </v-row>
                      </div>
                      <!-- --------------- -->
                    </v-list-item-content>
                  </div>
                  <v-divider></v-divider>
                  <!-- -------------- notes section ------------- -->
                  <div class="expansionViewHeader">
                    <v-list-item class="taskViewTitleSection">
                      <v-list-item-icon>
                        <v-icon size="30" color="#FF6767">mdi-file-document-edit-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="viewTaskFontColors">Notes</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="subItem noteSubItem">
                          <v-textarea
                            name="input-7-4"
                            auto-grow
                            clearable
                            outlined
                            v-model="taskNote"
                          ></v-textarea>
                        </v-list-item-title>
                        <div class="noteUpdateButton">
                          <v-btn class="ma-2" small rounded depressed color="#0BAFFF" dark>
                            <v-icon left>mdi-pencil</v-icon>Update note
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-col>
              <!-- ------------------ right side column ------------- -->
              <v-col sm="4" md="4">
                <div class="rightSideColumn">
                  <!-- --------- assignee section ---------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#02C1D4">mdi-account-arrow-left-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Task Assignee</v-list-item-subtitle>
                      <v-list-item-title>
                        <select v-model="taskAssignee" class="rightColumnItemsText">
                          <!-- <option>Naveen Perera</option> -->
                          <option value disabled>{{ this.task.taskAssignee }}</option>
                          <option
                            class="tabListItemsText"
                            v-for="(taskAssignee, index) in peopleList"
                            :key="index"
                            :value="taskAssignee.assigneeId"
                          >
                            {{ taskAssignee.assigneeFirstName }}
                            {{ taskAssignee.assigneeLastName }}
                          </option>
                        </select>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- ----------- Due date section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#7CDD00">mdi-calendar-blank-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Due Date</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <div class="viewTaskPickerDiv">
                    <VueCtkDateTimePicker
                      color="#3f51b5"
                      id="duePicker"
                      class
                      v-model="taskDueDate"
                      label="Add due date"
                      right
                    />
                  </div>
                  <!-- ----------- Reminder date section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#7CDD00">mdi-clock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-subtitle class="rightColumnItemsSubTitle">Remind Date</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <div class="viewTaskPickerDiv">
                    <VueCtkDateTimePicker
                      color="#3f51b5"
                      id="duePicker"
                      class
                      v-model="taskRemindOnDate"
                      label="Add remind date"
                      right
                    />
                  </div>
                  <v-divider class="datePickerDivider"></v-divider>
                  <!-- ----------- Files section --------- -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon size="35" color="#FFAE4F">mdi-paperclip</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="rightColumnItemsTitle">Files</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <div class="viewTaskPickerDiv">
                    <v-file-input
                      label="Upload files"
                      v-model="files"
                      outlined
                      prepend-inner-icon="mdi-upload-outline"
                      prepend-icon
                      class
                      chips
                      multiple
                      dense
                    ></v-file-input>
                  </div>
                  <div class="viewTaskPickerDiv">
                    <div class="fileUploadButton taskViewFileUploadButton">
                      <v-btn class="ma-2" x-small rounded depressed color="#0BAFFF" dark>
                        <v-icon left>mdi-upload</v-icon>Upload
                      </v-btn>
                      <v-progress-circular
                        v-if="uploadLoading == true"
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                    </div>
                  </div>
                  <!-- ------------- file viewer ------------ -->
                  <div class="filesViewDiv">
                    
                    <v-list-item v-for="(file, index) in fileList" :key="index">
                      <v-list-item-action>
                        <v-icon size="30">mdi-file-document-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">{{file.taskFileName}}</v-list-item-title>
                        <v-list-item-subtitle class="fileSubTitles">125.54kB</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title class="fileTitles">{{taskUser}}</v-list-item-title>

                        <v-list-item-subtitle class="fileSubTitles">{{file.taskFileDate}}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-icon size="25" color="#FF6161">mdi-delete-circle</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </form>
      </div>
    </div>

    <div class="RestTaskLogDiv">
      <div class="RestTaskLogTitle">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">Task Log</v-list-item-title>
        </v-list-item-content>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import NavigationDrawer from "~/components/navigationDrawer";
export default {
  components: {
    NavigationDrawer
  },
  data() {
    return {
      taskId: "",
      projectId: "",
      userId: "",
      sprints: [],
      editTask: true,
      task: {},
      updatedTask: {},
      issueTypes: ["development", "qa", "bug", "operational"],
      taskStatuses: ["open", "pending", "closed"],
      allSprints: [{ sprintId: "default", sprintName: "Default" }]
    };
  },
  async created() {
    this.taskId = this.$route.params.viewTask;
    this.projectId = this.$route.query.project;
    this.userId = this.$store.state.user.userId;

    let taskResponse;
    try {
      taskResponse = await this.$axios.$get(
        `/projects/${this.$route.query.project}/tasks/${this.$route.params.viewTask}`,
        {
          headers: {
            user: this.userId,
            type: "project"
          }
        }
      );
      this.task = taskResponse.data;
      console.log("group get response", this.task);
    } catch (e) {
      console.log("Error fetching groups", e);
    }
  },
  methods: {
    isTaskAssignee(taskAssignee) {
      if (taskAssignee.assigneeId == this.task.taskAssignee) {
        return true;
      } else {
        return false;
      }
    },
    statusCheck() {
      return "pendingStatus";
    },
    EditTaskName() {
      this.editTask = false;
    },
    getAllSprints() {
      console.log("lenght", this.projectSprints.length);
      if (this.projectSprints.length != 0) {
        let sprints = this.projectSprints;
        let sprintList = [];
        for (let index = 0; index < sprints.length; ++index) {
          let sprint = sprints[index];
          sprintList.push({
            name: sprint.sprintName,
            id: sprint.sprintId
          });
        }
        return sprintList;
      } else {
        this.$store.dispatch(
          "sprints/sprint/fetchAllProjectSprints",
          this.$route.query.project
        );
        return [];
      }
    }
  },
  computed: {
    ...mapState({
      selectedTaskUser: state => state.user.selectedTaskUser,
      people: state => state.task.userCompletionTasks,
      projectSprints: state => state.sprints.sprint.sprints,
      taskFiles: state => state.task.taskFiles
    }),
    ...mapGetters(["getuserCompletionTasks"]),

    taskUser() {
      if (Object.keys(this.selectedTaskUser).length === 0) {
        this.$store.dispatch(
          "user/setSelectedTaskUser",
          this.task.taskAssignee
        );
        return "";
      } else {
        return (
          this.selectedTaskUser.firstName + " " + this.selectedTaskUser.lastName
        );
      }
    },

    peopleList() {
      console.log("people list", this.people);
      if (this.people.length == 0) {
        this.$store.dispatch(
          "task/fetchProjectUserCompletionTasks",
          this.$route.query.project
        );
      } else {
        return this.people;
      }
    },

    fileList() {
      console.log("file List!", this.taskFiles);
      if (this.taskFiles.length == 0) {
        console.log("dispatched!");
        this.$store.dispatch("task/fetchTaskFiles", {
          projectId: this.$route.query.project,
          taskId: this.task.taskId
        });
      } else {
        console.log("not dispatched!");

        return this.taskFiles;
      }
    },

    taskName: {
      get() {
        return this.task.taskName;
      },
      set(name) {
        this.updatedTask.taskName = name;
      }
    },
    taskStatus: {
      get() {
        return this.task.taskStatus;
      },
      set(value) {
        this.updatedTask.taskStatus = value;
      }
    },
    issueType: {
      get() {
        return this.task.issueType;
      },
      set(value) {
        this.updatedTask.issueType = value;
      }
    },
    // selectedSprint: {
    //   get() {
    //     return this.task.sprintId;
    //   },
    //   set(value) {
    //     this.updatedTask.sprintId = value;
    //   }
    // },
    taskNote: {
      get() {
        return this.task.taskNote;
      },
      set(value) {
        this.updatedTask.taskNote = value;
      }
    },
    taskDueDate: {
      get() {
        return this.task.taskDueDateAt;
      },
      set(value) {
        console.log("updated task due ->", value);
        this.updatedTask.taskDueDateAt = value;
      }
    },
    taskRemindOnDate: {
      get() {
        return this.task.taskReminderAt;
      },
      set(value) {
        console.log("updated remind on ->", value);
        this.updatedTask.taskReminderAt = value;
      }
    }
  }
};
</script>