<template>
  <div class>
    <form @submit.prevent="handleSubmit">
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="12" md="12" class="textGrid">
          <p class="addProjectTitle adminUserViewContent">Create new user</p>
        </v-col>
      </v-row>
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            v-model.trim="$v.firstName.$model"
            label="First Name*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.firstName.$error && !$v.firstName.required"
            class="errorText"
          >First name is required</div>
          <div
            v-if="$v.firstName.$error && !$v.firstName.maxLength"
            class="errorText"
          >Cannot use more than 50 characters</div>
        </v-col>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            v-model.trim="$v.lastName.$model"
            label="Last Name*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.lastName.$error && !$v.lastName.required"
            class="errorText"
          >Last name is required</div>
          <div
            v-if="$v.lastName.$error && !$v.lastName.maxLength"
            class="errorText"
          >Cannot use more than 50 characters</div>
        </v-col>
      </v-row>

      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            v-model.trim="$v.userName.$model"
            label="User Name*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.userName.$error && !$v.userName.required"
            class="errorText"
          >User name is required</div>
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
          <div v-if="$v.email.$error && !$v.email.required" class="errorText">Email is required</div>
          <div v-if="$v.email.$error && !$v.email.email" class="errorText">Use valid Email address</div>
        </v-col>
      </v-row>

      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            type="password"
            v-model.trim="$v.password.$model"
            label="Password*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.password.$error && !$v.password.required"
            class="errorText"
          >Password is required</div>
          <div
            v-if="$v.password.$error && !$v.password.minLength"
            class="errorText"
          >Password must be at least 6 characters</div>
        </v-col>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            type="password"
            v-model.trim="$v.confirmPassword.$model"
            label="Confirm Password*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.confirmPassword.$error && !$v.confirmPassword.sameAs"
            class="errorText"
          >Passwords must be identical</div>
        </v-col>
      </v-row>
      <!-- <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <v-text-field
            flat
            outlined
            v-model.trim="$v.designation.$model"
            label="Designation*"
            autocomplete="off"
            class="profileUpdateTextFields"
          />
          <div
            v-if="$v.designation.$error && !$v.designation.required"
            class="errorText"
          >Designation is required</div>
          <div
            v-if="$v.designation.$error && !$v.designation.maxLength"
            class="errorText"
          >Cannot use more than 50 characters</div>
        </v-col>
      </v-row>-->
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

export default {
  components: {
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
    async postData() {
      let response;
      try {
        response = await this.$axios.$post("/users", {
          userName: this.userName.toLowerCase(),
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
          // designation: this.designation
        });
        (this.userName = ""),
          (this.firstName = ""),
          (this.lastName = ""),
          (this.email = ""),
          (this.password = ""),
          (this.confirmPassword = ""),
          // (this.designation = ""),
          this.$v.$reset();
        this.component = "success-popup";
        this.successMessage = "User successfully created";
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
      successMessage: "",
      errorMessage: "",
      userName: "",
      firstName: "",
      lastName: "",
      // designation: "",
      email: "",
      password: "",
      confirmPassword: "",
      component: ""
    };
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
    userName: {
      required
    },
    email: {
      required,
      email
    },
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