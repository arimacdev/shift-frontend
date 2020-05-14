import axios from 'axios';

export const state = () => ({
  userProfile: {},
});

export const mutations = {
  SET_PROFILE_PICTURE(state, event) {
    state.userProfile = event;
  },
};

export const actions = {
  fetchProfilePicture({ commit, rootState }) {
    const userId = rootState.user.userId;
    // console.log('Call user profile', rootState.user.userId);
    this.$axios
      .get(`users/${userId}`)
      .then((res) => {
        // console.log('state data --->', res.data.data);
        commit('SET_PROFILE_PICTURE', res.data.data);
      })
      .catch((error) => {
        // console.log('Error fetching user data');
      });
  },
};

export const getters = {
  profilePic: (state) => {
    return state.profilePic;
  },
};
