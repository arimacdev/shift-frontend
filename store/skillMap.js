export const state = () => ({
  userSkillMap: [],
});

export const mutations = {
  SET_SKILL_MAP(state, userSkillMap) {
    state.userSkillMap = userSkillMap;
  },
};

export const actions = {
  // async fetchUserSkillMap({ commit, rootState }, assignee) {
  //   const user = rootState.user.userId;
  //   let skillMapResponse;
  //   try {
  //     skillMapResponse = await this.$axios.$get(
  //       `/category/user/${assignee}/skillmap`,
  //       {
  //         headers: {
  //           userId: user,
  //         },
  //       }
  //     );
  //     commit('SET_SKILL_MAP', skillMapResponse.data);
  //     // console.log('fetch SkillMap response from store', skillMapResponse.data);
  //   } catch (e) {
  //     console.log('Error fetching SkillMap', e);
  //   }
  // },
  async fetchUserSkillMap({ commit, rootState }, assignee) {
    const user = rootState.user.userId;
    let skillMapResponse;
    try {
      skillMapResponse = await this.$axios.$get(
        `/category/user/${assignee}/skillmap/profile`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_SKILL_MAP', skillMapResponse.data);
      // console.log('fetch SkillMap response from store', skillMapResponse.data);
    } catch (e) {
      console.log('Error fetching SkillMap', e);
    }
  },
};
