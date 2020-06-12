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
                <div v-for="(category, index) in skillCategory" :key="index">
                  <div
                    class="skillsListItem"
                    :style="'background-color:' + category.categoryColorCode"
                    @click="selectCategory(category)"
                  >
                    <v-list-item dark>
                      <v-list-item-title class="catListName">{{category.categoryName}}</v-list-item-title>
                    </v-list-item>
                  </div>
                </div>
              </v-list-item-group>
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        <keep-alive>
          <component v-bind:is="component"></component>
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

          <v-btn
            width="100px"
            color="#2EC973"
            dark
            @click="skillDialog = false; addSkillCategory()"
          >Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="skillTabPopup" @click="close">
      <component v-bind:is="popup" :successMessage="successMessage" :errorMessage="errorMessage"></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>

<script>
import usersSearchBar from "~/components/tools/usersSearchBar";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import skillsContent from "~/components/admin/skillsContent";
import { mapState } from "vuex";
export default {
  components: {
    "search-bar": usersSearchBar,
    "skills-content": skillsContent,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  data() {
    return {
      errorMessage: "",
      successMessage: "",
      component: "",
      skillDialog: false,
      colorPicker: "",
      categoryName: "",
      popup: "",
      userId: this.$store.state.user.userId
    };
  },
  methods: {
    close() {
      this.popup = "";
    },
    selectCategory(category) {
      this.component = "skills-content";
      this.$store.dispatch(
        "skillMatrix/fetchSelectedCategory",
        category.categoryId
      );
    },
    async addSkillCategory() {
      let response;
      try {
        response = await this.$axios.$post(
          `/category`,
          {
            categoryName: this.categoryName,
            categoryColorCode: this.colorPicker
          },
          {
            headers: {
              userId: this.userId
            }
          }
        );

        this.categoryName = "";

        this.$store.dispatch("skillMatrix/fetchSkillCategory");
        this.successMessage = "Category added successfully";
        this.popup = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.categoryName = "";
        this.errorMessage = e.response.data;
        this.popup = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log("Error updating a status", e);
      }
    }
  },
  computed: {
    ...mapState({
      skillCategory: state => state.skillMatrix.skillCategory
    })
  }
};
</script>