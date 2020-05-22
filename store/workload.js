export const state = () => ({
  taskWorkLoadUsers: [],
  workloadTasks: [],
  templates: [],
});

export const mutations = {
  SET_TASKLOAD_USERS(state, taskWorkLoadUsers) {
    state.taskWorkLoadUsers = taskWorkLoadUsers;
  },
  SET_WORKLOAD_TASKS(state, workloadTasks) {
    state.workloadTasks = workloadTasks;
  },
  EMPTY_WORKLOAD_TASKS(state) {
    state.workloadTasks = [];
  },
  SET_TEMPLATES(state, templates) {
    state.templates = templates;
  },
  ADD_TEMPLATE(state, template) {
    state.templates.push(template);
  },
};

export const actions = {
  async fetchTemplates({ commit, rootState }) {
    let templateResponse;
    let userId = rootState.user.userId;
    try {
      templateResponse = await this.$axios.$get(`/template/${userId}`);
    } catch (e) {}
    console.log('template list', templateResponse.data);
    commit('SET_TEMPLATES', templateResponse.data);
  },
  addTemplate({ commit }, template) {
    commit('ADD_TEMPLATE', template);
  },
  async fetchAllTaskLoadUsers({ commit, rootState }, { assignees, from, to }) {
    const user = rootState.user.userId;
    let taskLoadResponse;
    try {
      taskLoadResponse = await this.$axios.$get(
        `/projects/tasks/users/workload?${assignees}`,
        {
          headers: {
            user: user,
            from: from,
            to: to,
          },
        }
      );
      commit('SET_TASKLOAD_USERS', taskLoadResponse.data);
      console.log('workload response from store', taskLoadResponse.data);
    } catch (e) {
      console.log('Error fetching fetchAllTaskLoadUsers', e);
    }
  },

  async fetchAllWorkloadTasks({ commit, rootState }, { userId, from, to }) {
    const user = rootState.user.userId;
    let workloadTasks;
    try {
      workloadTasks = await this.$axios.$get(
        `/projects/tasks/users/${userId}/workload`,
        {
          headers: {
            user: user,
            from: from,
            to: to,
          },
        }
      );
      commit('SET_WORKLOAD_TASKS', workloadTasks.data);
      // console.log('workload tasks response from store', workloadTasks.data);
    } catch {
      console.log('Error fetching fetchAllWorkloadTasks', e);
    }
  },
  clearWorkLoadTasks({ commit }) {
    commit('EMPTY_WORKLOAD_TASKS');
  },
};

export const getters = {
  getWorkLoadUsers: (state) => {
    return state.taskWorkLoadUsers;
  },
};

export const setters = {};
