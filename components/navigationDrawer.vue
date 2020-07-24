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
        <v-img
          v-else
          src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title>
        <div id="name-div">
          <p id="company-name">{{userProfile.firstName}}</p>

          <p id="name">{{userProfile.lastName }}</p>
        </div>
      </v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      v-if="organizationalRoles.indexOf('ADMIN') > -1 || organizationalRoles.indexOf('SUPER_ADMIN') > -1"
    >
      <v-list-item
        :router="item.path"
        :to="item.route"
        v-for="item in adminItems"
        :key="item.title"
        link
        active-class="active"
        class="navItem"
      >
        <v-list-item-icon>
          <div style="margin-top: -8px !important">
            <v-icon size="15" class="navButtons">{{ item.icon }}</v-icon>
          </div>
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
        class="navItem"
      >
        <v-list-item-icon>
          <div style="margin-top: -8px">
            <v-icon size="15" class="navButtons">{{ item.icon }}</v-icon>
          </div>
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
            <v-icon size="18" class="navButtons">mdi-power-standby</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="navText">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item>
        <img
          style="margin-bottom: 10px; margin-left: -8px; border-radius:5px; border: 1px solid black"
          width="40px"
          src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1595564844985_image.png"
        />
        <v-list-item-content style="margin-left: 12px; margin-top: -10px">
          <v-list-item-title class="navText">Arimac Digital</v-list-item-title>
          <v-list-item-subtitle style="font-size: 10px">Arimac Lanka PVT LTD</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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
          route: "../../projects/projects",
        },
        {
          title: "Tasks",
          icon: "icon-task",
          route: "../../tasks/tasks",
        },
        // { title: 'Inventory', icon: 'icon-inventory', route: '../inventory'},
        {
          title: "Workload",
          icon: "icon-workload",
          route: "../../workload/workload",
        },
        // {
        //   title: "Users",
        //   icon: "icon-users",
        //   route: "../../users/users"
        // },
        {
          title: "Skill Matrix",
          icon: "icon-skills",
          route: "../../skills/skills",
        },
        { title: "Admin", icon: "icon-admin", route: "../../admin/admin" },
        // { title: "Admin", icon: "icon-admin", route: "../../comments/comments" }
      ],
      mini: true,
      userItems: [
        // { title: 'Summary', icon: 'icon-summary', route: '../summary'},
        {
          title: "Projects",
          icon: "icon-project",
          route: "../../projects/projects",
        },
        {
          title: "Tasks",
          icon: "icon-task",
          route: "../../tasks/tasks",
        },
        // { title: 'Inventory', icon: 'icon-inventory', route: '../inventory'},
        {
          title: "Workload",
          icon: "icon-workload",
          route: "../../workload/workload",
        },
      ],
      homePage: process.env.SYSTEM_URL,
    };
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.userProfile.userProfile,
      organizationalRoles: (state) => state.user.organizationalRoles,
    }),
    profileImage() {
      // console.log("profile image", this.profilePic);
    },
  },

  methods: {
    userLogOut() {
      const LOGOUT_URL =
        this.homePage +
        "/auth/realms/pm-tool/protocol/openid-connect/logout?redirect_uri=" +
        this.homePage;
      window.location.replace(LOGOUT_URL);
    },
  },
};
</script>
<style scoped>
.navButtons {
  color: #4d4f85;
}

.navText:visited {
  color: rgb(231, 231, 240);
}
.navText {
  font-size: 14px !important;
}
.navItem {
  min-height: auto !important;
  max-height: 35px !important;
}
.navIcon {
  /* margin-top: -4px !important; */
}
</style>
