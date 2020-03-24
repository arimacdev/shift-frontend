<template>
    <div class="taskFormDiv">
        <form @submit.prevent="handleSubmit"> 
        
        <v-row
            class="mb-12 formRow" 
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <!-- <input v-model="taskName" placeholder="Task name" class="formElements"> -->
          <input v-model.trim="$v.taskName.$model" placeholder="Task name" class="formElements">
       <div v-if="$v.taskName.$error && !$v.taskName.required" class="errorText"> Task name is required</div>
       <div v-if="$v.taskName.$error && !$v.taskName.maxLength" class="errorText"> Cannot use more than 50 characters</div>
      


            </v-col>
             <v-col
                sm="6"
                md="6"                
            >
            <select v-model="addTaskAssignee" class="formElements" >
              <option disabled value="" >Assignee</option>
              <option v-for="(projectUser, index) in projectUsers" :key="index" :value="projectUser.userId">
                {{projectUser.firstName}} {{projectUser.lastName}}
              </option>
            </select>
            
            </v-col>
        </v-row>        
        <v-row class="mb-12 formRow" no-gutters >
                <v-col
                sm="6"
                md="6"
                
            >
            <select v-model="taskStatus" class="formElements">
              <option disabled value="pending" >Task status</option>
                <option key="pending" value="pending" >Pending</option>
                <option key="implementing" value="implementing">Implementing</option>
                <option key="qa" value="qa">QA</option>
                <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                <option key="reOpened" value="reOpened">Re-Opened</option>
                <option key="deployed" value="deployed">Deployed</option>
                <option key="closed" value="closed">Closed</option>
            </select>
            
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input  v-model="taskDueDate" placeholder="Due date" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" type="text" class="formElements">
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
        <input v-model="taskRemindOnDate"  type="text" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Reminder" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Drop files to attach, or browse" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload"/>
            </v-col>
        </v-row>
        <v-row
            class="mb-12 formRow"
            no-gutters
            >
            <v-col
            sm="12"
            md="12"
            class=""
      >
       <textarea v-model="taskNotes" placeholder="Note" class="formElements textArea"></textarea>
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
                <button :class="addTaskStyling" @click="addTask" :disabled="checkValidation" >
                <v-list-item 
                dark >
                    
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew" >Submit</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </button>
            </v-col>
        </v-row>
        </form>
         <keep-alive>
            <component v-bind:is="component"></component>
            </keep-alive>
        <!-- <success-popup /> -->
    </div>
    
</template>

<script>

import { required, maxLength } from 'vuelidate/lib/validators'
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'
 
import axios from 'axios'
  export default {
      props: ['projectId', 'projectUsers'],
       components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },
    
    
    data() {
      return {
         userId: this.$store.state.user.userId,
         file: '',
         task: {
            taskName: '',
            taskAssignee: '',
            taskStatus: '',
            taskDueDate:'',
            taskRemindOnDate:'',
            taskNotes: '',
      },
         component: '',
          taskAssignee: '',
          taskStatus: 'pending',
          taskName: '',
          data: ''
      }
    },
    validations: {
            taskName: {
            required,
            maxLength: maxLength(50)
            },
        },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      handleFileUploads(e){
         this.file = this.$refs.files.files[0];
      },

      handleSubmit(e) {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      },
     async addTask(){     
       let response;
       try{
            response = await this.$axios.$post(`/projects/${this.projectId}/tasks`, {
          taskName: this.taskName,
          projectId: this.projectId,
          taskInitiator: this.userId,
          taskAssignee: this.taskAssignee,
          taskDueDate: this.taskDueDate,
          taskRemindOnDate: this.taskRemindOnDate,
          taskStatus: this.taskStatus,
          taskNotes: this.taskNotes
        })
         this.component = 'success-popup'
        window.setTimeout(location.reload(), 8000)
        console.log("Task adding successful", response);

         let taskId= response.data.taskId;

        let formData = new FormData();
        formData.append('files', this.file);
        formData.append('type', 'profileImage')

        this.$axios.$post(`/projects/${this.projectId}/tasks/${taskId}/upload`,
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'user': this.userIdz
              }
            }
          ).then(function(res){
            console.log('File upload successful', res.data);
          })
          .catch(function(){
            console.log('File Upload Failed');
          });
      
       } catch(e){
          console.log("Error adding a Task", e);
          // alert("Error adding a task")
       }      
      },
    },
    computed: {  
        checkValidation: {
            get(){
              if(this.taskName === ''){
                return true
              } else{
                return false
              }
           },
          set(value) {
            this.taskName = value;
          }            
        },
        addTaskAssignee:{
          get(){
            console.log("Task assignee -->!", this.taskAssignee)
              return this.taskAssignee;
          },
          set(value){
              this.taskAssignee = value
          }
        },
         addTaskStyling: {
            get(){
              if(this.taskName === ''){
                return 'addTaskButtonFail'
              } else{
                return 'addTaskButtonSuccess'
              }
           }            
        }    
    }
  }
</script>
