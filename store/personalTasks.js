import axios from 'axios';

export const state = () => ({
  personalTasks: [],
});

export const mutations = {
  SET__PERSONAL_TASKS(state, personalTasks) {
    state.personalTasks = personalTasks;
  },
};

export const actions = {
  fetchAllPersonalTasks({ commit, rootState }) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`/non-project/tasks/personal/user/${userId}`)
      .then((response) => {
        console.log('All Personal Tasks are Fetched', response.data.data);
        commit('SET__PERSONAL_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error fetching personal tasks', e);
      });
  },
};

export const getters = {
  getAllTasks: (state) => {
    return state.personalTasks;
  },
  getMyTasks: (state) => {
    return state.personalTasks;
  },
};
