<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn width="100%" color="#2EC973" dark v-on="on">Save current filter as a template</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

        <v-card-text>{{this.filterAssignee}}</v-card-text>
        <v-card-text>{{this.filterProject}}</v-card-text>
        <v-card-text>{{this.filterType}}</v-card-text>
        <v-card-text>{{this.filterStatus}}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["filterAssignee", "filterProject", "filterType", "filterStatus"],
  data() {
    return {
      dialog: false
    };
  }
};
</script>