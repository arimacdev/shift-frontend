<template>
  <div>
    <div class="tabContent">
      <div class="users-list">
        <v-row>
          <v-col>
            <v-btn
              @click="skillDialog = true"
              height="50px"
              class="addUserSubmitButtonEdit userAddBottom"
            >
              <v-list-item dark>
                <v-list-item-icon>
                  <v-icon size="20" color>mdi-thumb-up-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content class>
                  <v-list-item-title class="text-capitalize">Add new skill category</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="userAddBottom">
            <search-bar :users="users" @searchSelected="viewSearchComponent" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="listView overflow-y-auto">
              <v-list-item-group>
                <div class="skillsListItem">
                  <v-list-item dark>
                    <v-list-item-title>Front End</v-list-item-title>
                  </v-list-item>
                </div>
              </v-list-item-group>
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        <keep-alive>
          <skills-content />
        </keep-alive>
      </div>
    </div>

    <!-- ------- add skill cat dialog ------ -->

    <v-dialog v-model="skillDialog" max-width="450">
      <v-card style=" padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Add Skill Category
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="categoryName"
            outlined
            background-color="#EDF0F5"
            label="Skill category name"
          ></v-text-field>
          <v-text-field
            outlined
            label="Category Color (Pick a color from picker)"
            disabled
            background-color="#EDF0F5"
            v-model="this.colorPicker"
          ></v-text-field>
          <v-color-picker width="100%" v-model="colorPicker" hide-canvas class="ma-2" show-swatches></v-color-picker>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn width="100px" color="#FF6161" dark @click="skillDialog = false">Cancel</v-btn>

          <v-btn width="100px" color="#2EC973" dark @click="skillDialog = false">Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import usersSearchBar from "~/components/tools/usersSearchBar";

import skillsContent from "~/components/admin/skillsContent";
import { mapState } from "vuex";
export default {
  components: {
    "search-bar": usersSearchBar,
    "skills-content": skillsContent
  },
  data() {
    return {
      skillDialog: false,
      colorPicker: "",
      categoryName: "",
      swatches: [
        ["#FF0000", "#AA0000", "#550000"],
        ["#FFFF00", "#AAAA00", "#555500"],
        ["#00FF00", "#00AA00", "#005500"],
        ["#00FFFF", "#00AAAA", "#005555"],
        ["#0099FFFF", "#FF008CFF", "#00F7FFFF"],
        ["#0000FF", "#0000AA", "#000055"]
      ]
    };
  }
};
</script>