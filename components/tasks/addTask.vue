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
                <option key="pending" value="pending">Pending</option>
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
            <input placeholder="Due date" type="date" v-model="task.taskDueDate" class="formElements">
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
        <input type="date" v-model="task.taskRemindOnDate" placeholder="Reminder" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="file" id="files" ref="files" multiple v-on:change="handleFileUploads()" class="formElements fileUpload"/>
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
                <div class="addTaskButton">
                <v-list-item @click="addTask()" 
                dark >
                    
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Submit</v-list-item-title>
                    </v-list-item-content>
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
      props: ['projectId', 'projectUsers'],
    components: {
    },

    data() {
      return {
         task: {
            taskName: '',
            taskAssignee: '',
            taskStatus: '',
            taskDueDate:'',
            taskRemindOnDate:'',
            taskNotes: ''
      }
      }
    },
    methods: {
      submit () {
        this.$refs.observer.validate()
      },

     async addTask(){     
       console.log("task-->", this.task) 
       let response;
       try{
          response = await this.$axios.$post(`/projects/${this.projectId}/tasks`, {
          taskName: this.task.taskName,
          projectId: this.projectId,
          taskInitiator: 'u10',
          taskAssignee: this.task.taskAssignee,
          taskDueDate: this.task.taskDueDate,
          taskRemindOnDate: this.task.taskRemindOnDate,
          notes: this.task.taskNotes
        })
       } catch(e){
          console.log("Error adding a Task", e);
       }       
        console.log(response);
      }
    },
  }
</script>