export const state = () => ({
  projectOverview: {
    totalProjects: {},
    leadsPending: {},
    leadsOngoing: {},
    leadConversion: {},
  },
});

export const mutations = {
  SET_PROJECT_OVERVIEW(state, overview) {
    state.projectOverview = overview;
  },
};

export const actions = {
  async fetchProjectOverview({ commit, rootState }, { from, to }) {
    const user = rootState.user.userId;
    let projectOverview;
    try {
      projectOverview = await this.$axios.$get(`/analytics/overview/projects`, {
        headers: {
          user: user,
          from: from,
          to: to,
        },
      });
      commit('SET_PROJECT_OVERVIEW', projectOverview.data);
      console.log('OVERVIEW', projectOverview.data);
    } catch (e) {
      console.log('Error fetching project overview', e);
    }
  },
};
