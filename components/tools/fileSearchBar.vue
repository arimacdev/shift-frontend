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
    outlined
    @change="onSelectProjectFile()"
    clearable
  ></v-autocomplete>
</template>

<script>
export default {
  props: ["AllprojectFiles"],
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: []
    };
  },

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    onSelectProjectFile() {
      if (this.select !== undefined) {
        console.log("selected file: " + this.select);
        window.open(this.select, "_blank");
      }
      this.select = "";
      if (this.select !== undefined) {
        this.$emit("selectSearched", this.select.projectFileName);
      }
    },
    querySelections(v) {
      let projectFileSearchList = this.AllprojectFiles;
      for (let index = 0; index < projectFileSearchList.length; ++index) {
        let projectFile = projectFileSearchList[index];
        this.states.push({
          name: projectFile.projectFileName,
          id: projectFile.projectFileUrl
        });
      }
      // console.log("projectsList", this.projects, "nameList", this.states)
      this.loading = true;
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      });
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.searchBar {
  background-color: #edf0f5 !important;
}
</style>