<template>
  <div class="fileTabContent overflow-y-auto">
    <!-- <file-search-bar :AllprojectFiles="AllprojectFiles" /> -->
    <div class="filesList">
      <div class="fileScroll overflow-y-auto">
        <div v-if="folderView">
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
              <v-list-item @click="newFolderDialog = true">
                <v-list-item-action>
                  <v-icon>mdi-folder-plus-outline</v-icon>
                </v-list-item-action>
                <v-list-item-title style="color: #576377 !important">Add New Folder</v-list-item-title>
              </v-list-item>
              <v-divider class="mx-4"></v-divider>
              <v-list-item @click class="fileUploader">
                <!-- <v-list-item-action>
                  <v-icon>mdi-file-upload-outline</v-icon>
                </v-list-item-action>
                <v-list-item-title style="color: #576377 !important">New File Upload</v-list-item-title>-->
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

          <v-row style="margin-top: 30px">
            <v-col>
              <v-list-item-title>Folders</v-list-item-title>
            </v-col>
          </v-row>
          <v-row v-if="AllprojectFolders.folders == ''" style="margin-top: 10px">
            <v-col>
              <v-list-item-subtitle>No folders to show</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item
                v-for="(projectFolder, index) in AllprojectFolders.folders"
                :key="index"
                @click="folderView = false; selectFolder(projectFolder)"
                class="FolderDiv"
              >
                <v-list-item-action>
                  <v-icon>mdi-folder</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title
                    class="fontRestructure14"
                    style="color: #576377 !important"
                  >{{projectFolder.folderName}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row style="margin-top: 20px">
            <v-col>
              <v-list-item-title>Files</v-list-item-title>
            </v-col>
          </v-row>
          <v-row v-if="AllprojectFolders.file == ''" style="margin-top: 10px">
            <v-col>
              <v-list-item-subtitle>No files to show</v-list-item-subtitle>
            </v-col>
          </v-row>
          <v-row style="margin-top: 10px">
            <v-col>
              <!-- ---------- file display cards --------- -->
              <v-card
                v-for="(projectFile, index) in AllprojectFolders.files"
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
                    <v-btn style="position: absolute; z-index: 100; right:5px; top: 5px" icon>
                      <v-icon size="17" color="#9F9F9F">mdi-open-in-new</v-icon>
                    </v-btn>
                  </a>
                  <v-img
                    v-if="checkFileType(projectFile.projectFileName.split('.').pop())"
                    :src="projectFile.projectFileUrl"
                    height="100%"
                  ></v-img>
                  <iframe
                    class="iframeSection"
                    v-else
                    width="100%"
                    :src="projectFile.projectFileUrl"
                  ></iframe>
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
                      <!-- add uploader name here -->
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
                    <!-- <div class="iconBackCircleFiles">
                      <v-icon
                        size="20"
                        @click="
                    taskDialog = true;
                    selectFile(projectFile.projectFileId);
                  "
                        color="#FF6161"
                      >mdi-trash-can-outline</v-icon>
                    </div>-->
                    <v-menu z-index="200" min-width="250px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn small icon color="#949494" v-bind="attrs" v-on="on">
                          <v-icon size="20" dark>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          @click="
                    taskDialog = true;
                    selectFile(projectFile.projectFileId);
                  "
                        >
                          <v-list-item-action>
                            <v-icon size="20">mdi-trash-can-outline</v-icon>
                          </v-list-item-action>
                          <v-list-item-title style="color: #576377 !important">Delete file</v-list-item-title>
                        </v-list-item>
                        <v-divider class="mx-4"></v-divider>
                        <v-list-item
                          @click="
                    fileMoveDialog = true;
                    selectFile(projectFile.projectFileId);
                  "
                        >
                          <v-list-item-action>
                            <v-icon size="20">mdi-file-move</v-icon>
                          </v-list-item-action>
                          <v-list-item-title style="color: #576377 !important">Move file</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>
        <!-- ------- end folder section ------- -->
        <div v-else>
          <v-btn
            text
            color="primary"
            class="text-capitalize"
            @click="folderView = true; selectedFolder =''"
          >Project Files</v-btn>
          <v-icon>mdi-chevron-right</v-icon>
          <v-btn
            disabled
            text
            color="primary"
            class="text-capitalize"
            @click="folderView = true"
          >{{selectedFolder.folderName}}</v-btn>

          <view-files :selectedFolder="selectedFolder" @removeComponent="removeComponent" />
        </div>
      </div>
    </div>

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
    <!-- ------------- New Folder Dialog ------------ -->
    <v-dialog v-model="newFolderDialog" max-width="380">
      <v-card>
        <v-form v-model="isValid" ref="form">
          <div style="padding-top: 30px" class="popupConfirmHeadline">
            <v-list-item-title>New Folder</v-list-item-title>
            <br />
            <v-text-field
              autofocus
              v-model="folderName"
              :rules="folderNameRules"
              label="Folder Name"
              dense
              outlined
            ></v-text-field>
          </div>

          <div style="padding-bottom: 20px">
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-spacer></v-spacer>
              <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
              <v-btn
                class="text-capitalize"
                @click="newFolderDialog = false"
                small
                text
                color="error"
                width="100px"
              >Cancel</v-btn>

              <v-btn
                :disabled="!isValid"
                class="text-capitalize"
                depressed
                small
                color="primary"
                width="100px"
                @click="newFolderDialog = false; createFolder()"
              >Create</v-btn>
            </v-card-actions>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- ------------- Move file Dialog ------------ -->
    <v-dialog v-model="fileMoveDialog" max-width="380">
      <v-card>
        <v-form v-model="isValid" ref="form">
          <div style="padding-top: 30px" class="popupConfirmHeadline">
            <v-list-item-title>File move to</v-list-item-title>
            <br />
            <div class="moveToFoldersList overflow-y-auto">
              <v-list-item-group>
                <!-- <v-list-item @click="moveFolder(null)">
                  <v-list-item-action>
                    <v-icon>mdi-folder</v-icon>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-list-item-subtitle
                      class="fontRestructure14"
                      style="color: #576377 !important"
                    >Main Folder</v-list-item-subtitle>
                  </v-list-item-action>
                </v-list-item>-->
                <div v-for="(projectFolder, index) in AllprojectFolders.folders" :key="index">
                  <v-list-item
                    v-if="projectFolder.folderType == 'PROJECT'"
                    @click="moveFolder(projectFolder.folderId)"
                  >
                    <v-list-item-action>
                      <v-icon>mdi-folder</v-icon>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-list-item-subtitle
                        class="fontRestructure14"
                        style="color: #576377 !important"
                      >{{projectFolder.folderName}}</v-list-item-subtitle>
                    </v-list-item-action>
                  </v-list-item>
                </div>
              </v-list-item-group>
            </div>
          </div>

          <div style="padding-bottom: 20px">
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-spacer></v-spacer>
              <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
              <v-btn
                class="text-capitalize"
                @click="fileMoveDialog = false"
                small
                text
                color="error"
                width="100px"
              >Cancel</v-btn>

              <v-btn
                :disabled="!isValid"
                class="text-capitalize"
                depressed
                small
                color="primary"
                width="100px"
                @click="fileMoveDialog = false; moveFile()"
              >Move</v-btn>
            </v-card-actions>
          </div>
        </v-form>
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

    <!-- ------------------ -->

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
      newFolderDialog: false,
      folderNameRules: [(value) => !!value || "Folder name is required!"],
      isValid: true,
      folderName: "",
      snackbar: false,
      files: [],
      selectedFolder: "",
      fileMoveDialog: false,
      folderMove: "",

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
      AllprojectFolders: (state) => state.project.projectFolders,
      userProfile: (state) => state.userProfile.userProfile,
      projectId: (state) => state.project.project.projectId,
    }),
  },

  methods: {
    moveFolder(folderId) {
      this.folderMove = folderId;
    },
    removeComponent() {
      this.folderView = true;
    },
    selectFolder(projectFolder) {
      this.selectedFolder = projectFolder;
      this.$store.dispatch("project/fetchAllSelectedFolderFiles", {
        projectId: this.$route.params.projects,
        folderId: projectFolder.folderId,
      });
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
    async projectFileUpload() {
      this.snackbar = true;
      for (let index = 0; index < this.files.length; ++index) {
        let formData = new FormData();
        formData.append("files", this.files[index]);
        formData.append("type", "projectFile");
        formData.append("folderId", "default");

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

            const uploadedFile = res.data[0];
            uploadedFile.firstName = this.userProfile.firstName;
            uploadedFile.lastName = this.userProfile.lastName;
            console.log("File upload successful", res.data);
            this.$store.dispatch("project/addProjectFile", res.data);
            this.$store.dispatch(
              "project/fetchAllProjectFolders",
              this.$route.params.projects
            );
            // console.log("File upload successful", res);
          })
          .catch((err) => {
            this.errorMessage = err.response.data;
            this.component = "error-popup";
            setTimeout(() => {
              this.close();
            }, 3000);
            this.snackbar = false;
            //  this.errorMessage = err.response.data
            console.log("File Upload Failed", err);
          });
      }
      this.files = null;
    },
    async moveFile() {
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/folder/copy`,
          {
            fileId: this.fileId,
            previousParentFolder: null,
            newParentFolder: this.folderMove,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch(
          "project/fetchAllProjectFolders",
          this.$route.params.projects
        );
        this.component = "success-popup";
        this.successMessage = "File successfully moved";
        setTimeout(() => {
          this.close();
        }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        (this.folderName = ""), console.log("Error updating a status", e);
      }
      this.$refs.form.reset();
    },
    async createFolder() {
      let response;
      try {
        response = await this.$axios.$post(
          `/projects/${this.projectId}/folder`,
          {
            folderName: this.folderName,
          },
          {
            headers: {
              user: this.userId,
            },
          }
        );
        this.$store.dispatch(
          "project/fetchAllProjectFolders",
          this.$route.params.projects
        );
        this.component = "success-popup";
        this.successMessage = "Folder successfully created";
        (this.folderName = ""),
          setTimeout(() => {
            this.close();
          }, 3000);
      } catch (e) {
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
        (this.folderName = ""), console.log("Error updating a status", e);
      }
      this.$refs.form.reset();
    },
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
        this.component = "success-popup";
        this.successMessage = "File successfully deleted";
        (this.folderName = ""),
          setTimeout(() => {
            this.close();
          }, 3000);
        this.$store.dispatch(
          "project/fetchAllProjectFolders",
          this.$route.params.projects
        );
      } catch (e) {
        console.log("Error deleting task", e);
        this.taskDialog = false;
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout(() => {
          this.close();
        }, 3000);
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
