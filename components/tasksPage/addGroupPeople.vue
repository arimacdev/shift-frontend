<template>
<div>
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
         <div class="popupFormContent">
             
              <v-icon class="" size="60" color="deep-orange lighten-1">mdi-account-multiple-plus</v-icon>
             <v-card-text class="deletePopupTitle">Add member to group</v-card-text>
          <v-card-actions >


            <v-autocomplete
              filled
              label="Select user"
              v-model="addUser.assigneeId"
              :items="states"
              item-text="name"
              item-value="id.userId"
              :search-input.sync="search"
              class=" popupFormGroupElement"
              flat
              outlined=""
              background-color="white"
              append-icon=""
              hide-no-data
              @change="onSelectedUser()"
          >
            
          </v-autocomplete>

          </v-card-actions>
        
              </div>
              
          <!-- <v-btn class="deleteButton" text @click="dialog = false">Cancel</v-btn>
          <v-btn class="editButton addUserSave" text @click="changeHandler">Save</v-btn> -->

           <div class="popupBottom">
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="error"
                              width="100px"
                             @click="dialog = false"
                              :retain-focus="false"
                            >
                              Cancel
                            </v-btn>
                  <v-spacer></v-spacer>
                            <v-btn
                              color="success"
                              width="100px"
                             @click="changeHandler"
                              :retain-focus="false"
                            >
                              Save
                            </v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>

                          
                          </div>

      </v-card>
    </v-dialog>
    
  </v-row>
  <div @click="close">
            <component v-bind:is="component" :success=success ></component>
         </div>
       <!--  <success-popup /> -->

      
  </div>
</template>

<script>
import SuccessPopup from '~/components/popups/successPopup'
import ErrorPopup from '~/components/popups/errorPopup'
  export default {
    props: ['users', 'group'],
    components: {
      'success-popup' : SuccessPopup,
      'error-popup': ErrorPopup
    },
    data() {
      return {
        userId: this.$store.state.user.userId,
        addUser: {
          "assignerId": this.$store.state.user.userId,
          "assigneeId": "",
          "assigneeJobRole": "",
          "assigneeProjectRole": this.getProjectRole()
        },
        isShow: false,
        selected: false,
        dialog: false,
        loading: false,
        items: [],
        search: null,
        select: null,
        states: [
          
        ],
        component: '',
        success: '',
      }
    },
     watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      close(){
          this.component = ''
      },
       onSelectedUser(){
        if(this.select !== undefined){
        this.$emit('searchSelected', this.select);
        // console.log("selected user",this.select)
        }
      },
      async changeHandler() {
        this.dialog = false;
        let response;
          try{
          response = await this.$axios.$post(`/taskgroup/add`, 
          {
            taskGroupId: this.group.taskGroupId,
            taskGroupAssigner: this.group.taskGroupMemberId,
            taskGroupAssignee: this.addUser.assigneeId 
          }
        )
        console.log(response);
       } catch(e){
          console.log("Error adding a group", e);
       }
      //   let assigneeProjectRoleId = this.getProjectRole();
      //   this.addUser.assigneeProjectRole = assigneeProjectRoleId;
      //   let response;
      //     try{
      //     response = await this.$axios.$post(`/taskgroup/add`, 
      //     this.addUser
      //   )
      //   this.$store.dispatch('task/fetchProjectUserCompletionTasks', this.projectId)
      //   this.addUser.assigneeId = "";
      //   this.addUser.assigneeJobRole ="";
      //   this.selected = false;
      //   this.component = 'success-popup'
      //   this.success = response.message
      //  } catch(e){
      //     console.log("Error adding a User", e);
      //     this.component = 'error-popup'
      //  }   
      },
      querySelections (v) {
        let projectSearchList = this.users;
        for (let index = 0; index < projectSearchList.length; ++index) {
            let user = projectSearchList[index];
            this.states.push({name: user.firstName + " " + user.lastName, id: user, img: user.profileImage});
        }
        console.log("usersList", this.users, "nameList", this.states)
        this.loading = true
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        })
        this.loading = false
      },
      getProjectRole(){
        console.log("getProjectRole", this.selected)
          if(this.selected == true){
            return 2;
          } else {
            return 3;
          }
        }
    },
     computed: {
        adminStatus : {
          get(){
            return this.selected;
          },
          set(value){
            this.selected = !this.selected
          }
        }
    },
  }
</script>

<style scoped>

</style>