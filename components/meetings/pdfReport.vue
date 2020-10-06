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
        <table class="tableStyles" style="width:100%">
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
        </table>
      </section>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  methods: {
    getAttendance() {
      let attendance = 0;
      attendance =
        (this.selectedMeeting.meeting.meetingAttended.length /
          (this.selectedMeeting.meeting.meetingAttended.length +
            this.selectedMeeting.meeting.meetingAbsent.length)) *
        100;

      return parseInt(attendance);
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
