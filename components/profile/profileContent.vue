<template>
  <div class="profileDetailsCover">
    <div class="blackBar profileBlackBar"></div>
    <div class="userImage profileUserImage">
      <v-img
        v-if="user.profileImage != null && user.profileImage != ''"
        class="profileImage"
        :src="user.profileImage"
      ></v-img>
      <v-img
        v-else
        class="profileImage"
        src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
      ></v-img>

      <div class="profilePictureUpload">
        <form>
          <template>
            <!-- <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Select profile picture" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload profPicUploader"/> -->
            <!-- <v-file-input id="files" ref="files" v-on:change="handleFileUploads()"  prepend-icon="mdi-camera" chips label="Upload profile picture"></v-file-input> -->
            <v-file-input
              label="Update profile picture"
              v-model="files"
              prepend-inner-icon="mdi-camera"
              prepend-icon
              class="createFormElements"
              chips
              @change="setVisible()"
            ></v-file-input>
          </template>
          <div class="pictureUploadButton">
            <v-btn
              depressed
              :disabled="disableButton"
              :loading="loading"
              color="#0BAFFF"
              class="ma-2 white--text text-capitalize"
              @click="submit()"
              x-small
            >
              Upload
              <v-icon right dark>mdi-upload</v-icon>
            </v-btn>

            <v-progress-circular v-if="uploadLoading == true" indeterminate color="primary"></v-progress-circular>
          </div>
        </form>

        <!-- ----------------------- slack --------------------- -->

        <v-card class="mx-auto slackCard" max-width="344" height="220px" outlined>
          <v-img
            class="white--text align-end slackImage"
            width="100px"
            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1592584626105_Slack_CMYK.png"
          ></v-img>
          <div class="cardSlogan">It's time to connect your app with slack</div>

          <div class="slackButton">
            <a
              href="https://slack.com/oauth/v2/authorize?scope=incoming-webhook,chat:write&client_id=345426929140.1020110511447&redirect_uri=https://project.arimaclanka.com/profile/profile"
            >
              <img
                alt="Join Slack Notifications"
                height
                width="120"
                src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1592584747849_add_to_slack.png"
                srcset="https://platform.slack-edge.com/img/add_to_slack.png    1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
              />
            </a>
          </div>
          <br />
          <!-- v-if="user.userSlackId != null && user.notification == false" -->

          <div class="slackCardButton">
            <!-- <v-btn x-small depressed color="primary" v-if="user.userSlackId != null && user.notification == false" v-show="enableNotification"  @click='changeNotificationStatus(user.notification)' >Enable Notifications</v-btn>  
            <v-btn x-small depressed   v-if="user.userSlackId != null && user.notification == true" v-show="disableNotification"  @click='changeNotificationStatus(user.notification)'>Disable Notifications</v-btn>-->

            <div class="notiTitle" v-if="user.userSlackId != null">Enable Notifications</div>
            <div class="notiButton">
              <v-switch
                inset
                v-model="switch2"
                x-small
                depressed
                color="primary"
                v-if="user.userSlackId != null && user.notification == false"
                v-show="enableNotification"
                @click="changeNotificationStatus(user.notification)"
              >Enable Notifications</v-switch>
              <v-switch
                inset
                v-model="switch1"
                v-btn
                x-small
                depressed
                v-if="user.userSlackId != null && user.notification == true"
                v-show="disableNotification"
                @click="changeNotificationStatus(user.notification)"
              >Disable Notifications</v-switch>
            </div>
          </div>
        </v-card>

        <!-- --------------------- one signal ----------------- -->

        <v-card class="mx-auto slackCard" max-width="344" height="250px" outlined>
          <v-img
            class="white--text align-end slackImage"
            width="100px"
            src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/projectFile_1592584626072_onesignal-1534463753064.png"
          ></v-img>

          <div class="cardSlogan">Get updates from all sorts of things that matter to you</div>
          <div class="oneSignalButton">
            <div class="onesignal-customlink-container cardOneSignalSlogan"></div>
            <v-btn
              color="teal"
              outlined
              depressed
              class="text-capitalize oneSignalBtn"
              v-show="getstatus"
              @click="activateOneSignal()"
            >Activate</v-btn>
            <v-btn
              depressed
              color="red"
              dark
              style="margin-top: -15px"
              class="text-capitalize oneSignalBtn"
              v-show="!getstatus"
              @click="deactivateOneSignal()"
            >Deactivate</v-btn>
          </div>
        </v-card>

        <div>
          <!-- ---- this is a switch button if applicable ---- -->
          <!-- <v-sheet class="pa-5">
        <v-switch v-model="switch1" inset :label="`Switch 1: ${switch1.toString()}`"></v-switch>
          </v-sheet>-->
        </div>

        <!-- <v-switch v-model="switch1" inset :label="`Switch 1: ${switch1.toString()}`"></v-switch> -->
      </div>
    </div>
    <v-form @submit.prevent="handleSubmit" v-model="isValid" ref="form">
      <div class="profileUserName">{{ user.firstName }} {{ user.lastName }}</div>

      <div class="userDetails">
        <p class="userName"></p>
      </div>

      <div class="usersForms userDetailsForm profileForm">
        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              v-model="user.firstName"
              label="First Name"
              class="profileUpdateTextFields"
              :rules="firstNameRules"
            />
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              v-model="user.lastName"
              label="Last Name"
              class="profileUpdateTextFields"
              :rules="lastNameRules"
            />
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              type="email"
              v-model="user.email"
              label="Email"
              class="profileUpdateTextFields"
              :rules="emailRules"
            />
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              v-model="user.userName"
              disabled
              label="Username"
              class="profileUpdateTextFields"
            />
          </v-col>
        </v-row>

        <v-row class="mb-12 formRow" no-gutters>
          <v-col sm="6" md="6">
            <!-- <input type="password"  v-model="password"  placeholder="************" class="formElements"> -->

            <v-text-field
              flat
              outlined
              type="password"
              v-model.trim="$v.password.$model"
              label="New password (Change if needed) "
              class="profileUpdateTextFields"
            />
            <!-- <div v-if="$v.password.$error && !$v.password.required" class="errorText"> Password is required</div> -->
            <div
              v-if="$v.password.$error && !$v.password.minLength"
              class="errorText"
            >Password must be at least 6 characters</div>
          </v-col>
          <v-col sm="6" md="6">
            <v-text-field
              flat
              outlined
              type="password"
              v-model.trim="$v.confirmPassword.$model"
              label="Confirm Password"
              class="profileUpdateTextFields"
            />
            <div
              v-if="$v.confirmPassword.$error && !$v.confirmPassword.sameAs"
              class="errorText"
            >Passwords must be identical</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" md="12">
            <v-btn
              v-if="
                this.password != '' &&
                  !this.$v.$invalid == true &&
                  isValid == true
              "
              height="50px"
              width="300px"
              class="submitButtonEdit"
            >
              <v-list-item @click="postData()" dark>
                <v-list-item-action>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Edit profile details</v-list-item-title>
                </v-list-item-content>
                <!-- <div class="iconBackCircle">
                  <v-icon size="17" color="#0BAFFF">mdi-pencil-outline</v-icon>
                </div>-->
              </v-list-item>
            </v-btn>

            <v-btn
              depressed
              v-else-if="
                this.confirmPassword == '' &&
                  this.password == '' &&
                  !this.$v.$invalid == false &&
                  isValid == true
              "
              height="50px"
              width="300px"
              class="submitButtonEdit text-capitalize"
            >
              <v-list-item @click="postData()" dark>
                <v-list-item-action>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Edit profile details</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-btn>
            <v-btn
              depressed
              v-else
              disabled
              height="50px"
              width="300px"
              class="submitButtonEdit text-capitalize"
            >
              <v-list-item @click="postData()" dark>
                <v-list-item-action>
                  <v-icon size="20" color>icon-user</v-icon>
                </v-list-item-action>
                <v-list-item-content class="buttonText">
                  <v-list-item-title class="bodyWiew">Edit profile details</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col md="3">
            <div style="color: #576377; font-weight: 450">Skills</div>
          </v-col>
        </v-row>
        <v-row class="skillsSection">
          <v-col>
            <div class="skillDisplayDivProfile">
              <div class="skillProfileScrollingWrapper">
                <div
                  class="skillCard text-center"
                  v-for="(category, index) in userSkillMap"
                  :key="index"
                >
                  <div
                    class="skillHeader"
                    :style="'background-color:' + category.categoryColorCode"
                  >{{ category.categoryName }}</div>

                  <div class="skillBody">
                    <div
                      style="padding-bottom: 10px"
                      v-for="(skill, index) in category.skillSet"
                      :key="index"
                    >{{ skill.skillName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-form>

    <div @click="close">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
    </div>
    <!-- <success-popup /> -->
    <!-- <v-text-field
            flat
            outlined
            v-model="commentContent"
            label="Type a Comment Here...."
            autocomplete="off"
            @focus="typingEvent"
          />
    <v-btn @click="websock">Connect</v-btn>
    
    <v-btn @click="sendMessage">Send</v-btn>-->
  </div>
</template>

<script>
import EditProfile from "~/components/profile/editProfile";
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export default {
  props: ["user"],
  components: {
    "edit-profile": EditProfile,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
  },
  // data: function(){
  // return{

  // }
  // },
  data() {
    return {
      isValid: true,
      firstNameRules: [(value) => !!value || "First name is required!"],
      lastNameRules: [(value) => !!value || "Last name is required!"],
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      getstatus: false,
      disableButton: true,
      switch1: true,
      switch2: false,
      uploadLoading: false,
      files: [],
      errorMessage: "",
      successMessage: "",
      userName: this.user.userName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      enableNotification: !this.user.notificationStatus,
      disableNotification: !this.user.notificationStatus,
      loader: null,
      loading: false,
      password: "",
      confirmPassword: "",
      file: "",
      userId: this.$store.state.user.userId,
      dismissSecs: 5,
      dismissCountDown: 0,
      component: "",
      stompClient: null,
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  computed: {
    ...mapState({
      userSkillMap: (state) => state.skillMap.userSkillMap,
    }),
  },

  created() {
    console.log("CREATED");
    this.checkActivationStatus();
    // const authCode = this.$route.query.code;
    // // console.log("SLACK CODE", authCode);
    // if (authCode !== undefined) {
    //   // console.log("Slack Auth code present");
    //   axios({
    //     method: 'post',
    //     url: 'https://slack.com/api/oauth.v2.access',
    //     data: qs.stringify({
    //       client_id: '345426929140.1020110511447',
    //       client_secret: 'fd851b7af77e525c1700879de9b328ab',
    //       code: authCode,
    //     }),
    //     headers: {
    //       'content-type': 'application/x-www-form-urlencoded',
    //     },
    //   })
    //     .then(async (resp) => {
    //       // console.log("Slack Token Response", resp.data);
    //       const slackId = resp.data.authed_user.id;
    //       // console.log("User Slack Id", slackId);
    //       let response;
    //       try {
    //         response = await this.$axios.$put(
    //           `/users/${this.userId}/slack`,
    //           {
    //             slackAssignerId: this.userId,
    //             slackAssigneeId: this.user.userId,
    //             assigneeSlackId: slackId,
    //           },
    //           {
    //             headers: {
    //               userId: this.userId,
    //             },
    //           }
    //         );
    //         console.log('Slack Id saved successfuly', response);
    //       } catch (e) {
    //         console.log('Error saving slack Id in database', e);
    //       }
    //     })
    //     .catch((e) => {
    //       console.log('error from slack', e);
    //     });
    // } else {
    //   console.log('No Slack Auth Code Present');
    // }
  },

  methods: {
    checkActivationStatus() {
      if (process.browser) {
        window.OneSignal.isPushNotificationsEnabled((isEnabled) => {
          if (isEnabled) {
            console.log("Push notifications are enabled!");
            this.getstatus = false;
          } else {
            this.getstatus = true;
            console.log("Push notifications are not enabled yet.");
          }
        });
      }
    },
    activateOneSignal() {
      console.log("activate");
      if (process.browser) {
        window.OneSignal.getUserId().then((userId) => {
          if (userId) {
            console.log("userId", userId);
            this.changeOneSignalActivationStatus(userId, true);
            window.OneSignal.setSubscription(true);
            this.getstatus = false;
          }
        });
      }
    },
    deactivateOneSignal() {
      console.log("deactivate");
      if (process.browser) {
        window.OneSignal.getUserId().then((userId) => {
          if (userId) {
            console.log("userId", userId);
            this.changeOneSignalActivationStatus(userId, false);
            window.OneSignal.setSubscription(false);
            this.getstatus = true;
          }
        });
      }
    },
    async changeOneSignalActivationStatus(subscriptionId, notificationStatus) {
      let response;
      try {
        response = await this.$axios.$put(
          `/notification/status`,
          {
            subscriptionId: subscriptionId,
            subscriberId: this.$store.state.user.userId,
            provider: "OneSignal",
            platform: "Web",
            notificationStatus: notificationStatus,
          },
          {
            headers: {
              userId: this.$store.state.user.userId,
            },
          }
        );
      } catch (e) {
        console.log("error", e);
      }
    },
    categorizedSkillMap() {
      let skillmap = this.userSkillMap;
      // console.log("skillmap", this.userSkillMap);
      const orderedSkillMap = skillmap.reduce((accumilate, current) => {
        accumilate[current.categoryId] = (
          accumilate[current.categoryId] || []
        ).concat(current);
        return accumilate;
      }, {});
      return orderedSkillMap;
    },
    setVisible() {
      console.log("DISABLED!");

      this.disableButton = false;
    },
    async changeNotificationStatus(status) {
      let response;
      try {
        response = await this.$axios.$put(
          `/users/${this.userId}/slack/status`,
          {
            slackAssignerId: this.userId,
            slackAssigneeId: this.user.userId,
            notificationStatus: !status,
          },
          {
            headers: {
              userId: this.userId,
            },
          }
        );
        location.reload();
        if (status === true) {
          // console.log("cuurent status--> Ture", status);
          // this.enableNotification = true;
          this.disableNotification = false;
        } else {
          // console.log("cuurent status--> False", status);
          // this.disableNotification = true;
          this.enableNotification = false;
        }
        // this.enableNotification = ;
        // this.disableNotification = ;
        console.log("Notification Status updated successfuly", response);
      } catch (e) {
        console.log("Error Updating Notification Status", e);
      }
    },

    async postData() {
      let response;
      try {
        if (this.password == "") {
          response = await this.$axios.$put(`/users/${this.userId}`, {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
          });
        } else {
          response = await this.$axios.$put(`/users/${this.userId}`, {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            password: this.password,
          });
        }

        this.$store.dispatch("userProfile/fetchProfilePicture");

        this.component = "success-popup";
        this.successMessage = "Profile successfully updated";
        setTimeout(() => {
          this.close();
        }, 3000);
        // console.log(response.message);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        // alert("Error updating user!")
      }
    },

    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
    },
    close() {
      this.component = "";
    },
    async submit() {
      this.uploadLoading = true;
      let formData = new FormData();
      formData.append("files", this.files);
      formData.append("type", "profileImage");
      this.files = null;

      let fileResponse;
      try {
        fileResponse = await this.$axios.$post(
          `/user/profile/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              user: this.userId,
            },
          }
        );
        this.uploadLoading = false;
        this.component = "success-popup";
        this.successMessage = "Profile successfully updated";
        console.log("group people response", this.taskFiles);
        location.reload();
      } catch (e) {
        console.log("Error uploading prof pic: ", e);
        this.component = "error-popup";
        console.log("File Upload Failed: " + e);
        this.errorMessage = e.response.data;
        this.uploadLoading = false;
      }
    },
    handleFileUploads(e) {
      try {
        console.log(this.$refs.files.files);
        this.file = this.$refs.files.files[0];
      } catch (e) {
        console.log(e);
      }
    },
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
};
</script>
