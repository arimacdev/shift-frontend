export const state = () => ({
  projectOverview: {
    totalProjects: {},
    leadsPending: {},
    leadsOngoing: {},
    leadConversion: {},
  },
  projectSummary: [],
});

export const mutations = {
  SET_PROJECT_OVERVIEW(state, overview) {
    state.projectOverview = overview;
  },
  SET_PROJECT_SUMMARY(state, summary) {
    state.projectSummary = summary;
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
      // console.log('OVERVIEW', projectOverview.data);
    } catch (e) {
      console.log('Error fetching project overview', e);
    }
  },
  async fetchProjectSummary({ commit, rootState }, { params }) {
    const user = rootState.user.userId;
    let projectSummary;
    try {
      projectSummary = await this.$axios.$get(
        `/analytics/summary/projects?${params}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_PROJECT_SUMMARY', projectSummary.data);
      console.log('SUMMARY', projectSummary.data);
    } catch (e) {
      console.log('Error fetching project summary', e);
    }
  },
};
