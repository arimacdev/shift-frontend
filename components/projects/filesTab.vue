<template>
    <div class="fileTabContent overflow-y-auto">
        
        <file-search-bar :AllprojectFiles=AllprojectFiles />
        <div class="filesList">
            <div class="fileScroll overflow-y-auto">
            <v-list-item class="filesListFile" v-for="(projectFile,index) in AllprojectFiles" :key="index" >
            
       <v-list-item-action >
          <v-icon size="35" >mdi-file-document</v-icon>
        </v-list-item-action>

        <v-list-item-content>
         <a style="text-decoration: none;" :href="projectFile.projectFileUrl"> <v-list-item-title >{{ projectFile.projectFileName }}</v-list-item-title></a>
        </v-list-item-content>

         <v-list-item-action>
          <v-list-item-title  class="fileSize">{{ getFileSize(projectFile.projectFileSize)}} kB</v-list-item-title>
        </v-list-item-action>

         <v-list-item-content>
          <v-list-item-title class="fileName">{{ projectFile.firstName }} {{ projectFile.lastName }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-title class="fileDate">{{getUploadDate(projectFile.projectFileAddedOn)}}</v-list-item-title>
        </v-list-item-action>

        <!-- <v-list-item-action>
          <v-btn icon>
            <div class="iconBackCircleFiles"> 
              <v-icon color="#0BAFFF">mdi-download-outline</v-icon>
              </div>
          </v-btn>
        </v-list-item-action> -->
        <v-list-item-action>
          <v-btn icon>
           <div class="iconBackCircleFiles">  
             <v-icon @click="removeFiles(projectFile.projectFileId)" color="#FF6161" >mdi-trash-can-outline</v-icon>
             </div>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

       
        </div>
       
        </div>

        
         <div class="filesUploader">
         
                  <v-file-input 
                    label="Browse files to attach"
                    v-model="files"
                    outlined
                    prepend-inner-icon="mdi-cloud-upload-outline"
                    prepend-icon=""
                    class="createFormElements"
                    chips
                    show-size=""
                    background-color="#EDF0F5"
                    height="80"
                    @change="setVisible()"
                    >   </v-file-input>

                <div v-if="this.visible == true" class="projectFileUploadButton">
                    <v-btn
                      color="#0BAFFF"
                      class=" white--text "
                      fab
                      @click="projectFileUpload()"
                    >
                      <v-icon dark>mdi-cloud-upload</v-icon>
                    </v-btn>
                </div>
                 <div v-if="this.visible == false" class="projectFileUploadButton">
                    <v-progress-circular
                      v-if="this.uploadLoading == true "
                        indeterminate
                        color="primary"
                      ></v-progress-circular>
                </div>
        </div>
<div class="popupDivContent">
          <div @click="close">
            <component v-bind:is="component" :errorMessage=errorMessage></component>
         </div>
        <!-- <success-popup /> -->
</div>
    </div>
</template>

<script>
import FileSearchBar from '~/components/tools/fileSearchBar'
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'
import { mapState } from 'vuex';

export default {
   props: ['projectId'],
    components: {
        'file-search-bar' : FileSearchBar,
        'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },
    data () {
      return{
        errorMessage: '',
        visible: false,
      uploadLoading:false,
      files: [],
      userId: this.$store.state.user.userId,
       component: ''
      }
    },
        computed: {
      ...mapState({
          AllprojectFiles:state => state.project.projectFiles,
      })
    },
   
    methods: {
       close(){
          this.component = ''
      },
      setVisible(){
        this.visible = true
      },
      async projectFileUpload(){
          this.uploadLoading = true
          this.visible = false
        let formData = new FormData();
        formData.append('files', this.files);
        formData.append('type', 'projectFile');
        this.files = null

        this.$axios.$post(`/projects/${this.projectId}/files/upload`,
            formData,
            {
              headers: {
                  'user': this.userId
              }
            }
          ).then((res) => {
            console.log("resp", res.data);
            this.uploadLoading = false
            this.visible = false
            this.component = 'success-popup'
            this.$store.dispatch('project/addProjectFile', res.data);
            console.log('File upload successful', res);
          })
          .catch((err) => {
            this.uploadLoading = false
            this.visible = false
             this.component = 'error-popup'
        //  this.errorMessage = err.response.data
            console.log('File Upload Failed', err);
          });
      },
      async removeFiles(projectFile){

        let response;
       try{
        response = await this.$axios.$delete(`/projects/${this.projectId}/files/${projectFile}`, {    
                data: {},
                headers: {
                    'user': this.userId,
                }
        })
        this.$store.dispatch('project/removeProjectFile', projectFile);
        console.log(response.data);
       }  catch(e){
          console.log("Error deleting task", e);
       }  

      },
       getUploadDate(date){
        if(date ==  '1970-01-01T05:30' || date == null)
        return "No Due Date"
        let stringDate  = date + " ";
        stringDate = stringDate.toString();
        stringDate = stringDate.slice(0,10) ;           
        return stringDate;
      },
      getFileSize(fileSize){
        let stringSize = parseInt(fileSize/1000);
        return stringSize
      }
    },


    
    
}
</script>