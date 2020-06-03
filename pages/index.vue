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
      <div class="loginTitle">Welcome to Arimac PM Tool</div>

      <div class="loginText">Please login to access your account</div>

      <button class="loginButton" color="secondary" @click="$auth.loginWith('keycloak')">Log in</button>
    </div>
  </div>
  <!-- </v-card> -->
</template>

<script>
export default {
  layout: "login-layout"
};
</script>
