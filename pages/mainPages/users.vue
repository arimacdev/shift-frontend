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
    <div class="name-div">
        <v-list-item>

           <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Users</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
           <button v-on:click="component='add-user'"><v-icon>mdi-plus-circle</v-icon></button>
          </v-list-item-icon>
<v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>
      </v-list-item>

    </div> 
  </div>
  
    </v-toolbar>
   
    <div class="body-div">
      <div class="users-list">

        <search-bar :users=users />
    

<div class="listView overflow-y-auto">

           <div v-for="(user, index) in users"
        :key="index" >
            <v-list-item @click="selectUser(user)" >
               <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/30.jpg"></v-img>
        </v-list-item-avatar>
              <v-list-item-content >
                <v-list-item-title @click="selectUser(user)"  v-on:click="component='view-user'" class="body-2">{{ user.firstName }} {{ user.lastName}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action @click="selectUser(user)"  v-on:click="component='edit-user'">
               <div class="iconBackCircle"> <v-icon size="17" color="#0BAFFF">mdi-pencil-outline</v-icon></div>
              </v-list-item-action>
              <!-- <v-list-item-action >
               <div class="iconBackCircle"> <v-icon size="17" color="#FF6161">mdi-block-helper</v-icon></div>
              </v-list-item-action> -->
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
       
          </div> 

         
</div>  
      </div>
             <keep-alive>
            <component v-bind:is="component" :name=name :projectId=projectId :userData=userData></component>
            </keep-alive>
    </div> 

</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import usersSearchBar from '~/components/tools/usersSearchBar'
import AddUser from '~/components/users/addUser'
import ViewUser from '~/components/users/viewUser'
import EditUser from '~/components/users/editUser'
import axios from 'axios'

export default {
    components: {
      'search-bar' : usersSearchBar,
      'add-user' : AddUser,
      'view-user' : ViewUser,
      'edit-user' : EditUser
    },
    data() {
      return {
        userId: this.$store.state.user.userId,
        component:'add-user',
      }
    },

    async asyncData({ $axios, store }) {
    let userId = store.state.user.userId;
    const { data: projects } = await $axios.$get(`/projects?userId=${userId}`)
    const { data: users } = await $axios.$get('/users')
    console.log(projects)
    console.log(users)
    return { 
      projects: projects,
      users:users,
       name: users[0].userId
     }
  },

    methods: {
       selectUser(userData){
     this.name=userData;
     this.userData = userData;
    }
    },
  }
</script>


