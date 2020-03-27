export const state = {
    taskWorkLoadUsers: []
}

export const mutations = {
    SET_TASKLOAD_USERS(state, taskWorkLoadUsers){
        state.taskWorkLoadUsers = taskWorkLoadUsers;
    }
}

export const actions = {
    async fetchAllTaskLoadUsers({commit, rootState}){
        const userId = rootState.user.userId;
        let taskLoadResponse;
        try {
            taskLoadResponse = await this.$axios.$get('/projects/tasks/users/workload',
            {
                headers : {
                    user: userId
                }
            })
            commit('SET_TASKLOAD_USERS', taskLoadResponse.data);
            console.log("workload response from store", taskLoadResponse.data);
        } catch {
            console.log("Error fetching fetchAllTaskLoadUsers",e);
        }
    }
}

export const getters = {
    getWorkLoadUsers: state => {
        return state.taskWorkLoadUsers
      }
}

export const setters = {

}