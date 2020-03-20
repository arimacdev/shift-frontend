<template>
<div class="top-nav">
<navigation-drawer :user=user />

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

         <v-list-item-icon>
           <button v-on:click="component='add-project'"><v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon></button>
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
<v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Pre sales</v-toolbar-title>

          <div v-for="(project, index) in projects"
        :key="index"  v-on:click="component='tab-views'">
            <v-list-item @click="selectProject(project)" >
              <v-list-item-action>
                <v-icon size="20" color="deep-orange lighten-1">mdi-folder-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
       
          </div>
</div>  
      </div>
            <keep-alive>
            <component v-bind:is="component" :name=name :projectId=this.project.projectId :project=project :users=users :Alltasks=Alltasks :MyTasks=MyTasks :taskCompletion=taskCompletion :people=people></component>
            </keep-alive>
    </div> 

</div>
</template>

<script>
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
        Alltasks: [],
        MyTasks: [],
        taskCompletion: {},
        users: []
      }
    },

    async asyncData({ $axios }) {
    const { data: projects } = await $axios.$get('/projects?userId=138bbb3d-02ed-4d72-9a03-7e8cdfe89eff')
    const { data: users } = await $axios.$get('/users')
    // const { data: tasks } = await $axios.$get(`/projects/${p1}/tasks?userId=138bbb3d-02ed-4d72-9a03-7e8cdfe89eff`)

    console.log("projects list", projects)
    console.log("users list", users)
    // console.log("tasks list", tasks)
    
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
       
      this.$axios.get (`projects/${this.project.projectId}/tasks?userId=138bbb3d-02ed-4d72-9a03-7e8cdfe89eff`)
      .then (response => {
       console.log("all tasks data", response.data.data)
       this.Alltasks = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

      this.$axios.get (`projects/${this.project.projectId}/tasks/user?userId=138bbb3d-02ed-4d72-9a03-7e8cdfe89eff`)
      .then (response => {
       console.log("data", response.data)
       this.MyTasks = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

      this.$axios.get(`projects/${this.project.projectId}/tasks/completion`, {
         headers: {
          user: "138bbb3d-02ed-4d72-9a03-7e8cdfe89eff",
       }
      })
      .then (response => {
       console.log("task completion list", response.data)
       this.taskCompletion = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

        this.$axios.get (`users`)
      .then (response => {
       console.log("users data", response.data.data)
       this.users = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })

      this.$axios.get (`projects/${this.project.projectId}/tasks/138bbb3d-02ed-4d72-9a03-7e8cdfe89eff/completion/details`)
      .then (response => {
       console.log("tasks users data -->", response.data.data)
       this.people = response.data.data;
      })
      .catch (e => {
       console.log("error", e)
      })


      }
    }
  }
</script>


