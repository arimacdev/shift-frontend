export const state = () => ({
  selectedTab: 'task',
});

export const mutations = {
  UPDATE_TAB(state, newTab) {
    state.selectedTab = newTab;
  },
};

export const actions = {
  updateTabViewsTab({ commit }, tab) {
    // console.log('tab updated from store', tab);
    commit('UPDATE_TAB', tab);
  },
};
