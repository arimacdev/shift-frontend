<template>
  <div>
    <div class="tabContent">
      <div class="supportRequestList">
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
                    class="supportRequestListItem"
                    @click="selectUser(user)"
                    v-on:click="component = 'request-view'"
                  >
                    <v-list-item-icon>
                      <v-icon size="18" color="#FFC212">icon-project</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="supportListItemTitle"
                        >{{ user.firstName }}
                        {{ user.lastName }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4"></v-divider>
                </div>
              </v-list-item-group>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="requestContentWrapper">
        <keep-alive>
          <component
            v-bind:is="component"
            :name="name"
            :userData="userData"
          ></component>
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
import ViewRequest from "~/components/support/requestView";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
export default {
  components: {
    "search-bar": usersSearchBar,
    "request-view": ViewRequest,
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
      this.name = userData;
      this.userData = userData;
      try {
        if (this.roleListCount === 0) {
          this.$store.dispatch("admin/fetchRealmRoles");
        }
        this.roleListCount += 1;
      } catch (e) {
        this.roleListCount = 0;
      }
      this.overlay = true;
      Promise.all([
        this.$store.dispatch("admin/fetchUserRoleMapping", userData.userId),
        this.$store.dispatch("skillMatrix/fetchUserSkills", userData.userId),
        this.$store.dispatch("user/setSelectedUser", userData),
        this.$store.dispatch("skillMap/fetchUserSkillMap", userData.userId),
      ]).finally(() => {
        this.overlay = false;
      });
    },
  },

  computed: {
    ...mapState({
      users: (state) => state.user.users,
    }),
  },

  created() {
    this.$store.dispatch("project/clearProject");
  },
};
</script>