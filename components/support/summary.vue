<template>
  <div class="requestViewContentSupport overflow-y-auto">
    <v-row>
      <v-list-item-title class="summaryNameTitle">{{
        selectedSupportProject.projectName
      }}</v-list-item-title>
      <v-list-item-subtitle
        v-if="selectedClient != null && selectedClient != ''"
        :value="loadClient"
        class="summaryNameSubTitle"
        >{{ selectedClient.organizationName }}</v-list-item-subtitle
      >
    </v-row>
    <v-row class="statRow">
      <div class="projectTopSection">
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #DC8343">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 10px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#DC8343" size="17">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Total Requests</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  supportProjectStats.allRequests
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #66B25F">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 10px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#66B25F" size="17">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Requests Resolved</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  supportProjectStats.resolvedRequests
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #FFBD00">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 10px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#FFBD00" size="17">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Request Pending</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  supportProjectStats.pendingRequests
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>
    </v-row>
    <!-- <v-row class="requestRow">
      <div class="requestMessageText">
        <v-btn width="150px" color="#E07857" dark depressed>Open</v-btn>

        <v-btn width="150px" color="#E07857" dark depressed>All</v-btn>

        <v-btn width="150px" color="#E07857" dark depressed>Closed</v-btn>
      </div>
    </v-row>
    <v-row>
      <v-col md="9"><v-text-field outlined flat dense></v-text-field></v-col>
      <v-col md="3"
        ><v-btn dark depressed color="#66B25F">Add New Request</v-btn></v-col
      >
    </v-row> -->
    <v-row>
      <v-simple-table style="width:100%">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                Created
              </th>
              <th class="text-center">
                Ticket
              </th>
              <th class="text-center">
                Reporter
              </th>

              <th class="text-center">
                Status
              </th>
              <th class="text-center">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ticket, index) in projectTickets"
              :key="index"
              @click="
                selectTicket(ticket);
                viewTicketDialog = true;
              "
              style="cursor: pointer"
            >
              <td class="text-center">
                {{ getDisplayDate(ticket.ticketCreation) }}
              </td>
              <td class="text-center">{{ ticket.issueTopic }}</td>
              <td class="text-center">
                {{ ticket.reporter.firstName }} {{ ticket.reporter.lastName }}
              </td>
              <td v-if="ticket.ticketStatus == 'PENDING'" class="text-center">
                <v-icon size="12">mdi-circle-outline</v-icon>
                Pending
              </td>
              <td
                v-else-if="ticket.ticketStatus == 'ACKNOWLEDGED'"
                class="text-center"
              >
                <v-icon size="12" color="#FFBD00">mdi-circle</v-icon>
                Acknowledged by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="ticket.ticketStatus == 'CLOSED'"
                class="text-center"
              >
                <v-icon size="12" color="#66B25F">mdi-circle</v-icon>
                Closed by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="ticket.ticketStatus == 'FIXED'"
                class="text-center"
              >
                <v-icon size="12" color="#66B25F">mdi-circle</v-icon>
                Fixed by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="ticket.ticketStatus == 'SOLVED'"
                class="text-center"
              >
                <v-icon size="12" color="#66B25F">mdi-circle</v-icon>
                Solved by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="ticket.ticketStatus == 'REOPEN'"
                class="text-center"
              >
                <v-icon size="12" color="#0083E2">mdi-circle</v-icon>
                Reopened by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td class="text-center">
                {{ getDisplayDate(ticket.ticketCreation) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
    <div
      v-if="projectTickets != '' && isDetailsLoaded == false"
      class="tableLoadButton text-center"
    >
      <v-btn @click="loadMoreDetails()" color="#ffffff" depressed>
        <span style="color: #576377" class="text-capitalize">Load More</span>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>

    <!-- ---------- view ticket dialog ------------ -->

    <v-dialog
      v-model="viewTicketDialog"
      width="90vw"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#333369" flat>
          <v-toolbar-title
            >Support Request By {{ selectedTicket.reporter.firstName }}
            {{ selectedTicket.reporter.lastName }}</v-toolbar-title
          >
          <v-spacer></v-spacer>

          <v-btn icon dark @click="viewTicketDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row>
          <v-col md="6">
            <v-form v-model="isValidUpdate" ref="form">
              <v-list three-line subheader>
                <v-subheader>Request Title</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                      readonly
                      v-model="selectedIssueTopic"
                      solo
                      outlined
                      flat
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>

                <v-subheader style="margin-top: -30px">Description</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-textarea
                      readonly
                      auto-grow
                      v-model="selectedIssueDescription"
                      solo
                      outlined
                      flat
                    ></v-textarea>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-form>

            <!-- <v-divider></v-divider> -->
            <v-list v-if="getDevTickets != ''" three-line subheader>
              <v-subheader style="margin-top: -30px"
                >Related Dev Tasks</v-subheader
              >
            </v-list>

            <v-list-item
              class="devTaskList"
              v-for="(task, index) in getDevTickets"
              :key="index"
            >
              <v-list-item-action>
                <v-icon
                  v-if="task.taskStatus == 'closed'"
                  size="25"
                  color="#66B25F"
                  >mdi-checkbox-blank</v-icon
                >
                <v-icon
                  @click="closeTask(task.taskId)"
                  v-else
                  size="25"
                  color="#939393"
                  >mdi-checkbox-blank-outline</v-icon
                >
              </v-list-item-action>
              <v-list-item-action>
                <v-list-item-title style="font-weight: 700; font-size: 12px">{{
                  task.secondaryTaskId
                }}</v-list-item-title>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="font-size: 12px; margin-left: 20px">
                  {{ task.taskName }}</v-list-item-title
                ></v-list-item-content
              >
            </v-list-item>
          </v-col>
          <v-col md="6">
            <v-row style="">
              <v-col md="8">
                <v-list-item>
                  <v-list-item-action>
                    <v-subheader style="padding-bottom: 20px"
                      >Severity
                    </v-subheader>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-select
                      solo
                      readonly
                      v-model="selectedSeverity"
                      :items="severityArray"
                      item-text="name"
                      item-value="id"
                      outlined
                      flat
                      dense
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <div v-if="this.selectedTicketById.ticketStatus != 'PENDING'">
              <v-form v-model="isValidCreate" ref="formTask">
                <v-row style="">
                  <v-col>
                    <v-list-item>
                      <v-list-item-action style="width: 20% !important">
                        <v-subheader style="padding-bottom: 20px"
                          >Task Name
                        </v-subheader>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-text-field
                          :rules="taskNameRules"
                          solo
                          outlined
                          dense
                          flat
                          v-model="apendedName"
                        ></v-text-field>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="getDevTickets != ''"
                      style="margin-top: -30px !important"
                    >
                      <v-list-item-action style="width: 20% !important; ">
                        <v-subheader style="padding-bottom: 20px"
                          >Link To
                        </v-subheader>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-select
                          solo
                          v-model="selectedLinkedTo"
                          clearable
                          :items="linkTaskArray"
                          item-text="name"
                          item-value="id"
                          outlined
                          flat
                          dense
                        ></v-select>
                      </v-list-item-content>
                    </v-list-item>
                    <!-- <v-list-item style="margin-top: -30px !important">
                      <v-list-item-action style="width: 20% !important; ">
                        <v-subheader style="padding-bottom: 20px"
                          >Assignee
                        </v-subheader>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-select
                          solo
                          v-model="selectedSeverity"
                          :items="severityArray"
                          item-text="name"
                          item-value="id"
                          outlined
                          flat
                          dense
                        ></v-select>
                      </v-list-item-content>
                    </v-list-item> -->
                  </v-col>
                </v-row>

                <v-card-actions
                  style="padding-right: 20px; margin-top: -30px !important"
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!isValidCreate"
                    color="#66B25F"
                    style="color: #FFFFFF"
                    @click="createTask()"
                    solo
                    depressed
                    >Create a Task</v-btn
                  >
                </v-card-actions>
                <v-divider></v-divider>
              </v-form>
            </div>
            <v-row style="">
              <v-col>
                <v-list-item>
                  <v-list-item-action style="width: 20% !important;">
                    <v-subheader style="padding-bottom: 20px"
                      >Priority
                    </v-subheader>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-select
                      solo
                      v-model="selectedPriority"
                      :items="priorityArray"
                      item-text="name"
                      item-value="id"
                      outlined
                      flat
                      dense
                      @change="updatePriority()"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item style="margin-top: -30px !important">
                  <v-list-item-action style="width: 20% !important;">
                    <v-subheader style="padding-bottom: 20px"
                      >Status
                    </v-subheader>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-select
                      solo
                      v-model="selectedStatus"
                      :items="statusArray"
                      item-text="name"
                      item-value="id"
                      item-disabled="disable"
                      outlined
                      flat
                      dense
                      @change="updateStatus()"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row style="padding-left: 5%">
          <v-list three-line subheader>
            <v-list-item>
              <v-row style="margin-top: 10px; width: 80vw">
                <v-col>
                  <v-card
                    v-for="(ticketFile, index) in selectedTicketFiles"
                    :key="index"
                    flat
                    outlined
                    class="fileDisplaySection"
                    width="15%"
                  >
                    <div style="height: 100px;">
                      <a
                        style="text-decoration: none;"
                        :href="ticketFile.ticketFileUrl"
                        target="_blank"
                      >
                        <v-btn
                          style="position: absolute; z-index: 100; right:5px; top: 5px"
                          icon
                        >
                          <v-icon size="17" color="#9F9F9F"
                            >mdi-open-in-new</v-icon
                          >
                        </v-btn>
                      </a>
                      <v-img
                        v-if="
                          checkFileType(
                            ticketFile.ticketFileName.split('.').pop()
                          )
                        "
                        :src="ticketFile.ticketFileUrl"
                        height="100%"
                      ></v-img>

                      <v-img
                        v-else
                        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1596703345080_pngtree-file-icon-image_1128287.jpg"
                        height="100%"
                      ></v-img>
                    </div>

                    <v-list-item z- style="height: 30px !important; ">
                      <v-list-item-action style="margin-left: -10px">
                        <v-icon
                          v-if="
                            checkFileType(
                              ticketFile.ticketFileName.split('.').pop()
                            )
                          "
                          size="20"
                          color="red"
                          >mdi-image</v-icon
                        >
                        <v-icon v-else size="20" color="red"
                          >mdi-file-document</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content style="margin-left: -25px">
                        <v-list-item-subtitle class="fontRestructure12">{{
                          ticketFile.ticketFileName
                        }}</v-list-item-subtitle>
                        <v-list-item-subtitle class="fontRestructure10">
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-card-actions
                      style="height: 35px !important; margin-top: -40px"
                    >
                      <v-list-item-subtitle class="fontRestructure10">
                        {{ getFileSize(ticketFile.ticketFileSize) }}
                        kB
                      </v-list-item-subtitle>
                      <v-spacer></v-spacer>
                      <v-list-item-subtitle class="fontRestructure10">{{
                        getUploadDate(ticketFile.ticketFileDate)
                      }}</v-list-item-subtitle>
                      <v-btn icon>
                        <div class="iconBackCircleFiles">
                          <a
                            style="text-decoration: none;"
                            :href="ticketFile.ticketFileUrl"
                            target="_blank"
                            download
                          >
                            <v-icon size="20" color="#0BAFFF"
                              >mdi-download-outline</v-icon
                            >
                          </a>
                        </div>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- ------------- End ticket view dialog --------------  -->
    <div @click="close" class="updateProfilePopupDiv">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>

    <v-overlay :value="overlay" color="black" style="z-index: 1008">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Progress from '~/components/popups/progress';
import SuccessPopup from '~/components/popups/successPopup';
import ErrorPopup from '~/components/popups/errorPopup';

export default {
  components: {
    'progress-loading': Progress,
    'success-popup': SuccessPopup,
    'error-popup': ErrorPopup,
  },
  data() {
    return {
      isValidCreate: true,
      taskNameRules: [(value) => !!value || 'Task name is required!'],

      userId: this.$store.state.user.userId,
      projectId: '',
      overlay: false,
      component: '',
      errorMessage: '',
      successMessage: '',

      isValidUpdate: true,

      loadDetailsCount: 0,
      selectedTicket: {
        reporter: {
          userId: '',
          firstName: '',
          lastName: '',
          profileImage: '',
        },
        serviceAssignee: {
          userId: '',
          firstName: '',
          lastName: '',
          profileImage: '',
        },
      },
      selectedIssueTopic: '',
      selectedIssueDescription: '',
      selectedSeverity: '',
      selectedStatus: '',
      selectedPriority: '',
      selectedLinkedTo: '',
      apendedName: '',

      viewTicketDialog: false,

      severityArray: [
        { name: 'Low', id: 'LOW' },
        { name: 'Medium', id: 'MEDIUM' },
        { name: 'High', id: 'HIGH' },
        { name: 'Higher', id: 'HIGHER' },
      ],
      priorityArray: [
        { name: 'Low', id: 'LOW' },
        { name: 'Medium', id: 'MEDIUM' },
        { name: 'High', id: 'HIGH' },
        { name: 'Higher', id: 'HIGHER' },
      ],
      statusArray: [
        { name: 'Pending', id: 'PENDING', disable: true },
        { name: 'Acknowledged', id: 'ACKNOWLEDGED', disable: false },
        { name: 'Fixed', id: 'FIXED', disable: false },
        { name: 'Solved', id: 'SOLVED', disable: false },
        { name: 'Closed', id: 'CLOSED', disable: true },
        { name: 'Reopened', id: 'REOPEN', disable: true },
      ],
    };
  },
  methods: {
    async updateStatus() {
      this.overlay = true;

      let response;
      try {
        response = await this.$axios.$put(
          `/support/ticket/${this.selectedTicket.ticketId}`,
          {
            projectId: this.projectId,
            ticketStatus: this.selectedStatus,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );

        Promise.all([
          this.$store.dispatch('support/support/getTicketById', {
            projectId: this.projectId,
            ticketId: this.selectedTicket.ticketId,
          }),
          (this.loadDetailsCount = 0),
          this.$store.dispatch('support/support/emptyStore'),
          this.$store.dispatch('support/support/fetchProjectTickets', {
            projectId: this.projectId,
            startIndex: 0,
            endIndex: 10,
          }),
        ]).finally(() => {
          this.overlay = false;
        });
        this.component = 'success-popup';
        this.successMessage = 'Status successfully updated';
        setTimeout(() => {
          this.close();
        }, 3000);
        // this.overlay = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
      }
    },
    async updatePriority() {
      this.overlay = true;

      let response;
      try {
        response = await this.$axios.$put(
          `/support/ticket/${this.selectedTicket.ticketId}`,
          {
            projectId: this.projectId,
            serviceLevel: this.selectedPriority,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );

        Promise.all([
          this.$store.dispatch('support/support/getTicketById', {
            projectId: this.projectId,
            ticketId: this.selectedTicket.ticketId,
          }),
          (this.loadDetailsCount = 0),
          this.$store.dispatch('support/support/emptyStore'),
          this.$store.dispatch('support/support/fetchProjectTickets', {
            projectId: this.projectId,
            startIndex: 0,
            endIndex: 10,
          }),
        ]).finally(() => {
          this.overlay = false;
        });
        this.component = 'success-popup';
        this.successMessage = 'Priority successfully updated';
        setTimeout(() => {
          this.close();
        }, 3000);
        // this.overlay = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
      }
    },
    close() {
      this.component = '';
    },
    async linkTicket(newTaskId) {
      let response;
      try {
        response = await this.$axios.$post(
          `/support/ticket/${this.selectedTicket.ticketId}/link`,
          {
            projectId: this.projectId,
            fromLink: newTaskId,
            toLink: this.selectedLinkedTo,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error support user adding', e);
      }
    },
    async createTask() {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post(
          `support/ticket/${this.selectedTicket.ticketId}/task`,
          {
            projectId: this.projectId,
            parentTask: null,
            issueTopic: this.selectedIssueTopic + ' - ' + this.apendedName,
            issueDescription: this.selectedIssueDescription,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.successMessage = 'Task added successfully';
        this.component = 'success-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        if (this.selectedLinkedTo != '' && this.selectedLinkedTo != null) {
          this.linkTicket(response.data);
        }
        this.$refs.formTask.reset();
        this.overlay = false;
        Promise.all([
          this.$store.dispatch('support/support/getDevTasks', {
            projectId: this.projectId,
            ticketId: this.selectedTicket.ticketId,
          }),
        ]).finally(() => {});
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error support user adding', e);
      }
    },
    getFileSize(fileSize) {
      let stringSize = parseInt(fileSize / 1000);
      return stringSize;
    },
    getUploadDate(date) {
      if (date == '1970-01-01T05:30' || date == null) return 'No Due Date';
      let stringDate = date + ' ';
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);
      return stringDate;
    },
    checkFileType(type) {
      switch (type) {
        case 'png':
          return true;
          break;
        case 'jpeg':
          return true;
          break;
        case 'gif':
          return true;
          break;
        case 'svg':
          return true;
          break;
        case 'jpg':
          return true;
          break;
        default:
          return false;
      }
    },
    selectTicket(ticket) {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch('support/support/getDevTasks', {
          projectId: this.projectId,
          ticketId: ticket.ticketId,
        }),
        this.$store.dispatch('support/support/getTicketById', {
          projectId: this.projectId,
          ticketId: ticket.ticketId,
        }),

        this.$store.dispatch('support/support/getTicketFiles', {
          projectId: this.projectId,
          ticketId: ticket.ticketId,
        }),
      ]).finally(() => {
        this.selectedTicket = this.selectedTicketById;
        this.selectedIssueTopic = this.selectedTicketById.issueTopic;
        this.selectedIssueDescription = this.selectedTicketById.description;
        this.selectedSeverity = this.selectedTicketById.severity;
        this.selectedStatus = this.selectedTicketById.ticketStatus;
        this.selectedPriority = this.selectedTicketById.serviceLevel;
        this.overlay = false;
      });
    },
    loadMoreDetails() {
      this.loadDetailsCount++;
      this.overlay = true;
      Promise.all([
        this.$store.dispatch('support/support/fetchProjectTickets', {
          projectId: this.projectId,
          startIndex: this.loadDetailsCount * 10,
          endIndex: this.loadDetailsCount * 10 + 10,
        }),
      ]).finally(() => {
        this.overlay = false;
      });
    },
    getDisplayDate(date) {
      let stringDate = date + '';
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);
      return stringDate;
    },
    getDisplayStatus(status) {
      if (status === 'PENDING') {
        return 'Pending';
      } else if (status === 'ACKNOWLEDGED') {
        return 'Acknowledged';
      } else if (status === 'CLOSED') {
        return 'Closed';
      } else if (status === 'FIXED') {
        return 'Fixed';
      } else if (status === 'SOLVED') {
        return 'Solved';
      } else {
        return 'otherStatus';
      }
    },
  },
  created() {
    this.projectId = this.$route.params.support;
  },
  computed: {
    ...mapState({
      selectedSupportProject: (state) =>
        state.support.support.seletedSupportProject,
      supportProjectStats: (state) => state.support.support.supportProjectStats,

      selectedClient: (state) => state.clients.clients.selectedClient,
      projectTickets: (state) => state.support.support.projectTickets,

      isDetailsLoaded: (state) => state.support.support.isDetailsLoaded,

      selectedTicketFiles: (state) => state.support.support.selectedTicketFiles,
      selectedTicketById: (state) => state.support.support.selectedTicketById,

      getDevTickets: (state) => state.support.support.getDevTickets,
    }),
    linkTaskArray() {
      let taskSearchList = this.getDevTickets;
      let taskList = [];
      for (let index = 0; index < taskSearchList.length; ++index) {
        let task = taskSearchList[index];
        taskList.push({
          name: task.taskName,
          id: task.taskId,
          secondaryId: task.secondaryTaskId,
        });
      }
      return taskList;
    },
    loadClient() {},
  },
};
</script>
