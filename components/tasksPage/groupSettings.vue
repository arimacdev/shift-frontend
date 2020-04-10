<template>
<div class="groupSettingsContent">
    <v-list-item>
        <v-list-item-content>
                 <v-text-field
                 flat=""
                    solo
                    background-color="#EDF0F5"
                    v-model="taskGroupName"
                ></v-text-field>
        </v-list-item-content>
        <v-list-item-action>
                <v-btn 
                width="250px"
                depressed
                color="#0BAFFF"
                height="50px"
                class="settingsButton white--text"
                @click="postData()"
                >
                    Rename
                </v-btn>
        </v-list-item-action>
    </v-list-item>
      <v-list-item>
          <v-list-item-action>
                <v-btn 
                width="250px"
                depressed
                color="#FF6161"
                height="50px"
                class="settingsButton white--text"
                @click="settingsDialog = true"
             >
                    Delete
                </v-btn>
        </v-list-item-action>

        <!-- --------------------- delete task popup --------------- -->


 <v-dialog
      v-model="settingsDialog"
      max-width="380"
    >
      <v-card>
        <div class="popupConfirmHeadline">
          <v-icon class="deletePopupIcon" size="60" color="deep-orange lighten-1">mdi-alert-outline</v-icon>
          <br>
          <span class="alertPopupTitle">Delete Group</span>
          <br>
          <span class="alertPopupText">You're about to permanantly delete this group and all of its data. If you're not sure, you can cancel this action. </span>
        </div>

        
 <div class="popupBottom">
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="success"
            width="100px"
            @click="settingsDialog = false;"
          >
            Cancel
          </v-btn>
 <v-spacer></v-spacer>
 <!-- add second function to click event as  @click="dialog = false; secondFunction()" -->
          <v-btn
            color="error"
            width="100px"
            @click="settingsDialog = false; deleteData()"
          >
            Delete
          </v-btn>
           <v-spacer></v-spacer>
        </v-card-actions>

        
        </div>
      </v-card>
    </v-dialog>

<!-- ---------------------- end popup ------------------ -->

      </v-list-item>
       <div @click="close" class="groupUpdatePopups">
            <component v-bind:is="component" :errorMessage=errorMessage ></component>
         </div>
        <!-- <success-popup /> -->

</div>
   
</template>
<script>
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'

export default {
    props: ['group'],
      components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },

    data() {
       return{
            userId: this.$store.state.user.userId,
        component: '',
        settingsDialog: false,
        groupName: this.group.taskGroupName,
        errorMessage: '',
       }
    },
    methods: {
        async postData(){
          let response;
       try{
        response = await this.$axios.$put(`/taskgroup/${this.group.taskGroupId}`, {
          taskGroupName: this.groupName,
          taskGroupEditor: this.userId,
        })
         this.component = 'success-popup'
         this.$store.dispatch('groups/group/updateGroup', {
           groupId: this.group.taskGroupId,
           name: this.groupName
           });
      }
       catch(e){
          console.log("Error edit user", e);
          this.errorMessage = e.response.data
           this.component = 'error-popup'
       } 
      },
     async deleteData(){
        let response;
        try{
          response = await this.$axios.$delete(`/taskgroup/${this.group.taskGroupId}`,
          {
             headers: {
                  'user': this.userId
              }
          }
        );
        this.component = 'success-popup'
        this.$store.dispatch('groups/group/removeGroup', this.group.taskGroupId)
        console.log("delete group", response);
       } catch(e){
           this.component = 'error-popup'
           this.errorMessage = e.response.data
          console.log("Error deleting group", e.response);
       }
      },
       close(){
                this.component = ''
            },
    },
    computed:{
      taskGroupName:{
        get(){
          return this.group.taskGroupName
        },
        set(groupName){
          this.groupName = groupName;
        }
      }
    }
    
}
</script>