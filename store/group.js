export const state = () => ({
    myGroups: [],
    groupTasks: []
})

export const mutations = {
    SET_MY_GROUPS(state, mygroups){
        state.myGroups = mygroups;
    },
    ADD_MY_GROUP(state, myGroup){
        state.myGroups.push(myGroup);
    },
    SET_GROUP_TASKS(state, groupTasks){
        state.groupTasks = groupTasks;
    }
}

export const actions = {
    fetchMyGroups({commit, rootState}){
        const userId = rootState.user.userId;
            this.$axios.get (`taskgroup`,{
            headers: {
                user: userId,
            }
    })
    .then (response => {
        console.log("All My Groups Retieved", response.data.data);
        commit('SET_MY_GROUPS', response.data.data);
    })
    .catch (e => {
    console.log("error", e)
    })
    },


    async addGroup({commit, rootState}, groupName){
        const userId = rootState.user.userId;
        let response;
          try{
          response = await this.$axios.$post(`/taskgroup`, 
          {
            taskGroupName: groupName,
            taskGroupCreator: userId,
          }
        )
        console.log("Group Added",response.data);
        commit('ADD_MY_GROUP', response.data);
       } catch(e){
          console.log("Error adding a group", e);
       }
    },


    async fetchGroupTasks({commit, rootState}, {taskGroupId, userId}){
        // this.group = group;
      const user = rootState.user.userId;
       let getGroupTaskResponse;
       try {
           getGroupTaskResponse = await this.$axios.$get(`/projects/${taskGroupId}/tasks?userId=${userId}`,
           {
               headers : {
                   user: user,
                   type: 'taskGroup'
               }
           })
           console.log("group task get response", getGroupTaskResponse.data);
           commit('SET_GROUP_TASKS', getGroupTaskResponse.data)
       } catch(e) {
           console.log("Error fetching group tasks",e);
       }
    },

}


export const getters = {
    getGroups: state => {
      return state.myGroups
    }
}