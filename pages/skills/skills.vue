<template>
  <div>
    <div
      v-if="organizationalRoles.indexOf('SUPER_ADMIN') > -1 ||
                  organizationalRoles.indexOf('WORKLOAD') > -1 ||
                  organizationalRoles.indexOf('ADMIN') > -1"
      class="top-nav"
    >
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
            <v-col md="3" style="z-index:100">
              <v-autocomplete
                return-object
                background-color="#EDF0F5"
                v-model="searchUser"
                :items="userArray"
                item-text="name"
                item-value="id"
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
                @change="searchByUser()"
              ></v-autocomplete>
            </v-col>
            <v-col md="1" style="color: #7A8B9F; font-weight: 500; ">Filter by Skills</v-col>

            <v-col style="margin-left: -20px" md="7">
              <v-autocomplete
                :menu-props="{ maxHeight: '0' }"
                dense
                background-color="#EDF0F5"
                v-model="searchSkills"
                :items="skillArray"
                item-text="name"
                item-value="id"
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
                @focus="searchDialogOpen()"
              ></v-autocomplete>
              <!-- <v-text-field @click="searchDialogOpen()" v-model="this.selectedSkills"></v-text-field> -->
            </v-col>

            <v-col md="1">
              <v-btn
                depressed
                @click="cancelSearch()"
                dark
                width="100%"
                height="40px"
                color="#FF6161"
              >
                <v-icon color="#FFFFFF">mdi-cancel</v-icon>
                <!-- Cancel -->
              </v-btn>
            </v-col>
          </v-row>
          <div
            v-if="this.skillSearch && skillFilter == ''"
            class="popupDiv"
            style="position: absolute"
          >
            <transition>
              <v-card class="errorPopupContent">
                <v-list-item>
                  <v-list-item-action>
                    <v-icon size="25" color="red">mdi-alert-outline</v-icon>
                  </v-list-item-action>
                  <v-list-item-content class="buttonText">
                    <v-list-item-title class="popupTitle">No items to show</v-list-item-title>
                    <div class="popupSubtitle errorSubtitle">No allocated users for selected skills</div>
                  </v-list-item-content>

                  <div>
                    <v-icon
                      size="15"
                      @click="cancelSearch()"
                      class="closeButton"
                      color="red"
                    >mdi-close-circle-outline</v-icon>
                  </div>
                </v-list-item>
              </v-card>
            </transition>
          </div>
          <!-- <v-row style="z-index: 1000" v-if="this.skillSearch && skillFilter == ''">
          <v-col>
            <div class="noItemText">No items to show {{skillFilter}}</div>
          </v-col>
          </v-row>-->
          <v-row class="scrollContent">
            <v-col>
              <!-- loop following row for each user -->
              <v-row class="scroll">
                <v-col md="3" sm="3">
                  <div class="userListTitle">Users</div>
                </v-col>
                <v-col md="9" sm="9" style="background-color:#ffffff; z-index: -100">
                  <div v-if="this.skillSearch && skillFilter != ''" class="skillDisplayDiv">
                    <div class="skillScrollingWrapper" id="div1">
                      <div>
                        <div>
                          <div
                            class="skillDisplayCard"
                            v-for="(categoryMap, index) in skillFilter[0]
                            .category"
                            :key="index"
                          >
                            <div class="skillScrollingWrapper1">
                              <v-tooltip :color="categoryMap.categoryColorCode" bottom>
                                <template v-slot:activator="{ on }">
                                  <div
                                    v-on="on"
                                    class="categoryHeader"
                                    :style="
                              'background-color:' +
                                  categoryMap.categoryColorCode + '; width:' + categoryMap.skillSet.length * 95 + 'px; !important'
                            "
                                  >{{ categoryMap.categoryName }}</div>
                                </template>
                                <span>{{ categoryMap.categoryName }}</span>
                              </v-tooltip>

                              <div
                                class="skillName skillDisplayCard1"
                                v-for="(skill, index) in categoryMap.skillSet"
                                :key="index"
                              >
                                <v-tooltip :color="categoryMap.categoryColorCode" bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-list-item-title
                                      v-on="on"
                                      style="font-size: 12px"
                                    >{{ skill.skillName }}</v-list-item-title>
                                  </template>
                                  <span>{{ skill.skillName }}</span>
                                </v-tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-if="this.skillSearch && skillFilter == ''">no items</div> -->
                  <div v-else-if="this.userSearch" class="skillDisplayDiv">
                    <div class="skillScrollingWrapper" id="div1">
                      <div>
                        <div
                          class="skillDisplayCard"
                          v-for="(categoryMap, index) in userSkills[0].category"
                          :key="index"
                        >
                          <div class="skillScrollingWrapper1">
                            <v-tooltip :color="categoryMap.categoryColorCode" bottom>
                              <template v-slot:activator="{ on }">
                                <div
                                  v-on="on"
                                  class="categoryHeader"
                                  :style="
                              'background-color:' +
                                  categoryMap.categoryColorCode + '; width:' + categoryMap.skillSet.length * 95 + 'px; !important'
                            "
                                >{{ categoryMap.categoryName }}</div>
                              </template>
                              <span>{{ categoryMap.categoryName }}</span>
                            </v-tooltip>

                            <div
                              class="skillName skillDisplayCard1"
                              v-for="(skill, index) in categoryMap.skillSet"
                              :key="index"
                            >
                              <v-tooltip :color="categoryMap.categoryColorCode" bottom>
                                <template v-slot:activator="{ on }">
                                  <v-list-item-title
                                    v-on="on"
                                    style="font-size: 12px"
                                  >{{ skill.skillName }}</v-list-item-title>
                                </template>
                                <span>{{ skill.skillName }}</span>
                              </v-tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="this.matrixView" class="skillDisplayDiv">
                    <div class="skillScrollingWrapper" id="div1">
                      <div>
                        <div
                          class="skillDisplayCard"
                          v-for="(categoryMap, index) in organizationSkills[0]
                          .category"
                          :key="index"
                        >
                          <div class="skillScrollingWrapper1">
                            <v-tooltip :color="categoryMap.categoryColorCode" bottom>
                              <template v-slot:activator="{ on }">
                                <div
                                  v-on="on"
                                  class="categoryHeader"
                                  :style="
                              'background-color:' +
                                  categoryMap.categoryColorCode + '; width:' + categoryMap.skillSet.length * 95 + 'px; !important'
                            "
                                >{{ categoryMap.categoryName }}</div>
                              </template>
                              <span>{{ categoryMap.categoryName }}</span>
                            </v-tooltip>

                            <div
                              class="skillName skillDisplayCard1"
                              v-for="(skill, index) in categoryMap.skillSet"
                              :key="index"
                            >
                              <!-- <v-list-item-title style="font-size: 12px">{{
                              skill.skillName
                              }}</v-list-item-title>-->

                              <v-tooltip :color="categoryMap.categoryColorCode" bottom>
                                <template v-slot:activator="{ on }">
                                  <v-list-item-title
                                    v-on="on"
                                    style="font-size: 12px"
                                  >{{ skill.skillName }}</v-list-item-title>
                                </template>
                                <span>{{ skill.skillName }}</span>
                              </v-tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row style="margin-bottom: -60px; " class="overflow-y-hidden">
                <v-col md="3" sm="3" style="z-index: 100">
                  <v-list-item-group
                    v-if="this.skillSearch && skillFilter != ''"
                    class="skillDisplayScreenUser overflow-y-auto"
                    id="div3"
                  >
                    <div
                      class="matrixUserListItem"
                      v-for="(user, index) in skillFilter"
                      :key="index"
                    >
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img
                            v-if="
                            user.userProfileImage != null &&
                              user.userProfileImage != ''
                          "
                            :src="user.userProfileImage"
                          ></v-img>
                          <v-img
                            v-else
                            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ user.firstName }}
                            {{ user.lastName }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider style="margin-top: 10px" class="mx-4"></v-divider>
                    </div>
                  </v-list-item-group>
                  <v-list-item-group
                    v-else-if="this.userSearch"
                    class="skillDisplayScreenUser overflow-y-auto"
                    id="div3"
                  >
                    <div class="matrixUserListItem">
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img
                            v-if="
                            this.searchUser.profileImage != null &&
                              this.searchUser.profileImage != ''
                          "
                            :src="this.searchUser.profileImage"
                          ></v-img>
                          <v-img
                            v-else
                            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                            this.searchUser.name
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider style="margin-top: 10px" class="mx-4"></v-divider>
                    </div>
                  </v-list-item-group>
                  <v-list-item-group
                    v-else-if="this.matrixView"
                    class="skillDisplayScreenUser overflow-y-auto"
                    id="div3"
                  >
                    <div
                      class="matrixUserListItem"
                      v-for="(user, index) in organizationSkills"
                      :key="index"
                    >
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img
                            v-if="
                            user.userProfileImage != null &&
                              user.userProfileImage != ''
                          "
                            :src="user.userProfileImage"
                          ></v-img>
                          <v-img
                            v-else
                            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ user.firstName }}
                            {{ user.lastName }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider style="margin-top: 10px" class="mx-4"></v-divider>
                    </div>
                  </v-list-item-group>
                </v-col>
                <v-col md="9" sm="9">
                  <div class="skillDisplayDiv">
                    <div
                      v-if="this.skillSearch && skillFilter != ''"
                      class="skillScrollingWrapperScroll skillDisplayScreen overflow-y-auto"
                      id="div2"
                    >
                      <br />
                      <div v-for="(user, index) in skillFilter" :key="index">
                        <div
                          class="skillDisplayCard"
                          v-for="(category, index) in user.category"
                          :key="index"
                        >
                          <div class="skillScrollingWrapper1">
                            <div
                              class="skillDisplayBox skillDisplayCard1"
                              v-for="(skill, index) in category.skillSet"
                              :key="index"
                            >
                              <div class="skillDisplayCheckBox">
                                <v-icon
                                  v-if="skill.isAssigned == true"
                                  size="30"
                                  color="#66B25F"
                                >mdi-checkbox-blank</v-icon>
                                <v-icon v-else size="30" color="#939393">mdi-checkbox-blank-outline</v-icon>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                    <div
                      v-else-if="this.userSearch"
                      class="skillScrollingWrapperScroll skillDisplayScreen overflow-y-auto"
                      id="div2"
                    >
                      <br />
                      <div>
                        <div
                          class="skillDisplayCard"
                          v-for="(category, index) in userSkills[0].category"
                          :key="index"
                        >
                          <div class="skillScrollingWrapper1">
                            <div
                              class="skillDisplayBox skillDisplayCard1"
                              v-for="(skill, index) in category.skillSet"
                              :key="index"
                            >
                              <div class="skillDisplayCheckBox">
                                <v-icon
                                  v-if="skill.isAssigned == true"
                                  size="30"
                                  color="#66B25F"
                                >mdi-checkbox-blank</v-icon>
                                <v-icon v-else size="30" color="#939393">mdi-checkbox-blank-outline</v-icon>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                    <div
                      v-else-if="this.matrixView"
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
                          <div class="skillScrollingWrapper1">
                            <div
                              class="skillDisplayBox skillDisplayCard1"
                              v-for="(skill, index) in category.skillSet"
                              :key="index"
                            >
                              <div class="skillDisplayCheckBox">
                                <v-icon
                                  v-if="skill.isAssigned == true"
                                  size="30"
                                  color="#66B25F"
                                >mdi-checkbox-blank</v-icon>
                                <v-icon v-else size="30" color="#939393">mdi-checkbox-blank-outline</v-icon>
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                    <br />
                    <div style="position: fixed; bottom: 10px; right: 10px;" v-if="this.matrixView">
                      <v-btn
                        depressed
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
                        depressed
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
                  >{{ categoryMap.categoryName }}</div>

                  <div class v-for="(skill, index) in categoryMap.skillSet" :key="index">
                    <v-list-item>
                      <v-list-item-action>
                        <v-checkbox multiple v-model="selectedSkills" :value="skill.skillId"></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-title
                        style="font-size: 12px"
                        class="skillNameSearch"
                      >{{ skill.skillName }}</v-list-item-title>
                    </v-list-item>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              width="100px"
              class="text-capitalize"
              depressed
              color="#FF6161"
              dark
              @click="searchSkillDialog = false"
            >Cancel</v-btn>

            <v-btn
              class="text-capitalize"
              depressed
              width="100px"
              color="#2EC973"
              @click="
              searchSkillDialog = false;
              filterSkills();
            "
              dark
            >Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-overlay :value="overlay" color="black" style="z-index:1008">
        <progress-loading />
      </v-overlay>
    </div>
    <div v-else>
      <div style="text-align: center">
        <v-row class="errorPageContainer">
          <v-col class="errorPageImage">
            <img
              align="center"
              height="100%"
              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1592549257245_Asset%202@4x.png"
              alt
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="errorPageText">
            <div class="errorMessage">Not Found!</div>
            <NuxtLink to="/" style="text-decoration: none">
              <v-btn small color="red" dark>Back to home</v-btn>
            </NuxtLink>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationDrawer from "~/components/navigationDrawer";
import axios from "axios";
import { mapState } from "vuex";
import Progress from "~/components/popups/progress";

export default {
  components: {
    NavigationDrawer,
    "progress-loading": Progress,
  },
  data() {
    return {
      overlay: false,
      empty: true,
      userId: this.$store.state.user.userId,
      searchSkillDialog: false,
      skillSearchArray: [],
      selectedSkills: "",
      loadLimit: 10,
      userSearch: false,
      skillSearch: false,
      matrixView: true,
      skillQuery: "",
      searchUser: {
        id: "",
        name: "",
        profileImage: "",
      },
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
      name: users[0].userId,
    };
  },
  mounted() {
    $(document).ready(function () {
      $("#div2").on("scroll", function () {
        $("#div1").scrollLeft($(this).scrollLeft());
      });
    });

    $(document).ready(function () {
      $("#div1").on("scroll", function () {
        $("#div2").scrollLeft($(this).scrollLeft());
      });
    });

    $(document).ready(function () {
      $("#div2").on("scroll", function () {
        $("#div3").scrollTop($(this).scrollTop());
      });
    });

    $(document).ready(function () {
      $("#div3").on("scroll", function () {
        $("#div2").scrollTop($(this).scrollTop());
      });
    });
  },

  methods: {
    emptyList() {
      if (this.skillFilter[0] != undefined) {
        return true;
      }
    },
    filterSkills() {
      this.skillSearch = true;
      this.userSearch = false;
      if (this.searchSkills.length != 0) {
        let skillList = "skill=";
        for (let i = 0; i < this.searchSkills.length; i++) {
          skillList = skillList + this.searchSkills[i];
          if (i < this.searchSkills.length - 1) {
            skillList = skillList + "&skill=";
          }
        }
        this.skillQuery = skillList;
        this.$store.dispatch("skillMatrix/fetchFilterSkills", this.skillQuery);
      }
    },
    searchByUser() {
      this.searchSkills = "";
      this.selectedSkills = " ";
      console.log("TRIGGERRED: " + this.searchUser);
      if (this.searchUser !== undefined) {
        this.userSearch = true;
        this.skillSearch = false;
        this.$store.dispatch("skillMatrix/fetchUserSkills", this.searchUser.id);
      }
    },
    cancelSearch() {
      this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
        limit: 10,
        offset: 0,
      });
      this.searchUser = null;
      this.searchSkills = "";
      this.selectedSkills = " ";
      this.userSearch = false;
      this.skillSearch = false;
      this.matrixView = true;
    },
    loadMatrix() {
      this.loadLimit = this.loadLimit + 10;
      this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
        // limit: this.users.length,
        limit: this.loadLimit,
        offset: 0,
      });
    },
    loadAllMatrix() {
      this.loadLimit = this.users.length + 1;
      this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
        limit: this.users.length,
        offset: 0,
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
              userId: this.userId,
            },
          }
        );
        console.log("RETRIVED", categorySkillResponse.data);
        return categorySkillResponse.data;
      } catch (error) {
        console.log("Error fetching selected category skills", error);
      }
    },
  },
  created() {
    this.overlay = true;
    Promise.all([
      this.$store.dispatch("skillMatrix/fetchOrganizationSkills", {
        limit: 10,
        offset: 0,
      }),
      this.$store.dispatch("project/clearProject"),
      this.$store.dispatch("skillMatrix/fetchSkillCategory"),
      this.$store.dispatch("skillMatrix/fetchCategorySkillMapping"),
      this.$store.dispatch("skillMatrix/fetchUserSkills", this.userId),
    ]).finally(() => {
      this.overlay = false;
    });
  },
  computed: {
    ...mapState({
      skillCategory: (state) => state.skillMatrix.skillCategory,
      categorySkills: (state) => state.skillMatrix.skills,
      categorySkillMapping: (state) => state.skillMatrix.categorySkillMapping,
      userSkills: (state) => state.skillMatrix.userSkills,
      organizationSkills: (state) => state.skillMatrix.organizationSkills,
      skillFilter: (state) => state.skillMatrix.skillFilter,
      organizationalRoles: (state) => state.user.organizationalRoles,
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
            id: skill.skillId,
          });
        }
      }
      return skillList;
    },
    userArray() {
      let userSearchList = this.users;
      let userList = [];
      for (let index = 0; index < userSearchList.length; ++index) {
        let user = userSearchList[index];
        userList.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
          profileImage: user.profileImage,
        });
      }
      return userList;
    },

    searchSkills: {
      get() {
        return this.selectedSkills;
      },
      set(value) {},
    },
  },
};
</script>
