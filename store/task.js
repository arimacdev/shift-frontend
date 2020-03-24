import axios from 'axios';

export const state =  {
    allTasks: [],
    myTasks: []
  }

export const mutations = {  
    SET_ALL_TASKS(state, event){
      state.allTasks = event;
    },
    SET_MY_TASKS(state, event){
      state.myTasks = event;
    }
  }

export const actions = {
        fetchTasksAllTasks({commit, rootState}, projectId){
        const userId = rootState.user.userId;
        this.$axios.get (`projects/${projectId}/tasks?userId=${userId}`)
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