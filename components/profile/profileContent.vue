<template>
    <div class="profileDetailsCover">
        <div class="blackBar profileBlackBar"></div>
        <div class="userImage profileUserImage">
          <v-img class="profileImage" :src="user.profileImage"></v-img>
          
          <div class="profilePictureUpload">
              <form>
              <template>
                <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Upload profile picture" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload"/>
                <!-- <v-file-input id="files" ref="files" v-on:change="handleFileUploads()"  prepend-icon="mdi-camera" chips label="Upload profile picture"></v-file-input> -->
              </template>
              <div class="pictureUploadButton">
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="#0BAFFF"
                class="ma-2 white--text"
                @click="submit()"
                x-small
                >
                Upload
                <v-icon right dark>mdi-upload</v-icon>
                </v-btn>
              </div>
              </form>
           </div>
        </div>
        <form @submit.prevent="handleSubmit">
        <div class="profileUserName">{{ user.firstName }} {{ user.lastName }} </div>
        <button class="submitButton profileButton">
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
                </button>
        <div class="userDetails ">
            <p class="userName"></p>
        </div>
        
         <div class="usersForms userDetailsForm profileForm">
             
        
            
            
        <v-row
            class="mb-12 formRow" 
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input v-model="user.firstName"  placeholder="First Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="user.lastName"  placeholder="Last Name" class="formElements">
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
        <input  v-model="user.userName" disabled  placeholder="Username" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
           <input type="email" v-model="user.email"  placeholder="Email" class="formElements">
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
        <!-- <input type="password"  v-model="password"  placeholder="************" class="formElements"> -->

        <input type="password" v-model.trim="$v.password.$model" placeholder="New password (Change if needed) " class="formElements">
         <div v-if="$v.password.$error && !$v.password.required" class="errorText"> Password is required</div>
        <div v-if="$v.password.$error && !$v.password.minLength" class="errorText"> Password must be at least 6 characters</div>
          
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
           <input type="password" v-model.trim="$v.confirmPassword.$model" placeholder="Confirm Password" class="formElements">
        <div v-if="$v.confirmPassword.$error && !$v.confirmPassword.sameAs" class="errorText"> Passwords must be identical</div>
       </v-col>
        </v-row>
    </div>
        </form>
    </div>
    
</template>

<script>
import EditProfile from '~/components/profile/editProfile'
import axios from 'axios'
import { required, minLength, sameAs} from 'vuelidate/lib/validators'

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
    }
    },
    data () {
      return {
        loader: null,
        loading: false,
          password: '',
            confirmPassword: '',
            file: '',
        userId: this.$store.state.user.userId,
        dismissSecs: 5,
        dismissCountDown: 0
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
     methods: {
     async postData(){

         let response;
       try{
           response = await this.$axios.$put(`/users/${this.userId}`, {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          password: this.user.password,

        })
        //  location.reload();
        console.log(response.message);
       }
       catch(e){
          console.log("Error edit user", e);
          // alert("Error updating user!")
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
       submit () {
         try{
        let formData = new FormData();
        formData.append('files', this.file);
        formData.append('type', 'profileImage')

        this.$axios.$post(`/user/profile/upload`,
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'user': this.userId
              }
            }
          ).then(function(res){
            console.log('File upload successful', res.data);
          })
          .catch(function(){
            console.log('File Upload Failed');
          });
         } catch (e){
           console.log(e)
         }
        // this.$refs.observer.validate()
         
      },
      handleFileUploads(e){
        try{
            console.log(this.$refs.files.files)
         this.file = this.$refs.files.files[0];
        } catch(e){
            console.log(e)
        }
        
      },
    },
     validations: {
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


