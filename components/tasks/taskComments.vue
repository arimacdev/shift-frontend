<template>
  <div class="taskCommentsSection">
    <v-row>
      <v-col>
        <div v-if="taskComments == ''">No comments to show</div>
        <div v-else>
          <div v-for="(comment, index) in this.taskComments" :key="index">
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
                <div class="commenterName">
                  {{ comment.commenterFistName }}
                  {{ comment.commenterLatName }}
                </div>
                <div class="commentTime">
                  {{ getCommentTime(comment.commentedAt) }}
                </div>
                <br />
                <div class="commentContent" v-html="comment.content"></div>
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
      text=""
      color="primary"
    >
      <v-icon left>mdi-comment-processing-outline</v-icon> Add a comment
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
                >
                </ejs-richtexteditor>
              </div>

              <v-btn
                @click="addComment()"
                class="text-capitalize"
                style="margin-top: 10px"
                color="primary"
                >Comment</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  RichTextEditorPlugin,
  Toolbar,
  Link,
  Image,
  Count,
  HtmlEditor,
  QuickToolbar,
} from '@syncfusion/ej2-vue-richtexteditor';
export default {
  methods: {
    async addComment() {
      this.overlay = true;
      console.log('assignee changed');
      let response;
      try {
        response = await this.$axios.$post(
          `/task/comment`,
          {
            entityId: this.selectedTask.taskId,
            content: this.textEditor,
            commenter: this.userId,
            parentId: '',
          },
          {
            headers: {
              userId: this.userId,
            },
          }
        );
        this.textEditor = '';
        this.$store.dispatch('comments/fetchTaskActivityComment', {
          taskId: this.selectedTask.taskId,
          startIndex: 0,
          endIndex: 200,
        });
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
        console.log('Error updating a status', e);
      }
    },
    getCommentTime(date) {
      const dueDate = new Date(date);
      const dueToUtc = new Date(
        dueDate.toLocaleString('en-US', { timeZone: 'UTC' })
      );
      const dueToUtcDate = new Date(dueToUtc);
      const now = new Date();

      console.log(
        'Today | ',
        now,
        now.getHours(),
        '| DueDate | ',
        dueToUtcDate,
        dueToUtcDate.getHours()
      );

      if (date === null || date === '1970-01-01T05:30:00.000+0000') {
        return 'Add Due Date';
      }
      // else if (
      //   now.getDate() === dueToUtcDate.getDate() &&
      //   now.getMonth() === dueToUtcDate.getMonth() &&
      //   now.getFullYear() === dueToUtcDate.getFullYear()
      // ) {
      //   return 'Today';
      // }
      else if (
        now.getHours() === dueToUtcDate.getHours() &&
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return now.getMinutes() - dueToUtcDate.getMinutes() + ' min ago';
      } else if (
        now.getHours() !== dueToUtcDate.getHours() &&
        now.getDate() === dueToUtcDate.getDate() &&
        now.getMonth() === dueToUtcDate.getMonth() &&
        now.getFullYear() === dueToUtcDate.getFullYear()
      ) {
        return now.getHours() - dueToUtcDate.getHours() + ' h ago';
      } else if (
        now.getDate() - 1 === dueToUtcDate.getDate() &&
        now.getMonth() - 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() - 1 === dueToUtcDate.getFullYear()
      ) {
        return 'Yesterday';
      } else if (
        now.getDate() + 1 === dueToUtcDate.getDate() &&
        now.getMonth() + 1 === dueToUtcDate.getMonth() &&
        now.getFullYear() + 1 === dueToUtcDate.getFullYear()
      ) {
        return 'Tomorrow';
      } else {
        let stringDate = date + '';
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0, 10) + ' ' + stringDate.slice(11, 16);
        return stringDate;
      }
    },
  },
  computed: {
    ...mapState({
      selectedTask: (state) => state.task.selectedTask,
      ownUser: (state) => state.user.ownUser,
      taskComments: (state) => state.comments.activityComment,
    }),
  },
  data: function() {
    return {
      addCommentSection: false,
      // insertImageSettings: {
      //           saveUrl : 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save'
      //       },
      userId: this.$store.state.user.userId,
      textEditor: '',
      height: 400,
      quickToolbarSettings: {
        image: [
          'Replace',
          'Align',
          'Caption',
          'Remove',
          'InsertLink',
          'OpenImageLink',
          '-',
          'EditImageLink',
          'RemoveImageLink',
          'Display',
          'AltText',
          'Dimension',
        ],
      },
      toolbarSettings: {
        items: [
          'Bold',
          'Italic',
          'Underline',
          'StrikeThrough',
          'FontName',
          'FontSize',
          'FontColor',
          'BackgroundColor',
          'LowerCase',
          'UpperCase',
          '|',
          'Formats',
          'Alignments',
          'OrderedList',
          'UnorderedList',
          'Outdent',
          'Indent',
          '|',
          'CreateLink',
          'Image',
          // '|',
          // 'ClearFormat',
          // 'Print',
          // 'SourceCode',
          // 'FullScreen',
          // '|',
          // 'Undo',
          // 'Redo',
        ],
      },

      iframeConfig: {
        enable: true,
      },
    };
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar],
  },
};
</script>
