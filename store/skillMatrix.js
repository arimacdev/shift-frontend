export const state = () => ({
  skillCategory: [],
  selectedCategory: {},
  skills: [],
});

export const mutations = {
  SET_SKILL_CATEGORY(state, skillCategory) {
    state.skillCategory = skillCategory;
  },
  SET_SELECTED_CATEGORY(state, selectedCategory) {
    state.selectedCategory = selectedCategory;
  },
  SET_SKILLS(state, skills) {
    state.skills = skills;
  },
};

export const actions = {
  async fetchSkillCategory({ commit, rootState }) {
    const user = rootState.user.userId;
    let skillCategoryResponse;
    try {
      skillCategoryResponse = await this.$axios.$get(`/category`, {
        headers: {
          userId: user,
        },
      });
      // console.log('skill category', skillCategoryResponse.data);
      commit('SET_SKILL_CATEGORY', skillCategoryResponse.data);
    } catch (error) {
      console.log('Error fetching skill category', error);
    }
  },

  async fetchSelectedCategory({ commit, rootState }, categoryId) {
    const user = rootState.user.userId;
    let selectedCategoryResponse;
    try {
      selectedCategoryResponse = await this.$axios.$get(
        `/category/${categoryId}`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_SELECTED_CATEGORY', selectedCategoryResponse.data);
    } catch (error) {
      console.log('Error fetching selected category', error);
    }
  },

  async fetchCategorySkills({ commit, rootState }, categoryId) {
    const user = rootState.user.userId;
    let categorySkillResponse;
    try {
      categorySkillResponse = await this.$axios.$get(
        `/category/${categoryId}/skill`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_SKILLS', categorySkillResponse.data);
    } catch (error) {
      console.log('Error fetching selected category skills', error);
    }
  },
};
