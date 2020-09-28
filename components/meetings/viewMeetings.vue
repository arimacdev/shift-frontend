<template>
  <div>
    <div
      style="margin-top: -50px"
      class="projectTabContent overflow-y-auto"
      v-if="this.isView"
    >
      <v-row>
        <v-col>
          <v-text-field
            :rules="defaultRules"
            v-model="keyFilter"
            outlined
            dense
            label="Filter By Key"
            @input="filterMeetings(true)"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="dateFilter"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :rules="defaultRules"
                outlined
                dense
                v-model="dateFilter"
                label="Filter By Date"
                prepend-inner-icon="mdi-calendar-outline"
                clearable
                @click:clear="
                  dateFilter = '';
                  filterMeetings(false);
                "
                v-bind="attrs"
                v-on="on"
                style="width: 100%"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateFilter" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.dialog.save(dateFilter);
                  filterMeetings(true);
                "
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="summaryTableDiv">
            <v-list-item
              dense
              style="background-color: #010101 !important"
              dark
            >
              <v-list-item-action>
                <span>##</span>
              </v-list-item-action>
              <v-list-item-content>
                <span>Date</span>
              </v-list-item-content>
              <v-list-item-content>
                <span>Topic</span>
              </v-list-item-content>
              <v-list-item-content>
                <span>Venue</span>
              </v-list-item-content>
              <v-list-item-content>
                <span>Chaired By</span>
              </v-list-item-content>
              <v-list-item-content>
                <span>Prepared By</span>
              </v-list-item-content>
              <v-list-item-icon> </v-list-item-icon>
              <v-list-item-icon> </v-list-item-icon>
              <v-list-item-icon> </v-list-item-icon>
            </v-list-item>

            <!-- ------ meetings items ------ -->

            <v-list-item-group>
              <v-list-item
                class="tableContentRecord"
                v-for="(meeting, index) in projectMeetings"
                :key="index"
              >
                <v-list-item-action>
                  <span>{{ index + 1 }}</span>
                </v-list-item-action>
                <v-list-item-content>
                  <span>{{
                    new Date(meeting.meetingActualTime)
                      .toISOString()
                      .substr(0, 10)
                  }}</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span>{{ meeting.meetingTopic }}</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span>{{ meeting.meetingVenue }}</span>
                </v-list-item-content>
                <v-list-item-content>
                  <span
                    ><span
                      v-for="(chair, index) in meeting.meetingChaired"
                      :key="index"
                      class="tableText"
                    >
                      {{ chair.firstName }}
                      <span v-if="index != meeting.meetingChaired.length - 1"
                        >/</span
                      >
                    </span></span
                  >
                </v-list-item-content>
                <v-list-item-content>
                  <span
                    ><span
                      v-for="(prepared, index) in meeting.meetingPrepared"
                      :key="index"
                      class="tableText"
                    >
                      {{ prepared.firstName }}
                      <span v-if="index != meeting.meetingPrepared.length - 1"
                        >/</span
                      >
                    </span></span
                  >
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon color="#0083E2">mdi-file-pdf-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-icon style="margin-left: 20px !important">
                  <v-icon
                    @click="
                      isView = false;
                      selectMeeting(meeting);
                    "
                    color="#66B25F"
                    >mdi-file-document-edit-outline</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-icon>
                  <v-icon
                    @click="
                      deleteMeetingDialog = true;
                      selectMeeting(meeting);
                    "
                    color="#E07857"
                    >mdi-delete-outline</v-icon
                  >
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </div>
        </v-col>
      </v-row>
      <div class="LoadMeetingButton text-center">
        <div v-if="projectMeetings == ''">No records to show</div>
        <v-btn
          v-if="projectMeetings != '' && !isMeetingLoaded"
          @click="loadMoreMeetings()"
          color="#ffffff"
          depressed
        >
          <span style="color: #576377" class="text-capitalize">Load More</span>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
      <v-dialog v-model="deleteMeetingDialog" max-width="350">
        <v-card style="text-align: center; padding-bottom: 25px">
          <v-card-title style="text-align: center">
            <v-spacer></v-spacer>Delete Meeting
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text
            >If you delete the meeting, all the details will be
            missing.</v-card-text
          >

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              depressed
              class="text-capitalize"
              width="100px"
              color="#FF6161"
              dark
              @click="deleteMeetingDialog = false"
              >Cancel</v-btn
            >

            <v-btn
              depressed
              class="text-capitalize"
              width="100px"
              color="#2EC973"
              dark
              @click="
                deleteMeetingDialog = false;
                deleteMeeting();
              "
              >Ok</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-overlay :value="overlay" color="black" style="z-index: 1008">
        <progress-loading />
      </v-overlay>
    </div>

    <div style="margin-top: -90px" v-else>
      <v-card-title style="font-size: 16px; font-weight: 700">
        <v-btn icon @click="isView = true"
          ><v-icon>mdi-chevron-left-circle-outline</v-icon></v-btn
        >Edit Meeting</v-card-title
      >
      <!-- <v-divider></v-divider> -->

      <edit-meeting :meetingObject="selectedMeeting" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Progress from '~/components/popups/progress';
