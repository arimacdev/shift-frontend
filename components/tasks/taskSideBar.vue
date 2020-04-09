<template>
 <div class="sideBarBody">
  <div class="taskTitleDiv">
      <div class="taskName-sideBar">
        <v-list-item>
        <v-list-item-icon>
             <!-- <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div> -->
              <v-icon v-if="this.task.taskStatus == 'closed'" size="30" color="#2EC973">mdi-checkbox-marked-circle</v-icon>
             <v-icon v-else size="30" color="#FFFFFF">mdi-checkbox-blank-circle</v-icon>
        
          </v-list-item-icon>
           <div class="textAreaSideBar">
             <input type="text" class="taskTitle" v-model="updatedName" v-if="editTask == true"  :disabled="editTask" @keyup.enter="saveEditTaskName"/>
             <input maxlength="49" type="text" class="taskTitleEdit" v-model="updatedName" v-if="editTask == false"  :disabled="editTask" @keyup.enter="saveEditTaskName"/>
              <!-- <textarea class="taskTitle" v-model="updatedName" v-if="editTask == true"  :disabled="editTask" @keyup.enter="saveEditTaskName" ></textarea> -->
              
             
            <!-- <v-list-item-title class="taskTitle">{{ this.task.taskName }}</v-list-item-title> -->
          </div>
          <div >
            <v-icon size="20" color="#FFFFFF" class="editIcon" @click="EditTaskName">mdi-pencil-circle</v-icon>
          </div>
          <div >
            <v-icon size="20" color="#FF6161" class="editIcon" @click="taskDialog = true">mdi-trash-can-outline</v-icon>
          </div>
          

<!-- --------------------- delete task popup --------------- -->


 <v-dialog
      v-model="taskDialog"
      max-width="380"
    >
      <v-card>
        <div class="popupConfirmHeadline">
          <v-icon class="deletePopupIcon" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
          <br>
          <span class="alertPopupTitle">Delete Task</span>
          <br>
          <span class="alertPopupText">You're about to permanantly delete this task, its comments and attachments, and all of its data. If you're not sure, you can cancel this action. </span>
        </div>

        
 <div class="popupBottom">
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="success"
            width="100px"
            @click="taskDialog = false;"
          >
            Cancel
          </v-btn>
 <v-spacer></v-spacer>
 <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
          <v-btn
            color="error"
            width="100px"
            @click="taskDialog = false; deleteTask()"
          >
            Delete
          </v-btn>
           <v-spacer></v-spacer>
        </v-card-actions>

        
        </div>
      </v-card>
    </v-dialog>

<!-- ---------------------- end popup ------------------ -->
         
      </v-list-item>

      
       
      </div>

    </div>

    <div class="sideBarContent overflow-y-auto">
      
    <v-list flat>

  

<!-- ---------------------------- -->

      <!-- <v-list-item-group class="tabListItems">
 <v-list-group >
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon size="30" color="#FF6767" >mdi-account-arrow-left-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tabListItemsText">{{ assignee.firstName }} {{assignee.lastName }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="" >
              <select v-model="taskAssignee" class="userSelectDropdown tabListItemsText userAddSelect" @change="changeAssignee">
                <option value="" disabled >{{ assignee.firstName }} {{assignee.lastName }} </option>
              <option class="tabListItemsText" v-for="(projectUser, index) in people" :key="index" :selected="projectUser.assigneeId === assignee.userId" :value="projectUser.assigneeId" >
                {{projectUser.assigneeFirstName}} {{projectUser.assigneeLastName}}
              </option>
            </select>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>


      </v-list-item-group> -->
 <v-list-item-group class="">
<v-list-item>

   <div class="taskStatusDropdown">
             <select v-model="taskStatus" class="selectUserDropDown" @change="updateStatus">
                <option key="pending" value="pending" >Pending</option>
                <option key="implementing" value="implementing">Implementing</option>
                <option key="qa" value="qa">QA</option>
                <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                <option key="reOpened" value="reOpened">Re-Opened</option>
                <option key="deployed" value="deployed">Deployed</option>
                <option key="closed" value="closed">Closed</option>
            </select>
             </div>

</v-list-item>
 </v-list-item-group>

