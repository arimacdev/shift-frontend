export const state = () => ({
    supportUserByEmail: {},
    isUserEnabled: false,
    supportProjects: [],
    seletedSupportProject: {},
  });

  export const mutations = {
    SET_USER(state, supportUserByEmail) {
      state.supportUserByEmail = supportUserByEmail;
    },
    SET_USER_STATUS(state, isUserEnabled) {
        state.isUserEnabled = isUserEnabled;
      },
      SET_SUPPORT_PROJECTS(state, projects) {
        state.supportProjects = projects;
      },
      SET_SELECTED_PROJECT(state, project) {
        state.seletedSupportProject = project;
      },
  }

export const actions = {
    async fetchSupportUser({ commit, rootState }, email) {
      const user = rootState.user.userId;
      let response;
      try {
        response = await this.$axios.$get(
          `/support/user?email=${email}`,
          {
            headers: {
              user: user,
            },
          }
        );
        commit('SET_USER_STATUS', false);
        commit('SET_USER', response.data);
      } catch (error) {
        let errorMessage
          if(error.response.data.status == 500){
            errorMessage = error.response.data.message.slice(0,4)
            if(errorMessage == 404){
                commit('SET_USER_STATUS', true);
            }
          }
      }
    },
    async fetchSupportProjects({ commit, rootState }) {
        const user = rootState.user.userId;
        let response;
        try {
          response = await this.$axios.$get(
            `/support/projects`,
            {
              headers: {
                user: user,
              },
            }
          );
          // console.log('discussion points', response.data);
          commit('SET_SUPPORT_PROJECTS', response.data);
        } catch (error) {
          console.log('Error fetching projects', error);
        }
      },
      addSelectedProject({ commit }, project) {
        commit('SET_SELECTED_PROJECT', project);
      },
}

