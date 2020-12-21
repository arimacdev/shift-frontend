<template>
  <div>
    <div class="body-div">
      <div class="tabSectionSupport">
        <v-tabs background-color="#151515" slider-size="3" dark>
          <v-tab
            class="tabInactiveStyle text-capitalize"
            active-class="adminTabTitleStyle text-capitalize"
            v-on:click="component = 'summary-tab'"
            >Summary</v-tab
          >
          <!-- <v-tab
            class="tabInactiveStyle text-capitalize"
            active-class="adminTabTitleStyle text-capitalize text-capitalize"
            v-on:click="component = 'request-tab'"
            >Requests</v-tab
          > -->
          <v-tab
            class="tabInactiveStyle text-capitalize"
            active-class="adminTabTitleStyle text-capitalize"
            v-on:click="component = 'users-tab'"
            @click="loadUsers()"
            >Users</v-tab
          >
        </v-tabs>
      </div>
    </div>

    <div class="componentContent">
      <component v-bind:is="component"></component>
    </div>
    <v-overlay :value="overlay" color="black" style="z-index: 1008">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Users from '~/components/support/users';
import Summary from '~/components/support/summary';
import Request from '~/components/support/request';
import Progress from '~/components/popups/progress';
export default {
  components: {
    'users-tab': Users,
    'summary-tab': Summary,
    'request-tab': Request,
    'progress-loading': Progress,
  },
  data() {
    return {
      overlay: false,
      component: 'summary-tab',
    };
  },
  methods: {
    loadUsers() {
      (this.overlay = true),
        Promise.all([
          this.$store.dispatch(
            'clients/clients/fetchSelectedClient',
            this.selectedSupportProject.clientId
          ),
          this.$store.dispatch(
            'support/support/fetchClientSupportUsers',
            this.selectedSupportProject.clientId
          ),
        ]).finally(() => {
          this.overlay = false;
        });
    },
  },
  computed: {
    ...mapState({
      selectedSupportProject: (state) =>
        state.support.support.seletedSupportProject,
    }),
  },
};
</script>
