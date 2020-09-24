<template>
  <v-card flat>
    <span class="pointFormHeader">Discussion Points</span>
    <v-card
      v-for="(discussion, index) in discussionPoints"
      :key="index"
      outlined
      class="discussionPointCardStyle"
    >
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
        </v-col>
      </v-row>
      <v-row class="sideByRow">
        <v-col>
          <v-text-field
            outlined
            dense
            :value="new Date(discussion.dueDate).toISOString().substr(0, 10)"
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
        v-if="discussion.description != '' && discussion.description != null"
      >
        <v-col>
          <div class="htmlViewDiv" v-html="discussion.description"></div>
        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      discussionPoints: (state) => state.meetings.meeting.discussionPoints,
    }),
  },
};
</script>
