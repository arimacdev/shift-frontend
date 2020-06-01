<template>
  <div class="top-nav">
    <navigation-drawer :user="user" />

    <v-toolbar app color dark fixed :clipped-left="clipped" class="toolBarFilter tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold">Admin</v-list-item-title>
            </v-list-item-content>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
      </div>
    </v-toolbar>

    <div class="body-div">
      <div class="workloadTypeSection">
        <v-tabs background-color="#0b0b53" dark>
          <v-tab v-on:click="component='my-workload' ">Users</v-tab>
          <v-tab v-on:click="component='org-workload'">Organization</v-tab>
        </v-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";

export default {
  components: {
    NavigationDrawer
  },
  created() {
    this.$store.dispatch("project/clearProject");
  }
};
</script>