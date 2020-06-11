<template>
  <div>
    <div class="tabContent">
      <div class="users-list">
        <v-row>
          <v-col>
            <button class="addUserSubmitButtonEdit userAddBottom">
              <v-list-item dark>
                <v-list-item-icon>
                  <v-icon size="20" color>mdi-thumb-up-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="userAddButtonText">
                  <v-list-item-title class>Add new skill category</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </button>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="userAddBottom">
            <search-bar :users="users" @searchSelected="viewSearchComponent" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="listView overflow-y-auto">add skills here</div>
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