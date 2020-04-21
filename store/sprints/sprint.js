export const state = () => ({
    sprint: {},
    sprints: [],
})


export const mutations = {
    APPEND_SPRINT(state, sprint){
        state.sprints.unshift(sprint);
    },
    FETCH_ALL_SPRINTS(state, sprints){
      state.sprints = sprints; 
    }
  }

  export const actions = {
     async fetchAllProjectSprints({commit, rootState}, projectId){
      const user = rootState.user.userId;
      let sprintResponse;
      try {
          sprintResponse = await this.$axios.$get(`/sprints/${projectId}`,
          {
              headers : {
                  userId: user
              }
          })
          commit('FETCH_ALL_SPRINTS', sprintResponse.data);
          const defaultSprint = {
              "sprintId": "default",
              "sprintName": "Default"
          }
          commit('APPEND_SPRINT', defaultSprint);
          console.log("fetch all sprints response from store", sprintResponse.data);
      } catch(e) {
          console.log("Error fetching sprints from store",e);
      }
  },

   addProjectSprint({commit}, sprint){
       commit('APPEND_SPRINT', sprint);
   },

  
}  