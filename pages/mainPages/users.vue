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
            <v-list-item-title class="font-weight-medium">Users</v-list-item-title>
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
      <div class="users-list">

        <search-bar :users=users />
    

<div class="listView overflow-y-auto">

          <div v-for="(user, index) in users"
        :key="index"  v-on:click="component=''">
            <v-list-item @click="" >
               <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/30.jpg"></v-img>
        </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ user.firstName }} {{ user.lastName}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
               <div class="iconBckCircle"> <v-icon size="17" color="#0BAFFF">mdi-pencil-outline</v-icon></div>
              </v-list-item-action>
              <v-list-item-action>
               <div class="iconBckCircle"> <v-icon size="17" color="#FF6161">mdi-block-helper</v-icon></div>
              </v-list-item-action>
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
       
          </div>
</div>  
      </div>
            <keep-alive>
            <component v-bind:is="component" :users=users></component>
            </keep-alive>
    </div> 

</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import TabViews from '~/components/projects/tabViews'
import usersSearchBar from '~/components/tools/usersSearchBar'
import AddUser from '~/components/users/addUser'

export default {
    components: {
      'tab-views' : TabViews,
      'search-bar' : usersSearchBar,
      'add-user' : AddUser
    },
    data() {
      return {
        component:'add-user',
      }
    },

    async asyncData({ $axios }) {
    const { data: users } = await $axios.$get('/users')
    console.log(users)
    return { 
      users:users,
     }
  },

    methods: {
    },
  }
</script>


