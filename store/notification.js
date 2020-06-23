export const state = () => ({});

export const mutations = {};

export const actions = {
  async addNotificationDevice({ commit, rootState }, subscriptionId) {
    const user = rootState.user.userId;
    try {
      response = await this.$axios.$post(
        `/notification/register`,
        {
          data: {
            subscriptionId: subscriptionId,
            subscriberId: user,
            provider: 'OneSignal',
            platform: 'Web',
          },
        },
        {
          headers: {
            userId: user,
          },
        }
      );
      console.log('RESPONSE', response);
    } catch (e) {
      console.log('error', e);
    }
  },
};
