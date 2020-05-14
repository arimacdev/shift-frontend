import axios from 'axios';

export const state = () => ({
  personalTasks: [],
  personalTaskFiles: [],
});

export const mutations = {
  SET__PERSONAL_TASKS(state, personalTasks) {
    state.personalTasks = personalTasks;
  },
  ADD_FILES_TO_PERSONAL_TASKS(state, files) {
    state.personalTaskFiles = files;
  },
  APPEND_FILE(state, file) {
    state.personalTaskFiles.push(file);
  },
  REMOVE_FILE(state, taskFileId) {
    const index = state.personalTaskFiles.findIndex(
      (i) => i.taskFileId === taskFileId
    );
    state.personalTaskFiles.splice(index, 1);
  },
};

export const actions = {
  fetchAllPersonalTasks({ commit, rootState }) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`/non-project/tasks/personal/user/${userId}`)
      .then((response) => {
        // console.log('All Personal Tasks are Fetched', response.data.data);
        commit('SET__PERSONAL_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error fetching personal tasks', e);
      });
  },
  async fetchAllPersonalTaskFiles({ commit, rootState }, taskId) {
    const userId = rootState.user.userId;
    try {
      let taskFilesResponse;
      try {
        taskFilesResponse = await this.$axios.$get(
          `/non-project/tasks/personal/${taskId}/files`,
          {
            headers: {
              user: userId,
            },
          }
        );
        // console.log('files--->', taskFilesResponse.data);
        commit('ADD_FILES_TO_PERSONAL_TASKS', taskFilesResponse.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },

  addPersonalTaskFile({ commit }, file) {
    commit('APPEND_FILE', file);
  },

  removeTaskFile({ commit }, taskFileId) {
    commit('REMOVE_FILE', taskFileId);
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
