export const state = () => ({
  groupPeople: [],
});

export const mutations = {
  SET_GROUP_PEOPLE(state, groupPeople) {
    state.groupPeople = groupPeople;
  },
};

export const actions = {
  async fetchGroupPeople({ commit, rootState }, { taskGroupId, userId }) {
    const user = rootState.user.userId;
    let getCompletionTaskResponse;
    try {
      getCompletionTaskResponse = await this.$axios.$get(
        `taskgroup/${taskGroupId}/tasks/${user}/completion/details`,
        {
          headers: {
            user: user,
            type: 'taskGroup',
          },
        }
      );
      // console.log('group people response', getCompletionTaskResponse.data);
      commit('SET_GROUP_PEOPLE', getCompletionTaskResponse.data);
    } catch (e) {
      console.log('Error fetching group people', e);
    }
  },
};

export const getters = {
  getGroups: (state) => {
    return state.myGroups;
  },
};
