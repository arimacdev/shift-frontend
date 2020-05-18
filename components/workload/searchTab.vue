<template>
  <div>
    <v-row>
      <v-col md="4">
        <div class="searchTabLeftBar">
          <span class="containsText">Contains Text</span>

          <v-text-field outlined solo flat background-color="#FFFFFF"></v-text-field>
          <v-row align="center">
            <v-col cols="12">
              <v-autocomplete
                v-model="assignee"
                :items="assigneeArray"
                item-text="name"
                item-value="id"
                :search-input.sync="searchAssignee"
                flat
                outlined
                dense
                chips
                background-color="#EDF0F5"
                small-chips
                label="Assignee"
                multiple
                clearable
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Assignee</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>

              <v-autocomplete
                v-model="project"
                :items="projectArray"
                item-text="name"
                item-value="id"
                :search-input.sync="searchProject"
                flat
                outlined
                dense
                chips
                background-color="#EDF0F5"
                small-chips
                label="Project"
                multiple
                clearable
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Project</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
              <v-autocomplete
                v-model="taskType"
                :items="taskTypeArray"
                item-text="name"
                item-value="id"
                flat
                outlined
                dense
                chips
                background-color="#EDF0F5"
                small-chips
                label="Task Type"
                multiple
                clearable
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      Filter by
                      <strong>Type</strong>
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col md="8">
        <div
          class="searchTabRightBar"
        >{{this.filterAssignee}} {{this.filterProject}} {{ this.filterType}}</div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: null,
    assigneeArray: [],
    projectArray: [],
    filterAssignee: [],
    filterProject: [],
    filterType: [],
    searchAssignee: null,
    selectAssignee: null,
    searchProject: null,
    selectProject: null,
    taskTypeArray: [
      { name: "Development", id: "development" },
      { name: "QA", id: "qa" },
      { name: "Design", id: "design" },
      { name: "Bug", id: "bug" },
      { name: "Operational", id: "operational" },
      { name: "Pre-sales", id: "preSales" },
      { name: "General", id: "general" }
    ]
  }),
  watch: {
    searchAssignee(val) {
      val && val !== this.selectAssignee && this.loadAssignee(val);
    },
    searchProject(val) {
      val && val !== this.selectProject && this.loadProject(val);
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
    loadProject(v) {
      let projectSearchList = this.allProjects;
      for (let index = 0; index < projectSearchList.length; ++index) {
        let project = projectSearchList[index];
        this.projectArray.push({
          name: project.projectName,
          id: project.projectId
        });
      }
    }
  },
  computed: {
    ...mapState({
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
    },
    taskType: {
      get() {},
      set(value) {
        this.filterType = value;
      }
    }
  }
};
</script>