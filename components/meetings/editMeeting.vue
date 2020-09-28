<template>
  <v-card color="#FFFFFF" height="90vh">
    {{ this.mainFormData.chairedBy }}
    <div
      id="meetingEditDiv"
      style="height: 80vh; padding-bottom: 300px"
      class="overflow-y-auto"
    >
      <v-card-text>
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
          </v-col>
        </v-row>
      </v-card-text>
    </div>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" text>
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['meetingObject'],
  data() {
    return {
      modal: false,
      modalDiscussion: false,

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
      defaultRules: [(value) => !!value || 'Required.'],
    };
  },
  methods: {},
  computed: {
    ...mapState({
      selectedMeeting: (state) => state.meetings.meeting.selectedMeeting,
      users: (state) => state.user.users,
    }),
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
    chairedBy: {
      get() {
        let meetingChaired = [];
        if (this.selectedMeeting.meeting.meetingChaired.length != 0) {
          for (
            let index = 0;
            index < this.selectedMeeting.meeting.meetingChaired.length;
            ++index
          ) {
            let user = this.selectedMeeting.meeting.meetingChaired[index];
            if (user.guest !== true) {
              meetingChaired[index] = user.attendeeId;
            }
          }
        }
        return meetingChaired;
      },
      set(value) {
        this.mainFormData.chairedBy = value;
      },
    },
  },
};
</script>
