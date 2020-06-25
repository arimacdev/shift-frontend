export const state = () => ({
  activityComment: [],
});

export const mutations = {
  SET_ACTIVITY_COMMENT(state, activityComment) {
    state.activityComment = activityComment;
  },
};

export const actions = {
  async fetchTaskActivityComment(
    { commit, rootState },
    { taskId, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let taskCommentResponse;
    try {
      taskCommentResponse = await this.$axios.$get(
        `/task/${taskId}/comment?startIndex=${startIndex}&endIndex=${endIndex}`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_ACTIVITY_COMMENT', taskCommentResponse.data);
    } catch (error) {
      console.log('Error fetching task Activity comments', error);
    }
  },
};
