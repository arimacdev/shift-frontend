
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
                <v-form v-model="isValidUserAssign">
               <v-autocomplete :rules="nameRules" label="Select existing user" outlined></v-autocomplete>
                </v-form>
                  </div>
                  <div v-else>
                      <v-form v-model="isValidUserAdd">

                  <v-row>
                      <v-col><v-text-field :rules="emailRules" outlined label="Email"></v-text-field></v-col>
                      
                  </v-row>
                  <v-row style="margin-top: -30px">
                      <v-col>
                          <v-text-field :rules="nameRules" outlined label="First Name"></v-text-field>
                      </v-col>
                      <v-col>
                          <v-text-field :rules="nameRules" outlined label="Last Name"></v-text-field>
                      </v-col>
                  </v-row>
                      </v-form>
                  </div>

                  <v-switch v-model="userOptionSwitch"
                   label="Create new user" ></v-switch>
              
              </div>

              

              <div v-if="!userOptionSwitch" class="popupBottom">
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    class="text-capitalize"
                    depressed
                    width="100px"
                    @click="supportUserDialog = false"
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
                    @click="supportUserDialog = false"
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
                      supportUserDialog = false;
                    "
                    >Create</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </div>
              </div>
            </v-card>
          </v-dialog>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data(){
        return{
            userId: this.$store.state.user.userId,
            supportUserDialog: false,
            userOptionSwitch: false,
            isValidUserAdd: true,
            isValidUserAssign: true,
            nameRules: [(value) => !!value || "Required!"],
            emailRules: [
                (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
            ],
        }
    },
    created() {
  },
    methods: {
    },
    computed: {
    ...mapState({
      allProjects: (state) => state.project.allOrgProjects,
      selectedProject: (state) => state.project.seletedProject,
      selectedClient: (state) => state.clients.clients.selectedClient
    }),
  },
}
</script>



