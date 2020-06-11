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
  </div>
</template>