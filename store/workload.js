
export const state = () => ({
    taskWorkLoadUsers: [],
    workloadTasks: []
})


export const mutations = {
    SET_TASKLOAD_USERS(state, taskWorkLoadUsers){
        state.taskWorkLoadUsers = taskWorkLoadUsers;
    },
    SET_WORKLOAD_TASKS(state, workloadTasks){
        state.workloadTasks = workloadTasks;
    },
    EMPTY_WORKLOAD_TASKS(state){
        state.workloadTasks = [];
    }
}

export const actions = {
    async fetchAllTaskLoadUsers({commit, rootState}){
        const user = rootState.user.userId;
        let taskLoadResponse;
        try {
            taskLoadResponse = await this.$axios.$get('/projects/tasks/users/workload',
            {
                headers : {
                    user: user
                }
            })
            commit('SET_TASKLOAD_USERS', taskLoadResponse.data);
            console.log("workload response from store", taskLoadResponse.data);
        } catch {
            console.log("Error fetching fetchAllTaskLoadUsers",e);
        }
    },

    async fetchAllWorkloadTasks({commit, rootState}, userId){
        const user = rootState.user.userId;
        let workloadTasks;
        try {
            workloadTasks = await this.$axios.$get(`/projects/tasks/users/${userId}/workload`,
            {
                headers : {
                    user: user
                }
            })
            commit('SET_WORKLOAD_TASKS', workloadTasks.data);
            console.log("workload tasks response from store", workloadTasks.data);
        } catch {
            console.log("Error fetching fetchAllWorkloadTasks",e);
        }
    },
    clearWorkLoadTasks({commit}){
        commit('EMPTY_WORKLOAD_TASKS');
    }
}

export const getters = {
    getWorkLoadUsers: state => {
        return state.taskWorkLoadUsers
      }
}

export const setters = {

}