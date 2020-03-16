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
        <p class="addProjectTitle"> Create new user </p>
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
        <input v-model="firstName" placeholder="First Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="lastName" placeholder="Last Name" class="formElements">
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
        <input v-model="userName" placeholder="User Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="email" v-model="email" placeholder="Email" class="formElements">
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
             <input type="confirmPassword" v-model="confirmPassword" placeholder="Confirm Password" class="formElements">
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
                <div class="submitButton addUserSubmit">
                <v-list-item @click="postData()" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-account-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Register user details</v-list-item-title>
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
    methods: {
     async postData(){
      
        let response = await this.$axios.$post('/users', {
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        console.log(response.message);
        this.projectName = ''
        this.client = ''
        this.startDate = ''
        this.endDate = ''
      }
    }
}
</script>