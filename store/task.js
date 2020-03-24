import axios from 'axios';

export const state =  {
    allTasks: []
  }

export const mutations = {  
    SET_TASKS(state, event){
      state.allTasks = event;
    }
  }

export const actions = {
    fetchTasks({commit, rootState}, projectId){
        const userId = rootState.user.userId;
        this.$axios.get (`projects/${projectId}/tasks?userId=${userId}`)
        .then (response => {
            console.log("ALL TASKS ARE RETRIEVED SUCCESSFULLY-->", response.data.data);
            commit('SET_TASKS', response.data.data);
        })
        .catch (e => {
         console.log("error", e)
        })
    }    
  }

export const getters = {
    getTasks: state => {
      return state.allTasks
    }   
}