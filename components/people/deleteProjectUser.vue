<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="350">
        <template v-slot:activator="{ on }">
          <div class="iconBackCirclePeople">
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
    <div @click="close" class="editProjectUserPopup">
      <component v-bind:is="component" :errorMessage="errorMessage"></component>
      <!-- <success-popup /> -->
    </div>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
export default {
  props: ["blockedUserId", "projectId"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress
  },
  data() {
    return {
      overlay: false,
      errorMessage: "",
      successMessage: "",
      component: "",
      userId: this.$store.state.user.userId,
      dialog: false
    };
  },
  methods: {
    close() {
      this.$refs.form.reset();
      this.component = "";
    },
    async changeHandler() {
      this.dialog = false;
      this.overlay = true;
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
        this.component = "success-popup";
        this.successMessage = "User successfully added";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.$store
          .dispatch("task/fetchProjectUserCompletionTasks", this.projectId)
          .finally(() => {
            this.overlay = false;
          });
      } catch (e) {
        this.overlay = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error blocking user", e);
      }
      // console.log(response);
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