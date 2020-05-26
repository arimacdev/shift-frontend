<template>
  <div class="top-nav">
    <navigation-drawer :user="user" />
    <v-toolbar app color dark fixed class="tool-bar">
      <div class="title-div">
        <div class="task-name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Tasks</v-list-item-title>
            </v-list-item-content>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
        <div class="task-content-div">
          <!-- <v-list-item-title v-if="this.project.projectName == null " class="font-weight-bold">Select a project</v-list-item-title>
          <v-list-item-title v-else class="font-weight-bold">Task group</v-list-item-title>-->
          <v-list-item-title
            v-if="this.component == 'personal-tasks'"
            class="font-weight-bold"
          >My personal Tasks</v-list-item-title>
          <v-list-item-title v-else class="font-weight-bold">{{ this.group.taskGroupName }}</v-list-item-title>
          <!-- <v-list-item-title v-else class="font-weight-bold">{{ groupname }}</v-list-item-title> -->
        </div>
      </div>
    </v-toolbar>

    <div class="pageBody">
      <div class="groupTasksList">
        <task-search-bar :groups="groups" @searchGroupSelected="viewSearchGroupComponent" />

        <div class="listView overflow-y-auto">
          <v-list-item-group active-class>
            <div>
              <div v-on:click="component='personal-tasks'">
                <v-list-item class="tasksListItem">
                  <v-list-item-action>
                    <v-icon size="20" color="#FFFFFF">mdi-calendar-blank-multiple</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="taskListName">My personal tasks</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>

              <!-- task input field  -->
              <v-text-field
                label="Add a new group"
                v-model="groupName"
                outlined
                background-color="#FFFFFF"
                prepend-inner-icon="mdi-plus-circle"
                color="#0BAFFF"
                class="addGroupListTextBox"
                @keyup.enter="addGroup"
              ></v-text-field>

              <!-- group list -->
            </div>

            <div>
              <div v-for="(group, index) in groups" :key="index">
                <v-list-item
                  class="groupsListItem"
                  active-class="activeGroupList"
                  @click="selectGroup(group)"
                >
                  <v-list-item-action class="active">
                    <v-icon size="20" class="groupListElement">mdi-calendar-blank-multiple</v-icon>
                  </v-list-item-action>
                  <v-list-item-content class="active">
                    <v-list-item-title class="groupListName">{{ group.taskGroupName }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action class="active">
                    <v-icon size="15" class="groupListElement">mdi-account-group-outline</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </div>
            </div>
          </v-list-item-group>
        </div>
      </div>
      <component
        :users="users"
        :completionTasks="completionTasks"
        :group="group"
        :groupTasks="groupTasks"
        v-bind:is="component"
      ></component>
    </div>
    <v-overlay :value="overlay">
      <progress-loading />
    </v-overlay>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";
import TaskSearchBar from "~/components/tools/taskSearchBar";
import PersonalTasks from "~/components/tasksPage/personalTasks";
import GroupTasks from "~/components/tasksPage/groupTasks";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
import axios from "axios";

export default {
  async asyncData({ $axios, app, store }) {
    let userId = store.state.user.userId;
    const { data: users } = await $axios.$get("/users");
    // console.log("users list", users);
    return {
      users: users
    };
  },

  components: {
    NavigationDrawer,
    "task-search-bar": TaskSearchBar,
    "personal-tasks": PersonalTasks,
    "group-tasks": GroupTasks,
    "progress-loading": Progress
  },

  data() {
    return {
      overlay: false,
      component: "personal-tasks",
      groupName: "",
      userId: this.$store.state.user.userId,
      // groups: [],
      group: {},
      users: [],
      groupTasks: [],
      completionTasks: []
    };
  },
  async created() {
    this.$store.dispatch("groups/group/fetchMyGroups");
    this.$store.dispatch("project/clearProject");
  },

  computed: {
    ...mapState({
      groups: state => state.groups.group.myGroups
    })
  },
  methods: {
    viewSearchGroupComponent(group) {
      this.group = group;
      this.component = "group-tasks";

      this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
        taskGroupId: this.group.taskGroupId,
        userId: this.userId
      });

      this.$store.dispatch("groups/groupPeople/fetchGroupPeople", {
        taskGroupId: this.group.taskGroupId,
        userId: this.userId
      });
    },
    async selectGroup(group) {
      this.component = "group-tasks";
      this.group = group;

      this.$store.dispatch("groups/groupTask/fetchGroupTasks", {
        taskGroupId: this.group.taskGroupId,
        userId: this.userId
      });

      this.$store.dispatch("groups/groupPeople/fetchGroupPeople", {
        taskGroupId: this.group.taskGroupId,
        userId: this.userId
      });
    },

    async addGroup() {
      this.overlay = true;
      console.log("add group");
      this.$store.dispatch("groups/group/addGroup", this.groupName);

      this.groupName = "";
      this.overlay = false;
    }
  }
};
</script>