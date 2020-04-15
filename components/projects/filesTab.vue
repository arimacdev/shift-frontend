<template>
    <div class="fileTabContent overflow-y-auto">
        
        <file-search-bar />
        <div class="filesList">
            <div class="fileScroll overflow-y-auto">
            <v-list-item class="filesListFile">
       <v-list-item-action>
          <v-icon size="35" >mdi-file-document</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title >Project spec.PDF</v-list-item-title>
        </v-list-item-content>

         <v-list-item-content>
          <v-list-item-title >335Kb</v-list-item-title>
        </v-list-item-content>

         <v-list-item-content>
          <v-list-item-title >Naveen Perera</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title >03-02-2020</v-list-item-title>
        </v-list-item-content>


        <v-list-item-action>
          <v-btn icon>
            <div class="iconBackCircleFiles"> <v-icon color="#0BAFFF">mdi-download-outline</v-icon></div>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon>
           <div class="iconBackCircleFiles">  <v-icon color="#FF6161" >mdi-trash-can-outline</v-icon></div>
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
            multiple=""
            background-color="#EDF0F5"
            height="80"
            >   </v-file-input>
        </div>
    </div>
</template>

<script>
import FileSearchBar from '~/components/tools/fileSearchBar'
export default {
    components: {
        'file-search-bar' : FileSearchBar
    }
    
}
</script>