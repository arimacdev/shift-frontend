
<template>
    <div>
        <div class="requestViewContent overflow-y-auto">
        <v-row>
            <v-list-item-title class="summaryNameTitle">{{selectedProject.projectName}}</v-list-item-title>
            <v-list-item-subtitle v-if="selectedClient" class="summaryNameSubTitle">{{selectedClient.organizationName}}</v-list-item-subtitle>
        </v-row>
        <v-row style="margin-top: 40px">
            <v-list-item>
                <v-list-item-content class="userTitleSectionSupport">External Users</v-list-item-content>
                <v-list-item-action><v-btn @click="supportUserDialog = true" depressed color="#66B25F" dark>Add External Support User</v-btn></v-list-item-action>
            </v-list-item>
        </v-row>
    </div>
    <v-dialog v-model="supportUserDialog" max-width="480">
            <v-card>
              <div class="popupConfirmHeadline">
                <v-icon
                  class="deletePopupIcon"
                  size="60"
                  color="deep-orange lighten-1"
                  >mdi-account-plus</v-icon
                >
                <br />
                <span class="alertPopupTitle">Add External Support User</span>
                <br />
                <br>
                <span class="alertPopupText"
                  >Select support user or create new support user for the project  </span
                >
                <br />
                <br />
                
              <div style="padding-left: 40px; padding-right:40px">
                  <div v-if="!userOptionSwitch">
                <v-form v-model="isValidUserAssign" ref="assignUserForm">
               <v-autocomplete 
                    :items="assigneeArray"
                    item-text="name"
                    item-value="id"
                    v-model="assigneeId" :rules="nameRules" label="Select existing user" outlined></v-autocomplete>
                </v-form>
                  </div>
                  <div v-else>
                      <v-form v-model="isValidUserAdd" ref="addUserForm">

                  <v-row>
                      <v-col><v-text-field v-model="assigneeEmail" :rules="emailRules" outlined label="Email"></v-text-field></v-col>
                      
                  </v-row>
                  <v-row style="margin-top: -30px">
                      <v-col>
                          <v-text-field v-model="assigneeFirstName" :rules="nameRules" outlined label="First Name"></v-text-field>
                      </v-col>
                      <v-col>
                          <v-text-field v-model="assigneeLastName" :rules="nameRules" outlined label="Last Name"></v-text-field>
                      </v-col>
                  </v-row>
                      </v-form>
                  </div>

                  <v-switch v-model="userOptionSwitch"
                   label="Create new user" ></v-switch>
              
              </div>
              <span style="color: red" v-if="userStatus">User already exists!</span>
              

              <div v-if="!userOptionSwitch" class="popupBottom">
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    class="text-capitalize"
                    depressed
                    width="100px"
                    @click="supportUserDialog = false; cancelAction()"
                    >Cancel</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
                  <v-btn
                    class="text-capitalize"
                    depressed
                    color="success"
                    :disabled="!isValidUserAssign"
                    width="100px"
                    @click="
                      supportUserDialog = false;
                    "
                    >Add</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
               <div v-else class="popupBottom">
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    class="text-capitalize"
                    depressed
                    width="100px"
                    @click="supportUserDialog = false; cancelFormAction()"
                    >Cancel</v-btn
                  >
                  <v-spacer></v-spacer>
                  <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
                  <v-btn
                    class="text-capitalize"
                    depressed
                    color="success"
                    :disabled="!isValidUserAdd"
                    width="100px"
                    @click="
                       assignUser()
                    "
                    >Create</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
              </div>
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
           <v-overlay :value="overlay" color="black" style="z-index: 1008">
        <progress-loading />
      </v-overlay>
    </div>
</template>
<script>
import { mapState } from "vuex";
import Progress from "~/components/popups/progress";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
export default {
    components: {
    "progress-loading": Progress,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
  },
    data(){
        return{
            overlay: false,
            component: '',
            errorMessage: "",
            successMessage: "",

            userId: this.$store.state.user.userId,
            supportUserDialog: false,
            userOptionSwitch: false,
            isValidUserAdd: true,
            isValidUserAssign: true,
            nameRules: [(value) => !!value || "Required!"],
            emailRules: [
                (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
            ],

            assigneeId: '',
            assigneeEmail: '',
            assigneeFirstName: '',
            assigneeLastName: '',
        }
    },
    created() {
  },
    methods: {
        cancelAction(){
                this.$refs.assignUserForm.reset();
        },
        cancelFormAction(){
                this.$refs.addUserForm.reset();
        },
        close() {
            this.component = "";
            },
        assignUser(){
            this.overlay = true
             Promise.all([
            this.$store.dispatch("support/support/fetchSupportUser", this.assigneeEmail),
             ]).finally(async() => {
              if(this.userStatus == false){
                  let response;
                try {
                    response = await this.$axios.$post(
                    `/support/user/admin`,
                    {
                        clientId: this.selectedProject.clientId,
                        firstName: this.assigneeFirstName,
                        lastName: this.assigneeLastName,
                        email: this.assigneeEmail
                    },
                    {
                        headers: {
                        user: this.userId,
                        project: this.selectedProject.project
                        },
                    }
                    );
                    this.successMessage = "User added successfully";
                    this.component = "success-popup";
                    setTimeout(() => {
                    this.close();
                    }, 3000);
                    this.overlay = false;
                    this.$refs.addUserForm.reset();
                } catch (e) {
                    this.categoryName = "";
                    this.errorMessage = e.response.data;
                    this.component = "error-popup";
                    setTimeout(() => {
                    this.close();
                    }, 3000);
                    this.overlay = false;
                    console.log("Error support adding", e);
                }
              }
              this.overlay = false
            });
        }
    },
    computed: {
    ...mapState({
      allProjects: (state) => state.project.allOrgProjects,
      selectedProject: (state) => state.support.support.seletedSupportProject,
      selectedClient: (state) => state.clients.clients.selectedClient,
      userStatus: (state) => state.support.support.isUserExists,
      clientSupportUsers: (state) => state.support.support.clientSupportUsers,
    }),
    assigneeArray() {
      let AssigneeSearchList = this.clientSupportUsers;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.firstName + " " + user.lastName,
          id: user.userId,
        });
      }
      return assigneeList;
    },
  },
}
</script>



