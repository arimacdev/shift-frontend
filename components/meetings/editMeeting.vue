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

        <v-row>
          <v-col>
            <br /><br />
            <v-divider></v-divider>
            <br /><br />

            <span>Add Discussion Points</span>
            <v-form v-model="isValidDiscussion" ref="discussionPointForm">
              <v-row class="sideByRow">
                <v-col md="3">
                  <!--discussionPoints -->
                  <v-text-field
                    v-model="discussionPointCount"
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
                    v-if="!discussionPointData.switch1"
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
                      <v-btn
                        text
                        color="primary"
                        @click="modalDiscussion = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(discussionPointData.dueDate)"
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
              <v-row v-if="!discussionPointData.switch1">
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
        <div>
          <v-btn
            :disabled="!isValidDiscussion"
            style="color: #ffffff"
            @click="addDiscussionPoint()"
            depressed
            color="green"
            >Add Discussion Point</v-btn
          >

          <v-btn text color="red" @click="resetDiscussionForm()">Reset</v-btn>
        </div>

        <br /><br />
        <v-divider></v-divider>
        <br /><br />

        <span>Discussion Points</span>

        <span v-if="selectedMeeting.discussionPoints == ''">
          <br /><br />
          No discussion points to show</span
        >

        <v-card
          v-for="(discussion, index) in selectedMeeting.discussionPoints"
          :key="index"
          outlined
          class="discussionPointCardStyle"
        >
          <v-row class="disPointIcons" align="center" justify="end">
            <v-btn icon
              ><v-icon
                color="#0083E2"
                @click="
                  selectDiscussionPoint(discussion);
                  editDiscussionDialog = true;
                "
                >mdi-pencil-outline</v-icon
              ></v-btn
            >
            <v-btn icon
              ><v-icon
                @click="
                  selectDiscussionPoint(discussion);
                  deleteDiscussionDialog = true;
                "
                color="#E07857"
                >mdi-trash-can-outline</v-icon
              ></v-btn
            >
          </v-row>
          <v-row class="sideByRow">
            <v-col md="3">
              <!--discussionPoints -->
              <v-text-field
                :value="discussion.discussionPoint"
                outlined
                dense
                readonly
                label="Discussion Point"
              ></v-text-field>
            </v-col>
            <!-- <v-col md="1">
                    <span style="font-size: 8px">Action by guest</span>
                  </v-col>-->
            <v-col md="3">
              <div style="float: right; margin-top: -10px">
                <v-switch
                  :input-value="discussion.actionByGuest"
                  readonly
                  label="Action by guest"
                ></v-switch>
              </div>
            </v-col>
            <v-col md="6">
              <!--actionBy -->
              <v-text-field
                v-if="!discussion.actionByGuest"
                :value="
                  discussion.meetingUser.firstName +
                  ' ' +
                  discussion.meetingUser.lastName
                "
                outlined
                dense
                readonly
                label="Action By"
              ></v-text-field>
              <v-text-field
                v-else
                :value="discussion.actionBy"
                outlined
                dense
                readonly
                label="Action By"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="sideByRow">
            <v-col>
              <v-text-field
                v-if="
                  new Date(discussion.dueDate).toISOString().substr(0, 10) ==
                  '1970-01-01'
                "
                outlined
                dense
                value="No due date"
                label="Date"
                prepend-inner-icon="mdi-calendar-outline"
                readonly
                style="width: 100%"
              ></v-text-field>
              <v-text-field
                v-else
                outlined
                dense
                :value="
                  new Date(discussion.dueDate).toISOString().substr(0, 10)
                "
                label="Date"
                prepend-inner-icon="mdi-calendar-outline"
                readonly
                style="width: 100%"
              ></v-text-field>
            </v-col>
            <v-col>
              <!--remarks -->
              <v-text-field
                :value="discussion.remarks"
                outlined
                dense
                readonly
                label="Remarks"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            v-if="
              discussion.description != '' && discussion.description != null
            "
          >
            <v-col>
              <div class="htmlViewDiv" v-html="discussion.description"></div>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </div>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" text> Close </v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false"> Save </v-btn>
    </v-card-actions>

    <!-- -------- edit discussion dialog ------- -->

    <v-dialog v-model="editDiscussionDialog">
      <v-card style="padding: 35px">
        <v-row>
          <v-col>
            <v-form
              v-model="isValidEditDiscussion"
              ref="discussionPointEditForm"
            >
              <v-row class="sideByRow">
                <v-col md="3">
                  <!--discussionPoints -->
                  <v-text-field
                    v-model="discussionPointUpdatedCount"
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
                      v-model="discussionPointEditedData.switch1"
                      label="Action by guest"
                    ></v-switch>
                  </div>
                </v-col>
                <v-col md="6">
                  <!--actionBy -->
                  <v-autocomplete
                    :rules="defaultRules"
                    v-if="!discussionPointEditedData.switch1"
                    v-model="actionBy"
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
                    v-model="actionBy"
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
                    v-model="modalUpdateDiscussion"
                    :return-value.sync="discussionPointEditedData.dueDate"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        v-model="discussionPointEditedData.dueDate"
                        label="Date"
                        prepend-inner-icon="mdi-calendar-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        style="width: 100%"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="discussionPointEditedData.dueDate"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="modalUpdateDiscussion = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.dialog.save(discussionPointEditedData.dueDate)
                        "
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col>
                  <!--remarks -->
                  <v-text-field
                    v-model="remarks"
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
                    :editorToolbar="customToolbar"
                    placeholder="Add a description"
                    v-model="description"
                  ></vue-editor>
                </v-col>
              </v-row>
              <v-row v-if="!discussionPointEditedData.switch1">
                <v-col md="3">
                  <div style="margin-left: 10px">
                    <v-switch
                      v-model="switch2"
                      label="Convert to a task"
                    ></v-switch>
                  </div>
                </v-col>
                <v-col md="6" v-if="switchEdit2">
                  <div style="margin-left: 10px">
                    <!--remarks -->
                    <v-text-field
                      :rules="defaultRules"
                      v-model="taskName"
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
        <div>
          <v-btn
            :disabled="!isValidEditDiscussion"
            style="color: #ffffff"
            @click="
              editDiscussionDialog = false;
              updateDiscussionPoint();
            "
            depressed
            color="green"
            >Edit Discussion Point</v-btn
          >

          <v-btn text color="red" @click="editDiscussionDialog = false"
            >Cancel</v-btn
          >
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDiscussionDialog" max-width="350">
      <v-card style="text-align: center; padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Delete Discussion Point
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text
          >If you delete the discussion point, all the details will be
          loss.</v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            depressed
            class="text-capitalize"
            width="100px"
            color="#FF6161"
            dark
            @click="deleteDiscussionDialog = false"
            >Cancel</v-btn
          >

          <v-btn
            depressed
            class="text-capitalize"
            width="100px"
            color="#2EC973"
            dark
            @click="
              deleteDiscussionDialog = false;
              deleteDiscussionPoint();
            "
            >Ok</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

      modalUpdateDiscussion: false,

      userId: this.$store.state.user.userId,

      editDiscussionDialog: false,
      customToolbar: [
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        // ['link', 'image', 'video', 'formula'],
        [{ direction: "rtl" }],
        ["clean"],
      ],

      selectedDiscussionPoint: {},
      deleteDiscussionDialog: false,
      isValidDiscussion: true,
      isValidEditDiscussion: true,
      defaultRules: [(value) => !!value || "Required."],

      switchEdit2: false,
      switch2: false,

      discussionPointData: {
        discussionPointCount: 1,
        actionBy: null,
        dueDate: null,
        remarks: null,
        description: "",
        switch1: false,
        switch2: false,
        taskName: null,
      },
      discussionPointEditedData: {
        discussionPointUpdatedCount: 1,
        actionBy: null,
        dueDate: null,
        remarks: null,
        description: null,
        switch1: false,
        switch2: false,
        taskName: null,
      },

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
    async updateDiscussionPoint() {
      let response;
      this.overlay = true;

      let actionBy = null;
      let dueDate = null;
      let remarks = null;
      let description = null;
      let actionByGuest = false;

      // actionBy: null,
      // dueDate: null,
      // remarks: null,
      // description: null,
      // switch1: false,

      if (this.discussionPointEditedData.actionBy != null) {
        actionBy = this.discussionPointEditedData.actionBy;
      } else {
        actionBy = this.selectedDiscussionPoint.actionBy;
      }

      if (this.discussionPointEditedData.dueDate != null) {
        dueDate = this.discussionPointEditedData.dueDate;
      } else {
        dueDate = this.selectedDiscussionPoint.dueDate;
      }

      if (this.discussionPointEditedData.remarks != null) {
        remarks = this.discussionPointEditedData.remarks;
      } else {
        remarks = this.selectedDiscussionPoint.remarks;
      }

      if (this.discussionPointEditedData.description != null) {
        description = this.discussionPointEditedData.description;
      } else {
        description = this.selectedDiscussionPoint.description;
      }

      if (
        this.discussionPointEditedData.switch1 !=
        this.selectedDiscussionPoint.actionByGuest
      ) {
        actionByGuest = this.discussionPointEditedData.switch1;
      } else {
        actionByGuest = this.selectedDiscussionPoint.actionByGuest;
      }

      try {
        response = await this.$axios.$put(
          `/meeting/${this.meetingObject.meetingId}/discussion/${this.selectedDiscussionPoint.minuteId}`,
          {
            projectId: this.projectId,
            description: description,
            remarks: remarks,
            actionBy: actionBy,
            actionByGuest: actionByGuest,
            dueDate: dueDate,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Discussion Point Successfully Updated";
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
        console.log("Error update discussion point", e);
      }
    },
    async addDiscussionPoint() {
      let response;
      try {
        response = await this.$axios.$post(
          `/meeting/discussion`,
          {
            projectId: this.projectId,
            meetingId: this.meetingObject.meetingId,
            description: this.discussionPointData.description,
            discussionPoint: this.discussionPointData.discussionPointCount,
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
        this.component = "success-popup";
        this.successMessage = "Discussion point added";
        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });

        if (this.discussionPointData.switch2) {
          this.taskTransition(response.data.minuteId);
        } else {
          this.$refs.discussionPointForm.reset();
          this.discussionPointData.description = "";
        }

        setTimeout(() => {
          this.close();
        }, 3000);
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
    async taskTransition(minuteId) {
      let taskResponse;
      try {
        taskResponse = await this.$axios.$post(
          `/meeting/${this.meetingObject.meetingId}/discussion/${minuteId}/transition`,
          {
            projectId: this.projectId,
            taskName: this.discussionPointData.taskName,
            taskInitiator: this.userId,
            taskAssignee: this.discussionPointData.actionBy,
            taskDueDate: this.discussionPointData.dueDate,
            issueType: "general",
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.component = "success-popup";
        this.successMessage = "Discussion point added";
        this.$store.dispatch("meetings/meeting/fetchDiscussionPoints", {
          meetingId: this.meetingObject.meetingId,
          // meetingId: '19a4edb0-0610-4fad-88f3-a3a01c141155',
          projectId: this.projectId,
        });
        this.$refs.discussionPointForm.reset();
        this.discussionPointData.description = "";

        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating task", e);
      }
    },
    resetDiscussionForm() {
      this.$refs.discussionPointForm.reset();
      this.discussionPointData.description = "";
    },
    async deleteDiscussionPoint() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/meeting/${this.meetingObject.meetingId}/discussion/${this.selectedDiscussionPoint.minuteId}?projectId=${this.projectId}`,
          {
            headers: {
              user: this.userId,
            },
          }
        );

        this.$store.dispatch("meetings/meeting/fetchSelectedMeeting", {
          meetingId: this.meetingObject.meetingId,
          projectId: this.projectId,
        });

        this.successMessage = "Discussion deleted successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error delete discuusion point", e);
      }
    },
    selectDiscussionPoint(discussion) {
      this.selectedDiscussionPoint = discussion;
    },
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

    remarks: {
      get() {
        return this.selectedDiscussionPoint.remarks;
      },
      set(value) {
        this.discussionPointEditedData.remarks = value;
      },
    },
    taskName: {
      set(value) {
        this.discussionPointEditedData.taskName = value;
      },
    },
    description: {
      get() {
        return this.selectedDiscussionPoint.description;
      },
      set(value) {
        this.discussionPointEditedData.description = value;
      },
    },

    discussionPointUpdatedCount: {
      get() {
        return this.selectedDiscussionPoint.discussionPoint;
      },
    },

    switchEdit1: {
      get() {
        return this.selectedDiscussionPoint.actionByGuest;
      },
      set(value) {
        this.discussionPointEditedData.switch1 = value;
      },
    },
    actionBy: {
      get() {
        this.discussionPointEditedData.switch1 = this.selectedDiscussionPoint.actionByGuest;

        if (this.selectedDiscussionPoint.dueDate == null) {
          this.discussionPointEditedData.dueDate = null;
        } else {
          this.discussionPointEditedData.dueDate = this.selectedDiscussionPoint.dueDate.substr(
            0,
            10
          );
        }
        return this.selectedDiscussionPoint.actionBy;
      },
      set(value) {
        this.discussionPointEditedData.actionBy = value;
      },
    },
    dueDate: {
      get() {
        this.discussionPointEditedData.dueDate = new Date(
          this.selectedDiscussionPoint.dueDate
        )
          .toISOString()
          .substr(0, 10);
        if (this.selectedDiscussionPoint.dueDate == null) {
          return null;
        } else {
          return new Date(this.selectedDiscussionPoint.dueDate)
            .toISOString()
            .substr(0, 10);
        }
      },
      set(value) {
        this.discussionPointEditedData.actionBy = value;
      },
    },

    discussionPointCount: {
      get() {
        this.discussionPointData.discussionPointCount =
          this.selectedMeeting.discussionPoints.length + 1;
        return this.selectedMeeting.discussionPoints.length + 1;
      },
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
