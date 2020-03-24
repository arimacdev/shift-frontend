<template>
    <div class="formDiv">
        <form @submit.prevent="handleSubmit">
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
        <input v-model.trim="$v.projectName.$model" placeholder="Project name" class="formElements">
       <div v-if="$v.projectName.$error && !$v.projectName.required" class="errorText"> Project name is required</div>
       <div v-if="$v.projectName.$error && !$v.projectName.maxLength" class="errorText"> Cannot use more than 50 characters</div>
           
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model.trim="$v.client.$model" placeholder="Client" class="formElements">
            <div v-if="$v.client.$error && !$v.client.required" class="errorText"> Client is required</div>
            </v-col>
        </v-row>

        
        <v-row
            class="mb-12 formRow"
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                class=""
                
            >
        <input type="text" v-model.trim="$v.startDate.$model" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Project start date" class="formElements">
            <div v-if="$v.startDate.$error && !$v.startDate.required" class="errorText"> Start date is required</div>
           <!-- <div class="pickerContainer pickerDiv">
            <v-datetime-picker v-model.trim="$v.startDate.$model" class="dateTimePicker" label="Project start date & time">
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
            <div v-if="$v.startDate.$error && !$v.startDate.required" class="errorText errorDiv"> End date is required</div>
          
           </div> -->
           
            </v-col>
             <v-col
                sm="6"
                md="6"
                class=""
            >
            <input type="text" v-model.trim="$v.endDate.$model" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Project end date" class="formElements">
             <div v-if="$v.endDate.$error && !$v.endDate.required" class="errorText"> End date is required</div>
           <!-- <div class="pickerContainer pickerDiv">
          <v-datetime-picker v-model.trim="$v.endDate.$model" class="dateTimePicker" label="Project end date & time">
                  <template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template>
                </v-datetime-picker>
            <div v-if="$v.endDate.$error && !$v.endDate.required" class="errorText errorDiv"> End date is required</div>
          
           </div> -->
          
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
        <input v-model="projectTimeLine" disabled placeholder="Estimated project timeline" class="formElements">
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

      
                <button class="submitButton">
                <v-list-item  @click="postData()" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-folder-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Add new project</v-list-item-title>
                    </v-list-item-content>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-list-item>
                </button>
            </v-col>
        </v-row>

        </form>
         <div @click="close">
            <component v-bind:is="component" ></component>
         </div>
        <!-- <success-popup /> -->
    </div>
</template>

<script>
import axios from 'axios'
import { numeric, required, between, minLength, maxLength } from 'vuelidate/lib/validators'
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'

// import Vue from 'vue'
// import DatetimePicker from 'vuetify-datetime-picker'
// (Optional) import 'vuetify-datetime-picker/src/stylus/main.styl'

// Vue.use(DatetimePicker)
// import '@fortawesome/fontawesome-free/css/all.css'




export default {

    components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },
    
    methods: {
     async postData(){


        console.log("date test -------> " + this.endDate)
      let response;
       try{
        response = await this.$axios.$post('/projects', {
          projectOwner: this.userId,
          projectName: this.projectName,
          clientId: this.client,
          projectStartDate: this.startDate,
          projectEndDate: this.endDate,
        })

        this.component = 'success-popup'
        window.setTimeout(location.reload(), 8000)
       }  catch(e){
          console.log("Error creating project", e);
          this.component = 'error-popup'
       }   
      },
      close(){
          this.component = ''
      },

      handleSubmit(e) {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      }
    },
    data() {
        return {
            userId: this.$store.state.user.userId,
            projectName: '',
            client: '',
            // startDate: new Date().toISOString().split('.')[0],
            startDate: new Date,
             endDate: '',
            // endDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            projectOwner: '',
            component: ''
        }
        },
        validations: {
            projectName: {
            required,
            maxLength: maxLength(50)
            },
            client: {
            required,
            },
            startDate: {
            required,
            },
            endDate: {
            required,
            },
        },
        computed: {
            projectTimeLine : {
               get(){
            if(this.startDate === '' || this.endDate === ''){
                return ""
            }
            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            let days = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10); 
            let months;
            let weeks;
           if(days > 30){
             months = Math.floor(days/30)
             days = days % 30;
             return months + " month(s) " + days + " days"
           } else if(days>7 && days<30){
              weeks = Math.floor(days / 7);
              days = days % 7
              return weeks + " week(s) " + days + " days"
           } else{
             return days + " day(s)"
           }
            },
               set(){

               }
            }
        },
}
</script>
