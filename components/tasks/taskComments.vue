<template>
  <div class="taskCommentsSection">
    <v-row>
      <v-col>
        <div v-if="taskComments == ''">No comments to show</div>
        <div v-else>{{ taskComments }}</div>
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
