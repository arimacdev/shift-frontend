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
          @change="test()"
        ></v-autocomplete>

        <div class="listView overflow-y-auto">
  <div v-for="(user, index) in taskWorkLoadUsers"
        :key="index" >
            <v-list-item @click="selectUser(user)" class="workloadListItem">
               <v-list-item-avatar> 
                 <v-img v-if="user.profileImage != null" :src="user.profileImage"></v-img>
            <v-img v-else src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"></v-img> 
        </v-list-item-avatar>
              <v-list-item-content >
                <v-list-item-title @click="selectUser(user)"  v-on:click="component='view-user'" class="body-2">{{ user.firstName }} {{ user.lastName}}</v-list-item-title>
              </v-list-item-content>
               <v-divider vertical inset class="workloadDivider"></v-divider>
<v-list-item-content>
               <v-task-title class="workloadCompletedStatus">{{ user.tasksCompleted + "/" + user.totalTasks + " Tasks completed"}}</v-task-title>

            <v-list-item-subtitle class="workloadProgressLine"> 

                    <v-progress-linear
                        :value="(user.tasksCompleted/user.totalTasks)*100"
                        color="#2EC973"
                        height="8"
                        rounded
                        reactive
                        >
                        <!-- <template v-slot="{ value }"> -->
                            <template>
                            <!-- <span class="presentageValue">{{ Math.ceil(value) }}%</span> -->
                        </template>
                        </v-progress-linear>

                        </v-list-item-subtitle>
</v-list-item-content>
        <div v-if="(user.tasksCompleted/user.totalTasks)*100 < 25" class="progressColorCode progressBad"> </div>
        <div v-else-if="(user.tasksCompleted/user.totalTasks)*100 >= 25 && (user.tasksCompleted/user.totalTasks)*100 < 75 " class="progressColorCode progressFair"> </div>
        <div v-else-if="(user.tasksCompleted/user.totalTasks)*100 >= 75" class="progressColorCode progressGood"> </div>
        <div v-else-if="user.totalTasks == 0" class="progressColorCode progressNoWorks"> </div>
        
           
        
            
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
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    NavigationDrawer
  },
   data() {
      return {
        userId: this.$store.state.user.userId,
        component:'add-user',
        workLoad: {},
         skill: '',
         search: null,
        select: null,
        states: [
          
        ],
      }
    },

 watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
 },
 created() {

      this.$store.dispatch('workload/fetchAllTaskLoadUsers')

   
},
    methods: {
        test(){
            console.log("------ details ---> " + this.select)
        },
          selectUser(userData){
     this.userData = userData;
    },
      querySelections (v) {
        let projectSearchList = this.workLoad;
        for (let index = 0; index < projectSearchList.length; ++index) {
            let user = projectSearchList[index];
            this.states.push(user.firstName + " " + user.lastName);
        }
        console.log("usersList", this.users, "nameList", this.states)
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      }
    },
    computed: {
      ...mapState({
          taskWorkLoadUsers: state => state.workload.taskWorkLoadUsers,
      })
    },
}
</script>