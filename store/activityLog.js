export const state = () => ({
  activityLog: [],
  projectLogs: [],
});

export const mutations = {
  EMPTY_STORE(state, elements) {
    state.activityLog = elements;
    state.projectLogs = elements;
  },
  SET_ACTIVITY_LOG(state, activityLog) {
    state.activityLog = activityLog;
    state.projectLogs = state.projectLogs.concat(activityLog.activityLogList);
    console.log(state.projectLogs);
  },
};

export const actions = {
  emptyStore({ commit, rootState }) {
    commit('EMPTY_STORE', []);
  },
  async fetchTaskActivityLog(
    { commit, rootState },
    { taskId, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let taskLogResponse;
    try {
      taskLogResponse = await this.$axios.$get(
        `/activity/task/${taskId}?startIndex=${startIndex}&endIndex=200&allLogs=true`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_ACTIVITY_LOG', taskLogResponse.data);
    } catch (error) {
      console.log('Error fetching task Activity log', error);
    }
  },
  async fetchProjectActivityLog(
    { commit, rootState },
    { projectId, startIndex, endIndex }
  ) {
    const user = rootState.user.userId;
    let taskLogResponse;
    try {
      taskLogResponse = await this.$axios.$get(
        `/activity/project/${projectId}?startIndex=${startIndex}&endIndex=${endIndex}`,
        {
          headers: {
            userId: user,
          },
        }
      );
      commit('SET_ACTIVITY_LOG', taskLogResponse.data);
    } catch (error) {
      console.log('Error fetching task Activity log', error);
    }
  },
};
