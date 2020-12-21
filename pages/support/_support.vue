<template>
  <div>
    <div
      v-if="
        organizationalRoles.indexOf('SUPER_ADMIN') > -1 ||
          organizationalRoles.indexOf('ADMIN') > -1
      "
      class="top-nav"
    >
      <navigation-drawer />

      <v-toolbar color dark fixed class="tool-bar">
        <div class="title-div">
          <div class="name-div">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold"
                  >Service Desk</v-list-item-title
                >
              </v-list-item-content>

              <v-divider class="mx-4" inset vertical></v-divider>
            </v-list-item>
          </div>
        </div>
      </v-toolbar>

      <div class="projectListUserSupport">
        <v-list-item-group>
          <div
            class="projectListView overflow-y-auto"
            style="padding-left: 20px; padding-right: 5px; padding-top: 20px"
          >
            <div
              style="margin-bottom: 15px; margin-left: 15px"
              class="grey--text text--darken-2 font-weight-bold titles"
            >
              Support Projects
            </div>
            <div v-for="(project, index) in allProjects" :key="index">
              <div>
                <v-list-item
                  @click="selectProject(project)"
                  class="selectedProjectPanel"
                  :to="project.project"
                >
                  <v-list-item-action>
                    <v-icon size="17" color="blue">icon-project</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="fontRestructure12">
                      {{ project.projectName }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </div>
          </div>
        </v-list-item-group>
      </div>
      <div>
        <component v-bind:is="component"></component>
      </div>

      <v-overlay :value="overlay" color="black" style="z-index: 1008">
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
import NavigationDrawer from '~/components/navigationDrawer';
import Users from '~/components/support/users';
import Summary from '~/components/support/summary';
import Progress from '~/components/popups/progress';
import Request from '~/components/support/request';

import Tabs from '~/components/support/tabSection';

import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    NavigationDrawer,
    'users-tab': Users,
    'summary-tab': Summary,
    'request-tab': Request,
    'progress-loading': Progress,
    'tab-section': Tabs,
  },
  data() {
    return {
      overlay: false,
      component: '',
      projectId: '',
    };
  },
  methods: {
    selectProject(project) {
      // this.$router.push(project.project);
    },
  },
  computed: {
    ...mapState({
      organizationalRoles: (state) => state.user.organizationalRoles,
      allProjects: (state) => state.support.support.supportProjects,
      selectedSupportProject: (state) =>
        state.support.support.seletedSupportProject,
    }),
  },

  created() {
    this.projectId = this.$route.params.support;

    if (this.projectId != 'support') {
      this.overlay = true;
      this.component = 'tab-section';
      Promise.all([
        this.$store.dispatch(
          'support/support/addSelectedProject',
          this.projectId
        ),
        this.$store.dispatch(
          'support/support/fetchProjectSupportMembers',
          this.projectId
        ),
        this.$store.dispatch(
          'support/support/fetchExternalSupportUsers',
          this.projectId
        ),
        this.$store.dispatch(
          'support/support/fetchProjectStats',
          this.projectId
        ),
        this.$store.dispatch('support/support/fetchSupportMembers'),
        this.$store.dispatch('support/support/emptyStore'),
        this.$store.dispatch('support/support/fetchProjectTickets', {
          projectId: this.projectId,
          startIndex: 0,
          endIndex: 10,
        }),
        //     this.$store.dispatch(
        //   'clients/clients/fetchSelectedClient',
        //   this.selectedSupportProject.clientId
        // ),
        // this.$store.dispatch(
        //   'support/support/fetchClientSupportUsers',
        //   this.selectedSupportProject.clientId
        // ),
      ]).finally(() => {
        this.overlay = false;
      });
    } else {
      this.component = '';
    }
    this.overlay = true;
    Promise.all([
      this.$store.dispatch('support/support/fetchSupportProjects'),
    ]).finally(() => {
      this.overlay = false;
    });
  },
};
</script>
