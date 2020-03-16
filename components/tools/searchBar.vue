<template>
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
          'SAIV',
          'IMI',
          'KDR',
          'Arizona',
          'Arkansas',
          
        ],
      }
    },
   
    watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        let projectSearchList = this.projects;
        for (let index = 0; index < projectSearchList.length; ++index) {
            let project = projectSearchList[index];
            this.states.push(project.projectName);
        }
        console.log("projectsList", this.projects, "nameList", this.states)
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
.searchBar{
  background-color: #EDF0F5 !important;
}
</style>