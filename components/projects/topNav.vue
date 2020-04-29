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
.tool-bar {
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: #080848 !important;
}
.top-nav {
  margin-top: -12px;
  margin-left: -12px;
  margin-right: -12px;
}
.title-div {
  width: 100%;
  height: 100%;
}
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