<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <!-- {{ this.taskLogs }} -->
          <v-text-field style="margin-bottom: -60px" solo flat v-model="taskName" hidden></v-text-field>
          <v-list-item
            v-for="(log, index) in this.taskActivityLog.activityLogList"
            :key="index"
            class="logItemBackground"
          >
            <v-list-item-content v-if="log.operation == 'CREATE'">
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
                <span class="font-weight-medium">Task</span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content v-if="log.operation == 'UPDATE'">
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
                <span>has updated the</span>
                <span class="font-weight-medium">{{ updateTypeCheck(log.updateType) }}</span>
              </v-list-item-title>
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
                Uploaded file:
                <a
                  style="text-decoration: none;"
                  :href="log.updatedvalue.value"
                  target="_blank"
                >{{ log.updatedvalue.displayValue }}</a>
              </v-list-item-subtitle>

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
          :length="Math.ceil(this.taskActivityLog.activityLogCount / 10)"
          circle
          :total-visible="8"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["page"],
  data() {
    return {
      page: this.page
      // taskLogs: {},
    };
  },

  methods: {
    async getLogs() {
      console.log("TRIGGERED: " + this.page);

      this.$store.dispatch("activityLog/fetchTaskActivityLog", {
        taskId: this.selectedTask.taskId,
        startIndex: this.page * 10 - 10,
        endIndex: this.page * 10
      });

      // let taskLogResponse;
      // try {
      //   taskLogResponse = await this.$axios.$get(
      //     `/activity/task/${this.selectedTask.taskId}?startIndex=${this.page *
      //       10 -
      //       10}&endIndex=${this.page * 10}`,
      //     {
      //       headers: {
      //         userId: this.selectedTask.taskAssignee,
      //       },
      //     }
      //   );
      //   this.taskLogs = taskLogResponse.data;
      // } catch (error) {
      //   console.log('Error fetching data', error);
      // }
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
        case "FILE":
          return "Task File";
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
      taskActivityLog: state => state.activityLog.activityLog
    }),
    taskName: {
      get() {
        this.getLogs();
      },
      set(name) {}
    }
  }
};
</script>
