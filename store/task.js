import axios from 'axios';

export const state = () => ({
  allTasks: [],
  myTasks: [],
  userCompletionTasks: [],
  projectTaskCompletion: {},
  taskFiles: [],
  childTasks: [],
});

export const mutations = {
  SET_ALL_TASKS(state, event) {
    state.allTasks = event;
  },
  SET_CHILD_TASKS(state, children) {
    state.childTasks = children;
  },
  SET_MY_TASKS(state, event) {
    state.myTasks = event;
  },
  SET_USER_TASK_COMPLETION(state, event) {
    state.userCompletionTasks = event;
  },
  SET_PROJECT_TASK_COMPLETION(state, projectTaskCompletion) {
    state.projectTaskCompletion = projectTaskCompletion;
  },
  UPDATE_TASK_SPRINT(state, { taskId, sprintId }) {
    const index = state.allTasks.findIndex((i) => i.taskId === taskId);
    const task = state.allTasks[index];
    task.sprintId = sprintId;
    state.allTasks.splice(index, 1, task);
  },
  SET_TASK_FILES(state, files) {
    state.taskFiles = files;
  },
};

export const actions = {
  fetchChildren({ commit, rootState }, { projectId, taskId }) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`projects/${projectId}/tasks/${taskId}/children`, {
        headers: {
          user: userId,
        },
      })
      .then((response) => {
        console.log(
          'CHILD TASKS ARE RETRIEVED SUCCESSFULLY-->',
          response.data.data
        );
        commit('SET_CHILD_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },
  fetchTasksAllTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`projects/${projectId}/tasks?userId=${userId}`, {
        headers: {
          type: 'project',
        },
      })
      .then((response) => {
        console.log(
          'ALL TASKS ARE RETRIEVED SUCCESSFULLY-->',
          response.data.data
        );
        commit('SET_ALL_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },

  fetchTasksMyTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`projects/${projectId}/tasks/user?userId=${userId}`)
      .then((response) => {
        console.log(
          'MY TASKS ARE RETRIEVED SUCCESSFULLY-->',
          response.data.data
        );
        commit('SET_MY_TASKS', response.data.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },

  fetchProjectUserCompletionTasks({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;
    this.$axios
      .get(`projects/${projectId}/tasks/${userId}/completion/details`, {
        headers: {
          user: userId,
          type: 'project',
        },
      })
      .then((response) => {
        console.log('Completion details -->', response.data.data);
        commit('SET_USER_TASK_COMPLETION', response.data.data);
      })
      .catch((e) => {
        console.log('error fetching completed tasks', e);
      });
  },

  fetchProjectTaskCompletion({ commit, rootState }, projectId) {
    const userId = rootState.user.userId;

    this.$axios
      .get(`projects/${projectId}/tasks/completion`, {
        headers: {
          user: userId,
          type: 'project',
        },
      })
      .then((response) => {
        console.log(
          'project task completion from store -->',
          response.data.data
        );
        commit('SET_PROJECT_TASK_COMPLETION', response.data.data);
      })
      .catch((e) => {
        console.log('error fetching completed tasks', e);
      });
  },

  updateSprintOfATask({ commit }, { taskId, sprintId }) {
    console.log('update sprint', sprintId, taskId);
    commit('UPDATE_TASK_SPRINT', { taskId, sprintId });
  },

  setTaskFiles({ commit }, taskFiles) {
    console.log('taskFiles', taskFiles);
    commit('SET_TASK_FILES', taskFiles);
  },

  async fetchTaskFiles({ commit, rootState }, { projectId, taskId }) {
    const userId = rootState.user.userId;
    let taskFilesResponse;
    try {
      taskFilesResponse = await this.$axios.$get(
        `/projects/${projectId}/tasks/${taskId}/files`,
        {
          headers: {
            user: userId,
            type: 'project',
          },
        }
      );
      console.log('store files--->', taskFilesResponse.data);
      commit('SET_TASK_FILES', taskFilesResponse.data);
    } catch (error) {
      console.log('Error fetching data', error);
    }
  },
};

export const getters = {
  getAllTasks: (state) => {
    return state.allTasks;
  },
  getMyTasks: (state) => {
    return state.myTasks;
  },
  getuserCompletionTasks: (state) => {
    return state.userCompletionTasks;
  },
};
