<template>
  <div>
    <div class="tabContent">
      <div class="users-list">
        <v-row>
          <v-col>
            <v-btn height="50px" class="addUserSubmitButtonEdit userAddBottom">
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
  }
};
</script>