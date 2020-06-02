export const state = () => ({
  access_token: '',
  userId: '',
  organizationalRole: '',
  users: [],
  selectedTaskUser: {},
  componentUser: {},
  parentTaskUser: {},
  selectedUser: {},
});

export const mutations = {
  setAccessToken(state, value) {
    state.access_token = value;
  },
  setUserId(state, value) {
    state.userId = value;
  },
  setOrganizationalRole(state, value) {
    state.organizationalRole = value;
  },
  SET_USERS(state, users) {
    const sorted = users.sort((a, b) => {
      const userA = a.firstName.toUpperCase();
      const userB = b.firstName.toUpperCase();

      if (userA < userB) return -1;
      if (userA > userB) return 1;

      return 0;
    });
    state.users = users;
  },
  SET_TASK_USER(state, user) {
    state.selectedTaskUser = user;
  },
  SET_PARENT_TASK_USER(state, user) {
    state.parentTaskUser = user;
  },
  SET_COMPONENT_USER_DETAILS(state, user) {
    state.componentUser = user;
  },
  SET_SELECTED_USER(state, user) {
    state.selectedUser = user;
  },
  UPDATE_ACTIVATION(state, { user, status }) {
    user.isActive = status;
    state.selectedUser = user;
  },
};

export const actions = {
  async setAllUsers({ commit, rootState }) {
    const user = rootState.user.userId;
    // console.log('set users from the store');
    let userResponse;
    try {
      userResponse = await this.$axios.$get(`users`, {
        headers: {
          user: user,
        },
      });
      commit('SET_USERS', userResponse.data);
      // console.log('fetch all user response from store', userResponse.data);
    } catch (e) {
      console.log('Error fetching user from store', e);
    }
  },

  async setSelectedTaskUser({ commit, rootState }, taskAssignee) {
    const user = rootState.user.userId;
    let userResponse;
    try {
      userResponse = await this.$axios.$get(`/users/${taskAssignee}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_TASK_USER', userResponse.data);
      // console.log('fetch task user from store', userResponse.data);
    } catch (e) {
      console.log('Error fetching user from store', e);
    }
  },

  async fetchParentTaskUser({ commit, rootState }, userId) {
    // console.log('fetchParentTaskUser', userId);
    const user = rootState.user.userId;
    let userResponse;
    try {
      userResponse = await this.$axios.$get(`/users/${userId}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_PARENT_TASK_USER', userResponse.data);
      // console.log('fetch parent task user from store', userResponse.data);
    } catch (e) {
      console.log('Error fetching user from store', e);
    }
  },

  async setComponentUser({ commit, rootState }, componentUserId) {
    const user = rootState.user.userId;
    let userResponse;
    try {
      userResponse = await this.$axios.$get(`/users/${componentUserId}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_COMPONENT_USER_DETAILS', userResponse.data);
      // console.log('fetch component user from store', userResponse.data);
    } catch (e) {
      console.log('Error fetching component user from store', e);
    }
  },

  setSelectedUser({ commit }, user) {
    commit('SET_SELECTED_USER', user);
  },

  updateActivationStatus({ commit }, { user, status }) {
    commit('UPDATE_ACTIVATION', { user, status });
  },
};
