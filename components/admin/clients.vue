<template>
  <div>
    <div class="tabContent">
      <div class="adminUserList">
        <v-row>
          <v-col>
            <button v-on:click="component='add-user'" class="addUserSubmitButtonEdit userAddBottom">
              <v-list-item dark>
                <v-list-item-icon>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="userAddButtonText">
                  <v-list-item-title class>Add new client</v-list-item-title>
                </v-list-item-content>
                <v-icon>mdi-plus-circle</v-icon>
              </v-list-item>
            </button>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col class="userAddBottom">
            <search-bar :users="users" @searchSelected="viewSearchComponent" />
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <div class="listView overflow-y-auto">
              <v-list-item-group>
                <div v-for="(client, index) in clients" :key="index">
                  <v-list-item
                    class="singleUserList"
                    @click="selectUser(client)"
                    v-on:click="component='edit-user'"
                  >
                    <v-list-item-avatar>
                      <v-img
                        v-if="client.organizationLogo != null && client.organizationLogo != ''"
                        :src="client.organizationLogo"
                      ></v-img>
                      <v-img
                        v-else
                        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1603081854073_client.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="body-2">{{ client.organizationName }} </v-list-item-title>
                      <!-- <v-list-item-subtitle>Developer</v-list-item-subtitle> -->
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                </div>
              </v-list-item-group>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="userContentWrapper">
        <keep-alive>
          <component  @removeComponent="removeComponent" v-bind:is="component" :name="name" :userData="userData"></component>
        </keep-alive>
      </div>
    </div>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import usersSearchBar from "~/components/tools/usersSearchBar";
import AddUser from "~/components/admin/addClient";
import EditUser from "~/components/admin/updateClient";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
export default {
  components: {
    "search-bar": usersSearchBar,
    "add-user": AddUser,
    "edit-user": EditUser,
    "progress-loading": Progress,
  },
  data() {
    return {
      overlay: false,
      userData: "",
      component: "",
      userId: this.$store.state.user.userId,
      roleListCount: 0,
    };
  },
  methods: {
      removeComponent() {
      this.component = "";
    },
    viewSearchComponent(data) {
      this.name = data;
      this.userData = data;
      this.component = "edit-user";

      try {
        if (this.roleListCount === 0) {
          this.$store.dispatch("admin/fetchRealmRoles");
        }
        this.roleListCount += 1;
      } catch (e) {
        this.roleListCount = 0;
      }
      this.$store.dispatch("admin/fetchUserRoleMapping", data.userId);
      this.$store.dispatch("user/setSelectedUser", data);
    },
    selectUser(userData) {
      
        this.$store.dispatch("clients/clients/fetchSelectedClient", userData)
    },
  },

  computed: {
    ...mapState({
      users: (state) => state.user.users,
      clients: (state) => state.clients.clients.clients,
    }),
  },

  created() {
    this.$store.dispatch("project/clearProject");
    this.$store.dispatch("clients/clients/fetchClients")
  },
};
</script>