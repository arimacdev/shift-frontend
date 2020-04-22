export const state = () => ({
  access_token: '',
  userId: '',
  organizationalRole: '',
  users: [],
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
    state.users = users;
  },
};

export const actions = {
  async setAllUsers({ commit, rootState }) {
    const user = rootState.user.userId;
    console.log('set users from the store');
    let userResponse;
    try {
      userResponse = await this.$axios.$get(`users`, {
        headers: {
          user: user,
        },
      });
      commit('SET_USERS', userResponse.data);
      console.log('fetch all user response from store', userResponse.data);
    } catch (e) {
      console.log('Error fetching user from store', e);
    }
  },
};
