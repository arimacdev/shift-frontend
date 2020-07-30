<template>
  <div class="fileScroll overflow-y-auto">
    <div class="buttonMenuDiv">
      <v-list-item>
        <v-list-item-action>
          <v-menu min-width="250px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn small rounded outlined color="#949494" v-bind="attrs" v-on="on">
                <v-icon size="20" dark>mdi-plus</v-icon>
                <v-list-item-title
                  style="color: #576377 !important"
                  class="text-capitalize fontRestructure14"
                >New</v-list-item-title>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click class="fileUploader">
                <v-file-input
                  v-model="files"
                  multiple
                  flat
                  solo
                  prepend-icon="mdi-file-upload-outline"
                  label="New file upload"
                  @change="projectFileUpload();"
                ></v-file-input>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
        <v-list-item-content></v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-list-item-action>
        <v-list-item-action>
          <v-icon>mdi-pencil-circle</v-icon>
        </v-list-item-action>
      </v-list-item>
    </div>
    <v-row style="margin-top: 30px">
      <v-col>
        <v-list-item-title>Files</v-list-item-title>
      </v-col>
    </v-row>

    <v-row style="margin-top: 10px">
      <v-col>
        <!-- ---------- file display cards --------- -->
        <v-card
          v-for="(projectFile, index) in selectedFolderFiles.files"
          :key="index"
          flat
          outlined
          class="fileDisplaySection"
          width="23%"
        >
          <div style="height: 150px;">
            <a
              style="text-decoration: none;"
              :href="projectFile.projectFileUrl"
              target="_blank"
              download="file"
            >
              <v-icon
                style="position: absolute; z-index: 100; right:5px; top: 5px"
                size="17"
                color="#9F9F9F"
              >mdi-open-in-new</v-icon>
            </a>
            <v-img
              v-if="checkFileType(projectFile.projectFileName.split('.').pop())"
              :src="projectFile.projectFileUrl"
              height="100%"
            ></v-img>
            <iframe v-else width="100%" :src="projectFile.projectFileUrl"></iframe>
          </div>

          <v-list-item z- style="height: 30px !important; ">
            <v-list-item-action style="margin-left: -10px">
              <v-icon
                v-if="checkFileType(projectFile.projectFileName.split('.').pop())"
                size="20"
                color="red"
              >mdi-image</v-icon>
              <v-icon v-else size="20" color="red">mdi-file-document</v-icon>
            </v-list-item-action>
            <v-list-item-content style="margin-left: -25px">
              <v-list-item-subtitle class="fontRestructure12">{{projectFile.projectFileName}}</v-list-item-subtitle>
              <v-list-item-subtitle class="fontRestructure10">
                {{ projectFile.firstName }}
                {{ projectFile.lastName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions style="height: 35px !important; margin-top: -10px">
            <v-list-item-subtitle class="fontRestructure10">
              {{
              getFileSize(projectFile.projectFileSize)
              }}
              kB
            </v-list-item-subtitle>
            <v-spacer></v-spacer>
            <v-list-item-subtitle
              class="fontRestructure10"
            >{{getUploadDate(projectFile.projectFileAddedOn)}}</v-list-item-subtitle>
            <v-btn icon>
              <div class="iconBackCircleFiles">
                <a
                  style="text-decoration: none;"
                  :href="projectFile.projectFileUrl"
                  target="_blank"
                  download="file"
                >
                  <v-icon size="20" color="#0BAFFF">mdi-download-outline</v-icon>
                </a>
              </div>
            </v-btn>
            <v-btn icon>
              <div class="iconBackCircleFiles">
                <v-icon
                  size="20"
                  @click="
                    taskDialog = true;
                    selectFile(projectFile.projectFileId);
                  "
                  color="#FF6161"
                >mdi-trash-can-outline</v-icon>
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- ------------- delete file dialog ------------ -->
    <v-dialog v-model="taskDialog" max-width="380">
      <v-card>
        <div class="popupConfirmHeadline">
          <v-icon class="deletePopupIcon" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
          <br />
          <span class="alertPopupTitle">Delete File</span>
          <br />
          <span class="alertPopupText">
            You're about to permanantly delete this file, If you're not sure,
            you can cancel this action.
          </span>
        </div>

        <div class="popupBottom">
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" width="100px" @click="taskDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
            <v-btn color="error" width="100px" @click="removeFiles()">Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- ---------- snackbar ---------- -->

    <div class="text-center">
      <!-- <v-btn dark color="red darken-2" @click="snackbar = true">Open Snackbar</v-btn> -->

      <v-snackbar width="100" right v-model="snackbar">
        File is uploading...
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </v-snackbar>
    </div>
    <div class="filePopupDiv">
      <div @click="close">
        <component
          v-bind:is="component"
          :successMessage="successMessage"
          :errorMessage="errorMessage"
        ></component>
      </div>
      <!-- <success-popup /> -->
    </div>
  </div>
</template>
<script>
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
import { mapState } from "vuex";
export default {
  props: ["selectedFolder"],
  components: {
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
  },
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      successMessage: "",
      userId: this.$store.state.user.userId,
      component: "",
      files: [],
      fileId: "",
      taskDialog: false,
    };
  },
  methods: {
    async projectFileUpload() {
      this.snackbar = true;
      for (let index = 0; index < this.files.length; ++index) {
        let formData = new FormData();
        formData.append("files", this.files[index]);
        formData.append("type", "projectFile");
        formData.append("folderId", this.selectedFolder.folderId);

        this.$axios
          .$post(`/projects/${this.projectId}/files/upload`, formData, {
            headers: {
              user: this.userId,
            },
          })
          .then((res) => {
            this.snackbar = false;
            // console.log("resp", res.data);
            this.component = "success-popup";
            this.successMessage = "File(s) successfully uploaded";
            setTimeout(() => {
              this.close();
            }, 3000);

            // const uploadedFile = res.data[0];
            // uploadedFile.firstName = this.userProfile.firstName;
            // uploadedFile.lastName = this.userProfile.lastName;
            // console.log("File upload successful", res.data);
            // this.$store.dispatch("project/addProjectFile", res.data);
            this.$store.dispatch("project/fetchAllSelectedFolderFiles", {
              projectId: this.$route.params.projects,
              folderId: this.selectedFolder.folderId,
            });
            // console.log("File upload successful", res);
          })
          .catch((err) => {
            console.log("File Upload Failed", err);
            this.errorMessage = err.response.data;
            this.component = "error-popup";
            setTimeout(() => {
              this.close();
            }, 3000);
            this.snackbar = false;
            console.log("File Upload Failed", err);
          });
      }
      this.files = null;
    },
    checkFileType(type) {
      switch (type) {
        case "png":
          return true;
          break;
        case "jpeg":
          return true;
          break;
        case "gif":
          return true;
          break;
        case "svg":
          return true;
          break;
        case "jpg":
          return true;
          break;
        default:
          return false;
      }
    },
    async removeFiles() {
      // console.log("projectFile " + this.fileId);
      this.taskDialog = false;
      let response;
      try {
        response = await this.$axios.$delete(
          `/projects/${this.projectId}/files/${this.fileId}`,
          {
            data: {},
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch("project/fetchAllSelectedFolderFiles", {
          projectId: this.$route.params.projects,
          folderId: this.selectedFolder.folderId,
        });
        this.component = "success-popup";
        this.successMessage = "File(s) successfully uploaded";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        this.snackbar = false;
        console.log("Error deleting task", e);
        this.taskDialog = false;
      }
    },
    getUploadDate(date) {
      if (date == "1970-01-01T05:30" || date == null) return "No Due Date";
      let stringDate = date + " ";
      stringDate = stringDate.toString();
      stringDate = stringDate.slice(0, 10);
      return stringDate;
    },
    getFileSize(fileSize) {
      let stringSize = parseInt(fileSize / 1000);
      return stringSize;
    },
    selectFile(projectFileId) {
      this.fileId = projectFileId;
      // console.log("file Id " + this.fileId);
    },
    close() {
      this.component = "";
    },
  },
  computed: {
    ...mapState({
      projectId: (state) => state.project.project.projectId,
      selectedFolderFiles: (state) => state.project.selectedFolderFiles,
    }),
  },
};
</script>