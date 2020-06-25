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
                        <span style="font-size: 14px" v-html="react.reactionId"></span>
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
                    <div class="text-capitalize addEmojiButton">
                      <span>
                        <v-icon size="16" style="margin-top: -5px">mdi-pencil-outline</v-icon>
                      </span>
                    </div>
                    <div class="text-capitalize addEmojiButton">
                      <span>
                        <v-icon size="16" style="margin-top: -5px">mdi-trash-can-outline</v-icon>
                      </span>
                    </div>
                    <div class="commentDivider">
                      <v-divider></v-divider>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>

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
                <v-img :src="this.ownUser.profileImage"></v-img>
              </v-avatar>
            </v-col>
            <v-col sm="10" md="10">
              <div id="defaultRTE">
                <ejs-richtexteditor
                  ref="rteObj"
                  :quickToolbarSettings="quickToolbarSettings"
                  :toolbarSettings="toolbarSettings"
                  v-model="textEditor"
                ></ejs-richtexteditor>
              </div>

              <v-btn
                @click="addComment()"
                class="text-capitalize"
                style="margin-top: 10px"
                color="primary"
              >Comment</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
  props: ['stomp'],
  created(){
    console.log("created---->", this.stomp)
  },
  methods: {
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
        console.log("Error updating a status", e);
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
        // this.component = 'success-popup';
        // this.successMessage = 'Assignee successfully updated';

        // this.userExists = true;
        // setTimeout(() => {
        //   this.close();
        // }, 3000);
        // this.overlay = false;
        // console.log("update task status response", response);
      } catch (e) {
        // this.errorMessage = e.response.data;
        // this.component = 'error-popup';
        // setTimeout(() => {
        //   this.close();
        // }, 3000);
        // this.overlay = false;
        console.log("Error updating a status", e);
      }
    },
      sendCommentedMessage(taskId) {
        console.log("sending message", this.stomp)
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

      console.log(
        "Today | ",
        now,
        now.getHours(),
        "| DueDate | ",
        dueToUtcDate,
        dueToUtcDate.getHours()
      );

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
      s1: "U+1F600",
      addCommentSection: false,
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      // insertImageSettings: {
      //           saveUrl : 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save'
      //       },
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
          "LowerCase",
          "UpperCase",
          "|",
          "Formats",
          "Alignments",
          "OrderedList",
          "UnorderedList",
          "Outdent",
          "Indent",
          "|",
          "CreateLink",
          "Image"
          // '|',
          // 'ClearFormat',
          // 'Print',
          // 'SourceCode',
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
