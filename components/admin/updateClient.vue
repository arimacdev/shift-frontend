<template>
  <div class>
    <div class="adminBlackBar"></div>
    <div class="adminUserImage">
      <v-img
        v-if="
          selectedClient.organizationLogo != null && selectedClient.organizationLogo != ''
        "
        class="userAdminProfileImage"
        :src="selectedClient.organizationLogo"
      ></v-img>
      <v-img
        v-else
        class="userAdminProfileImage"
        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1603081854073_client.png"
      ></v-img>
    </div>
    <div class="userNameAdmin">
      {{ selectedClient.organizationName }}
    </div>
     <div class="buttonSectionAdmin">
         <v-btn @click="resetDialog = true" icon color="red"><v-icon size="30">mdi-delete-circle</v-icon></v-btn>
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
              v-model="clientName"
              flat
              outlined
              label="Organization name"
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
             <v-autocomplete
            flat
            outlined
            v-model="countryName"
            :items="countryList"
            label="Country Name"
            class="profileUpdateTextFields"
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
              v-model="clientEmail"
              name="email"
              label="Email"
              class="profileUpdateTextFields"
              :rules="emailRules"
            />
           </v-col>
          <v-col sm="6" md="6">
            <v-text-field
          type="number"
            flat
            outlined
            v-model="clientMobile"
            label="Mobile Number"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="12" md="6" class></v-col>
          <v-col sm="12" md="6" class="buttonGrid">
            <v-btn
              depressed
              :disabled="!isValid"
              height="50px"
              color="#333369"
              class="addProjectButtonSuccess text-capitalize"
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
      </v-form>

      <v-row style="margin-left: 20px">
          <v-col sm="6" md="6">
          <form>
          <template>
            <!-- <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Select profile picture" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload profPicUploader"/> -->
            <!-- <v-file-input id="files" ref="files" v-on:change="handleFileUploads()"  prepend-icon="mdi-camera" chips label="Upload profile picture"></v-file-input> -->
            <v-file-input
            v-if="updatedLogo == ''"
              label="Update profile picture"
              v-model="files"
              prepend-inner-icon="mdi-camera"
              prepend-icon
              class=""
              chips
              @change="submit()"
            ></v-file-input>
          </template>
          <div class="">
           
            <v-btn color="#0BAFFF" v-if="profileImage != ''"  x-small depressed
              class="ma-2 white--text text-capitalize"  @click="clearImage()">Remove</v-btn>

         
          </div>
          
        </form>
          </v-col>
      </v-row>

    </div>
    <!-- -------- delete dialog -------- -->
    <v-dialog v-model="resetDialog" max-width="350">
      <v-card style="text-align: center; padding-bottom: 25px">
           <v-icon class="deletePopup" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
        <v-card-title class="headline" style="text-align: center">
           
          <v-spacer></v-spacer>Remove Organization
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          The organization will be remove from the system and all the records will be lost!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            depressed
            class="text-capitalize"
            small
            color="green darken-1"
            dark
            @click="resetDialog = false"
            >Cancel</v-btn
          >

          <v-btn
            small
            depressed
            class="text-capitalize"
            color="red darken-1"
            dark
            @click="resetDialog = false; deleteOrganization()"
            >Confirm</v-btn
          >
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
     <v-overlay :value="overlay" color="black" style="z-index: 1008">
        <progress-loading />
      </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";

