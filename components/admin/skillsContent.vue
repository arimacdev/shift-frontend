<template>
  <div class="skillsContentWrapper">
    <v-row>
      <v-col>Skill Category Name</v-col>
    </v-row>
    <v-row>
      <v-col>
        <span class="display-1 font-weight-bold">Front End</span>
        &nbsp;
        <v-divider vertical></v-divider>
        <span style="margin-left: 30px; margin-top: -20px">Color</span>

        <v-btn
          @click="deleteDialog = true"
          style="margin-left: 30px; margin-top: -20px"
          color="error"
          class="text-capitalize"
        >Delete Skill Category</v-btn>
      </v-col>
    </v-row>

    <v-divider style="margin-top: 20px"></v-divider>
    <v-row>
      <v-col md="5">
        Skills
        <div class="skillsDiv">Vue JS</div>
        <v-btn color="#0BAFFF" dark height="45px" class="skillsDiv">
          <v-list-item>
            <v-list-item-content class="text-capitalize">Add New Skill</v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-btn>
      </v-col>
    </v-row>

    <!-- --------- delete category dialog ------ -->
    <v-dialog v-model="deleteDialog" max-width="350">
      <v-card style="text-align: center ; padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Delete Skill Category
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>If you delete the skill category, all skills will remove from the users that has been assigned.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn width="100px" color="#FF6161" dark @click="deleteDialog = false">Cancel</v-btn>

          <v-btn width="100px" color="#2EC973" dark @click="deleteDialog = false">Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteDialog: false
    };
  }
};
</script>