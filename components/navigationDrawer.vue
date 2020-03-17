<template>
    <v-navigation-drawer
    color=""
    dark
      v-model="drawer"
      :mini-variant.sync="mini"
      
      expand-on-hover
      app
      class="nav"
    >
      <v-list-item class="px-2 background" :to="'../mainPages/profile'">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>
          <div id="name-div">
            <p id="company-name">ARIMAC</p>
            <p id="name">Indika Wijesooriya</p>
          </div>
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          router
          :to="item.route"
          v-for="item in items"
          :key="item.title"
          link
          active-class="active"
        >
          <v-list-item-icon>
            <v-icon class="navButtons">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title  class="navText">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Summary', icon: 'mdi-chart-line', route: ''},
          { title: 'Projects', icon: 'mdi-folder-outline', route: '../mainPages/projects'},
          { title: 'Tasks', icon: 'mdi-calendar-blank-multiple', route: '../mainPages/tasks' },
          { title: 'Inventory', icon: 'mdi-comment-outline'},
          { title: 'Users', icon: 'mdi-account-multiple-outline', route: '../mainPages/users'  },
          { title: 'Admin', icon: 'mdi-account-circle-outline' },
        ],
        mini: true,
      
      }
    },
  }
</script>
<style scoped>
.navButtons{
  color: #4D4F85;
}
.navText{
  /* color: #4D4F85; */
}
.navText:visited{
  color: rgb(231, 231, 240);
}
</style>


