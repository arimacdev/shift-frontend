<template>
  <div class="top-nav">
    <navigation-drawer />

    <v-toolbar color dark fixed class="tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold"
                >Projects</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-icon
              v-if="
                organizationalRoles.indexOf('ADMIN') > -1 ||
                organizationalRoles.indexOf('SUPER_ADMIN') > -1 ||
                organizationalRoles.indexOf('WORKLOAD') > -1
              "
            >
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
            >Create a project</v-list-item-title
          >

          <v-list-item-title
            v-else-if="this.$route.params.projects == 'projects'"
            class="font-weight-bold"
            >Select a project</v-list-item-title
          >
          <v-list-item-title v-else class="font-weight-bold">
            {{ this.fetchProject.projectName }}
          </v-list-item-title>
        </div>
      </div>
    </v-toolbar>

    <div class="pageBody">
      <div class="project-list">
        <search-bar :projects="allProjects" @selectSearched="selectProject" />
        <v-list-item-group>
          <div
            class="projectListView overflow-y-auto"
            style="padding-left: 5px; padding-right: 5px"
          >
            <!-- --------------- Pre sales loop ----------- -->
            <!-- <v-divider class="mx-4"></v-divider> -->
            <div class="pinnedContent">
              <div
                style="margin-bottom: 15px; margin-left: -15px"
                class="grey--text text--darken-2 font-weight-bold titles"
              >
                Starred Projects
              </div>
              <div
                class="grey--text text--darken-2"
                style="margin-left: 10px; font-size: 10px; margin-top: -10px"
                v-if="this.pinnedArray == ''"
              >
                Pin your important projects here
              </div>
              <div
                style="pinnedProjects"
                v-for="(project, index) in getProjects('pinned')"
                :key="index"
                v-on:click="component = 'tab-views'"
                @click="selectProject(project)"
              >
                <v-list-item
                  class="selectedProjectPanel"
                  :to="project.projectId"
                >
                  <v-list-item-action>
                    <v-icon size="17" color="blue">icon-project</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="fontRestructure12">
                      {{ project.projectName }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="projectSubtitle">{{
                      updateProjectStatus(project.projectStatus)
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action
                    ><v-icon
                      v-if="project.isStarred == false"
                      @click="pinProject(project)"
                      size="17"
                      >mdi-hexagram-outline</v-icon
                    >
                    <v-icon
                      color="orange"
                      v-else
                      @click="unpinProject(project)"
                      size="17"
                      >mdi-hexagram</v-icon
                    >
                  </v-list-item-action>
                </v-list-item>
              </div>
            </div>

            <v-expansion-panels accordion flat multiple focusable hover>
              <v-expansion-panel class="projectDetailsPannels">
                <v-expansion-panel-header
                  color="#EDF0F5"
                  class="grey--text text--darken-2 font-weight-bold titles"
                >
                  <!-- <div>
                    <v-icon size="17" color="deep-orange lighten-1">icon-project</v-icon>
                  </div>-->
                  <div class="fontRestructure14">Presales</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="projectPanelContent"
                  color="#EDF0F5"
                >
                  <div
                    style="height: 45px !important"
                    v-for="(project, index) in getProjects('presales')"
                    :key="'preSales' + index"
                    @click="selectProject(project)"
                  >
                    <v-list-item
                      class="selectedProjectPanel"
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
                        <v-icon size="17" color="deep-orange lighten-1"
                          >icon-project</v-icon
                        >
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fontRestructure12">
                          {{ project.projectName }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          v-if="project.projectStatus == 'presalesPD'"
                          class="projectSubtitle"
                          >(Project discovery)</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-if="project.projectStatus == 'preSalesQS'"
                          class="projectSubtitle"
                          >(Quotation submission)</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-if="project.projectStatus == 'preSalesN'"
                          class="projectSubtitle"
                          >(Negotiation)</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-if="project.projectStatus == 'preSalesC'"
                          class="projectSubtitle"
                          >(Confirm)</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          v-if="project.projectStatus == 'preSalesL'"
                          class="projectSubtitle"
                          >(Lost)</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-action
                        ><v-icon
                          v-if="project.isStarred == false"
                          @click="pinProject(project)"
                          size="17"
                          >mdi-hexagram-outline</v-icon
                        >
                        <v-icon
                          color="orange"
                          v-else
                          @click="unpinProject(project)"
                          size="17"
                          >mdi-hexagram</v-icon
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="projectDetailsPannels">
                <v-expansion-panel-header
                  color="#EDF0F5"
                  class="grey--text text--darken-2 font-weight-bold titles"
                >
                  <!-- <div>
                    <v-icon size="17" color="#FFC212">icon-project</v-icon>
                  </div>-->
                  <div class="fontRestructure14">Ongoing</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="projectPanelContent"
                  color="#EDF0F5"
                >
                  <div
                    style="height: 45px !important"
                    v-for="(project, index) in getProjects('ongoing')"
                    :key="'ongoing' + index"
                    v-on:click="component = 'tab-views'"
                    @click="selectProject(project)"
                  >
                    <v-list-item
                      class="selectedProjectPanel"
                      :to="project.projectId"
                    >
                      <v-list-item-action>
                        <v-icon size="17" color="#FFC212">icon-project</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fontRestructure12">
                          {{ project.projectName }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action
                        ><v-icon
                          v-if="project.isStarred == false"
                          @click="pinProject(project)"
                          size="17"
                          >mdi-hexagram-outline</v-icon
                        >
                        <v-icon
                          color="orange"
                          v-else
                          @click="unpinProject(project)"
                          size="17"
                          >mdi-hexagram</v-icon
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="projectDetailsPannels">
                <v-expansion-panel-header
                  color="#EDF0F5"
                  class="grey--text text--darken-2 font-weight-bold titles"
                >
                  <!-- <div>
                    <v-icon size="17" color="#ED5ED1">icon-project</v-icon>
                  </div>-->
                  <div class="fontRestructure14">Support</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="projectPanelContent"
                  color="#EDF0F5"
                >
                  <div
                    style="height: 45px !important"
                    v-for="(project, index) in getProjects('support')"
                    :key="'support' + index"
                    v-on:click="component = 'tab-views'"
                    @click="selectProject(project)"
                  >
                    <v-list-item
                      class="selectedProjectPanel"
                      :to="project.projectId"
                    >
                      <v-list-item-action>
                        <v-icon size="17" color="#ED5ED1">icon-project</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fontRestructure12">
                          {{ project.projectName }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action
                        ><v-icon
                          v-if="project.isStarred == false"
                          @click="pinProject(project)"
                          size="17"
                          >mdi-hexagram-outline</v-icon
                        >
                        <v-icon
                          color="orange"
                          v-else
                          @click="unpinProject(project)"
                          size="17"
                          >mdi-hexagram</v-icon
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="projectDetailsPannels">
                <v-expansion-panel-header
                  color="#EDF0F5"
                  class="grey--text text--darken-2 font-weight-bold titles"
                >
                  <!-- <div>
                    <v-icon size="17" color="#0BAFFF">icon-project</v-icon>
                  </div>-->
                  <div class="fontRestructure14">Finished</div>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="projectPanelContent"
                  color="#EDF0F5"
                >
                  <div
                    style="height: 45px !important"
                    v-for="(project, index) in getProjects('finished')"
                    :key="'finished' + index"
                    v-on:click="component = 'tab-views'"
                    @click="selectProject(project)"
                  >
                    <v-list-item
                      class="selectedProjectPanel"
                      :to="project.projectId"
                    >
                      <v-list-item-action>
                        <v-icon size="17" color="#0BAFFF">icon-project</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title class="fontRestructure12">
                          {{ project.projectName }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action
                        ><v-icon
                          v-if="project.isStarred == false"
                          @click="pinProject(project)"
                          size="17"
                          >mdi-hexagram-outline</v-icon
                        >
                        <v-icon
                          color="orange"
                          v-else
                          @click="unpinProject(project)"
                          size="17"
                          >mdi-hexagram</v-icon
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Presales</v-toolbar-title> -->

            <!-- <div
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
            </div>-->

            <!-- <v-divider class="mx-4"></v-divider> -->

            <!-- --------------- ongoing  ----------- -->
            <!-- <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Ongoing</v-toolbar-title> -->

            <!-- <div
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
            </div>-->

            <!-- --------------- Support  ----------- -->
            <!-- <v-divider class="mx-4"></v-divider>
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Support</v-toolbar-title>-->

            <!-- <div
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
            </div>-->

            <!-- --------------- Finished  ----------- -->
            <!-- <v-divider class="mx-4"></v-divider>
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Finished</v-toolbar-title>-->
            <!-- 
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
            </div>-->
            <!-- <v-divider class="mx-4"></v-divider> -->
          </div>
          <!-- allProjects -->
        </v-list-item-group>
      </div>
      <keep-alive>
        <div
          v-if="this.$route.params.projects == 'projects'"
          class="defaultFilterBackground"
        >
          <div
            v-if="
              organizationalRoles.indexOf('ADMIN') > -1 ||
              organizationalRoles.indexOf('SUPER_ADMIN') > -1 ||
              organizationalRoles.indexOf('WORKLOAD') > -1
            "
          >
            <v-icon size="60" color="#BEC4CE">icon-project</v-icon>
            <div class="newProjectText">Create New Project</div>
            <v-btn
              v-on:click="component = 'add-project'"
              color="#0083E2"
              dark
              depressed
              height="40px"
            >
              <v-list-item>
                <v-list-item-action>
                  <v-icon size="17" color="#ffffff">icon-project</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <span class="text-capitalize">Add new project</span>
                </v-list-item-content>
                <v-list-item-action>
                  <v-icon size="17" color="#ffffff">mdi-plus-circle</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-btn>
          </div>
          <div v-else>
            <v-icon size="60" color="#BEC4CE">icon-project</v-icon>
            <div class="newProjectText">Select a Project</div>
          </div>
        </div>
        <component
          v-if="
            this.$route.params.projects != 'projects' &&
            this.$route.params.projects != undefined
          "
          v-bind:is="component"
          :project="project"
          :pagination="pagination"
          @refreshSelectedTab="refreshSelectedTab"
        ></component>
        <component
          v-else-if="this.component == 'add-project'"
          v-bind:is="component"
        ></component>
      </keep-alive>
    </div>
    <v-overlay :value="overlay" color="white" opacity="1">
      <progress-loading />
    </v-overlay>
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
import Progress from "~/components/popups/progress";

export default {
  components: {
    NavigationDrawer,
    "tab-views": TabViews,
    "search-bar": SearchBar,
    "add-project": AddProject,
    "progress-loading": Progress,
  },
  data() {
    return {
      overlay: false,
      pagination: 1,
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
      pinnedArray: [],
      looped: false,
      projectSprint: {},
      newProject: false,
      projectDisplayName: "",
    };
  },

  created() {
    this.overlay = true;
    Promise.all([
      this.$store.dispatch("project/fetchAllProjects"),
      this.$store.dispatch("user/setAllUsers"),
      this.$store.dispatch("project/clearProject"),
    this.$store.dispatch("clients/clients/fetchClients")
    ]).finally(() => {
      this.overlay = false;
    });
    if (this.$route.params.projects != "projects") {
      this.$store.dispatch("project/fetchProject", this.$route.params.projects);
    }
    switch (this.selectedTab) {
      case "task":
        if (this.$route.params.projects != "projects") {
          this.overlay = true;
          Promise.all([
            Promise.all([this.$store.dispatch("task/emptyStore")]).finally(
              () => {
                this.$store.dispatch("task/setIndex", {
                  startIndex: 0,
                  endIndex: 10,
                  isAllTasks: false,
                }),
                  this.$store.dispatch(
                    "task/fetchTasksAllTasks",
                    this.$route.params.projects
                  );
              }
            ),

            this.$store.dispatch(
              "task/fetchTotalTaskCount",
              this.$route.params.projects
            ),
            this.$store.dispatch(
              "task/fetchTasksMyTasks",
              this.$route.params.projects
            ),
            this.$store.dispatch(
              "task/fetchProjectUserCompletionTasks",
              this.$route.params.projects
            ),
            this.$store.dispatch(
              "sprints/sprint/fetchAllProjectSprints",
              this.$route.params.projects
            ),
          ]).finally(() => {
            this.overlay = false;
          });
        }
        break;
      case "people":
        this.overlay = true;
        Promise.all([
          this.$store.dispatch(
            "task/fetchProjectUserCompletionTasks",
            this.$route.params.projects
          ),
        ]).finally(() => {
          this.overlay = false;
        });
        break;
      case "project":
        this.$store.dispatch(
          "task/fetchProjectTaskCompletion",
          this.$route.params.projects
        );
        break;
      case "board":
        // console.log("board -------->");
        this.overlay = true;
        Promise.all([
          this.$store.dispatch(
            "sprints/sprint/fetchAllProjectSprints",
            this.$route.params.projects
          ),
          this.$store.dispatch("task/setIndex", {
            startIndex: 0,
            endIndex: 10,
            isAllTasks: true,
          }),
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          ),
          this.$store.dispatch(
            "task/fetchTotalTaskCount",
            this.$route.params.projects
          ),
        ]).finally(() => {
          this.overlay = false;
        });
        break;
      case "files":
        this.$store.dispatch(
          "project/fetchAllProjectFiles",
          this.$route.params.projects
        );
        break;
      default:
      // console.log("Home Page");
    }
  },

  methods: {
    updateProjectStatus(status) {
      switch (status) {
        case "presales":
          return "Presales";
          break;
        case "presalesPD":
          return "Presales - Project Discovery";
          break;
        case "preSalesQS":
          return "Presales - Quotation Submission";
          break;
        case "preSalesN":
          return "Presales - Negotiation";
          break;
        case "preSalesC":
          return "Presales Confirmed";
          break;
        case "preSalesL":
          return "Presales - Lost";
          break;
        case "ongoing":
          return "Ongoing";
          break;
        case "support":
          return "Support";
          break;
        case "finished":
          return "Finished";
          break;

        default:
      }
    },
    async unpinProject(project) {
      // console.log("PINNED");
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post("/projects/pin", {
          user: this.userId,
          project: project.projectId,
          isPin: false,
        });
        location.reload();
        this.overlay = false;
      } catch (e) {
        this.overlay = false;

        console.log("Error pin project", e);
      }
    },
    async pinProject(project) {
      this.overlay = true;
      let response;
      try {
        response = await this.$axios.$post("/projects/pin", {
          user: this.userId,
          project: project.projectId,
          isPin: true,
        });
        location.reload();
        this.overlay = false;
      } catch (e) {
        this.overlay = false;

        console.log("Error pin project", e);
      }
    },
    getProjectName(name) {
      return name.replace(/\s+/g, "-").toLowerCase();
    },

    getProjects(type) {
      const projectsAll = this.allProjects;
      if (this.looped === false) {
        // console.log("run loop inside");
        for (let i = 0; i < projectsAll.length; i++) {
          let projectType = projectsAll[i].projectStatus;
          let pinnedProjects = projectsAll[i].isStarred;
          switch (pinnedProjects) {
            case true:
              this.pinnedArray.push(projectsAll[i]);
              break;
          }
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
        case "pinned":
          return this.pinnedArray;
      }
    },
    createNewProject(type) {
      this.newProject = true;
    },
    refreshSelectedTab(tab) {
      switch (tab) {
        case "people":
          this.overlay = true;
          Promise.all([
            // console.log("people"),
            this.$store.dispatch(
              "task/fetchProjectUserCompletionTasks",
              this.$route.params.projects
            ),
          ]).finally(() => {
            // setTimeout(() => {
            this.overlay = false;
            // }, 100);
          });
          break;
        case "task":
          this.overlay = true;
          Promise.all([
            this.$store.dispatch("task/emptyStore"),
            this.$store.dispatch("task/setIndex", {
              startIndex: 0,
              endIndex: 10,
              isAllTasks: false,
            }),
            this.$store.dispatch(
              "task/fetchTasksAllTasks",
              this.$route.params.projects
            ),
            this.$store.dispatch(
              "task/fetchTotalTaskCount",
              this.$route.params.projects
            ),
            // this.$store.dispatch(
            //   "task/fetchTasksMyTasks",
            //   this.$route.params.projects
            // ),
            this.$store.dispatch(
              "task/fetchProjectUserCompletionTasks",
              this.$route.params.projects
            ),
            this.$store.dispatch(
              "sprints/sprint/fetchAllProjectSprints",
              this.$route.params.projects
            ),
          ]).finally(() => {
            this.overlay = false;
          });
          break;
        case "project":
          this.overlay = true;
          Promise.all([
            this.$store.dispatch(
              "task/fetchProjectTaskCompletion",
              this.$route.params.projects
            ),
          ]).finally(() => {
            setTimeout(() => {
              this.overlay = false;
            }, 100);
          });
          break;
        case "board":
          this.overlay = true;
          Promise.all([
            this.$store.dispatch(
              "sprints/sprint/fetchAllProjectSprints",
              this.$route.params.projects
            ),

            this.$store.dispatch(
              "task/fetchSprintTasks",
              this.$route.params.projects
            ),
            this.$store.dispatch(
              "task/fetchTotalTaskCount",
              this.$route.params.projects
            ),
          ]).finally(() => {
            this.overlay = false;
          });
          break;
        case "files":
          this.overlay = true;
          Promise.all([
            this.$store.dispatch(
              "project/fetchAllProjectFiles",
              this.$route.params.projects
            ),
          ]).finally(() => {
            this.overlay = false;
          });
          break;
        case "folders":
          this.overlay = true;
          Promise.all([
            this.$store.dispatch(
              "project/fetchAllProjectFolders",
              this.$route.params.projects
            ),
          ]).finally(() => {
            this.overlay = false;
          });
          break;
      }
    },
    async selectProject(project) {
      // if (this.$route.params.projects == project.projectId) {
      //   Promise.all([this.$store.dispatch("task/emptyStore")]).finally(() => {
      //     this.$store.dispatch("task/setIndex", {
      //       startIndex: 0,
      //       endIndex: 10,
      //       isAllTasks: false,
      //     }),
      //       this.$store.dispatch(
      //         "task/fetchTasksAllTasks",
      //         this.$route.params.projects
      //       );
      //   });
      // }

      this.$store.dispatch("task/setIndex", {
        startIndex: 0,
        endIndex: 10,
        isAllTasks: false,
      });
      this.$store.dispatch("task/emptyStore");
      // this.$store.dispatch('task/emptyStore'),
      //   this.$store.dispatch('task/setIndex', {
      //     startIndex: 0,
      //     endIndex: 10,
      //     isAllTasks: false,
      //   }),
      //   this.$store.dispatch(
      //     'task/fetchTasksAllTasks',
      //     this.$route.params.projects
      //   ),
      this.newProject = false;
      this.project = project;
      this.projectDisplayName = this.project.projectId;
      // console.log("selected project ---------->", project, this.selectedTab);
      this.$store.dispatch("project/fetchProject", this.$route.params.projects);
      switch (this.selectedTab) {
        case "task":
          // this.$store.dispatch("task/setIndex", {
          //   startIndex: 0,
          //   endIndex: 10,
          //   isAllTasks: false,
          // });
          // this.$store.dispatch(
          //   'task/fetchTasksAllTasks',
          //   this.$route.params.projects
          // );
          this.$store.dispatch(
            "task/fetchTotalTaskCount",
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
          this.$store.dispatch("task/setIndex", {
            startIndex: 0,
            endIndex: 10,
            isAllTasks: true,
          });
          this.$store.dispatch(
            "task/fetchTasksAllTasks",
            this.$route.params.projects
          );
          this.$store.dispatch(
            "task/fetchTotalTaskCount",
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
  },
  computed: {
    ...mapState({
      allProjects: (state) => state.project.projects,
      organizationalRoles: (state) => state.user.organizationalRoles,
      selectedTab: (state) => state.tab.selectedTab,
      fetchProject: (state) => state.project.project,
    }),
  },
};
</script>
