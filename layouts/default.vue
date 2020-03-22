
<template>
  <v-app>
    <!-- <navigation-drawer :user=user /> -->
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
  },
  created () {
     this.$store.dispatch('userProfile/fetchProfilePicture')
     }
}
</script>