<template>
  <div class="projectTabContent overflow-y-auto">
    <v-container class="detailContainer">
      <v-row class="mb-12" no-gutters>
        <v-col sm="12" md="12" class="detailSection">
          <v-list-item>
            <div class="tab-projectName">{{ fetchProject.projectName }}</div>
            <v-divider class="mx-3" inset vertical></v-divider>
            <div v-if="selectedClient" class="tab-clientName">
              {{ selectedClient.organizationName }}
            </div>

            <!-- <div class="tab-status">{{ fetchProject.projectStatus }}</div> -->
            <div
              class="tab-status statusOption1"
              v-if="fetchProject.projectStatus == 'presales'"
            >
              Presales
            </div>
            <div
              class="tab-status statusOption1"
              v-if="fetchProject.projectStatus == 'presalesPD'"
            >
              Project Discovery
            </div>
            <div
              class="tab-status statusOption1"
              v-if="fetchProject.projectStatus == 'preSalesQS'"
            >
              Quotation Submission
            </div>
            <div
              class="tab-status statusOption1"
              v-if="fetchProject.projectStatus == 'preSalesN'"
            >
              Negotiation
            </div>
            <div
              class="tab-status statusOption1"
              v-if="fetchProject.projectStatus == 'preSalesC'"
            >
              Confirmed
            </div>
            <div
              class="tab-status statusOption2"
              v-if="fetchProject.projectStatus == 'preSalesL'"
            >
              Lost
            </div>
            <div
              class="tab-status statusOption3"
              v-if="fetchProject.projectStatus == 'ongoing'"
            >
              Ongoing
            </div>
            <div
              class="tab-status statusOption4"
              v-if="fetchProject.projectStatus == 'support'"
            >
              Support
            </div>
            <div
              class="tab-status statusOption5"
              v-if="fetchProject.projectStatus == 'finished'"
            >
              Finished
            </div>

            <div class="tab-health">Healthy</div>

            <div class="tab-icon">
              <v-icon
                @click.stop="drawer = !drawer"
                size="20"
                class="aaaaa"
                color="#0BAFFF"
                >mdi-pencil-outline</v-icon
              >
            </div>
          </v-list-item>

          <!-- -------------- start side bar ----------------- -->
          <div class>
            <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              right
              height="90vh"
              width="350px"
              class="overflow-y-auto"
            >
              <div>
                <form>
                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <div class="editProjectLabels">Project name*</div>
                      <input
                        maxlength="51"
                        v-model="projectName"
                        placeholder="Project name"
                        class="formElements"
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <div class="editProjectLabels">Project alias*</div>
                      <input
                        maxlength="6"
                        placeholder="Project alias"
                        class="formElements"
                        v-model="projectAlias"
                      />
                    </v-col>
                  </v-row>

                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <div class="editProjectLabels">Client*</div>
                      <!-- <input
                        v-model="clientId"
                        placeholder="client"
                        class="formElements"
                      /> -->

                      <v-autocomplete
                        style="margin-top: -15px"
                        outlined
                        class="createFormElements"
                        v-model="clientId"
                        :items="clientsArray"
                        item-text="name"
                        item-value="id"
                      >
                        <template v-slot:selection="data">
                          <template>
                            <v-list-item-avatar size="25">
                              <v-img
                                v-if="
                                  data.item.img == '' || data.item.img == null
                                "
                                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1603081854073_client.png"
                              ></v-img>
                              <v-img v-else :src="data.item.img"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                v-html="data.item.name"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                        <template v-slot:item="data">
                          <template>
                            <v-list-item-avatar>
                              <v-img
                                v-if="
                                  data.item.img == '' || data.item.img == null
                                "
                                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1603081854073_client.png"
                              ></v-img>
                              <v-img v-else :src="data.item.img"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                v-html="data.item.name"
                              ></v-list-item-title>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <!-- <input t v-model="projectStatus" placeholder="Project status" class="formElements"> -->
                      <div class="editProjectLabels">Project status*</div>
                      <select v-model="projectStatus" class="formElements">
                        <!-- <option value="" disabled>{{ this.projectStatus }}</option> -->
                        <option key="presales" value="presales">
                          Presales
                        </option>
                        <option key="presalesPD" value="presalesPD">
                          Presales : Project Discovery
                        </option>
                        <option key="preSalesQS" value="preSalesQS">
                          Presales : Quotation Submission
                        </option>
                        <option key="preSalesN" value="preSalesN">
                          Presales : Negotiation
                        </option>
                        <option key="preSalesC" value="preSalesC">
                          Presales : Confirmed
                        </option>
                        <option key="preSalesL" value="preSalesL">
                          Presales : Lost
                        </option>
                        <option key="ongoing" value="ongoing">Ongoing</option>
                        <option key="support" value="support">Support</option>
                        <option key="finished" value="finished">
                          Finished
                        </option>
                      </select>
                    </v-col>
                  </v-row>

                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <div class="editProjectLabels datesLabel">
                        Project start date
                      </div>
                      <!-- ------------------------------ -->

                      <v-list-item-group class="sideBarFormElementsForPickers">
                        <v-list-item>
                          <v-list-item-content>
                            <div
                              class="pickerContainer pickerDiv sideBarPickers datePickerNew"
                            >
                              <!-- <input type="text" v-model="projectStartDate"> -->

                              <datetime
                                type="datetime"
                                v-model="projectStartDate"
                                zone="local"
                                input-id="startDate"
                              >
                                <label for="startDate" slot="before" class>
                                  <span class="pickerNewText">Start Date</span>
                                </label>

                                <template slot="button-cancel">
                                  <fa :icon="['far', 'times']"></fa>Cancel
                                </template>
                                <template slot="button-confirm">
                                  <fa :icon="['fas', 'check-circle']"></fa>
                                  <p>Confirm</p>
                                </template>
                              </datetime>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>

                      <!-- ----------------------------- -->

                      <!-- <input type="text" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='text')" v-model="projectStartDate" placeholder="Project start date" class="formElements"> -->
                    </v-col>
                  </v-row>

                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <div class="editProjectLabels datesLabel">
                        Project end date
                      </div>

                      <v-list-item-group class="sideBarFormElementsForPickers">
                        <v-list-item>
                          <v-list-item-content>
                            <div
                              class="pickerContainer pickerDiv sideBarPickers datePickerNew"
                            >
                              <datetime
                                type="datetime"
                                v-model="projectEndDate"
                                zone="local"
                                input-id="endDate"
                              >
                                <label for="endDate" slot="before" class>
                                  <span class="pickerNewText">End Date</span>
                                </label>

                                <template slot="button-cancel">
                                  <fa :icon="['far', 'times']"></fa>Cancel
                                </template>
                                <template slot="button-confirm">
                                  <fa :icon="['fas', 'check-circle']"></fa>
                                  <p>Confirm</p>
                                </template>
                              </datetime>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                      <!-- <input type="text" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='text')" v-model="projectEndDate" placeholder="Project end date" class="formElements"> -->
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col style="padding-left: 50px !important">
                      <div class="submitButtonProjectEdit">
                        <v-list-item @click="editProject()" dark>
                          <v-list-item-action>
                            <v-icon size="20" color>mdi-plus-circle</v-icon>
                          </v-list-item-action>
                          <v-list-item-content class="buttonText">
                            <v-list-item-title class="bodyWiew"
                              >Save</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </div>

                      <div class="deleteProjectButton">
                        <v-list-item @click="projectDialog = true" dark>
                          <v-list-item-action>
                            <v-icon size="20" color
                              >mdi-trash-can-outline</v-icon
                            >
                          </v-list-item-action>
                          <v-list-item-content class="buttonText">
                            <v-list-item-title class="bodyWiew"
                              >Delete Project</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row class="mb-12 formRow projectDrawer" no-gutters>
                    <v-col sm="12" md="12">
                      <div class>
                        <!-- <input t v-model="projectStatus" placeholder="Project status" class="formElements"> -->
                        <div class="editProjectLabels">Weight type*</div>
                        <select v-model="weightType" class="formElements">
                          <!-- <option value="" disabled>{{ this.projectStatus }}</option> -->
                          <option key="story" value="story">
                            Story Points
                          </option>
                          <option key="time" value="time">Time</option>
                        </select>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col style="margin-left: 45px !important">
                      <v-btn
                        :disabled="this.updateProject.weightMeasure == ''"
                        depressed
                        height="50px"
                        class="submitButtonWeightEdit updateWeightTypeDiv text-capitalize"
                      >
                        <v-list-item @click="weightUpdateDialog = true" dark>
                          <v-list-item-action>
                            <v-icon size="20" color>mdi-alert-outline</v-icon>
                          </v-list-item-action>
                          <v-list-item-content class="buttonText">
                            <v-list-item-title class="bodyWiew"
                              >Update weight type</v-list-item-title
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-btn>
                    </v-col>
                  </v-row>
                </form>
              </div>
            </v-navigation-drawer>
          </div>

          <!-- --------------- end side bar --------------------- -->
          <!-- ----------------- Support enable Dialog ------------- -->

          <v-dialog v-model="supportDialog" max-width="380">
            <v-card>
              <v-form v-model="isValidSupport" ref="formTask">
                <div class="popupConfirmHeadline">
                  <v-icon
                    class="deletePopupIcon"
                    size="60"
                    color="deep-orange lighten-1"
                    >mdi-progress-wrench</v-icon
                  >
                  <br />
                  <span class="alertPopupTitle">Enable Support</span>
                  <br />
                  <br />
                  <span class="alertPopupText"
                    >You are going to enable support for this project.
                  </span>
                  <br />
                  <br />
                  <strong>Client details</strong>
                  <br />
                  <br />

                  <div style="" v-if="selectedClient">
                    <v-list-item>
                      <v-spacer></v-spacer>
                      <v-list-item-avatar>
                        <v-img
                          v-if="
                            selectedClient.organizationLogo == '' ||
                              selectedClient.organizationLogo == null
                          "
                          src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1603081854073_client.png"
                        ></v-img>
                        <v-img
                          v-else
                          :src="selectedClient.organizationLogo"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          class="alertPopupText"
                          v-html="selectedClient.organizationName"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <v-spacer></v-spacer>
                    </v-list-item>
                  </div>

                  <div class="alertPopupText" v-else>
                    No client added, <br />
                    Client is required to proceed.
                  </div>

                  <br />
                  <br />
                  <strong>Default User</strong>
                  <br />
                  <br />
                  <v-list-item
                    ><v-spacer></v-spacer>
                    <v-autocomplete
                      v-model="defaultAssignee"
                      :rules="assigneeRules"
                      :items="assigneeArray"
                      item-text="name"
                      item-value="id"
                      flat
                      outlined
                      dense
                      background-color="#FFFFFF"
                      label="Default Assignee"
                      hint="Person who responsible for the project"
                    >
                    </v-autocomplete
                    ><v-spacer></v-spacer
                  ></v-list-item>
                </div>

                <div class="popupBottom">
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="error"
                      class="text-capitalize"
                      depressed
                      width="100px"
                      @click="supportDialog = false"
                      >Cancel</v-btn
                    >
                    <v-spacer></v-spacer>
                    <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
                    <v-btn
                      class="text-capitalize"
                      depressed
                      color="success"
                      :disabled="!selectedClient || !isValidSupport"
                      width="100px"
                      @click="
                        supportDialog = false;
                        editProject();
                        enableSupport();
                      "
                      >Update</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </div>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- --------------------- update weight popup --------------- -->

          <v-dialog v-model="weightUpdateDialog" max-width="380">
            <v-card>
              <div class="popupConfirmHeadline">
                <v-icon
                  class="deletePopupIcon"
                  size="60"
                  color="deep-orange lighten-1"
                  >mdi-alert-outline</v-icon
                >
                <br />
                <span class="alertPopupTitle">Update weight type</span>
                <br />
                <br />
                <span class="alertPopupText"
                  >Updating project Weight type will remove already existing
                  weight allocation from all tasks of the project</span
                >
                <br />
                <br />
                <br />
                <strong>Enter project name to proceed</strong>
                <br />
                <br />
                <v-text-field
                  outlined
                  label="Enter project name"
                  v-model="projectNameConfirmation"
                ></v-text-field>
              </div>

              <div class="popupBottom">
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    class="text-capitalize"
                    depressed
                    width="100px"
                    @click="weightUpdateDialog = false"
                    >Cancel</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
                  <v-btn
                    class="text-capitalize"
                    depressed
                    color="success"
                    :disabled="checkConfirmation()"
                    width="100px"
                    @click="
                      weightUpdateDialog = false;
                      updateWeightType();
                    "
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
            </v-card>
          </v-dialog>

          <!-- ---------------------- end popup ------------------ -->
          <!-- --------------------- delete task popup --------------- -->

          <v-dialog v-model="projectDialog" max-width="380">
            <v-card>
              <div class="popupConfirmHeadline">
                <v-icon
                  class="deletePopupIcon"
                  size="60"
                  color="deep-orange lighten-1"
                  >mdi-alert-outline</v-icon
                >
                <br />
                <span class="alertPopupTitle">Delete Project</span>
                <br />
                <span class="alertPopupText">
                  You're about to permanantly delete this project, its comments
                  and attachments, and all of its data. If you're not sure, you
                  can cancel this action.
                </span>
              </div>

              <div class="popupBottom">
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    class="text-capitalize"
                    depressed
                    color="success"
                    width="100px"
                    @click="projectDialog = false"
                    >Cancel</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
                  <v-btn
                    depressed
                    class="text-capitalize"
                    color="error"
                    width="100px"
                    @click="
                      projectDialog = false;
                      deleteData();
                    "
                    >Delete</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
            </v-card>
          </v-dialog>

          <!-- ---------------------- end popup ------------------ -->

          <v-row class="mb-12" no-gutters>
            <v-col sm="6" md="6" class>
              <v-list-item>
                <div class="detailTitle">Project start date :</div>
                <div class="detailContent">
                  {{
                    this.getProjectDates(
                      fetchProject.projectStartDate,
                      'startDate'
                    )
                  }}
                </div>
              </v-list-item>
            </v-col>

            <v-col sm="6" md="6" class>
              <v-list-item class="detailList">
                <div class="detailTitle">Project end date :</div>
                <div class="detailContent">
                  {{
                    this.getProjectDates(fetchProject.projectEndDate, 'endDate')
                  }}
                </div>
              </v-list-item>
            </v-col>

            <v-col sm="6" md="6" class>
              <v-list-item>
                <div class="detailTitle">Estimated project timeline :</div>
                <div class="detailContent">{{ this.getProjectTimeLine() }}</div>
              </v-list-item>
            </v-col>

            <v-col sm="6" md="6" class>
              <v-list-item class="detailList">
                <div class="detailTitle">Actual time for now :</div>
                <div class="detailContent">
                  {{ this.getProjectTimeForNow(fetchProject.projectStartDate) }}
                </div>
              </v-list-item>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="mb-12" no-gutters>
        <v-col class="projectBox due">
          <p class="projectBoxNumber">
            {{ projectTaskCompletion.tasksDueToday }}
          </p>
          <p class="projectBoxtext">Due today</p>
          <v-icon size="30" color="white">mdi-calendar-blank</v-icon>
        </v-col>
        <v-col class="projectBox overDue">
          <p class="projectBoxNumber">
            {{ projectTaskCompletion.tasksOverDue }}
          </p>
          <p class="projectBoxtext">Overdue</p>
          <v-icon size="30" color="white">mdi-alert-octagon-outline</v-icon>
        </v-col>

        <v-col class="projectBox left">
          <p class="projectBoxNumber">{{ projectTaskCompletion.tasksLeft }}</p>
          <p class="projectBoxtext">Left</p>
          <v-icon size="30" color="white">mdi-clock-outline</v-icon>
        </v-col>

        <v-col class="projectBox assign">
          <p class="projectBoxNumber">
            {{ projectTaskCompletion.tasksAssigned }}
          </p>
          <p class="projectBoxtext">Assigned to you</p>
          <v-icon size="25" color="white">icon-user</v-icon>
        </v-col>

        <v-col class="projectBox completed">
          <p class="projectBoxNumber">
            {{ projectTaskCompletion.tasksCompleted }}
          </p>
          <p class="projectBoxtext">Completed</p>
          <v-icon size="30" color="white"
            >mdi-checkbox-marked-circle-outline</v-icon
          >
        </v-col>
      </v-row>
    </v-container>

    <div @click="close" class="popupBox">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
    </div>
    <!-- <div class="popupBox">
        <success-popup />
    </div>-->
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import SuccessPopup from '~/components/popups/successPopup';
import ErrorPopup from '~/components/popups/errorPopup';
import Progress from '~/components/popups/progress';

