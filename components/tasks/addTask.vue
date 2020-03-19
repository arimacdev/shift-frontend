<template>
    <div class="taskFormDiv">
        <form>
        
        <v-row
            class="mb-12 formRow" 
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input v-model="task.taskName" placeholder="Task name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"                
            >
            <select v-model="task.taskAssignee" class="formElements">
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
            <select v-model="task.taskStatus" class="formElements">
              <option disabled value="" >Task status</option>
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
            <input placeholder="Due date" onfocusin="(this.type='date')" onfocusout="(this.type='text')" type="text" v-model="task.taskDueDate" class="formElements">
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
        <input type="text" onfocusin="(this.type='date')" onfocusout="(this.type='text')" v-model="task.taskRemindOnDate" placeholder="Reminder" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Drop files to attach, or browse" id="files" ref="files" multiple v-on:change="handleFileUploads()" class="formElements fileUpload"/>
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
       <textarea v-model="task.taskNotes" placeholder="Note" class="formElements textArea"></textarea>
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
                <button class="addTaskButton">
                <v-list-item @click="addTask()" 
                dark >
                    
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Submit</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </button>
            </v-col>
        </v-row>
        </form>
    </div>
</template>

<script>
 
import axios from 'axios'
import { numeric, required, between, minLength } from 'vuelidate/lib/validators'

  export default {
      props: ['projectId', 'projectUsers'],
    components: {
    },

    data() {
      return {
         files: '',
         task: {
            taskName: '',
            taskAssignee: '',
            taskStatus: '',
            taskDueDate:'',
            taskRemindOnDate:'',
            taskNotes: ''
      },
            taskName: '',
            taskAssignee: '',
            taskStatus: '',
            taskDueDate: '',
            taskRemindOnDate: '',
            taskNotes: ''
      }
    },validations: {
            
        },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      handleFileUploads(e){
           this.file = this.$refs.files.files[0];
      },

     async addTask(){     
       console.log("task-->", this.task) 
       let response;
       try{
          response = await this.$axios.$post(`/projects/${this.projectId}/tasks`, {
          taskName: this.task.taskName,
          projectId: this.projectId,
          taskInitiator: '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff',
          taskAssignee: this.task.taskAssignee,
          taskDueDate: this.task.taskDueDate,
          taskRemindOnDate: this.task.taskRemindOnDate,
          notes: this.task.taskNotes
        })
        alert("Task added successfully!")
       } catch(e){
          console.log("Error adding a Task", e);
          alert("Error creating task!")
       }       
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
                  'user': '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff'
              }
            }
          ).then(function(res){
            console.log('File upload successful', res.data);
          })
          .catch(function(){
            console.log('File Upload Failed');
          });



      }
    },
  }
</script>