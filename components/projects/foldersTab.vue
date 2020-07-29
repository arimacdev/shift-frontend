<template>
  <div class="fileTabContent overflow-y-auto">
    <!-- <file-search-bar :AllprojectFiles="AllprojectFiles" /> -->
    <div class="filesList">
      <div class="fileScroll overflow-y-auto">
        <div v-if="folderView">
          <v-menu min-width="200px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn small rounded outlined color="#949494" v-bind="attrs" v-on="on">
                <v-icon dark>mdi-plus</v-icon>
                <v-list-item-title
                  style="color: #576377 !important"
                  class="text-capitalize fontRestructure14"
                >New</v-list-item-title>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-folder-plus-outline</v-icon>
                </v-list-item-action>
                <v-list-item-title style="color: #576377 !important">Add New Folder</v-list-item-title>
              </v-list-item>
              <v-divider class="mx-4"></v-divider>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-file-plus-outline</v-icon>
                </v-list-item-action>
                <v-list-item-title style="color: #576377 !important">New File Upload</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-row style="margin-top: 30px">
            <v-col>
              <v-list-item-title>Folders</v-list-item-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item @click="folderView = false" class="FolderDiv">
                <v-list-item-action>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="fontRestructure14"
                    style="color: #576377 !important"
                  >New File Upload New File Upload New File Upload New File Upload</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="FolderDiv">
                <v-list-item-action>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="fontRestructure14"
                    style="color: #576377 !important"
                  >New File Upload New File Upload New File Upload New File Upload</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row style="margin-top: 30px">
            <v-col>
              <v-list-item-title>Files</v-list-item-title>
            </v-col>
          </v-row>
        </div>
        <!-- ------- end folder section ------- -->
        <div v-else>
          <v-btn
            text
            color="primary"
            class="text-capitalize"
            @click="folderView = true"
          >Project Files</v-btn>
          <v-icon>mdi-chevron-right</v-icon>
          <v-btn
            disabled
            text
            color="primary"
            class="text-capitalize"
            @click="folderView = true"
          >Folder</v-btn>

          <view-files />
        </div>
      </div>
    </div>

    <!-- ------------- dialog ------------ -->
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

    <!-- ------------------ -->

    <div class="popupDivContent">
      <div @click="close">
        <component
          v-bind:is="component"
          :successMessage="successMessage"
          :errorMessage="errorMessage"
        ></component>
      </div>
      <!-- <success-popup /> -->
    </div>
    <v-overlay :value="overlay" color="black">
      <progress-loading />
    </v-overlay>
  </div>
</template>

<script>
import FileSearchBar from "~/components/tools/fileSearchBar";
import SuccessPopup from "~/components/popups/successPopup";
import ErrorPopup from "~/components/popups/errorPopup";
import Progress from "~/components/popups/progress";
import ViewFiles from "~/components/projects/viewFiles";
import { mapState } from "vuex";

export default {
  components: {
    "file-search-bar": FileSearchBar,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
    "view-files": ViewFiles,
  },
  data() {
    return {
      folderView: true,

      errorMessage: "",
      successMessage: "",
      overlay: false,
      fileId: "",
      taskDialog: false,
      errorMessage: "",
      visible: false,
      uploadLoading: false,
      files: [],
      userId: this.$store.state.user.userId,
      component: "",
    };
  },
  computed: {
    ...mapState({
      AllprojectFiles: (state) => state.project.projectFiles,
      userProfile: (state) => state.userProfile.userProfile,
      projectId: (state) => state.project.project.projectId,
    }),
  },

  methods: {
    close() {
      this.component = "";
    },
    selectFile(projectFileId) {
      this.fileId = projectFileId;
      // console.log("file Id " + this.fileId);
    },
    downloadFile(projectFileUrl) {
      axios({
        url: projectFileUrl,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.pdf");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    close() {
      this.component = "";
    },
    setVisible() {
      this.visible = true;
    },
    async projectFileUpload() {
      this.overlay = true;
      this.uploadLoading = true;
      this.visible = false;
      for (let index = 0; index < this.files.length; ++index) {
        let formData = new FormData();
        formData.append("files", this.files[index]);
        formData.append("type", "projectFile");

        this.$axios
          .$post(`/projects/${this.projectId}/files/upload`, formData, {
            headers: {
              user: this.userId,
            },
          })
          .then((res) => {
            // console.log("resp", res.data);
            this.uploadLoading = false;
            this.visible = false;
            this.overlay = false;
            this.component = "success-popup";
            this.successMessage = "File(s) successfully uploaded";
            setTimeout(() => {
              this.close();
            }, 3000);
            const uploadedFile = res.data[0];
            uploadedFile.firstName = this.userProfile.firstName;
            uploadedFile.lastName = this.userProfile.lastName;
            console.log("File upload successful", res.data);
            this.$store.dispatch("project/addProjectFile", res.data);
            // console.log("File upload successful", res);
          })
          .catch((err) => {
            this.overlay = false;
            this.uploadLoading = false;
            this.visible = false;
            this.errorMessage = err.response.data;
            this.component = "error-popup";
            setTimeout(() => {
              this.close();
            }, 3000);
            //  this.errorMessage = err.response.data
            console.log("File Upload Failed", err);
          });
      }
      this.files = null;
      this.overlay = false;
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
        this.$store.dispatch("project/removeProjectFile", this.fileId);
        console.log(response.data);
      } catch (e) {
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
  },
};
</script>
