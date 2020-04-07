<template>
<div>
    <div class="taskFormDiv taskListViewContent overflow-y-auto">
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
          <!-- <input maxlength="50" v-model.trim="$v.taskName.$model" placeholder="Task name" class="formElements">
       <div v-if="$v.taskName.$error && !$v.taskName.required" class="errorText"> Task name is required</div>
       <div v-if="$v.taskName.$error && !$v.taskName.maxLength" class="errorText"> Cannot use more than 50 characters</div> -->
      
       <v-text-field
            label="Task name"
            outlined
            class="createFormElements"
            v-model.trim="$v.taskName.$model"
          ></v-text-field>
 <div v-if="$v.taskName.$error && !$v.taskName.required" class="errorText"> Project name is required</div>
       <div v-if="$v.taskName.$error && !$v.taskName.maxLength" class="errorText"> Cannot use more than 100 characters</div>
           


            </v-col>
             <v-col
                sm="6"
                md="6"                
            >
            <!-- <select v-model="addTaskAssignee" class="formElements" >
              <option disabled value="" >Assignee</option>
              <option v-for="(projectUser, index) in projectUsers" :key="index" :value="projectUser.userId">
                {{projectUser.firstName}} {{projectUser.lastName}}
              </option>
            </select> -->

             <v-select
             v-model="addTaskAssignee"
              :items="states"
              item-text="name"
              item-value="id.userId"
              label="Task assignee"
              outlined
              class="createFormElements"
              @mousedown="querySelections"
            ></v-select>
            
            </v-col>
        </v-row>        
        <v-row class="mb-12 formRow" no-gutters >
                <v-col
                sm="6"
                md="6"
                
            >
           
             <!-- <input  v-model="taskDueDate" placeholder="Due date" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" type="text" class="formElements"> -->
           <div class="pickerContainer taskDatePickerField pickerDiv">
            <VueCtkDateTimePicker 
              color="#3f51b5" 
              class="dateTimePickerInternal" 
              v-model="$v.taskDueDate.$model" 
              label="Task due date and time"
              input-size="lg"
              />
              <div v-if="$v.taskDueDate.$error && !$v.taskDueDate.dateCheck" class="errorText errorDiv"> Task due date cannot be past date</div>
          
           </div>
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
          <!-- <input v-model="taskRemindOnDate"  type="text" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" placeholder="Reminder" class="formElements"> -->
         <div class="pickerContainer taskDatePickerField pickerDiv">
         <VueCtkDateTimePicker 
          color="#3f51b5"  
          class="dateTimePickerInternal" 
          v-model="$v.taskRemindOnDate.$model" 
          label="Reminder"
          input-size="lg"
          />
          <div v-if="$v.taskRemindOnDate.$error && !$v.taskRemindOnDate.dateCheck" class="errorText errorDiv"> Reminder date should be before due date</div>
          
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
            <!-- <select v-model="taskStatus" class="formElements">
                <option key="pending" value="pending" >Pending</option>
                <option key="implementing" value="implementing">Implementing</option>
                <option key="qa" value="qa">QA</option>
                <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                <option key="reOpened" value="reOpened">Re-Opened</option>
                <option key="deployed" value="deployed">Deployed</option>
                <option key="closed" value="closed">Closed</option>
            </select> -->
            <v-select
             v-model="taskStatus"
              :items="items"
              item-text="name"
              item-value="id"
              label="Task status"
              outlined
              class="createFormElements"
            ></v-select>
           
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Drop files to attach, or browse" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload fileUploadField"/>
           
            <!-- <v-file-input 
            label="Attachments"
            v-model="files"
            outlined
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
            class="createFormElements"
            chips
            ref="files"
            @change="test()"
            >
            </v-file-input> -->
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
       <!-- <textarea v-model="taskNotes" placeholder="Note" class="formElements textArea"></textarea> -->
       <v-textarea
          v-model.trim="$v.taskNotes.$model"
          outlined
          class=" textArea"
          label="Notes"
          height="200px"
          
        ></v-textarea>
         <div v-if="$v.taskNotes.$error && !$v.taskNotes.maxLength" class="errorText"> Cannot use more than 500 characters</div>
       
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
       
    </div>

        <div @click="close" class="taskAddPopupPlacements">
            <component v-bind:is="component" ></component>
         </div>
        <!-- <success-popup /> -->

    </div>
    
</template>

<script>

