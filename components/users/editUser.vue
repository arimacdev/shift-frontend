<template>
    <div class="formDiv usersForms">
        <form>
        <v-row
            class="mb-12 formRow"
            no-gutters
            >
            <v-col
            sm="12"
            md="12"
            class="textGrid "
      >
        <p class="addProjectTitle"> Edit user </p>
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
        <input v-model="userData.firstName" name="firstname" placeholder="First Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="userData.lastName" name="lastname" placeholder="Last Name" class="formElements">
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
        <input v-model="userName" disabled placeholder="User Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="email" v-model="userData.email" name="email"  placeholder="Email" class="formElements">
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
         <input type="password" v-model="password" placeholder="Password" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
             <input type="password" v-model="confirmPassword" placeholder="Confirm Password" class="formElements">
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
                <div class="submitButton editUserSubmit">
                <v-list-item @click="postData()" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-account-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Save changes</v-list-item-title>
                    </v-list-item-content>
                        <v-icon>mdi-plus-circle</v-icon>
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
         props: ['userData'],
        name: 'editUser',
        data: function () {
  return {
    userId: this.userData
  }
        },
        
    methods: {
     async postData(){
          let response;
       try{
        response = await this.$axios.$put(`/users/${this.userData.userId}`, {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          email: this.userData.email,
        })
      }
       catch(e){
          console.log("Error edit user", e);
       } 
        

        console.log(response.message);
        this.projectName = ''
        this.client = ''
        this.startDate = ''
        this.endDate = ''
      }
    }
}
</script>