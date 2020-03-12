<template>
<div class="taskContent">
    <form>
      <v-container class="">
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
        sm="5"
        md="6"
        class="textGrids"
      >
            <v-text-field
              v-model="name"
              :error-messages="errors"
              label="Task name"
              required
              class="formItems"
              filled
              flat
            ></v-text-field>
      </v-col>

      <v-col
       sm="5"
        md="6"
        class="textGrids"
      >
              <v-select
                v-model="assignee"
                :items="assignee"
                :error-messages="errors"
                label="Assignee"
                data-vv-name="select"
                required
                class="formItems custom"
              filled
              flat
              ></v-select>
      </v-col>
    </v-row>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
      sm="5"
        md="6"
        class="textGrids"
      >
             <v-select
                v-model="status"
                :items="status"
                :error-messages="errors"
                label="Task Status"
                data-vv-name="select"
                required
                class="formItems custom"
              filled
              flat
              ></v-select>
      </v-col>

      <v-col
        sm="5"
        md="6"
        class="textGrids"
      >
        <v-text-field
              v-model="dueDate"
              :error-messages="errors"
              label="Due Date"
              required
              class="formItems"
              type="date"
              filled
              flat
              append-icon="mdi-calendar-blank-outline"
            ></v-text-field>
           
      </v-col>
    </v-row>
    <v-row
      class="mb-6"
      no-gutters
    >
      <v-col
       sm="5"
        md="6"
        class="textGrids"
      >
        <v-text-field
              v-model="reminder"
              :error-messages="errors"
              label="Reminder"
              required
              class="formItems"
              type="date"
              filled
              flat
              append-icon="mdi-calendar-blank-outline"
            ></v-text-field>
           
      </v-col>

      <v-col
      sm="5"
        md="6"
        class="textGrids"
      >
         <v-file-input
              v-model="files"
              :error-messages="errors"
              label="Drop files to attach, or browse"
              required
              class="formItems"
              prepend-inner-icon="mdi-cloud-upload-outline"
              prepend-icon=""
              filled
              flat
            ></v-file-input>
      </v-col>
    </v-row>
    <v-row
      class="mb-12"
      no-gutters
    >
    <v-col
      sm="5"
        md="12"
        class="textGrids"
      >
      <v-textarea
              v-model="note"
              :error-messages="errors"
              label="Notes"
              required
              class="formItems"
              filled
              auto-grow
              flat
            ></v-textarea>
      </v-col>
    
    </v-row>
  </v-container>
  
       <div class="addTask addTasksButtons">
                <v-list-item @click="postData()" 
                dark >
                    
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Submit</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
        </div>
    </form>

</div>
</template>


<script>
 
import axios from 'axios'
  export default {
     
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
        'Ongoing',
        'Done',
        'Testing',
        'QA',
      ],
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },

      async postData(){
      
        let response = await this.$axios.$post('/projects/d06aceeb-a8f3-4305-87e4-76f849b4fedd/tasks', {
          taskName: this.name,
          projectId: 'd06aceeb-a8f3-4305-87e4-76f849b4fedd',
          taskInitiator: this.status,
          taskAssignee: this.assignee,
          taskDueDate: this.dueDate,
          taskRemindOnDate: this.reminder,
          notes: this.notes,
        })
        console.log(response.message);
      }
    },
  }
</script>
<style scoped>
.taskContent{
    margin-left: -20px;
}
.textGrids{
  padding: 10px;
  margin-bottom: -30px;
  /* background-color: #f5f5f5; */
}
.formItems{
}
.addTask{
    background-color: #2EC973;
    width: 20%;
}
.addTasksButtons{
    border-radius: 5px;
    float: left;
    margin-right: 5px;
    float: right;
    text-align: center;
}
.v-input__slot:before {
    border-color: inherit;
    border-style: none !important;
    border-width: thin 0 0 0;
}
</style>