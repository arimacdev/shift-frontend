<template>
 <div>
  <div class="taskTitleDiv">
      <div class="taskName-sideBar">

        <v-list-item>
        <v-list-item-icon>
             <div class="round">
                <input type="checkbox" disabled name="a2" value="1" id="checkbox" />
                <label for="checkbox"></label>
            </div>
          </v-list-item-icon>
           <v-list-item-content class="">
            <v-list-item-title class="taskTitle">{{ this.task.taskName }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content >
            <v-icon size="20" color="#FFFFFF" class="editIcon">mdi-pencil-circle</v-icon>
          </v-list-item-content>


           <v-list-item-content class="dropDownList">
             <select v-model="task.taskStatus" class=" selectUserDropDown">
              <option disabled value="" >Task status</option>
                <option key="pending" value="pending" >Pending</option>
                <option key="implementing" value="implementing">Implementing</option>
                <option key="qa" value="qa">QA</option>
                <option key="readyToDeploy" value="readyToDeploy">Ready to Deploy</option>
                <option key="reOpened" value="reOpened">Re-Opened</option>
                <option key="deployed" value="deployed">Deployed</option>
                <option key="closed" value="closed">Closed</option>
            </select>
             </v-list-item-content>

         
      </v-list-item>

      
       
      </div>

    </div>

    <div class="sideBarContent">
      
    </div>
   

    </div>
</template>

<script>

  export default {
    async asyncData({ $axios }) {
    const { data: users } = await $axios.$get(`/users/${this.task.taskAssignee}`)
    
    console.log("users list", users)
    
    return { 
      projects: projects,
      users:users,
     }
  },

      props: ['task', 'assignee'],
    data() {
      return {
        drawer: null,
        items: [
          
        ],
      }
    },
    components: {
     
    },
  }
</script>

