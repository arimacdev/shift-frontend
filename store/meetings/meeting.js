export const state = () => ({
  initiatedMeeting: {},
  discussionPoints: [],
});

export const mutations = {
  SET_INITIATED_MEETING(state, meeting) {
    state.initiatedMeeting = meeting;
  },
  SET_DISCUSSION_POINTS(state, data) {
    state.discussionPoints = data;
  },
};

export const actions = {
  async fetchOrgOverview({ commit, rootState }, meeting) {
    commit('SET_INITIATED_MEETING', meeting);
  },

  async fetchDiscussionPoints({ commit, rootState }, { meetingId, projectId }) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(
        `meeting/${meetingId}/discussion?projectId=${projectId}`,
        {
          headers: {
            user: user,
          },
        }
      );
      console.log('discussion points', response.data);
      commit('SET_DISCUSSION_POINTS', response.data);
    } catch (error) {
      console.log('Error fetching discussion points', error);
    }
  },
};
