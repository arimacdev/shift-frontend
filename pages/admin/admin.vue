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
                >Admin</v-list-item-title
              >
            </v-list-item-content>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
      </div>
    </v-toolbar>

    <div class="body-div">
      <div class="workloadTypeSection">
        <v-tabs background-color="#0b0b53" slider-size="3" dark>
          <v-tab
            class="tabInactiveStyle"
            active-class="adminTabTitleStyle"
            v-on:click="component = 'users-tab'"
            >Users</v-tab
          >
          <v-tab
            class="tabInactiveStyle"
            active-class="adminTabTitleStyle"
            v-on:click="component = 'skills-tab'"
            >Skills</v-tab
          >
          <v-tab
            class="tabInactiveStyle"
            active-class="adminTabTitleStyle"
            v-on:click="component = 'organization-tab'"
            >Organization</v-tab
          >
        </v-tabs>
      </div>
    </div>

    <div class="workloadV2Body">
      <component v-bind:is="component"></component>
    </div>
  </div>
</template>
<script>
import NavigationDrawer from '~/components/navigationDrawer';
import Users from '~/components/admin/users';
import Organization from '~/components/admin/organization';

import Skills from '~/components/admin/skills';

export default {
  components: {
    NavigationDrawer,
    'users-tab': Users,
    'organization-tab': Organization,
    'skills-tab': Skills,
  },
  data() {
    return {
      component: 'users-tab',
    };
  },
  async asyncData({ $axios, store }) {
    let userId = store.state.user.userId;
    const { data: projects } = await $axios.$get(`/projects?userId=${userId}`);
    const { data: users } = await $axios.$get('/users');
    const sorted = users.sort((a, b) => {
      const userA = a.firstName.toUpperCase();
      const userB = b.firstName.toUpperCase();

      if (userA < userB) return -1;
      if (userA > userB) return 1;

      return 0;
    });
    // console.log(projects);
    // console.log(users);
    return {
      projects: projects,
      users: users,
      name: users[0].userId,
    };
  },
  created() {
    this.$store.dispatch('user/setAllUsers');
    this.$store.dispatch('project/clearProject');
    this.$store.dispatch('skillMatrix/fetchSkillCategory');
  },
};
</script>
