<template>
  <div class="taskCommentsSection">
    <v-row>
      <v-col>
        <div v-if="taskComments == ''">No comments to show</div>
        <div v-else>
          <div class="commentBody" v-for="(comment, index) in this.taskComments" :key="index">
            <v-row>
              <v-col sm="1" md="1" style="padding-left: 40px">
                <v-avatar>
                  <v-img
                    v-if="
                      comment.commenterProfileImage != null &&
                        comment.commenterProfileImage != ''
                    "
                    :src="comment.commenterProfileImage"
                  ></v-img>
                  <v-img
                    v-else
                    src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col sm="10" md="10">
                <div>
                  <div class="commenterName">
                    {{ comment.commenterFistName }}
                    {{ comment.commenterLatName }}
                  </div>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <div v-on="on" class="commentTime">{{ getCommentTime(comment.commentedAt) }}</div>
                    </template>
                    <span>{{ getTooltipDate(comment.commentedAt) }}</span>
                  </v-tooltip>
                  <br />
                  <div class="commentContent" v-html="comment.content"></div>

                  <div class="commentFunctionSection">
                    <div v-if="comment.reactions != ''">
                      <div
                        v-for="(react, index) in comment.reactions"
                        :key="index"
                        class="text-capitalize addEmojiButton"
                      >
                        <v-tooltip color="black" right>
                          <template v-slot:activator="{ on }">
                            <div
                              @click="removeReaction(comment.commentId, react.reactionId)"
                              v-on="on"
                            >
                              <span style="font-size: 14px" v-html="react.reactionId"></span>
                              <span>{{react.respondants.length}}</span>
                            </div>
                          </template>
                          <v-list-item
                            style="margin-top: -10px; margin-bottom: -10px; margin-left: -20px"
                            v-for="(responder, index) in react.respondants"
                            :key="index"
                          >
                            <div style="float: left">
                              <v-avatar size="20">
                                <v-img
                                  v-if="responder.responderProfileImage != null && responder.responderProfileImage  != ''"
                                  :src="responder.responderProfileImage "
                                ></v-img>
                                <v-img
                                  v-else
                                  src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                                ></v-img>
                              </v-avatar>
                            </div>
                            <div style="float: left; padding-left: 20px">
                              <div
                                style="color:#FFFFFF"
                              >{{responder.responderFirstName}} {{responder.responderLastName}}</div>
                            </div>
                            <!-- <v-divider color="#FFFFFF"></v-divider> -->
                          </v-list-item>
                        </v-tooltip>
                      </div>
                    </div>
                    <!-- <div class="text-capitalize addEmojiButton">
                      <span style="font-size: 14px">&#128077; 5</span>
                    </div>-->
                    <v-menu class="emojiMenu" open-on-hover top offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <div class="text-capitalize addEmojiButton" v-bind="attrs" v-on="on" @click>
                          <span style="font-size: 14px">
                            <v-icon size="16" style="margin-top: -6px">mdi-emoticon-outline</v-icon>
                          </span>
                        </div>
                      </template>
                      <div @click="addReact(comment.commentId, '&#128077;')" class="emoji">&#128077;</div>
                      <div @click="addReact(comment.commentId, '&#128154;')" class="emoji">&#128154;</div>
                      <div @click="addReact(comment.commentId, '&#128514;')" class="emoji">&#128514;</div>
                      <div @click="addReact(comment.commentId, '&#128154;')" class="emoji">&#128545;</div>
                      <div @click="addReact(comment.commentId, '&#128546;')" class="emoji">&#128546;</div>
                    </v-menu>
                    <div
                      @click="commentEditor = true; selectComment(comment)"
                      class="text-capitalize addEmojiButton"
                    >
                      <span>
                        <v-icon size="16" style="margin-top: -5px">mdi-pencil-outline</v-icon>
                      </span>
                    </div>
                    <div
                      @click="deleteCommentDialog = true; selectComment(comment); "
                      class="text-capitalize addEmojiButton"
                    >
                      <span>
                        <v-icon size="16" style="margin-top: -5px">mdi-trash-can-outline</v-icon>
                      </span>
                    </div>
                    <div class="commentDivider"></div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <!-- ----------- update comment section ------------- -->
            <v-row v-if="commentEditor == true && selectedComment.commentId == comment.commentId">
              <v-col sm="1" md="1"></v-col>
              <v-col sm="10" md="10">
                <div id="defaultRTE">
                  <ejs-richtexteditor
                    :insertImageSettings="insertImageSettings"
                    ref="rteObj"
                    :quickToolbarSettings="quickToolbarSettings"
                    :toolbarSettings="toolbarSettings"
                    v-model="updatedComment"
                  ></ejs-richtexteditor>
                </div>
                <div style="float: left">
                  <v-btn
                    @click="updateComment(comment.commentId)"
                    class="text-capitalize"
                    style="margin-top: 10px"
                    color="primary"
                  >Update</v-btn>
                  <v-btn
                    @click="commentEditor = false"
                    class="text-capitalize"
                    style="margin-top: 10px"
                    color="error"
                  >Cancel</v-btn>
                </div>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <div v-on="on" class="fileAttachSection" style>
                      <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        hide-input
                        v-model="files"
                        @change="submit('updateComment')"
                      ></v-file-input>
                    </div>
                  </template>
                  <span>Attach an image</span>
                </v-tooltip>
                <!--  -->
                <div style="margin-top: 15px; padding-left: 30px">
                  <v-progress-circular v-if="uploadLoading == true" indeterminate color="primary"></v-progress-circular>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-btn
      v-if="addCommentSection == false"
      v-on:click="addCommentSection = true"
      class="ma-2"
      text
      color="primary"
    >
      <v-icon left>mdi-comment-processing-outline</v-icon>Add a comment
    </v-btn>
    <v-row>
      <v-col>
        <div v-if="this.addCommentSection == true" class="commentEditor">
          <v-row>
            <v-col sm="1" md="1" style="padding-left: 40px">
              <v-avatar>
                <!-- <v-img :src="this.ownUser.profileImage"></v-img> -->
                <v-img
                  v-if="
                      this.ownUser.profileImage != null &&
                       this.ownUser.profileImage != ''
                    "
                  :src="this.ownUser.profileImage"
                ></v-img>
                <v-img
                  v-else
                  src="https://arimac-pmtool.s3-ap-southeast-1.amazonaws.com/profileImage_1591189597971_user.png"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col sm="10" md="10">
              <div id="defaultRTE">
                <ejs-richtexteditor
                  :insertImageSettings="insertImageSettings"
                  ref="rteObj"
                  :quickToolbarSettings="quickToolbarSettings"
                  :toolbarSettings="toolbarSettings"
                  v-model="textEditor"
                ></ejs-richtexteditor>
              </div>
              <div style="float: left">
                <v-btn
                  @click="addComment()"
                  class="text-capitalize"
                  style="margin-top: 10px"
                  color="primary"
                >Comment</v-btn>
              </div>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <div v-on="on" class="fileAttachSection" style>
                    <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      hide-input
                      v-model="files"
                      @change="submit('addComment')"
                    ></v-file-input>
                  </div>
                </template>
                <span>Attach an image</span>
              </v-tooltip>
              <!--  -->
              <div style="margin-top: 15px; padding-left: 30px">
                <v-progress-circular
                  v-if="this.uploadLoading == true"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <!-- --------- delete comment dialog ------ -->
    <v-dialog v-model="deleteCommentDialog" max-width="350">
      <v-card style="text-align: center ; padding-bottom: 25px">
        <v-card-title style="text-align: center">
          <v-spacer></v-spacer>Delete Comment
          <v-spacer></v-spacer>
        </v-card-title>

        <v-card-text>
          You are about to delete your comment. You will loose all its contents.
          Are you sure that you wish to continue?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn width="100px" color="#FF6161" dark @click="deleteCommentDialog = false">Cancel</v-btn>

          <v-btn
            width="100px"
            color="#2EC973"
            dark
            @click="deleteCommentDialog = false; deleteComment()"
          >Ok</v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div @click="close" class="taskPopupPopups">
      <component
        v-bind:is="component"
        :successMessage="successMessage"
        :errorMessage="errorMessage"
      ></component>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import {
  RichTextEditorPlugin,
  Toolbar,
  Link,
  Image,
  Count,
  HtmlEditor,
  QuickToolbar
} from "@syncfusion/ej2-vue-richtexteditor";
export default {
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup
  },
  props: ["stomp"],
  created() {
    console.log("created---->", this.stomp);
    this.projectId = this.$route.params.projects;
  },
  methods: {
    async submit(type) {
      if (this.files != null) {
        this.uploadLoading = true;
        let formData = new FormData();
        formData.append("files", this.files);
        formData.append("type", "profileImage");
        formData.append("taskType", "project");
        this.files = null;

        let fileResponse;
        try {
          fileResponse = await this.$axios.$post(
            `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                user: this.userId
              }
            }
          );
          this.uploadLoading = false;
          // this.component = "success-popup";
          // this.successMessage = "Profile successfully updated";
          if (type == "addComment") {
            this.textEditor =
              this.textEditor +
              "<img src='" +
              fileResponse.data.taskFileUrl +
              "' class='e-rte-image e-imginline' width='auto' height='auto' style='min-width: 0px; min-height: 0px;'>";
          } else {
            this.updatedComment =
              this.updatedComment +
              "<img src='" +
              fileResponse.data.taskFileUrl +
              "' class='e-rte-image e-imginline' width='auto' height='auto' style='min-width: 0px; min-height: 0px;'>";
          }
          console.log("File response", fileResponse.data.taskFileUrl);
          // location.reload();
        } catch (e) {
          console.log("Error uploading prof pic: ", e);
          // this.component = "error-popup";
          // console.log("File Upload Failed: " + e);
          // this.errorMessage = e.response.data;
          this.uploadLoading = false;
        }
      }
      this.files = null;
    },
    close() {
      this.component = "";
    },
    selectComment(comment) {
      this.selectedComment = comment;
      this.updatedComment = comment.content;
    },
    async addReact(commentId, reactId) {
      let response;
      try {
        response = await this.$axios.$post(
          `/task/comment/${commentId}/reaction`,
          {
            reactionId: reactId
          },
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch("comments/fetchTaskActivityComment", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 200
        });
      } catch (e) {
        // this.errorMessage = e.response.data;
        // this.component = "error-popup";
        // setTimeout(() => {
        //   this.close();
        // }, 3000);
        // console.log("Error creating project", e);

        // console.log("Error updating a status", e);
        if (e.response.status == 422) {
          this.removeReaction(commentId, reactId);
        }
      }
    },
    async deleteComment() {
      let response;
      try {
        response = await this.$axios.$delete(
          `/task/comment/${this.selectedComment.commentId}`,
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch("comments/fetchTaskActivityComment", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 200
        });
        this.successMessage = "Comment deleted successfully";
        this.component = "success-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("Error creating project", e);
      }
    },
    async removeReaction(commentId, reactId) {
      let response;
      try {
        response = await this.$axios.$delete(
          `/task/comment/${commentId}/reaction`,
          {
            data: {
              reactionId: reactId
            },
            headers: {
              userId: this.userId
            }
          }
        );
        this.$store.dispatch("comments/fetchTaskActivityComment", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 200
        });
      } catch (e) {
        // this.errorMessage = e.response.data;
        // this.component = "error-popup";
        // setTimeout(() => {
        //   this.close();
        // }, 3000);
        // console.log("Error creating project", e);
        if (e.response.status == 404) {
          this.addReact(commentId, reactId);
        }
      }
    },
    async addComment() {
      let response;
      try {
        response = await this.$axios.$post(
          `/task/comment`,
          {
            entityId: this.selectedTask.taskId,
            content: this.textEditor,
            commenter: this.userId,
            parentId: ""
          },
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.textEditor = "";
        this.$store.dispatch("comments/fetchTaskActivityComment", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 200
        });
        this.sendCommentedMessage(this.selectedTask.taskId);

        this.component = "success-popup";
        this.successMessage = "Comment successfully added";
        this.userExists = true;
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log("Error updating a status", e);
      }
    },
    async updateComment(commentId) {
      let response;
      try {
        response = await this.$axios.$put(
          `/task/comment/${commentId}`,
          {
            content: this.updatedComment,
            commenter: this.userId
          },
          {
            headers: {
              userId: this.userId
            }
          }
        );
        this.commentEditor = false;
        this.$store.dispatch("comments/fetchTaskActivityComment", {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 200
        });
        this.sendCommentedMessage(this.selectedTask.taskId);

        this.component = "success-popup";
        this.successMessage = "Comment successfully updated";
        this.userExists = true;
        setTimeout(() => {
          this.close();
        }, 3000);
        console.log("update task status response", response);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.overlay = false;
        console.log("Error updating a status", e);
      }
    },
    sendCommentedMessage(taskId) {
      console.log("sending message", this.stomp);
      this.stomp.send(
        "/app/chat/" + taskId,
        {},
        JSON.stringify({
          fromLogin: "from",
          message: "Hi!!",
          actionType: "comment"
        })
      );
    },
    getTooltipDate(date) {
      let stringDate = date + "";
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(11, 16);
      return stringDate;
    },
    getCommentTime(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString("en-US", { timeZone: "UTC" })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();

      // console.log(
      //   "Today | ",
      //   now,
      //   now.getHours(),
      //   "| DueDate | ",
      //   dueToUtcDate,
      //   dueToUtcDate.getHours()
      // );

      if (date === null || date === "1970-01-01T05:30:00.000+0000") {
        return "Add Due Date";
      } else if (
        now.getHours() === dueToUtcDate.getHours() &&
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return now.getMinutes() - dueToUtcDate.getMinutes() + " min ago";
      } else if (
        now.getHours() !== dueToUtcDate.getHours() &&
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return now.getHours() - dueToUtcDate.getHours() + " h ago";
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() - 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() - 1 === dueToUtcDate.getFullYear()
      ) {
        return "Yesterday";
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() + 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() + 1 === dueToUtcDate.getFullYear()
      ) {
        return "Tomorrow";
      } else {
        let stringDate = date + "";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10) + " " + stringDate.slice(11, 16);
        return stringDate;
      }
    }
  },
  computed: {
    ...mapState({
      selectedTask: state => state.task.selectedTask,
      ownUser: state => state.user.ownUser,
      taskComments: state => state.comments.activityComment
    })
  },
  data: function() {
    return {
      file: "",
      updatedComment: "",
      commentEditor: false,
      selectedComment: {},
      uploadLoading: false,
      errorMessage: "",
      successMessage: "",
      deleteCommentDialog: false,
      component: "",
      addCommentSection: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      insertImageSettings: {
        display: "break"
      },
      userId: this.$store.state.user.userId,
      textEditor: "",
      height: 400,
      quickToolbarSettings: {
        image: [
          "Replace",
          "Align",
          "Caption",
          "Remove",
          "InsertLink",
          "OpenImageLink",
          "-",
          "EditImageLink",
          "RemoveImageLink",
          "Display",
          "AltText",
          "Dimension"
        ]
      },
      toolbarSettings: {
        items: [
          "Bold",
          "Italic",
          "Underline",
          "StrikeThrough",
          "FontName",
          "FontSize",
          "FontColor",
          "BackgroundColor",
          // "LowerCase",
          // "UpperCase",
          "|",
          "Formats",
          "Alignments",
          "OrderedList",
          "UnorderedList",
          "Outdent",
          "Indent",
          "|",
          "CreateLink",
          "Image",
          // '|',
          // 'ClearFormat',
          // 'Print',
          "SourceCode"
          // 'FullScreen',
          // '|',
          // 'Undo',
          // 'Redo',
        ]
      },

      iframeConfig: {
        enable: true
      }
    };
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar]
  }
};
</script>
