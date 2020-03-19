<template>
 <div>
  <div class="taskTitleDiv">
      <div class="taskName-sideBar">

        <v-list-item>
        <v-list-item-icon>
             <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div>
          </v-list-item-icon>
           <v-list-item-content class="">
            <v-list-item-title class="taskTitle">{{ this.task.taskName }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content >
            <v-icon size="20" color="#FFFFFF" class="editIcon">mdi-pencil-circle</v-icon>
          </v-list-item-content>


           <v-list-item-content class="dropDownList">
             <select v-model="task.taskStatus" class=" selectUserDropDown">
              <option disabled value="" >Task status</option>
                <option key="pending" value="pending" >Pending</option>
                <option key="implementing" value="implementing">Implementing</option>
                <option key="qa" value="qa">QA</option>
                <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                <option key="reOpened" value="reOpened">Re-Opened</option>
                <option key="deployed" value="deployed">Deployed</option>
                <option key="closed" value="closed">Closed</option>
            </select>
             </v-list-item-content>

         
      </v-list-item>

      
       
      </div>

    </div>

    <div class="sideBarContent overflow-y-auto">
      
    <v-list flat>
      <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#02C1D4" >mdi-account-arrow-left-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">{{ assignee.firstName }} {{assignee.lastName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

<v-divider></v-divider>

 
      <v-list-group >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon size="30" color="#2EC973" >mdi-package-variant-closed</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">Sub tasks</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="subItem noteSubItem">
              <!-- ========= Add sub tasks here ========= -->
              <div class="subTasksList">
                <v-list-item class="subTaskListItems">
                      <input type="checkbox" name="a2" value="1" class="checkbox" />
                    <v-list-item-content>
                      <v-list-item-title class="subTaskListName">{{ task.taskName}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

   <v-divider></v-divider>

      <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#0BAFFF" >mdi-calendar-blank-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">Set due {{task.taskDueDateAt}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

<v-divider></v-divider>

 <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#FFC213" >mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">Remind on {{task.taskReminderAt}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>



      <!-- -------- note start -------------- -->

<v-divider></v-divider>

  <v-list-group >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon size="30" color="#FF6767" >mdi-file-document-edit-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">Notes</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="subItem noteSubItem" >
              <textarea v-model="taskNotes" placeholder="Note" class="noteTextArea"></textarea>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- ----------- end ------------ -->

<v-divider></v-divider>

<v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#FFAE4F" >mdi-paperclip</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">Files</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

<v-divider></v-divider>

    </v-list>
    </div>
   

    </div>
</template>

<script>

  export default {
    props: ['task', 'assignee', 'projectId', 'subtasks'],
    data() {
      return {
        drawer: null,
        // notes: this.task.taskNote,
        setDue: this.task.taskDueDateAt,
        updatedTask: {
          taskName: "",
          taskAssignee: "",
          taskNotes: "",
          taskStatus: "",
          taskRemindOnDate: "",
          taskDueDate: ""
        },
        subTask: {
          taskId : this.task.taskId,
          subtaskName: "",
          subTaskCreator: ""
        },
        items: [        
          {
            items: [
              { title: 'Task 1' },
              { title: 'Task 2' },
              { title: 'Task 3' },
            ],
          },
          
        ],
      }
    },
    methods: {
      async addSubTask(){
        console.log("add subTask",this.addUser);
        let assigneeProjectRoleId = this.adminStatus;
        console.log(assigneeProjectRoleId);
        let response;
          try{
          response = await this.$axios.$post(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask`, 
          // this.addUser
        )
       } catch(e){
          console.log("Error adding a subTask", e);
       }  
      },
      name() {
         this.setDue = this.task.taskDueDateAt;
        return this.task.taskDueDateAt
      },
      async updateTaskNote(){
        console.log("updatedTaskValue ->",this.updatedTask.taskNotes)
        let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskNotes": this.updatedTask.taskNotes
        },
          {
              headers: {
                  'user': '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff'
              }
            }
        )
        console.log("edit task response", response);
       } catch(e){
          console.log("Error updating a note", e);
       }
      },
      async updateStatus(){
        console.log("onchange updated status ->", this.updatedTask.taskStatus)
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskStatus": this.updatedTask.taskStatus
        },
          {
              headers: {
                  'user': '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff'
              }
            }
        )
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      }

    },
    components: {
     
    },
    computed: {
        taskNotes: {
        get(){
              return this.task.taskNote
            },
        set(value) {
          console.log("updated task value ->", value)
            this.updatedTask.taskNotes =  value;
          }            
        },
        taskStatus: {
        get(){
              return this.task.taskStatus
            },
        set(value) {
          console.log("updated task statutus ->", value)
            this.updatedTask.taskStatus =  value;
          }            
        },
          taskStatus: {
        get(){
              return this.task.taskStatus
            },
        set(value) {
          console.log("updated task statutus ->", value)
            this.updatedTask.taskStatus =  value;
          }            
        },
          taskDue: {
        get(){
              return this.task.taskDueDateAt
            },
        set(value) {
          console.log("updated task due ->", value)
            this.updatedTask.taskDueDateAt =  value;
          }            
        },
          taskRemindOn: {
        get(){
              return this.task.taskReminderAt
            },
        set(value) {
          console.log("updated task reminder ->", value)
            this.updatedTask.taskReminderAt =  value;
          }            
        }
    },
  }
</script>

