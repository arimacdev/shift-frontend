<template>
    <div class="requestViewContent overflow-y-auto">
        <v-row>
            <v-list-item-title class="summaryNameTitle">{{selectedProject.projectName}}</v-list-item-title>
            <v-list-item-subtitle class="summaryNameSubTitle">{{selectedProject.clientId}}</v-list-item-subtitle>
        </v-row>
        <v-row style="margin-top: 40px">
            <v-list-item>
                <v-list-item-content class="userTitleSectionSupport">External Users</v-list-item-content>
                <v-list-item-action><v-btn depressed color="#66B25F" dark>Add External Support User</v-btn></v-list-item-action>
            </v-list-item>
        </v-row>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data(){
        return{

        }
    },
    computed: {
    ...mapState({
      allProjects: (state) => state.project.allOrgProjects,
      selectedProject: (state) => state.project.seletedProject
    }),
  },
}
</script>



