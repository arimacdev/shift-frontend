import axios from 'axios';

export const state = () => ({
  personalTasks: [],
  personalTaskFiles: [],
  selectedTask: {},
});

export const mutations = {
  SET__PERSONAL_TASKS(state, personalTasks) {
    state.personalTasks = personalTasks;
  },
  SET_SELECTED_TASK(state, selectedTask) {
    // console.log('thistask', selectedTask);
    state.selectedTask = selectedTask;
  },
  UPDATE_SELECTED_DATE(state, { type, date }) {
    // console.log('selectedtask', type, date);

    const selectedTask = state.selectedTask;
    if (type == 'dueDate') {
      selectedTask.taskDueDateAt = date;
    } else {
      selectedTask.taskReminderAt = date;
    }
    // console.log('selectedtask', selectedTask);
    state.selectedTask = selectedTask;
    // console.log('selectedtask', state.selectedTask);
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
  setSelectedTask({ commit }, task) {
    commit('SET_SELECTED_TASK', task);
  },
  updateProjectDates({ commit }, { type, date }) {
    commit('UPDATE_SELECTED_DATE', { type, date });
  },
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
