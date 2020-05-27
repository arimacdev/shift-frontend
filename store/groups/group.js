export const state = () => ({
  myGroups: [],
});

export const mutations = {
  SET_MY_GROUPS(state, mygroups) {
    const sorted = mygroups.sort((a, b) => {
      const groupA = a.taskGroupName.toUpperCase();
      const groupB = b.taskGroupName.toUpperCase();

      if (groupA < groupB) return -1;
      if (groupA > groupB) return 1;

      return 0;
    });
    state.myGroups = sorted;
  },

  ADD_MY_GROUP(state, myGroup) {
    state.myGroups.push(myGroup);
  },

  UPDATE_GROUP(state, { groupId, name }) {
    const groups = state.myGroups;
    const index = groups.findIndex((i) => i.taskGroupId === groupId);
    const group = state.myGroups[index];
    group.taskGroupName = name;
    state.myGroups.splice(index, 1, group);
  },

  REMOVE_GROUP(state, groupId) {
    const index = state.myGroups.findIndex((i) => i.taskGroupId === groupId);
    state.myGroups.splice(index, 1);
  },
};

export const actions = {
  fetchMyGroups({ commit, rootState }) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`taskgroup`, {
        headers: {
          user: userId,
        },
      })
      .then((response) => {
        // console.log('All My Groups Retieved', response.data.data);
        commit('SET_MY_GROUPS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },

  async addGroup({ commit, rootState }, groupName) {
    const userId = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$post(`/taskgroup`, {
        taskGroupName: groupName,
        taskGroupCreator: userId,
      });
      // console.log('Group Added', response.data);
      commit('ADD_MY_GROUP', response.data);
    } catch (e) {
      console.log('Error adding a group', e);
    }
  },

  updateGroup({ commit }, { groupId, name }) {
    commit('UPDATE_GROUP', { groupId, name });
  },

  removeGroup({ commit }, groupId) {
    commit('REMOVE_GROUP', groupId);
  },
};

export const getters = {
  getGroups: (state) => {
    return state.myGroups;
  },
};
