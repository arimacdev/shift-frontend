export const state = () => ({
  projectOverview: {
    totalProjects: {},
    leadsPending: {},
    leadsOngoing: {},
    leadConversion: {},
  },
  projectSummary: [],
  projectDetails: [],
  isSummaryLoaded: false,
  isDetailsLoaded: false,
});

export const mutations = {
  EMPTY_SUMMARY_STORE(state, elements) {
    state.projectSummary = elements;
    state.isSummaryLoaded = false;
  },
  EMPTY_DETAILS_STORE(state, elements) {
    state.projectDetails = elements;
    state.isDetailsLoaded = false;
  },
  SET_PROJECT_OVERVIEW(state, overview) {
    state.projectOverview = overview;
  },
  SET_PROJECT_SUMMARY(state, summary) {
    if (summary.length == 0 || summary.length < 10) {
      state.isSummaryLoaded = true;
    }
    state.projectSummary = state.projectSummary.concat(summary);
  },
  SET_PROJECT_DETAILS(state, details) {
    console.log('DETAILS ' + details);
    if (details.length == 0) {
      state.isDetailsLoaded = true;
    }
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
