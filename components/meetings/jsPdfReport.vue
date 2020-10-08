


    <template>
  <div>
    <div
      style="
        color: red;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 30px !important;
      "
    >
      Minutes of the Meeting
    </div>
    <div>
      <table style="font-size: 8px; font-weight: 200; width: 100%">
        <tr>
          <td style="background-color: #ffffff">
            <span>Project Name: </span>
          </td>
          <td>
            <span>Date: </span>
          </td>
          <td>
            <span>Topic for the meeting: </span
            ><span>{{ selectedMeeting.meeting.meetingTopic }}</span>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffffff">
            <span style="font-weight: 200; !important">{{
              fetchProject.projectName
            }}</span>
          </td>
          <td>
            <span
              v-if="selectedMeeting.meeting.meetingActualTime != undefined"
              >{{
                selectedMeeting.meeting.meetingActualTime.substr(0, 10)
              }}</span
            >
          </td>
          <td>
            <span>{{ selectedMeeting.meeting.meetingTopic }}</span>
          </td>
        </tr>
      </table>
      <table style="font-size: 8px; font-weight: 200; width: 100%">
        <tr>
          <td>
            <span>Scheduled Time: </span>
          </td>
          <td>
            <span>Started Time: </span>
          </td>
          <td>
            <span>Planned Duration: </span>
          </td>
          <td>
            <span>Actual Duration: </span>
          </td>
          <td>
            <span>Attendance: </span>
          </td>
          <td>
            <span>Venu: </span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              v-if="selectedMeeting.meeting.meetingExpectedTime != undefined"
              >{{
                selectedMeeting.meeting.meetingExpectedTime.slice(11, 16)
              }}</span
            >
          </td>
          <td>
            <span
              v-if="selectedMeeting.meeting.meetingActualTime != undefined"
              >{{
                selectedMeeting.meeting.meetingActualTime.slice(11, 16)
              }}</span
            >
          </td>
          <td>
            <span>{{ selectedMeeting.meeting.expectedDuration }} min</span>
          </td>
          <td>
            <span>{{ selectedMeeting.meeting.actualDuration }} min</span>
          </td>
          <td>
            <span>{{ getAttendance() }} %</span>
          </td>
          <td>
            <span>{{ selectedMeeting.meeting.meetingVenue }} </span>
          </td>
        </tr>
      </table>
      <div>
        <span class="boldFontHeading">Chaired By: </span>
        <span
          v-for="(chaired, index) in selectedMeeting.meeting.meetingChaired"
          :key="index"
        >
          <span v-if="!chaired.guest">
            {{ chaired.firstName }} {{ chaired.lastName }}</span
          >
          <span v-else> {{ chaired.attendeeId }} </span>
          <span
            v-if="index != selectedMeeting.meeting.meetingChaired.length - 1"
            >/</span
          >
        </span>
      </div>
      <div style="margin-top: 10px">
        <span class="boldFontHeading">Attended By: </span>
        <span
          v-for="(attended, index) in selectedMeeting.meeting.meetingAttended"
          :key="index"
        >
          <span v-if="!attended.guest">
            {{ attended.firstName }} {{ attended.lastName }}</span
          >
          <span v-else> {{ attended.attendeeId }} </span>
          <span
            v-if="index != selectedMeeting.meeting.meetingAttended.length - 1"
            >/</span
          >
        </span>
      </div>
      <div style="margin-top: 10px">
        <span class="boldFontHeading">Members Absent: </span>
        <span
          v-for="(absent, index) in selectedMeeting.meeting.meetingAbsent"
          :key="index"
        >
          <span v-if="!absent.guest">
            {{ absent.firstName }} {{ absent.lastName }}</span
          >
          <span v-else> {{ absent.attendeeId }} </span>
          <span v-if="index != selectedMeeting.meeting.meetingAbsent.length - 1"
            >/</span
          >
        </span>
      </div>
      <div style="margin-top: 10px">
        <span class="boldFontHeading">Additional Copies to: </span>
        <span
          v-for="(copiesTo, index) in selectedMeeting.meeting.meetingCopiesTo"
          :key="index"
        >
          <span v-if="!copiesTo.guest">
            {{ copiesTo.firstName }} {{ copiesTo.lastName }}</span
          >
          <span v-else> {{ copiesTo.attendeeId }} </span>
          <span
            v-if="index != selectedMeeting.meeting.meetingCopiesTo.length - 1"
            >/</span
          >
        </span>
      </div>
      <div style="margin-top: 10px">
        <span class="boldFontHeading">Meeting Minute Prepared by: </span>
        <span
          v-for="(prepared, index) in selectedMeeting.meeting.meetingPrepared"
          :key="index"
        >
          <span v-if="!prepared.guest">
            {{ prepared.firstName }} {{ prepared.lastName }}</span
          >
          <span v-else> {{ prepared.attendeeId }} </span>
          <span
            v-if="index != selectedMeeting.meeting.meetingPrepared.length - 1"
            >/</span
          >
        </span>
      </div>
    </div>
    <div class="DisPointTitlePDF">Discussion Points</div>
    <div>
      <table style="font-size: 8px; font-weight: 200; width: 100%">
        <tr>
          <td style="width: 40px">##</td>
          <td style="width: 500px">Discription</td>
          <td style="width: 100px">Action By</td>
          <td style="width: 100px">Target Date</td>
          <td style="width: 100px">Remarks</td>
        </tr>
        <tr
          v-for="(disPoint, index) in selectedMeeting.discussionPoints"
          :key="index"
        >
          <td style="width: 40px">{{ disPoint.discussionPoint }}</td>
          <td style="width: 500px">
            <div
              :id="'htmlContent' + index"
              v-html="disPoint.description"
            ></div>
          </td>
          <td style="width: 100px">
            <span v-if="disPoint.actionByGuest">{{ disPoint.actionBy }}</span>
            <span v-else
              >{{ disPoint.meetingUser.firstName }}
              {{ disPoint.meetingUser.lastName }}</span
            >
          </td>
          <td style="width: 100px">
            <span v-if="disPoint.dueDate == null">No Due Date</span>
            <span v-else>{{
              new Date(disPoint.dueDate).toISOString().substr(0, 10)
            }}</span>
          </td>
          <td style="width: 100px">{{ disPoint.remarks }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  methods: {
    getHtml(htmlContentText, index) {
      //   console.log("HTML" + htmlContent + index);
      //   document.getElementById("htmlContent").innerHTML +=
      //     "<p>Add required parts</p>";
      let id = "htmlContent" + index;
      if (document.getElementById(id) != null) {
        console.log("HTML" + htmlContentText + index);
        document.getElementById(id).innerHTML = htmlContentText;
      }
    },
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
