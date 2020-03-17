<template>
    <div class="profileDetailsCover">
        <div class="blackBar profileBlackBar"></div>
        <div class="userImage profileUserImage">
          <v-img class="profileImage" src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </div>
        <div class="profileUserName">{{ user.firstName }} {{ user.lastName }} </div>
        <div class="submitButton profileButton">
                <v-list-item @click="postData()" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-account-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Edit profile details</v-list-item-title>
                    </v-list-item-content>
                        <div class="iconBackCircle"> <v-icon size="17" color="#0BAFFF">mdi-pencil-outline</v-icon></div>
                    </v-list-item>
                </div>
        <div class="userDetails ">
            <p class="userName"></p>
        </div>
         <div class="usersForms userDetailsForm profileForm">
        <form>
        <v-row
            class="mb-12 formRow" 
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input v-model="firstName"  placeholder="First Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="lastName"  placeholder="Last Name" class="formElements">
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
        <input  v-model="userName" disabled  placeholder="Email" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
           <input type="email" v-model="email"  placeholder="Email" class="formElements">
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
        <input type="password"  v-model="password"  placeholder="************" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
           <input type="password" v-model="confirmPassword"  placeholder="************" class="formElements">
            </v-col>
        </v-row>

        
        </form>
    </div>
        
    </div>
</template>

<script>
import EditProfile from '~/components/profile/editProfile'
import axios from 'axios'

export default {
    props: ['user'],
     components: {
      'edit-profile' : EditProfile
    },
    data: function(){
    return{
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        userId: this.user.userId
    }
    },
     methods: {
     async postData(){

         let response;
       try{
           response = await this.$axios.$put(`/users/138bbb3d-02ed-4d72-9a03-7e8cdfe89eff`, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        })
       }
       catch(e){
          console.log("Error edit user", e);
       } 
        console.log(response.message);
      }
    }
  }
  
 
</script>
