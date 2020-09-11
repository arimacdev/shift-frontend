export const state = () => ({
  memberDetails: [],
  memberActivity: [],
});

export const mutations = {
  SET_MEMBER_DETAILS(state, overview) {
    state.memberDetails = state.memberDetails.concat(overview);
  },
  EMPTY_USER_STORE(state, elements) {
    state.memberDetails = elements;
  },
  SET_MEMBER_ACTIVITY(state, activity) {
    state.memberActivity = activity;
  },
};

export const actions = {
  emptyUserStore({ commit, rootState }) {
    commit('EMPTY_USER_STORE', []);
  },
  async fetchMemberDetails(
    { commit, rootState },
    { params, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let memberDetails;
    try {
      memberDetails = await this.$axios.$get(
        `/analytics/details/users?${params}&startIndex=${startIndex}&endIndex=${endIndex}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_MEMBER_DETAILS', memberDetails.data);
    } catch (e) {
      console.log('Error fetching member details', e);
    }
  },
  async fetchMemberActivity({ commit, rootState }, { from, to, criteria }) {
    const user = rootState.user.userId;
    let memberActivity;
    try {
      memberActivity = await this.$axios.$get(
        `/analytics/activity/users?from=${from}&to=${to}&criteria=${criteria}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_MEMBER_ACTIVITY', memberActivity.data);
      // console.log('OVERVIEW', projectOverview.data);
    } catch (e) {
      console.log('Error fetching member activity', e);
    }
  },
};
