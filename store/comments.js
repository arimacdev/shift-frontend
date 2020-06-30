export const state = () => ({
  activityComment: [],
  allCommentsLength: 0
});

export const mutations = {
  SET_ACTIVITY_COMMENT(state, activityComment) {
    const sorted = activityComment.sort((a, b) => {
      const commentA = a.commentedAt.toUpperCase();
      const commentB = b.commentedAt.toUpperCase();

      if (commentA < commentB) return -1;
      if (commentA > commentB) return 1;

      return 0;
    });
    state.activityComment = activityComment;
  },
  SET_TASK_COMMENTS_LENGTH(state, length){
    state.allCommentsLength = length;
  }
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

  async fetchTaskCommentLength(
    { commit, rootState }, taskId) {
    const user = rootState.user.userId;
    let taskCommentLength;
    try {
      taskCommentLength = await this.$axios.$get(
        `/task/${taskId}/comment/count`,
        {
          headers: {
            userId: user,
          },
        }
      );
      console.log("comments length", taskCommentLength.data)
      commit('SET_TASK_COMMENTS_LENGTH', taskCommentLength.data);
    } catch (error) {
      console.log('Error fetching count length', error);
    }
  },


};
