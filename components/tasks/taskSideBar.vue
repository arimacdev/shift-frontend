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
             <input type="text" v-model="updatedName"  :disabled="editTask" @keyup.enter="saveEditTaskName"/>
            <v-list-item-title class="taskTitle">{{ this.task.taskName }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content >
            <v-icon size="20" color="#FFFFFF" class="editIcon" @click="EditTaskName">mdi-pencil-circle</v-icon>
          </v-list-item-content>


           <v-list-item-content class="dropDownList">
             <select v-model="taskStatus" class="selectUserDropDown" @change="updateStatus">
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
          <!-- <button @click="showUsers">CLICK </button> -->
          <v-list-item-content>        
              <select class="userSelectDropdown tabListItemsText" v-model="taskAssignee" @change="changeAssignee">
              <!-- <option class="tabListItemsText" selected="selected"> {{ assignee.firstName }} {{assignee.lastName }} </option> -->
              <option class="tabListItemsText" v-for="(projectUser, index) in people" :key="index" :selected="projectUser.assigneeId === assignee.userId" :value="projectUser.assigneeId" >
                {{projectUser.assigneeFirstName}} {{projectUser.assigneeLastName}}
              </option>
            </select>
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
            <v-list-item-title class="tabListItemsText">Sub Tasks</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title class="subItem noteSubItem">
              <!-- ========= Add sub tasks here ========= -->
              <div class="subTasksList">
                <v-list-item class="subTaskListItems"  v-for="(subtask,index) in subTasks" :key="index">
                      <!-- <input type="checkbox" name="a2" value="1" class="checkbox"/> -->
                        <v-checkbox
                          v-model="subtask.subtaskStatus"
                          hide-details
                          class="shrink mr-2 mt-0"   
                          @change="subTaskUpdate(subtask)"           
                          >
                          </v-checkbox>
                    <v-list-item-content>
                      <v-list-item-title class="subTaskListName">
                        <input v-model="subtask.subtaskName" type="text" @keyup.enter="addSubTask"/>
                        <!-- {{ subtask.subtaskName}} -->
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-icon color="#FF6161" @click="deleteSubTask(subtask,index)">mdi-trash-can-outline</v-icon>
                </v-list-item>
                <v-list-item v-if="showNewSubTask" class="subTaskListItems">
                       <v-checkbox
                          v-model="newSubTask.subtaskStatus"
                          hide-details
                          class="shrink mr-2 mt-0"           
                          >
                       </v-checkbox>
                       <v-list-item-content>
                         <v-list-item-title class="subTaskListName">
                        <input  placeholder="Add new" v-model="newSubTask.subtaskName" type="text"  @keyup.enter="addSubTask"/>   
                           </v-list-item-title>
                       </v-list-item-content>
                <!-- </div> -->
                </v-list-item>

                <v-list-item @click="showNewSubTaskField">
                      <v-list-item-icon >
            <v-icon color="#0BAFFF">mdi-plus-circle</v-icon>
          </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="subTaskListName subTaskAdd">Add sub task</v-list-item-title>
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
          <v-list-item-title class="tabListItemsText">Due date</v-list-item-title>
           </v-list-item-content>
          <v-list-item-content>
            <input class="sideBarDate " placeholder="Due date" onfocusin="(this.type='date')" onfocusout="(this.type='text')" type="text" v-model="taskDue" @change="updateTaskDates('dueDate')">
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
          <v-list-item-title class="tabListItemsText">Remind on</v-list-item-title>
           </v-list-item-content>
          <v-list-item-content>
             <input class="sideBarDate " placeholder="Due date" onfocusin="(this.type='date')" onfocusout="(this.type='text')" type="text" v-model="taskRemindOn" @change="updateTaskDates('remindOn')">
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
              <textarea v-model="taskNotes" @keyup.enter="updateTaskNote" placeholder="Note" class="noteTextArea"></textarea>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- ----------- end ------------ -->

<v-divider></v-divider>

  <v-list-group >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon size="30" color="#FF6767">mdi-paperclip</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">Files</v-list-item-title>
          </v-list-item-content>
        </template>
        <div class="attchmentContainer fileAttachSideBar">
        <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Add a new file" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload"/>
        </div>
        <div class="attchmentContainer">
        <v-list-item class="subTaskListItems"  v-for="(taskFile,index) in taskFiles" :key="index">
          <div class="listAttachment">
            <a style="text-decoration: none;" :href="taskFile.taskFileUrl">
            <v-icon size="30" color="#0BAFFF">mdi-image-outline</v-icon>
           <span class="attachmentName"> {{ taskFile.taskFileName }} </span>
            </a>
          </div>
        </v-list-item>
        </div>
      </v-list-group>


<v-divider></v-divider>

    </v-list>
    </div>
   

    </div>
</template>

<script>

  export default {
    props: ['task', 'assignee', 'projectId', 'subTasks', 'taskFiles', 'projectUsers', 'people'],
    data() {
      return {
        userId: this.$store.state.user.userId,
        drawer: null,
        selected : true,
        showNewSubTask: false,
        setDue: this.task.taskDueDateAt,
        editTask: true,
        file:'',
        updatedTask: {
          taskName: "",
          taskAssignee: "",
          taskNotes: "",
          taskStatus: "",
          taskRemindOnDate: "",
          taskDueDate: ""
        },
        newSubTask: {
          taskId: "",
          subtaskName : "",
          subtaskStatus: false,
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
      showNewSubTaskField: function(){
        this.showNewSubTask =true;
      },
      EditTaskName(){
        this.editTask = false;
      },
      showUsers(){
        console.log(this.assignee);
        // console.log(this.taskFiles)
        // console.log(this.people)
      },
      changeDue(){
        console.log("change me")
      },
      async changeAssignee(){
        console.log("assignee changed");

         console.log("onchange updated assignee ->", this.updatedTask.taskAssignee)
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskAssignee": this.updatedTask.taskAssignee
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
        
      },
      async addSubTask(){
        console.log("add subTask", this.task.taskId,this.newSubTask.subtaskName);
        let response;
          try{
          response = await this.$axios.$post(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask`, 
          {
            taskId: this.task.taskId,
            subtaskName: this.newSubTask.subtaskName,
            subTaskCreator: this.userId
          }
        )
        this.newSubTask.subtaskName = '';
        this.showNewSubTask = false;
        this.subTasks.push(response.data)
        console.log(response);

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
                  'user': this.userId
              }
            }
        )
        console.log("edit task response", response);
       } catch(e){
          console.log("Error updating a note", e);
       }
      },
      async saveEditTaskName(){
      console.log("updatedTaskName ->",this.updatedTask.taskName)
        let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskName": this.updatedTask.taskName
        },
          {
              headers: {
                  'user': this.userId
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
                  'user': this.userId
              }
            }
        )
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      },
        async updateTaskDates(type){
          let dueDate;
          let remindDate;
          if(type === "dueDate"){
            dueDate = this.updatedTask.taskDueDateAt;
            remindDate = this.task.taskReminderAt;
          } else {
            dueDate = this.task.taskDueDateAt;
            remindDate = this.updatedTask.taskRemindOnDate
          }
        // console.log("onchange update task dates -> remind->", this.updatedTask.taskRemindOnDate)
        // console.log("onchange update task dates -> due->", this.updatedTask.taskDueDate)
        console.log("dueDate",dueDate);
        console.log("remindDate",remindDate);
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskDueDate": dueDate,
          "taskRemindOnDate" : remindDate
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      },
         async subTaskUpdate(editsubtask){
          console.log("onchange subtask updated ->", editsubtask);
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask/${editsubtask.subtaskId}`, {
          "subTaskEditor": this.userId ,
          "subtaskName": editsubtask.subtaskName,
          "subtaskStatus": editsubtask.subtaskStatus
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        console.log("update sub task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      },

      async deleteSubTask(subtask,index){
        console.log("deletesubtask ->", subtask);
        let response;
        try{
          response = await this.$axios.$delete(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask/${subtask.subtaskId}`,
          {
             headers: {
                  'user': this.userId
              }
          }
        );
        this.subTasks.splice(index, 1);
        console.log("delete sub task", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      },
       handleFileUploads(e){
         this.file = this.$refs.files.files[0];
         let formData = new FormData();
        formData.append('files', this.file);
        formData.append('type', 'profileImage')

        this.$axios.$post(`/projects/${this.projectId}/tasks/${this.task.taskId}/upload`,
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'user': this.userId
              }
            }
          ).then(function(res){
            this.taskFiles.push(res.data);
            this.file = '';
            console.log('File upload successful', res.data);
          })
          .catch(function(){
            console.log('File Upload Failed');
          });
      },
   

    },
    components: {
     
    },
    computed: {
        updatedName: {
        get(){
              return this.task.taskName
            },
        set(value) {
          console.log("updated task name ->", value)
            this.updatedTask.taskName =  value;
          }            
        },

        taskNotes: {
        get(){
              return this.task.taskNote
            },
        set(value) {
          console.log("updated task value ->", value)
            this.updatedTask.taskNotes =  value;
          }            
        },

         taskAssignee: {
        get(){
              return this.assignee.firstName
            },
        set(value) {
          console.log("updated task assignee ->", value)
            this.updatedTask.taskAssignee =  value;
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
        //   taskStatus: {
        // get(){
        //       return this.task.taskStatus
        //     },
        // set(value) {
        //   console.log("updated task statutus ->", value)
        //     this.updatedTask.taskStatus =  value;
        //   }            
        // },
          taskDue: {
        get(){
            // let stringDate = new Date(this.task.taskDueDateAt);
          let stringDate  = this.task.taskDueDateAt + " ";
            // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
              // let due = this.task.taskDueDateAt;              
              // return due.slice(0,10)
              // let newDate = stringDate.toString();
              stringDate = stringDate.toString();
              stringDate = stringDate.slice(0,10);           
              return stringDate;
              // return newDate;
            },
        set(value) {
            console.log("updated task due ->", value)
            this.updatedTask.taskDueDateAt =  value;
          }            
        },
          taskRemindOn: {
        get(){
          let stringDate  = this.task.taskReminderAt + "";
          // console.log("---->",stringDate);
          // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
          // console.log("f---->",formateedDate)
              stringDate = stringDate.toString();
              stringDate = stringDate.slice(0,10);           
              return stringDate;
          },
        set(value) {
          console.log("updated task reminder ->", value)
            this.updatedTask.taskRemindOnDate =  value;
          }            
        },
         subTaskDescription: {
        get(){
              return this.subTask.subtaskName
            },
        set(value) {
          console.log("updated subtask description ->", value)
            this.subTask.subtaskName =  value;
          }            
        }
    },
  }
</script>

