export const state = () => ({
  supportProjectStats: {},
  supportUserByEmail: {},
  isUserExists: false,
  supportProjects: [],
  seletedSupportProject: {},
  clientSupportUsers: [],
  externalSupportUsers: [],
  internalSupportUsers: [],
  internalProjectSupportUsers: [],
  projectMemberAssigneeArray: [],

  projectTickets: [],
  isDetailsLoaded: false,
});

export const mutations = {
  EMPTY_STORE(state, elements) {
    state.projectTickets = elements;
    state.isDetailsLoaded = false;
  },
  SET_PROJECT_TICKETS(state, tickets) {
    // state.projectTickets = tickets;

    if (tickets.length == 0) {
      state.isDetailsLoaded = true;
    }
    state.projectTickets = state.projectTickets.concat(tickets);
  },
  SET_PROJECT_STATS(state, stats) {
    state.supportProjectStats = stats;
  },
  SET_USER(state, supportUserByEmail) {
    state.supportUserByEmail = supportUserByEmail;
  },
  SET_EXTERNAL_SUPPORT_USERS(state, externalSupportUsers) {
    state.externalSupportUsers = externalSupportUsers;
  },
  SET_INTERNAL_PROJECT_SUPPORT_USERS(state, internalProjectSupportUsers) {
    state.internalProjectSupportUsers = internalProjectSupportUsers;
    let assigneeList = [];
    for (let index = 0; index < internalProjectSupportUsers.length; ++index) {
      let user = internalProjectSupportUsers[index];
      assigneeList[index] = user.assigneeId;
    }

    state.projectMemberAssigneeArray = assigneeList;
  },
  SET_SUPPORT_MEMBERS(state, internalSupportUsers) {
    if (state.projectMemberAssigneeArray != []) {
      for (
        let index1 = 0;
        index1 < state.projectMemberAssigneeArray.length;
        ++index1
      ) {
        for (let index2 = 0; index2 < internalSupportUsers.length; ++index2) {
          if (
            state.projectMemberAssigneeArray[index1] ==
            internalSupportUsers[index2].userId
          ) {
            internalSupportUsers.splice(index2, 1);
          }
        }
      }
    }
    state.internalSupportUsers = internalSupportUsers;
  },
  SET_USER_STATUS(state, isUserEnabled) {
    state.isUserExists = isUserEnabled;
  },
  SET_SUPPORT_PROJECTS(state, projects) {
    state.supportProjects = projects;
  },
  SET_SELECTED_PROJECT(state, project) {
    state.seletedSupportProject = project;
  },
  SET_CLIENT_USERS(state, users) {
    state.clientSupportUsers = users;
  },
};

export const actions = {
  emptyStore({ commit, rootState }) {
    commit('EMPTY_STORE', []);
  },
  async fetchProjectTickets(
    { commit, rootState },
    { projectId, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(
        `/support/ticket/project/${projectId}?startIndex=${startIndex}&endIndex=${endIndex}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_PROJECT_TICKETS', response.data);
    } catch (error) {
      console.log('Error fetching project tickets', error);
    }
  },
  async fetchProjectStats({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(
        `/support/ticket/project/${projectId}/status`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_PROJECT_STATS', response.data);
    } catch (error) {
      console.log('Error fetching project stats', error);
    }
  },
  async fetchClientSupportUsers({ commit, rootState }, clientId) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(
        `/support/user/organization/${clientId}`,
        {
          headers: {
            user: user,
          },
        }
      );
      commit('SET_CLIENT_USERS', response.data);
    } catch (error) {
      console.log('Error fetching users', error);
    }
  },
  async fetchSupportUser({ commit, rootState }, email) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(`/support/user?email=${email}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_USER_STATUS', true);
      commit('SET_USER', response.data);
    } catch (error) {
      let errorMessage;
      if (error.response.data.status == 500) {
        errorMessage = error.response.data.message.slice(0, 4);
        if (errorMessage == 404) {
          commit('SET_USER_STATUS', false);
        }
      }
    }
  },
  async fetchProjectSupportMembers({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(`/member/project/${projectId}`, {
        headers: {
          user: user,
        },
      });
      // console.log('discussion points', response.data);
      commit('SET_INTERNAL_PROJECT_SUPPORT_USERS', response.data);
    } catch (error) {
      console.log('Error fetching projects users', error);
    }
  },
  async fetchSupportProjects({ commit, rootState }) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(`/support/projects`, {
        headers: {
          user: user,
        },
      });
      // console.log('discussion points', response.data);
      commit('SET_SUPPORT_PROJECTS', response.data);
    } catch (error) {
      console.log('Error fetching projects', error);
    }
  },
  async fetchSupportMembers({ commit, rootState }) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(`/users/role/SUPPORT_MEMBER`, {
        headers: {
          user: user,
        },
      });
      // console.log('discussion points', response.data);
      commit('SET_SUPPORT_MEMBERS', response.data);
    } catch (error) {
      console.log('Error fetching support members', error);
    }
  },
  async fetchExternalSupportUsers({ commit, rootState }, projectId) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(`/support/user/project/${projectId}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_EXTERNAL_SUPPORT_USERS', response.data);
    } catch (error) {
      console.log('Error fetching support users', error);
    }
  },
  async addSelectedProject({ commit, rootState }, project) {
    const user = rootState.user.userId;
    let projectResponse;
    try {
      projectResponse = await this.$axios.$get(`/projects/${project}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_SELECTED_PROJECT', projectResponse.data);
    } catch (error) {
      console.log('Error fetching project', error);
    }
  },
};
