<template>
  <div>
    <div class="top-nav">
      <navigation-drawer :user="user" />

      <v-toolbar app color dark fixed :clipped-left="clipped" class="tool-bar">
        <div class="title-div">
          <div class="name-div">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">Workload - ADMIN</v-list-item-title>
              </v-list-item-content>

              <v-divider class="mx-4" inset vertical></v-divider>
            </v-list-item>
          </div>
        </div>
      </v-toolbar>

      <div class="body-div">
        <div class="workloadTypeSection">
          <v-tabs background-color="#0b0b53" dark>
            <v-tab v-on:click="component='my-workload'">My Workload</v-tab>
            <v-tab v-on:click="component='org-workload'">Organizational Workload</v-tab>
          </v-tabs>
        </div>
      </div>

      <div class="workloadV2Body">
        <component v-bind:is="component"></component>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";
import usersSearchBar from "~/components/tools/usersSearchBar";
import WorkloadContent from "~/components/workload/workloadContent";

import MyWorkload from "~/components/workload/myWorkload";
import OrgWorkload from "~/components/workload/orgWorkload";

import { mapState, mapGetters } from "vuex";

export default {
  components: {
    NavigationDrawer,
    "workload-content": WorkloadContent,
    "my-workload": MyWorkload,
    "org-workload": OrgWorkload
  },
  data() {
    return {
      component: "my-workload",
      userId: this.$store.state.user.userId,
      workLoad: {},
      userData: {},
      firstName: "",
      lastName: "",
      selectedUser: "",
      skill: "",
      search: null,
      select: {},
      states: [],
      drawer: null
    };
  },

  created() {
    this.$store.dispatch("workload/fetchAllTaskLoadUsers");
    this.$store.dispatch("project/clearProject");
  },

  watch: {
    search(val) {
      console.log("value is ", val);
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    onSelectUser() {
      console.log("details", this.select);
      if (this.select !== undefined) {
        // this.userData.firstName = this.select.firstName;
        // this.userData.lastName = this.select.lastName;
        this.firstName = this.select.firstName;
        this.lastName = this.select.lastName;
        this.selectedUser = this.select.userId;
        //  if(this.select.totalTasks != 0){
        this.$store.dispatch("workload/fetchAllWorkloadTasks", {
          userId: this.select.userId,
          from: "all",
          to: "all"
        });
        //  } else {
        //    this.$store.dispatch('workload/clearWorkLoadTasks');
        //    this.$store.dispatch('workload/loadWorkLoadTask',this.select.userId);
        //  }
      }
    },
    async selectUser(userData) {
      // this.userData = userData;
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      console.log("check", userData);
      this.selectedUser = userData.userId;
      // if(userData.totalTasks != 0){
      this.$store.dispatch("workload/fetchAllWorkloadTasks", {
        userId: userData.userId,
        from: "all",
        to: "all"
      });
      // } else {
      //   this.$store.dispatch('workload/clearWorkLoadTasks');
      //   this.$store.dispatch('workload/loadWorkLoadTask',userData.userId);
      // }
    },
    querySelections(v) {
      let projectSearchList = this.taskWorkLoadUsers;
      for (let index = 0; index < projectSearchList.length; ++index) {
        let user = projectSearchList[index];
        this.states.push({
          name: user.firstName + " " + user.lastName,
          id: user
        });
      }
      // console.log("usersList for search bar", this.taskWorkLoadUsers, "nameList", this.states)
      this.loading = true;
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      });
      this.loading = false;
    }
  },
  computed: {
    ...mapState({
      taskWorkLoadUsers: state => state.workload.taskWorkLoadUsers
    })
  }
};
</script>