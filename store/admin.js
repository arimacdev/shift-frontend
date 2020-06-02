export const state = () => ({
  realmRoles: [],
  userRoles: [],
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

  SET_USER_ROLE_MAPPING(state, roleMapping) {
    let roleList = [];
    roleMapping.forEach((role) => {
      if (role.name !== 'uma_authorization' && role.name !== 'offline_access') {
        roleList.push(role);
      }
    });
    state.userRoles = roleList;
  },

  APPEND_USER_ROLE(state, newRole) {
    const role = {
      id: newRole.id,
      name: newRole.name,
    };
    state.userRoles.push(role);
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
      console.log('Error fetching realm roles', e);
    }
  },
  async fetchUserRoleMapping({ commit, rootState }, userId) {
    const user = rootState.user.userId;
    let roleMapping;
    try {
      roleMapping = await this.$axios.$get(`/admin/user/${userId}/roles`, {
        headers: {
          userId: user,
        },
      });
      commit('SET_USER_ROLE_MAPPING', roleMapping.data);
      console.log('roles', roleMapping.data);
    } catch (e) {
      console.log('Error fetching role mappings', e);
    }
  },

  async addUserRole({ commit, rootState }, userRole) {
    const userId = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$post(
        `/admin/user/roles`,
        {
          userId: userRole.userId,
          roleId: userRole.id,
          roleName: userRole.name,
        },
        { headers: { user: userId } }
      );
      commit('APPEND_USER_ROLE', userRole);
      console.log('Add Role', response);
    } catch (e) {
      console.log('Error adding a group', e);
    }
  },

  async removeUserRole({ commit, rootState }, userRole) {
    const userId = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$delete(
        `/admin/user/roles`,
        {
          userId: userRole.userId,
          roleId: userRole.id,
          roleName: userRole.name,
        },
        { headers: { user: userId } }
      );
      commit('_USER_ROLE', userRole);
      console.log('Remove Role', response);
    } catch (e) {
      console.log('Error adding a group', e);
    }
  },
};