import EditMeeting from '~/components/meetings/editMeeting';
export default {
  components: {
    'progress-loading': Progress,
    'edit-meeting': EditMeeting,
  },
  data() {
    return {
      isView: true,
      overlay: false,
      loadMore: 1,

      isFilter: false,
      filterKey: '',
      filterDate: '',

      selectedMeeting: {},
      modal: false,
      dateFilter: '',
      keyFilter: '',
      deleteMeetingDialog: false,
      editMeetingDialog: false,

      userId: this.$store.state.user.userId,
    };
  },
  methods: {
    filterMeetings(isFilter) {
      this.loadMore = 0;
      this.isFilter = isFilter;
      this.overlay = true;

      if (this.dateFilter == null) {
        this.dateFilter = '';
      }
      if (this.dateFilter == '' && this.keyFilter == '') {
        this.isFilter = false;
        this.loadMore = 0;
      }

      Promise.all([
        this.$store.dispatch('meetings/meeting/emptyMeetingStore'),

        this.$store.dispatch('meetings/meeting/fetchProjectMeetings', {
          projectId: this.projectId,
          startIndex: this.loadMore * 10,
          endIndex: this.loadMore * 10 + 10,
          filter: this.isFilter,
          key: this.keyFilter,
          date: this.dateFilter,
        }),
      ]).finally(() => {
        (this.loadMore = this.loadMore + 1), (this.overlay = false);
      });
    },
    loadMoreMeetings() {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch('meetings/meeting/fetchProjectMeetings', {
          projectId: this.projectId,
          startIndex: this.loadMore * 10,
          endIndex: this.loadMore * 10 + 10,
          filter: this.isFilter,
          key: this.keyFilter,
          date: this.dateFilter,
        }),
      ]).finally(() => {
        this.overlay = false;
        this.loadMore = this.loadMore + 1;
      });
    },
    selectMeeting(meeting) {
      this.selectedMeeting = meeting;
      this.$store.dispatch('meetings/meeting/fetchSelectedMeeting', {
        meetingId: meeting.meetingId,
        // meetingId: '19a4edb0-0610-4fad-88f3-a3a01c141155',
        projectId: this.projectId,
      });
    },
    async deleteMeeting() {
      this.$store.dispatch('meetings/meeting/emptyMeetingStore'),
        (this.loadMore = 1);
      let response;
      try {
        response = await this.$axios.$delete(
          `/meeting/${this.selectedMeeting.meetingId}?projectId=${this.projectId}`,
          {
            headers: {
              user: this.userId,
            },
          }
        );

        this.$store.dispatch('meetings/meeting/fetchProjectMeetings', {
          projectId: this.projectId,
          startIndex: 0,
          endIndex: 10,
          filter: this.isFilter,
          key: this.keyFilter,
          date: this.dateFilter,
        });

        this.successMessage = 'Meeting deleted successfully';
        this.component = 'success-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log('Error creating project', e);
      }
    },
  },
  computed: {
    ...mapState({
      projectId: (state) => state.project.project.projectId,
      projectMeetings: (state) => state.meetings.meeting.projectMeetings,
      isMeetingLoaded: (state) => state.meetings.meeting.isMeetingLoaded,
    }),
  },
};
</script>
