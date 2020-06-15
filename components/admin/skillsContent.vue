<template>
  <div class="skillsContentWrapper">
    <v-row>
      <v-col>Skill Category Name</v-col>
    </v-row>
    <v-row>
      <v-col>
        <div style="float: left">
          <span class="display-1 font-weight-bold">{{selectedCategory.categoryName}}</span>
          &nbsp;
          <v-divider vertical></v-divider>
        </div>
        <div style="float: left">
          <v-row>
            <v-col>
              <span style="margin-left: 30px; ">Color</span>
            </v-col>
            <v-col>
              <div
                :style="'height: 20px; width: 20px; border-radius: 5px; background-color:' + selectedCategory.categoryColorCode"
              ></div>
            </v-col>
            <v-col>
              <v-btn
                @click="deleteDialog = true"
                style="margin-left: 30px; margin-top: -10px "
                color="error"
                class="text-capitalize"
              >Delete Skill Category</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-divider style="margin-top: 20px"></v-divider>
    <v-row>
      <v-col md="5">
        Skills
        <div style="margin-top: 20px" v-if="categorySkills == ''">No skills to show</div>
        <div v-for="(skill, index) in categorySkills" :key="index" class="skillsDiv">
          <!-- <span></span> -->
          <v-list-item>
            <v-list-item-content>{{skill.skillName}}</v-list-item-content>
            <v-list-item-action>
              <v-icon @click="deleteSkillDialog = true; selectSkill(skill)">mdi-delete-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-col>
      <v-col md="2"></v-col>
      <v-col md="5">
        <v-form v-model="isValid" ref="form">
          <v-text-field outlined v-model="skillName" label="New skill" :rules="skillRules"></v-text-field>
          <v-btn
            :disabled="!isValid"
            style="margin-top: -5px"
            color="#0BAFFF"
            height="45px"
            class="skillsDiv"
            @click="addSkill()"
          >
            <v-list-item>
              <v-list-item-content class="text-capitalize" style="color: #FFFFFF">Add New Skill</v-list-item-content>
              <v-list-item-action>
                <v-icon color="#FFFFFF">mdi-plus-circle</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-btn>
        </v-form>
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

          <v-btn
            width="100px"
            color="#2EC973"
            dark
            @click="deleteDialog = false; deleteCategory()"
          >Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- --------- delete skill dialog ------ -->
    <v-dialog v-model="deleteSkillDialog" max-width="350">
      <v-card style="text-align: center ; padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Delete Skill
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>If you delete the skill, skill will remove from the users that has been assigned.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn width="100px" color="#FF6161" dark @click="deleteSkillDialog = false">Cancel</v-btn>

          <v-btn
            width="100px"
            color="#2EC973"
            dark
            @click="deleteSkillDialog = false; deleteSkill()"
          >Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="skillTabPopup" @click="close">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
export default {
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  data() {
    return {
      skill: {},
      isValid: true,
      deleteDialog: false,
      deleteSkillDialog: false,
      skillName: "",
      userId: this.$store.state.user.userId,
      errorMessage: "",
      successMessage: "",
      skillRules: [value => !!value || "Skill is required!"],
      component: ""
    };
  },
  methods: {
    close() {
      this.component = "";
    },
    selectSkill(skill) {
      this.skill = skill;
    },
    async deleteSkill(skillId) {
      let response;
      try {
        response = await this.$axios.$delete(
          `/category/${this.selectedCategory.categoryId}/skill/${this.skill.skillId}`,
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch(
          "skillMatrix/fetchCategorySkills",
          this.selectedCategory.categoryId
        );
        this.successMessage = "Skill deleted successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
    async addSkill() {
      let response;
      try {
        response = await this.$axios.$post(
          `/category/${this.selectedCategory.categoryId}/skill`,
          {
            skillName: this.skillName
          },
          {
            headers: {
              userId: this.userId
            }
          }
        );

        this.skillName = "";

        this.$store.dispatch(
          "skillMatrix/fetchCategorySkills",
          this.selectedCategory.categoryId
        );
        this.successMessage = "Skill added successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$refs.form.reset();
        // console.log("update task status response", response);
      } catch (e) {
        this.skillName = "";
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    async deleteCategory() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/category/${this.selectedCategory.categoryId}`,
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch("skillMatrix/fetchSkillCategory");
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    }
  },
  computed: {
    ...mapState({
      selectedCategory: state => state.skillMatrix.selectedCategory,
      categorySkills: state => state.skillMatrix.skills
    })
  }
};
</script>