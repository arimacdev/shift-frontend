<template>
    <div class="userDetailsCover">
        <div class="blackBar"></div>
        <div class="userImage">
          <v-img class="image" src="https://randomuser.me/api/portraits/men/22.jpg"></v-img>
        </div>
        <div class="userDetails">
            <p class="userName">{{userData.firstName}} {{userData.lastName}}</p>
        </div>
         <div class="usersForms userDetailsForm">
        <form>
        <v-row
            class="mb-12 formRow" 
            no-gutters
            >
                <v-col
                sm="6"
                md="6"
                
            >
        <input v-model="userData.firstName" disabled class="formElements">
            </v-col>
             <v-col
                sm="6"
                md="6"
                
            >
            <input v-model="userData.lastName" disabled placeholder="Last Name" class="formElements">
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
        <input type="email" v-model="userData.email" disabled placeholder="Email" class="formElements">
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
    props: ['userData'],
    name: 'viewUser',

    data: function(){
    return{
    }
    }
  }
  
 
</script>