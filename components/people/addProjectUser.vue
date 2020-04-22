<template>
  <div>
    <v-row justify="center" class="">
      <v-dialog v-model="dialog" persistent max-width="380">
        <template v-slot:activator="{ on }">
          <div v-on="on" class="addPeopleButton addPeople">
            <v-list-item v-on:click="component = 'add-task'" dark>
              <v-list-item-action>
                <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
              </v-list-item-action>
              <v-list-item-content class="buttonText">
                <v-list-item-title class="bodyWiew">Add new</v-list-item-title>
              </v-list-item-content>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item>
          </div>
        </template>
        <v-card class="addUserPopup">
          <v-form v-model="isValid" ref="form">
            <div class="popupFormContent">
              <v-icon class="" size="60" color="deep-orange lighten-1"
                >mdi-account-plus</v-icon
              >
              <v-card-text class="deletePopupTitle"
                >Add member to project</v-card-text
              >
              <v-card-actions>
                <!-- <select v-model="addUser.assigneeId" class="formElements popupFormElement">
              <option disabled value="" >Assignee</option>
              <option v-for="(user, index) in users" :key="index" :value="user.userId">
                {{user.firstName}} {{user.lastName}}
              </option>
            </select> -->

                <v-autocomplete
                  filled
                  label="Select user*"
                  v-model="addUser.assigneeId"
                  :items="states"
                  item-text="name"
                  item-value="id.userId"
                  :search-input.sync="search"
                  class=" addUserPopupFormElement"
                  flat
                  outlined=""
                  background-color="white"
                  append-icon=""
                  hide-no-data
                  @change="onSelectedUser()"
                  :rules="assigneeRoleRules"
                  hide-details="auto"
                  clearable=""
                >
                </v-autocomplete>
              </v-card-actions>
              <v-card-actions class="">
                <!-- <input v-model="addUser.assigneeJobRole" placeholder="Role" class="formElements popupFormElement"> -->
                <v-text-field
                  v-model="addUser.assigneeJobRole"
                  label="Project Role*"
                  flat
                  outlined
                  class=" popupFormElement"
                  :rules="projectRoleRules"
                  hide-details="auto"
                ></v-text-field>
              </v-card-actions>
            </div>
            <v-card-actions class="roleField checkBoxRoleField">
              <v-checkbox
                v-model="adminStatus"
                hide-details
                class="shrink mr-2 mt-0"
                label="Admin"
              >
              </v-checkbox>
            </v-card-actions>

            <!-- <v-btn class="deleteButton" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="editButton addUserSave" text @click="changeHandler">Save</v-btn> -->

            <div class="AddUserPopupBottom">
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="error"
                  width="100px"
                  @click="dialog = false"
                  :retain-focus="false"
                >
                  Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!isValid"
                  color="success"
                  width="100px"
                  @click="changeHandler"
                  :retain-focus="false"
                >
                  Save
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <div @click="close">
      <component
        v-bind:is="component"
        :success="success"
        :errorMessage="errorMessage"
      ></component>
    </div>
    <!--  <success-popup /> -->
  </div>
</template>

<script>
  import SuccessPopup from '~/components/popups/successPopup';
  import ErrorPopup from '~/components/popups/errorPopup';
  import { required } from 'vuelidate/lib/validators';
  import { mapState } from 'vuex';

  export default {
    components: {
      'success-popup': SuccessPopup,
      'error-popup': ErrorPopup,
    },
    data() {
      return {
        errorMessage: '',
        isValid: true,
        userId: this.$store.state.user.userId,
        addUser: {
          assignerId: this.$store.state.user.userId,
          assigneeId: '',
          assigneeJobRole: '',
          assigneeProjectRole: this.getProjectRole(),
        },
        projectRoleRules: [(value) => !!value || 'Project role is required!'],
        assigneeRoleRules: [(value) => !!value || 'Assignee is required!'],
        isShow: false,
        selected: false,
        dialog: false,
        loading: false,
        items: [],
        search: null,
        select: null,
        states: [],
        component: '',
        success: '',
      };
    },
    watch: {
      search(val) {
        val && val !== this.select && this.querySelections(val);
      },
    },
    methods: {
      close() {
        this.$refs.form.reset();
        this.component = '';
      },
      onSelectedUser() {
        if (this.select !== undefined) {
          this.$emit('searchSelected', this.select);
          // console.log("selected user",this.select)
        }
      },
      async changeHandler() {
        // this.dialog = false;

        let assigneeProjectRoleId = this.getProjectRole();
        this.addUser.assigneeProjectRole = assigneeProjectRoleId;
        let response;
        try {
          response = await this.$axios.$post(
            `/projects/${this.projectId}/users`,
            this.addUser
          );
          this.$store.dispatch(
            'task/fetchProjectUserCompletionTasks',
            this.projectId
          );
          this.addUser.assigneeId = '';
          this.addUser.assigneeJobRole = '';
          this.selected = false;
          this.component = 'success-popup';
          this.success = response.message;
          this.$refs.form.reset();
        } catch (e) {
          console.log('Error adding a User', e);
          this.errorMessage = e.response.data;
          this.component = 'error-popup';
        }
      },
      querySelections(v) {
        let projectSearchList = this.users;
        for (let index = 0; index < projectSearchList.length; ++index) {
          let user = projectSearchList[index];
          this.states.push({
            name: user.firstName + ' ' + user.lastName,
            id: user,
            img: user.profileImage,
          });
        }
        // console.log("usersList", this.users, "nameList", this.states)
        this.loading = true;
        setTimeout(() => {
          this.items = this.states.filter((e) => {
            return (
              (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
            );
          });
          this.loading = false;
        });
        this.loading = false;
      },
      getProjectRole() {
        console.log('getProjectRole', this.selected);
        if (this.selected == true) {
          return 2;
        } else {
          return 3;
        }
      },
    },
    computed: {
      ...mapState({
        users: (state) => state.user.users,
      }),
      adminStatus: {
        get() {
          return this.selected;
        },
        set(value) {
          this.selected = !this.selected;
        },
      },
    },
  };
</script>

<style scoped></style>
