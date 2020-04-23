<template>
 <div class="sideBarBody">
  <div class="taskTitleDiv ">
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
             <input type="text" class="taskTitle" v-model="updatedName" v-if="editTask == true"  :disabled="editTask" @keyup.enter="updateGroupTaskName"/>
             <input maxlength="49" type="text" class="taskTitleEdit" v-model="updatedName" v-if="editTask == false"  :disabled="editTask" @keyup.enter="updateGroupTaskName"/>
             
            <!-- <v-list-item-title class="taskTitle">{{ task.taskName }}</v-list-item-title> -->
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

  

 <v-list-item-group class="">
<v-list-item>

   <div class="taskStatusDropdown">
             <select v-model="taskStatus" class="selectUserDropDown" @change="updateStatus">
                <option key="closed" value="closed">Closed</option>
                <option key="open" value="open">Open</option>
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
              <!-- ///////// add assignee name - customize for personal task and group tasks //////// -->
           <select  v-model="taskAssignee" class="tabListItemsText" @change="changeAssignee">
                <option value="" disabled>{{ assignee.firstName }} {{assignee.lastName }}</option>
              <option class="tabListItemsText" v-for="(groupUser, index) in groupPeople" :key="index" :selected="groupUser.assigneeId === assignee.userId" :value="groupUser.assigneeId" >
                {{groupUser.assigneeFirstName}} {{groupUser.assigneeLastName}} 
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
                    <!-- <v-icon color="#FF6161" @click="subTaskDialog = true">mdi-trash-can-outline</v-icon> -->
                    <v-icon color="#FF6161" @click="selectSubTask(subtask,index); subTaskDialog = true">mdi-trash-can-outline</v-icon>


                   
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
                      <v-list-item-title class="subTaskListName subTaskAdd">Add Subtask</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

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
                              :retain-focus="false"
                            >
                              Cancel
                            </v-btn>
                  <v-spacer></v-spacer>
                            <v-btn
                              color="error"
                              width="100px"
                              @click="subTaskDialog = false; deleteSubTask()"
                              :retain-focus="false"
                            >
                              Delete
                            </v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>

                          
                          </div>
                        </v-card>
                      </v-dialog>

                  <!-- ---------------------- end popup ------------------ -->

   <v-divider></v-divider>

      <v-list-item-group class="tabListItems">
        <v-list-item>
          <v-list-item-icon>
            <v-icon size="30" color="#0BAFFF" >mdi-calendar-blank-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
           <div class="pickerContainer pickerDiv sideBarPickers datePickerNew">
            <div class="datetimePickerRange">
             </div>
           <datetime
              type="datetime"
              v-model="taskDue"
              zone="local"
                input-id="startDate"
                >
                <label for="startDate" slot="before" class="tabListItemsTextDue "><span class="pickerNewText">Due date</span></label>
                 <!-- <label for="startDate" slot="after" class="tabListItemsText "><v-icon>mdi-pencil-outline</v-icon></label> -->
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
            <div class="datetimePickerRange">
             </div>
           <datetime
              type="datetime"
              v-model="taskRemindOn"
              zone="local"
                input-id="endDate"
                
                >
                <label for="endDate" slot="before" class="tabListItemsText "><span class="pickerNewText">Remind on</span></label>
                <!-- <label for="endDate" slot="after" class="tabListItemsText "><v-icon>mdi-pencil-outline</v-icon></label> -->
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
              <!-- <textarea v-model="taskNotes" @keyup.enter="updateTaskNote" placeholder="Note" class="noteTextArea"></textarea> -->
           <v-textarea
              name="input-7-4"
              auto-grow=""
              clearable=""
              outlined=""
              v-model="taskNotes"
            ></v-textarea>
            </v-list-item-title>
             <div class=" noteUpdateButton">
                  <v-btn 
                  class="ma-2"  
                  small 
                  rounded 
                  depressed="" 
                  color="#0BAFFF"
                  dark=""
                  @click="updateTaskNote"
                  >
                    <v-icon left>mdi-pencil</v-icon> Update note
                  </v-btn>
              </div>
           
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
        <!-- <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Add a new file" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload"/> -->
       
        <v-file-input 
            label="Attachments"
            v-model="files"
            outlined
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
            class="createFormElements"
            chips
            show-size=""
            >   </v-file-input>

              <div class=" fileUploadButton">
                  <v-btn 
                  class="ma-2"  
                  small 
                  rounded 
                  depressed="" 
                  color="#0BAFFF"
                  dark=""
                  @click="taskFileUpload()"
                  >
                    <v-icon left>mdi-upload</v-icon> Upload
                  </v-btn>
                  <v-progress-circular
                  v-if="uploadLoading == true"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
              </div>

              
       
       
        </div>
        <div class="attchmentContainer">
        <v-list-item class="subTaskListItems"  v-for="(taskFile,index) in taskFiles" :key="index" >
          
          <div class="listAttachment">
            <a style="text-decoration: none;" :href="taskFile.taskFileUrl" target="_blank">
            <v-icon size="30" color="#0BAFFF">mdi-paperclip</v-icon>
           <div class="attachmentName"> 
             <span>{{ taskFile.taskFileName }}</span> 
             </div>
            </a>
          </div>
          <div class="attachmentClose">
               <v-icon @click="removeFiles(taskFile.taskFileId)" size="15" class="closeButton" color="red">mdi-close-circle-outline</v-icon>
             </div>
          
        </v-list-item>
        </div>
      </v-list-group>



