export const state = () => ({
    clients: [],
  });

  export const mutations = {
    SET_CLIENTS(state, clients) {
      state.clients = clients;
    },
}

export const actions = {
    async fetchClients({ commit, rootState }) {
      const user = rootState.user.userId;
      let response;
      try {
        response = await this.$axios.$get(
          `/organization?startIndex=0&endIndex=10`,
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
}