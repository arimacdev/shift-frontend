<template>

<v-row justify="center" class="">
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
    <div v-on="on" class="addPeopleButton addPeople">
                <v-list-item v-on:click="component='add-task'" 
                dark >
                    <v-list-item-action>
                        <v-icon size="20" color="">mdi-calendar-blank-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class="buttonText">
                        <v-list-item-title class="bodyWiew">Add new</v-list-item-title>
                    </v-list-item-content>
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-list-item>
        </div>
        </template>
      <v-card class="addUserPopup">
          <v-card-actions >

            <select v-model="addUser.assigneeId" class="formElements popupFormElement">
              <option disabled value="" >Assignee</option>
              <option v-for="(user, index) in users" :key="index" :value="user.userId">
                {{user.firstName}} {{user.lastName}}
              </option>
            </select>

          </v-card-actions>
          <v-card-actions class="">
             <input v-model="addUser.assigneeJobRole" placeholder="Role" class="formElements popupFormElement">
            </v-card-actions>
             
             <v-card-actions class="roleField">
             
                <v-checkbox
                v-model="selected"
                hide-details
                class="shrink mr-2 mt-0"                
                label="Admin">
                </v-checkbox>
             </v-card-actions>
            

          <v-btn class="deleteButton" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="editButton addUserSave" text @click="changeHandler">Save</v-btn>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['users', 'projectId'],
    data() {
      return {
        addUser: {
          "assignerId": "138bbb3d-02ed-4d72-9a03-7e8cdfe89eff",
          "assigneeId": "",
          "assigneeJobRole": "",
          "assigneeProjectRole": 3 
        },
        isShow: false,
        selected: false,
        dialog: false
      }
    },
    methods: {
      async changeHandler() {
        console.log("add user",this.addUser);
        this.dialog = false;
        let assigneeProjectRoleId = this.adminStatus;
        console.log(assigneeProjectRoleId);
        let response;
          try{
          response = await this.$axios.$post(`/projects/${this.projectId}/users`, 
          this.addUser
        )
       } catch(e){
          console.log("Error adding a Task", e);
       }   
      }
    },
     computed: {
        adminStatus: function() {
              if(this.selected){
                return 2;
              } else {
                return 3;
              }
        }
    },
  }
</script>

<style scoped>

</style>