<v-divider></v-divider>
      <!-- ---------------------- -->

      <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#0BAFFF" >mdi-account-arrow-left-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
           <select  v-model="taskAssignee" class="tabListItemsText" @change="changeAssignee">
                <option value="" disabled>{{ assignee.firstName }} {{assignee.lastName }}</option>
              <option class="tabListItemsText" v-for="(projectUser, index) in people" :key="index" :selected="projectUser.assigneeId === assignee.userId" :value="projectUser.assigneeId" >
                {{projectUser.assigneeFirstName}} {{projectUser.assigneeLastName}}
              </option>
            </select>
           </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <!-- ----------------------- -->
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
                        <input maxlength="51" class="subTaskListNameContent" v-model="subtask.subtaskName" type="text" @keyup.enter="subTaskUpdate(subtask)"/>
                        <!-- <textarea class="subTaskListNameContent" v-model="subtask.subtaskName" type="text" @keyup.enter="subTaskUpdate(subtask)"> </textarea> -->
                        <!-- <textarea disabled class="selectedTaskTitle selectedsubTaskTitle"  v-model="subtask.subtaskName" ></textarea> -->

                        <!-- {{ subtask.subtaskName}} -->
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-icon color="#FF6161" @click="deleteSubTask(subtask,index)">mdi-trash-can-outline</v-icon>
                    <!-- <v-icon color="#FF6161" @click="subTaskDialog = true">mdi-trash-can-outline</v-icon> -->


                    <!-- --------------------- delete sub task popup --------------- -->


                  <v-dialog
                        v-model="subTaskDialog"
                        max-width="380"
                      >
                        <v-card>
                          <div class="popupConfirmHeadline">
                            <v-icon class="deletePopupIcon" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
                            <br>
                            <span class="alertPopupTitle">Delete Sub Task</span>
                            <br>
                            <span class="alertPopupText">You're about to permanantly delete this sub task and all of it's data. If you're not sure, you can cancel this action. </span>
                          </div>

                          
                  <div class="popupBottom">
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="success"
                              width="100px"
                              @click="subTaskDialog = false"
                            >
                              Cancel
                            </v-btn>
                  <v-spacer></v-spacer>
                  <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
                            <v-btn
                              color="error"
                              width="100px"
                              @click="subTaskDialog = false; deleteSubTask(subtask,index)"
                            >
                              Delete
                            </v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>

                          
                          </div>
                        </v-card>
                      </v-dialog>

                  <!-- ---------------------- end popup ------------------ -->
                </v-list-item>
                <v-list-item v-if="showNewSubTask" class="subTaskListItems">
                       <v-checkbox
                          v-model="newSubTask.subtaskStatus"
                          hide-details
                          class="shrink mr-2 mt-0"           
                          >
                       </v-checkbox>
                       <div>
                         <v-list-item-title class="subTaskListName">
                        <input maxlength="51" class="subTaskListNameContent addSubTaskTextbox"  placeholder="Add new" v-model="newSubTask.subtaskName" type="text"  @keyup.enter="addSubTask"/>   
                           </v-list-item-title>
                       </div>
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
          <!-- <v-list-item-content class="dueTitle"> -->
          <!-- <p class="tabListItemsText datesTitle">Due date</p> -->
           <!-- </v-list-item-content> -->
          <v-list-item-content>
            <!-- <input class="sideBarDate" placeholder="Due date" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" type="text" v-model="taskDue" @change="updateTaskDates('dueDate')"> -->
         <div class="pickerContainer pickerDiv sideBarPickers datePickerNew">
           
           <datetime
              type="datetime"
              v-model="taskDue"
              zone="local"
                input-id="startDate"
                >
                <label for="startDate" slot="before" class="tabListItemsText "><span class="pickerNewText">Due date</span></label>
                 <label for="startDate" slot="after" class="tabListItemsText "><v-icon>mdi-pencil-outline</v-icon></label>
                 <!-- <span class="description sdfsdf" slot="after" >
                     <v-btn class="btnPicker" x-small depressed color="primary" @click="updateTaskDates('dueDate')"> <span class="btnPickerText"> Update</span> </v-btn>
                 </span> -->
                <template slot="button-cancel">
                  <fa :icon="['far', 'times']"></fa>
                  Cancel
                </template>
                <template slot="button-confirm">
                  <fa :icon="['fas', 'check-circle']"></fa>
                <p > Confirm </p>
            </template>
          </datetime>
         </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

