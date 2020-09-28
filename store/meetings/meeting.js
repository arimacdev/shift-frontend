export const state = () => ({
  initiatedMeeting: {},
  discussionPoints: [],
  projectMeetings: [],

  isMeetingLoaded: false,
});

export const mutations = {
  EMPTY_MEETING_STORE(state, elements) {
    state.projectMeetings = elements;
    state.isMeetingLoaded = false;
  },
  SET_INITIATED_MEETING(state, meeting) {
    state.initiatedMeeting = meeting;
  },
  SET_DISCUSSION_POINTS(state, data) {
    state.discussionPoints = data;
  },
  SET_PROJECT_MEETINGS(state, meetings) {
    if (meetings.length == 0) {
      state.isMeetingLoaded = true;
    }
    state.projectMeetings = state.projectMeetings.concat(meetings);
  },
};

export const actions = {
  emptyMeetingStore({ commit, rootState }) {
    commit('EMPTY_MEETING_STORE', []);
  },
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
      // console.log('discussion points', response.data);
      commit('SET_DISCUSSION_POINTS', response.data);
    } catch (error) {
      console.log('Error fetching discussion points', error);
    }
  },
  async fetchProjectMeetings(
    { commit, rootState },
    { projectId, startIndex, endIndex, filter, key, date }
  ) {
    const user = rootState.user.userId;
    let response;
    try {
      response = await this.$axios.$get(
        `/meeting?projectId=${projectId}&startIndex=${startIndex}&endIndex=${endIndex}&filter=${filter}&filterKey=${key}&filterDate=${date}`,
        {
          headers: {
            user: user,
          },
        }
      );
      // console.log('discussion points', response.data);
      commit('SET_PROJECT_MEETINGS', response.data);
    } catch (error) {
      console.log('Error fetching project meetings', error);
    }
  },
};
