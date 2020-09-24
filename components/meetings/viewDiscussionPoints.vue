<template>
  <v-card flat>
    <span class="pointFormHeader">Discussion Points</span>
    <v-card outlined class="discussionPointCardStyle">
      <v-row class="sideByRow">
        <v-col md="3">
          <!--discussionPoints -->
          <v-text-field
            value="30"
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
              input-value="true"
              readonly
              label="Action by guest"
            ></v-switch>
          </div>
        </v-col>
        <v-col md="6">
          <!--actionBy -->
          <v-text-field
            value="Buddhika Priyabhashana"
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
            value="2020-10-10"
            label="Date"
            prepend-inner-icon="mdi-calendar-outline"
            readonly
            style="width: 100%"
          ></v-text-field>
        </v-col>
        <v-col>
          <!--remarks -->
          <v-text-field
            value="Arimac"
            outlined
            dense
            readonly
            label="Remarks"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div
            class="htmlViewDiv"
            v-html="'<p>This <strong>is a </strong><em>Description</em></p>'"
          ></div>
        </v-col>
      </v-row>
    </v-card>
    {{ discussionPoints }}
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
