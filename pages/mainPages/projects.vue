<template>
<div class="top-nav">
<!-- <top-nav :name="name"/> -->

 <v-toolbar app
      color="indigo darken-4"
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
            <nuxt-link :to="'../'"> <v-icon>mdi-plus-circle</v-icon></nuxt-link>
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

        <search-bar />
    

<div class="grey lighten-4 projects overflow-y-auto">
<v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Ongoing</v-toolbar-title>

          <div v-for="(game, index) in games"
        :key="index">
            <v-list-item @click="selectProject(game.name)" >
              <v-list-item-action>
                <v-icon size="20" color="deep-orange lighten-1">mdi-folder-outline</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ game.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <v-divider class="mx-4"></v-divider>
       
          </div>
</div>  
      </div>
    
          <tab-views :name="name"  />
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
      'top-nav' : TopNav
    },

    async asyncData({ $axios }) {
    const { data: games } = await $axios.$get('https://api.staging.imigames.io/api/v1/lgo/game')
    // console.log(games)
    return { 
      games: games
     }
  },

   
    methods: {
       selectProject(game){
     this.name=game
    }
    },
  }
</script>

<style scoped>
.tool-bar{
  position: fixed;
  width: 100%;
  z-index: 100;
}
.top-nav{
  margin-top: -12px;
  margin-left: -12px;
  margin-right: -12px;
}
.title-div{
  width: 100%;
  height: 100%;
}
.name-div{
  width: 20%;
  float: left;
}
.content-div{
  width: 80%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.body-div{
  padding-top: 80px;
  width: 100%;
}
.project-list{
   width: 20%;
  float: left;
  /* padding-left: 12px; */
  padding-top: 10px;
}
.body-tabs{
  width: 80%;
  height: 100%;
  float: left;
}

.projects{
  margin-top: 10px;
  height: 80vh;
}
.titles{
  padding-top: 20px;
  padding-left: 20px;
}
.search-bar{
  height: 10px;
}
.tabs{
  padding-left: 10px;
  box-shadow: none !important
}
.tool-bar{
  position: fixed;
  width: 100%;
  z-index: 100;
}
.top-nav{
  margin-top: -12px;
  margin-left: -12px;
  margin-right: -12px;
}
.title-div{
  width: 100%;
  height: 100%;
}
.name-div{
  width: 20%;
  float: left;
}
.content-div{
  width: 80%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
