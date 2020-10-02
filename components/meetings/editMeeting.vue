<template>
  <v-card color="#FFFFFF" height="90vh">
    <div
      id="meetingEditDiv"
      style="height: 80vh; padding-bottom: 300px"
      class="overflow-y-auto"
    >
      <v-card-text>
        <span>Meeting Details</span>
        <v-row style="height: 100%">
          <v-col md="12">
            <v-form v-model="isValid" ref="mainForm">
              <v-dialog
                ref="dialogDate"
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
                <v-date-picker v-model="mainFormData.meetingDate" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    text
                    color="primary"
                    @click="
                      $refs.dialogDate.save(mainFormData.meetingDate);
                      modal = false;
                      updateDate();
                    "
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
                hint="Update and hit enter"
                @keyup.enter="updateTopic()"
              ></v-text-field>

              <!--venue -->
              <v-text-field
                :rules="defaultRules"
                v-model="mainFormData.venue"
                outlined
                dense
                label="Venue"
                hint="Update and hit enter"
                @keyup.enter="updateVenu()"
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
                    @click="
                      $refs.dialog1.save(mainFormData.scheduleTime);
                      updateDate();
                    "
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
                    @click="
                      $refs.dialog2.save(mainFormData.actualTime);
                      updateDate();
                    "
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
                hint="Update and hit enter"
                @keyup.enter="updatePlannedDuration()"
              ></v-text-field>

              <v-text-field
                :rules="defaultRules"
                v-model="mainFormData.actualDurationOfTheMeeting"
                outlined
                dense
                type="number"
                label="Actual Duration of the Meeting (min)"
                hint="Update and hit enter"
                @keyup.enter="updateActualDuration()"
              ></v-text-field>
              <br /><br />
              <v-divider></v-divider>
              <br /><br />

              <span>Member Details</span>

              <v-row class="sideByRow">
                <v-col>
                  <!--chairedBy -->
                  <v-autocomplete
                    v-model="chairedBy"
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
                    v-model="chairedByNonOrg"
                    outlined
                    dense
                    label="Chaired By - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="sideByRow">
                <v-col>
                  <!--attendedBy -->
                  <v-autocomplete
                    v-model="meetingAttendedBy"
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
                    v-model="meetingAttendedByNonOrg"
                    outlined
                    dense
                    label="Meeting Attended by - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="sideByRow">
                <v-col>
                  <!--absent -->
                  <v-autocomplete
                    v-model="membersAbsent"
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
                    v-model="membersAbsentNonOrg"
                    outlined
                    dense
                    label="Members Absent - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="sideByRow">
                <v-col>
                  <!--additionalCopiesTo -->
                  <v-autocomplete
                    v-model="additionalCopiesTo"
                    :items="userArray"
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
                    v-model="additionalCopiesToNonOrg"
                    outlined
                    dense
                    label="Additional Copies to - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="sideByRow">
                <v-col>
                  <!--preaparedBy -->
                  <v-autocomplete
                    v-model="minutesOfMeetingPreparedBy"
                    :items="userArray"
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
                    v-model="minutesOfMeetingPreparedByNonOrg"
                    outlined
                    dense
                    label="Prepared by - Non Org (Ex: Member 1, Member 2)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-btn @click="updatePeople()" depressed color="green" dark
          >Update Member Details</v-btn
        >
      </v-card-text>
    </div>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" text> Close </v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
    </v-card-actions>
    <div @click="close()" class="popupBoxMeetig">
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
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";

