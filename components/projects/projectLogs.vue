<template>
  <div class="projectLogsSection overflow-y-auto">
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <!-- {{ this.taskLogs }} -->
            <v-text-field style="margin-bottom: -60px" solo flat v-model="taskName" hidden></v-text-field>
            <v-list-item
              v-for="(log, index) in this.projectActivityLog"
              :key="index"
              class="logItemBackground"
            >
              <v-list-item-content v-if="log.operation == 'FLAG'  && log.entityType == 'TASK'">
                <v-list-item-title>
                  <v-list-item-avatar>
                    <v-img
                      v-if="
                      log.actorProfileImage != null &&
                        log.actorProfileImage != ''
                    "
                      :src="log.actorProfileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span class="font-weight-medium">{{ log.actorFirstName }} {{ log.actorLastName }}</span>
                  <span>has deleted the task</span>
                  <span class="font-weight-medium">{{ log.entityName }}</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content v-if="log.operation == 'CREATE'  && log.entityType == 'TASK'">
                <v-list-item-title>
                  <v-list-item-avatar>
                    <v-img
                      v-if="
                      log.actorProfileImage != null &&
                        log.actorProfileImage != ''
                    "
                      :src="log.actorProfileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span class="font-weight-medium">{{ log.actorFirstName }} {{ log.actorLastName }}</span>
                  <span>has created the task</span>
                  <span class="font-weight-medium">{{ log.entityName }}</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content v-if="log.operation == 'UPDATE' && log.entityType == 'TASK'">
                <v-list-item-title>
                  <v-list-item-avatar>
                    <v-img
                      v-if="
                      log.actorProfileImage != null &&
                        log.actorProfileImage != ''
                    "
                      :src="log.actorProfileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>

                  <span class="font-weight-medium">{{ log.actorFirstName }} {{ log.actorLastName }}</span>
                  <span v-if="log.updateType == 'ASSIGNEE'">has changed the</span>
                  <span
                    v-if="log.updateType == 'FILE' && log.previousValue.displayValue != undefined"
                  >removed a</span>
                  <span
                    v-else-if="log.updateType == 'FILE' && log.updatedvalue.displayValue != undefined"
                  >uploaded a</span>
                  <span v-else>has updated the</span>
                  <span class="font-weight-medium">{{ updateTypeCheck(log.updateType) }}</span>
                  <span>of the task</span>
                  <span class="font-weight-medium">{{ log.entityName }}</span>
                </v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
                <!-- -------- for assignee ------ -->
                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'ASSIGNEE'">
                  <v-list-item-avatar size="25">
                    <v-img
                      v-if="
                      log.previousValue.profileImage != null &&
                        log.previousValue.profileImage != ''
                    "
                      :src="log.previousValue.profileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span>{{ log.previousValue.displayValue }} &nbsp; &rarr;</span>

                  <v-list-item-avatar size="25">
                    <v-img
                      v-if="
                      log.updatedvalue.profileImage != null &&
                        log.updatedvalue.profileImage != ''
                    "
                      :src="log.updatedvalue.profileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span>&nbsp; {{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>

                <!-- ------- for files -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'FILE'">
                  <a
                    style="text-decoration: none;"
                    :href="log.updatedvalue.value"
                    target="_blank"
                  >{{ log.updatedvalue.displayValue }}</a>
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  class="logSubtitle"
                  v-if="log.updateType == 'FILE'"
                >{{ log.previousValue.displayValue }}</v-list-item-subtitle>

                <!-- ------- for due date -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'DUE_DATE'">
                  <span v-if="log.previousValue.displayValue != undefined">
                    {{ getProjectDisplayDates(log.previousValue.displayValue) }}
                    &nbsp; &rarr; &nbsp;
                  </span>
                  <span
                    v-if="log.previousValue.displayValue == undefined"
                  >No Due Date &nbsp; &rarr; &nbsp;</span>

                  <span>{{ getProjectDisplayDates(log.updatedvalue.displayValue) }}</span>
                </v-list-item-subtitle>

                <!-- ------- for task note -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'TASK_NOTES'">
                  <v-row>
                    <v-col md="5" v-if="log.previousValue.displayValue !== undefined">
                      <v-textarea solo auto-grow disabled v-model="log.previousValue.displayValue"></v-textarea>
                    </v-col>
                    <v-col md="1" v-if="log.previousValue.displayValue !== undefined">&rarr;</v-col>

                    <v-col md="5">
                      <v-textarea solo auto-grow disabled v-model="log.updatedvalue.displayValue"></v-textarea>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
                <!-- ------- for task status -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'TASK_STATUS'">
                  <span>
                    {{
                    log.previousValue.displayValue.charAt(0).toUpperCase() +
                    log.previousValue.displayValue.slice(1)
                    }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>
                    {{
                    log.updatedvalue.displayValue.charAt(0).toUpperCase() +
                    log.updatedvalue.displayValue.slice(1)
                    }}
                  </span>
                </v-list-item-subtitle>

                <!-- ------- for task sprint -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'TASK_SPRINT'">
                  <span>
                    {{ log.previousValue.displayValue }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>{{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>

                <!-- ------- for task type -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'ISSUE_TYPE'">
                  <span>
                    {{
                    log.previousValue.displayValue.charAt(0).toUpperCase() +
                    log.previousValue.displayValue.slice(1)
                    }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>
                    {{
                    log.updatedvalue.displayValue.charAt(0).toUpperCase() +
                    log.updatedvalue.displayValue.slice(1)
                    }}
                  </span>
                </v-list-item-subtitle>

                <!-- ------- for task name -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'TASK_NAME'">
                  <span>
                    {{ log.previousValue.displayValue }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>{{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content v-if="log.operation == 'CREATE'  && log.entityType == 'PROJECT'">
                <v-list-item-title>
                  <v-list-item-avatar>
                    <v-img
                      v-if="
                      log.actorProfileImage != null &&
                        log.actorProfileImage != ''
                    "
                      :src="log.actorProfileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span class="font-weight-medium">{{ log.actorFirstName }} {{ log.actorLastName }}</span>
                  <span>has created the</span>
                  <span class="font-weight-medium">Project</span>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-content
                v-if="log.operation == 'UPDATE' && log.entityType == 'PROJECT'  "
              >
                <v-list-item-title>
                  <v-list-item-avatar>
                    <v-img
                      v-if="
                      log.actorProfileImage != null &&
                        log.actorProfileImage != ''
                    "
                      :src="log.actorProfileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>

                  <span class="font-weight-medium">{{ log.actorFirstName }} {{ log.actorLastName }}</span>
                  <span v-if="log.updateType == 'REMOVE_USER'">removed a</span>
                  <span v-else-if="log.updateType == 'ADD_USER'">added a</span>
                  <span
                    v-else-if="log.updateType == 'FILE' && log.previousValue.displayValue != undefined"
                  >removed a</span>
                  <span
                    v-else-if="log.updateType == 'FILE' && log.updatedvalue.displayValue != undefined"
                  >uploaded a</span>
                  <span v-else>has updated</span>
                  <span class="font-weight-medium">{{ updateProjectTypeCheck(log.updateType) }}</span>
                  <span class="font-weight-medium">{{ log.entityName }}</span>
                </v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
                <!-- -------- for project name ------ -->
                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'PROJECT_NAME'">
                  <span>{{ log.previousValue.displayValue }} &nbsp; &rarr;</span>

                  <span>&nbsp; {{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>

                <!-- ------- for add user -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'ADD_USER'">
                  <v-list-item-avatar size="25">
                    <v-img
                      v-if="
                      log.updatedvalue.profileImage != null &&
                        log.updatedvalue.profileImage != ''
                    "
                      :src="log.updatedvalue.profileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span>{{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>
                <!-- ------- for remove user -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'REMOVE_USER'">
                  <v-list-item-avatar size="25">
                    <v-img
                      v-if="
                      log.previousValue.profileImage != null &&
                        log.previousValue.profileImage != ''
                    "
                      :src="log.previousValue.profileImage"
                    ></v-img>
                    <v-img
                      v-else
                      src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <span>{{ log.previousValue.displayValue }}</span>
                </v-list-item-subtitle>
                <!-- ------- for role update -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'ROLE_UPDATE'">
                  <span v-if="log.previousValue.displayValue != undefined">
                    {{ getProjectRoles(log.previousValue.displayValue) }}
                    &nbsp; &rarr; &nbsp;
                  </span>
                  <span
                    v-if="log.previousValue.displayValue == undefined"
                  >No Due Date &nbsp; &rarr; &nbsp;</span>

                  <span>{{ getProjectRoles(log.updatedvalue.displayValue) }}</span>
                </v-list-item-subtitle>

                <!-- ------- for start date -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'START_DATE'">
                  <span v-if="log.previousValue.displayValue != undefined">
                    {{ getProjectDisplayDates(log.previousValue.displayValue) }}
                    &nbsp; &rarr; &nbsp;
                  </span>
                  <span
                    v-if="log.previousValue.displayValue == undefined"
                  >No Due Date &nbsp; &rarr; &nbsp;</span>

                  <span>{{ getProjectDisplayDates(log.updatedvalue.displayValue) }}</span>
                </v-list-item-subtitle>

                <!-- ------- for end date -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'END_DATE'">
                  <span v-if="log.previousValue.displayValue != undefined">
                    {{ getProjectDisplayDates(log.previousValue.displayValue) }}
                    &nbsp; &rarr; &nbsp;
                  </span>
                  <span
                    v-if="log.previousValue.displayValue == undefined"
                  >No Due Date &nbsp; &rarr; &nbsp;</span>

                  <span>{{ getProjectDisplayDates(log.updatedvalue.displayValue) }}</span>
                </v-list-item-subtitle>

                <!-- ------- for alias -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'PROJECT_ALIAS'">
                  <span>{{ log.previousValue.displayValue }} &nbsp; &rarr;</span>

                  <span>&nbsp; {{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>

                <!-- ------- for client -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'CLIENT'">
                  <span>{{ log.previousValue.displayValue }} &nbsp; &rarr;</span>

                  <span>&nbsp; {{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>
                <!-- ------- for task status -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'STATUS'">
                  <span>
                    {{
                    updateProjectStatus(log.previousValue.displayValue)
                    }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>
                    {{
                    updateProjectStatus(log.updatedvalue.displayValue)
                    }}
                  </span>
                </v-list-item-subtitle>

                <!-- ------- for task type -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'ISSUE_TYPE'">
                  <span>
                    {{
                    log.previousValue.displayValue.charAt(0).toUpperCase() +
                    log.previousValue.displayValue.slice(1)
                    }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>
                    {{
                    log.updatedvalue.displayValue.charAt(0).toUpperCase() +
                    log.updatedvalue.displayValue.slice(1)
                    }}
                  </span>
                </v-list-item-subtitle>

                <!-- ------- for project name -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'TASK_NAME'">
                  <span>
                    {{ log.previousValue.displayValue }}
                    &nbsp; &rarr; &nbsp;
                  </span>

                  <span>{{ log.updatedvalue.displayValue }}</span>
                </v-list-item-subtitle>

                <!-- ------- for files -------- -->

                <v-list-item-subtitle class="logSubtitle" v-if="log.updateType == 'FILE'">
                  <a
                    style="text-decoration: none;"
                    :href="log.updatedvalue.value"
                    target="_blank"
                  >{{ log.updatedvalue.displayValue }}</a>
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  class="logSubtitle"
                  v-if="log.updateType == 'FILE'"
                >{{ log.previousValue.displayValue }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <span style="color: #7A8B9F">
                  &nbsp; &nbsp;
                  {{ getProjectDisplayDates(log.actionTimestamp) }}
                </span>
              </v-list-item-action>
            </v-list-item>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination
            @input="getLogs()"
            v-model="page"
            :length="Math.ceil(this.taskLogs.activityLogCount / 10)"
            circle
            :total-visible="8"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["page"],
  data() {
    return {
      page: this.page,
      taskLogs: {}
    };
  },
  async created() {
    this.projectId = this.$route.params.projects;
  },

  methods: {
    async getLogs() {
      console.log("TRIGGERED: " + this.page);

      let taskLogResponse;
      try {
        taskLogResponse = await this.$axios.$get(
          `/activity/project/${this.projectId}?startIndex=${this.page * 10 -
            10}&endIndex=${this.page * 10}`,
          {
            headers: {
              userId: this.$store.state.user.userId
            }
          }
        );
        this.taskLogs = taskLogResponse.data;
      } catch (error) {
        console.log("Error fetching data", error);
      }
    },
    updateTypeCheck(type) {
      switch (type) {
        case "ASSIGNEE":
          return "Assignee";
          break;
        case "ISSUE_TYPE":
          return "Task Type";
          break;
        case "ISSUE_TYPE":
          return "Task Type";
          break;
        case "TASK_STATUS":
          return "Task Status";
          break;
        case "TASK_NAME":
          return "Task Name";
          break;
        case "DUE_DATE":
          return "Task Due Date";
          break;
        case "TASK_NOTES":
          return "Task Note";
          break;
        case "TASK_SPRINT":
          return "Task Sprint";
          break;

        case "FILE":
          return "Task File";
          break;
        default:
      }
    },

    getProjectRoles(role) {
      switch (role) {
        case "1":
          return "Owner";
          break;
        case "2":
          return "Admin";
          break;
        case "3":
          return "User";
          break;

        default:
      }
    },

    updateProjectStatus(status) {
      switch (status) {
        case "presales":
          return "Presales";
          break;
        case "presalesPD":
          return "Presales - Project Discovery";
          break;
        case "preSalesQS":
          return "Presales - Quotation Submission";
          break;
        case "preSalesN":
          return "Presales - Negotiation";
          break;
        case "preSalesC":
          return "Presales Confirmed";
          break;
        case "preSalesL":
          return "Presales - Lost";
          break;
        case "ongoing":
          return "Ongoing";
          break;
        case "support":
          return "Support";
          break;
        case "finished":
          return "Finished";
          break;

        default:
      }
    },

    updateProjectTypeCheck(type) {
      switch (type) {
        case "PROJECT_NAME":
          return "Project Name";
          break;
        case "PROJECT_ALIAS":
          return "Project Alias";
          break;
        case "CLIENT":
          return "Project Client";
          break;
        case "STATUS":
          return "Project Status";
          break;
        case "START_DATE":
          return "Project Start date";
          break;
        case "END_DATE":
          return "Project End Date";
          break;
        case "ADD_USER":
          return "Project User";
          break;
        case "ROLE_UPDATE":
          return "Project User Role";
          break;
        case "REMOVE_USER":
          return "Project User";
          break;
        case "FILE":
          return "Project File";
          break;

        default:
      }
    },

    getProjectDisplayDates(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();
      // console.log("Today", now.getDate(), "DueDate", dueToUtcDate.getDate());

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "Add Task Date";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(11, 16);
        return stringDate;
      }
    }
  },
  computed: {
    ...mapState({
      selectedTask: state => state.task.selectedTask,
      projectActivityLog: state => state.activityLog.activityLog
    }),
    taskName: {
      get() {
        // this.getLogs();
      },
      set(name) {}
    }
  }
};
</script>
