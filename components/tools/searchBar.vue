<template>
    <v-autocomplete
          v-model="select"
          :loading="loading"
           :items="states"
           item-text="name"
          item-value="id"
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
          @change="onSelectProject()"
        ></v-autocomplete>
</template>

<script>

export default {
   props: ["projects"],
    data () {
      return {
        loading: false,
        items: [],
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
    methods: {
      onSelectProject(){
         if(this.select !== undefined){
        this.$emit('selectSearched', this.select);
         }
      },
      querySelections (v) {
        let projectSearchList = this.projects;
        for (let index = 0; index < projectSearchList.length; ++index) {
            let project = projectSearchList[index];
            this.states.push({name: project.projectName, id: project});
        }
        console.log("projectsList", this.projects, "nameList", this.states)
        this.loading = true
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        })
        this.loading = false
      },
    },
  }
</script>

<style scoped>
.searchBar{
  background-color: #EDF0F5 !important;
}
</style>