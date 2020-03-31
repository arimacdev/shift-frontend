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
        <input v-model.trim="$v.firstName.$model" placeholder="First Name" autocomplete="off" class="formElements">
        <div v-if="$v.firstName.$error && !$v.firstName.required" class="errorText"> First name is required</div>
        <div v-if="$v.firstName.$error && !$v.firstName.maxLength" class="errorText"> Cannot use more than 50 characters</div>
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model.trim="$v.lastName.$model" placeholder="Last Name" autocomplete="off" class="formElements">
            <div v-if="$v.lastName.$error && !$v.lastName.required" class="errorText"> Last name is required</div>
        <div v-if="$v.lastName.$error && !$v.lastName.maxLength" class="errorText"> Cannot use more than 50 characters</div>
           
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
        <input v-model.trim="$v.userName.$model" placeholder="User Name" autocomplete="off" class="formElements">
         <div v-if="$v.userName.$error && !$v.userName.required" class="errorText"> User name is required</div>
           
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input type="email" v-model.trim="$v.email.$model" placeholder="Email" autocomplete="off" class="formElements">
            <div v-if="$v.email.$error && !$v.email.required" class="errorText"> Email is required</div>
        <div v-if="$v.email.$error && !$v.email.email" class="errorText"> Use valid Email address</div>
           
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
         <input type="password" v-model.trim="$v.password.$model" placeholder="Password" autocomplete="off" class="formElements">
         <div v-if="$v.password.$error && !$v.password.required" class="errorText"> Password is required</div>
        <div v-if="$v.password.$error && !$v.password.minLength" class="errorText"> Password must be at least 6 characters</div>
           
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
             <input type="password" v-model.trim="$v.confirmPassword.$model" placeholder="Confirm Password" autocomplete="off" class="formElements">
        <div v-if="$v.confirmPassword.$error && !$v.confirmPassword.sameAs" class="errorText"> Passwords must be identical</div>
      
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
         <div @click="close">
            <component v-bind:is="component" ></component>
         </div>
            <!-- <success-popup /> -->
    </div>
    
</template>

<script>
import axios from 'axios'
import { numeric, required, between, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'

export default {
     components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },
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
        this.userName = '',
        this.firstName = '',
        this.lastName = '',
        this.email = '',
        this.password = '',
        this.confirmPassword = '',
        this.$v.$reset()
    //    alert("User created successfully!")
    this.component = 'success-popup'
        window.setTimeout(location.reload(), 8000)
       }  catch(e){
          console.log("Error creating user", e);
           this.component = 'error-popup'
        //   alert("Error creating user!")
       }   
      },
      handleSubmit(e) {
                this.submitted = true;
                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
      
      },
      close(){
                this.component = ''
            },
      
    },
    data(){
        return{
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            component: ''
        }
    },
    validations: {
        firstName: {
            required,
            maxLength: maxLength(50)
        },
        lastName: {
            required,
            maxLength: maxLength(50)
        },
        userName: {
            required,
        },
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        },
        confirmPassword: {
            sameAsPassword: sameAs('password')
        }
    }
    
}
</script>