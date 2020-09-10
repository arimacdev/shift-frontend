export const state = () => ({
  memberDetails: [],
});

export const mutations = {
  SET_MEMBER_DETAILS(state, overview) {
    state.memberDetails = state.memberDetails.concat(overview);
  },
};

export const actions = {
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
};
