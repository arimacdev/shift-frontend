<template>
    <div class="profileDetailsCover">
        <div class="blackBar profileBlackBar"></div>
        <div class="userImage profileUserImage">
          <v-img class="profileImage" :src="user.profileImage"></v-img>
          
          <div class="profilePictureUpload">
              <form>
              <template>
                <input type="text" onfocusin="(this.type='file')" onfocusout="(this.type='file')" placeholder="Select profile picture" id="files" ref="files" v-on:change="handleFileUploads()" class="formElements fileUpload"/>
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
         <!-- <div v-if="$v.password.$error && !$v.password.required" class="errorText"> Password is required</div> -->
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
        <button @click="slackAuth">CLICK!!!!!</button>
          <div>
      <a href="https://slack.com/oauth/v2/authorize?scope=incoming-webhook,chat:write&client_id=345426929140.1020110511447&redirect_uri=http://localhost:3000/mainPages/profile">
      <img alt="Join Slack Notifications" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
      </a>
    </div>

        <div @click="close">
            <component v-bind:is="component" ></component>
         </div>
        <!-- <success-popup /> -->
    
    </div>
    
</template>


<script>
import EditProfile from '~/components/profile/editProfile'
import axios from 'axios'
import qs from 'qs';
import { required, minLength, sameAs} from 'vuelidate/lib/validators'
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'


export default {
    props: ['user'],
     components: {
      'edit-profile' : EditProfile,
       'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
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
        dismissCountDown: 0,
         component: ''
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

    created: function(){
      const authCode = this.$route.query.code;
      console.log("SLACK CODE", authCode);
      if(authCode !== undefined){
            console.log("Slack Auth code present");
            axios({
            method: 'post',
            url: 'https://slack.com/api/oauth.v2.access',
            data: qs.stringify({
              client_id: '345426929140.1020110511447',
              client_secret: 'fd851b7af77e525c1700879de9b328ab',
              code: authCode
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          }).then (async resp => {
            const slackId = resp.data.authed_user.id;
            console.log("User Slack Id", slackId)
               let response;
                  try{
                    response = await this.$axios.$put(`/users/${this.userId}/slack`, {
                     slackAssignerId: this.userId,
                    slackAssigneeId: this.user.userId,
                    assigneeSlackId: slackId
                  },
                    {
                        headers: {
                            'userId': this.userId
                        }
                      }
                  )
                  console.log("Slack Id saved successfuly", response);
                } catch(e){
                    console.log("Error saving slack Id in database", e);
                 }  
          })
          .catch (e => {
          console.log("error from slack", e)
          })
      } else {
        console.log("No Slack Auth Code Present");
      }
    },
    
     methods: {
       slackAuth(){
         console.log("TYYE ----> ", this.userId);
         console.log("store")
    //      const authCode = this.$route.query.code;
    //      console.log("auth code", this.$route.query.code);
    //      axios({
    //   method: 'post',
    //   url: 'https://slack.com/api/oauth.v2.access',
    //   data: qs.stringify({
    //     client_id: '345426929140.1020110511447',
    //     client_secret: 'fd851b7af77e525c1700879de9b328ab',
    //     code: authCode
    //   }),
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   }
    // }).then (response => {
    // console.log("Success slack", response.data.authed_user.id)
    // })
    // .catch (e => {
    // console.log("error from slack", e,response.data)
    // })
  },

    async saveSlackId(slackId){
        console.log("Save Slack Id", );
      //   let response;
      //     try{
      //     response = await this.axios.post(`/users/${this.projectId}/slack`, 
      //     {
      //       slackAssignerId: this.userId,
      //       slackAssigneeId: this.user.userId,
      //       assigneeSlackId: slackId
      //     }
      //   )
      //  } catch(e){
      //    console.log("Error saving slack Id in database");
      //  }
          
    },

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
         this.component = 'success-popup'
        // window.setTimeout(location.reload(), 8000)
        console.log(response.message);
       }
       catch(e){
          console.log("Error edit user", e);
           this.component = 'error-popup'
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
      close(){
                this.component = ''
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
          location.reload();
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


