<template>
    <div>
        <div class="peopleWrapper">
            <div class="titleDiv">
            <p class="catTitle" @click="fetchUsers">Admins</p>
            </div>
            <div class="addPeopleButton addPeople">
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
        </div>
        <div class="peopleListWrapper">
           <div v-for="(assignee, index) in userList"
        :key="index"  v-on:click="component='tab-views'" class="peopleList">
            <v-list-item  >
              <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/30.jpg"></v-img>
        </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="body-2">
                    <h4>{{assignee.projectJobRoleName}}</h4>
                    {{ assignee.assigneeFirstName }} {{assignee.assigneeLastName}}
                    {{ assignee.tasksCompleted + "/" + assignee.totalTasks + " Tasks completed"}}
                     <v-btn small color="primary"><editProjectUser :editUser="assignee" :projectId="projectId" /></v-btn>
                     <v-btn small color="error"><deleteProjectUser :blockedUserId="assignee.assigneeId" :projectId="projectId" /></v-btn>
                     
                    </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
       
          </div>

        </div>
    </div>

</template>

<script>
import deleteProjectUser from '@/components/people/deleteProjectUser.vue';
import editProjectUser from '@/components/people/editProjectUser.vue'
export default {
    props: ['projectId'],
    components: {
        deleteProjectUser,
        editProjectUser
    },
    data() {
        return {
            userList: []
        }
    },
    created(){
        console.log("projectId", this.projectId)
        this.$axios.get (`/projects/${this.projectId}/tasks/138bbb3d-02ed-4d72-9a03-7e8cdfe89eff/completion/details`)
                .then (response => {
                console.log("project users List", response.data)
                this.userList = response.data.data;
                })
                .catch (e => {
                console.log("error", e)
                })
    },
    methods: {
         fetchUsers() {
             console.log("projectId", this.projectId)
        }
    },
   
}
</script>

<style scoped>
.peopleWrapper{
    width: 100%;
    padding: 30px;
}
.titleDiv{
    width: 30%;
    float: left;
}
.catTitle{
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
}
.addPeopleButton{
    border-radius: 5px;
    float: left;
    margin-right: 5px;
     background-color: #0BAFFF;
    width: 20%;
    float: right;
}
.peopleListWrapper{
    margin-top: 30px;
}
.peopleList{
    background-color: #EDF0F5;
    border-radius: 5px;
    margin-top: 5px;
    height: 50px;
}

</style>