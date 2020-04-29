<template>
  <div>
    <div class="projectTabContent overflow-y-auto">
      <div class="peopleWrapper">
        <addGroupPeople :group="group" :users="users" />
      </div>

      <div class>
        <div class>
          <p class="peopleRoleTitle" @click="fetchUsers">Group owner</p>
          <v-divider></v-divider>
        </div>
        <div
          v-for="(assignee, index) in completionTasks"
          :key="index"
          class="taskList peopleListItems"
        >
          <v-list-item v-if="assignee.taskGroupRole == 1" class="peopleContainer">
            <v-list-item-avatar>
              <v-img
                v-if="assignee.assigneeProfileImage != null"
                :src="assignee.assigneeProfileImage"
              ></v-img>
              <v-img
                v-if="assignee.assigneeProfileImage == null"
                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="projectRole"
              >{{ assignee.assigneeFirstName }} {{assignee.assigneeLastName}}</v-list-item-title>
              <v-list-item-title class="peopleName">{{assignee.projectJobRoleName}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="projectProgressSection">
              <v-list-item-title
                class="completedStatus"
              >{{ assignee.tasksCompleted + "/" + assignee.totalTasks + " Tasks completed"}}</v-list-item-title>
              <v-list-item-title class="projectProgress">
                <div class="progressLine">
                  <v-progress-linear
                    :value="(assignee.tasksCompleted/assignee.totalTasks)*100"
                    color="#2EC973"
                    background-color="red"
                    height="13"
                    rounded
                    reactive
                  >
                    <template></template>
                  </v-progress-linear>
                </div>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <removeGroupMember :group="group" :blockedUserId="assignee.assigneeId" />
              <!-- <deleteProjectUser :blockedUserId="assignee.assigneeId" :projectId="projectId" /> -->
            </v-list-item-action>
          </v-list-item>
        </div>
      </div>
      <!-- --------- -->

      <div class>
        <div class>
          <p class="peopleRoleTitle" @click="fetchUsers">Group members</p>
          <v-divider></v-divider>
        </div>

        <div
          v-for="(assignee, index) in completionTasks"
          :key="index"
          class="taskList peopleListItems"
        >
          <v-list-item v-if="assignee.taskGroupRole == 2" class="peopleContainer">
            <v-list-item-avatar>
              <v-img
                v-if="assignee.assigneeProfileImage != null"
                :src="assignee.assigneeProfileImage"
              ></v-img>
              <v-img
                v-if="assignee.assigneeProfileImage == null"
                src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                class="projectRole"
              >{{ assignee.assigneeFirstName }} {{assignee.assigneeLastName}}</v-list-item-title>
              <v-list-item-title class="peopleName">{{assignee.projectJobRoleName}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="projectProgressSection">
              <v-list-item-title
                class="completedStatus"
              >{{ assignee.tasksCompleted + "/" + assignee.totalTasks + " Tasks completed"}}</v-list-item-title>
              <v-list-item-title class="projectProgress">
                <div class="progressLine">
                  <v-progress-linear
                    :value="(assignee.tasksCompleted/assignee.totalTasks)*100"
                    color="#2EC973"
                    background-color="red"
                    height="13"
                    rounded
                    reactive
                  >
                    <template></template>
                  </v-progress-linear>
                </div>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <removeGroupMember :group="group" :blockedUserId="assignee.assigneeId" />
              <!-- <deleteProjectUser :blockedUserId="assignee.assigneeId" :projectId="projectId" /> -->
            </v-list-item-action>
          </v-list-item>
        </div>
      </div>

      <!-- ------ -->
    </div>

    <!-- =============================== second list ===================== -->

    <!-- =================== end =============== -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import removeGroupMember from "@/components/tasksPage/removeGroupMember.vue";
import addGroupPeople from "@/components/tasksPage/addGroupPeople.vue";
export default {
  props: ["group", "users"],
  components: {
    removeGroupMember,
    addGroupPeople
  },
  data() {
    return {
      // userList: this.people,
      skill: 0,
      progress: this.progress
    };
  },
  // created(){
  //     console.log("projectId", this.projectId)
  //     this.$axios.get (`/projects/${this.projectId}/tasks/138bbb3d-02ed-4d72-9a03-7e8cdfe89eff/completion/details`)
  //             .then (response => {
  //             console.log("project users List", response.data)
  //             this.userList = response.data.data;
  //             })
  //             .catch (e => {
  //             console.log("error", e)
  //             })
  // },
  methods: {
    fetchUsers() {
      console.log("projectId", this.projectId);
    }
  },
  computed: {
    ...mapState({
      completionTasks: state => state.groups.groupPeople.groupPeople
    })
  }
};
</script>

<style scoped>
.peopleWrapper {
  width: 100%;
  padding: 30px;
}
.titleDiv {
  width: 30%;
  float: left;
}
.peopleRoleTitle {
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  margin-left: 20px;
}
.catPeopleTitle {
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  margin-top: 60px;
  margin-bottom: -20px;
  margin-left: 30px;
}
.addPeopleButton {
  border-radius: 5px;
  float: left;
  margin-right: 5px;
  background-color: #0bafff;
  width: 20%;
  float: right;
}
.peopleListWrapper {
  margin-top: 30px;
}
.peopleList {
  background-color: #edf0f5;
  border-radius: 5px;
  margin-top: 5px;
  height: 50px;
}
</style>