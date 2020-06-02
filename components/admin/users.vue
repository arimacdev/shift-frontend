<template>
  <div>
    <div class="tabContent">
      <div class="users-list">
        <v-row>
          <v-col>
            <button v-on:click="component='add-user'" class="addUserSubmitButtonEdit userAddBottom">
              <v-list-item dark>
                <v-list-item-icon>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="userAddButtonText">
                  <v-list-item-title class>Add new user</v-list-item-title>
                </v-list-item-content>
                <v-icon>mdi-plus-circle</v-icon>
              </v-list-item>
            </button>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="userAddBottom">
            <search-bar :users="users" @searchSelected="viewSearchComponent" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="listView overflow-y-auto">
              <v-list-item-group>
                <div v-for="(user, index) in users" :key="index">
                  <v-list-item
                    class="singleUserList"
                    @click="selectUser(user)"
                    v-on:click="component='edit-user'"
                  >
                    <v-list-item-avatar>
                      <v-img
                        v-if="user.profileImage != null && user.profileImage != ''"
                        :src="user.profileImage"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="body-2">{{ user.firstName }} {{ user.lastName}}</v-list-item-title>
                      <!-- <v-list-item-subtitle>Developer</v-list-item-subtitle> -->
                    </v-list-item-content>
                    <!-- <v-list-item-action
                      @click="selectUser(user)"
                      v-on:click="component='edit-user'"
                    >
                      <div class="iconBackCircle">
                        <v-icon size="17" color="#0BAFFF">mdi-pencil-outline</v-icon>
                      </div>
                    </v-list-item-action>-->
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                </div>
              </v-list-item-group>
            </div>
          </v-col>
        </v-row>
      </div>
      <div>
        <keep-alive>
          <component v-bind:is="component" :name="name" :userData="userData"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import usersSearchBar from "~/components/tools/usersSearchBar";
import AddUser from "~/components/admin/addUserAdmin";
import EditUser from "~/components/admin/updateUserAdmin";
import { mapState } from "vuex";
export default {
  components: {
    "search-bar": usersSearchBar,
    "add-user": AddUser,
    "edit-user": EditUser
  },
  data() {
    return {
      userData: "",
      component: "",
      userId: this.$store.state.user.userId
    };
  },
  methods: {
    viewSearchComponent(data) {
      this.name = data;
      this.userData = data;
      this.component = "edit-user";
    },
    selectUser(userData) {
      this.name = userData;
      this.userData = userData;
      this.$store.dispatch("admin/fetchRealmRoles");
    }
  },

  computed: {
    ...mapState({
      users: state => state.user.users
    })
  },

  created() {
    this.$store.dispatch("project/clearProject");
  }
};
</script>