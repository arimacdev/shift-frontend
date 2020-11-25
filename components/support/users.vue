<template>
  <div>
    <div class="requestViewContent overflow-y-auto">
      <v-row style="margin-top: -30px">
        <v-list-item-title class="summaryNameTitle">{{
          selectedProject.projectName
        }}</v-list-item-title>
        <v-list-item-subtitle
          v-if="selectedClient"
          class="summaryNameSubTitle"
          >{{ selectedClient.organizationName }}</v-list-item-subtitle
        >
      </v-row>
      <v-row style="margin-top: 40px">
        <v-list-item>
          <v-list-item-content class="userTitleSectionSupport"
            >External Support Users</v-list-item-content
          >
          <v-list-item-action
            ><v-btn
              :disabled="externalSupportUsers.length != 0"
              style="color: #FFFFFF"
              @click="supportUserDialog = true"
              depressed
              color="#66B25F"
              >Add External Support Admin</v-btn
            ></v-list-item-action
          >
        </v-list-item>
      </v-row>

      <v-row style="">
        <v-list-item
          style="background-color: #FAFAFA"
          v-for="(user, index) in externalSupportUsers"
          :key="index"
          class="peopleContainer"
        >
          <v-list-item-avatar size="30">
            <v-img
              v-if="user.profileImage != null && user.profileImage != ''"
              :src="user.profileImage"
            ></v-img>
            <v-img
              v-else
              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1603081854073_client.png"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="supportUser">
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="supportUser">
              {{ user.email }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="supportUser">
            <v-list-item-title v-if="user.admin" class="supportUser">
              Admin
            </v-list-item-title>
            <v-list-item-title v-else class="supportUser">
              User
            </v-list-item-title>
          </v-list-item-action>
        </v-list-item>
      </v-row>

      <v-row style="margin-top: 40px">
        <v-list-item>
          <v-list-item-content class="userTitleSectionSupport"
            >Internal Support Users</v-list-item-content
          >
        </v-list-item>
      </v-row>

      <v-row>
        <v-list-item
          style="background-color: #FAFAFA"
          v-for="(user, index) in projectSupportUsers"
          :key="index"
          class="peopleContainer"
        >
          <v-list-item-avatar size="30">
            <v-img
              v-if="user.profileImage != null && user.profileImage != ''"
              :src="user.profileImage"
            ></v-img>
            <v-img
              v-else
              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="supportUser">
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="supportUser">
            <v-btn
              depressed
              color="#66B25F"
              small
              dark
              @click="removeInternalSupportUser(user.assigneeId)"
              >Disable</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-row>

      <v-divider style="margin-top: 50px; margin-bottom: 30px"></v-divider>

      <v-row>
        <v-list-item
          style="background-color: #FAFAFA"
          v-for="(user, index) in internalSupportUsers"
          :key="index"
          class="peopleContainer"
        >
          <v-list-item-avatar size="30">
            <v-img
              v-if="user.profileImage != null && user.profileImage != ''"
              :src="user.profileImage"
            ></v-img>
            <v-img
              v-else
              src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="supportUser">
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="supportUser">
            <v-btn
              depressed
              color="#66B25F"
              small
              dark
              @click="addInternalSupportUser(user.userId)"
              >Enable</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-row>
    </div>

    <!-- ------------- support user dialog -------------- -->
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
          <span class="alertPopupTitle">Add External Support Admin</span>
          <br />
          <br />
          <span class="alertPopupText"
            >Select support user or create new support user for the project
          </span>
          <br />
          <br />

          <div style="padding-left: 40px; padding-right:40px">
            <div v-if="!userOptionSwitch">
              <v-form v-model="isValidUserAssign" ref="assignUserForm">
                <v-autocomplete
                  return-object
                  :items="assigneeArray"
                  item-text="name"
                  item-value="id"
                  v-model="assigneeId"
                  :rules="nameRules"
                  label="Select existing user"
                  outlined
                ></v-autocomplete>
              </v-form>
            </div>
            <div v-else>
              <v-form v-model="isValidUserAdd" ref="addUserForm">
                <v-row>
                  <v-col
                    ><v-text-field
                      v-model="assigneeEmail"
                      :rules="emailRules"
                      outlined
                      label="Email"
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row style="margin-top: -30px">
                  <v-col>
                    <v-text-field
                      v-model="assigneeFirstName"
                      :rules="nameRules"
                      outlined
                      label="First Name"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="assigneeLastName"
                      :rules="nameRules"
                      outlined
                      label="Last Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </div>

            <v-switch
              v-model="userOptionSwitch"
              label="Create new user"
            ></v-switch>
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
                @click="
                  supportUserDialog = false;
                  cancelAction();
                "
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
                @click="assignExistingUser()"
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
                @click="
                  supportUserDialog = false;
                  cancelFormAction();
                "
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
                @click="assignUser()"
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
import { mapState } from 'vuex';
import Progress from '~/components/popups/progress';
import SuccessPopup from '~/components/popups/successPopup';
import ErrorPopup from '~/components/popups/errorPopup';
export default {
  components: {
    'progress-loading': Progress,
    'success-popup': SuccessPopup,
    'error-popup': ErrorPopup,
  },
  data() {
    return {
      overlay: false,
      component: '',
      errorMessage: '',
      successMessage: '',

      userId: this.$store.state.user.userId,
      supportUserDialog: false,
      userOptionSwitch: false,
      isValidUserAdd: true,
      isValidUserAssign: true,
      nameRules: [(value) => !!value || 'Required!'],
      emailRules: [
        (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
      ],

      assigneeId: '',
      assigneeEmail: '',
      assigneeFirstName: '',
      assigneeLastName: '',
    };
  },
  created() {},
  methods: {
    async removeInternalSupportUser(userId) {
      let response;
      const headers = {
        user: this.userId,
      };
      const params = {
        projectId: this.selectedProject.project,
        memberId: userId,
      };
      try {
        response = await this.$axios.$delete(`/member`, { headers, params });
        this.successMessage = 'User removed successfully';
        this.component = 'success-popup';
        setTimeout(() => {
          this.close();
        }, 3000);

        Promise.all([
          this.$store.dispatch(
            'support/support/fetchProjectSupportMembers',
            this.selectedProject.project
          ),
        ]).finally(() => {
          this.$store.dispatch('support/support/fetchSupportMembers');

          this.overlay = false;
        });
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error support user removing', e);
      }
    },
    async addInternalSupportUser(userId) {
      let response;
      try {
        response = await this.$axios.$post(
          `/member`,
          {
            projectId: this.selectedProject.project,
            memberId: userId,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.successMessage = 'User added successfully';
        this.component = 'success-popup';
        setTimeout(() => {
          this.close();
        }, 3000);

        Promise.all([
          this.$store.dispatch(
            'support/support/fetchProjectSupportMembers',
            this.selectedProject.project
          ),
        ]).finally(() => {
          this.$store.dispatch('support/support/fetchSupportMembers');

          this.overlay = false;
        });
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error support user adding', e);
      }
    },

    cancelAction() {
      this.$refs.assignUserForm.reset();
    },
    cancelFormAction() {
      this.$refs.addUserForm.reset();
    },
    close() {
      this.component = '';
    },
    async assignExistingUser() {
      let response;
      try {
        response = await this.$axios.$post(
          `/support/user/admin`,
          {
            organizationId: this.selectedProject.clientId,
            firstName: this.assigneeId.firstName,
            lastName: this.assigneeId.lastName,
            email: this.assigneeId.email,
            supportUserId: this.assigneeId.id,
          },
          {
            headers: {
              user: this.userId,
              project: this.selectedProject.project,
            },
          }
        );
        this.successMessage = 'User added successfully';
        this.component = 'success-popup';
        setTimeout(() => {
          this.close();
        }, 3000);

        this.$refs.assignUserForm.reset();
        this.supportUserDialog = false;
        this.$store.dispatch(
          'support/support/fetchExternalSupportUsers',
          this.selectedProject.project
        );
        this.overlay = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = 'error-popup';
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log('Error support adding', e);
      }
    },
    assignUser() {
      this.overlay = true;
      Promise.all([
        this.$store.dispatch(
          'support/support/fetchSupportUser',
          this.assigneeEmail
        ),
      ]).finally(async () => {
        if (this.userStatus == false) {
          let response;
          try {
            response = await this.$axios.$post(
              `/support/user/admin`,
              {
                organizationId: this.selectedProject.clientId,
                firstName: this.assigneeFirstName,
                lastName: this.assigneeLastName,
                email: this.assigneeEmail,
                supportUserId: '',
              },
              {
                headers: {
                  user: this.userId,
                  project: this.selectedProject.project,
                },
              }
            );
            this.successMessage = 'User added successfully';
            this.component = 'success-popup';
            setTimeout(() => {
              this.close();
            }, 3000);
            this.overlay = false;
            this.$refs.addUserForm.reset();
            this.supportUserDialog = false;

            this.$store.dispatch(
              'support/support/fetchExternalSupportUsers',
              this.selectedProject.project
            );
          } catch (e) {
            this.errorMessage = e.response.data;
            this.component = 'error-popup';
            setTimeout(() => {
              this.close();
            }, 3000);
            this.overlay = false;
            console.log('Error support adding', e);
          }
        }
        this.overlay = false;
      });
    },
  },
  computed: {
    ...mapState({
      allProjects: (state) => state.project.allOrgProjects,
      selectedProject: (state) => state.support.support.seletedSupportProject,
      selectedClient: (state) => state.clients.clients.selectedClient,
      userStatus: (state) => state.support.support.isUserExists,
      clientSupportUsers: (state) => state.support.support.clientSupportUsers,
      externalSupportUsers: (state) =>
        state.support.support.externalSupportUsers,
      internalSupportUsers: (state) =>
        state.support.support.internalSupportUsers,
      projectSupportUsers: (state) =>
        state.support.support.internalProjectSupportUsers,
      projectMemberAssigneeArray: (state) =>
        state.support.support.projectMemberAssigneeArray,
    }),
    assigneeArray() {
      let AssigneeSearchList = this.clientSupportUsers;
      let assigneeList = [];
      for (let index = 0; index < AssigneeSearchList.length; ++index) {
        let user = AssigneeSearchList[index];
        assigneeList.push({
          name: user.firstName + ' ' + user.lastName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.userId,
        });
      }
      return assigneeList;
    },
  },
};
</script>
