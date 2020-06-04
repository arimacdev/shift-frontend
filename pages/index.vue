<template>
  <!-- <v-card class="elevation-4"> -->
  <!-- <v-toolbar dark color="primary">
      <v-toolbar-title>PM -TOOL Login</v-toolbar-title>
    </v-toolbar>
    <v-card-actions>
      <v-btn color="secondary" @click="$auth.loginWith('keycloak')">
        Login
      </v-btn>
  </v-card-actions>-->
  <div class="loginContainer">
    <div class="loginContent">
      <img
        style="margin-bottom: 20px"
        width="150px"
        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591276686063_logo%20copy.png"
      />
      <div class="loginTitle">Welcome to SHIFT</div>

      <div class="loginText">Please login to access your account</div>

      <button class="loginButton" color="secondary" @click="$auth.loginWith('keycloak')">Log In</button>
    </div>
    <div class="companyLogo">
      <img
        style="margin-bottom: 20px"
        width="80px"
        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591277468171_arimac_logo.png"
      />
    </div>
  </div>
  <!-- </v-card> -->
</template>

<script>
export default {
  layout: "login-layout"
};
</script>
