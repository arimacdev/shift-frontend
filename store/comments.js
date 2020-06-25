export const state = () => ({
  activityComment: [],
});

export const mutations = {
  SET_ACTIVITY_COMMENT(state, activityComment) {
    const sorted = activityComment.sort((a, b) => {
      const commentA = a.commentedAt.toUpperCase();
      const commentB = b.commentedAt.toUpperCase();

      if (commentA > commentB) return -1;
      if (commentA < commentB) return 1;

      return 0;
    });
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
