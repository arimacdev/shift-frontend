<template>
<div class="top-nav">
   <v-toolbar app
      color=""
      dark fixed app :clipped-left="clipped"
      class="tool-bar"
    >
<div class="title-div">
  <div class="name-div">
   
        <v-list-item>

           <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Projects</v-list-item-title>
          </v-list-item-content>

         <v-list-item-icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-icon>
<v-divider
      class="mx-4"
      inset
      vertical
    ></v-divider>
      </v-list-item>

      
  </div>
  <div class="content-div">
    <v-list-item-title class="font-weight-bold">REDD MRI</v-list-item-title>
  </div>
</div>
    </v-toolbar>
   
   
    <div class="body-div">
      <div class="project-list">
    

        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          append-icon
          prepend-inner-icon="mdi-magnify"
          label="Search Here"
          solo-inverted
        ></v-autocomplete>

    

<div class="grey lighten-4 projects">
<v-toolbar-title class="grey--text text--darken-2 font-weight-bold titles">Ongoing</v-toolbar-title>

          <div v-for="(game, index) in games"
        :key="index">

            <v-list-item @click="" >
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
      <div class="body-tabs">   
        <!-- tabs body -->
              <div>
             
             <v-card class="tabs">
    <v-tabs
      v-model="tab"
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Tasks
      </v-tab>

      <v-tab href="#tab-2">
        Board
      </v-tab>

      <v-tab href="#tab-3">
        People
      </v-tab>

    <v-tab href="#tab-4">
        Projects
      </v-tab>

    <v-tab href="#tab-5">
        Files
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 5"
        :key="i"
        :value="'tab-' + i"
      >
      <v-divider ></v-divider>
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  </div>
       
      </div>
    </div>
</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import axios from 'axios'

export default {

   name: 'projects',
    components: {},

    async asyncData({ $axios }) {
    const { data: games } = await $axios.$get('lgo/game')
    console.log(games)
    return { 
      games: games
     }
  },
  // async asyncData () {
  //   const {data} = await axios.get('http://jsonplaceholder.typicode.com/posts')
  //   return {articles:data}
  // },
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: null,
        states: [
          'SAIV',
          'IMI',
          'KDR',
          'Arizona',
          'Arkansas',
          
        ],

        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     
      }
    },
   
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      },
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
</style>
