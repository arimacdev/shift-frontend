export const state = () => ({
  projectOverview: {
    totalProjects: {},
    leadsPending: {},
    leadsOngoing: {},
    leadConversion: {},
  },
  projectSummary: [],
  projectDetails: [],
});

export const mutations = {
  EMPTY_SUMMARY_STORE(state, elements) {
    state.projectSummary = elements;
  },
  EMPTY_DETAILS_STORE(state, elements) {
    state.projectDetails = elements;
  },
  SET_PROJECT_OVERVIEW(state, overview) {
    state.projectOverview = overview;
  },
  SET_PROJECT_SUMMARY(state, summary) {
    state.projectSummary = state.projectSummary.concat(summary);
  },
  SET_PROJECT_DETAILS(state, details) {
    state.projectDetails = state.projectDetails.concat(details);
  },
};

export const actions = {
  emptySummaryStore({ commit, rootState }) {
    commit('EMPTY_SUMMARY_STORE', []);
  },
  emptyDetailsStore({ commit, rootState }) {
    commit('EMPTY_DETAILS_STORE', []);
  },
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
  async fetchProjectSummary(
    { commit, rootState },
    { params, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let projectSummary;
    try {
      projectSummary = await this.$axios.$get(
        `/analytics/summary/projects?${params}&startIndex=${startIndex}&endIndex=${endIndex}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_PROJECT_SUMMARY', projectSummary.data);
      // console.log('SUMMARY', projectSummary.data);
    } catch (e) {
      console.log('Error fetching project summary', e);
    }
  },
  async fetchProjectDetails(
    { commit, rootState },
    { params, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let projectDetails;
    try {
      projectDetails = await this.$axios.$get(
        `/analytics/details/projects?${params}&startIndex=${startIndex}&endIndex=${endIndex}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_PROJECT_DETAILS', projectDetails.data);
      // console.log('SUMMARY', projectDetails.data);
    } catch (e) {
      console.log('Error fetching project details', e);
    }
  },
};
