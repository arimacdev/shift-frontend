export const state = () => ({
  realmRoles: [],
});

export const mutations = {
  SET_REALM_ROLES(state, realmRoles) {
    let roleList = [];
    realmRoles.forEach((role) => {
      if (role.name !== 'uma_authorization' && role.name !== 'offline_access') {
        roleList.push(role);
      }
    });
    state.realmRoles = roleList;
  },
};

export const actions = {
  async fetchRealmRoles({ commit, rootState }) {
    const user = rootState.user.userId;
    let realmRolesList;
    try {
      realmRolesList = await this.$axios.$get(`/admin/user/roles`, {
        headers: {
          userId: user,
        },
      });
      commit('SET_REALM_ROLES', realmRolesList.data);
      console.log('roles', realmRolesList.data);
    } catch (e) {
      console.log('Error fetching fetchProject', e);
    }
  },
};
