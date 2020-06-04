<template>
  <div class="top-nav">
    <navigation-drawer />

    <v-toolbar color dark fixed class="tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Projects</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="organizationalRoles.indexOf('ADMIN') > -1 || organizationalRoles.indexOf('SUPER_ADMIN') > -1 || organizationalRoles.indexOf('WORKLOAD') > -1">
              <button v-on:click="component = 'add-project'">
                <v-icon @click="createNewProject">mdi-plus-circle</v-icon>
              </button>
            </v-list-item-icon>
            <v-list-item-icon v-else>
              <!-- <button v-on:click="component='add-project'"><v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon></button> -->
            </v-list-item-icon>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
        <div class="content-div">
          <v-list-item-title
            v-if="this.newProject == true"
            class="font-weight-bold"
          >Create a project</v-list-item-title>

          <v-list-item-title
            v-else-if="this.$route.params.projects == 'projects'"
            class="font-weight-bold"
          >Select a project</v-list-item-title>
          <v-list-item-title v-else class="font-weight-bold">{{ this.fetchProject.projectName }}</v-list-item-title>
        </div>
      </div>
    </v-toolbar>

    <div class="pageBody">
      <div class="project-list">
        <search-bar :projects="allProjects" @selectSearched="selectProject" />
        <v-list-item-group>
          <div class="listView overflow-y-auto">
            <!-- --------------- Pre sales loop ----------- -->
            <v-divider class="mx-4"></v-divider>
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Presales</v-toolbar-title>

            <div
              v-for="(project, index) in getProjects('presales')"
              :key="'preSales' + index"
              @click="selectProject(project)"
            >
              <v-list-item
                class="selectedProject"
                v-if="
                  project.projectStatus == 'presalesPD' ||
                    project.projectStatus == 'preSalesQS' ||
                    project.projectStatus == 'preSalesN' ||
                    project.projectStatus == 'preSalesC' ||
                    project.projectStatus == 'preSalesL' ||
                    project.projectStatus == 'presales'
                "
                v-on:click="component = 'tab-views'"
                :to="project.projectId"
              >
                <v-list-item-action>
                  <v-icon size="17" color="deep-orange lighten-1">icon-project</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
                  <v-list-item-subtitle
                    v-if="project.projectStatus == 'presalesPD'"
                    class="projectSubtitle"
                  >(Project discovery)</v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-if="project.projectStatus == 'preSalesQS'"
                    class="projectSubtitle"
                  >(Quotation submission)</v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-if="project.projectStatus == 'preSalesN'"
                    class="projectSubtitle"
                  >(Negotiation)</v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-if="project.projectStatus == 'preSalesC'"
                    class="projectSubtitle"
                  >(Confirm)</v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-if="project.projectStatus == 'preSalesL'"
                    class="projectSubtitle"
                  >(Lost)</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- <v-divider class="mx-4"></v-divider> -->
            </div>

            <v-divider class="mx-4"></v-divider>

            <!-- --------------- ongoing  ----------- -->
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Ongoing</v-toolbar-title>

            <div
              v-for="(project, index) in getProjects('ongoing')"
              :key="'ongoing' + index"
              v-on:click="component = 'tab-views'"
              @click="selectProject(project)"
            >
              <v-list-item :to="project.projectId">
                <v-list-item-action>
                  <v-icon size="17" color="#FFC212">icon-project</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-divider class="mx-4"></v-divider> -->
            </div>

            <!-- --------------- Support  ----------- -->
            <v-divider class="mx-4"></v-divider>
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Support</v-toolbar-title>

            <div
              v-for="(project, index) in getProjects('support')"
              :key="'support' + index"
              v-on:click="component = 'tab-views'"
              @click="selectProject(project)"
            >
              <v-list-item :to="project.projectId">
                <v-list-item-action>
                  <v-icon size="17" color="#ED5ED1">icon-project</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-divider class="mx-4"></v-divider> -->
            </div>

            <!-- --------------- Finished  ----------- -->
            <v-divider class="mx-4"></v-divider>
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Finished</v-toolbar-title>

            <div
              v-for="(project, index) in getProjects('finished')"
              :key="'finished'+index"
              v-on:click="component = 'tab-views'"
              @click="selectProject(project)"
            >
              <v-list-item :to="project.projectId">
                <v-list-item-action>
                  <v-icon size="17" color="#0BAFFF">icon-project</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-divider class="mx-4"></v-divider>
              <v-divider class="mx-4"></v-divider>-->
            </div>
            <v-divider class="mx-4"></v-divider>
          </div>
          <!-- allProjects -->
        </v-list-item-group>
      </div>
      <keep-alive>
        <div v-if="this.$route.params.projects == 'projects'" class="defaultFilterBackground">
          <v-icon size="150" color="#EDF0F5">mdi-folder-multiple-outline</v-icon>
        </div>
        <component
          v-if="
            this.$route.params.projects != 'projects' &&
              this.$route.params.projects != undefined
          "
          v-bind:is="component"
          :project="project"
          @refreshSelectedTab="refreshSelectedTab"
        ></component>
        <component v-else-if="this.component == 'add-project'" v-bind:is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NavigationDrawer from "~/components/navigationDrawer";
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import TabViews from "~/components/projects/tabViews";
import SearchBar from "~/components/tools/searchBar";
import AddProject from "~/components/projects/addProject";
export default {
  components: {
    NavigationDrawer,
    "tab-views": TabViews,
    "search-bar": SearchBar,
    "add-project": AddProject
  },
  data() {
    return {
      component: "tab-views",
      project: {},
      taskLog: [],
      Alltasks: [],
      MyTasks: [],
      // taskCompletion: {},
      users: [],
      user_org_role: this.$store.state.user.organizationalRole,
      access_token: this.$store.state.user.access_token,
      userId: this.$store.state.user.userId,
      ongoingArray: [],
      supportArray: [],
      finishedArray: [],
      preSalesArray: [],
      looped: false,
      projectSprint: {},
      newProject: false,
      projectDisplayName: ""
    };
  },

  created() {
    this.$store.dispatch("project/fetchAllProjects");
    this.$store.dispatch("user/setAllUsers");
    this.$store.dispatch("project/clearProject");
    if (this.$route.params.projects != "projects") {
      this.$store.dispatch("project/fetchProject", this.$route.params.projects);
    }
    switch (this.selectedTab) {
      case "task":
        if (this.$route.params.projects != "projects") {
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchTasksMyTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchProjectUserCompletionTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "sprints/sprint/fetchAllProjectSprints",
            this.$route.params.projects
          );
        }
        break;
      case "people":
        this.$store.dispatch(
          "task/fetchProjectUserCompletionTasks",
          this.$route.params.projects
        );
        break;
      case "project":
        this.$store.dispatch(
          "task/fetchProjectTaskCompletion",
          this.$route.params.projects
        );
        break;
      case "board":
        this.$store.dispatch(
          "sprints/sprint/fetchAllProjectSprints",
          this.$route.params.projects
        );
        this.$store.dispatch(
          "task/fetchTasksAllTasks",
          this.$route.params.projects
        );
        break;
      case "files":
        this.$store.dispatch(
          "project/fetchAllProjectFiles",
          this.$route.params.projects
        );
        break;
      default:
        console.log("Home Page");
    }
  },

  methods: {
    getProjectName(name) {
      return name.replace(/\s+/g, "-").toLowerCase();
    },

    getProjects(type) {
      const projectsAll = this.allProjects;
      if (this.looped === false) {
        // console.log("run loop inside");
        for (let i = 0; i < projectsAll.length; i++) {
          let projectType = projectsAll[i].projectStatus;
          switch (projectType) {
            case "ongoing":
              this.ongoingArray.push(projectsAll[i]);
              break;
            case "support":
              this.supportArray.push(projectsAll[i]);
              break;
            case "finished":
              this.finishedArray.push(projectsAll[i]);
              break;
            default:
              this.preSalesArray.push(projectsAll[i]);
              break;
          }
          this.looped = true;
        }
      }
      switch (type) {
        case "ongoing":
          return this.ongoingArray;
          break;
        case "support":
          return this.supportArray;
          break;
        case "finished":
          return this.finishedArray;
        case "presales":
          return this.preSalesArray;
      }
    },
    createNewProject(type) {
      this.newProject = true;
    },
    refreshSelectedTab(tab) {
      switch (tab) {
        case "people":
          this.$store.dispatch(
            "task/fetchProjectUserCompletionTasks",
            this.$route.params.projects
          );
          break;
        case "task":
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchTasksMyTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchProjectUserCompletionTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "sprints/sprint/fetchAllProjectSprints",
            this.$route.params.projects
          );
          break;
        case "project":
          this.$store.dispatch(
            "task/fetchProjectTaskCompletion",
            this.$route.params.projects
          );
          break;
        case "board":
          this.$store.dispatch(
            "sprints/sprint/fetchAllProjectSprints",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          );
          break;
        case "files":
          this.$store.dispatch(
            "project/fetchAllProjectFiles",
            this.$route.params.projects
          );
          break;
      }
    },
    async selectProject(project) {
      this.newProject = false;
      this.project = project;
      this.projectDisplayName = this.project.projectId;
      // console.log("selected project ---------->", project, this.selectedTab);
      this.$store.dispatch("project/fetchProject", this.$route.params.projects);
      switch (this.selectedTab) {
        case "task":
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchTasksMyTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchProjectUserCompletionTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "sprints/sprint/fetchAllProjectSprints",
            this.$route.params.projects
          );
          break;
        case "people":
          this.$store.dispatch(
            "task/fetchProjectUserCompletionTasks",
            this.$route.params.projects
          );
          break;
        case "project":
          this.$store.dispatch(
            "task/fetchProjectTaskCompletion",
            this.$route.params.projects
          );
          break;
        case "board":
          this.$store.dispatch(
            "sprints/sprint/fetchAllProjectSprints",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          );
          break;
        case "files":
          this.$store.dispatch(
            "project/fetchAllProjectFiles",
            this.$route.params.projects
          );
          break;
      }
    }
  },
  computed: {
    ...mapState({
      allProjects: state => state.project.projects,
      organizationalRoles: state => state.user.organizationalRoles,
      selectedTab: state => state.tab.selectedTab,
      fetchProject: state => state.project.project
    })
  }
};
</script>
