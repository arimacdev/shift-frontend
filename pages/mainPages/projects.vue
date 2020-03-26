<template>
<div class="top-nav">
<navigation-drawer :user=user :currentUser="currentUser" />

 <v-toolbar app
      color=""
      dark fixed 
      
      class="tool-bar"
    >
<div class="title-div">
  <div class="name-div">
   
        <v-list-item>

           <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Projects</v-list-item-title>
          </v-list-item-content>

         <v-list-item-icon v-if="user_org_role === 'SUPER_ADMIN'">
           <button v-on:click="component='add-project'"><v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon></button>
          </v-list-item-icon>
          <v-list-item-icon v-else>
           <!-- <button v-on:click="component='add-project'"><v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon></button> -->
          </v-list-item-icon>
  <v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>
      </v-list-item>

      
  </div>
  <div class="content-div">
    <v-list-item-title class="font-weight-bold">{{ this.project.projectName }}</v-list-item-title>
  </div>
</div>
    </v-toolbar>
   
    <div class="body-div">
      <div class="project-list">

        <search-bar :projects=projects />
    

<div class="listView overflow-y-auto">

  <!-- --------------- ongoing loop ----------- -->
<v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Ongoing</v-toolbar-title>


          <div v-for="(project, index) in projects"
        :key="index"  v-on:click="component='tab-views'">
            <v-list-item v-if="project.projectStatus == 'ongoing'" @click="selectProject(project)" >
              <v-list-item-action>
                <v-icon size="20" color="#FFC212">mdi-folder-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <!-- <v-divider class="mx-4"></v-divider> -->
       
          </div>

<!-- --------------- Support loop ----------- -->
<v-divider class="mx-4"></v-divider>
          <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Support</v-toolbar-title>

          <div v-for="(project, index) in projects"
        :key="index"  v-on:click="component='tab-views'">
            <v-list-item v-if="project.projectStatus == 'support'" @click="selectProject(project)" >
              <v-list-item-action>
                <v-icon size="20" color="#ED5ED1">mdi-folder-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <!-- <v-divider class="mx-4"></v-divider> -->
       
          </div>
<!-- --------------- Finished loop ----------- -->
<v-divider class="mx-4"></v-divider>
          <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Finished</v-toolbar-title>

          <div v-for="(project, index) in projects"
        :key="index"  v-on:click="component='tab-views'">
            <v-list-item v-if="project.projectStatus == 'finished'" @click="selectProject(project)" >
              <v-list-item-action>
                <v-icon size="20" color="#0BAFFF">mdi-folder-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <!-- <v-divider class="mx-4"></v-divider> -->
       
          </div>
<!-- --------------- Pre sales loop ----------- -->
<v-divider class="mx-4"></v-divider>
            <v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Pre sales</v-toolbar-title>

          <div v-for="(project, index) in projects"
        :key="index"  v-on:click="component='tab-views'">
            <v-list-item v-if="project.projectStatus == 'presales'" @click="selectProject(project)" >
              <v-list-item-action>
                <v-icon size="20" color="deep-orange lighten-1">mdi-folder-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <!-- <v-divider class="mx-4"></v-divider> -->
       
          </div>
</div>  
      </div>
            <keep-alive>
            <component v-bind:is="component" :name=name :projectId=this.project.projectId :project=project :users=users :Alltasks=Alltasks :MyTasks=MyTasks :taskCompletion=taskCompletion :people=people :taskLog="taskLog"></component>
            </keep-alive>
    </div> 

</div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationDrawer from '~/components/navigationDrawer'
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import TabViews from '~/components/projects/tabViews'
import SearchBar from '~/components/tools/searchBar'
import AddProject from '~/components/projects/addProject'
export default {
    components: {
      NavigationDrawer,
      'tab-views' : TabViews,
      'search-bar' : SearchBar,
      'add-project' : AddProject
    },
    data() {
      return {
        component:'tab-views',
        project: {},
        taskLog: [],
        Alltasks: [],
        MyTasks: [],
        taskCompletion: {},
        users: [],
        user_org_role : this.$store.state.user.organizationalRole,
        access_token: this.$store.state.user.access_token,
        userId: this.$store.state.user.userId
       
      }
    },

    async asyncData({ $axios, app, store }) { 
    let userId = store.state.user.userId;
    const { data: projects } = await $axios.$get(`/projects?userId=${userId}`)
    const { data: users } = await $axios.$get('/users')
    const { data: currentUser } = await $axios.$get(`/users/${userId}`)
    // const { data: tasks } = await $axios.$get(`/projects/${p1}/tasks?userId=138bbb3d-02ed-4d72-9a03-7e8cdfe89eff`)
    // console.log("projects list", projects)
    // console.log("users list", users)
    // console.log("tasks list", tasks)    
    // console.log("Current user", currentUser) 
    return { 
      projects: projects,
      users:users,
      // tasks: tasks,
       project: projects[0],
       people : []       
     }
  },

    methods: {
    selectProject(project){
     this.project = project;

    this.$store.dispatch('task/fetchTasksAllTasks', this.project.projectId)
    this.$store.dispatch('task/fetchTasksMyTasks', this.project.projectId)

    //  console.log("userId", this.userId)
    //  console.log("access_token", this.access_token)     
    //    //Get all projects for now
    //   this.$axios.get (`projects/${this.project.projectId}/tasks?userId=${this.userId}`)
    //   .then (response => {
    //    this.Alltasks = response.data.data;
    //   })
    //   .catch (e => {
    //    console.log("error", e)
    //   })

      // this.$axios.get (`/users/${this.userId}`)
      // .then (response => {
      //  this.currentUser = response.data.data;
      //  console.log(this.currentUser)
      // })
      // .catch (e => {
      //  console.log("error", e)
      // })

      // this.$axios.get (`projects/${this.project.projectId}/tasks/user?userId=${this.userId}`)
      // .then (response => {
      // //  console.log("data", response.data)
      //  this.MyTasks = response.data.data;
      // })
      // .catch (e => {
      //  console.log("error", e)
      // })

      this.$axios.get(`projects/${this.project.projectId}/tasks/completion`, {
         headers: {
          user: this.userId,
       }
      })
      .then (response => {
      //  console.log("task completion list", response.data)
       this.taskCompletion = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

        this.$axios.get (`users`)
      .then (response => {
      //  console.log("users data", response.data.data)
       this.users = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

     this.$axios.get(`log/${this.project.projectId}`)
      .then (response => {
        console.log("task log", response.data.data);
       this.taskLog = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

      this.$axios.get (`projects/${this.project.projectId}/tasks/${this.userId}/completion/details`)
      .then (response => {
       console.log("tasks users data -->", response.data.data)
       this.people = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })
      },
      computed: mapState({
        organizationalRole: state => state.user.organizationalRole
      })
    }
  }
</script>


