import axios from 'axios';

  export const state = () => ({
    allTasks: [],
    myTasks: [],
    userCompletionTasks: [],
    projectTaskCompletion: {}
})

export const mutations = {  
    SET_ALL_TASKS(state, event){
      state.allTasks = event;
    },
    SET_MY_TASKS(state, event){
      state.myTasks = event;
    },
    SET_USER_TASK_COMPLETION(state, event){
      state.userCompletionTasks = event;
    },
    SET_PROJECT_TASK_COMPLETION(state, projectTaskCompletion){
      state.projectTaskCompletion = projectTaskCompletion;
    }
  }

export const actions = {
        fetchTasksAllTasks({commit, rootState}, projectId){
        const userId = rootState.user.userId;
        this.$axios.get (`projects/${projectId}/tasks?userId=${userId}`,{
          headers: {
            type: 'project',
        }
       })
        .then (response => {
            console.log("ALL TASKS ARE RETRIEVED SUCCESSFULLY-->", response.data.data);
            commit('SET_ALL_TASKS', response.data.data);
        })
        .catch (e => {
         console.log("error", e)
        })
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

  fetchProjectUserCompletionTasks({commit, rootState}, projectId){
    const userId = rootState.user.userId;
    this.$axios.get (`projects/${projectId}/tasks/${userId}/completion/details`, {
      headers: {
       user: userId,
       'type' : 'project'
    }
   })
    .then (response => {
      console.log("Completion details -->", response.data.data);
      commit('SET_USER_TASK_COMPLETION', response.data.data);
    })
    .catch (e => {
     console.log("error fetching completed tasks", e)
    })
    },

    fetchProjectTaskCompletion({commit, rootState}, projectId){
      const userId = rootState.user.userId;

       this.$axios.get(`projects/${projectId}/tasks/completion`, {
         headers: {
          user: userId,
          'type' : 'project'
       }
      })
      .then (response => {
        console.log("project task completion from store -->", response.data.data);
        commit('SET_PROJECT_TASK_COMPLETION', response.data.data);
      })
      .catch (e => {
       console.log("error fetching completed tasks", e)
      })
      }

  }

export const getters = {
    getAllTasks: state => {
      return state.allTasks
    },
    getMyTasks: state => {
      return state.myTasks
    }   
}