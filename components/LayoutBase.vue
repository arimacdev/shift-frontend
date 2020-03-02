<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-avatar color="indigo">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            Arimac
          </v-list-item-title>
          <v-list-item-subtitle>
            Ruchini Sujanthi
          </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
  
    <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items"
            :key="item.title"
            link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Summary', icon: 'mdi-book-open' },
          { title: 'Projects', icon: 'mdi-laptop-mac' },
          { title: 'Tasks', icon: 'mdi-calendar-text' },
          { title: 'Attendance', icon: 'mdi-calendar-check' },
          { title: 'Inventory', icon: 'mdi-cart' },
          { title: 'Admin', icon: 'mdi-account-circle' }
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal'
        ],
        right: true,
        miniVariant: false,
        expandOnHover: false,
        background: false
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      }
    }
  }
</script>