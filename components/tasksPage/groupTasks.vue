<template>
    <div class="personal-task-tab">   
        <!-- tabs body -->
              <div>
             <v-card class="tabs">
      <v-tabs>
          <v-tab>
            Tasks
          </v-tab>
          <v-tab>
            People
          </v-tab>
          
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
            test 1 - tasks
      </v-tab-item>
    
      <v-tab-item>
        <v-divider class="mx-4"></v-divider>
        <v-card flat>
       test 2 - people
        </v-card>
      </v-tab-item>
     
    </v-tabs>
  </v-card>
  </div>
       

</div>
</template>

<script>

  export default {
     data () {
      return {
        drawer: null,
        userId: this.$store.state.user.userId,
        items: [          
        ],
        taskCompletion: {}
      }
    },
    name: 'tabViews',
    components: {
     
    },
    methods: {
      onSelectProject() {
     
      } 

    },
  }
</script>

<style scoped>
.tabs{
  padding-left: 10px;
  box-shadow: none !important;
}
.wrapper{
  width: 100%;
}

</style>