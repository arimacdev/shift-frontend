<template>
  <div class="taskCommentsSection">
    <v-row>
      <v-col>Added taskComments {{taskComments}}</v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <div class="commentEditor">
          <v-row>
            <v-col sm="1" md="1" style="padding-left: 40px">
              <v-avatar>
                <v-img :src="this.ownUser.profileImage"></v-img>
              </v-avatar>
            </v-col>
            <v-col sm="10" md="10">
              <!-- <ejs-richtexteditor
                ref="rteObj"
                :quickToolbarSettings="quickToolbarSettings"
                :toolbarSettings="toolbarSettings"
                v-model="textEditor"
              ></ejs-richtexteditor>-->
              <div class="default-section">
                <ejs-richtexteditor
                  ref="rteObj"
                  :quickToolbarSettings="quickToolbarSettings"
                  :height="340"
                  :toolbarSettings="toolbarSettings"
                  :iframeSettings="iframeConfig"
                >
                  <p>
                    The Rich Text Editor is WYSIWYG ("what you see is what you get") editor useful to create and edit content,and return the valid
                    <a
                      href="https://ej2.syncfusion.com/home/"
                      target="_blank"
                    >HTML markup</a> or
                    <a href="https://ej2.syncfusion.com/home/" target="_blank">markdown</a>
                    of the content
                  </p>
                  <p>
                    <b>Key features:</b>
                  </p>
                  <ul>
                    <li>
                      <p>Provides IFRAME and DIV modes</p>
                    </li>
                    <li>
                      <p>Capable of handling markdown editing.</p>
                    </li>
                    <li>
                      <p>Contains a modular library to load the necessary functionality on demand.</p>
                    </li>
                    <li>
                      <p>Provides a fully customizable toolbar.</p>
                    </li>
                    <li>
                      <p>Provides HTML view to edit the source directly for developers.</p>
                    </li>
                    <li>
                      <p>Supports third-party library integration.</p>
                    </li>
                    <li>
                      <p>Allows preview of modified content before saving it.</p>
                    </li>
                    <li>
                      <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                    </li>
                  </ul>
                </ejs-richtexteditor>
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
  methods: {
    async addComment() {
      this.overlay = true;
      console.log("assignee changed");
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
        ],
        link: ["Open", "Edit", "UnLink"]
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
          "Image",
          "|",
          "ClearFormat",
          "Print",
          "SourceCode",
          "FullScreen",
          "|",
          "Undo",
          "Redo"
        ]
      },
      iframeConfig: {
        enable: true
      }
    };
  },
  provide: {
    richtexteditor: [Toolbar, Image, Link, HtmlEditor, QuickToolbar]
  }
};
</script>
<style></style>
