<template>
    <div class="formDiv">
        <form>
        <v-row
            class="mb-12 formRow"
            no-gutters
            >
            <v-col
            sm="12"
            md="12"
            class="textGrid "
      >
        <p class="addProjectTitle"> You're about to start a new project </p>
            </v-col>
        </v-row>
        <v-row
            class="mb-12 formRow" 
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input v-model="projectName" placeholder="Project name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="client" placeholder="Client" class="formElements">
            </v-col>
        </v-row>

        
        <v-row
            class="mb-12 formRow"
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input type="text" v-model="startDate" onfocusin="(this.type='date')" onfocusout="(this.type='text')" placeholder="Project start date" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="text" onfocusin="(this.type='date')" onfocusout="(this.type='text')" v-model="endDate" placeholder="Project end date" class="formElements">
            </v-col>
        </v-row>


        <v-row
            class="mb-12 formRow"
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input v-model="timeline" placeholder="Estimated project timeline" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            
            </v-col>
        </v-row>
        <v-row
            class="mb-12 formRow"
            no-gutters
            >
            <v-col
            sm="12"
            md="6"
            class=""
      ></v-col>
            <v-col
            sm="12"
            md="6"
            class="buttonGrid"
      >
                <div class="submitButton">
                <v-list-item @click="postData()" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-folder-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Add new project</v-list-item-title>
                    </v-list-item-content>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-list-item>
                </div>
            </v-col>
        </v-row>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
     async postData(){
      let response;
       try{
        response = await this.$axios.$post('/projects', {
          projectOwner: '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff',
          projectName: this.projectName,
          clientId: this.client,
          projectStartDate: this.startDate,
          projectEndDate: this.endDate,
        })
       }  catch(e){
          console.log("Error creating project", e);
       }   
        console.log(response.message);
        this.projectName = ''
        this.client = ''
        this.startDate = ''
        this.endDate = ''
      }
    }
}
</script>