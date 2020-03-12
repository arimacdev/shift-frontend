
<template>
  <v-app>
    <navigation-drawer />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '~/components/navigationDrawer'

export default {
  components: {
    NavigationDrawer
  }
}
</script>