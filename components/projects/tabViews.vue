<template>
  <div class="body-tabs">
    <!-- tabs body -->
    <div>
      <v-card class="tabs">
        <v-tabs slider-color="#0c0c5a" slider-size="3">
          <v-tab
            @click="changeTabView('task')"
            class="tabInactiveStyle"
            active-class="tabTitleStyle"
          >Tasks</v-tab>
          <v-tab
            @click="changeTabView('board')"
            class="tabInactiveStyle"
            active-class="tabTitleStyle"
          >Board</v-tab>
          <v-tab
            @click="changeTabView('people')"
            class="tabInactiveStyle"
            active-class="tabTitleStyle"
          >People</v-tab>
          <v-tab
            @click="changeTabView('project')"
            class="tabInactiveStyle"
            active-class="tabTitleStyle"
          >Project</v-tab>
          <v-tab
            @click="changeTabView('files')"
            class="tabInactiveStyle"
            active-class="tabTitleStyle"
          >Files</v-tab>
          <v-tab
            @click="changeTabView('logs')"
            class="tabInactiveStyle"
            active-class="tabTitleStyle"
          >Logs</v-tab>

          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <tasks :MyTasks="MyTasks" :projectId="projectId" :people="people" />
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
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <files-tab />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-divider class="mx-4"></v-divider>
            <v-card flat>
              <project-logs :page="page" />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </div>
</template>

<script>
import Tasks from "~/components/tabsView/tasks";
import TaskDrawer from "~/components/projects/taskDrawer";
import People from "~/components/people/people";
import ProjectTab from "~/components/projects/projectTab";
import FilesTab from "~/components/projects/filesTab";
import BoardTab from "~/components/projects/boardTab";
import ProjectLogs from "~/components/projects/projectLogs";
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: 1,
      drawer: null,
      userId: this.$store.state.user.userId,
      items: []
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
    "taskLog"
    // "taskCompletion"
  ],
  name: "tabViews",
  components: {
    tasks: Tasks,
    "task-drawer": TaskDrawer,
    people: People,
    "project-tab": ProjectTab,
    "files-tab": FilesTab,
    "board-tab": BoardTab,
    "project-logs": ProjectLogs
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
        case "logs":
          this.$store.dispatch("tab/updateTabViewsTab", "logs");
          this.$emit("refreshSelectedTab", "logs");
          this.$store.dispatch("activityLog/fetchProjectActivityLog", {
            taskId: this.selectedTask.taskId,
            startIndex: 0,
            endIndex: 10
          });

          break;
      }
    },
    onSelectProject() {}
  }
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
