export const state = () => ({
  orgOverview: {},
});

export const mutations = {
  SET_ORG_OVERVIEW(state, overview) {
    state.orgOverview = overview;
  },
};

export const actions = {
  async fetchOrgOverview({ commit, rootState }, { from, to }) {
    const user = rootState.user.userId;
    let orgOverview;
    try {
      orgOverview = await this.$axios.$get(
        `/analytics/overview?from=${from}&to=${to}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_ORG_OVERVIEW', orgOverview.data);
    } catch (e) {
      console.log('Error fetching org overview', e);
    }
  },
};
