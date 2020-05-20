<template>
  <div class="overviewBody overflow-y-auto">
    <div>
      <div class>
        <div class>
          <div class="filterSectionOverview">
            <v-row>
              <v-col md="3">
                <span class="overviewTitle">Workload Overview</span>
                <div style="margin-left: 20px; color: #576377">
                  <v-icon color="#78CF20" size="12">mdi-circle</v-icon>
                  <span style="font-size: 12px">Task Completed</span>
                  <v-icon color="#ED5F5F" size="12">mdi-circle</v-icon>
                  <span style="font-size: 12px">Task Remaining</span>
                </div>
              </v-col>
              <v-col md="4">
                <v-autocomplete
                  v-model="assignee"
                  return-object
                  :items="assigneeArray"
                  item-text="name"
                  item-value="id"
                  :search-input.sync="searchAssignee"
                  flat
                  solo
                  dense
                  chips
                  background-color="#FFFFFF"
                  small-chips
                  label="Assignee"
                  multiple
                  clearable
                  :clear-icon-cb="clearAssignee()"
                ></v-autocomplete>
              </v-col>
              <v-col md="4">
                <VueCtkDateTimePicker
                  :no-value-to-custom-elem="false"
                  color="#3f51b5"
                  v-model="dateRange"
                  label="Date Range"
                  range
                  left
                  noButton
                  autoClose
                  :clear-icon-cb="clearDate()"
                ></VueCtkDateTimePicker>
              </v-col>
            </v-row>
          </div>
          <div class="overflow-y-auto">
            <div class="graphDiv">
              <div class="overviewScrollingWrapper">
                <div class="workloadCard" v-for="(user, index) in taskWorkLoadUsers" :key="index">
                  <div class="progressCounter">{{ user.tasksCompleted + "/" + user.totalTasks}}</div>
                  <div class="overviewProgressSection">
                    <v-progress-linear
                      :value="(user.tasksCompleted/user.totalTasks)*100"
                      color="#78CF20"
                      background-color="#ED5F5F"
                      height="13"
                      reactive
                    >
                      <template></template>
                    </v-progress-linear>
                  </div>
                  <div class="graphNameField">
                    <v-divider></v-divider>
                    {{ user.firstName }}
                  </div>
                  <div class="overviewAvater">
                    <v-list-item-avatar>
                      <v-img v-if="user.profileImage != null" :src="user.profileImage"></v-img>
                      <v-img
                        v-else
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      ></v-img>
                    </v-list-item-avatar>
                  </div>
                </div>
              </div>
            </div>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <h1>sadasdsad</h1>
            <!-- <v-list-item-group>
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
                        <template></template>
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
            </v-list-item-group>-->
          </div>
        </div>
      </div>
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
      filterAssignee: [],
      assigneeArray: [],
      dateRange: new Date(),
      dateQuery: "",
      jqlQuery: "",
      assigneeQuery: "",
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
    },
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    }
  },
  methods: {
    loadAssignee(v) {
      let AssigneeSearchList = this.users;
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        this.assigneeArray.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          img: user.profileImage
        });
      }
    },
    clearAssignee() {
      this.assigneeQuery = "";
      this.jqlQuery = "";
    },
    clearDate() {
      this.dateQuery = "";
      this.jqlQuery = "";
    },
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
      taskWorkLoadUsers: state => state.workload.taskWorkLoadUsers,
      users: state => state.user.users,
      allProjects: state => state.project.projects
    }),
    assignee: {
      get() {
        this.loadAssignee();
      },
      set(value) {
        this.filterAssignee = value;
      }
    },
    project: {
      get() {
        this.loadProject();
      },
      set(value) {
        this.filterProject = value;
      }
    }
  }
};
</script>
