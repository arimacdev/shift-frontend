<template>
<div class="top-nav">
<!-- <top-nav :name="name"/> -->

 <v-toolbar app
      color=""
      dark fixed 
      :clipped-left="clipped"
      class="tool-bar"
    >
<div class="title-div">
   
        <v-list-item>

           <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Profile</v-list-item-title>
          </v-list-item-content>

        
<v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>
      </v-list-item>

      
  </div>
  
    </v-toolbar>
   
    <div class="body-div">

             <keep-alive>
            <component v-bind:is="component" :name=name :user=user></component>
            </keep-alive>
    </div>

</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import ProfileContent from '~/components/profile/profileContent'
import axios from 'axios'

export default {
    components: {
      'profile-content' : ProfileContent
    },
    data() {
      return {
        component:'profile-content',
      }
    },

      async asyncData({ $axios }) {
    const { data: user } = await $axios.$get('/users/138bbb3d-02ed-4d72-9a03-7e8cdfe89eff')
    console.log("user data")
    return { 
      user:user,
       name: user.userId
     }
  },

    methods: {
       selectProject(userData){
     this.name=userData;
     this.userData = userData;
    }
    },
  }
</script>
