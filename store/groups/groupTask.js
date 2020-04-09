export const state = () => ({
    groupTasks: [],
})

export const mutations = {
    SET_GROUP_TASKS(state, groupTasks){
        state.groupTasks = groupTasks;
    }
}

export const actions = {

    async fetchGroupTasks({commit, rootState}, {taskGroupId, userId}){
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
    }

}


export const getters = {
    getGroups: state => {
      return state.myGroups
    }
}