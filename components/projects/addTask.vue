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
        <input v-model="taskName" placeholder="Task name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <select v-model="assignee" class="formElements">
                <option>Hiru TV</option>
                <option>B</option>
                <option>C</option>
            </select>
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
            <select v-model="status" class="formElements">
                <option>Pending</option>
                <option>Implementing</option>
                <option>QA</option>
                <option>Ready to Deploy</option>
                <option>Re Open</option>
                <option>Deployed</option>
                <option>Close</option>
            </select>
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="date" v-model="dueDate" placeholder="Due date" class="formElements">
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
        <input type="date" v-model="reminder" placeholder="Reminder" class="formElements">
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
       <textarea v-model="notes" placeholder="Note" class="formElements textArea"></textarea>
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
      props: ['projectId'],
    components: {
    },
    data: () => ({
      name: '',
      assignee: [
        'Client',
        'Owner',
        'Developer',
        'QA',
      ],
      status: [
        'pending',
        'implementing',
        'readyToDeploy',
        'reOpened',
        'deployed',
        'closed'
      ],
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },

     async addTask(){
      
        let response2 = await this.$axios.$post('/projects/d06aceeb-a8f3-4305-87e4-76f849b4fedd/tasks', {
          taskName: this.taskName,
          projectId: 'd06aceeb-a8f3-4305-87e4-76f849b4fedd',
          taskInitiator: "138bbb3d-02ed-4d72-9a03-7e8cdfe89eff",
          taskAssignee: "assignee01",
          taskDueDate: this.dueDate,
          taskRemindOnDate: this.reminder,
          notes: this.notes
        })
        console.log(response2);
      }
    },
  }
</script>