<v-divider></v-divider>



    </v-list>
    </div>
   
         <div @click="close">
            <component v-bind:is="component" :errorMessage=errorMessage ></component>
            <!-- <success-popup /> -->
         </div>

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
import { mapState } from 'vuex';

  export default {
    props: ['group', 'task', 'assignee', 'subTasks' ,'taskFiles', 'groupPeople'],

    components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup,
      'datetime': Datetime
    },
    data() {
      return {
        errorMessage: "",
        component: "",
        selectedSubTask: '',
        selectedSubTaskIndex: '',
        uploadLoading: false,
        files: [],
        taskDialog: false,
        subTaskDialog: false,
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
        //   taskId : this.task.taskId,
          subtaskName: "",
          subTaskCreator: ""
        },
       
      }
    },
    //  computed: {
    // ...mapState({
    //     groupPeople: state => state.groups.groupPeople.groupPeople,
    //   })
    //  },
    methods: {
      close() {
      this.component = "";
    },
       selectSubTask(subtask, index){
        this.selectedSubTask = subtask
        this.selectedSubTaskIndex = index
        console.log("selected subtask: " + subtask + " " + index)
      },
     async removeFiles(taskFile){
        console.log("SelectedFile ==========> " + taskFile)

        let response;
       try{
        response = await this.$axios.$delete(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}/upload/${taskFile}`, {    
                data: {},
                headers: {
                    'user': this.userId,
                    'taskType': 'taskGroup'
                }
        })
       const index = this.taskFiles.findIndex(i => i.taskFileId === taskFile);
        this.taskFiles.splice(index, 1);
        console.log(response.data);
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
       }  catch(e){
          this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
          console.log("Error deleting task", e);
       }  

      },
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
          response = await this.$axios.$put(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}`, {
          "taskAssignee": this.updatedTask.taskAssignee,
          "taskType": "taskGroup"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        // this.$store.dispatch('groups/groupTask/changeTaskAssignee',{
        //   taskId: this.task.taskId,
        //   type: 'taskAssignee',
        //   assignee : this.updatedTask.taskAssignee,
        //   profileImage: this.u
        // }); // TODO
         this.$store.dispatch('groups/groupTask/fetchGroupTasks',{
          taskGroupId: this.group.taskGroupId,
          userId: this.userId
        });
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
           this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
       }
        
      },
      async deleteTask(){
      let response;
       try{
        response = await this.$axios.$delete(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}`, {    
                data: {},
                headers: {
                    'user': this.userId,
                    'type': 'taskGroup'
                }
        })
        this.$store.dispatch('groups/groupTask/removeTaskFromTaskGroup', this.task.taskId);
        this.$emit('shrinkSideBar');
        console.log(response.data);
        console.log("update task status response", response);
       }  catch(e){
          console.log("Error deleting task", e);
             this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
       }  
      },
      async addSubTask(){
          if(this.newSubTask.subtaskName){
        console.log("add subTask", this.task.taskId,this.newSubTask.subtaskName);
        let response;
          try{
          response = await this.$axios.$post(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}/subtask`, 
          {
            taskId: this.task.taskId,
            subtaskName: this.newSubTask.subtaskName,
            subTaskCreator: this.userId,
            "taskType": "taskGroup"
          }
        )
        this.newSubTask.subtaskName = '';
        this.showNewSubTask =true
        // this.showNewSubTask = false;
        this.subTasks.push(response.data);
        console.log(response);
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)

       } catch(e){
          console.log("Error adding a subTask", e);
           this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
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
          response = await this.$axios.$put(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}`, {
          "taskNotes": this.updatedTask.taskNotes,
          "taskType": "taskGroup"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
          this.$store.dispatch('groups/groupTask/updateGroupTask',{
          taskId: this.task.taskId,
          type: 'taskNote',
          value : this.updatedTask.taskNotes
        });        
        console.log("edit task response", response);
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
       } catch(e){
          console.log("Error updating a note", e);
            this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
       }       
      },
      async updateGroupTaskName(){
      console.log("updatedTaskName ->",this.updatedTask.taskName)
        let response;
        try{
          response = await this.$axios.$put(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}`, {
          "taskName": this.updatedTask.taskName,
          "taskType": "taskGroup"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        this.editTask = true;
        
         this.$store.dispatch('groups/groupTask/updateGroupTask',{
          taskId: this.task.taskId,
          type: 'taskName',
          value : this.updatedTask.taskName
        });
        console.log("edit task response", response);
          this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
       } catch(e){
          console.log("Error updating a note", e);
           this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
        this.editTask = true;
       }
      },
      async updateStatus(){
        console.log("onchange updated status ->", this.updatedTask.taskStatus)
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}`, {
          "taskStatus": this.updatedTask.taskStatus,
          "taskType": "taskGroup"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
          this.$store.dispatch('groups/groupTask/updateGroupTask',{
          taskId: this.task.taskId,
          type: 'taskStatus',
          value : this.updatedTask.taskStatus
        });
        this.$store.dispatch('groups/groupPeople/fetchGroupPeople',{
          taskGroupId: this.group.taskGroupId, 
          userId: this.userId
        });
          this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
        console.log("update task status response", response);
       } catch(e){
          console.log("Error updating a status", e);
           this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
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
          response = await this.$axios.$put(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}`, {
          "taskDueDate": dueDate,
          "taskRemindOnDate" : remindDate,
          "taskType": "taskGroup"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
          this.$store.dispatch('groups/groupTask/updateGroupTaskDates',{
          taskId: this.task.taskId,
          dueDate: dueDate,
          remindDate : remindDate
        });
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
        console.log("update task dates response", response);
       } catch(e){
          console.log("Error updating a status", e);
        this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
       }
      },
         async subTaskUpdate(editsubtask){
             if(editsubtask.subtaskName){
          console.log("onchange subtask updated ->", editsubtask);
         let response;
        try{
          response = await this.$axios.$put(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}/subtask/${editsubtask.subtaskId}`, {
          "subTaskEditor": this.userId ,
          "subtaskName": editsubtask.subtaskName,
          "subtaskStatus": editsubtask.subtaskStatus,
          "taskType": "taskGroup"
        },
          {
              headers: {
                  'user': this.userId
              }
            }
        )
        console.log("update sub task status response", response);
          this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
       } catch(e){
          console.log("Error updating a status", e);
             this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
       }
             }
      },

      async deleteSubTask(){
        console.log("deletesubtask ->", this.selectedSubTask);
        let response;
        try{
          response = await this.$axios.$delete(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}/subtask/${this.selectedSubTask.subtaskId}`,
          {
             headers: {
                  'user': this.userId,
                  "type": "taskGroup"
              }
          }
        );
        this.subTasks.splice(this.selectedSubTaskIndex, 1);
        console.log("delete sub task", response);
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
       } catch(e){
          console.log("Error updating a status", e);
            this.errorMessage = e.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
       }
      },

      taskFileUpload(){
        this.uploadLoading = true
        let formData = new FormData();
        formData.append('files', this.files);
        formData.append('type', 'profileImage');
        formData.append('taskType', 'taskGroup');
        this.files = null

        this.$axios.$post(`/projects/${this.group.taskGroupId}/tasks/${this.task.taskId}/upload`,
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'user': this.userId
              }
            }
          ).then((res) => {
            this.taskFiles.push(res.data);
            this.uploadLoading = false
            console.log('File upload successful', res.data);
         this.component = "success-popup";
        setTimeout( () => {this.close()}, 2000)
          })
          .catch((err) => {
            this.uploadLoading = false
            console.log('File Upload Failed', err);
             this.errorMessage = err.response.data;
        this.component = "error-popup";
        setTimeout( () => {this.close()}, 2000)
          });
      },   

    },
    computed: {
        updatedName: {
        get(){
              // if(this.updatedTask.taskName != ""){
              //   let name = this.updatedTask.taskName;
              //   return name;
              // } else{
              return this.task.taskName
              // }
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
          if(this.task.taskDueDateAt == null)
          return "Add Due Date";
          let stringDate  = this.task.taskDueDateAt + " ";
            // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
              stringDate = stringDate.toString();
              stringDate = stringDate.slice(0,16);           
              return stringDate;
              console.log("task date ======================> " + stringDate)
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
          if(this.task.taskReminderAt == null)
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

