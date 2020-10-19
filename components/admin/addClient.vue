<template>
  <div class>
    <form @submit.prevent="handleSubmit">
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="12" md="12" class="textGrid">
          <p class="addProjectTitle adminUserViewContent">Create New Client</p>
        </v-col>
      </v-row>
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            v-model.trim="$v.organizationName.$model"
            label="Organization Name*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.organizationName.$error && !$v.organizationName.required"
            class="errorText"
          >Org name is required</div>
          <div
            v-if="$v.organizationName.$error && !$v.organizationName.maxLength"
            class="errorText"
          >Cannot use more than 50 characters</div>
        </v-col>
        <v-col sm="6" md="6">
          <v-autocomplete
            flat
            outlined
            v-model="countryName"
            :items="countryList"
            label="Country Name"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
        </v-col>
      </v-row>

      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            v-model.trim="mobile"
            label="Mobile Number"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
        
        </v-col>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            type="email"
            v-model.trim="$v.email.$model"
            label="Email*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div v-if="$v.email.$error && !$v.email.email" class="errorText">Use valid Email address</div>
        </v-col>
      </v-row>

      <v-row style="margin-left: 20px; margin-top: -40px">
          <v-col sm="5" md="5">
               <v-img
        v-if="this.profileImage != ''"
        class="profileImage"
        :src="this.profileImage"
      ></v-img>
          </v-col>
      </v-row>

      <v-row style="margin-left: 20px">
          <v-col sm="4" md="4">
          <form>
          <template>
            <!-- <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Select profile picture" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload profPicUploader"/> -->
            <!-- <v-file-input id="files" ref="files" v-on:change="handleFileUploads()"  prepend-icon="mdi-camera" chips label="Upload profile picture"></v-file-input> -->
            <v-file-input
              label="Update profile picture"
              v-model="files"
              prepend-inner-icon="mdi-camera"
              prepend-icon
              class=""
              chips
              @change="setVisible()"
            ></v-file-input>
          </template>
          <div class="">
            <v-btn
              depressed
              :disabled="disableButton"
              :loading="loading"
              color="#0BAFFF"
              class="ma-2 white--text text-capitalize"
              @click="submit()"
              x-small
            >
              Upload
              <v-icon size="17" right dark>mdi-upload</v-icon>
            </v-btn>
            <v-btn color="#0BAFFF"  x-small depressed
              class="ma-2 white--text text-capitalize" v-if="profileImage != ''" @click="profileImage = ''">Remove</v-btn>

         
          </div>
          
        </form>
          </v-col>
      </v-row>

      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="12" md="6" class></v-col>
        <v-col sm="12" md="6" class="buttonGrid">
          <button :class="addProjectStyling" :disabled="checkValidation" @click="postData()">
            <v-list-item dark>
              <v-list-item-action>
                <v-icon size="20" color>icon-user</v-icon>
              </v-list-item-action>
              <v-list-item-content class="buttonText">
                <v-list-item-title class="bodyWiew">Register user</v-list-item-title>
              </v-list-item-content>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item>
          </button>
        </v-col>
      </v-row>
    </form>
    <div class="adminPagePopups" @click="close">
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
import {
  numeric,
  required,
  between,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";

export default {
  components: {
    "progress-loading": Progress,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  computed: {
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
        if (this.$v.$invalid == true) {
          return "addProjectButtonFail";
        } else {
          return "addProjectButtonSuccess";
        }
      }
    }
  },
  methods: {
      setVisible() {
      this.disableButton = false;
      },
      async submit() {
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
        this.profileImage = fileResponse.data;
        // this.component = "success-popup";
        // this.successMessage = "Profile successfully updated";
        // console.log("group people response", this.taskFiles);
      } catch (e) {
        console.log("Error uploading prof pic: ", e);
        this.component = "error-popup";
        // console.log("File Upload Failed: " + e);
        this.errorMessage = e.response.data;
        this.overlay = false;
      }
    },
    async postData() {
      let response;
      try {
        response = await this.$axios.$post("/organization", {
          organizationName: this.organizationName,
          country: this.countryName,
          mobile: this.mobile,
          email: this.email,
          organizationLogo: this.profileImage
        });
          (this.organizationName = ""),
          (this.lastName = ""),
          (this.email = ""),
          (this.mobile = ""),
          (this.profileImage = ""),
          this.$v.$reset();
        this.component = "success-popup";
        this.successMessage = "Organization successfully created";
        setTimeout(() => {
          this.close();
        }, 3000);
        // window.setTimeout(location.reload(), 8000);
      } catch (e) {
        // console.log("Error creating user", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log("Error creating project", e);
      }
    },
    close() {
      this.component = "";
    },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    }
  },
  data() {
    return { 
    userId: this.$store.state.user.userId,
      overlay: false,
      successMessage: "",
      errorMessage: "",
      userName: "",
      organizationName: "",
      lastName: "",
      profileImage: '',
      files: [],
      // designation: "",
      email: "",
      password: "",
      confirmPassword: "",
      component: "",
      disableButton: true,
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
  validations: {
    organizationName: {
      required,
      maxLength: maxLength(50)
    },
    email: {
      email
    },
    
  }
};
</script>