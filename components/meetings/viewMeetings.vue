<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          :rules="defaultRules"
          v-model="keyFilter"
          outlined
          dense
          label="Filter By Key"
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
              readonly
              v-bind="attrs"
              v-on="on"
              style="width: 100%"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateFilter" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(dateFilter)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="summaryTableDiv">
          <v-list-item dense style="background-color: #010101 !important" dark>
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
              <span>Venu</span>
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
                <v-icon>mdi-file-pdf-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-icon>
                <v-icon>mdi-file-pdf-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-icon>
                <v-icon>mdi-file-pdf-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      modal: false,
      dateFilter: "",
      keyFilter: "",
    };
  },
  computed: {
    ...mapState({
      projectId: (state) => state.project.project.projectId,
      projectMeetings: (state) => state.meetings.meeting.projectMeetings,
    }),
  },
};
</script>