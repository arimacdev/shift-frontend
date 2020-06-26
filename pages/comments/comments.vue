<template>
  <div class="top-nav">
    <navigation-drawer :user="user" />

    <!-- <task-comments /> -->

    <div id="defaultRTE">
      <ejs-richtexteditor
        :insertImageSettings="insertImageSettings"
        ref="rteObj"
        :quickToolbarSettings="quickToolbarSettings"
        :height="340"
        :toolbarSettings="toolbarSettings"
        v-model="textEditor"
      >
        <ejs-uploader
          ref="uploadObj"
          :asyncSettings="path"
          :dropArea="dropElement"
          :success="onImageUploadSuccess()"
        ></ejs-uploader>
      </ejs-richtexteditor>
    </div>
    <div>
      <!-- {{ this.textEditor }} -->
      <div v-html="this.textEditor"></div>
    </div>
  </div>
</template>
<script>
import NavigationDrawer from "~/components/navigationDrawer";
import TaskComments from "~/components/tasks/taskComments";
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
    async onImageUploadSuccess() {
      console.log("TRIGERED!");
      // if (this.files != null) {
        for (let index = 0; index < this.files.length; ++index) {
          this.uploadLoading = true;
          let formData = new FormData();
          formData.append('files', this.files[index]);
          formData.append('type', 'profileImage');
          formData.append('taskType', 'project');
          let fileResponse;
          try {
            fileResponse = await this.$axios.$post(
              `/projects/${this.projectId}/tasks/${this.selectedTask.taskId}/upload`,
              formData,
              {
                headers: {
                  user: this.userId,
                },
              }
            );
            this.$store.dispatch('task/appendTaskFile', fileResponse.data);
            this.$store.dispatch('activityLog/fetchTaskActivityLog', {
              taskId: this.selectedTask.taskId,
              startIndex: 0,
              endIndex: 10,
            });
            this.uploadLoading = false;
            this.component = 'success-popup';
            this.successMessage = 'File(s) successfully uploaded';
            setTimeout(() => {
              this.close();
            }, 3000);
            this.overlay = false;
            // console.log("file response", this.taskFiles);
          } catch (e) {
            this.overlay = false;
            console.log('Error adding group file', e);
            this.errorMessage = e.response.data;
            this.component = 'error-popup';
            setTimeout(() => {
              this.close();
            }, 3000);

            this.uploadLoading = false;
          }
        }
      }
      this.overlay = false;
      this.files = null;
    }
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar]
  },
  components: {
    NavigationDrawer,

    "task-comments": TaskComments
  },
  data: function() {
    return {
      insertImageSettings: {
        // saveUrl: "[SERVICE_HOSTED_PATH]/api/uploadbox/Save",
        // path: "../Files/"
      },
      // path: {
      //   saveUrl: "[SERVICE_HOSTED_PATH]/api/uploadbox/Save"
      // },
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
      }
    };
  }
};
</script>
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>
