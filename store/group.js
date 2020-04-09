export const state = () => ({
    myGroups: []
})

export const mutations = {
    SET_MY_GROUPS(state, mygroups){
        state.myGroups = mygroups;
    },
    ADD_MY_GROUP(state, myGroup){
        state.myGroups.push(myGroup);
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


    fetchTasksMyTasks({commit, rootState}, projectId){
        const userId = rootState.user.userId;
        this.$axios.get (`projects/${projectId}/tasks/user?userId=${userId}`)
        .then (response => {
            console.log("MY TASKS ARE RETRIEVED SUCCESSFULLY-->", response.data.data);
            commit('SET_MY_TASKS', response.data.data);
        })
        .catch (e => {
            console.log("error", e)
        })
    },

}


export const getters = {
    getGroups: state => {
      return state.myGroups
    }
}