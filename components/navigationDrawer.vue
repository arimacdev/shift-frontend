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
          <v-img v-if="userProfile.profileImage != null" :src="userProfile.profileImage"></v-img>
          <v-img v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img>

        </v-list-item-avatar>

        <v-list-item-title>
          <div id="name-div">
            <p id="company-name">ARIMAC</p>
            <p id="name">{{userProfile.firstName}} {{userProfile.lastName}}</p>
          </div>
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list v-if="organizationalRole === 'SUPER_ADMIN'">
        <v-list-item
          router
          :to="item.route"
          v-for="item in adminItems"
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
      <v-list v-else>
        <v-list-item
          router
          :to="item.route"
          v-for="item in userItems"
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
  import { mapState } from 'vuex';
  export default {
    data () {
      return {
        // profilePic: this.userProfile.profileImage,
        drawer: true,
        adminItems: [
          // { title: 'Summary', icon: 'mdi-chart-line', route: '../mainPages/summary'},
          { title: 'Projects', icon: 'mdi-folder-outline', route: '../mainPages/projects'},
          { title: 'Tasks', icon: 'mdi-calendar-blank-multiple', route: '../mainPages/tasks' },
          // { title: 'Inventory', icon: 'mdi-comment-outline', route: '../mainPages/inventory'},
          { title: 'Workload', icon: 'mdi-bag-checked', route: '../mainPages/workload'},
          { title: 'Users', icon: 'mdi-account-multiple-outline', route: '../mainPages/users'  },
          // { title: 'Admin', icon: 'mdi-account-circle-outline', route: '../mainPages/admin' },
        ],
        mini: true,
        userItems: [
          // { title: 'Summary', icon: 'mdi-chart-line', route: '../mainPages/summary'},
          { title: 'Projects', icon: 'mdi-folder-outline', route: '../mainPages/projects'},
          { title: 'Tasks', icon: 'mdi-calendar-blank-multiple', route: '../mainPages/tasks' },
          // { title: 'Inventory', icon: 'mdi-comment-outline', route: '../mainPages/inventory'},
          { title: 'Workload', icon: 'mdi-bag-checked', route: '../mainPages/myWorkload'},
        ],
      }
    },
    computed: {
      ...mapState({
          userProfile: state => state.userProfile.userProfile,
          organizationalRole: state => state.user.organizationalRole
      }),
      profileImage(){
        console.log("profile image", this.profilePic)
      }
    },

    methods: {
      
    }

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


