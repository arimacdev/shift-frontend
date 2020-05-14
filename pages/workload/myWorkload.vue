<template>
  <div>
    <div class="top-nav">
      <navigation-drawer :user="user" />

      <v-toolbar app color dark fixed :clipped-left="clipped" class="tool-bar">
        <div class="title-div">
          <div class="name-div">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">My Workload</v-list-item-title>
              </v-list-item-content>

              <v-divider class="mx-4" inset vertical></v-divider>
            </v-list-item>
          </div>
        </div>
      </v-toolbar>

      <div class="body-div"></div>

      <div class="workLoadTitleDiv myWorkloadBody">
        <!-- <v-list-item-title class="hi" v-if="this.userData.firstName == null"> -->
        <v-list-item-title class="hi" v-if="!this.firstName"></v-list-item-title>
      </div>
      <v-divider></v-divider>

      <!-- -------------- component of the content ----------- -->

      <workload-content :selectedUser="selectedUser" />
    </div>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";
import usersSearchBar from "~/components/tools/usersSearchBar";
import WorkloadContent from "~/components/workload/workloadContent";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    NavigationDrawer,
    "workload-content": WorkloadContent
  },
  data() {
    return {
      userId: this.$store.state.user.userId,
      component: "add-user",
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
  methods: {},
  computed: {
    ...mapState({
      taskWorkLoadUsers: state => state.workload.taskWorkLoadUsers
    })
  },
  created: function() {
    this.selectedUser = this.userId;
    this.$store.dispatch("workload/fetchAllWorkloadTasks", {
      userId: this.userId,
      from: "all",
      to: "all"
    });
  }
};
</script>