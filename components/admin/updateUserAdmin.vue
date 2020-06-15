<template>
  <div class>
    <div class="adminBlackBar"></div>
    <div class="adminUserImage">
      <v-img
        v-if="
          selectedUser.profileImage != null && selectedUser.profileImage != ''
        "
        class="userAdminProfileImage"
        :src="selectedUser.profileImage"
      ></v-img>
      <v-img
        v-else
        class="userAdminProfileImage"
        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
      ></v-img>
    </div>
    <div class="userNameAdmin">{{this.selectedUser.firstName + " " + this.selectedUser.lastName}}</div>
    <div class="buttonSectionAdmin">
      <!-- <v-btn color="#FFC212" dark small @click.stop="resetDialog = true">Reset Password</v-btn> -->
      <v-btn
        v-if="selectedUser.isActive == true"
        color="#FF6161"
        dark
        small
        @click.stop="deactivateDialog = true"
      >Deactivate User</v-btn>
      <v-btn
        v-if="selectedUser.isActive == false"
        color="#B52DD7"
        dark
        small
        @click.stop="activateDialog = true"
      >Activate User</v-btn>
    </div>

    <div class="formContentAdmin userUpdateSection overflow-y-auto">
      <v-form v-model="isValid" ref="form">
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="12" class="textGrid">
            <!-- <p class="addProjectTitle">Edit user</p> -->
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <v-text-field
              v-model="userFirstName"
              flat
              outlined
              name="userFirstName"
              label="First Name"
              class="profileUpdateTextFields"
              :rules="firstNameRules"
            />

            <!-- <div
              v-if="$v.firstName.$error && !$v.firstName.required"
              class="errorText"
            >First name is required</div>
            <div
              v-if="$v.firstName.$error && !$v.firstName.maxLength"
              class="errorText"
            >Cannot use more than 50 characters</div>-->
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              v-model="userLastName"
              name="lastname"
              label="Last Name"
              class="profileUpdateTextFields"
              :rules="lastNameRules"
            />
            <!-- <div
              v-if="$v.lastName.$error && !$v.lastName.required"
              class="errorText"
            >Last name is required</div>
            <div
              v-if="$v.lastName.$error && !$v.lastName.maxLength"
              class="errorText"
            >Cannot use more than 50 characters</div>-->
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              type="email"
              v-model="userEmail"
              name="email"
              label="Email"
              class="profileUpdateTextFields"
              :rules="emailRules"
            />
            <!-- <div v-if="$v.email.$error && !$v.email.required" class="errorText">Email is required</div>
            <div v-if="$v.email.$error && !$v.email.email" class="errorText">Use valid Email address</div>-->
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              disabled
              flat
              outlined
              v-model="selectedUser.userName"
              label="User name"
              class="profileUpdateTextFields"
            />
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="6" class></v-col>
          <v-col sm="12" md="6" class="buttonGrid">
            <v-btn
              :disabled="!isValid"
              height="50px"
              color="blue"
              class="addProjectButtonSuccess"
              @click="postData()"
            >
              <!-- class="submitButtonEdit profileButton" -->
              <v-list-item dark>
                <v-list-item-action>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Update</v-list-item-title>
                </v-list-item-content>
                <v-icon>mdi-plus-circle</v-icon>
              </v-list-item>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row v-if="organizationalRoles.indexOf('SUPER_ADMIN') > -1">
          <v-col>
            <v-row>
              <v-col md="3">
                <div style="color: #576377; font-weight: 450">Organization Roles</div>
              </v-col>
              <v-col md="9">
                <v-row>
                  <v-col md="3" v-for="(role, index) in realmRoles" :key="index">
                    <v-btn
                      width="110px"
                      small
                      @click="selectUserRole(role)"
                      :color="checkUserRole(role.name)"
                      :disabled="checkUser(role.name)"
                    >{{ role.name }}</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="filterCategory"
              :items="categoryArray"
              item-text="name"
              item-value="id"
              flat
              outlined
              chips
              background-color="#FFFFFF"
              small-chips
              label="Skill Category"
              clearable
              @change="getSkills()"
              @click:clear="clearCategory()"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              v-if="this.filterCategory !== undefined && this.filterCategory !== ''"
              v-model="filterSkill"
              :items="skillArray"
              multiple
              item-text="name"
              item-value="id"
              flat
              outlined
              chips
              background-color="#FFFFFF"
              small-chips
              label="Skills"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row style="margin-top: -20px" v-if="this.selectedSkills != ''">
          <!-- <v-col md="10">
            <v-select
              auto-grow="false"
              disabled
              outlined
              flat
              label="Selected Skills"
              small-chips
              v-model="this.selectedSkills"
              :items="this.selectedSkills"
              multiple
              item-text="name"
              item-value="id"
            ></v-select>
          </v-col>-->
          <v-col md="2">
            <v-btn @click="addSkillsToUser()">Submit</v-btn>
          </v-col>
        </v-row>

        <v-row class="skillsSection">
          <v-col>
            <div class="skillDisplayDiv">
              <div class="skillScrollingWrapper">
                <div
                  class="skillCard text-center"
                  v-for="(value, prop, index) in this.categorizedSkillMap()"
                  :key="index"
                >
                  <div class="skillHeader">{{value[0].categoryName}}</div>
                  <!-- <div
                    class="skillBody"
                    v-for="(skill, index) in value"
                    :key="index"
                  >{{skill.skillName}}</div>
                  </div>-->
                  <div class="skillBody">
                    <div
                      style="margin-bottom: 10px"
                      v-for="(skill, index) in value"
                      :key="index"
                    >{{skill.skillName}}</div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <!-- -------- reset dialog -------- -->
    <v-dialog v-model="resetDialog" max-width="350">
      <v-card style="text-align: center ; padding-bottom: 25px">
        <v-card-title class="headline" style="text-align: center">
          <v-spacer></v-spacer>Reset Password
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          User will receive an email with password reset link. User should
          follow mentioned steps to reset the password
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" dark @click="resetDialog = false">Cancel</v-btn>

          <v-btn small color="green darken-1" dark @click="resetDialog = false">Confirm</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- -------- deactivate dialog -------- -->
    <v-dialog v-model="deactivateDialog" max-width="350">
      <v-card style="text-align: center; padding-bottom: 25px">
        <v-card-title class="headline" style="text-align: center">
          <v-spacer></v-spacer>Deactivate User
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          Are you sure you need to deactivate the user permanently? Deactivated
          users would not be able to interact with the tool and not allowed to
          login to the system
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" dark @click="deactivateDialog = false">Cancel</v-btn>

          <v-btn
            small
            color="green darken-1"
            dark
            @click="
              deactivateDialog = false;
              deactivateUser();
            "
          >Confirm</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- -------- activate dialog -------- -->
    <v-dialog v-model="activateDialog" max-width="350">
      <v-card style="text-align: center; padding-bottom: 25px">
        <v-card-title class="headline" style="text-align: center">
          <v-spacer></v-spacer>Activate User
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          Are you sure you need to activate the user? Activated user will allow
          to login to the system and able to interact with the tool
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" dark @click="activateDialog = false">Cancel</v-btn>

          <v-btn
            small
            color="green darken-1"
            dark
            @click="
              activateDialog = false;
              activateUser();
            "
          >Confirm</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- -------- role change dialog -------- -->
    <v-dialog v-model="roleChangeDialog" max-width="350">
      <v-card style="text-align: center; padding-bottom: 25px">
        <v-card-title class="headline" style="text-align: center" v-if="this.existingRole">
          <v-spacer></v-spacer>Remove User Role
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-title class="headline" style="text-align: center" v-else>
          <v-spacer></v-spacer>Add User Role
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text v-if="this.existingRole">
          <!-- Remove User Role -->
          <br />The privileges of this role no longer exists for the user
        </v-card-text>
        <v-card-text v-else>
          <!-- Add User Role -->
          <br />The user will receive privileges according to the selected role
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" dark @click="roleChangeDialog = false">Cancel</v-btn>

          <v-btn small color="green darken-1" dark @click="userRoleUpdate">Confirm</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div @click="close" class="updateProfilePopupDiv">
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
import axios from "axios";
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";

