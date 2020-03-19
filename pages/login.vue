<template>
  <v-card class="elevation-4">
    <v-toolbar dark color="primary">
      <v-toolbar-title>PM -TOOL Login</v-toolbar-title>
    </v-toolbar>
    <v-card-actions>
      <v-btn color="secondary" @click="$auth.loginWith('keycloak')">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'login-layout',
}
</script>
