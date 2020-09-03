<template>
  <div class="top-nav">
    <navigation-drawer :user="user" />

    <v-toolbar
      app
      color
      dark
      fixed
      :clipped-left="clipped"
      class="toolBarFilter tool-bar"
    >
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Analytics</v-list-item-title
              >
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
            >Projects</v-tab
          >
          <v-tab
            class="tabInactiveStyle text-capitalize"
            active-class="adminTabTitleStyle text-capitalize text-capitalize"
            v-on:click="component = 'tasks-tab'"
            >Tasks</v-tab
          >
          <v-tab
            class="tabInactiveStyle text-capitalize"
            active-class="adminTabTitleStyle text-capitalize"
            v-on:click="component = 'users-tab'"
            >Users</v-tab
          >
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
</template>
<script>
import NavigationDrawer from '~/components/navigationDrawer';
import Users from '~/components/analytics/usersSummary';
import Projects from '~/components/analytics/projectsSummary';
import Tasks from '~/components/analytics/tasksSummary';
import Progress from '~/components/popups/progress';

export default {
  components: {
    NavigationDrawer,
    'users-tab': Users,
    'projects-tab': Projects,
    'tasks-tab': Tasks,
    'progress-loading': Progress,
  },
  data() {
    return {
      overlay: false,
      component: 'projects-tab',
    };
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
