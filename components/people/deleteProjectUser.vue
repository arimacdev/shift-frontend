<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <div class="iconBackCircle">
          <v-icon v-on="on" size="17" color="#FF6161">mdi-trash-can-outline</v-icon>
        </div>
      </template>
      <v-card>
        <div class="deletePopupContent">
          <v-icon class="deletePopup" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
          <v-card-text class="deletePopupTitle">Block User</v-card-text>
          <v-card-text>
            You are about to permanantly block from the project.
            <span>If you are not sure, you can close this popup</span>
          </v-card-text>

          <v-btn class="editButton" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="deleteButtonSpec" text @click="changeHandler">Block</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["blockedUserId", "projectId"],
  data() {
    return {
      userId: this.$store.state.user.userId,
      dialog: false
    };
  },
  methods: {
    async changeHandler() {
      this.dialog = false;
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/users/${this.userId}/block`,
          {
            executorId: this.userId,
            blockedUserId: this.blockedUserId,
            blockedStatus: true
          }
        );
      } catch (e) {
        console.log("Error blocking user", e);
      }
      console.log(response);
    }
  }
};
</script>

<style scoped>
.blockUser {
  position: absolute;
  background: #ff6161;
  border-radius: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 40px;
  color: #ffffff;
}
.cancelUser {
  margin-left: 20px;
  background: #2ec973;
  border-radius: 5px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 40px;
  color: #ffffff;
}
</style>