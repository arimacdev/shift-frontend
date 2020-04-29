<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on }">
          <div class="iconBackCircle">
            <v-icon v-on="on" size="17" color="#0BAFFF">mdi-pencil-outline</v-icon>
          </div>
        </template>
        <v-card>
          <v-form v-model="isValid" ref="form">
            <div class="editProjectUserDialog">
              <v-icon class size="60" color="deep-orange lighten-1">mdi-account-edit</v-icon>
              <v-card-text class="deletePopupTitle">Update the Role and Admin for</v-card-text>
              <v-card-text
                class="popup-name"
              >{{editUser.assigneeFirstName}} {{editUser.assigneeLastName}}</v-card-text>
              <!-- <v-card-text class="popup-roleTitle">Role</v-card-text> -->
              <v-card-actions class="roleField">
                <v-text-field
                  v-model="jobRole"
                  placeholder="Project role"
                  flat
                  outlined
                  label="Project role*"
                  :rules="projectRoleRules"
                  hide-details="auto"
                  class
                ></v-text-field>
              </v-card-actions>

              <v-card-actions class="roleField checkBoxField">
                <v-checkbox
                  v-model="adminStatus"
                  hide-details
                  class="shrink mr-2 mt-0"
                  label="Admin"
                ></v-checkbox>
              </v-card-actions>

              <!-- <v-btn class="deleteButton" text @click="dialog = false">Cancel</v-btn>
              <v-btn class="editButtonSpec" text @click="changeHandler">Save</v-btn>-->

              <div class="AddUserPopupBottom">
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    width="100px"
                    @click="dialog = false"
                    :retain-focus="false"
                  >Cancel</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!isValid"
                    color="success"
                    width="100px"
                    @click="changeHandler"
                    :retain-focus="false"
                  >Save</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <div @click="close" class="editProjectUserPopup">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
    </div>
    <!-- <success-popup /> -->
  </div>
</template>

<script>
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
export default {
  props: ["editUser", "projectId"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  data() {
    return {
      isValid: true,
      errorMessage: "",
      userId: this.$store.state.user.userId,
      dialog: false,
      isAdmin: false,
      jobRole: this.editUser.projectJobRoleName,
      component: "",
      projectRoleRules: [value => !!value || "Project role is required!"]
    };
  },
  // created(){
  //     this.$axios.get (`users/project/${this.projectId}`)
  //         .then (response => {
  //         console.log("project users", response.data)
  //         this.projectUsers = response.data.data;
  //         })
  //         .catch (e => {
  //         console.log("error", e)
  //     })
  // },
  methods: {
    close() {
      this.component = "";
    },
    async changeHandler() {
      console.log(this.isAdmin, this.jobRole);
      this.dialog = false;
      let roleIdValue;
      if (this.isAdmin) {
        roleIdValue = 2;
      } else {
        roleIdValue = 3;
      }
      let response;
      try {
        console.log("edituser", this.editUser);
        response = await this.$axios.$put(
          `/projects/${this.projectId}/users/${this.editUser.assigneeId}`,
          {
            assignerId: this.userId,
            assigneeJobRole: this.jobRole,
            assigneeProjectRole: roleIdValue
          }
        );
        this.$store.dispatch(
          "task/fetchProjectUserCompletionTasks",
          this.projectId
        );
        this.component = "success-popup";
      } catch (e) {
        console.log("Error blocking user", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
      }
      console.log(response);
    }
  },
  computed: {
    adminStatus: {
      get() {
        if (
          this.editUser.projectRoleId === "1" ||
          this.editUser.projectRoleId === "2"
        ) {
          this.isAdmin = true;
          return true;
        } else {
          this.isAdmin = false;
          return false;
        }
      },
      set(value) {
        this.isAdmin = value;
      }
    }
  }
};
</script>

<style scoped>
.editUser {
  background: #2ec973;
  position: absolute;
  border-radius: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 40px;
  color: #ffffff;
}
.cancelUser {
  background: #ff6161;
  margin-left: 20px;
  border-radius: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 40px;
  color: #ffffff;
}
</style>
