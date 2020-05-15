<template>
  <div>
    <div class="top-nav">
      <navigation-drawer :user="user" />

      <v-toolbar app color dark fixed :clipped-left="clipped" class="tool-bar">
        <div class="title-div">
          <div class="name-div">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">Workload</v-list-item-title>
              </v-list-item-content>

              <v-divider class="mx-4" inset vertical></v-divider>
            </v-list-item>
          </div>
        </div>
      </v-toolbar>

      <div class="body-div">
        <div class="workloadSideBar">
          <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="states"
            item-text="name"
            item-value="id"
            :search-input.sync="search"
            cache-items
            class="mx-4 searchBar"
            flat
            dark="true"
            hide-no-data
            hide-details
            hide-selected="true"
            append-icon
            prepend-inner-icon="mdi-magnify"
            label="Type a Name to search"
            outlined
            @change="onSelectUser()"
            clearable
          ></v-autocomplete>

          <div class="listView overflow-y-auto">
            <v-list-item-group>
              <div v-for="(user, index) in taskWorkLoadUsers" :key="index">
                <v-list-item @click="selectUser(user)" class="workloadListItem">
                  <v-list-item-avatar>
                    <v-img v-if="user.profileImage != null" :src="user.profileImage"></v-img>
                    <v-img
                      v-else
                      src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      @click="selectUser(user)"
                      v-on:click="component='view-user'"
                      class="body-2"
                    >{{ user.firstName }} {{ user.lastName}}</v-list-item-title>
                  </v-list-item-content>
                  <v-divider vertical inset class="workloadDivider"></v-divider>
                  <v-list-item-content>
                    <v-task-title
                      class="workloadCompletedStatus"
                    >{{ user.tasksCompleted + "/" + user.totalTasks + " Tasks completed"}}</v-task-title>

                    <v-list-item-subtitle class="workloadProgressLine">
                      <v-progress-linear
                        :value="(user.tasksCompleted/user.totalTasks)*100"
                        color="#2EC973"
                        background-color="red"
                        height="8"
                        rounded
                        reactive
                      >
                        <!-- <template v-slot="{ value }"> -->
                        <template>
                          <!-- <span class="presentageValue">{{ Math.ceil(value) }}%</span> -->
                        </template>
                      </v-progress-linear>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <div
                    v-if="(user.tasksCompleted/user.totalTasks)*100 < 25"
                    class="progressColorCode progressBad"
                  ></div>
                  <div
                    v-else-if="(user.tasksCompleted/user.totalTasks)*100 >= 25 && (user.tasksCompleted/user.totalTasks)*100 < 75 "
                    class="progressColorCode progressFair"
                  ></div>
                  <div
                    v-else-if="(user.tasksCompleted/user.totalTasks)*100 >= 75"
                    class="progressColorCode progressGood"
                  ></div>
                  <div v-else-if="user.totalTasks == 0" class="progressColorCode progressNoWorks"></div>
                </v-list-item>
                <v-divider class="mx-4"></v-divider>
              </div>
            </v-list-item-group>
          </div>
        </div>
      </div>

      <div class="workLoadTitleDiv workloadBody">
        <!-- <v-list-item-title class="hi" v-if="this.userData.firstName == null"> -->
        <v-list-item-title class="hi" v-if="!this.firstName">Select a person</v-list-item-title>
        <v-list-item-title v-else>{{ this.firstName}} {{ this.lastName }}</v-list-item-title>
      </div>
      <v-divider></v-divider>

      <!-- -------------- component of the content ----------- -->

      <!-- <workload-content v-if="this.userData.firstName != null" /> -->
      <!-- <workload-content v-if="this.userData.firstName != null" /> -->
      <workload-content v-if="this.firstName" :selectedUser="selectedUser" />
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