export default {
  props: ["meetingObject"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      component: "",
      overlay: false,

      modal: false,
      modalDiscussion: false,

      userId: this.$store.state.user.userId,

      modal2: false,
      modal3: false,
      mainFormData: {
        meetingId: null,
        meetingDate: this.meetingObject.meetingActualTime.substr(0, 10),
        topicForTheMeeting: this.meetingObject.meetingTopic,
        scheduleTime: this.meetingObject.meetingExpectedTime.slice(11, 16),
        actualTime: this.meetingObject.meetingActualTime.slice(11, 16),
        plannedDurationOfTheMeeting: this.meetingObject.expectedDuration,
        actualDurationOfTheMeeting: this.meetingObject.actualDuration,
        attendance: null,
        venue: this.meetingObject.meetingVenue,
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
      defaultRules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    close() {
      this.component = "";
    },
    // ---------- update meeting ---------

    async updatePeople() {
      let meetingChairedObject = {};
      let meetingChaired = [];
      let isChairUpdate = false;

      let meetingAttendedObject = {};
      let meetingAttended = [];
      let isAttendedUpdate = false;

      let meetingAbsentObject = {};
      let meetingAbsent = [];
      let isAbsentUpdate = false;

      let meetingCopiesToObject = {};
      let meetingCopiesTo = [];
      let isCopiesToUpdate = false;

      let meetingPreparedObject = {};
      let meetingPrepared = [];
      let isPreparedUpdate = false;

      // ---- chaired by ----

      let chairedBy = [];
      let chairedByNonOrg = "";
      if (this.selectedMeeting.meeting.meetingChaired.length != 0) {
        for (
          let index = 0;
          index < this.selectedMeeting.meeting.meetingChaired.length;
          ++index
        ) {
          let user = this.selectedMeeting.meeting.meetingChaired[index];
          if (user.guest !== true) {
            chairedBy.push({
              attendeeId: user.attendeeId,
              isGuest: false,
            });
          } else {
            chairedByNonOrg = {
              attendeeId: user.attendeeId,
              isGuest: true,
            };
          }
        }
      }

      if (
        this.mainFormData.chairedBy != null &&
        this.mainFormData.chairedByNonOrg == null
      ) {
        isChairUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.chairedBy.length;
          ++index
        ) {
          let user = this.mainFormData.chairedBy[index];
          meetingChaired.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (chairedByNonOrg != "") {
          meetingChaired.push(chairedByNonOrg);
        }
        meetingChairedObject = {
          isUpdated: isChairUpdate,
          attendees: meetingChaired,
        };
      } else if (
        this.mainFormData.chairedBy == null &&
        this.mainFormData.chairedByNonOrg != null
      ) {
        isChairUpdate = true;

        if (chairedBy != []) {
          meetingChaired = chairedBy;
        }

        if (this.mainFormData.chairedByNonOrg != "") {
          meetingChaired.push({
            attendeeId: this.mainFormData.chairedByNonOrg,
            isGuest: true,
          });
        }
        meetingChairedObject = {
          isUpdated: isChairUpdate,
          attendees: meetingChaired,
        };
      } else if (
        this.mainFormData.chairedBy != null &&
        this.mainFormData.chairedByNonOrg != null
      ) {
        isChairUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.chairedBy.length;
          ++index
        ) {
          let user = this.mainFormData.chairedBy[index];
          meetingChaired.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (this.mainFormData.chairedByNonOrg != "") {
          meetingChaired.push({
            attendeeId: this.mainFormData.chairedByNonOrg,
            isGuest: true,
          });
        }

        meetingChairedObject = {
          isUpdated: isChairUpdate,
          attendees: meetingChaired,
        };
      } else {
        meetingChairedObject = {
          isUpdated: false,
          attendees: meetingChaired,
        };
      }

      // ---- attended by ----

      let attendedBy = [];
      let attendedByNonOrg = "";
      if (this.selectedMeeting.meeting.meetingAttended.length != 0) {
        for (
          let index = 0;
          index < this.selectedMeeting.meeting.meetingAttended.length;
          ++index
        ) {
          let user = this.selectedMeeting.meeting.meetingAttended[index];
          if (user.guest !== true) {
            attendedBy.push({
              attendeeId: user.attendeeId,
              isGuest: false,
            });
          } else {
            attendedByNonOrg = {
              attendeeId: user.attendeeId,
              isGuest: true,
            };
          }
        }
      }

      if (
        this.mainFormData.meetingAttendedBy != null &&
        this.mainFormData.meetingAttendedByNonOrg == null
      ) {
        isAttendedUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.meetingAttendedBy.length;
          ++index
        ) {
          let user = this.mainFormData.meetingAttendedBy[index];
          meetingAttended.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (attendedByNonOrg != "") {
          meetingAttended.push(attendedByNonOrg);
        }
        meetingAttendedObject = {
          isUpdated: isAttendedUpdate,
          attendees: meetingAttended,
        };
      } else if (
        this.mainFormData.meetingAttendedBy == null &&
        this.mainFormData.meetingAttendedByNonOrg != null
      ) {
        isAttendedUpdate = true;

        if (attendedBy != []) {
          meetingAttended = attendedBy;
        }

        if (this.mainFormData.meetingAttendedByNonOrg != "") {
          meetingAttended.push({
            attendeeId: this.mainFormData.meetingAttendedByNonOrg,
            isGuest: true,
          });
        }
        meetingAttendedObject = {
          isUpdated: isAttendedUpdate,
          attendees: meetingAttended,
        };
      } else if (
        this.mainFormData.meetingAttendedBy != null &&
        this.mainFormData.meetingAttendedByNonOrg != null
      ) {
        isAttendedUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.meetingAttendedBy.length;
          ++index
        ) {
          let user = this.mainFormData.meetingAttendedBy[index];
          meetingAttended.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (this.mainFormData.meetingAttendedByNonOrg != "") {
          meetingAttended.push({
            attendeeId: this.mainFormData.meetingAttendedByNonOrg,
            isGuest: true,
          });
        }

        meetingAttendedObject = {
          isUpdated: isAttendedUpdate,
          attendees: meetingAttended,
        };
      } else {
        meetingAttendedObject = {
          isUpdated: false,
          attendees: meetingAttended,
        };
      }

      // ---- meeting absent ----

      let absentBy = [];
      let absentByNonOrg = "";
      if (this.selectedMeeting.meeting.meetingAbsent.length != 0) {
        for (
          let index = 0;
          index < this.selectedMeeting.meeting.meetingAbsent.length;
          ++index
        ) {
          let user = this.selectedMeeting.meeting.meetingAbsent[index];
          if (user.guest !== true) {
            absentBy.push({
              attendeeId: user.attendeeId,
              isGuest: false,
            });
          } else {
            absentByNonOrg = {
              attendeeId: user.attendeeId,
              isGuest: true,
            };
          }
        }
      }

      if (
        this.mainFormData.membersAbsent != null &&
        this.mainFormData.membersAbsentNonOrg == null
      ) {
        isAbsentUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.membersAbsent.length;
          ++index
        ) {
          let user = this.mainFormData.membersAbsent[index];
          meetingAbsent.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (absentByNonOrg != "") {
          meetingAbsent.push(absentByNonOrg);
        }
        meetingAbsentObject = {
          isUpdated: isAbsentUpdate,
          attendees: meetingAbsent,
        };
      } else if (
        this.mainFormData.membersAbsent == null &&
        this.mainFormData.membersAbsentNonOrg != null
      ) {
        isAbsentUpdate = true;

        if (absentBy != []) {
          meetingAbsent = absentBy;
        }

        if (this.mainFormData.membersAbsentNonOrg != "") {
          meetingAbsent.push({
            attendeeId: this.mainFormData.membersAbsentNonOrg,
            isGuest: true,
          });
        }
        meetingAbsentObject = {
          isUpdated: isAbsentUpdate,
          attendees: meetingAbsent,
        };
      } else if (
        this.mainFormData.membersAbsent != null &&
        this.mainFormData.membersAbsentNonOrg != null
      ) {
        isAbsentUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.membersAbsent.length;
          ++index
        ) {
          let user = this.mainFormData.membersAbsent[index];
          meetingAbsent.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (this.mainFormData.membersAbsentNonOrg != "") {
          meetingAbsent.push({
            attendeeId: this.mainFormData.membersAbsentNonOrg,
            isGuest: true,
          });
        }

        meetingAbsentObject = {
          isUpdated: isAbsentUpdate,
          attendees: meetingAbsent,
        };
      } else {
        meetingAbsentObject = {
          isUpdated: false,
          attendees: meetingAbsent,
        };
      }

      // ---- meeting copies to ----

      let copiesTo = [];
      let copiesToNonOrg = "";
      if (this.selectedMeeting.meeting.meetingCopiesTo.length != 0) {
        for (
          let index = 0;
          index < this.selectedMeeting.meeting.meetingCopiesTo.length;
          ++index
        ) {
          let user = this.selectedMeeting.meeting.meetingCopiesTo[index];
          if (user.guest !== true) {
            copiesTo.push({
              attendeeId: user.attendeeId,
              isGuest: false,
            });
          } else {
            copiesToNonOrg = {
              attendeeId: user.attendeeId,
              isGuest: true,
            };
          }
        }
      }

      if (
        this.mainFormData.additionalCopiesTo != null &&
        this.mainFormData.additionalCopiesToNonOrg == null
      ) {
        isCopiesToUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.additionalCopiesTo.length;
          ++index
        ) {
          let user = this.mainFormData.additionalCopiesTo[index];
          meetingCopiesTo.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (copiesToNonOrg != "") {
          meetingCopiesTo.push(copiesToNonOrg);
        }
        meetingCopiesToObject = {
          isUpdated: isCopiesToUpdate,
          attendees: meetingCopiesTo,
        };
      } else if (
        this.mainFormData.additionalCopiesTo == null &&
        this.mainFormData.additionalCopiesToNonOrg != null
      ) {
        isCopiesToUpdate = true;

        if (copiesTo != []) {
          meetingCopiesTo = copiesTo;
        }

        if (this.mainFormData.additionalCopiesToNonOrg != "") {
          meetingCopiesTo.push({
            attendeeId: this.mainFormData.additionalCopiesToNonOrg,
            isGuest: true,
          });
        }
        meetingCopiesToObject = {
          isUpdated: isCopiesToUpdate,
          attendees: meetingCopiesTo,
        };
      } else if (
        this.mainFormData.additionalCopiesTo != null &&
        this.mainFormData.additionalCopiesToNonOrg != null
      ) {
        isCopiesToUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.additionalCopiesTo.length;
          ++index
        ) {
          let user = this.mainFormData.additionalCopiesTo[index];
          meetingCopiesTo.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (this.mainFormData.additionalCopiesToNonOrg != "") {
          meetingCopiesTo.push({
            attendeeId: this.mainFormData.additionalCopiesToNonOrg,
            isGuest: true,
          });
        }

        meetingCopiesToObject = {
          isUpdated: isCopiesToUpdate,
          attendees: meetingCopiesTo,
        };
      } else {
        meetingCopiesToObject = {
          isUpdated: false,
          attendees: meetingCopiesTo,
        };
      }

      // ---- meeting prepared by ----

      let preparedBy = [];
      let preparedByNonOrg = "";
      if (this.selectedMeeting.meeting.meetingPrepared.length != 0) {
        for (
          let index = 0;
          index < this.selectedMeeting.meeting.meetingPrepared.length;
          ++index
        ) {
          let user = this.selectedMeeting.meeting.meetingPrepared[index];
          if (user.guest !== true) {
            preparedBy.push({
              attendeeId: user.attendeeId,
              isGuest: false,
            });
          } else {
            preparedByNonOrg = {
              attendeeId: user.attendeeId,
              isGuest: true,
            };
          }
        }
      }

      if (
        this.mainFormData.minutesOfMeetingPreparedBy != null &&
        this.mainFormData.minutesOfMeetingPreparedByNonOrg == null
      ) {
        isPreparedUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.minutesOfMeetingPreparedBy.length;
          ++index
        ) {
          let user = this.mainFormData.minutesOfMeetingPreparedBy[index];
          meetingPrepared.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (preparedByNonOrg != "") {
          meetingPrepared.push(preparedByNonOrg);
        }
        meetingPreparedObject = {
          isUpdated: isPreparedUpdate,
          attendees: meetingPrepared,
        };
      } else if (
        this.mainFormData.minutesOfMeetingPreparedBy == null &&
        this.mainFormData.minutesOfMeetingPreparedByNonOrg != null
      ) {
        isPreparedUpdate = true;

        if (preparedBy != []) {
          meetingPrepared = preparedBy;
        }

        if (this.mainFormData.minutesOfMeetingPreparedBy != "") {
          meetingPrepared.push({
            attendeeId: this.mainFormData.minutesOfMeetingPreparedByNonOrg,
            isGuest: true,
          });
        }
        meetingPreparedObject = {
          isUpdated: isPreparedUpdate,
          attendees: meetingPrepared,
        };
      } else if (
        this.mainFormData.minutesOfMeetingPreparedBy != null &&
        this.mainFormData.minutesOfMeetingPreparedByNonOrg != null
      ) {
        isPreparedUpdate = true;

        for (
          let index = 0;
          index < this.mainFormData.minutesOfMeetingPreparedBy.length;
          ++index
        ) {
          let user = this.mainFormData.minutesOfMeetingPreparedBy[index];
          meetingPrepared.push({
            attendeeId: user,
            isGuest: false,
          });
        }

        if (this.mainFormData.minutesOfMeetingPreparedByNonOrg != "") {
          meetingPrepared.push({
            attendeeId: this.mainFormData.minutesOfMeetingPreparedByNonOrg,
            isGuest: true,
          });
        }

        meetingPreparedObject = {
          isUpdated: isPreparedUpdate,
          attendees: meetingPrepared,
        };
      } else {
        meetingPreparedObject = {
          isUpdated: false,
          attendees: meetingPrepared,
        };
      }

      let response;
      this.overlay = true;
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.meetingId}`,
          {
            projectId: this.projectId,
            actualDuration: this.mainFormData.actualDurationOfTheMeeting,
            meetingChaired: meetingChairedObject,
            meetingAttended: meetingAttendedObject,
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
        this.component = "success-popup";
        this.successMessage = "People Successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });

        this.mainFormData.chairedByNonOrg = null;
        this.mainFormData.chairedBy = null;
        isChairUpdate = false;

        this.mainFormData.attendedByNonOrg = null;
        this.mainFormData.attendedBy = null;
        isAttendedUpdate = false;

        this.mainFormData.membersAbsentNonOrg = null;
        this.mainFormData.membersAbsent = null;
        isAbsentUpdate = false;

        this.mainFormData.additionalCopiesToNonOrg = null;
        this.mainFormData.additionalCopiesTo = null;
        isCopiesToUpdate = false;

        this.mainFormData.minutesOfMeetingPreparedByNonOrg = null;
        this.mainFormData.minutesOfMeetingPreparedBy = null;
        isPreparedUpdate = false;

        this.overlay = false;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error update people", e);
      }
    },

    // ------ update actual duration ------

    async updateActualDuration() {
      let response;
      this.overlay = true;
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.meetingId}`,
          {
            projectId: this.projectId,
            actualDuration: this.mainFormData.actualDurationOfTheMeeting,
            meetingChaired: { isUpdated: false, attendees: [] },
            meetingAttended: { isUpdated: false, attendees: [] },
            meetingAbsent: { isUpdated: false, attendees: [] },
            meetingCopiesTo: { isUpdated: false, attendees: [] },
            meetingPrepared: { isUpdated: false, attendees: [] },
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Duration Successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });
        this.overlay = false;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error update actual duration", e);
      }
    },

    // ------ update planned duration ------
    async updatePlannedDuration() {
      let response;
      this.overlay = true;
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.meetingId}`,
          {
            projectId: this.projectId,
            expectedDuration: this.mainFormData.plannedDurationOfTheMeeting,
            meetingChaired: { isUpdated: false, attendees: [] },
            meetingAttended: { isUpdated: false, attendees: [] },
            meetingAbsent: { isUpdated: false, attendees: [] },
            meetingCopiesTo: { isUpdated: false, attendees: [] },
            meetingPrepared: { isUpdated: false, attendees: [] },
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Duration Successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });
        this.overlay = false;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error update planned duration", e);
      }
    },

    // ------ update topic ------
    async updateTopic() {
      let response;
      this.overlay = true;
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.meetingId}`,
          {
            projectId: this.projectId,
            meetingTopic: this.mainFormData.topicForTheMeeting,
            meetingChaired: { isUpdated: false, attendees: [] },
            meetingAttended: { isUpdated: false, attendees: [] },
            meetingAbsent: { isUpdated: false, attendees: [] },
            meetingCopiesTo: { isUpdated: false, attendees: [] },
            meetingPrepared: { isUpdated: false, attendees: [] },
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Topic Successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });
        this.overlay = false;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error update topic", e);
      }
    },

    // ------ update venu ------
    async updateVenu() {
      let response;
      this.overlay = true;
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.meetingId}`,
          {
            projectId: this.projectId,
            meetingVenue: this.mainFormData.venue,
            meetingChaired: { isUpdated: false, attendees: [] },
            meetingAttended: { isUpdated: false, attendees: [] },
            meetingAbsent: { isUpdated: false, attendees: [] },
            meetingCopiesTo: { isUpdated: false, attendees: [] },
            meetingPrepared: { isUpdated: false, attendees: [] },
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Venu Successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });
        this.overlay = false;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error update venu", e);
      }
    },

    // ------ date update ------
    async updateDate() {
      let response;
      this.overlay = true;
      let scheduledTime = new Date(
        this.mainFormData.meetingDate + " " + this.mainFormData.scheduleTime
      );
      const isoScheduledTime = new Date(
        scheduledTime.getTime() - scheduledTime.getTimezoneOffset() * 60000
      ).toISOString();
      let actualTime = new Date(
        this.mainFormData.meetingDate + " " + this.mainFormData.actualTime
      );
      const isoActualTime = new Date(
        actualTime.getTime() - actualTime.getTimezoneOffset() * 60000
      ).toISOString();
      try {
        response = await this.$axios.$put(
          `meeting/${this.meetingObject.meetingId}`,
          {
            projectId: this.projectId,
            meetingExpectedTime: isoScheduledTime,
            meetingActualTime: isoActualTime,
            meetingChaired: { isUpdated: false, attendees: [] },
            meetingAttended: { isUpdated: false, attendees: [] },
            meetingAbsent: { isUpdated: false, attendees: [] },
            meetingCopiesTo: { isUpdated: false, attendees: [] },
            meetingPrepared: { isUpdated: false, attendees: [] },
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Date Successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });
        this.overlay = false;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error update date", e);
      }
    },
  },
  computed: {
    ...mapState({
      projectId: (state) => state.project.project.projectId,
      selectedMeeting: (state) => state.meetings.meeting.selectedMeeting,
      users: (state) => state.user.users,
    }),
    userArray() {
      let AssigneeSearchList = this.users;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          img: user.profileImage,
        });
      }
      return assigneeList;
    },
    chairedBy: {
      get() {
        let chairedBy = [];
        if (this.selectedMeeting.meeting.meetingChaired.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingChaired.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingChaired[index];
            if (user.guest !== true) {
              chairedBy[index] = user.attendeeId;
            }
          }
        }
        return chairedBy;
      },
      set(value) {
        this.mainFormData.chairedBy = value;
      },
    },
    chairedByNonOrg: {
      get() {
        let chairedByNonOrg = "";
        if (this.selectedMeeting.meeting.meetingChaired.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingChaired.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingChaired[index];
            if (user.guest == true) {
              chairedByNonOrg = user.attendeeId;
            }
          }
        }
        return chairedByNonOrg;
      },
      set(value) {
        this.mainFormData.chairedByNonOrg = value;
      },
    },
    meetingAttendedBy: {
      get() {
        let meetingAttendedBy = [];
        if (this.selectedMeeting.meeting.meetingAttended.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingAttended.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingAttended[index];
            if (user.guest !== true) {
              meetingAttendedBy[index] = user.attendeeId;
            }
          }
        }
        return meetingAttendedBy;
      },
      set(value) {
        this.mainFormData.meetingAttendedBy = value;
      },
    },
    meetingAttendedByNonOrg: {
      get() {
        let meetingAttendedByNonOrg = "";
        if (this.selectedMeeting.meeting.meetingAttended.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingAttended.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingAttended[index];
            if (user.guest == true) {
              meetingAttendedByNonOrg = user.attendeeId;
            }
          }
        }
        return meetingAttendedByNonOrg;
      },
      set(value) {
        this.mainFormData.meetingAttendedByNonOrg = value;
      },
    },
    membersAbsent: {
      get() {
        let membersAbsent = [];
        if (this.selectedMeeting.meeting.meetingAbsent.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingAbsent.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingAbsent[index];
            if (user.guest !== true) {
              membersAbsent[index] = user.attendeeId;
            }
          }
        }
        return membersAbsent;
      },
      set(value) {
        this.mainFormData.membersAbsent = value;
      },
    },
    membersAbsentNonOrg: {
      get() {
        let membersAbsentNonOrg = "";
        if (this.selectedMeeting.meeting.meetingAbsent.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingAbsent.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingAbsent[index];
            if (user.guest == true) {
              membersAbsentNonOrg = user.attendeeId;
            }
          }
        }
        return membersAbsentNonOrg;
      },
      set(value) {
        this.mainFormData.membersAbsentNonOrg = value;
      },
    },
    additionalCopiesTo: {
      get() {
        let additionalCopiesTo = [];
        if (this.selectedMeeting.meeting.meetingCopiesTo.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingCopiesTo.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingCopiesTo[index];
            if (user.guest !== true) {
              additionalCopiesTo[index] = user.attendeeId;
            }
          }
        }
        return additionalCopiesTo;
      },
      set(value) {
        this.mainFormData.additionalCopiesTo = value;
      },
    },
    additionalCopiesToNonOrg: {
      get() {
        let additionalCopiesToNonOrg = "";
        if (this.selectedMeeting.meeting.meetingCopiesTo.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingCopiesTo.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingCopiesTo[index];
            if (user.guest == true) {
              additionalCopiesToNonOrg = user.attendeeId;
            }
          }
        }
        return additionalCopiesToNonOrg;
      },
      set(value) {
        this.mainFormData.additionalCopiesToNonOrg = value;
      },
    },
    minutesOfMeetingPreparedBy: {
      get() {
        let minutesOfMeetingPreparedBy = [];
        if (this.selectedMeeting.meeting.meetingPrepared.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingPrepared.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingPrepared[index];
            if (user.guest !== true) {
              minutesOfMeetingPreparedBy[index] = user.attendeeId;
            }
          }
        }
        return minutesOfMeetingPreparedBy;
      },
      set(value) {
        this.mainFormData.minutesOfMeetingPreparedBy = value;
      },
    },
    minutesOfMeetingPreparedByNonOrg: {
      get() {
        let minutesOfMeetingPreparedByNonOrg = "";
        if (this.selectedMeeting.meeting.meetingPrepared.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingPrepared.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingPrepared[index];
            if (user.guest == true) {
              minutesOfMeetingPreparedByNonOrg = user.attendeeId;
            }
          }
        }
        return minutesOfMeetingPreparedByNonOrg;
      },
      set(value) {
        this.mainFormData.minutesOfMeetingPreparedByNonOrg = value;
      },
    },
  },
};
</script>
