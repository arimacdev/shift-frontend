<template>
 <div>
  asdasdasdasd
    </div>
</template>

<script>

// import { Datetime } from 'vue-datetime';
// import Vue from 'vue' 
// Vue.component('datetime', Datetime);
// import { Settings } from 'luxon'
 
// Settings.defaultLocale = 'IST'

// import SuccessPopup from '~/components/popups/successPopup'
// import ErrorPopup from '~/components/popups/errorPopup'

//   export default {
//     props: ['task', 'assignee', 'projectId', 'subTasks', 'taskFiles', 'projectUsers', 'people'],

//     components: {
//       'success-popup' : SuccessPopup,
//       'error-popup': ErrorPopup,
//     },
//     data() {
//       return {
//         taskDialog: false,
//         subTaskDialog: false,
//         component: '',
//         hidden: false,
//         userId: this.$store.state.user.userId,
//         drawer: null,
//         selected : true,
//         showNewSubTask: false,
//         setDue: this.task.taskDueDateAt,
//         editTask: true,
//         file:'',
//         updatedTask: {
//           taskName: "",
//           taskAssignee: "",
//           taskNotes: "",
//           taskStatus: "",
//           taskRemindOnDate: "",
//           taskDueDate: ""
//         },
//         newSubTask: {
//           taskId: "",
//           subtaskName : "",
//           subtaskStatus: false,
//         },
//         subTask: {
//           taskId : this.task.taskId,
//           subtaskName: "",
//           subTaskCreator: ""
//         },
//         items: [        
//           {
//             items: [
//               { title: 'Task 1' },
//               { title: 'Task 2' },
//               { title: 'Task 3' },
//             ],
//           },
          
//         ],
//       }
//     },
//     methods: {
//       close(){
//                 this.component = ''
//             },
//       showNewSubTaskField: function(){
//         this.showNewSubTask =true;
//       },
//       EditTaskName(){
//         this.editTask = false;
//       },
//       changeDue(){
//         console.log("change me")
//       },
//       async changeAssignee(){
//         console.log("assignee changed");

//          console.log("onchange updated assignee ->", this.updatedTask.taskAssignee)
//          let response;
//         try{
//           response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
//           "taskAssignee": this.updatedTask.taskAssignee
//         },
//           {
//               headers: {
//                   'user': this.userId
//               }
//             }
//         )
//         this.$emit('listenChange');
//         console.log("update task status response", response);
//        } catch(e){
//           console.log("Error updating a status", e);
//        }
        
//       },
//       async deleteTask(){
//       let response;
//        try{
//         response = await this.$axios.$delete(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {    
//                 data: {},
//                 headers: {
//                     'user': this.userId,
//                 }
//         })
//         location.reload();
//         console.log(response.data);
//        }  catch(e){
//           console.log("Error deleting project", e);
//        }  
//       },
//       async addSubTask(){
//         console.log("add subTask", this.task.taskId,this.newSubTask.subtaskName);
//         let response;
//           try{
//           response = await this.$axios.$post(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask`, 
//           {
//             taskId: this.task.taskId,
//             subtaskName: this.newSubTask.subtaskName,
//             subTaskCreator: this.userId
//           }
//         )
//         this.newSubTask.subtaskName = '';
//         this.showNewSubTask = false;
//         this.subTasks.push(response.data)
//         console.log(response);

//        } catch(e){
//           console.log("Error adding a subTask", e);
//        }  
//       },
//       name() {
//          this.setDue = this.task.taskDueDateAt;
//         return this.task.taskDueDateAt
//       },
//       async updateTaskNote(){
//         console.log("updatedTaskValue ->",this.updatedTask.taskNotes)
//         let response;
//         try{
//           response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
//           "taskNotes": this.updatedTask.taskNotes
//         },
//           {
//               headers: {
//                   'user': this.userId
//               }
//             }
//         )
//         this.$emit('listenChange');
//         console.log("edit task response", response);
//        } catch(e){
//           console.log("Error updating a note", e);
//        }       
//       },
//       async saveEditTaskName(){
//       console.log("updatedTaskName ->",this.updatedTask.taskName)
//         let response;
//         try{
//           response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
//           "taskName": this.updatedTask.taskName
//         },
//           {
//               headers: {
//                   'user': this.userId
//               }
//             }
//         )
//         this.$emit('listenChange');
//         this.editTask = true;
//         console.log("edit task response", response);
       
