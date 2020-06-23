export const state = () => ({});

export const mutations = {};

export const actions = {
  async addNotificationDevice({ commit, rootState }, subscriptionId) {
    const user = rootState.user.userId;
    // let formData = new FormData();
    // formData.append('subscriptionId', subscriptionId);
    // formData.append('subscriberId', user);
    // formData.append('provider', 'OneSignal');
    // formData.append('platform', 'Web');
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
