<template>
  <div class="requestViewContentSupport overflow-y-auto">
    <v-row>
      <v-list-item-title class="summaryNameTitle">{{
        selectedSupportProject
      }}</v-list-item-title>
      <v-list-item-subtitle class="summaryNameSubTitle"
        >Dialog Axiata PVT LTD</v-list-item-subtitle
      >
    </v-row>
    <v-row class="statRow">
      <div class="projectTopSection">
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #DC8343">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 10px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#DC8343" size="17">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Total Requests</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  supportProjectStats.allRequests
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #66B25F">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 10px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#66B25F" size="17">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Requests Resolved</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  supportProjectStats.resolvedRequests
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <div class="statDisplay">
          <div class="leadsContentDiv" style="background-color: #FFBD00">
            <v-list-item>
              <v-list-item-icon
                style="
                  background-color: #ffffff;
                  padding: 10px;
                  border-radius: 50%;
                "
              >
                <v-icon color="#FFBD00" size="17">icon-project</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="leadsSubTitle"
                  >Request Pending</v-list-item-subtitle
                >
                <v-list-item-title class="leadsTitle">{{
                  supportProjectStats.pendingRequests
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>
    </v-row>
    <v-row class="requestRow">
      <div class="requestMessageText">
        <v-btn width="150px" color="#E07857" dark depressed>Open</v-btn>

        <v-btn width="150px" color="#E07857" dark depressed>All</v-btn>

        <v-btn width="150px" color="#E07857" dark depressed>Closed</v-btn>
      </div>
    </v-row>
    <v-row>
      <v-col md="9"><v-text-field outlined flat dense></v-text-field></v-col>
      <v-col md="3"
        ><v-btn dark depressed color="#66B25F">Add New Request</v-btn></v-col
      >
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState({
      selectedSupportProject: (state) =>
        state.support.support.seletedSupportProject,
      supportProjectStats: (state) => state.support.support.supportProjectStats,
    }),
  },
};
</script>