<v-divider></v-divider>

 <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#FFC213" >mdi-clock-outline</v-icon>
          </v-list-item-icon>
           <!-- <v-list-item-content> -->
          <!-- <p class="tabListItemsText datesTitle">Remind on</p> -->
           <!-- </v-list-item-content> -->
          <v-list-item-content>
             <!-- <input class="sideBarDate " placeholder="Due date" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" type="text" v-model="taskRemindOn" @change="updateTaskDates('remindOn')"> -->
           <div class="pickerContainer pickerDiv sideBarPickers datePickerNew">
           
           <datetime
              type="datetime"
              v-model="taskRemindOn"
              zone="local"
                input-id="endDate"
                >
                <label for="endDate" slot="before" class="tabListItemsText "><span class="pickerNewText">Remind on</span></label>
                 <label for="endDate" slot="after" class="tabListItemsText "><v-icon>mdi-pencil-outline</v-icon></label>
                 <!-- <span class="description " slot="after">
                     <v-btn class="btnPicker" x-small depressed color="primary"  @click="updateTaskDates('remindOn')"> <span class="btnPickerText"> Update </span></v-btn>
                 </span> -->
                <template slot="button-cancel">
                  <fa :icon="['far', 'times']"></fa>
                  Cancel
                </template>
                <template slot="button-confirm">
                  <fa :icon="['fas', 'check-circle']"></fa>
                <p > Confirm </p>
            </template>
          </datetime>
         </div>
          
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>


      <!-- -------------------------- -->
 <!-- <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#FFC213" >mdi-clock-outline</v-icon>
          </v-list-item-icon>
          <p class="tabListItemsText datesTitle">Remind on</p>
          <v-list-item-content>
             <input class="sideBarDate " placeholder="Due date" onfocusin="(this.type='datetime-local')" onfocusout="(this.type='datetime-local')" type="text" v-model="taskRemindOn" @change="updateTaskDates('remindOn')">
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group> -->

      <!-- --------------------------- -->



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
            <v-icon size="30" color="#0BAFFF">mdi-paperclip</v-icon>
           <div class="attachmentName"> 
             <span>{{ taskFile.taskFileName }}</span> 
             </div>
            </a>
          </div>
          <div class="attachmentClose">
               <v-icon size="15" class="closeButton" color="red">mdi-close-circle-outline</v-icon>
             </div>
          
        </v-list-item>
        </div>
      </v-list-group>


<v-divider></v-divider>



    </v-list>
    </div>
   
          <!-- <div @click="close">
            <component v-bind:is="component" ></component>
            <success-popup />
         </div> -->

    </div>
</template>

<script>

import { Datetime } from 'vue-datetime';
import Vue from 'vue' 
Vue.component('datetime', Datetime);
import { Settings } from 'luxon'
 
Settings.defaultLocale = 'IST'

