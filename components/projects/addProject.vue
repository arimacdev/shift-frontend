<template>
    <div class="formDiv createProjectPage overflow-y-auto">
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
        <!-- <input maxlength="50" @input="$v.projectName.$touch()" v-model="projectName" placeholder="Project name" class="formElements">
       <div v-if="$v.projectName.$error && !$v.projectName.required" class="errorText"> Project name is required</div>
       <div v-if="$v.projectName.$error && !$v.projectName.maxLength" class="errorText"> Cannot use more than 50 characters</div>
            -->
            <v-text-field
            label="Project name*"
            outlined
            class="createFormElements"
            v-model.trim="$v.projectName.$model"
          ></v-text-field>
 <div v-if="$v.projectName.$error && !$v.projectName.required" class="errorText"> Project name is required</div>
       <div v-if="$v.projectName.$error && !$v.projectName.maxLength" class="errorText"> Cannot use more than 50 characters</div>
           

            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <!-- <input maxlength="49" v-model="client" placeholder="Client" class="formElements"> -->
            <!-- <div v-if="$v.client.$error && !$v.client.required" class="errorText"> Client is required</div> -->
            
            <v-text-field
            label="Client*"
            outlined
            class="createFormElements"
            v-model.trim="$v.client.$model"
          ></v-text-field>
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
        <!-- <input type="text" v-model.trim="$v.startDate.$model" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Project start date" class="formElements">
            <div v-if="$v.startDate.$error && !$v.startDate.required" class="errorText"> Start date is required</div> -->
           <div class="pickerContainer pickerDiv">
               
            <VueCtkDateTimePicker
             color="#3f51b5" 
             id="start"
             class="dateTimePickerInternal" 
             v-model="$v.startDate.$model" 
             label="Project start date and time"
             input-size="lg"
             />
            <div v-if="$v.startDate.$error && !$v.startDate.dateCheck" class="errorText errorDiv"> Start date cannot be past date</div>
          
           </div>
           
            </v-col>
             <v-col
                sm="6"
                md="6"
                class=""
            >
            <!-- <input type="text" v-model.trim="$v.endDate.$model" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Project end date" class="formElements">
             <div v-if="$v.endDate.$error && !$v.endDate.required" class="errorText"> End date is required</div> -->
           <div class="pickerContainer pickerDiv">
            <VueCtkDateTimePicker 
            color="#3f51b5" 
            id="end"
            class="dateTimePickerInternal" 
            v-model="$v.endDate.$model" 
            label="Project end date and time"
            input-size="lg"
            />
            
            <div v-if="$v.endDate.$error && !$v.endDate.dateCheck" class="errorText errorDiv"> End date should be after start date</div>
          
           </div>
          
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
        <!-- <input v-model="projectTimeLine" disabled placeholder="Estimated project timeline" class="formElements"> -->
            <v-text-field
            label="Estimated project timeline"
            outlined
            class="createFormElements"
            disabled=""
            v-model.trim="projectTimeLine"
          ></v-text-field>
          
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

      
                <button  :class="addProjectStyling" :disabled="checkValidation" @click.once="postData()" >
                <v-list-item  
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
            <component v-bind:is="component" :errorMessage=errorMessage ></component>
         </div>
        <!-- <success-popup /> -->
    </div>
</template>

<script>
import axios from 'axios'
import { numeric, required, between, minLength, maxLength } from 'vuelidate/lib/validators'
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';





export default {

    components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },
    
    methods: {
        
    getStartDate(){       
        const startDate = new Date(this.startDate);
        const isoDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString();
        console.log("iso Start date",isoDate)
        return isoDate;
    },
    getEndDate(){       
    const endDate = new Date(this.endDate);
    const isoDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString();
    console.log("iso end date",isoDate)
    return isoDate;
    },
     async postData(){

      let response;
       try{
        response = await this.$axios.$post('/projects', {
          projectOwner: this.userId,
          projectName: this.projectName,
          clientId: this.client,
          projectStartDate: this.getStartDate(),
          projectEndDate: this.getEndDate(),
        })

        this.projectName = '',
        this.clientId = '',
        this.client = '',
        this.$v.$reset()

        console.log("project added successfully", response);
        this.component = 'success-popup'
        window.setTimeout(location.reload(), 8000)
       }  catch(e){
         this.errorMessage = e.response.data
          this.component = 'error-popup'
          console.log("Error creating project", e);
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
            errorMessage: '',
            userId: this.$store.state.user.userId,
            projectName: '',
            client: '',
            // startDate: new Date().toISOString().split('.')[0],
            startDate: new Date(),
            endDate: new Date(),
            // endDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0],
            projectOwner: '',
            component: ''
        }
        },
        validations: {
            projectName: {
            required,
            maxLength: maxLength(49)
            },
            client: {
            required,
            },
            startDate: {
            required,
           dateCheck(){
                const dueDate = new Date(this.startDate);
                if(this.startDate == null){
                    return true;
                } else{
                    const dueToUtc = new Date(dueDate.toLocaleString("en-US", {timeZone: "UTC"}));
                    const dueToUtcDate = new Date(dueToUtc);
                    const now = new Date();
                    console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime()+350000000);
                    if(now.getTime() >= dueToUtcDate.getTime()+35000000){
                        console.log("overdue")
                        return false;
                    } else {
                        return true;
                    }
                }
                
      },
            },
            endDate: {
            required,
            dateCheck(){
                const endDate = new Date(this.endDate);
                if(this.endDate == null){
                    return true;
                } else{
                    const endToUtc = new Date(endDate.toLocaleString("en-US", {timeZone: "UTC"}));
                    const endToUtcDate = new Date(endToUtc);
                    const startDate = new Date(this.startDate);
                    console.log("start", startDate.getTime(), "end", endToUtcDate.getTime()+35000000);
                    if(startDate.getTime() >= endToUtcDate.getTime()+35000000){
                        console.log("overdue")
                        return false;
                    } else {
                        return true;
                    }
                }
                
      },
            },
        },
        computed: {
            
            checkValidation: {
            get(){
              if(this.$v.$invalid == true){
                return true
              } else{
                return false
              }
           },
          set(value) {
            this.projectName = value;
          }            
        },
        addProjectStyling: {
            get(){
              if(this.$v.$invalid == true){
                return 'addProjectButtonFail'
              } else{
                return 'addProjectButtonSuccess'
              }
           }            
        } ,
            setDates: {
                get(){
                    let date = new Date(this.startDate);
                    return date;
                },
                set(value){
                    this.startDate = new Date(this.startDate)
                }
            },
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