import {
  numeric,
  required,
  between,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  props: ["userData"],
  name: "editUser",
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },

  data() {
    return {
      filterCategory: "",
      selectedSkills: [],
      // skillList: [],
      isValid: true,
      firstNameRules: [value => !!value || "First name is required!"],
      lastNameRules: [value => !!value || "Last name is required!"],
      emailRules: [
        value => !!value || "E-mail is required",
        value => /.+@.+\..+/.test(value) || "E-mail must be valid"
      ],
      resetDialog: false,
      roleChangeDialog: false,
      deactivateDialog: false,
      activateDialog: false,
      successMessage: "",
      userId: this.userData,
      adminId: this.$store.state.user.userId,
      password: "",
      confirmPassword: "",
      component: "",
      errorMessage: "",
      successMessage: "",
      selectedRole: {},
      existingRole: false,
      fullName: this.userFirstName,
      firstName: "",
      lastName: "",
      email: "",
      designation: ""
    };
  },

  methods: {
    async addSkillsToUser() {
      let response;
      try {
        response = await this.$axios.$post(
          `/category/${this.filterCategory}/user/skill`,
          {
            assigneeId: this.userData.userId,
            skills: this.selectedSkills
          },
          {
            headers: {
              userId: this.adminId
            }
          }
        );
        this.filterCategory = "";
        this.selectedSkills = [];

        this.$store.dispatch(
          "skillMap/fetchUserSkillMap",
          this.userData.userId
        );
        this.successMessage = "Skill added to user successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.filterCategory = "";
        this.selectedSkills = [];
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error updating a status", e);
      }
    },
    getSkills() {
      console.log("TRIGERRED " + this.filterCategory);
      if (this.filterCategory != undefined) {
        this.$store.dispatch(
          "skillMatrix/fetchCategorySkills",
          this.filterCategory
        );
      } else {
        this.selectedSkills = [];
      }
    },
    clearSkill() {
      // this.filterSkill = [];
    },
    clearCategory() {
      console.log("CLEARED " + this.filterCategory);
      this.filterCategory = "";
    },
    categorizedSkillMap() {
      let skillmap = this.userSkillMap;
      // console.log("skillmap", this.userSkillMap);
      const orderedSkillMap = skillmap.reduce((accumilate, current) => {
        accumilate[current.categoryId] = (
          accumilate[current.categoryId] || []
        ).concat(current);
        return accumilate;
      }, {});
      return orderedSkillMap;
    },
    checkUser(roleName) {
      if (roleName === "USER") {
        return true;
      } else return false;
    },
    userRoleUpdate() {
      this.roleChangeDialog = false;
      if (!this.existingRole) {
        this.$store.dispatch("admin/addUserRole", {
          userId: this.userData.userId,
          id: this.selectedRole.id,
          name: this.selectedRole.name
        });
      } else {
        if (this.existingRole) {
          // console.log("calling delete");
          this.$store.dispatch("admin/removeUserRole", {
            userId: this.userData.userId,
            id: this.selectedRole.id,
            name: this.selectedRole.name
          });
        }
      }
    },
    checkUserRole(name) {
      if (this.userRoles.some(role => role.name === name)) return "primary";
    },
    selectUserRole(userRole) {
      // console.log("userRole", userRole);
      this.roleChangeDialog = true;
      this.selectedRole = userRole;
      if (
        this.userRoles.filter(role => role.name === userRole.name).length > 0
      ) {
        this.existingRole = true;
        // console.log("role exists");
      } else {
        // console.log("role not exists");

        this.existingRole = false;
      }
    },
    async deactivateUser() {
      let response;
      try {
        response = await this.$axios.$post(
          `/users/deactivate`,
          {
            headers: {
              user: this.adminId
            }
          },
          {
            data: {
              adminId: this.adminId,
              userId: this.userData.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "User successfully deactivated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$v.$reset();
        let updatedUser = this.selectedUser;
        this.$store.dispatch("user/updateActivationStatus", {
          user: updatedUser,
          status: false
        });
      } catch (e) {
        console.log("Error creating user", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        //   alert("Error updating user!")
      }
    },

    async activateUser() {
      let response;
      try {
        response = await this.$axios.$post(
          `/users/activate`,
          {
            headers: {
              user: this.adminId
            }
          },
          {
            data: {
              adminId: this.adminId,
              userId: this.userData.userId
            }
          }
        );
        this.component = "success-popup";
        this.successMessage = "User successfully activated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$v.$reset();
        let updatedUser = this.selectedUser;
        this.$store.dispatch("user/updateActivationStatus", {
          user: updatedUser,
          status: true
        });
      } catch (e) {
        console.log("Error creating user", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        //   alert("Error updating user!")
      }
    },
    async postData() {
      const userObj = {
        firstName: this.getFirstName(),
        lastName: this.getLastName(),
        email: this.getEmail(),
        designation: this.designation
      };
      let response;
      try {
        response = await this.$axios.$put(
          `/users/${this.selectedUser.userId}`,
          userObj
        );
        this.component = "success-popup";
        this.successMessage = "User successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$v.$reset();
        let updatedUser = this.selectedUser;
        this.$store.dispatch("user/updateSelectedUser", userObj);
      } catch (e) {
        console.log("Error creating user", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        //   alert("Error updating user!")
      }
    },
    getFirstName() {
      if (this.firstName.length === 0) {
        return this.selectedUser.firstName;
      } else return this.firstName;
    },
    getLastName() {
      if (this.lastName.length === 0) {
        return this.selectedUser.lastName;
      } else return this.lastName;
    },
    getEmail() {
      if (this.email.length === 0) {
        return this.selectedUser.email;
      } else return this.email;
    },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
    },
    close() {
      this.component = "";
    }
  },
  computed: {
    ...mapState({
      realmRoles: state => state.admin.realmRoles,
      userRoles: state => state.admin.userRoles,
      selectedUser: state => state.user.selectedUser,
      organizationalRoles: state => state.user.organizationalRoles,
      userSkillMap: state => state.skillMap.userSkillMap,
      skillCategory: state => state.skillMatrix.skillCategory,
      categorySkills: state => state.skillMatrix.skills
    }),
    categoryArray() {
      let categorySearchList = this.skillCategory;
      let categoryList = [];
      for (let index = 0; index < categorySearchList.length; ++index) {
        let category = categorySearchList[index];
        categoryList.push({
          name: category.categoryName,
          id: category.categoryId
        });
      }
      return categoryList;
    },
    skillArray() {
      let skillsSearchList = this.categorySkills;
      let skillList = [];
      for (let index = 0; index < skillsSearchList.length; ++index) {
        let skill = skillsSearchList[index];
        skillList.push({
          name: skill.skillName,
          id: skill.skillId
        });
      }
      return skillList;
    },
    checkValidation: {
      get() {
        if (this.$v.$invalid == true) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        this.projectName = value;
      }
    },
    addProjectStyling: {
      get() {
        if (this.isValid == false) {
          return "addProjectButtonFail";
        } else {
          return "addProjectButtonSuccess";
        }
      }
    },
    filterSkill: {
      get() {},
      set(value) {
        this.selectedSkills = value;
      }
    },
    userFirstName: {
      get() {
        return this.selectedUser.firstName;
      },
      set(value) {
        this.firstName = value;
      }
    },
    userLastName: {
      get() {
        return this.selectedUser.lastName;
      },
      set(value) {
        this.lastName = value;
      }
    },
    userEmail: {
      get() {
        return this.selectedUser.email;
      },
      set(value) {
        this.email = value;
      }
    }
  },
  validations: {
    firstName: {
      required,
      maxLength: maxLength(50)
    },
    lastName: {
      required,
      maxLength: maxLength(50)
    },
    // designation: {
    //   required,
    //   maxLength: maxLength(50)
    // },
    email: {
      required,
      email
    }
  }
};
</script>
