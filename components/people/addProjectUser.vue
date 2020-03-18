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
      <v-card>
          <v-card-actions class="">
            <select v-model="newUser" class="formElements popupFormElement">
              <option disabled value="" >Task status</option>
                <option key="pending" value="pending" >Pending</option>
                <option key="implementing" value="implementing">Implementing</option>
                <option key="qa" value="qa">QA</option>
                <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                <option key="reOpened" value="reOpened">Re-Opened</option>
                <option key="deployed" value="deployed">Deployed</option>
                <option key="closed" value="closed">Closed</option>
            </select>

             <!-- <select v-model="task.taskAssignee" class="formElements">
              <option disabled value="" >Assignee</option>
              <option v-for="(projectUser, index) in projectUsers" :key="index" :value="projectUser.userId">
                {{projectUser.firstName}} {{projectUser.lastName}}
              </option>
            </select> -->
</v-card-actions>
<v-card-actions class="">
             <input v-model="jobRole" placeholder="Role" class="formElements popupFormElement">
</v-card-actions>
             
             <v-card-actions class="roleField">
             
                <v-checkbox
                v-model="adminStatus"
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
