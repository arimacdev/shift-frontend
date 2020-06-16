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
        <v-row>
          <v-col md="3">
            <v-autocomplete
              background-color="#EDF0F5"
              v-model="select"
              :loading="loading"
              :search-input.sync="search"
              cache-items
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
              background-color="#EDF0F5"
              v-model="select"
              :loading="loading"
              :search-input.sync="search"
              cache-items
              class="mx-4 searchBar"
              flat
              hide-no-data
              hide-details
              append-icon
              prepend-inner-icon="mdi-magnify"
              label="Click to choose"
              outlined
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col md="1">
            <v-btn dark width="100%" height="100%" color="#FF6161">
              <v-icon color="#FFFFFF">mdi-cancel</v-icon>
              <!-- Cancel -->
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- loop following row for each user -->
            <v-row>
              <v-col md="3"></v-col>
              <v-col md="9">
                <div class="skillDisplayDiv">
                  <div class="skillScrollingWrapper">
                    <div class="skillCard" v-for="(category, index) in skillCategory" :key="index">
                      <div
                        class="categoryHeader"
                        :style="'background-color:' + category.categoryColorCode"
                      >{{category.categoryName}}</div>

                      <div class="skillName" v-for="(skill, index) in categorySkills" :key="index">
                        <v-list-item-title style="font-size: 12px">{{skill.skillName}}</v-list-item-title>
                      </div>
                      <br />
                      <div
                        class="skillDisplayBox"
                        v-for="(skill, index) in categorySkills"
                        :key="index"
                      >
                        <div class="skillDisplayCheckBox">
                          <v-icon size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="3">
                <v-list-item-group>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img
                        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Bahubali Karunarathne</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                </v-list-item-group>
              </v-col>
              <v-col md="9">skill list</v-col>
            </v-row>
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

export default {
  components: {
    NavigationDrawer
  },
  data() {
    return {
      userId: this.$store.state.user.userId
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
  methods: {
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
    this.$store.dispatch("project/clearProject");
  },
  computed: {
    ...mapState({
      skillCategory: state => state.skillMatrix.skillCategory,
      categorySkills: state => state.skillMatrix.skills
    })
  },
  created() {
    this.$store.dispatch("skillMatrix/fetchSkillCategory");
  }
};
</script>


