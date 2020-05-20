<template>
  <div class="text-center adasd">
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn width="100%" color="#2EC973" dark v-on="on">Save current filter as a template</v-btn>
      </template>

      <v-card class="asdasdad">
        <v-card-title class="grey lighten-2" primary-title>Save filteration as a template</v-card-title>
        <div class="saveTemplateBody">
          <v-row>
            <v-col>
              <div class="templateText">Assignee:</div>
              <span v-for="(assignee, index) in this.filterAssignee" :key="index">
                {{assignee.name}}
                &nbsp;&nbsp;
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="templateText">Project:</div>
              <span v-for="(project, index) in this.filterProject" :key="index">
                {{project.name}}
                &nbsp;&nbsp;
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="templateText">Type:</div>
              <span v-for="(type, index) in this.filterType" :key="index">
                {{type.name}}
                &nbsp;&nbsp;
              </span>
            </v-col>
            <v-col>
              <div class="templateText">Status:</div>
              <span v-for="(status, index) in this.filterStatus" :key="index">
                {{status.name}}
                &nbsp;&nbsp;
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="templateText">From:</div>
              <span>
                {{this.from}}
                &nbsp;&nbsp;
              </span>
            </v-col>
            <v-col>
              <div class="templateText">To:</div>
              <span>
                {{this.to}}
                &nbsp;&nbsp;
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="templateText">Query:</div>
              <span>{{this.saveTemplateQuery}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="templateText">Choose a name for the template:</div>
              <v-text-field solo background-color="#EDF0F5" dense flat v-model="templateName"></v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#FF6161" dark text @click="dialog = false">Cancel</v-btn>
          <v-btn color="#2EC973" dark text @click="saveTemplate">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: [
    "saveTemplateQuery",
    "filterAssignee",
    "filterProject",
    "filterType",
    "filterStatus",
    "from",
    "to"
  ],
  data() {
    return {
      dialog: false,
      templateName: ""
    };
  },
  methods: {
    async saveTemplate() {
      console.log("clicked");
      let response;
      const template = {
        templateName: this.templateName,
        templateCreatorId: this.$store.state.user.userId,
        templateQuery: this.saveTemplateQuery
      };
      try {
        response = await this.$axios.$post(`/template`, template);
        this.$store.dispatch("workload/addTemplate", template);
        this.templateName = "";
      } catch (e) {
        console.log("Error adding a User", e);
      }
    }
  }
};
</script>