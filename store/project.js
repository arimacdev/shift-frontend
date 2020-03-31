export const state = {
  project: {}
}

export const mutations = {
  SET_PROJECT(state, project){
      state.project = project;
  }
}

export const actions = {
  async fetchProject({commit, rootState}, projectId){
      const user = rootState.user.userId;
      let projectResponse;
      try {
          projectResponse = await this.$axios.$get(`/projects/${projectId}`,
          {
              headers : {
                  user: user
              }
          })
          commit('SET_PROJECT', projectResponse.data);
          console.log("fetch project response from store", projectResponse.data);
      } catch {
          console.log("Error fetching fetchProject",e);
      }
  }
}

export const getters = {
  getProject: state => {
      return state.project
    }
}

export const setters = {

}