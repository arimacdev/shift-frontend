<template>
     <div class="taskContent">

       <div class="allTasksDropDown">
              {{projectId}}
              <!-- <v-select
                v-model="client"
                :items="items"
                :error-messages="errors"
                label="Client"
                data-vv-name="select"
                required
                class=""
              filled
              flat
              ></v-select> -->
       </div>
       <div >
        <div v-for="(project, index) in projects"
        :key="index" class="taskList">
            <v-list-item @click="" >
              <v-list-item-action>
              <div class="round">
                <input type="checkbox" name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ project.projectName }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-content class="updatedDate">
                <v-list-item-title class="body-2">Yesterday</v-list-item-title>
              </v-list-item-content>
               <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/89.jpg"></v-img>
        </v-list-item-avatar>
            </v-list-item>
        </div>
       </div>
    </div>
</template>

<script>

  export default {
     props: ['projectId'],
    name: 'allTasks',
    components: {
      
    },
  }
</script>

<style scoped>

</style>