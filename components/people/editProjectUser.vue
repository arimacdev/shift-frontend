<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <div class="iconBackCircle"> <v-icon v-on="on" size="17" color="#0BAFFF">mdi-pencil-outline</v-icon></div>
      </template>
      <v-card>
        <v-card-title class="popup-title">Update the Role and Admin for</v-card-title>
        <v-card-text class="popup-name">
             {{editUser.assigneeFirstName}} {{editUser.assigneeLastName}}
         </v-card-text>
             <v-card-text class="popup-roleTitle">Role</v-card-text>
        <v-card-actions class="roleField">
             <input v-model="jobRole" placeholder="Project role" class="formElements">
        </v-card-actions>
             
             <v-card-actions class="roleField">
             
                <v-checkbox
                v-model="adminStatus"
                hide-details
                class="shrink mr-2 mt-0"                
                label="Admin">
                </v-checkbox>
             </v-card-actions>
            

          <v-btn class="deleteButton" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="editButtonSpec" text @click="changeHandler">Save</v-btn>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['editUser', 'projectId'],
    data () {
      return {
        userId: this.$store.state.user.userId,
        dialog: false,
        isAdmin: false,
        jobRole: this.editUser.projectJobRoleName,
      }
    },
    // created(){
    //     this.$axios.get (`users/project/${this.projectId}`)
    //         .then (response => {
    //         console.log("project users", response.data)
    //         this.projectUsers = response.data.data;
    //         })
    //         .catch (e => {
    //         console.log("error", e)
    //     })
    // },
    methods: {  
       async changeHandler() {
           console.log(this.isAdmin, this.jobRole)
       this.dialog = false
       let roleIdValue;
       if(this.isAdmin){
           roleIdValue = 2;
       } else {
           roleIdValue = 3;
       }
       let response;
       try{
         console.log("edituser",this.editUser)
          response = await this.$axios.$put(`/projects/${this.projectId}/users/${this.editUser.assigneeId}`, {
          assignerId: this.userId,
          assigneeJobRole: this.jobRole,
          assigneeProjectRole: roleIdValue
        })
        this.$store.dispatch('task/fetchProjectUserCompletionTasks', this.projectId)

       } catch(e){
          console.log("Error blocking user", e);
       }       
        console.log(response);      
        }
    },
    computed: {
        adminStatus: {
            get(){
                if( (this.editUser.projectRoleId === "1") || (this.editUser.projectRoleId === "2" )){
                  this.isAdmin = true;
                return true;
            } else {
                this.isAdmin = false;
                return false;
            }
        }, set(value) {
             this.isAdmin = value
        }            
        }
    },
  }
</script>

<style scoped>
.editUser{
background: #2EC973;
position: absolute;
border-radius: 5px;
font-style: normal;
font-weight: bold;
font-size: 13px;
line-height: 40px;
color: #FFFFFF;
}
.cancelUser{
background: #FF6161;
margin-left: 20px;
border-radius: 5px;
font-style: normal;
font-weight: bold;
font-size: 13px;
line-height: 40px;
color: #FFFFFF;
}
</style>
