<template>
   <div class="">
      <div class="projectListUserSupport">
         <v-list-item-group>
          <div
            class="projectListView overflow-y-auto"
            style="padding-left: 20px; padding-right: 5px; padding-top: 20px"
          >

           <div
                style="margin-bottom: 15px; margin-left: 15px"
                class="grey--text text--darken-2 font-weight-bold titles"
              >
                Projects
              </div>
          <div v-for="(project, index) in allProjects"
                    :key=index>
                    <div v-if="project.projectStatus == 'support'">
          <v-list-item @click="component = 'user-content'; selectProject(project)" class="selectedProjectPanel">
                  <v-list-item-action>
                    <v-icon size="17" color="blue">icon-project</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="fontRestructure12">
                      {{project.projectName}}
                    </v-list-item-title>
                  </v-list-item-content>
                  
                </v-list-item>
                <v-divider></v-divider>
                    </div>
          </div>
          </div>
         </v-list-item-group>
      </div>
      <div class="componentContent">
        <component
          v-bind:is="component"
        ></component>
      </div>
   </div>
</template>
<script>

import { mapState } from "vuex";
import UserContent from "~/components/support/userContent";
import Progress from "~/components/popups/progress";
export default {
   components: {
    'user-content': UserContent,
    "progress-loading": Progress,
  },
  data(){
    return {
      component:"",
      overlay: false,
    }
  },
  methods: {
    selectProject(project){
      this.$store.dispatch("project/addSelectedProject", project);
    }
  },
  created() {
    this.overlay = true;
    Promise.all([
      this.$store.dispatch("project/fetchAllOragnizationProjects"),
      this.$store.dispatch("project/clearProject"),
    ]).finally(() => {
      this.overlay = false;
    });
  },
   computed: {
    ...mapState({
      allProjects: (state) => state.project.allOrgProjects,
    }),
  },
}
</script>