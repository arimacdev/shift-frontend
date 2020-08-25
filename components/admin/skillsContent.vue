<template>
  <div class="skillsContentWrapper overflow-y-auto">
    <v-list-item-icon
      @click="updateCategoryDialog = true"
      style="position:absolute; right:10px; background-color: blue; padding: 5px; border-radius: 50%"
    >
      <v-icon @click="updateCategoryDialog = true" size="15" color="#FFFFFF">mdi-pencil</v-icon>
    </v-list-item-icon>
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
                depressed
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
              <v-icon @click="updateSkillDialog = true; selectSkill(skill)">mdi-pencil-circle</v-icon>
            </v-list-item-action>
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
            depressed
            :disabled="!isValid"
            style="margin-top: -5px"
            color="#0BAFFF"
            height="45px"
            class="skillsDiv text-capitalize"
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

          <v-btn
            depressed
            class="text-capitalize"
            width="100px"
            color="#FF6161"
            dark
            @click="deleteDialog = false"
          >Cancel</v-btn>

          <v-btn
            depressed
            class="text-capitalize"
            width="100px"
            color="#2EC973"
            dark
            @click="deleteDialog = false; deleteCategory()"
          >Ok</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ------- update skill dialog ------ -->

    <v-dialog v-model="updateSkillDialog" max-width="450">
      <v-card style=" padding-bottom: 25px">
        <v-form v-model="isValidUpdate" ref="form">
          <v-card-title style="text-align: center">
            <v-spacer></v-spacer>Update Skill
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text>
            <v-text-field
              :rules="skillUpdateRules"
              v-model="skillUpdateName"
              outlined
              background-color="#EDF0F5"
              label="Skill name"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              depressed
              width="100px"
              color="#FF6161"
              dark
              class="text-capitalize"
              @click="updateSkillDialog = false"
            >Cancel</v-btn>

            <v-btn
              depressed
              class="text-capitalize"
              :disabled="!isValidUpdate"
              width="100px"
              color="#2EC973"
              style="color: #FFFFFF"
              @click="updateSkillDialog = false; updateSkill()"
            >Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- ------- update skill cat dialog ------ -->

    <v-dialog v-model="updateCategoryDialog" max-width="450">
      <v-card style=" padding-bottom: 25px">
        <v-form v-model="isValidCatUpdate" ref="form">
          <v-card-title style="text-align: center">
            <v-spacer></v-spacer>Update Skill Category
            <v-spacer></v-spacer>
          </v-card-title>

          <v-card-text>
            <v-text-field
              :rules="skillCatUpdateRules"
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
              v-model="colorPicker"
            ></v-text-field>
            <v-color-picker
              width="100%"
              v-model="colorPicker"
              hide-canvas
              class="ma-2"
              show-swatches
            ></v-color-picker>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              depressed
              class="text-capitalize"
              width="100px"
              color="#FF6161"
              dark
              @click="updateCategoryDialog = false"
            >Cancel</v-btn>

            <v-btn
              depressed
              class="text-capitalize"
              :disabled="!isValidCatUpdate"
              width="100px"
              color="#2EC973"
              style="color: #FFFFFF"
              @click="updateCategoryDialog = false; updateSkillCategory()"
            >Ok</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
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

          <v-btn
            depressed
            class="text-capitalize"
            width="100px"
            color="#FF6161"
            dark
            @click="deleteSkillDialog = false"
          >Cancel</v-btn>

          <v-btn
            depressed
            class="text-capitalize"
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
    "error-popup": ErrorPopup,
  },
  data() {
    return {
      updatedName: "",
      updatedColor: "",
      updatedSkillName: "",
      updateSkillDialog: false,
      skill: {},
      isValid: true,
      isValidUpdate: true,
      isValidCatUpdate: true,
      updateCategoryDialog: false,
      deleteDialog: false,
      deleteSkillDialog: false,
      skillName: "",
      userId: this.$store.state.user.userId,
      errorMessage: "",
      successMessage: "",
      skillRules: [(value) => !!value || "Skill is required!"],
      skillUpdateRules: [(value) => !!value || "Skill is required!"],
      skillCatUpdateRules: [
        (value) => !!value || "Skill category name is required!",
      ],
      component: "",
    };
  },
  methods: {
    close() {
      this.component = "";
    },
    selectSkill(skill) {
      this.skill = skill;
    },
    async updateSkill() {
      let skillName = "";
      if (this.updatedSkillName != "") {
        let response;
        try {
          response = await this.$axios.$put(
            `/category/${this.selectedCategory.categoryId}/skill/${this.skill.skillId}`,
            {
              skillName: this.updatedSkillName,
            },
            {
              headers: {
                userId: this.userId,
              },
            }
          );
          this.$store.dispatch(
            "skillMatrix/fetchCategorySkills",
            this.selectedCategory.categoryId
          );

          this.successMessage = "Skill updated successfully";
          this.component = "success-popup";
          setTimeout(() => {
            this.close();
          }, 3000);
          this.overlay = false;
          this.updatedSkillName = "";

          // console.log("update task status response", response);
        } catch (e) {
          this.errorMessage = e.response.data;
          this.component = "error-popup";
          setTimeout(() => {
            this.close();
          }, 3000);
          this.overlay = false;
          console.log("Error updating a status", e);
          this.updatedSkillName = "";
        }
      }
    },
    async updateSkillCategory() {
      let catName = "";
      if (this.updatedName == "") {
        catName = this.selectedCategory.categoryName;
      } else {
        catName = this.updatedName;
      }
      try {
        console.log(this.selectedCategory.categoryName + "/" + catName);
        let response;

        response = await this.$axios.$put(
          `/category/${this.selectedCategory.categoryId}`,
          {
            categoryName: catName,
            categoryColorCode: this.updatedColor,
          },
          {
            headers: {
              userId: this.userId,
            },
          }
        );
        this.$store.dispatch(
          "skillMatrix/fetchSelectedCategory",
          this.selectedCategory.categoryId
        );
        this.$store.dispatch("skillMatrix/fetchSkillCategory");
        this.successMessage = "Category updated successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log("Error updating a status", e);
      }
    },
    async deleteSkill(skillId) {
      let response;
      try {
        response = await this.$axios.$delete(
          `/category/${this.selectedCategory.categoryId}/skill/${this.skill.skillId}`,
          {
            headers: {
              userId: this.userId,
            },
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
            skillName: this.skillName,
          },
          {
            headers: {
              userId: this.userId,
            },
          }
        );

        this.skillName = "";

        this.$store.dispatch(
          "skillMatrix/fetchSelectedCategory",
          this.selectedCategory.categoryId
        );
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
              userId: this.userId,
            },
          }
        );
        this.$store.dispatch("skillMatrix/fetchSkillCategory");
        this.$emit("removeComponent");
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
  },
  computed: {
    ...mapState({
      selectedCategory: (state) => state.skillMatrix.selectedCategory,
      categorySkills: (state) => state.skillMatrix.skills,
    }),
    categoryName: {
      get() {
        return this.selectedCategory.categoryName;
      },
      set(value) {
        this.updatedName = value;
      },
    },
    skillUpdateName: {
      get() {
        return this.skill.skillName;
      },
      set(value) {
        this.updatedSkillName = value;
      },
    },
    colorPicker: {
      get() {
        return this.selectedCategory.categoryColorCode;
      },
      set(value) {
        this.updatedColor = value;
      },
    },
  },
};
</script>