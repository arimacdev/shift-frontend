<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <div class="iconBackCircle"> <v-icon v-on="on" size="17" color="#0BAFFF">mdi-pencil-outline</v-icon></div>
      </template>
      <v-card>
        <v-card-title class="headline">Update the Role and Admin for</v-card-title>
        <v-card-text>
             {{editUser.assigneeFirstName}} {{editUser.assigneeLastName}}
             <span><h3>Role</h3></span>
             <span>
                 <input type="text" v-model="jobRole">
             </span>
             <span>
                <v-checkbox
                v-model="adminStatus"
                hide-details
                class="shrink mr-2 mt-0"                
                label="Admin">
                </v-checkbox>
             </span>
             </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="editUser" text @click="changeHandler">Edit</v-btn>
          <v-btn class="cancelUser" text @click="dialog = false">Cancel</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['editUser', 'projectId'],
    data () {
      return {
        dialog: false,
        isAdmin: false,
        jobRole: this.editUser.projectJobRoleName,
      }
    },
    created(){
        this.$axios.get (`users/project/${this.projectId}`)
            .then (response => {
            console.log("project users", response.data)
            this.projectUsers = response.data.data;
            })
            .catch (e => {
            console.log("error", e)
        })
    },
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
          response = await this.$axios.$put(`/projects/${this.projectId}/users/${this.editUser.userId}`, {
          assignerId: '138bbb3d-02ed-4d72-9a03-7e8cdfe89eff',
          assigneeJobRole: this.jobRole,
          assigneeProjectRole: roleIdValue
        })
       } catch(e){
          console.log("Error blocking user", e);
       }       
        console.log(response);      
        },       
    },
    computed: {
        adminStatus: {
            get(){
                if( (this.editUser.projectRoleId === "1") || (this.editUser.projectRoleId === "2" )){
                return true;
            } else {
                this.isAdmin = false;
                return false;
            }
        }, set() {
             this.isAdmin = !this.isAdmin
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
