<template>
  <v-toolbar app color dark fixed :clipped-left="clipped" class="tool-bar">
    <div class="title-div">
      <div class="name-div">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">Projects</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <button v-on:click="component='create-project'">
              <v-icon @click="selectProject('Create New Project')">mdi-plus-circle</v-icon>
            </button>
          </v-list-item-icon>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-list-item>
      </div>
      <div class="content-div">
        <v-list-item-title class="font-weight-bold">{{ name }}</v-list-item-title>
      </div>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  props: ["name"]
};
</script>

<style scoped>
.name-div {
  width: 20%;
  float: left;
}
.content-div {
  width: 80%;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>