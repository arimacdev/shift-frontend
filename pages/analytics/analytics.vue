<template>
  <div>
    <div
      v-if="organizationalRoles.indexOf('SUPER_ADMIN') > -1 ||
                  organizationalRoles.indexOf('WORKLOAD') > -1 ||
                  organizationalRoles.indexOf('ADMIN') > -1"
      class="top-nav"
    >
      <navigation-drawer :user="user" />

      <v-toolbar app color dark fixed :clipped-left="clipped" class="toolBarFilter tool-bar">
        <div class="title-div">
          <div class="name-div">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">Analytics</v-list-item-title>
              </v-list-item-content>

              <v-divider class="mx-4" inset vertical></v-divider>
            </v-list-item>
          </div>
        </div>
      </v-toolbar>

      <div class="body-div">
        <div class="workloadTypeSection">
          <v-tabs background-color="#151515" slider-size="3" dark>
            <v-tab
              class="tabInactiveStyle text-capitalize"
              active-class="adminTabTitleStyle text-capitalize"
              v-on:click="component = 'projects-tab'"
            >Projects</v-tab>
            <v-tab
              class="tabInactiveStyle text-capitalize"
              active-class="adminTabTitleStyle text-capitalize text-capitalize"
              v-on:click="component = 'tasks-tab'"
            >Tasks</v-tab>
            <v-tab
              class="tabInactiveStyle text-capitalize"
              active-class="adminTabTitleStyle text-capitalize"
              v-on:click="component = 'users-tab'"
            >Users</v-tab>
          </v-tabs>
        </div>
      </div>
      <div class="workloadV2Body">
        <component v-bind:is="component"></component>
      </div>
      <v-overlay :value="overlay" color="black" style="z-index:1008">
        <progress-loading />
      </v-overlay>
    </div>
    <div v-else>
      <div style="text-align: center">
        <v-row class="errorPageContainer">
          <v-col class="errorPageImage">
            <img
              align="center"
              height="100%"
              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1592549257245_Asset%202@4x.png"
              alt
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="errorPageText">
            <div class="errorMessage">Not Found!</div>
            <NuxtLink to="/" style="text-decoration: none">
              <v-btn small color="red" dark>Back to home</v-btn>
            </NuxtLink>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";
import Users from "~/components/analytics/usersSummary";
import Projects from "~/components/analytics/projectsSummary";
import Tasks from "~/components/analytics/tasksSummary";
import Progress from "~/components/popups/progress";

import { mapState, mapGetters } from "vuex";

export default {
  components: {
    NavigationDrawer,
    "users-tab": Users,
    "projects-tab": Projects,
    "tasks-tab": Tasks,
    "progress-loading": Progress,
  },
  data() {
    return {
      overlay: false,
      component: "projects-tab",
    };
  },
  computed: {
    ...mapState({
      organizationalRoles: (state) => state.user.organizationalRoles,
    }),
  },

  created() {
    this.overlay = true;
    Promise.all([
      //   initial API calls
    ]).finally(() => {
      this.overlay = false;
    });
  },
};
</script>
