<template>
  <div class="requestViewContentSupport overflow-y-auto">
    <v-row>
      <v-list-item-title class="summaryNameTitle">{{
        selectedSupportProject.projectName
      }}</v-list-item-title>
      <v-list-item-subtitle
        v-if="selectedClient != null && selectedClient != ''"
        :value="loadClient"
        class="summaryNameSubTitle"
        >{{ selectedClient.organizationName }}</v-list-item-subtitle
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
    <v-row>
      <v-simple-table style="width:100%">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                Created
              </th>
              <th class="text-center">
                Ticket
              </th>
              <th class="text-center">
                Reporter
              </th>

              <th class="text-center">
                Status
              </th>
              <th class="text-center">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(ticket, index) in projectTickets"
              :key="index"
              @click="
                selectTicket(ticket);
                viewTicketDialog = true;
              "
              style="cursor: pointer"
            >
              <td class="text-center">
                {{ getDisplayDate(ticket.ticketCreation) }}
              </td>
              <td class="text-center">{{ ticket.issueTopic }}</td>
              <td class="text-center">
                {{ ticket.reporter.firstName }} {{ ticket.reporter.lastName }}
              </td>
              <td v-if="ticket.serviceAssignee == null" class="text-center">
                <v-icon size="12">mdi-circle-outline</v-icon>
                Pending
              </td>
              <td
                v-else-if="
                  getDisplayStatus(ticket.ticketStatus) == 'ACKNOWLEDGED'
                "
                class="text-center"
              >
                <v-icon size="12" color="#FFBD00">mdi-circle</v-icon>
                Acknowledged by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="getDisplayStatus(ticket.ticketStatus) == 'CLOSED'"
                class="text-center"
              >
                <v-icon size="12" color="#66B25F">mdi-circle</v-icon>
                Closed by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="getDisplayStatus(ticket.ticketStatus) == 'FIXED'"
                class="text-center"
              >
                <v-icon size="12" color="#66B25F">mdi-circle</v-icon>
                Fixed by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td
                v-else-if="getDisplayStatus(ticket.ticketStatus) == 'SOLVED'"
                class="text-center"
              >
                <v-icon size="12" color="#66B25F">mdi-circle</v-icon>
                Solved by
                {{ ticket.serviceAssignee.firstName }}
                {{ ticket.serviceAssignee.lastName }}
              </td>
              <td class="text-center">
                {{ getDisplayDate(ticket.ticketCreation) }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      userId: this.$store.state.user.userId,
    };
  },
  methods: {
    getDisplayDate(date) {
      let stringDate = date + '';
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);
      return stringDate;
    },
    getDisplayStatus(status) {
      if (status === 'PENDING') {
        return 'Pending';
      } else if (status === 'ACKNOWLEDGED') {
        return 'Acknowledged';
      } else if (status === 'CLOSED') {
        return 'Closed';
      } else if (status === 'FIXED') {
        return 'Fixed';
      } else if (status === 'SOLVED') {
        return 'Solved';
      } else {
        return 'otherStatus';
      }
    },
  },
  created() {},
  computed: {
    ...mapState({
      selectedSupportProject: (state) =>
        state.support.support.seletedSupportProject,
      supportProjectStats: (state) => state.support.support.supportProjectStats,

      selectedClient: (state) => state.clients.clients.selectedClient,
      projectTickets: (state) => state.support.support.projectTickets,
    }),
    loadClient() {
      this.$store.dispatch(
        'clients/clients/fetchSelectedClient',
        this.selectedSupportProject.clientId
      );
    },
  },
};
</script>
