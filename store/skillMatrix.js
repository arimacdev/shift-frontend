export const state = () => ({
  skillCategory: [],
  selectedCategory: {},
  skills: [],
  userSkills: [],
});

export const mutations = {
  SET_SKILL_CATEGORY(state, skillCategory) {
    state.skillCategory = skillCategory;
    const sorted = skillCategory.sort((a, b) => {
      const catA = a.categoryName.toUpperCase();
      const catB = b.categoryName.toUpperCase();

      if (catA < catB) return -1;
      if (catA > catB) return 1;

      return 0;
    });
  },
  SET_SELECTED_CATEGORY(state, selectedCategory) {
    state.selectedCategory = selectedCategory;
  },
  SET_USER_SKILLS(state, userSkills) {
    state.userSkills = userSkills;
  },
  SET_SKILLS(state, skills) {
    const sorted = skills.sort((a, b) => {
      const skillA = a.skillName.toUpperCase();
      const skillB = b.skillName.toUpperCase();

      if (skillA < skillB) return -1;
      if (skillA > skillB) return 1;

      return 0;
    });
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

  async fetchUserSkills({ commit, rootState }, userId) {
    const user = rootState.user.userId;
    let userSkillsResponse;
    try {
      userSkillsResponse = await this.$axios.$get(
        `/category/user/${userId}/skillmap`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_USER_SKILLS', userSkillsResponse.data);
    } catch (error) {
      console.log('Error fetching user skills', error);
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
