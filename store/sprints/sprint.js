export const state = () => ({
  sprint: {},
  sprints: [],
});

export const mutations = {
  APPEND_SPRINT(state, sprint) {
    state.sprints.push(sprint);
  },
  FETCH_ALL_SPRINTS(state, sprints) {
    const sorted = sprints.sort((a, b) => {
      const userA = a.sprintCreatedAt.toUpperCase();
      const userB = b.sprintCreatedAt.toUpperCase();

      if (userA < userB) return -1;
      if (userA > userB) return 1;

      return 0;
    });
    state.sprints = sprints;
  },
  UPDATE_SPRINT(state, { sprintId, sprintName, sprintDescription }) {
    // console.log('update', state.sprints);
    const index = state.sprints.findIndex((i) => i.sprintId === sprintId);
    // console.log('update', index);

    const updateSprint = state.sprints[index];
    updateSprint.sprintName = sprintName;
    updateSprint.sprintDescription = sprintDescription;
    // console.log('update', updateSprint);

    state.sprints.splice(index, 1, updateSprint);
    // console.log('update', state.sprints);
  },
};

export const actions = {
  async fetchAllProjectSprints({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let sprintResponse;
    try {
      sprintResponse = await this.$axios.$get(`/sprints/${projectId}`, {
        headers: {
          userId: user,
        },
      });
      commit('FETCH_ALL_SPRINTS', sprintResponse.data);
      const defaultSprint = {
        sprintId: 'default',
        sprintName: 'Default',
      };
      commit('APPEND_SPRINT', defaultSprint);
      // console.log('fetch all sprints response from store', sprintResponse.data);
    } catch (e) {
      console.log('Error fetching sprints from store', e);
    }
  },

  addProjectSprint({ commit }, sprint) {
    commit('APPEND_SPRINT', sprint);
  },

  updateProjectSprint({ commit }, { sprintId, sprintName, sprintDescription }) {
    // console.log('update', sprintId, sprintName, sprintDescription);
    commit('UPDATE_SPRINT', { sprintId, sprintName, sprintDescription });
  },
};
