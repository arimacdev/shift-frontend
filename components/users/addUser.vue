<template>
    <div class="formDiv usersForms">
        <form @submit.prevent="handleSubmit">
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
        <input v-model.trim="$v.firstName.$model" placeholder="First Name" class="formElements">
        <div v-if="$v.firstName.$error && !$v.firstName.required" class="errorText"> First name is required</div>
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
                <button class="submitButton addUserSubmit">
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
                </button>
            </v-col>
        </v-row>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { numeric, required, between, minLength } from 'vuelidate/lib/validators'

export default {
    methods: {
     async postData(){
      let response;
       try{
          response = await this.$axios.$post('/users', {
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
       alert("User created successfully!")
       }  catch(e){
          console.log("Error creating user", e);
          alert("Error creating user!")
       }   
      },
      handleSubmit(e) {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      
      }
      
    },
    data(){
        return{
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    },
    validations: {
        firstName: {
            required,
        }
    }
    
}
</script>