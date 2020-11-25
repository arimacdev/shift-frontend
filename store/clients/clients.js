export const state = () => ({
  clients: [],
  selectedClient: {},
});

export const mutations = {
  SET_CLIENTS(state, clients) {
    state.clients = clients;
  },
  SET_SELECTED_CLIENTS(state, selectedClient) {
    state.selectedClient = selectedClient;
  },
};

export const actions = {
  async fetchClients({ commit, rootState }) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(
        `/organization?startIndex=0&endIndex=10&allRecords=true`,
        {
          headers: {
            user: user,
          },
        }
      );
      // console.log('discussion points', response.data);
      commit('SET_CLIENTS', response.data);
    } catch (error) {
      console.log('Error fetching clients', error);
    }
  },
  async fetchSelectedClient({ commit, rootState }, client) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(`/organization/${client}`, {
        headers: {
          user: user,
        },
      });
      commit('SET_SELECTED_CLIENTS', response.data);
    } catch (error) {
      console.log('Error fetching client', error);
    }
  },
};
