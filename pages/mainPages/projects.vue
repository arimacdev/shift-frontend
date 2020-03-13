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
            <v-list-item-title class="font-weight-medium">Projects</v-list-item-title>
          </v-list-item-content>

         <v-list-item-icon>
           <button v-on:click="component='create-project'"><v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon></button>
          </v-list-item-icon>
<v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>
      </v-list-item>

      
  </div>
  <div class="content-div">
    <v-list-item-title class="font-weight-bold">{{ name }}</v-list-item-title>
  </div>
</div>
    </v-toolbar>
   
    <div class="body-div">
      <div class="project-list">

        <search-bar :projects=projects />
    

<div class="projects overflow-y-auto">
<v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Ongoing</v-toolbar-title>

          <div v-for="(project, index) in projects"
        :key="index"  v-on:click="component='tab-views'">
            <v-list-item @click="selectProject(project.projectName, project.projectId)" >
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
            <component v-bind:is="component" :name=name :projectId=projectId :users=users></component>
            </keep-alive>
    </div> 

</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'
import TabViews from '~/components/projects/tabViews'
import ProjectList from '~/components/projects/projectList'
import TopNav from '~/components/projects/topNav'
import SearchBar from '~/components/tools/searchBar'
import CreateProject from '~/components/projects/createProject'

export default {
 props: ['name'],
  data: function(){
      return{
        name: ''
      };
  },
   name: 'projects',
    components: {
      'tab-views' : TabViews,
      'search-bar' : SearchBar,
      'project-list' : ProjectList,
      'top-nav' : TopNav,
      'create-project' : CreateProject
    },
    data() {
      return {
        component:'tab-views',
      }
    },

    async asyncData({ $axios }) {
    const { data: projects } = await $axios.$get('/projects?userId=138bbb3d-02ed-4d72-9a03-7e8cdfe89eff')
    const { data: users } = await $axios.$get('/users')
    console.log(projects)
    console.log(users)
    return { 
      projects: projects,
      users:users
     }
  },
  
    methods: {
       selectProject(project, projectId){
     this.name=project;
     this.projectId = projectId;
    }
    },
  }
</script>


