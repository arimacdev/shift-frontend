<template>
<div class="groupSettingsContent">
    <v-list-item>
        <v-list-item-content>
                 <v-text-field
                 flat=""
                    solo
                    background-color="#EDF0F5"
                    v-model="group.taskGroupName"
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
                @click="deleteData()">
                    Delete
                </v-btn>
        </v-list-item-action>

      </v-list-item>
       <div @click="close" class="groupUpdatePopups">
            <component v-bind:is="component" ></component>
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
       }
    },
    methods: {
        async postData(){
          let response;
       try{
        response = await this.$axios.$put(`/taskgroup/${this.group.taskGroupId}`, {
          taskGroupName: this.group.taskGroupName,
          taskGroupEditor: this.userId,
        })
         this.component = 'success-popup'
        // window.setTimeout(location.reload(), 8000)

      }
       catch(e){
          console.log("Error edit user", e);
           this.component = 'error-popup'
        //   alert("Error updating user!")
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
        console.log("delete group", response);
       } catch(e){
           this.component = 'error-popup'
          console.log("Error deleting group", e);
       }
      },
       close(){
                this.component = ''
            },
    }
    
}
</script>