export default {
  components: {
    'success-popup': SuccessPopup,
    'error-popup': ErrorPopup,
    'progress-loading': Progress,
  },
  data() {
    return {
      supportDialog: false,
      isValidSupport: true,
      defaultAssignee: '',

      assigneeRules: [(value) => !!value || 'Default assignee is required!'],

      projectNameConfirmation: '',
      overlay: false,
      successMessage: '',
      errorMessage: '',
      userId: this.$store.state.user.userId,
      weightUpdateDialog: false,
      projectDialog: false,
      updateProject: {
        projectName: '',
        clientId: '',
        projectStartDate: '',
        projectEndDate: '',
        projectStatus: '',
        projectAlias: '',
        weightMeasure: '',
      },
      drawer: null,
      prName: 'project',
      items: [],
      component: '',
    };
  },
  created() {
    this.$store.dispatch(
      'clients/clients/fetchSelectedClient',
      this.fetchProject.clientId
    );
  },
  computed: {
    ...mapState({
      projectTaskCompletion: (state) => state.task.projectTaskCompletion,
      fetchProject: (state) => state.project.project,
      clients: (state) => state.clients.clients.clients,
      selectedClient: (state) => state.clients.clients.selectedClient,
      people: (state) => state.task.userCompletionTasks,
    }),
    assigneeArray() {
      let AssigneeSearchList = this.people;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.assigneeFirstName + ' ' + user.assigneeLastName,
          id: user.assigneeId,
          img: user.assigneeProfileImage,
          display: user.assigneeFirstName + user.assigneeLastName,
        });
      }
      return assigneeList;
    },
    clientsArray() {
      let clientSearchList = this.clients;
      let clientsList = [];
      for (let index = 0; index < clientSearchList.length; ++index) {
        let client = clientSearchList[index];
        clientsList.push({
          name: client.organizationName,
          id: client.organizationId,
          img: client.organizationLogo,
        });
      }
      return clientsList;
    },
    projectName: {
      get() {
        return this.fetchProject.projectName;
      },
      set(value) {
        this.updateProject.projectName = value;
      },
    },
    projectAlias: {
      get() {
        return this.fetchProject.projectAlias;
      },
      set(value) {
        this.updateProject.projectAlias = value;
      },
    },
    clientId: {
      get() {
        return this.fetchProject.clientId;
      },
      set(value) {
        this.updateProject.clientId = value;
      },
    },
    weightType: {
      get() {
        return this.fetchProject.weightMeasure;
      },
      set(value) {
        this.updateProject.weightMeasure = value;
      },
    },
    projectStartDate: {
      get() {
        let stringDate = this.fetchProject.projectStartDate + '';
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 16);
        return stringDate;
      },
      set(value) {
        const startDate = new Date(value);
        const isoDate = new Date(
          startDate.getTime() - startDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso edit Start date", isoDate);
        this.updateProject.projectStartDate = isoDate;
      },
    },
    projectEndDate: {
      get() {
        let stringDate = this.fetchProject.projectEndDate + '';
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 16);
        return stringDate;
      },
      set(value) {
        const startDate = new Date(value);
        const isoDate = new Date(
          startDate.getTime() - startDate.getTimezoneOffset() * 60000
        ).toISOString();
        // console.log("iso edit end date", isoDate);
        this.updateProject.projectEndDate = isoDate;
      },
    },
    projectStatus: {
      get() {
        return this.fetchProject.projectStatus;
      },
      set(value) {
        if (value == 'support') {
          this.supportDialog = true;
          this.drawer = false;
        }
        this.updateProject.projectStatus = value;
      },
    },
  },
  methods: {
    async enableSupport() {
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/support`,
          {
            projectId: this.fetchProject.projectId,
            defaultAssignee: this.defaultAssignee,
          },
          {
            headers: {
              userId: this.userId,
            },
          }
        );

        this.successMessage = 'Support added successfully';
        this.popup = 'success-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$refs.formTask.reset();
        this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.categoryName = '';
        this.errorMessage = e.response.data;
        this.popup = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error support adding', e);
      }
    },
    fetchClient(clientId) {
      Promise.all([
        this.$store.dispatch('clients/clients/fetchSelectedClient', clientId),
      ]).finally(() => {
        return this.selectedClient.organizationName;
      });
    },
    checkConfirmation() {
      if (this.projectNameConfirmation === this.projectName) {
        return false;
      } else {
        return true;
      }
    },
    async updateWeightType() {
      let response;
      if (this.projectNameConfirmation === this.projectName) {
        this.overlay = true;
        try {
          response = await this.$axios.$put(
            `/projects/${this.fetchProject.projectId}/weight`,
            {
              weightType: this.updateProject.weightMeasure,
            },
            {
              headers: {
                userId: this.userId,
              },
            }
          );
          this.$store.dispatch(
            'project/fetchProject',
            this.fetchProject.projectId
          );

          this.component = 'success-popup';
          this.successMessage = 'Weight type successfully updated';
          location.reload();
          setTimeout(() => {
            this.close();
          }, 3000);
          this.overlay = false;
        } catch (e) {
          console.log('Error confirmation', e);
          this.errorMessage = e.response.data;
          this.component = 'error-popup';
          setTimeout(() => {
            this.close();
          }, 3000);
          this.overlay = false;
        }
      } else {
        console.log('Error confirmation');
        this.overlay = false;
      }
      this.projectNameConfirmation = '';
    },
    updateField() {
      let projectName = this.fetchProject.projectName;
      this.updateProject.projectName = projectName;
      return '123';
    },
    async editProject() {
      this.overlay = true;
      let response;
      let startDate;
      let endDate;

      if (
        this.updateProject.projectStartDate.slice(0, -1) + '+0000' ==
        this.fetchProject.projectStartDate
      ) {
        startDate = '';
      } else {
        startDate = this.updateProject.projectStartDate;
      }

      if (
        this.updateProject.projectEndDate.slice(0, -1) + '+0000' ==
        this.fetchProject.projectEndDate
      ) {
        endDate = '';
      } else {
        endDate = this.updateProject.projectEndDate;
      }

      try {
        response = await this.$axios.$put(
          `/projects/${this.fetchProject.projectId}`,
          {
            modifierId: this.userId,
            projectName: this.updateProject.projectName,
            clientId: this.updateProject.clientId,
            projectStartDate: startDate,
            projectEndDate: endDate,
            projectStatus: this.updateProject.projectStatus,
            projectAlias: this.updateProject.projectAlias.toUpperCase(),
          }
        );
        // console.log("project edit response ----------> ", response);
        this.$store.dispatch(
          'project/fetchProject',
          this.fetchProject.projectId
        );
        if (
          this.updateProject.projectStatus === '' ||
          this.updateProject.projectStatus === this.fetchProject.projectStatus
        ) {
          // console.log("i won't fetch");
        } else {
          // console.log("i will fetch");
          this.$store.dispatch('project/fetchAllProjects');
        }
        this.component = 'success-popup';
        this.successMessage = 'Project successfully updated';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        location.reload();
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error updating a project', e);
      }
    },
    close() {
      this.component = '';
    },
    async deleteData() {
      this.overlay = true;
      // console.log(this.fetchProject.projectId);
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.fetchProject.projectId}`,
          {
            data: {},
            headers: {
              user: this.userId,
            },
          }
        );
        // location.reload();
        window.location.href = '/projects/projects';
        this.component = 'success-popup';
        this.successMessage = 'Project successfully deleted';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log(response.data);
      } catch (e) {
        this.component = 'error-popup';
        this.errorMessage = e.response.data;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error deleting project', e);
      }
    },
    getProjectDates(date, type) {
      // console.log(date);
      let stringDate = new Date(date);
      // console.log(stringDate);
      let formateedDate =
        stringDate.getFullYear() +
        '-' +
        stringDate.getMonth() +
        '-' +
        stringDate.getDate();
      // console.log("formateedDate for date", formateedDate);
      if (type === 'startDate') {
        this.startDate = formateedDate;
      } else {
        this.endDate = formateedDate;
      }
      stringDate = date + ' ';
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);
      return stringDate;
      //  return formateedDate;
    },

    getProjectTimeLine() {
      let startDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);
      let days = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10);
      let months;
      let weeks;
      if (days > 30) {
        months = Math.floor(days / 30);
        days = days % 30;
        return months + ' month(s) ' + days + ' days';
      } else if (days > 7 && days < 30) {
        weeks = Math.floor(days / 7);
        days = days % 7;
        return weeks + ' week(s) ' + days + ' days';
      } else {
        return days + ' day(s)';
      }
    },
    getProjectTimeForNow(date) {
      let now = new Date();
      let stringDate = new Date(date);
      stringDate = date + ' ';
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);
      let startDate = new Date(stringDate);
      let days = parseInt((now - startDate) / (1000 * 60 * 60 * 24), 10);
      // console.log("days", days);
      if (days < 0) return '0 Days';
      let months;
      let weeks;
      if (days > 30) {
        months = Math.floor(days / 30);
        days = days % 30;
        return months + ' month(s) ' + days + ' days';
      } else if (days > 7 && days < 30) {
        weeks = Math.floor(days / 7);
        days = days % 7;
        return weeks + ' week(s) ' + days + ' days';
      } else {
        return days + ' day(s)';
      }
    },
  },
};
</script>