//        } catch(e){
//           console.log("Error updating a note", e);
//        }
//       },
//       async updateStatus(){
//         console.log("onchange updated status ->", this.updatedTask.taskStatus)
//          let response;
//         try{
//           response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
//           "taskStatus": this.updatedTask.taskStatus
//         },
//           {
//               headers: {
//                   'user': this.userId
//               }
//             }
//         )
//         this.$emit('listenChange');
//         console.log("update task status response", response);
//        } catch(e){
//           console.log("Error updating a status", e);
//        }
//       },
//         async updateTaskDates(type){
//           let dueDate;
//           let remindDate;
//           if(type === "dueDate"){
//             dueDate = this.updatedTask.taskDueDateAt;
//             remindDate = this.task.taskReminderAt;
//           } else {
//             dueDate = this.task.taskDueDateAt;
//             remindDate = this.updatedTask.taskRemindOnDate
//           }
//         // console.log("onchange update task dates -> remind->", this.updatedTask.taskRemindOnDate)
//         // console.log("onchange update task dates -> due->", this.updatedTask.taskDueDate)
//         console.log("dueDate",dueDate);
//         console.log("remindDate",remindDate);
//          let response;
//         try{
//           response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}`, {
//           "taskDueDate": dueDate,
//           "taskRemindOnDate" : remindDate
//         },
//           {
//               headers: {
//                   'user': this.userId
//               }
//             }
//         )
//         this.$emit('listenChange');
//         console.log("update task dates response", response);
//        } catch(e){
//           console.log("Error updating a status", e);
//        }
//       },
//          async subTaskUpdate(editsubtask){
//           console.log("onchange subtask updated ->", editsubtask);
//          let response;
//         try{
//           response = await this.$axios.$put(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask/${editsubtask.subtaskId}`, {
//           "subTaskEditor": this.userId ,
//           "subtaskName": editsubtask.subtaskName,
//           "subtaskStatus": editsubtask.subtaskStatus
//         },
//           {
//               headers: {
//                   'user': this.userId
//               }
//             }
//         )
//         this.$emit('listenChange');
//         console.log("update sub task status response", response);
//        } catch(e){
//           console.log("Error updating a status", e);
//        }
//       },

//       async deleteSubTask(subtask,index){
//         console.log("deletesubtask ->", subtask);
//         let response;
//         try{
//           response = await this.$axios.$delete(`/projects/${this.projectId}/tasks/${this.task.taskId}/subtask/${subtask.subtaskId}`,
//           {
//              headers: {
//                   'user': this.userId
//               }
//           }
//         );
//         this.subTasks.splice(index, 1);
//         console.log("delete sub task", response);
//        } catch(e){
//           console.log("Error updating a status", e);
//        }
//       },
//        handleFileUploads(e){
//          this.file = this.$refs.files.files[0];
//          let formData = new FormData();
//         formData.append('files', this.file);
//         formData.append('type', 'profileImage')

//         this.$axios.$post(`/projects/${this.projectId}/tasks/${this.task.taskId}/upload`,
//             formData,
//             {
//               headers: {
//                   'Content-Type': 'multipart/form-data',
//                   'user': this.userId
//               }
//             }
//           ).then(function(res){
//             this.taskFiles.push(res.data);
//             this.file = '';
//             console.log('File upload successful', res.data);
//           })
//           .catch(function(){
//             console.log('File Upload Failed');
//           });
//       },
//       test(){
//         console.log("test close --------->")
//       }
   

//     },
//     components: {
     
//     },
//     computed: {
//         updatedName: {
//         get(){
//               return this.task.taskName
//             },
//         set(value) {
//           console.log("updated task name ->", value)
//             this.updatedTask.taskName =  value;
//           }            
//         },

//         taskNotes: {
//         get(){
//               return this.task.taskNote
//             },
//         set(value) {
//           console.log("updated task value ->", value)
//             this.updatedTask.taskNotes =  value;
//           }            
//         },

//          taskAssignee: {
//         get(){
//               // return this.assignee.firstName
//               return ''
//             },
//         set(value) {
//           console.log("updated task assignee ->", value)
//             this.updatedTask.taskAssignee =  value;
//           }            
//         },

//         taskStatus: {
//         get(){
//               return this.task.taskStatus
//             },
//         set(value) {
//           console.log("updated task statutus ->", value)
//             this.updatedTask.taskStatus =  value;
//           }            
//         },

//           taskDue: {
//         get(){
//             // let stringDate = new Date(this.task.taskDueDateAt);
//           if(this.task.taskDueDateAt === null)
//           return "Add Due Date";
//           let stringDate  = this.task.taskDueDateAt + " ";
//             // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
//               stringDate = stringDate.toString();
//               stringDate = stringDate.slice(0,16);           
//               return stringDate;
//               // return newDate;
//             },
//         set(value) {
//             console.log("updated task due ->", value)
//             this.updatedTask.taskDueDateAt =  value;
//           }            
//         },
//           taskRemindOn: {
//         get(){
//           if(this.task.taskReminderAt === null)
//           return "Add Reminder Date";
//           let stringDate  = this.task.taskReminderAt + "";
//           // let formateedDate =  stringDate.getFullYear() + "-" + stringDate.getMonth() + "-"+ stringDate.getDate();
//           // console.log("f---->",formateedDate)
//           stringDate = stringDate.toString();
//           stringDate = stringDate.slice(0,16);           
//           return stringDate;
//           },
//         set(value) {
//           console.log("updated task reminder ->", value)
//             this.updatedTask.taskRemindOnDate =  value;
//           }            
//         },
//          subTaskDescription: {
//         get(){
//               return this.subTask.subtaskName
//             },
//         set(value) {
//           console.log("updated subtask description ->", value)
//             this.subTask.subtaskName =  value;
//           }            
//         }
//     },
//   }
</script>

