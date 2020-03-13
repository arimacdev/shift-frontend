<template>
    <div>
        <div class="peopleWrapper">
            <div class="titleDiv">
            <p class="catTitle">Admins</p>
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
           <div v-for="(user, index) in users"
        :key="index"  v-on:click="component='tab-views'" class="peopleList">
            <v-list-item @click="" >
              <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/30.jpg"></v-img>
        </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="body-2">{{ user.firstName }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
       
          </div>

        </div>
    </div>

</template>

<script>

import axios from 'axios'


export default {
props: ['users'],
   
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