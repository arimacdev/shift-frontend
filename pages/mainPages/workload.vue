<template>
<div>
    <div class="top-nav">
<navigation-drawer :user=user />

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
            <v-list-item-title class="font-weight-medium">Workload</v-list-item-title>
          </v-list-item-content>

          
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
      <div class="workloadSideBar">

<v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4 searchBar"
          flat
          hide-no-data
          hide-details
          append-icon
          prepend-inner-icon="mdi-magnify"
          label="Search Here"
          solo-inverted
        ></v-autocomplete>

        <div class="listView overflow-y-auto">

  <div v-for="(user, index) in users"
        :key="index" >
            <v-list-item @click="selectUser(user)" >
               <v-list-item-avatar> 
                 <v-img v-if="user.profileImage != null" :src="user.profileImage"></v-img>
            <v-img v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img> 
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
  </div>



  </div>

</div>
</template>
<script>
import NavigationDrawer from '~/components/navigationDrawer'
import usersSearchBar from '~/components/tools/usersSearchBar'

export default {
  components: {
    NavigationDrawer
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
    return { 
      projects: projects,
      users:users,
       name: users[0].userId
     }
  },

async created() {

   let workloadResponse;
      workloadResponse = await this.$axios.$get(`/projects/tasks/users/workload`,
      {
        headers: {
          user: this.userId,
       }
      }
      ) 
      console.log("workload data",workloadResponse)
      this.workLoad = workloadResponse.data.data;
      
   
},
    methods: {
       selectUser(userData){
     this.name=userData;
     this.userData = userData;
    }
    },
}
</script>