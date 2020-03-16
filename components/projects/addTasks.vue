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
              class="task_new"
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
                class="custom"
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
              multiple
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
              v-model="notes"
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
                <v-list-item @click="addTask()" 
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
          taskName: this.name,
          projectId: projectId,
          taskInitiator: "138bbb3d-02ed-4d72-9a03-7e8cdfe89eff",
          taskAssignee: "assignee01",
          taskDueDate: this.dueDate,
          taskRemindOnDate: this.reminder,
        })
        console.log(response2);
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
  margin-bottom: -55px;
  /* background-color: #f5f5f5; */
}
.formItems{
}
.addTask{
    background-color: #2EC973;
    width: 20%;
    margin-bottom: -20px;
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

.task_new {
position: absolute;
width: 100%;
height: 57px;

background: #EDF0F5;
border: 1px solid #E5E9EF;
box-sizing: border-box;
border-radius: 5px;
}
</style>