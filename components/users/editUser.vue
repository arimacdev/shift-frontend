<template>
  <div class="formDiv usersForms">
    <form @submit.prevent="handleSubmit">
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="12" md="12" class="textGrid">
          <p class="addProjectTitle">Edit user</p>
        </v-col>
      </v-row>
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <input
            v-model="userData.firstName"
            name="firstname"
            placeholder="First Name"
            class="formElements"
          />
        </v-col>
        <v-col sm="6" md="6">
          <input
            v-model="userData.lastName"
            name="lastname"
            placeholder="Last Name"
            class="formElements"
          />
        </v-col>
      </v-row>

      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <input v-model="userData.userName" disabled placeholder="User Name" class="formElements" />
        </v-col>
        <v-col sm="6" md="6">
          <input
            type="email"
            v-model="userData.email"
            name="email"
            placeholder="Email"
            class="formElements"
          />
        </v-col>
      </v-row>

      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="6" md="6">
          <input
            type="password"
            v-model.trim="$v.password.$model"
            placeholder="Password"
            class="formElements"
          />
          <!-- <div v-if="$v.password.$error && !$v.password.required" class="errorText"> Password is required</div> -->
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
      </v-row>
      <v-row class="mb-12 formRow" no-gutters>
        <v-col sm="12" md="6" class></v-col>
        <v-col sm="12" md="6" class="buttonGrid">
          <button class="submitButtonEdit profileButton" @click="postData()">
            <v-list-item dark>
              <v-list-item-action>
                <v-icon size="20" color>mdi-account-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content class="buttonText">
                <v-list-item-title class="bodyWiew">Save changes</v-list-item-title>
              </v-list-item-content>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item>
          </button>
        </v-col>
      </v-row>
    </form>
    <div @click="close">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
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

import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";

export default {
  props: ["userData"],
  name: "editUser",
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },

  data: function() {
    return {
      userId: this.userData
    };
  },

  methods: {
    async postData() {
      let response;
      try {
        response = await this.$axios.$put(`/users/${this.userData.userId}`, {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          email: this.userData.email
        });
        this.component = "success-popup";
        // window.setTimeout(location.reload(), 8000)
      } catch (e) {
        console.log("Error edit user", e);
        this.component = "error-popup";
        this.errorMessage = e.response.data;
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
  data() {
    return {
      password: "",
      confirmPassword: "",
      component: "",
      errorMessage: ""
    };
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