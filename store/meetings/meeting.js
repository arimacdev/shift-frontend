export const state = () => ({
  initiatedMeeting: {},
});

export const mutations = {
  SET_INITIATED_MEETING(state, meeting) {
    state.initiatedMeeting = meeting;
  },
};

export const actions = {
  async fetchOrgOverview({ commit, rootState }, meeting) {
    commit('SET_INITIATED_MEETING', meeting);
  },
};
