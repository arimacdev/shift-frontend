export const state = () => ({
    sprint: {},
    sprints: []
})


export const mutations = {
    SET_SPRINT(state, sprint){
        state.sprint = sprint;
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
          console.log("fetch all sprints response from store", sprintResponse.data);
      } catch(e) {
          console.log("Error fetching sprints from store",e);
      }
  },
}  