<template>
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
</template>

<script>
export default {
    data () {
      return {

        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
     
      }
    },
}
</script>

<style scoped>
.tabs{
  padding-left: 10px;
  box-shadow: none !important
}
</style>