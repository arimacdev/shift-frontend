<template>
  <div class="formDiv usersForms">
    <div class="adminBlackBar"></div>
    <div class="adminUserImage">
      <v-img
        v-if="userData.profileImage != null && userData.profileImage != ''  "
        class="userAdminProfileImage"
        :src="userData.profileImage"
      ></v-img>
      <v-img
        v-else
        class="userAdminProfileImage"
        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      ></v-img>
    </div>
    <div class="userNameAdmin">{{userData.firstName}} {{userData.lastName}}</div>
    <div class="buttonSectionAdmin">
      <v-btn color="#FFC212" dark small @click.stop="resetDialog = true">Reset Password</v-btn>
      <v-btn color="#FF6161" dark small @click.stop="deactivateDialog = true">Deactivate User</v-btn>
    </div>

    <div class="formContentAdmin">
      <form @submit.prevent="handleSubmit">
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="12" class="textGrid">
            <!-- <p class="addProjectTitle">Edit user</p> -->
          </v-col>
        </v-row>
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <v-text-field
              v-model="userData.firstName"
              flat
              outlined
              name="firstname"
              label="First Name"
              class="profileUpdateTextFields"
            />
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              v-model="userData.lastName"
              name="lastname"
              label="Last Name"
              class="profileUpdateTextFields"
            />
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              type="email"
              v-model="userData.email"
              name="email"
              label="Email"
              class="profileUpdateTextFields"
            />
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              v-model="designation"
              label="Designation"
              class="profileUpdateTextFields"
            />
          </v-col>
        </v-row>

        <!-- <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <input
              type="password"
              v-model.trim="$v.password.$model"
              placeholder="Password"
              class="formElements"
            />
            <div
              v-if="$v.password.$error && !$v.password.minLength"
              class="errorText"
            >Password must be at least 6 characters</div>
          </v-col>
          <v-col sm="6" md="6">
            <input
              type="password"
              v-model.trim="$v.confirmPassword.$model"
              placeholder="Confirm Password"
              class="formElements"
            />
            <div
              v-if="$v.confirmPassword.$error && !$v.confirmPassword.sameAs"
              class="errorText"
            >Passwords must be identical</div>
          </v-col>
        </v-row>-->
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="6" class></v-col>
          <v-col sm="12" md="6" class="buttonGrid">
            <button class="submitButtonEdit profileButton" @click="postData()">
              <v-list-item dark>
                <v-list-item-action>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Update</v-list-item-title>
                </v-list-item-content>
                <v-icon>mdi-plus-circle</v-icon>
              </v-list-item>
            </button>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col>
            <v-row>
              <v-col md="8">
                <v-row>
                  <v-col md="4">
                    <div style="color: #576377; font-weight: 450">Organization Role</div>
                  </v-col>
                  <v-col md="2" v-for="(role,index) in realmRoles" :key="index">
                    <v-btn small @click="selectUserRole(role)" :color="checkUserRole(role.name)">{{role.name}}</v-btn>
                  </v-col>
                  <!-- <v-col md="2">
                    <v-btn small @click.stop="roleChangeDialog = true" color="primary">Admin</v-btn>
                  </v-col>
                  <v-col md="2">
                    <v-btn small @click.stop="roleChangeDialog = true">User</v-btn>
                  </v-col>
                  <v-col md="2">
                    <v-btn small @click.stop="roleChangeDialog = true">Workload</v-btn>
                  </v-col>-->
                </v-row>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-col>
        </v-row>
      </form>
    </div>
    <!-- -------- reset dialog -------- -->
    <v-dialog v-model="resetDialog" max-width="350">
      <v-card style="text-align: center ; padding-bottom: 25px">
        <v-card-title class="headline" style="text-align: center">
          <v-spacer></v-spacer>Reset Password
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>User will receive an email with password reset link. User should follow mentioned steps to reset the password</v-card-text>

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

        <v-card-text>Are you sure you need to deactivate the user permanently? Deactivated users would not be able to interact with the tool and not allowed to login to the system</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" dark @click="deactivateDialog = false">Cancel</v-btn>

          <v-btn small color="green darken-1" dark @click="deactivateDialog = false">Confirm</v-btn>
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

        <v-card-text v-if="this.existingRole">Remove User Role</v-card-text>
        <v-card-text v-else>Add User Role</v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn small color="red darken-1" dark @click="roleChangeDialog = false">Cancel</v-btn>

          <v-btn small color="green darken-1" dark @click="roleChangeDialog = false">Confirm</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div @click="close">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
    </div>
    <!-- <success-popup /> -->
  </div>
</template>

<script>
import axios from "axios";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";

export default {
  props: ["userData"],
  name: "editUser",
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },

  data() {
    return {
      resetDialog: false,
      roleChangeDialog: false,
      deactivateDialog: false,
      successMessage: "",
      userId: this.userData,
      password: "",
      confirmPassword: "",
      component: "",
      errorMessage: "",
      successMessage: "",
      selectedRole: {},
      existingRole: false
    };
  },

  methods: {
    checkUserRole(name) {
      if (this.userRoles.some(role => role.name === name)) return "primary";
    },
    selectUserRole(userRole) {
      this.roleChangeDialog = true;
      this.selectedRole = userRole;
      if (
        this.userRoles.filter(role => role.name === userRole.name).length > 0
      ) {
        this.existingRole = true;
        console.log("role exists");
      } else {
        console.log("role not exists");

        this.existingRole = false;
      }
    },
    async postData() {
      let response;
      try {
        response = await this.$axios.$put(`/users/${this.userData.userId}`, {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          email: this.userData.email
        });
        this.component = "success-popup";
        this.successMessage = "User successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        // console.log("Error edit user", e);
        // console.log("Error creating user", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        //   alert("Error updating user!")
      }
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
      userRoles: state => state.admin.userRoles
    })
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      sameAsPassword: sameAs("password")
    }
  }
};
</script>