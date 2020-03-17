<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Delete User</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Block User</v-card-title>
        <v-card-text>You are about to permanantly block  from the project. <span>If you are not sure, you can close this popup</span></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blockUser" text @click="changeHandler">Block</v-btn>
          <v-btn class="cancelUser" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['blockedUserId', 'projectId'],
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
       async changeHandler() {
       this.dialog = false
       let response;
       try{
          response = await this.$axios.$post(`/projects/${this.projectId}/users/138bbb3d-02ed-4d72-9a03-7e8cdfe89eff/block`, {
          executorId: 'u1',
          blockedUserId: this.blockedUserId,
          blockedStatus: true
        })
       } catch(e){
          console.log("Error blocking user", e);
       }       
        console.log(response);      
        },
        
    },
  }
</script>

<style scoped>
.blockUser{
position: absolute;
background: #FF6161;
border-radius: 5px;
font-style: normal;
font-weight: bold;
font-size: 13px;
line-height: 40px;
color: #FFFFFF;
}
.cancelUser{
margin-left: 20px;
background: #2EC973;
border-radius: 5px;
font-style: normal;
font-weight: bold;
font-size: 13px;
line-height: 40px;
color: #FFFFFF;
}
</style>