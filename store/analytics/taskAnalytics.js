export const state = () => ({
  taskRate: [],
});

export const mutations = {
  SET_TASK_RATE(state, overview) {
    state.taskRate = overview;
  },
};

export const actions = {
  async fetchTaskOverview({ commit, rootState }, { from, to, criteria }) {
    const user = rootState.user.userId;
    let taskRate;
    try {
      taskRate = await this.$axios.$get(
        `/analytics/rate/task?from=${from}&to=${to}&criteria=${criteria}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_TASK_RATE', taskRate.data);
      // console.log('OVERVIEW', projectOverview.data);
    } catch (e) {
      console.log('Error fetching project overview', e);
    }
  },
};
