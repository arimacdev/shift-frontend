<template>
  <div>
    <div class="projectTabContent overflow-y-auto">
      <div class="peopleWrapper">
        <addProjectUser :editUser="assignee" :projectId="projectId" />
      </div>

      <div class>
        <div class>
          <p class="peopleRoleTitle" @click="fetchUsers">Project Owner</p>
          <!-- <v-divider></v-divider> -->
        </div>

        <div v-for="(assignee, index) in userCompletionTasks" :key="index" class="peopleListItems">
          <v-list-item v-if="assignee.projectRoleId == 1" class="peopleContainer">
            <v-list-item-avatar>
              <v-img
                v-if="
                  assignee.assigneeProfileImage != null &&
                    assignee.assigneeProfileImage != ''
                "
                :src="assignee.assigneeProfileImage"
              ></v-img>
              <v-img
                v-else
                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="projectRole">
                {{ assignee.assigneeFirstName }}
                {{ assignee.assigneeLastName }}
              </v-list-item-title>
              <v-list-item-title class="peopleName">
                {{
                assignee.projectJobRoleName
                }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="projectProgressSection">
              <v-list-item-title class="completedStatus">
                {{
                assignee.tasksCompleted +
                '/' +
                assignee.totalTasks +
                ' Tasks completed'
                }}
              </v-list-item-title>
              <v-list-item-title class="projectProgress">
                <!-- <div class="progressBar"></div> -->
                <div class="progressLine">
                  <v-progress-linear
                    :value="
                      (assignee.tasksCompleted / assignee.totalTasks) * 100
                    "
                    color="#66B25F"
                    background-color="#FF9F9F"
                    height="13"
                    rounded
                    reactive
                  >
                    <!-- <template v-slot="{ value }"> -->
                    <template>
                      <!-- <span class="presentageValue">{{ Math.ceil(value) }}%</span> -->
                    </template>
                  </v-progress-linear>
                </div>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <editProjectUser :editUser="assignee" :projectId="projectId" />
            </v-list-item-action>
            <v-list-item-action>
              <deleteProjectUser :blockedUserId="assignee.assigneeId" :projectId="projectId" />
            </v-list-item-action>
          </v-list-item>
        </div>
      </div>
      <!-- --------- -->
      <div class>
        <div class>
          <p class="peopleRoleTitle" @click="fetchUsers">Admins</p>
          <!-- <v-divider></v-divider> -->
        </div>

        <div
          v-for="(assignee, index) in userCompletionTasks"
          :key="index"
          class="taskList peopleListItems"
        >
          <v-list-item
            v-if="
              assignee.projectRoleId == 2 && assignee.isUserBlocked == false
            "
            class="peopleContainer"
          >
            <v-list-item-avatar>
              <v-img
                v-if="
                  assignee.assigneeProfileImage != null &&
                    assignee.assigneeProfileImage != ''
                "
                :src="assignee.assigneeProfileImage"
              ></v-img>
              <v-img
                v-else
                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="projectRole">
                {{ assignee.assigneeFirstName }}
                {{ assignee.assigneeLastName }}
              </v-list-item-title>
              <v-list-item-title class="peopleName">
                {{
                assignee.projectJobRoleName
                }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="projectProgressSection">
              <v-list-item-title class="completedStatus">
                {{
                assignee.tasksCompleted +
                '/' +
                assignee.totalTasks +
                ' Tasks completed'
                }}
              </v-list-item-title>
              <v-list-item-title class="projectProgress">
                <!-- <div class="progressBar"></div> -->
                <div class="progressLine">
                  <v-progress-linear
                    :value="
                      (assignee.tasksCompleted / assignee.totalTasks) * 100
                    "
                    color="#66B25F"
                    background-color="#FF9F9F"
                    height="13"
                    rounded
                    reactive
                  >
                    <!-- <template v-slot="{ value }"> -->
                    <template>
                      <!-- <span class="presentageValue">{{ Math.ceil(value) }}%</span> -->
                    </template>
                  </v-progress-linear>
                </div>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <editProjectUser :editUser="assignee" :projectId="projectId" />
            </v-list-item-action>
            <v-list-item-action>
              <deleteProjectUser :blockedUserId="assignee.assigneeId" :projectId="projectId" />
            </v-list-item-action>
          </v-list-item>
        </div>
        <!-- --------- -->

        <div class>
          <div class>
            <p class="peopleRoleTitle" @click="fetchUsers">Other Users</p>
            <!-- <v-divider></v-divider> -->
          </div>

          <div
            v-for="(assignee, index) in userCompletionTasks"
            :key="index"
            class="taskList peopleListItems"
          >
            <v-list-item
              v-if="
                assignee.projectRoleId == 3 && assignee.isUserBlocked == false
              "
              class="peopleContainer"
            >
              <v-list-item-avatar>
                <v-img
                  v-if="
                    assignee.assigneeProfileImage != null &&
                      assignee.assigneeProfileImage != ''
                  "
                  :src="assignee.assigneeProfileImage"
                ></v-img>
                <v-img
                  v-else
                  src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="projectRole">
                  {{ assignee.assigneeFirstName }}
                  {{ assignee.assigneeLastName }}
                </v-list-item-title>
                <v-list-item-title class="peopleName">
                  {{
                  assignee.projectJobRoleName
                  }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="projectProgressSection">
                <v-list-item-title class="completedStatus">
                  {{
                  assignee.tasksCompleted +
                  '/' +
                  assignee.totalTasks +
                  ' Tasks completed'
                  }}
                </v-list-item-title>
                <v-list-item-title class="projectProgress">
                  <!-- <div class="progressBar"></div> -->
                  <div class="progressLine">
                    <v-progress-linear
                      :value="
                        (assignee.tasksCompleted / assignee.totalTasks) * 100
                      "
                      color="#66B25F"
                      background-color="#FF9F9F"
                      height="13"
                      rounded
                      reactive
                    >
                      <!-- <template v-slot="{ value }"> -->
                      <template>
                        <!-- <span class="presentageValue">{{ Math.ceil(value) }}%</span> -->
                      </template>
                    </v-progress-linear>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <editProjectUser :editUser="assignee" :projectId="projectId" />
              </v-list-item-action>
              <v-list-item-action>
                <deleteProjectUser :blockedUserId="assignee.assigneeId" :projectId="projectId" />
              </v-list-item-action>
            </v-list-item>
          </div>
        </div>

        <!-- ------ -->
      </div>
    </div>

    <!-- =============================== second list ===================== -->

    <!-- =================== end =============== -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import deleteProjectUser from "@/components/people/deleteProjectUser.vue";
import editProjectUser from "@/components/people/editProjectUser.vue";
import addProjectUser from "@/components/people/addProjectUser.vue";
export default {
  components: {
    deleteProjectUser,
    editProjectUser,
    addProjectUser
  },
  data() {
    return {
      assignee: {},
      // userList: this.people,
      skill: 0,
      progress: this.progress
    };
  },
  methods: {
    fetchUsers() {
      // console.log("projectId", this.projectId);
    }
  },
  computed: {
    ...mapState({
      userCompletionTasks: state => state.task.userCompletionTasks,
      projectId: state => state.project.project.projectId
    })
  }
};
</script>

<style scoped>
.peopleWrapper {
  width: 100%;
  /* padding: 30px; */
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
  margin-top: 30px;
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
