<template>
  <div class="projectTabContent overflow-y-auto">
    <div class="minuteViewSection">
      <div class="viewMinuteBtnDiv">
        <v-btn depressed color="red" dark>View Minute</v-btn>
      </div>
    </div>
    <br />
    <br />
    <v-container style="margin-top: 30px">
      <v-row style="height: 100%">
        <v-col md="12">
          <v-form ref="mainForm">
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
              <v-date-picker v-model="mainFormData.meetingDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(mainFormData.meetingDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

            <v-text-field
              :rules="defaultRules"
              v-model="mainFormData.topicForTheMeeting"
              outlined
              dense
              label="Topic for the Meeting"
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
              <v-time-picker v-if="modal2" v-model="mainFormData.scheduleTime" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog1.save(mainFormData.scheduleTime)"
                >OK</v-btn>
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
              <v-time-picker v-if="modal3" v-model="mainFormData.actualTime" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog2.save(mainFormData.actualTime)">OK</v-btn>
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
            <!--actualDurationOfTheMeeting -->
            <v-text-field
              :rules="defaultRules"
              v-model="mainFormData.actualDurationOfTheMeeting"
              outlined
              dense
              type="number"
              label="Actual Duration of the Meeting (min)"
            ></v-text-field>
            <!-- attendance -->
            <v-text-field
              :rules="defaultRules"
              v-model="mainFormData.attendance"
              outlined
              dense
              type="number"
              label="Attendance %"
            ></v-text-field>
            <!--venue -->
            <v-text-field
              :rules="defaultRules"
              v-model="mainFormData.venue"
              outlined
              dense
              label="Venue"
            ></v-text-field>
            <v-row class="sideByRow">
              <v-col>
                <!--chairedBy -->
                <v-autocomplete
                  :rules="defaultRules"
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
                  label="Chaired By - Non Org (Ex: Member 1, Member 2)"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="sideByRow">
              <v-col>
                <!--attendedBy -->
                <v-autocomplete
                  :rules="defaultRules"
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
                  dense
                  label="Meeting Attended by - Non Org (Ex: Member 1, Member 2)"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="sideByRow">
              <v-col>
                <!--absent -->
                <v-autocomplete
                  :rules="defaultRules"
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
                  dense
                  label="Members Absent - Non Org (Ex: Member 1, Member 2)"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="sideByRow">
              <v-col>
                <!--additionalCopiesTo -->
                <v-autocomplete
                  :rules="defaultRules"
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
                  dense
                  label="Additional Copies to - Non Org (Ex: Member 1, Member 2)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="sideByRow">
              <v-col>
                <!--preaparedBy -->
                <v-autocomplete
                  :rules="defaultRules"
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
                  dense
                  label="Prepared by - Non Org (Ex: Member 1, Member 2)"
                ></v-text-field>
              </v-col>
            </v-row>

            <div class="minuteViewSection">
              <div class="viewMinuteBtnDiv">
                <v-btn @click="addMeeting()" depressed color="green" dark>Initiate Meeting</v-btn>
              </div>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <span class="pointFormHeader">Add Discussion Point</span>
          <v-form ref="subForm"></v-form>
          <v-row>
            <v-col></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";

export default {
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
  },
  data() {
    return {
      component: "",
      meetingObject: {},
      userId: this.$store.state.user.userId,

      dialog: false,
      menu: false,

      modal: false,

      modal2: false,
      modal3: false,
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
      defaultRules: [(value) => !!value || "Required."],
    };
  },
  methods: {
    async addMeeting() {
      let meetingAttended = [];
      let meetingAbsent = [];
      let meetingCopiesTo = [];
      let meetingPrepared = [];
      let meetingChaired = [];
      let scheduledTime = new Date(
        this.mainFormData.meetingDate + " " + this.mainFormData.scheduleTime
      );
      let actualTime = new Date(
        this.mainFormData.meetingDate + " " + this.mainFormData.actualTime
      );
      // ---- attended by ----
      if (
        this.mainFormData.meetingAttendedBy != null &&
        this.mainFormData.meetingAttendedBy != ""
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
        this.mainFormData.meetingAttendedByNonOrg != ""
      ) {
        meetingAttended.push({
          attendeeId: this.mainFormData.meetingAttendedByNonOrg,
          isGuest: true,
        });
      }

      // ---- chaired by ----
      if (
        this.mainFormData.chairedBy != null &&
        this.mainFormData.chairedBy != ""
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
        this.mainFormData.chairedByNonOrg != ""
      ) {
        meetingChaired.push({
          attendeeId: this.mainFormData.chairedByNonOrg,
          isGuest: true,
        });
      }

      // ---- member absent ----
      if (
        this.mainFormData.membersAbsent != null &&
        this.mainFormData.membersAbsent != ""
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
        this.mainFormData.membersAbsentNonOrg != ""
      ) {
        meetingAbsent.push({
          attendeeId: this.mainFormData.membersAbsentNonOrg,
          isGuest: true,
        });
      }

      // ---- additional copies to ----
      if (
        this.mainFormData.additionalCopiesTo != null &&
        this.mainFormData.additionalCopiesTo != ""
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
        this.mainFormData.additionalCopiesToNonOrg != ""
      ) {
        meetingCopiesTo.push({
          attendeeId: this.mainFormData.additionalCopiesToNonOrg,
          isGuest: true,
        });
      }

      // ---- prepared by ----
      if (
        this.mainFormData.minutesOfMeetingPreparedBy != null &&
        this.mainFormData.minutesOfMeetingPreparedBy != ""
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
        this.mainFormData.minutesOfMeetingPreparedByNonOrg != ""
      ) {
        meetingPrepared.push({
          attendeeId: this.mainFormData.minutesOfMeetingPreparedByNonOrg,
          isGuest: true,
        });
      }

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
            actualDuration: this.mainFormData.actualDurationOfTheMeeting,
            meetingAttended: meetingAttended,
            meetingChaired: meetingChaired,
            meetingAbsent: meetingAbsent,
            meetingCopiesTo: meetingCopiesTo,
            meetingPrepared: meetingPrepared,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Meeting Successfully initiated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.meetingObject = response;
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating meeting", e);
      }
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.user.users,
      projectId: (state) => state.project.project.projectId,
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
  },
};
</script>