<template>
  <div class="projectTabContent overflow-y-auto">
    <v-row>
      <div class="minuteViewSection">
        <div class="viewMinuteBtnDiv">
          <v-btn depressed color="red" dark>View Minute</v-btn>
        </div>
      </div>
    </v-row>

    <br />
    <br />
    <!-- ------------ Start Stepper ----------- -->

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step editable :complete="e1 > 1" step="1"
          >Initiate Meeting</v-stepper-step
        >

        <v-divider></v-divider>
        <!-- :editable="this.meetingObject != null" -->
        <v-stepper-step
          :editable="this.meetingObject != null"
          :complete="e1 > 2"
          step="2"
          >Discussion Points</v-stepper-step
        >

        <v-divider></v-divider>
        <!-- :editable="this.meetingObject != null" -->
        <v-stepper-step :editable="this.meetingObject != null" step="3"
          >Close Meeting</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card flat class="mb-12">
            <v-container style="margin-top: 30px">
              <v-row style="height: 100%">
                <v-col md="12">
                  <v-form v-model="isValid" ref="mainForm">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="mainFormData.meetingDate"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="defaultRules"
                          outlined
                          dense
                          v-model="mainFormData.meetingDate"
                          label="Date"
                          prepend-inner-icon="mdi-calendar-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          style="width: 100%"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="mainFormData.meetingDate"
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(mainFormData.meetingDate)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-dialog>

                    <v-text-field
                      :rules="defaultRules"
                      v-model="mainFormData.topicForTheMeeting"
                      outlined
                      dense
                      label="Topic for the Meeting"
                    ></v-text-field>

                    <!--venue -->
                    <v-text-field
                      :rules="defaultRules"
                      v-model="mainFormData.venue"
                      outlined
                      dense
                      label="Venue"
                    ></v-text-field>

                    <!--scheduleTime -->
                    <v-dialog
                      ref="dialog1"
                      v-model="modal2"
                      :return-value.sync="mainFormData.scheduleTime"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="defaultRules"
                          outlined
                          dense
                          v-model="mainFormData.scheduleTime"
                          label="Schedule Time of Start"
                          prepend-inner-icon="mdi-clock-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="modal2"
                        v-model="mainFormData.scheduleTime"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal2 = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog1.save(mainFormData.scheduleTime)"
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>

                    <!--actualTime -->
                    <v-dialog
                      ref="dialog2"
                      v-model="modal3"
                      :return-value.sync="mainFormData.actualTime"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :rules="defaultRules"
                          outlined
                          dense
                          v-model="mainFormData.actualTime"
                          label="Actual Time of Start"
                          prepend-inner-icon="mdi-clock-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="modal3"
                        v-model="mainFormData.actualTime"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal3 = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog2.save(mainFormData.actualTime)"
                          >OK</v-btn
                        >
                      </v-time-picker>
                    </v-dialog>
                    <!--plannedDurationOfTheMeeting -->
                    <v-text-field
                      :rules="defaultRules"
                      v-model="mainFormData.plannedDurationOfTheMeeting"
                      outlined
                      dense
                      type="number"
                      label="Planned Duration of the Meeting (min)"
                    ></v-text-field>

                    <!-- <v-row>
                      <div class="minuteViewSection">
                        <div class="viewMinuteBtnDiv">
                          <v-btn
                            style="color: #FFFFFF"
                            :disabled="!isValid"
                            @click="InitiateMeeting()"
                            depressed
                            color="green"
                          >Initiate Meeting</v-btn>
                        </div>
                      </div>
                    </v-row>-->
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <v-btn
            style="color: #FFFFFF"
            :disabled="!isValid"
            @click="InitiateMeeting()"
            depressed
            color="green"
            >Initiate Meeting</v-btn
          >

          <v-btn text color="red" @click="resetForm()">Reset</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card flat class="mb-12">
            <v-row>
              <v-col>
                <span class="pointFormHeader">Add Discussion Point</span>
                <v-form v-model="isValidDiscussion" ref="discussionPointForm">
                  <v-row class="sideByRow">
                    <v-col md="3">
                      <!--discussionPoints -->
                      <v-text-field
                        v-model="discussionPointData.discussionPointCount"
                        type="number"
                        outlined
                        dense
                        clearable
                        disabled
                        label="Discussion Point"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col md="1">
                    <span style="font-size: 8px">Action by guest</span>
                  </v-col>-->
                    <v-col md="3">
                      <div style="float: right; margin-top: -10px">
                        <v-switch
                          v-model="discussionPointData.switch1"
                          label="Action by guest"
                        ></v-switch>
                      </div>
                    </v-col>
                    <v-col md="6">
                      <!--actionBy -->
                      <v-autocomplete
                        :rules="defaultRules"
                        v-if="!switch1"
                        v-model="discussionPointData.actionBy"
                        :items="userArray"
                        dense
                        item-text="name"
                        item-value="id"
                        flat
                        chips
                        small-chips
                        outlined
                        label="Action By"
                        clearable
                      ></v-autocomplete>
                      <v-text-field
                        v-else
                        v-model="discussionPointData.actionBy"
                        outlined
                        dense
                        clearable
                        label="Action By Guest (Ex: Guest1)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="sideByRow">
                    <v-col>
                      <v-dialog
                        ref="dialog"
                        v-model="modalDiscussion"
                        :return-value.sync="discussionPointData.dueDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            dense
                            v-model="discussionPointData.dueDate"
                            label="Date"
                            prepend-inner-icon="mdi-calendar-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            style="width: 100%"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="discussionPointData.dueDate"
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal2 = false"
                            >Cancel</v-btn
                          >
                          <v-btn
                            text
                            color="primary"
                            @click="
                              $refs.dialog.save(discussionPointData.dueDate)
                            "
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col>
                      <!--remarks -->
                      <v-text-field
                        v-model="discussionPointData.remarks"
                        outlined
                        dense
                        clearable
                        label="Remarks"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <vue-editor
                        placeholder="Add a description"
                        v-model="discussionPointData.description"
                      ></vue-editor>
                    </v-col>
                  </v-row>
                  <v-row v-if="!switch1">
                    <v-col md="3">
                      <div style="margin-left: 10px">
                        <v-switch
                          v-model="discussionPointData.switch2"
                          label="Convert to a task"
                        ></v-switch>
                      </div>
                    </v-col>
                    <v-col md="6" v-if="discussionPointData.switch2">
                      <div style="margin-left: 10px">
                        <!--remarks -->
                        <v-text-field
                          :rules="defaultRules"
                          v-model="discussionPointData.taskName"
                          outlined
                          dense
                          clearable
                          label="Task Name"
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-card>

          <div style="margin-top: -60px !important; margin-bottom: 50px">
            <v-btn
              :disabled="!isValidDiscussion"
              style="color: #FFFFFF"
              @click="addDiscussionPoint()"
              depressed
              color="green"
              >Add Discussion Point</v-btn
            >

            <v-btn text color="red" @click="resetDiscussionForm()">Reset</v-btn>
          </div>

          <v-divider></v-divider>

          <view-discussion />
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card flat class="mb-12">
            <v-form v-model="isValidSubForm" ref="subForm">
              <!--actualDurationOfTheMeeting -->
              <v-text-field
                :rules="defaultRules"
                v-model="mainFormData.actualDurationOfTheMeeting"
                outlined
                dense
                type="number"
                label="Actual Duration of the Meeting (min)"
              ></v-text-field>

              <v-row class="sideByRow">
                <v-col>
                  <!--chairedBy -->
                  <v-autocomplete
                    v-model="mainFormData.chairedBy"
                    return-object
                    :items="userArray"
                    dense
                    item-text="name"
                    item-value="id"
                    flat
                    chips
                    small-chips
                    outlined
                    label="Chaired By"
                    multiple
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <!--nonOrgChaired -->
                  <v-text-field
                    v-model="mainFormData.chairedByNonOrg"
                    outlined
                    dense
                    clearable
                    label="Chaired By - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="sideByRow">
                <v-col>
                  <!--attendedBy -->
                  <v-autocomplete
                    v-model="mainFormData.meetingAttendedBy"
                    return-object
                    :items="userArray"
                    dense
                    item-text="name"
                    item-value="id"
                    flat
                    chips
                    small-chips
                    outlined
                    label="Meeting Attended by"
                    multiple
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <!--nonOrgAttendees -->
                  <v-text-field
                    v-model="mainFormData.meetingAttendedByNonOrg"
                    outlined
                    clearable
                    dense
                    label="Meeting Attended by - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="sideByRow">
                <v-col>
                  <!--absent -->
                  <v-autocomplete
                    v-model="mainFormData.membersAbsent"
                    return-object
                    :items="userArray"
                    dense
                    item-text="name"
                    item-value="id"
                    flat
                    chips
                    small-chips
                    outlined
                    label="Members Absent"
                    multiple
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <!--nonOrgAbsent -->
                  <v-text-field
                    v-model="mainFormData.membersAbsentNonOrg"
                    outlined
                    clearable
                    dense
                    label="Members Absent - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="sideByRow">
                <v-col>
                  <!--additionalCopiesTo -->
                  <v-autocomplete
                    v-model="mainFormData.additionalCopiesTo"
                    :items="userArray"
                    return-object
                    dense
                    item-text="name"
                    item-value="id"
                    flat
                    chips
                    small-chips
                    outlined
                    label="Additional Copies to"
                    multiple
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <!--nonOrgCopies -->
                  <v-text-field
                    v-model="mainFormData.additionalCopiesToNonOrg"
                    outlined
                    clearable
                    dense
                    label="Additional Copies to - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="sideByRow">
                <v-col>
                  <!--preaparedBy -->
                  <v-autocomplete
                    v-model="mainFormData.minutesOfMeetingPreparedBy"
                    :items="userArray"
                    return-object
                    dense
                    item-text="name"
                    item-value="id"
                    flat
                    chips
                    small-chips
                    outlined
                    label="Minutes of Meeting Prepared by"
                    multiple
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <!--nonOrgPrepared -->
                  <v-text-field
                    v-model="mainFormData.minutesOfMeetingPreparedByNonOrg"
                    outlined
                    clearable
                    dense
                    label="Prepared by - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card>

          <v-btn
            style="color: #FFFFFF"
            :disabled="!isValidSubForm"
            @click="closeMeeting()"
            depressed
            color="green"
            >End Meeting</v-btn
          >

          <v-btn text color="red" @click="resetSubForm()">Reset</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <!-- ----------------- end Stepper ------------ -->

    <v-container>
      <div @click="close()" class="popupBox">
        <component
          v-bind:is="component"
          :successMessage="successMessage"
          :errorMessage="errorMessage"
        ></component>
        <!-- <success-popup /> -->
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SuccessPopup from '~/components/popups/successPopup';
import ErrorPopup from '~/components/popups/errorPopup';
import viewDiscussion from '~/components/meetings/viewDiscussionPoints';

