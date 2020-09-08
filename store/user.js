import qs from 'qs';
export const state = () => ({
  access_token: '',
  refresh_token: '',
  userId: '',
  organizationalRoles: [],
  users: [],
  selectedTaskUser: {},
  componentUser: {},
  parentTaskUser: {},
  selectedUser: {},
  ownUser: {},
});

export const mutations = {
  setAccessToken(state, value) {
    // console.log('Token Changed ' + value);
    state.access_token = value;
  },
  setRefreshToken(state, value) {
    state.refresh_token = value;
  },
  setUserId(state, value) {
    state.userId = value;
  },
  setOrganizationalRole(state, roles) {
    state.organizationalRoles = roles;
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
  SET_OWN_USER(state, ownUser) {
    state.ownUser = ownUser;
  },
  UPDATE_ACTIVATION(state, { user, status }) {
    user.isActive = status;
    state.selectedUser = user;
  },
  UPDATE_SELECTED_USER(state, user) {
    state.selectedUser.firstName = user.firstName;
    state.selectedUser.lastName = user.lastName;
    state.selectedUser.email = user.email;
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
      console.log(
        '###############' +
          process.env.SYSTEM_URL +
          '/auth/realms/pm-tool/protocol/openid-connect/token'
      );
    } catch (e) {
      console.log('Error fetching user from store =', e);
      if (e.response.status == 422) {
        const refresh_token = rootState.user.refresh_token;
        // console.log('REFRESH ' + refresh_token);

        const requestBody = {
          refresh_token: refresh_token,
          client_id: 'pmtool-frontend',
          grant_type: 'refresh_token',
        };
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
        // const url = 'https://pmtool.devops.arimac.xyz/auth/realms/pm-tool/protocol/openid-connect/token';

        const url =
          process.env.SYSTEM_URL +
          '/auth/realms/pm-tool/protocol/openid-connect/token';

        const response = await this.$axios.post(
          url,
          qs.stringify(requestBody),
          config
        );

        // store.commit('user/setAccessToken', response.access_token);

        // commit('setAccessToken', 'Bearer ' + response.data.access_token);

        this.$auth.setToken('keycloak', 'Bearer ' + response.data.access_token);

        // console.log(
        //   'RESPONSE_------->' + 'Bearer ' + response.data.access_token
        // );
        location.reload();
      }
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

  async fetchOwnUser({ commit, rootState }, userId) {
    const user = rootState.user.userId;
    let userResponse;
    try {
      userResponse = await this.$axios.$get(`/users/${userId}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_OWN_USER', userResponse.data);
      console.log('Response', userResponse.data);
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

  updateSelectedUser({ commit }, user) {
    commit('UPDATE_SELECTED_USER', user);
  },
};
