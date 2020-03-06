<template>
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
</template>

<script>

export default {
   
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