<template>
  <div class="pdfContainer">
    <section slot="pdf-content">
      <section class="pdf-item">
        <v-row>
          <v-col
            ><img align="left" width="80px" src="~/static/arimacLogo.png"
          /></v-col>
          <v-col align="right" justify="end"
            ><img width="80px" src="~/static/shiftLogo.png"
          /></v-col>
        </v-row>
      </section>
      <section class="pdf-item">
        <div class="pdfTopic">Minutes of the Meeting</div>
      </section>
      <section class="pdf-item">
        <table class="tableStyles" style="width: 100%">
          <tr>
            <td colspan="2">
              <span class="boldFontHeading">Project Name: </span
              ><span>{{ fetchProject.projectName }}</span>
            </td>
            <td>
              <span class="boldFontHeading">Date: </span>
              <!-- <span>{{
                selectedMeeting.meeting.meetingActualTime.substr(0, 10)
              }}</span> -->
            </td>
            <td colspan="3">
              <span class="boldFontHeading">Topic for the meeting: </span
              ><span>{{ selectedMeeting.meeting.meetingTopic }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="boldFontHeading">Scheduled Time: </span>
              <br />
              <!-- <span>{{
                selectedMeeting.meeting.meetingExpectedTime.slice(11, 16)
              }}</span> -->
            </td>
            <td>
              <span class="boldFontHeading">Started Time: </span>
              <br />
              <!-- <span>{{
                selectedMeeting.meeting.meetingActualTime.slice(11, 16)
              }}</span> -->
            </td>
            <td>
              <span class="boldFontHeading">Planned Duration: </span>
              <br />
              <span>{{ selectedMeeting.meeting.expectedDuration }} min</span>
            </td>
            <td>
              <span class="boldFontHeading">Actual Duration: </span>
              <br />
              <span>{{ selectedMeeting.meeting.actualDuration }} min</span>
            </td>
            <td>
              <span class="boldFontHeading">Attendance: </span>
              <br />
              <span>{{ getAttendance() }} %</span>
            </td>
            <td>
              <span class="boldFontHeading">Venu: </span>
              <br />
              <span>{{ selectedMeeting.meeting.meetingVenue }} </span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <span class="boldFontHeading">Chaired By: </span>
              <span
                v-for="(chaired, index) in selectedMeeting.meeting
                  .meetingChaired"
                :key="index"
              >
                <span v-if="!chaired.guest"
                  >{{ chaired.firstName }} {{ chaired.lastName }}</span
                >
                <span v-else>{{ chaired.attendeeId }}</span>
                <span
                  v-if="
                    index != selectedMeeting.meeting.meetingChaired.length - 1
                  "
                  >/</span
                >
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <span class="boldFontHeading">Attended By: </span>
              <span
                v-for="(attended, index) in selectedMeeting.meeting
                  .meetingAttended"
                :key="index"
              >
                <span v-if="!attended.guest">
                  {{ attended.firstName }} {{ attended.lastName }}</span
                >
                <span v-else> {{ attended.attendeeId }}</span>
                <span
                  v-if="
                    index != selectedMeeting.meeting.meetingAttended.length - 1
                  "
                  >/</span
                >
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <span class="boldFontHeading">Absent: </span>
              <span
                v-for="(absent, index) in selectedMeeting.meeting.meetingAbsent"
                :key="index"
              >
                <span v-if="!absent.guest">
                  {{ absent.firstName }} {{ absent.lastName }}</span
                >
                <span v-else> {{ absent.attendeeId }}</span>
                <span
                  v-if="
                    index != selectedMeeting.meeting.meetingAbsent.length - 1
                  "
                  >/</span
                >
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <span class="boldFontHeading">Additional Copies to: </span>
              <span
                v-for="(copiesTo, index) in selectedMeeting.meeting
                  .meetingCopiesTo"
                :key="index"
              >
                <span v-if="!copiesTo.guest">
                  {{ copiesTo.firstName }} {{ copiesTo.lastName }}</span
                >
                <span v-else> {{ copiesTo.attendeeId }}</span>
                <span
                  v-if="
                    index != selectedMeeting.meeting.meetingCopiesTo.length - 1
                  "
                  >/</span
                >
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <span class="boldFontHeading">Meeting Minute Prepared by: </span>
              <span
                v-for="(prepared, index) in selectedMeeting.meeting
                  .meetingPrepared"
                :key="index"
              >
                <span v-if="!prepared.guest">
                  {{ prepared.firstName }} {{ prepared.lastName }}</span
                >
                <span v-else> {{ prepared.attendeeId }}</span>
                <span
                  v-if="
                    index != selectedMeeting.meeting.meetingPrepared.length - 1
                  "
                  >/</span
                >
              </span>
            </td>
          </tr>
        </table>
      </section>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  methods: {
    getAttendance() {
      let attendance = 0;
      attendance =
        (this.selectedMeeting.meeting.meetingAttended.length /
          (this.selectedMeeting.meeting.meetingAttended.length +
            this.selectedMeeting.meeting.meetingAbsent.length)) *
        100;

      if (this.selectedMeeting.meeting.meetingAttended.length == 0) {
        return 0;
      } else {
        return parseInt(attendance);
      }
    },
  },
  computed: {
    ...mapState({
      selectedMeeting: (state) => state.meetings.meeting.selectedMeeting,
      fetchProject: (state) => state.project.project,
    }),
  },
};
</script>
