<template>
  <v-navigation-drawer
    color
    dark
    v-model="drawer"
    :mini-variant.sync="mini"
    expand-on-hover
    app
    class="nav"
  >
    <v-list-item class="px-2 background" :to="'../../profile/profile'">
      <v-list-item-avatar>
        <v-img
          v-if="userProfile.profileImage != null && userProfile.profileImage != ''"
          :src="userProfile.profileImage"
        ></v-img>
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
        :router="item.path"
        :to="item.route"
        v-for="item in adminItems"
        :key="item.title"
        link
        active-class="active"
      >
        <v-list-item-icon>
          <!-- <span class="navButtons" :class="item.icon"></span> -->
          <v-icon size="20" class="navButtons">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="navText">{{ item.title }}</v-list-item-title>
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
          <v-list-item-title class="navText">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <div class="logooutButton">
      <v-list>
        <v-list-item @click="userLogOut">
          <v-list-item-icon>
            <v-icon class="navButtons">mdi-power-standby</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="navText">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // profilePic: this.userProfile.profileImage,
      drawer: true,
      adminItems: [
        // { title: 'Summary', icon: 'icon-summary', route: '../summary'},
        {
          title: "Projects",
          icon: "icon-project",
          route: "../../projects/projects"
        },
        {
          title: "Tasks",
          icon: "icon-task",
          route: "../../tasks/tasks"
        },
        // { title: 'Inventory', icon: 'icon-inventory', route: '../inventory'},
        {
          title: "Workload",
          icon: "icon-workload",
          route: "../../workload/workload"
        },
        // {
        //   title: "Users",
        //   icon: "icon-users",
        //   route: "../../users/users"
        // },
        { title: "Admin", icon: "icon-admin", route: "../../admin/admin" }
      ],
      mini: true,
      userItems: [
        // { title: 'Summary', icon: 'icon-summary', route: '../summary'},
        {
          title: "Projects",
          icon: "icon-project",
          route: "../../projects/projects"
        },
        {
          title: "Tasks",
          icon: "icon-task",
          route: "../../tasks/tasks"
        },
        // { title: 'Inventory', icon: 'icon-inventory', route: '../inventory'},
        {
          title: "Workload",
          icon: "icon-workload",
          route: "../../workload/workload"
        }
      ],
      homePage: process.env.SYSTEM_URL
    };
  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile.userProfile,
      organizationalRole: state => state.user.organizationalRole
    }),
    profileImage() {
      // console.log("profile image", this.profilePic);
    }
  },

  methods: {
    userLogOut() {
      const LOGOUT_URL =
        this.homePage +
        "/auth/realms/pm-tool/protocol/openid-connect/logout?redirect_uri=" +
        this.homePage;
      window.location.replace(LOGOUT_URL);
    }
  }
};
</script>
<style scoped>
.navButtons {
  color: #4d4f85;
}

.navText:visited {
  color: rgb(231, 231, 240);
}
</style>


