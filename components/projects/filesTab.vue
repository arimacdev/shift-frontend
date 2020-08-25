<template>
  <div class="fileTabContent overflow-y-auto">
    <file-search-bar :AllprojectFiles="AllprojectFiles" />
    <div class="filesList">
      <div class="fileScroll overflow-y-auto">
        <v-list-item
          class="filesListFile"
          v-for="(projectFile, index) in AllprojectFiles"
          :key="index"
        >
          <v-list-item-action>
            <v-icon size="35">mdi-file-document</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <a style="text-decoration: none;" :href="projectFile.projectFileUrl" target="_blank">
              <v-list-item-title>
                {{
                projectFile.projectFileName
                }}
              </v-list-item-title>
            </a>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-title class="fileSize">
              {{
              getFileSize(projectFile.projectFileSize)
              }}
              kB
            </v-list-item-title>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title class="fileName">
              {{ projectFile.firstName }}
              {{ projectFile.lastName }}
            </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-list-item-title class="fileDate">
              {{
              getUploadDate(projectFile.projectFileAddedOn)
              }}
            </v-list-item-title>
          </v-list-item-action>

          <v-list-item-action>
            <v-btn icon>
              <div class="iconBackCircleFiles">
                <a
                  style="text-decoration: none;"
                  :href="projectFile.projectFileUrl"
                  target="_blank"
                  download="file"
                >
                  <v-icon color="#0BAFFF">mdi-download-outline</v-icon>
                </a>
              </div>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon>
              <div class="iconBackCircleFiles">
                <v-icon
                  @click="
                    taskDialog = true;
                    selectFile(projectFile.projectFileId);
                  "
                  color="#FF6161"
                >mdi-trash-can-outline</v-icon>
              </div>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
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

            <v-btn
              color="success"
              class="text-capitalize"
              depressed
              width="100px"
              @click="taskDialog = false"
            >Cancel</v-btn>
            <v-spacer></v-spacer>
            <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
            <v-btn
              color="error"
              class="text-capitalize"
              depressed
              width="100px"
              @click="removeFiles()"
            >Delete</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <!-- ------------------ -->

    <div class="filesUploader">
      <v-file-input
        label="Browse files to attach"
        v-model="files"
        outlined
        prepend-inner-icon="mdi-cloud-upload-outline"
        prepend-icon
        class="createFormElements"
        chips
        show-size
        background-color="#EDF0F5"
        height="80"
        @change="setVisible()"
        multiple
      ></v-file-input>

      <div v-if="this.visible == true" class="projectFileUploadButton">
        <v-btn color="#0BAFFF" class="white--text" fab @click="projectFileUpload()">
          <v-icon dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </div>
      <div v-if="this.visible == false" class="projectFileUploadButton">
        <v-progress-circular v-if="this.uploadLoading == true" indeterminate color="primary"></v-progress-circular>
      </div>
    </div>
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
import { mapState } from "vuex";

export default {
  components: {
    "file-search-bar": FileSearchBar,
    "success-popup": SuccessPopup,
    "error-popup": ErrorPopup,
    "progress-loading": Progress,
  },
  data() {
    return {
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
