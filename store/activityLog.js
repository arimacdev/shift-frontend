export const state = () => ({
    activityLog: [],
  });

  export const mutations = {
    SET_ACTIVITY_LOG(state, activityLog) {
        state.activityLog = activityLog;
    },
}

export const actions = {
    async fetchTaskActivityLog({ commit, rootState }, {taskId, startIndex, endIndex}) {
        const user = rootState.user.userId;
        let taskLogResponse;
        try {
          taskLogResponse = await this.$axios.$get(
            `/activity/task/${taskId}?startIndex=${startIndex}&endIndex=${endIndex}`,
            {
              headers: {
                userId: user,
              },
            }
          );
          commit('SET_ACTIVITY_LOG', taskLogResponse.data)
        } catch (error) {
          console.log('Error fetching task Activity log', error);
        }
    },
}