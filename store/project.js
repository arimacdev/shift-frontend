export const state = {
  project: {},
  projects: []
}

export const mutations = {
  SET_PROJECT(state, project){
      state.project = project;
  },
  FETCH_ALL_PROJECTS(state, projects){
    state.projects = projects; // push
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
      } catch(e) {
          console.log("Error fetching fetchProject",e);
      }
  },

  async fetchAllProjects({commit, rootState}){
    const user = rootState.user.userId;
    let projectResponse;
    try {
        projectResponse = await this.$axios.$get(`/projects?userId=${user}`,
        {
            headers : {
                user: user
            }
        })
        commit('FETCH_ALL_PROJECTS', projectResponse.data);
        console.log("fetch all project response from store", projectResponse.data);
    } catch(e) {
        console.log("Error fetching projects from store",e);
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