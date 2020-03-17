<template>
    <div class="profileDetailsCover">
        <div class="blackBar profileBlackBar"></div>
        <div class="userImage profileUserImage">
          <v-img class="profileImage" src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </div>
        <div class="profileUserName">Indika Wijesooriya</div>
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
        <input v-model="user" disabled placeholder="First Name" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="b" disabled placeholder="Last Name" class="formElements">
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
        <input type="email" v-model="c" disabled placeholder="Email" class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
           
            </v-col>
        </v-row>


        
        </form>
    </div>
        
    </div>
</template>

<script>

export default {
    props: ['user'],
    data: function(){
    return{
        
    }
    }
  }
  
 
</script>
