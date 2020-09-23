<template>
  <div class="body-tabs">
    <!-- tabs body -->
    <div>
      <v-card class="tabs">
        <v-tabs slider-color="#0c0c5a" slider-size="3">
          <v-tab
            @click="changeTabView('task')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Tasks</v-tab>
          <v-tab
            @click="changeTabView('board')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Board</v-tab>
          <v-tab
            @click="changeTabView('people')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >People</v-tab>
          <v-tab
            @click="changeTabView('project')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Project</v-tab>
          <!-- <v-tab
            @click="changeTabView('files')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Files</v-tab>-->
          <v-tab
            @click="changeTabView('folders')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Files</v-tab>
          <v-tab
            @click="changeTabView('logs')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Logs</v-tab>
          <v-tab
            @click="changeTabView('logs')"
            class="tabInactiveStyle text-capitalize"
            active-class="tabTitleStyle"
          >Meetings</v-tab>

          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <tasks
              :pagination="pagination"
              :MyTasks="MyTasks"
              :projectId="projectId"
              :people="people"
            />
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <board-tab :projectId="projectId" :people="people" />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <people />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <project-tab />
            </v-card>
          </v-tab-item>
          <!-- <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <files-tab />
            </v-card>
          </v-tab-item>-->
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <folders-tab />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <project-logs :page="page" />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <meeting-minutes />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import Tasks from "~/components/tabsView/tasks";
import Meetings from "~/components/projects/meetings";
import TaskDrawer from "~/components/projects/taskDrawer";
import People from "~/components/people/people";
import ProjectTab from "~/components/projects/projectTab";
import FilesTab from "~/components/projects/filesTab";
import FoldersTab from "~/components/projects/foldersTab";
import BoardTab from "~/components/projects/boardTab";
import ProjectLogs from "~/components/projects/projectLogs";
import Progress from "~/components/popups/progress";

import { mapState } from "vuex";

export default {
  data() {
    return {
      overlay: false,
      page: 1,
      drawer: null,
      userId: this.$store.state.user.userId,
      items: [],
      // taskCompletion: {}
    };
  },
  props: [
    "name",
    "projectSprints",
    "projectFiles",
    "projectId",
    "project",
    "users",
    "MyTasks",
    "people",
    "taskLog",
    "pagination",
    // "taskCompletion"
  ],
  name: "tabViews",
  components: {
    tasks: Tasks,
    "task-drawer": TaskDrawer,
    people: People,
    "meeting-minutes": Meetings,
    "project-tab": ProjectTab,
    "files-tab": FilesTab,
    "folders-tab": FoldersTab,
    "board-tab": BoardTab,
    "project-logs": ProjectLogs,
    "progress-loading": Progress,
  },
  async created() {
    this.projectId = this.$route.params.projects;
  },
  methods: {
    changeTabView(type) {
      switch (type) {
        case "task":
          this.$store.dispatch("tab/updateTabViewsTab", "task");
          this.$emit("refreshSelectedTab", "task");
          break;
        case "people":
          this.$store.dispatch("tab/updateTabViewsTab", "people");
          this.$emit("refreshSelectedTab", "people");
          break;
        case "project":
          this.$store.dispatch("tab/updateTabViewsTab", "project");
          this.$emit("refreshSelectedTab", "project");
          break;
        case "board":
          this.$store.dispatch("tab/updateTabViewsTab", "board");
          this.$emit("refreshSelectedTab", "board");
          break;
        case "files":
          this.$store.dispatch("tab/updateTabViewsTab", "files");
          this.$emit("refreshSelectedTab", "files");
          break;
        case "folders":
          this.$store.dispatch("tab/updateTabViewsTab", "files");
          this.$emit("refreshSelectedTab", "folders");
          break;
        case "logs":
          this.$store.dispatch("activityLog/emptyStore");
          this.overlay = true;
          this.$emit("refreshSelectedTab", "logs");
          Promise.all([
            this.$store.dispatch("tab/updateTabViewsTab", "logs"),
            this.$store.dispatch("activityLog/fetchProjectActivityLog", {
              projectId: this.$route.params.projects,
              startIndex: 0,
              endIndex: 10,
            }),
          ]).finally(() => {
            this.overlay = false;
          });
          break;
      }
    },
    onSelectProject() {},
  },
};
</script>

<style scoped>
.tabs {
  padding-left: 10px;
  box-shadow: none !important;
}
.wrapper {
  width: 100%;
}
</style>