import { required, maxLength } from 'vuelidate/lib/validators'
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
 
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
          data: '',
          taskDueDate: new Date(),
          taskRemindOnDate: new Date(),
          states: [],
          files: null,
          search: null,
          items: [
            { name: 'Pending', id: 'pending' },
            { name: 'Implementing', id: 'implementing' },
            { name: 'QA', id: 'qa' },
            { name: 'Ready to Deploy', id: 'readyToDeploy' },
            { name: 'Re-Opened', id: 'reOpened' },
            { name: 'Deployed', id: 'deployed' },
            { name: 'Closed', id: 'closed' },
        ],
      
      }
    },
    validations: {
            taskName: {
            required,
            maxLength: maxLength(100)
            },
            taskDueDate: {
              dateCheck(){
                const dueDate = new Date(this.taskDueDate);
                if(this.taskDueDate == null){
                    return true;
                } else{
                    const dueToUtc = new Date(dueDate.toLocaleString("en-US", {timeZone: "UTC"}));
                    const dueToUtcDate = new Date(dueToUtc);
                    const now = new Date();
                    console.log("now", now.getTime(), "DueTime", dueToUtcDate.getTime()+350000000);
                    if(now.getTime() >= dueToUtcDate.getTime()+35000000){
                        return false;
                    } else {
                        return true;
                    }
                }
                
      },
            },
            taskNotes:{
              maxLength: maxLength(500)
            },
            taskRemindOnDate: {
               dateCheck(){
                const taskRemindOnDate = new Date(this.taskRemindOnDate);
                if(this.taskRemindOnDate == null){
                    return true;
                } else{
                    const endToUtc = new Date(taskRemindOnDate.toLocaleString("en-US", {timeZone: "UTC"}));
                    const endToUtcDate = new Date(endToUtc);
                    const taskDueDate = new Date(this.taskDueDate);
                    console.log("start", taskDueDate.getTime(), "end", endToUtcDate.getTime()+35000000);
                    if(taskDueDate.getTime() <= endToUtcDate.getTime()){
                        console.log("overdue")
                        return false;
                    } else {
                        return true;
                    }
                }
                
      },
            },
        },
    methods: {
      test(){
        console.log("updated files =============> "+ new FileReader().this.files)
      },
      querySelections (v) {
        let projectSearchList = this.projectUsers;
        for (let index = 0; index < projectSearchList.length; ++index) {
            let user = projectSearchList[index];
            this.states.push({name: user.firstName + " " + user.lastName, id: user, img: user.profileImage});
        }
        console.log("usersList", this.users, "nameList", this.states)
        this.loading = true
        
      },
      getDueDate(){       
        const startDate = new Date(this.taskDueDate);
        const isoDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString();
        console.log("iso due date",isoDate)
        return isoDate;
    },
    getRemindOnDate(){       
    const endDate = new Date(this.taskRemindOnDate);
    const isoDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString();
    console.log("iso remond on date",isoDate)
    return isoDate;
    },
      submit () {
       this.$v.$touch()
      },
      handleFileUploads(e){
         this.file = this.$refs.files.files[0];
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
      },
     async addTask(){     
       let response;
       try{
            response = await this.$axios.$post(`/projects/${this.projectId}/tasks`, {
          taskName: this.taskName,
          projectId: this.projectId,
          taskInitiator: this.userId,
          taskAssignee: this.taskAssignee,
          taskDueDate: this.getDueDate(),
          taskRemindOnDate: this.getRemindOnDate(),
          taskStatus: this.taskStatus,
          taskNotes: this.taskNotes,
          taskType: 'project'
        })
         this.component = 'success-popup'
        // window.setTimeout(location.reload(), 8000)
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
                  'user': this.userId
              }
            }
          ).then(function(res){
            console.log('File upload successful', res.data);
          })
          .catch(function(){
            console.log('File Upload Failed');
          });
          
      if(this.taskAssignee === this.userId){
        console.log("assignee is me", this.taskAssignee,this.userId)
        this.$store.dispatch('task/fetchTasksMyTasks', this.projectId);
        this.$store.dispatch('task/fetchTasksAllTasks', this.projectId);
      } else {
         console.log("assignee is NOT me",this.taskAssignee,)
        this.$store.dispatch('task/fetchTasksAllTasks', this.projectId);
      }
          this.taskName = '',
          this.taskAssignee = '',
          this.taskStatus = 'pending',
          this.taskDueDate = new Date(),
          this.taskRemindOnDate = new Date(),
          this.taskNotes = '',
           this.$v.$reset()
       } catch(e){
         this.component = 'error-popup'
          console.log("Error adding a Task", e);
          // alert("Error adding a task")
       }      
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
              if(this.$v.$invalid == true){
                return 'addTaskButtonFail'
              } else{
                return 'addTaskButtonSuccess'
              }
           }            
        }    
    }
  }
</script>