import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'

  export default {
    props: ['task', 'assignee', 'projectId', 'subTasks', 'taskFiles', 'projectUsers', 'people'],

    components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup,
    },
    data() {
      return {
        taskDialog: false,
        subTaskDialog: false,
        component: '',
        hidden: false,
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
      close(){
                this.component = ''
            },
      showNewSubTaskField: function(){
        this.showNewSubTask =true;
      },
      EditTaskName(){
        this.editTask = false;
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
          "taskAssignee": this.updatedTask.taskAssignee,
          "taskType": "project"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        this.$emit('listenChange');
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
        
      },
      async deleteTask(){
      let response;
       try{
        response = await this.$axios.$delete(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {    
                data: {},
                headers: {
                    'user': this.userId,
                }
        })
        location.reload();
        console.log(response.data);
       }  catch(e){
          console.log("Error deleting project", e);
       }  
      },
      async addSubTask(){
        if(this.newSubTask.subtaskName){
        console.log("add subTask", this.task.taskId,this.newSubTask.subtaskName);
        let response;
        try{
          response = await this.$axios.$post(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask`, 
          {
            taskId: this.task.taskId,
            subtaskName: this.newSubTask.subtaskName,
            subTaskCreator: this.userId,
            "taskType": "project"
          }
        )
        this.newSubTask.subtaskName = '';
        this.showNewSubTask =true
        // this.showNewSubTask = false;
        this.subTasks.push(response.data)
        console.log(response);

       } catch(e){
          console.log("Error adding a subTask", e);
       }  
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
          "taskNotes": this.updatedTask.taskNotes,
          "taskType": "project"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        this.$emit('listenChange');
        console.log("edit task response", response);
       } catch(e){
          console.log("Error updating a note", e);
       }       
      },
      async saveEditTaskName(){
        console.log("NAMEEEE", this.$store.state.task.myTasks)
      console.log("updatedTaskName ->",this.updatedTask.taskName)
        let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskName": this.updatedTask.taskName,
          "taskType": "project"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        console.log("UPDATED", this.$store.state.task.myTasks)
        this.$emit('listenChange');
        this.editTask = true;
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
          "taskStatus": this.updatedTask.taskStatus,
          "taskType": "project"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        this.$emit('listenChange');
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      },
        async updateTaskDates(type){
          let dueDate;
          let remindDate;
          if(type === "dueDate"){       
            console.log("inside due date")   
            dueDate = new Date(this.updatedTask.taskDueDateAt);
            const isoDate = new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000)).toISOString();
            console.log("iso edit due date",isoDate)   
            dueDate = isoDate;
            remindDate = this.task.taskReminderAt;
          } else {
            console.log("inside remind on date");
            remindDate = new Date(this.updatedTask.taskRemindOnDate);
            const isoDate = new Date(remindDate.getTime() - (remindDate.getTimezoneOffset() * 60000)).toISOString();
            console.log("iso edit remind date",isoDate)   
            dueDate = this.task.taskDueDateAt;
            remindDate = isoDate;
          }
        console.log("dueDate",dueDate);
        console.log("remindDate",remindDate);
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
          "taskDueDate": dueDate,
          "taskRemindOnDate" : remindDate,
          "taskType": "project"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        this.$emit('listenChange');
        console.log("update task dates response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
      },
         async subTaskUpdate(editsubtask){
           if(editsubtask.subtaskName){
          console.log("onchange subtask updated ->", editsubtask);
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask/${editsubtask.subtaskId}`, {
          "subTaskEditor": this.userId ,
          "subtaskName": editsubtask.subtaskName,
          "subtaskStatus": editsubtask.subtaskStatus,
          "taskType": "project"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        // this.$emit('listenChange');
        console.log("update sub task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
       }
           }
      },

      async deleteSubTask(subtask,index){
        console.log("deletesubtask ->", subtask);
        let response;
        try{
          response = await this.$axios.$delete(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask/${subtask.subtaskId}`,
          {
             headers: {
                  'user': this.userId,
                  "type": "project"
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
        formData.append('type', 'profileImage');
        formData.append('taskType', 'project')

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
      test(){
        console.log("test close --------->")
      }
   

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
              // return this.assignee.firstName
              return ''
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

          taskDue: {
        get(){
            // let stringDate = new Date(this.task.taskDueDateAt);
          if(this.task.taskDueDateAt === null || this.task.taskDueDateAt === '1970-01-01T05:30:00.000+0000')
          return "Add Due Date";
          let stringDate  = this.task.taskDueDateAt + " ";
            // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
              stringDate = stringDate.toString();
              stringDate = stringDate.slice(0,16);           
              return stringDate;
              // return newDate;
            },
        set(value) {
            console.log("updated task due ->", value)
            this.updatedTask.taskDueDateAt =  value;
            this.updateTaskDates("dueDate");
          }            
        },
          taskRemindOn: {
        get(){
          if(this.task.taskReminderAt === null || this.task.taskDueDateAt === '1970-01-01T05:30:00.000+0000')
          return "Add Reminder Date";
          let stringDate  = this.task.taskReminderAt + "";
          // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
          // console.log("f---->",formateedDate)
          stringDate = stringDate.toString();
          stringDate = stringDate.slice(0,16);           
          return stringDate;
          },
        set(value) {
          console.log("updated task reminder ->", value)
            this.updatedTask.taskRemindOnDate =  value;
            this.updateTaskDates("remindOn");
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

