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
    @change="onSelectGroup()"
    clearable
  ></v-autocomplete>
</template>

<script>
export default {
  props: ["groups"],
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
    onSelectGroup() {
      if (this.select !== undefined) {
        this.$emit("searchGroupSelected", this.select);
      }
    },
    querySelections(v) {
      let groupSearchList = this.groups;
      for (let index = 0; index < groupSearchList.length; ++index) {
        let group = groupSearchList[index];
        this.states.push({ name: group.taskGroupName, id: group });
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