import {
  numeric,
  required,
  between,
  minLength,
  maxLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  props: ["userData"],
  name: "editUser",
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
  },

  data() {
    return {
      filterCategory: "",
      selectedSkills: [],
      files: [],
      overlay: false,
      // skillList: [],
      isValid: true,
      firstNameRules: [(value) => !!value || "Org name is required!"],
      emailRules: [
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
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
      updatedClientName: "",
      updatedCountryName: "",
      updatedEmail: "",
      updatedMobile: "",
      updatedLogo: "",
      designation: "",
      countryList: [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
],
    };
  },

  methods: {
     clearImage(){
          this.updatedLogo = ''; this.files = []
      },
     async submit() {
          if(this.files != '' || this.files != []){
this.overlay = true;
      let formData = new FormData();
      formData.append("files", this.files);
      formData.append("type", "profileImage");
      this.files = null;

      let fileResponse;
      try {
        fileResponse = await this.$axios.$post(
          `/user/profile/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              user: this.userId,
            },
          }
        );
        this.overlay = false;
        this.updatedLogo = fileResponse.data;
        this.component = "success-popup";
        this.successMessage = "Profile successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.postData()
      } catch (e) {
        console.log("Error uploading prof pic: ", e);
        this.component = "error-popup";
        console.log("File Upload Failed: " + e);
        this.errorMessage = e.response.data;
        this.overlay = false;
      }
          }
      
    },
    async postData() {
      this.overlay = true;
      const userObj = {
        organizationName: this.getClientName(),
        country: this.getCountryName(),
        organizationEmail: this.getClientEmail(),
        organizationContact: this.getClientMobile(),
        organizationLogo: this.getClientLogo(),
      };
      let response;
      try {
        response = await this.$axios.$put(
          `organization/${this.selectedClient.organizationId}`,
          userObj, {
            headers: {
              user: this.adminId,
            },
          }
        );

        this.$store.dispatch("clients/clients/fetchClients");
         this.$store.dispatch("clients/clients/fetchSelectedClient", this.selectedClient.organizationId);
        this.component = "success-popup";
        this.successMessage = "Client successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.updatedLogo = '';
        this.overlay = false;
      } catch (e) {
        console.log("Error update client", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        //   alert("Error updating user!")
      }
    },
      async deleteOrganization(){
        this.overlay = true;
          let response;
      try {
        response = await this.$axios.$delete(
          `/organization/${this.selectedClient.organizationId}`,
          {
            headers: {
              user: this.adminId,
            },
          }
        );  

        this.$emit("removeComponent");
        this.successMessage = "Client removed successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);

        this.$store.dispatch("clients/clients/fetchClients");
        this.overlay = false;
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
        this.overlay = false;
      }
      },
    displayRoleName(roleName) {
      switch (roleName) {
        case "SUPER_ADMIN":
          return "Super Admin";
          break;
        case "USER":
          return "User";
          break;
        case "ADMIN":
          return "admin";
          break;
        case "WORKLOAD":
          return "workload";
          break;

        default:
      }
    },
    async addSkillToUser(categoryId, skillId) {
      let response;
      try {
        response = await this.$axios.$post(
          `/category/${categoryId}/user/skill`,
          {
            assigneeId: this.userData.userId,
            skills: [skillId],
          },
          {
            headers: {
              userId: this.adminId,
            },
          }
        );

        this.$store.dispatch(
          "skillMatrix/fetchUserSkills",
          this.userData.userId
        );

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
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error adding a skill", e);
      }
    },
    async removeSkillFromUser(categoryId, skillId) {
      let response;
      try {
        response = await this.$axios.$delete(
          `/category/${categoryId}/user/skill`,
          {
            data: {
              assigneeId: this.userData.userId,
              skills: [skillId],
            },
            headers: {
              userId: this.adminId,
            },
          }
        );

        this.$store.dispatch(
          "skillMatrix/fetchUserSkills",
          this.userData.userId
        );

        this.$store.dispatch(
          "skillMap/fetchUserSkillMap",
          this.userData.userId
        );
        this.successMessage = "Skill removed from user successfully";
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
        console.log("Error removing a skill", e);
      }
    },
    getSkills() {
      // console.log("TRIGERRED " + this.filterCategory);
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
      // console.log("CLEARED " + this.filterCategory);
      this.filterCategory = "";
    },
    // categorizedSkillMap() {
    //   let skillmap = this.userSkillMap;
    //   // console.log("skillmap", this.userSkillMap);
    //   const orderedSkillMap = skillmap.reduce((accumilate, current) => {
    //     accumilate[current.categoryId] = (
    //       accumilate[current.categoryId] || []
    //     ).concat(current);
    //     return accumilate;
    //   }, {});
    //   return orderedSkillMap;
    // },
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
          name: this.selectedRole.name,
        });
      } else {
        if (this.existingRole) {
          // console.log("calling delete");
          this.$store.dispatch("admin/removeUserRole", {
            userId: this.userData.userId,
            id: this.selectedRole.id,
            name: this.selectedRole.name,
          });
        }
      }
    },
    checkUserRole(name) {
      if (this.userRoles.some((role) => role.name === name)) return "primary";
    },
    selectUserRole(userRole) {
      // console.log("userRole", userRole);
      this.roleChangeDialog = true;
      this.selectedRole = userRole;
      if (
        this.userRoles.filter((role) => role.name === userRole.name).length > 0
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
              user: this.adminId,
            },
          },
          {
            data: {
              adminId: this.adminId,
              userId: this.userData.userId,
            },
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
          status: false,
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
              user: this.adminId,
            },
          },
          {
            data: {
              adminId: this.adminId,
              userId: this.userData.userId,
            },
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
          status: true,
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
    
    getClientName() {
      if (this.updatedClientName.length === 0) {
        return this.selectedClient.organizationName;
      } else return this.updatedClientName;
    },
    getCountryName() {
      if (this.updatedCountryName.length === 0) {
        return this.selectedClient.country;
      } else return this.updatedCountryName;
    },
    getClientEmail() {
      if (this.updatedEmail.length === 0) {
        return this.selectedClient.organizationEmail;
      } else return this.updatedEmail;
    },
    getClientMobile() {
      if (this.updatedMobile.length === 0) {
        return this.selectedClient.organizationContact;
      } else return this.updatedMobile;
    },
    getClientLogo(){
      if (this.updatedLogo.length === 0) {
        return this.selectedClient.organizationLogo;
      } else return this.updatedLogo;
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
    },
  },
  computed: {
    ...mapState({
      realmRoles: (state) => state.admin.realmRoles,
      userRoles: (state) => state.admin.userRoles,
      selectedUser: (state) => state.user.selectedUser,
      organizationalRoles: (state) => state.user.organizationalRoles,
      userSkillMap: (state) => state.skillMap.userSkillMap,
      skillCategory: (state) => state.skillMatrix.skillCategory,
      categorySkills: (state) => state.skillMatrix.skills,
      userSkills: (state) => state.skillMatrix.userSkills,
      selectedClient: (state) => state.clients.clients.selectedClient
    }),
    
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
      },
    },
    addProjectStyling: {
      get() {
        if (this.isValid == false) {
          return "addProjectButtonFail";
        } else {
          return "addProjectButtonSuccess";
        }
      },
    },
    filterSkill: {
      get() {},
      set(value) {
        this.selectedSkills = value;
      },
    },
    clientName: {
      get() {
        return this.selectedClient.organizationName;
      },
      set(value) {
        this.updatedClientName = value;
      },
    },
    countryName: {
      get() {
        return this.selectedClient.country;
      },
      set(value) {
        this.updatedCountryName = value;
      },
    },
    clientEmail: {
      get() {
        return this.selectedClient.organizationEmail;
      },
      set(value) {
        this.updatedEmail = value;
      },
    },
    clientMobile: {
      get() {
        return this.selectedClient.organizationContact;
      },
      set(value) {
        this.updatedMobile = value;
      },
    },
  },
  validations: {
    firstName: {
      required,
      maxLength: maxLength(50),
    },
    lastName: {
      required,
      maxLength: maxLength(50),
    },
    // designation: {
    //   required,
    //   maxLength: maxLength(50)
    // },
    email: {
      required,
      email,
    },
  },
};
</script>
