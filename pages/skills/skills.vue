<template>
  <div class="top-nav">
    <navigation-drawer :user="user" />
    <v-toolbar app color dark fixed :clipped-left="clipped" class="tool-bar">
      <div class="title-div">
        <div class="name-div">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">Skill Matrix</v-list-item-title>
            </v-list-item-content>

            <v-divider class="mx-4" inset vertical></v-divider>
          </v-list-item>
        </div>
      </div>
    </v-toolbar>

    <div class="body-div">
      <div>
        <v-row style=" ">
          <v-col md="3">
            <v-autocomplete
              background-color="#EDF0F5"
              v-model="select"
              :loading="loading"
              :search-input.sync="search"
              cache-items
              dense
              class="mx-4 searchBar"
              flat
              hide-no-data
              hide-details
              append-icon
              prepend-inner-icon="mdi-magnify"
              label="Search Here"
              outlined
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col md="1" style="color: #7A8B9F; font-weight: 500; ">Filter by Skills</v-col>

          <v-col style="margin-left: -20px" md="7">
            <v-autocomplete
              dense
              background-color="#EDF0F5"
              v-model="searchSkills"
              :items="skillArray"
              item-text="name"
              item-value="id"
              :loading="loading"
              :search-input.sync="search"
              cache-items
              class="mx-4 searchBar"
              flat
              hide-data
              hide-details
              append-icon
              prepend-inner-icon="mdi-magnify"
              label="Click to choose"
              outlined
              multiple
              @click="searchDialogOpen()"
            ></v-autocomplete>
            <!-- <v-text-field @click="searchDialogOpen()" v-model="this.selectedSkills"></v-text-field> -->
          </v-col>
          <v-col md="1">
            <v-btn dark width="100%" height="100%" color="#FF6161">
              <v-icon color="#FFFFFF">mdi-cancel</v-icon>
              <!-- Cancel -->
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="scrollContent">
          <v-col>
            <!-- loop following row for each user -->
            <v-row class="scroll">
              <v-col md="3" sm="3">
                <div class="userListTitle">Users</div>
              </v-col>
              <v-col md="9" sm="9" style="background-color:#ffffff;">
                <div class="skillDisplayDiv">
                  <div class="skillScrollingWrapper" id="div1">
                    <div>
                      <div
                        class="skillDisplayCard"
                        v-for="(categoryMap, index) in organizationSkills[0].category"
                        :key="index"
                      >
                        <div>
                          <div
                            class="categoryHeader"
                            :style="'background-color:' + categoryMap.categoryColorCode"
                          >{{categoryMap.categoryName}}</div>

                          <div
                            class="skillName"
                            v-for="(skill, index) in categoryMap.skillSet"
                            :key="index"
                          >
                            <v-list-item-title style="font-size: 12px">{{skill.skillName}}</v-list-item-title>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row style="margin-bottom: -60px" class="overflow-y-hidden">
              <v-col md="3" sm="3">
                <v-list-item-group class="skillDisplayScreenUser overflow-y-auto" id="div3">
                  <div
                    class="matrixUserListItem"
                    v-for="(user, index) in organizationSkills"
                    :key="index"
                  >
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img
                          v-if="user.userProfileImage != null && user.userProfileImage != ''"
                          :src="user.userProfileImage"
                        ></v-img>
                        <v-img
                          v-else
                          src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{user.firstName}} {{user.lastName}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mx-4"></v-divider>
                  </div>
                </v-list-item-group>
              </v-col>
              <v-col md="9" sm="9">
                <div class="skillDisplayDiv">
                  <div
                    class="skillScrollingWrapperScroll skillDisplayScreen overflow-y-auto"
                    id="div2"
                  >
                    <br />
                    <div v-for="(user, index) in organizationSkills" :key="index">
                      <div
                        class="skillDisplayCard"
                        v-for="(category, index) in user.category"
                        :key="index"
                      >
                        <div
                          class="skillDisplayBox"
                          v-for="(skill, index) in category.skillSet"
                          :key="index"
                        >
                          <div class="skillDisplayCheckBox">
                            <v-icon
                              v-if="skill.isAssigned == true"
                              size="30"
                              color="#2EC973"
                            >mdi-checkbox-marked-circle</v-icon>
                            <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                  </div>
                  <br />
                  <div style="position: fixed; bottom: 10px; right: 10px;">
                    <v-btn
                      color="blue"
                      style=" color: #FFFFFF"
                      @click="loadMatrix()"
                      :disabled="this.loadLimit > users.length"
                      class="text-capitalize"
                    >
                      Load More
                      <v-icon>mdi-plus-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      color="#78CC71"
                      style="color: #FFFFFF"
                      @click="loadAllMatrix()"
                      :disabled="this.loadLimit > users.length"
                      class="text-capitalize"
                    >
                      Load All
                      <v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
    <!-- --------- search skill dialog ------ -->
    <v-dialog v-model="searchSkillDialog" max-width="500">
      <v-card style=" padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Search Skills
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          <div style="height: 70vh;" class="overflow-y-auto">
            <div class v-for="(categoryMap, index) in categorySkillMapping" :key="index">
              <div class>
                <div
                  class="categoryHeaderSearch"
                  :style="'background-color:' + categoryMap.categoryColorCode"
                >{{categoryMap.categoryName}}</div>

                <div class v-for="(skill, index) in categoryMap.skillSet" :key="index">
                  <v-list-item>
                    <v-list-item-action>
                      <v-checkbox multiple v-model="selectedSkills" :value="skill.skillId"></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-title
                      style="font-size: 12px"
                      class="skillNameSearch"
                    >{{skill.skillName}}</v-list-item-title>
                  </v-list-item>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn width="100px" color="#FF6161" dark @click="searchSkillDialog = false">Cancel</v-btn>

          <v-btn width="100px" color="#2EC973" @click="searchSkillDialog = false" dark>Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import NavigationDrawer from "~/components/navigationDrawer";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    NavigationDrawer
  },
  data() {
    return {
      userId: this.$store.state.user.userId,
      searchSkillDialog: false,
      skillSearchArray: [],
      selectedSkills: "",
      loadLimit: 10
    };
  },

  async asyncData({ $axios, store }) {
    let userId = store.state.user.userId;
    const { data: projects } = await $axios.$get(`/projects?userId=${userId}`);
    const { data: users } = await $axios.$get("/users");
    const sorted = users.sort((a, b) => {
      const userA = a.firstName.toUpperCase();
      const userB = b.firstName.toUpperCase();

      if (userA < userB) return -1;
      if (userA > userB) return 1;

      return 0;
    });
    console.log(projects);
    console.log(users);
    return {
      projects: projects,
      users: users,
      name: users[0].userId
    };
  },
  mounted() {
    $(document).ready(function() {
      $("#div2").on("scroll", function() {
        $("#div1").scrollLeft($(this).scrollLeft());
      });
    });

    $(document).ready(function() {
      $("#div1").on("scroll", function() {
        $("#div2").scrollLeft($(this).scrollLeft());
      });
    });

    $(document).ready(function() {
      $("#div2").on("scroll", function() {
        $("#div3").scrollTop($(this).scrollTop());
      });
    });

    $(document).ready(function() {
      $("#div3").on("scroll", function() {
        $("#div2").scrollTop($(this).scrollTop());
      });
    });
  },

  methods: {
    loadMatrix() {
      this.loadLimit = this.loadLimit + 10;
      this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
        // limit: this.users.length,
        limit: this.loadLimit,
        offset: 0
      });
    },
    loadAllMatrix() {
      this.loadLimit = this.users.length + 1;
      this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
        limit: this.users.length,
        offset: 0
      });
    },
    searchDialogOpen() {
      this.searchSkillDialog = true;
    },
    async getSkills(categoryId) {
      let categorySkillResponse;
      try {
        categorySkillResponse = await this.$axios.$get(
          `/category/${categoryId}/skill`,
          {
            headers: {
              userId: this.userId
            }
          }
        );
        console.log("RETRIVED", categorySkillResponse.data);
        return categorySkillResponse.data;
      } catch (error) {
        console.log("Error fetching selected category skills", error);
      }
    }
  },
  created() {
    this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
      // limit: this.users.length,
      limit: 10,
      offset: 0
    });
    this.$store.dispatch("project/clearProject");
    this.$store.dispatch("skillMatrix/fetchSkillCategory");
    this.$store.dispatch("skillMatrix/fetchCategorySkillMapping");

    this.$store.dispatch("skillMatrix/fetchUserSkills", this.userId);
  },
  computed: {
    ...mapState({
      skillCategory: state => state.skillMatrix.skillCategory,
      categorySkills: state => state.skillMatrix.skills,
      categorySkillMapping: state => state.skillMatrix.categorySkillMapping,
      userSkills: state => state.skillMatrix.userSkills,
      organizationSkills: state => state.skillMatrix.organizationSkills
    }),
    skillArray() {
      let SkillSearchList = this.categorySkillMapping;
      let skillList = [];
      for (let index1 = 0; index1 < SkillSearchList.length; ++index1) {
        for (
          let index2 = 0;
          index2 < SkillSearchList[index1].skillSet.length;
          ++index2
        ) {
          let skill = SkillSearchList[index1].skillSet[index2];
          skillList.push({
            name: skill.skillName,
            id: skill.skillId
          });
        }
      }
      return skillList;
    },

    searchSkills: {
      get() {
        return this.selectedSkills;
      },
      set(value) {}
    }
  }
};
</script>


