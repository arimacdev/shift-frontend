<template>
    <div class="userDetailsCover">
        <div class="blackBar"></div>
        <div class="userImage">
          <v-img class="image" src="https://randomuser.me/api/portraits/men/22.jpg"></v-img>
        </div>
        <div class="userDetails ">
            <p class="userName"></p>
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
        <input v-model="a" disabled class="formElements">
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
    data: function(){
    return{
    }
    }
  }
  
 
</script>