export default {
  components: {
    'success-popup': SuccessPopup,
    'error-popup': ErrorPopup,
    'view-discussion': viewDiscussion,
  },
  data() {
    return {
      e1: 1,
      isValid: true,
      isValidSubForm: true,
      isValidDiscussion: true,

      errorMessage: '',
      successMessage: '',

      component: '',
      meetingObject: null,
      userId: this.$store.state.user.userId,

      dialog: false,
      menu: false,

      modal: false,
      modalDiscussion: false,

      modal2: false,
      modal3: false,

      disPointCount: 1,
      discussionPointData: {
        discussionPointCount: 1,
        actionBy: null,
        dueDate: null,
        remarks: null,
        description: '',
        switch1: false,
        switch2: false,
        taskName: null,
      },
      mainFormData: {
        meetingId: null,
        meetingDate: new Date().toISOString().substr(0, 10),
        topicForTheMeeting: null,
        scheduleTime: null,
        actualTime: null,
        plannedDurationOfTheMeeting: null,
        actualDurationOfTheMeeting: null,
        attendance: null,
        venue: null,
        chairedBy: null,
        meetingAttendedBy: null,
        membersAbsent: null,
        additionalCopiesTo: null,
        minutesOfMeetingPreparedBy: null,
        meetingAttendedByNonOrg: null,
        chairedByNonOrg: null,
        membersAbsentNonOrg: null,
        additionalCopiesToNonOrg: null,
        minutesOfMeetingPreparedByNonOrg: null,
      },
      defaultRules: [(value) => !!value || 'Required.'],
    };
  },
  methods: {
    resetForm() {
      this.$refs.mainForm.reset();
    },
    resetSubForm() {
      this.$refs.subForm.reset();
    },
    resetDiscussionForm() {
      this.$refs.discussionPointForm.reset();
      this.discussionPointData.description = '';
    },
    async taskTransition(minuteId) {
      let taskResponse;
      try {
        taskResponse = await this.$axios.$post(
          `/meeting/${this.meetingObject.data.meetingId}/discussion/${minuteId}/transition`,
          {
            projectId: this.projectId,
            taskName: this.discussionPointData.taskName,
            taskInitiator: this.userId,
            taskAssignee: this.discussionPointData.actionBy,
            taskDueDate: this.discussionPointData.dueDate,
            issueType: 'general',
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = 'success-popup';
        this.successMessage = 'Discussion point added';
        this.$store.dispatch('meetings/meeting/fetchDiscussionPoints', {
          meetingId: this.meetingObject.data.meetingId,
          // meetingId: '19a4edb0-0610-4fad-88f3-a3a01c141155',
          projectId: this.projectId,
        });
        this.$refs.discussionPointForm.reset();
        this.discussionPointData.description = '';

        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error creating task', e);
      }
      this.discussionPointData.discussionPointCount = ++this.disPointCount;
    },
    async addDiscussionPoint() {
      // this.disPointCount = ++this.disPointCount;
      let response;
      try {
        response = await this.$axios.$post(
          `/meeting/discussion`,
          {
            projectId: this.projectId,
            meetingId: this.meetingObject.data.meetingId,
            // meetingId: '19a4edb0-0610-4fad-88f3-a3a01c141155',
            description: this.discussionPointData.description,
            discussionPoint: this.disPointCount,
            remarks: this.discussionPointData.remarks,
            actionBy: this.discussionPointData.actionBy,
            actionByGuest: this.discussionPointData.switch1,
            addedBy: this.userId,
            dueDate: this.discussionPointData.dueDate,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = 'success-popup';
        this.successMessage = 'Discussion point added';
        this.$store.dispatch('meetings/meeting/fetchDiscussionPoints', {
          meetingId: this.meetingObject.data.meetingId,
          // meetingId: '19a4edb0-0610-4fad-88f3-a3a01c141155',
          projectId: this.projectId,
        });

        if (this.discussionPointData.switch2) {
          this.taskTransition(response.data.minuteId);
        } else {
          this.$refs.discussionPointForm.reset();
          this.discussionPointData.description = '';
          this.discussionPointData.discussionPointCount = ++this.disPointCount;
        }

        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error creating meeting', e);
      }
    },
    async InitiateMeeting() {
      let scheduledTime = new Date(
        this.mainFormData.meetingDate + ' ' + this.mainFormData.scheduleTime
      );
      let actualTime = new Date(
        this.mainFormData.meetingDate + ' ' + this.mainFormData.actualTime
      );

      let response;
      try {
        response = await this.$axios.$post(
          `meeting`,
          {
            projectId: this.projectId,
            meetingTopic: this.mainFormData.topicForTheMeeting,
            meetingVenue: this.mainFormData.venue,
            meetingExpectedTime: scheduledTime,
            meetingActualTime: actualTime,
            expectedDuration: this.mainFormData.plannedDurationOfTheMeeting,
            meetingAttended: [],
            meetingChaired: [],
            meetingAbsent: [],
            meetingCopiesTo: [],
            meetingPrepared: [],
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = 'success-popup';
        this.successMessage = 'Meeting Successfully initiated';
        this.e1 = 2;

        setTimeout(() => {
          this.close();
        }, 3000);
        this.meetingObject = response;
        this.$store.dispatch('meetings/meeting/fetchDiscussionPoints', {
          meetingId: this.meetingObject.data.meetingId,
          // meetingId: '19a4edb0-0610-4fad-88f3-a3a01c141155',
          projectId: this.projectId,
        });
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error creating meeting', e);
      }
    },
    async closeMeeting() {
      let meetingAttendedObject = {};
      let meetingAttended = [];
      let meetingAbsentObject = {};
      let meetingAbsent = [];
      let meetingCopiesToObject = {};
      let meetingCopiesTo = [];
      let meetingPreparedObject = {};
      let meetingPrepared = [];
      let meetingChairedObject = {};
      let meetingChaired = [];

      // ---- attended by ----
      if (
        this.mainFormData.meetingAttendedBy != null &&
        this.mainFormData.meetingAttendedBy != ''
      ) {
        for (
          let index = 0;
          index < this.mainFormData.meetingAttendedBy.length;
          ++index
        ) {
          let user = this.mainFormData.meetingAttendedBy[index];
          meetingAttended.push({
            attendeeId: user.id,
            isGuest: false,
          });
        }
      }
      if (
        this.mainFormData.meetingAttendedByNonOrg != null &&
        this.mainFormData.meetingAttendedByNonOrg != ''
      ) {
        meetingAttended.push({
          attendeeId: this.mainFormData.meetingAttendedByNonOrg,
          isGuest: true,
        });
      }

      meetingAttendedObject = {
        isUpdated: true,
        attendees: meetingAttended,
      };

      // ---- chaired by ----
      if (
        this.mainFormData.chairedBy != null &&
        this.mainFormData.chairedBy != ''
      ) {
        for (
          let index = 0;
          index < this.mainFormData.chairedBy.length;
          ++index
        ) {
          let user = this.mainFormData.chairedBy[index];
          meetingChaired.push({
            attendeeId: user.id,
            isGuest: false,
          });
        }
      }
      if (
        this.mainFormData.chairedByNonOrg != null &&
        this.mainFormData.chairedByNonOrg != ''
      ) {
        meetingChaired.push({
          attendeeId: this.mainFormData.chairedByNonOrg,
          isGuest: true,
        });
      }

      meetingChairedObject = {
        isUpdated: true,
        attendees: meetingChaired,
      };

      // ---- member absent ----
      if (
        this.mainFormData.membersAbsent != null &&
        this.mainFormData.membersAbsent != ''
      ) {
        for (
          let index = 0;
          index < this.mainFormData.membersAbsent.length;
          ++index
        ) {
          let user = this.mainFormData.membersAbsent[index];
          meetingAbsent.push({
            attendeeId: user.id,
            isGuest: false,
          });
        }
      }
      if (
        this.mainFormData.membersAbsentNonOrg != null &&
        this.mainFormData.membersAbsentNonOrg != ''
      ) {
        meetingAbsent.push({
          attendeeId: this.mainFormData.membersAbsentNonOrg,
          isGuest: true,
        });
      }

      meetingAbsentObject = {
        isUpdated: true,
        attendees: meetingAbsent,
      };

      // ---- additional copies to ----
      if (
        this.mainFormData.additionalCopiesTo != null &&
        this.mainFormData.additionalCopiesTo != ''
      ) {
        for (
          let index = 0;
          index < this.mainFormData.additionalCopiesTo.length;
          ++index
        ) {
          let user = this.mainFormData.additionalCopiesTo[index];
          meetingCopiesTo.push({
            attendeeId: user.id,
            isGuest: false,
          });
        }
      }
      if (
        this.mainFormData.additionalCopiesToNonOrg != null &&
        this.mainFormData.additionalCopiesToNonOrg != ''
      ) {
        meetingCopiesTo.push({
          attendeeId: this.mainFormData.additionalCopiesToNonOrg,
          isGuest: true,
        });
      }

      meetingCopiesToObject = {
        isUpdated: true,
        attendees: meetingCopiesTo,
      };

      // ---- prepared by ----
      if (
        this.mainFormData.minutesOfMeetingPreparedBy != null &&
        this.mainFormData.minutesOfMeetingPreparedBy != ''
      ) {
        for (
          let index = 0;
          index < this.mainFormData.minutesOfMeetingPreparedBy.length;
          ++index
        ) {
          let user = this.mainFormData.minutesOfMeetingPreparedBy[index];
          meetingPrepared.push({
            attendeeId: user.id,
            isGuest: false,
          });
        }
      }
      if (
        this.mainFormData.minutesOfMeetingPreparedByNonOrg != null &&
        this.mainFormData.minutesOfMeetingPreparedByNonOrg != ''
      ) {
        meetingPrepared.push({
          attendeeId: this.mainFormData.minutesOfMeetingPreparedByNonOrg,
          isGuest: true,
        });
      }

      meetingPreparedObject = {
        isUpdated: true,
        attendees: meetingPrepared,
      };

      let response;
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.data.meetingId}`,
          {
            projectId: this.projectId,
            actualDuration: this.mainFormData.actualDurationOfTheMeeting,
            meetingAttended: meetingAttendedObject,
            meetingChaired: meetingChairedObject,
            meetingAbsent: meetingAbsentObject,
            meetingCopiesTo: meetingCopiesToObject,
            meetingPrepared: meetingPreparedObject,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = 'success-popup';
        this.successMessage = 'Meeting Successfully closed';
        this.e1 = 1;
        setTimeout(() => {
          this.close();
        }, 3000);
        this.resetSubForm();
        this.resetForm();
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error creating meeting', e);
      }
    },
    close() {
      this.component = '';
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.user.users,
      projectId: (state) => state.project.project.projectId,
      discussionPoints: (state) => state.meetings.meeting.discussionPoints,
    }),
    // discussionPointsInput: {
    //   get() {
    //     return this.discussionPoints.length + 1;
    //   },
    //   set(value) {
    //     this.discussionPointData.discussionPointCount = value;
    //   },
    // },
    userArray() {
      let AssigneeSearchList = this.users;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.firstName + ' ' + user.lastName,
          id: user.userId,
          img: user.profileImage,
        });
      }
      return assigneeList;
    },
  },
};
</script>
